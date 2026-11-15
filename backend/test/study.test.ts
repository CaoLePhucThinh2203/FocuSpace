import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { flatToV4, type RoomState } from "@focuspace/shared";
import { app, makeUser, resetData } from "./setup/db";

const room = (): RoomState => flatToV4({});
const put = (auth: string, data: unknown, baseRevision: number, force = false) =>
  request(app).put("/api/v1/room-state").set("Authorization", auth).send({ data, baseRevision, deviceId: "dev-test", force });

describe("/room-state (T12, UC.09) — integration", () => {
  beforeEach(resetData);

  it("chưa có phòng trả 404", async () => {
    const { auth } = await makeUser();
    const r = await request(app).get("/api/v1/room-state").set("Authorization", auth);
    expect(r.status).toBe(404);
    expect(r.body.error.code).toBe("NOT_FOUND");
  });

  it("PUT baseRevision 0 tạo revision 1, GET đọc lại đúng nội dung", async () => {
    const { auth } = await makeUser();
    const data = room();
    data.study.weather = "storm";
    const w = await put(auth, data, 0);
    expect(w.status).toBe(200);
    expect(w.body.revision).toBe(1);
    const r = await request(app).get("/api/v1/room-state").set("Authorization", auth);
    expect(r.body).toMatchObject({ revision: 1, data: { study: { weather: "storm" } } });
  });

  it("PUT baseRevision cũ trả 409 REVISION_CONFLICT kèm bản hiện có (AC-09.2)", async () => {
    const { auth } = await makeUser();
    await put(auth, room(), 0);
    const b = room();
    b.study.weather = "sunset";
    expect((await put(auth, b, 1)).body.revision).toBe(2);
    const stale = await put(auth, room(), 1);
    expect(stale.status).toBe(409);
    expect(stale.body.error.code).toBe("REVISION_CONFLICT");
    expect(stale.body.current).toMatchObject({ revision: 2, data: { study: { weather: "sunset" } } });
  });

  it("force = true ghi đè dù revision cũ (hợp nhất “Giữ phòng trên máy này”, BR-10)", async () => {
    const { auth } = await makeUser();
    await put(auth, room(), 0);
    await put(auth, room(), 1);
    const mine = room();
    mine.study.rug = 3;
    const r = await put(auth, mine, 1, true);
    expect(r.status).toBe(200);
    expect(r.body.revision).toBe(3);
  });

  it("thân request > 256 KB trả 413 PAYLOAD_TOO_LARGE", async () => {
    const { auth } = await makeUser();
    const r = await put(auth, { ...room(), pad: "x".repeat(300_000) }, 0);
    expect(r.status).toBe(413);
    expect(r.body.error.code).toBe("PAYLOAD_TOO_LARGE");
  });

  it("đồ sai phòng (giường mèo ở Phòng học) trả 400", async () => {
    const { auth } = await makeUser();
    const data = room();
    data.study.items = [{ id: "a1", type: "catbed", x: 10, y: 150, on: true, vol: 0.5 }];
    const r = await put(auth, data, 0);
    expect(r.status).toBe(400);
    expect(r.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("quá 25 đồ một phòng trả 400 (BR-06)", async () => {
    const { auth } = await makeUser();
    const data = room();
    data.study.items = Array.from({ length: 26 }, (_, i) => ({ id: "p" + i, type: "plant", x: 10, y: 150, on: true, vol: 0.5 }));
    expect((await put(auth, data, 0)).status).toBe(400);
  });

  it("mỗi người chỉ thấy phòng của mình", async () => {
    const a = await makeUser("a@example.com");
    const b = await makeUser("b@example.com");
    await put(a.auth, room(), 0);
    expect((await request(app).get("/api/v1/room-state").set("Authorization", b.auth)).status).toBe(404);
  });
});
