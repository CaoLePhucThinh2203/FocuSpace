import rateLimit from "express-rate-limit";

/** Giới hạn theo API §5.1. */
const msg = { error: { code: "RATE_LIMITED", message: "Bạn thử quá nhiều lần. Vui lòng đợi rồi thử lại." } };
const base = { standardHeaders: "draft-6" as const, legacyHeaders: false, message: msg };

export const registerLimiter = rateLimit({ ...base, windowMs: 15 * 60_000, limit: 10 });
export const loginLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60_000,
  limit: 10,
  keyGenerator: (req) => `${req.ip}|${String(req.body?.email ?? "").toLowerCase()}`,
});
export const refreshLimiter = rateLimit({ ...base, windowMs: 15 * 60_000, limit: 30 });
export const telemetryLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60_000,
  limit: 60,
  keyGenerator: (req) => String(req.body?.clientId ?? req.ip),
});
export const userLimiter = rateLimit({ ...base, windowMs: 60_000, limit: 120, keyGenerator: (req) => req.userId ?? req.ip ?? "" });
export const publicLimiter = rateLimit({ ...base, windowMs: 60_000, limit: 120 });
