import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../lib/errors";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Không tìm thấy đường dẫn." } });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    const first = err.issues[0];
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: first?.message ?? "Dữ liệu không hợp lệ.",
        details: err.issues.map((i) => ({ path: i.path.join("."), issue: i.code })),
      },
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message }, ...(err.extra ?? {}) });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: { code: "PAYLOAD_TOO_LARGE", message: "Dữ liệu gửi lên quá lớn." } });
  }
  req.log?.error(err);
  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Lỗi máy chủ, vui lòng thử lại." } });
};
