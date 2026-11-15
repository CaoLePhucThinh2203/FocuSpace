import { describe, expect, it } from "vitest";
import request from "supertest";
import { seedItemTypes } from "../src/areas/items-audio/seed";
import { app, db } from "./setup/db";

describe("GET /catalog/items (H6, H11) — integration", () => {
  it("trả đủ 17 đồ vật sau seed, theo thứ tự danh mục (AC-07.1)", async () => {
    const r = await request(app).get("/api/v1/catalog/items");
    expect(r.status).toBe(200);
    expect(r.body.items).toHaveLength(17);
    expect(r.body.items[0]).toEqual({ code: "tv", name: "Tivi CRT", description: "Nhiễu sóng trắng", group: "sound", width: 26, height: 26, rooms: ["study"], defaultVol: 0.35, removable: true });
  });

  it("lọc room=bed&group=sound trả 7 đồ (AC-07.2)", async () => {
    const r = await request(app).get("/api/v1/catalog/items?room=bed&group=sound");
    expect(r.body.items.map((i: { code: string }) => i.code)).toEqual(["cat", "clock", "radio", "diffuser", "vinyl", "musicbox", "fan"]);
  });

  it("tham số sai trả 400", async () => {
    const r = await request(app).get("/api/v1/catalog/items?room=out");
    expect(r.status).toBe(400);
    expect(r.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("có Cache-Control 1 giờ", async () => {
    expect((await request(app).get("/api/v1/catalog/items")).headers["cache-control"]).toBe("public, max-age=3600");
  });

  it("seeder đồ vật chạy lại vẫn 17 dòng (H6)", async () => {
    await seedItemTypes(db);
    expect(await db.itemType.count()).toBe(17);
  });
});
