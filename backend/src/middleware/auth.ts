import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { unauthenticated } from "../lib/errors";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

function readUser(header?: string): string | undefined {
  if (!header?.startsWith("Bearer ")) return undefined;
  try {
    const p = jwt.verify(header.slice(7), config.jwtSecret) as jwt.JwtPayload;
    return typeof p.sub === "string" ? p.sub : undefined;
  } catch {
    return undefined;
  }
}

/** Bắt buộc đăng nhập (endpoint 🔒). */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const id = readUser(req.headers.authorization);
  if (!id) return next(unauthenticated());
  req.userId = id;
  next();
};

/** Không bắt buộc: nếu có token hợp lệ thì gắn userId (telemetry). */
export const optionalAuth: RequestHandler = (req, _res, next) => {
  req.userId = readUser(req.headers.authorization);
  next();
};
