import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ApiError } from "../src/lib/errors";
import { shouldReportError } from "../src/middleware/error";

describe("shouldReportError", () => {
  it("không gửi lỗi kiểm tra dữ liệu (ZodError → 400)", () => {
    const r = z.object({ email: z.string() }).safeParse({});
    expect(r.success).toBe(false);
    expect(shouldReportError(r.error)).toBe(false);
  });

  it("không gửi lỗi nghiệp vụ dưới 500", () => {
    expect(shouldReportError(new ApiError(401, "UNAUTHENTICATED", "Bạn cần đăng nhập."))).toBe(false);
    expect(shouldReportError(new ApiError(409, "CONFLICT", "Xung đột phiên bản."))).toBe(false);
  });

  it("không gửi lỗi body quá lớn (413)", () => {
    const err = Object.assign(new Error("request entity too large"), { type: "entity.too.large", status: 413 });
    expect(shouldReportError(err)).toBe(false);
  });

  it("gửi lỗi máy chủ", () => {
    expect(shouldReportError(new Error("boom"))).toBe(true);
    expect(shouldReportError(new ApiError(503, "DB_DOWN", "Mất kết nối CSDL."))).toBe(true);
  });
});
