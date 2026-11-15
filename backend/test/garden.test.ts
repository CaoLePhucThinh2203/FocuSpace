import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { randomUUID } from "node:crypto";
import { seedScenes } from "../src/areas/garden/seed";
import { app, db, makeUser, resetData } from "./setup/db";

function batch(clientId = "cl-test") {
  const sid = randomUUID();
  return {
    clientId,
    sessions: [{ id: sid, startedAt: "2026-11-15T09:00:00.000Z", endedAt: "2026-11-15T09:55:00.000Z", setupMs: 8200, interactionCount: 3, visited: ["study", "out"], sleepTimerSet: false, sleepTimerCompleted: false }],
    pomodoros: [{ id: randomUUID(), sessionId: sid, mode: "focus", plannedSec: 1500, startedAt: "2026-11-15T09:01:00.000Z", endedAt: "2026-11-15T09:26:00.000Z", outcome: "completed" }],
    errors: [{ sessionId: sid, kind: "audio_context_resume", message: "NotAllowedError", occurredAt: "2026-11-15T09:00:01.000Z" }],
  };
}
const send = (b: unknown, auth?: string) => {
  const r = request(app).post("/api/v1/telemetry/batch");
  return (auth ? r.set("Authorization", auth) : r).send(b as object);
};

describe("Khung cảnh và telemetry (N8, N9) — integration", () => {
  beforeEach(resetData);

  it("GET /catalog/scenes trả 5 khung cảnh, đúng 1 mặc định là Khu rừng, Cache-Control 1 giờ (AC-07.3)", async () => {
    const r = await request(app).get("/api/v1/catalog/scenes");
    expect(r.status).toBe(200);
    expect(r.headers["cache-control"]).toBe("public, max-age=3600");
    expect(r.body.scenes.map((s: { code: string }) => s.code)).toEqual(["city", "forest", "beach", "glacier", "hill"]);
    expect(r.body.scenes.filter((s: { isDefault: boolean }) => s.isDefault).map((s: { code: string }) => s.code)).toEqual(["forest"]);
  });

  it("seeder khung cảnh chạy lại vẫn 5 dòng (N4)", async () => {
    await seedScenes(db);
    expect(await db.scene.count()).toBe(5);
  });

  it("POST /telemetry/batch trả 202 và ghi phiên, Pomodoro, lỗi", async () => {
    const r = await send(batch());
    expect(r.status).toBe(202);
    expect(r.body.accepted).toEqual({ sessions: 1, pomodoros: 1, errors: 1 });
    const s = await db.usageSession.findFirstOrThrow();
    expect(s).toMatchObject({ clientId: "cl-test", setupMs: 8200, interactionCount: 3, visitedStudy: true, visitedOut: true, visitedBed: false, userId: null });
    expect(await db.pomodoroSession.count()).toBe(1);
    expect(await db.clientError.count()).toBe(1);
  });

  it("gửi trùng lô không nhân đôi dòng; gửi lại phiên thì cập nhật", async () => {
    const b = batch();
    await send(b);
    b.sessions[0].interactionCount = 7;
    expect((await send(b)).status).toBe(202);
    expect(await db.usageSession.count()).toBe(1);
    expect(await db.pomodoroSession.count()).toBe(1);
    expect(await db.clientError.count()).toBe(1);
    expect((await db.usageSession.findFirstOrThrow()).interactionCount).toBe(7);
  });

  it("có access token thì gắn user_id", async () => {
    const { user, auth } = await makeUser();
    await send(batch("cl-user"), auth);
    expect((await db.usageSession.findFirstOrThrow()).userId).toBe(user.id);
  });

  it("mode sai trả 400 VALIDATION_ERROR kèm đường dẫn trường", async () => {
    const b = batch();
    (b.pomodoros[0] as { mode: string }).mode = "short";
    const r = await send(b);
    expect(r.status).toBe(400);
    expect(r.body.error.details[0].path).toBe("pomodoros.0.mode");
  });

  it("lô > 256 KB trả 413", async () => {
    const r = await send({ ...batch(), pad: "x".repeat(300_000) });
    expect(r.status).toBe(413);
    expect(r.body.error.code).toBe("PAYLOAD_TOO_LARGE");
  });

  it("quá 60 lô/giờ/clientId trả 429", async () => {
    const empty = { clientId: "cl-spam", sessions: [], pomodoros: [], errors: [] };
    for (let i = 0; i < 60; i++) expect((await send(empty)).status).toBe(202);
    const r = await send(empty);
    expect(r.status).toBe(429);
    expect(r.body.error.code).toBe("RATE_LIMITED");
    expect((await send({ ...empty, clientId: "cl-khac" })).status).toBe(202);   // clientId khác không bị chặn
  });
});
