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
const app = await createApp({ db });

/** Test của base: chỉ dùng endpoint của base (health, /room-state). Endpoint các khu vực test trong file riêng. */
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
  it("đường dẫn không tồn tại trả 404 NOT_FOUND", async () => {
    const r = await request(app).get("/api/v1/khong-co");
    expect(r.status).toBe(404);
  });
  it.todo("đăng ký → đăng nhập → refresh xoay vòng (cần PostgreSQL test)");
  it.todo("PUT /room-state baseRevision cũ trả 409 REVISION_CONFLICT (AC-09.2)");
  it.todo("POST /telemetry/batch gửi trùng không nhân đôi dòng");
});
