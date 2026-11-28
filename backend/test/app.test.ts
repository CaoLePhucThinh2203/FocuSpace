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
  // Route thử Sentry trên bản triển khai (#182): chỉ chạy khi SENTRY_TEST_ROUTE=1.
  it("GET /api/v1/debug/sentry khi chưa bật SENTRY_TEST_ROUTE trả 404 NOT_FOUND", async () => {
    delete process.env.SENTRY_TEST_ROUTE;
    const r = await request(app).get("/api/v1/debug/sentry");
    expect(r.status).toBe(404);
    expect(r.body.error.code).toBe("NOT_FOUND");
  });
  it("GET /api/v1/debug/sentry khi SENTRY_TEST_ROUTE=1 trả 500 INTERNAL_ERROR, không lộ nội dung lỗi", async () => {
    process.env.SENTRY_TEST_ROUTE = "1";
    try {
      const r = await request(app).get("/api/v1/debug/sentry");
      expect(r.status).toBe(500);
      expect(r.body.error.code).toBe("INTERNAL_ERROR");
      expect(r.body.error.message).not.toContain("Kiểm tra Sentry");
    } finally {
      delete process.env.SENTRY_TEST_ROUTE;
    }
  });
  // Đăng ký/đăng nhập/refresh, 409 REVISION_CONFLICT, telemetry gửi trùng: integration test trên PostgreSQL thật
  // ở bedroom.test.ts, study.test.ts, garden.test.ts (DB tạm dựng trong test/setup/globalSetup.ts).
});
