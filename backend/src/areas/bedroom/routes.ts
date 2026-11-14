import { Router, type CookieOptions } from "express";
import { z } from "zod";
import type { Db } from "../../lib/prisma";
import { config } from "../../config";
import { a } from "../../lib/http";
import { requireAuth } from "../../middleware/auth";
import * as rl from "../../middleware/rateLimit";
import { authService } from "./authService";
import { statsService } from "./statsService";

const RT_COOKIE = "fs_rt";
const cookieOpts = (): CookieOptions => ({
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: config.cookieSecure ? "none" : "lax",
  path: "/api/v1/auth",
  maxAge: config.refreshTtlDays * 864e5,
});
const email = z.string().trim().toLowerCase().email("Email không đúng định dạng.").max(254);
const password = z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự.").max(128);
const displayName = z.string().trim().min(1, "Tên hiển thị không được để trống.").max(40, "Tên hiển thị tối đa 40 ký tự.");

/** Tuấn Lộc — auth (L7), /me (L8), /me/stats (L9). */
export function bedroomRoutes(db: Db) {
  const r = Router();
  const auth = authService(db), stats = statsService(db);

  r.post("/auth/register", rl.registerLimiter, a(async (req, res) => {
    const b = z.object({ email, password, displayName }).parse(req.body);
    const s = await auth.dangKy(b.email, b.password, b.displayName);
    res.cookie(RT_COOKIE, s.refreshToken, cookieOpts()).status(201).json(s.body);
  }));
  r.post("/auth/login", rl.loginLimiter, a(async (req, res) => {
    const b = z.object({ email, password: z.string().min(1) }).parse(req.body);
    const s = await auth.dangNhap(b.email, b.password);
    res.cookie(RT_COOKIE, s.refreshToken, cookieOpts()).json(s.body);
  }));
  r.post("/auth/refresh", rl.refreshLimiter, a(async (req, res) => {
    try {
      const s = await auth.lamMoiPhien(req.cookies?.[RT_COOKIE]);
      res.cookie(RT_COOKIE, s.refreshToken, cookieOpts()).json(s.body);
    } catch (e) {
      res.clearCookie(RT_COOKIE, { path: "/api/v1/auth" });
      throw e;
    }
  }));
  r.post("/auth/logout", a(async (req, res) => {
    await auth.dangXuat(req.cookies?.[RT_COOKIE]);
    res.clearCookie(RT_COOKIE, { path: "/api/v1/auth" }).status(204).end();
  }));

  r.get("/me", requireAuth, rl.userLimiter, a(async (req, res) => res.json(await auth.layTaiKhoan(req.userId!))));
  r.patch("/me", requireAuth, rl.userLimiter, a(async (req, res) => {
    const b = z.object({ displayName }).parse(req.body);
    res.json(await auth.doiTen(req.userId!, b.displayName));
  }));
  r.delete("/me", requireAuth, rl.userLimiter, a(async (req, res) => {
    const b = z.object({ password: z.string().min(1, "Nhập mật khẩu để xác nhận.") }).parse(req.body);
    await auth.xoaTaiKhoan(req.userId!, b.password);
    res.clearCookie(RT_COOKIE, { path: "/api/v1/auth" }).status(204).end();
  }));
  r.get("/me/stats", requireAuth, rl.userLimiter, a(async (req, res) => {
    const q = z.object({
      range: z.enum(["7d", "30d", "all"]).default("7d"),
      tz: z.string().default("Asia/Ho_Chi_Minh").refine((tz) => {
        try { new Intl.DateTimeFormat("en", { timeZone: tz }); return true; } catch { return false; }
      }, "Múi giờ không hợp lệ."),
    }).parse(req.query);
    res.json(await stats.layThongKe(req.userId!, q.range, q.tz));
  }));
  return r;
}
