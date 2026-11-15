import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { randomUUID } from "node:crypto";
import { flatToV4 } from "@focuspace/shared";
import { app, db, makeUser, PASSWORD, refreshCookie, resetData } from "./setup/db";

const login = (email: string, password = PASSWORD) => request(app).post("/api/v1/auth/login").send({ email, password });
const refresh = (rt?: string) => {
  const r = request(app).post("/api/v1/auth/refresh");
  return rt ? r.set("Cookie", `fs_rt=${rt}`) : r;
};

describe("Auth, /me, /me/stats (L2, L7–L9) — integration", () => {
  beforeEach(resetData);

  it("register 201 + cookie fs_rt httpOnly; email trùng (không phân biệt hoa thường) trả 409 EMAIL_TAKEN", async () => {
    const r = await request(app).post("/api/v1/auth/register").send({ email: "Linh@Example.com", password: "12345678", displayName: "Linh" });
    expect(r.status).toBe(201);
    expect(r.body).toMatchObject({ expiresIn: 900, user: { email: "linh@example.com", displayName: "Linh" } });
    expect(typeof r.body.accessToken).toBe("string");
    const cookie = ([] as string[]).concat(r.headers["set-cookie"] ?? []).find((c) => c.startsWith("fs_rt="))!;
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/Path=\/api\/v1\/auth/);
    const dup = await request(app).post("/api/v1/auth/register").send({ email: "LINH@example.com", password: "12345678", displayName: "Khác" });
    expect(dup.status).toBe(409);
    expect(dup.body.error.code).toBe("EMAIL_TAKEN");
  });

  it("register mật khẩu 7 ký tự trả 400 (BR-08)", async () => {
    const r = await request(app).post("/api/v1/auth/register").send({ email: "a@example.com", password: "1234567", displayName: "A" });
    expect(r.status).toBe(400);
    expect(r.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("login sai trả 401 INVALID_CREDENTIALS (AC-08.4); đúng thì 200 và ghi lần đăng nhập cuối", async () => {
    const { user } = await makeUser("sai@example.com");
    const bad = await login("sai@example.com", "khong-dung-123");
    expect(bad.status).toBe(401);
    expect(bad.body.error).toEqual({ code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không đúng." });
    const ok = await login("sai@example.com");
    expect(ok.status).toBe(200);
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).lastLoginAt).not.toBeNull();
  });

  it("login lần 11 trong 15 phút trả 429 RATE_LIMITED (AC-08.3, BR-09)", async () => {
    await makeUser("gioihan@example.com");
    for (let i = 0; i < 10; i++) expect((await login("gioihan@example.com", "sai-" + i + "xxxx")).status).toBe(401);
    const r = await login("gioihan@example.com");
    expect(r.status).toBe(429);
    expect(r.body.error).toEqual({ code: "RATE_LIMITED", message: "Bạn thử quá nhiều lần. Vui lòng đợi rồi thử lại." });
  });

  it("refresh xoay vòng; dùng lại token cũ thì thu hồi cả family", async () => {
    await makeUser("xoay@example.com");
    const rt1 = refreshCookie((await login("xoay@example.com")).headers["set-cookie"])!;
    const r2 = await refresh(rt1);
    expect(r2.status).toBe(200);
    const rt2 = refreshCookie(r2.headers["set-cookie"])!;
    expect(rt2).not.toBe(rt1);
    const reuse = await refresh(rt1);
    expect(reuse.status).toBe(401);
    expect(reuse.body.error.code).toBe("INVALID_REFRESH_TOKEN");
    expect((await refresh(rt2)).status).toBe(401);   // cả chuỗi đã bị thu hồi
  });

  it("refresh không có cookie trả 401", async () => {
    expect((await refresh()).status).toBe(401);
  });

  it("logout 204, xóa cookie; refresh token đó không dùng lại được", async () => {
    await makeUser("ra@example.com");
    const rt = refreshCookie((await login("ra@example.com")).headers["set-cookie"])!;
    const out = await request(app).post("/api/v1/auth/logout").set("Cookie", `fs_rt=${rt}`);
    expect(out.status).toBe(204);
    expect(String(out.headers["set-cookie"])).toMatch(/fs_rt=;/);
    expect((await refresh(rt)).status).toBe(401);
  });

  it("GET /me trả thông tin; PATCH /me tên rỗng hoặc > 40 ký tự trả 400, tên hợp lệ thì đổi (AC-11.1)", async () => {
    const { auth } = await makeUser("me@example.com");
    expect((await request(app).get("/api/v1/me").set("Authorization", auth)).body).toMatchObject({ email: "me@example.com", displayName: "Linh" });
    expect((await request(app).patch("/api/v1/me").set("Authorization", auth).send({ displayName: "   " })).status).toBe(400);
    expect((await request(app).patch("/api/v1/me").set("Authorization", auth).send({ displayName: "x".repeat(41) })).status).toBe(400);
    const ok = await request(app).patch("/api/v1/me").set("Authorization", auth).send({ displayName: "Linh Mới" });
    expect(ok.status).toBe(200);
    expect(ok.body.displayName).toBe("Linh Mới");
  });

  it("DELETE /me sai mật khẩu 401; đúng thì xóa cascade, usage_sessions.user_id = NULL (AC-11.3)", async () => {
    const { user, auth } = await makeUser("xoa@example.com");
    await db.roomStateRow.create({ data: { userId: user.id, schemaVer: 4, data: flatToV4({}) as object, revision: 1, updatedFrom: "dev", updatedAt: new Date() } });
    const sid = randomUUID();
    await db.usageSession.create({ data: { id: sid, clientId: "cl-x", userId: user.id, startedAt: new Date(), interactionCount: 0, visitedStudy: true, visitedBed: false, visitedOut: false, sleepTimerSet: false, sleepTimerCompleted: false } });
    const bad = await request(app).delete("/api/v1/me").set("Authorization", auth).send({ password: "khong-dung-123" });
    expect(bad.status).toBe(401);
    expect(bad.body.error.message).toBe("Mật khẩu không đúng.");
    expect((await request(app).delete("/api/v1/me").set("Authorization", auth).send({ password: PASSWORD })).status).toBe(204);
    expect(await db.user.count()).toBe(0);
    expect(await db.roomStateRow.count()).toBe(0);
    expect((await db.usageSession.findUniqueOrThrow({ where: { id: sid } })).userId).toBeNull();
  });

  describe("GET /me/stats (L9, UC.10)", () => {
    const MIN = 60_000, DAY = 864e5;
    async function seedStats(userId: string) {
      const now = Date.now();
      const sid = randomUUID(), old = randomUUID();
      await db.usageSession.create({ data: { id: sid, clientId: "cl-s", userId, startedAt: new Date(now - 2 * 60 * MIN), interactionCount: 3, visitedStudy: true, visitedBed: false, visitedOut: false, sleepTimerSet: false, sleepTimerCompleted: false } });
      await db.usageSession.create({ data: { id: old, clientId: "cl-s", userId, startedAt: new Date(now - 40 * DAY), interactionCount: 1, visitedStudy: true, visitedBed: false, visitedOut: false, sleepTimerSet: false, sleepTimerCompleted: false } });
      const pom = (usageSessionId: string, mode: string, start: number, mins: number, outcome: string) =>
        db.pomodoroSession.create({ data: { id: randomUUID(), usageSessionId, mode, plannedSec: mins * 60, startedAt: new Date(start), endedAt: new Date(start + mins * MIN), outcome } });
      await pom(sid, "focus", now - 100 * MIN, 25, "completed");
      await pom(sid, "focus", now - 70 * MIN, 25, "completed");
      await pom(sid, "break", now - 45 * MIN, 5, "completed");     // nghỉ không tính phút tập trung
      await pom(sid, "focus", now - 30 * MIN, 10, "reset");
      await pom(old, "focus", now - 40 * DAY, 25, "completed");    // ngoài 7 và 30 ngày
    }

    it("7 ngày: đúng phút tập trung, số Focus hoàn thành, tỷ lệ, số phiên; daily đủ 7 ngày kể cả 0 (AC-10.1)", async () => {
      const { user, auth } = await makeUser("tk@example.com");
      await seedStats(user.id);
      const r = await request(app).get("/api/v1/me/stats?range=7d&tz=Asia/Ho_Chi_Minh").set("Authorization", auth);
      expect(r.status).toBe(200);
      expect(r.body.totals).toEqual({ focusMinutes: 60, pomodoroCompleted: 2, pomodoroStarted: 3, completionRate: 0.67, sessions: 1 });
      expect(r.body.daily).toHaveLength(7);
      expect(r.body.daily.reduce((a: number, d: { focusMinutes: number }) => a + d.focusMinutes, 0)).toBe(60);
      expect(r.body.recent.map((p: { mode: string; outcome: string }) => `${p.mode}:${p.outcome}`)).toEqual(["focus:reset", "break:completed", "focus:completed", "focus:completed"]);
    });

    it("30 ngày và Tất cả theo đúng khoảng (AC-10.2)", async () => {
      const { user, auth } = await makeUser("tk2@example.com");
      await seedStats(user.id);
      const m30 = await request(app).get("/api/v1/me/stats?range=30d").set("Authorization", auth);
      expect(m30.body.totals.pomodoroCompleted).toBe(2);
      expect(m30.body.daily).toHaveLength(30);
      const all = await request(app).get("/api/v1/me/stats?range=all").set("Authorization", auth);
      expect(all.body.totals).toMatchObject({ focusMinutes: 85, pomodoroCompleted: 3, sessions: 2 });
    });

    it("chỉ thấy số liệu của chính mình (BR-11); chưa đăng nhập 401; múi giờ sai 400", async () => {
      const a = await makeUser("a@example.com");
      const b = await makeUser("b@example.com");
      await seedStats(a.user.id);
      const rb = await request(app).get("/api/v1/me/stats?range=all").set("Authorization", b.auth);
      expect(rb.body.totals).toMatchObject({ focusMinutes: 0, pomodoroCompleted: 0, sessions: 0 });
      expect((await request(app).get("/api/v1/me/stats")).status).toBe(401);
      expect((await request(app).get("/api/v1/me/stats?tz=Sao/Hoa").set("Authorization", a.auth)).status).toBe(400);
    });
  });
});
