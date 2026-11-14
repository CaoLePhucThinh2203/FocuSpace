import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import type { Db } from "../src/lib/prisma";

process.env.NODE_ENV = "test";

// DB giả: chỉ đủ cho các test không cần PostgreSQL thật.
const db = {
  $queryRaw: vi.fn().mockResolvedValue([{ "?column?": 1 }]),
  itemType: { findMany: vi.fn().mockResolvedValue([]) },
  scene: { findMany: vi.fn().mockResolvedValue([]) },
} as unknown as Db;
const app = createApp({ db });

describe("API cơ bản", () => {
  it("GET /api/v1/health trả 200", async () => {
    const r = await request(app).get("/api/v1/health");
    expect(r.status).toBe(200);
    expect(r.body.status).toBe("ok");
  });
  it("endpoint 🔒 không có token trả 401 UNAUTHENTICATED", async () => {
    const r = await request(app).get("/api/v1/room-state");
    expect(r.status).toBe(401);
    expect(r.body.error.code).toBe("UNAUTHENTICATED");
  });
  it("đăng ký với mật khẩu 7 ký tự trả 400 VALIDATION_ERROR (AC-08.2)", async () => {
    const r = await request(app).post("/api/v1/auth/register").send({ email: "a@b.vn", password: "1234567", displayName: "A" });
    expect(r.status).toBe(400);
    expect(r.body.error.code).toBe("VALIDATION_ERROR");
  });
  it("GET /catalog/items lọc sai tham số trả 400", async () => {
    const r = await request(app).get("/api/v1/catalog/items?room=kitchen");
    expect(r.status).toBe(400);
  });
  it("đường dẫn không tồn tại trả 404 NOT_FOUND", async () => {
    const r = await request(app).get("/api/v1/khong-co");
    expect(r.status).toBe(404);
  });
  it.todo("đăng ký → đăng nhập → refresh xoay vòng (cần PostgreSQL test)");
  it.todo("PUT /room-state baseRevision cũ trả 409 REVISION_CONFLICT (AC-09.2)");
  it.todo("POST /telemetry/batch gửi trùng không nhân đôi dòng");
});
