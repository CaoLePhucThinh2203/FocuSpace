import crypto from "node:crypto";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { Db } from "../../lib/prisma";
import { config } from "../../config";
import { ApiError } from "../../lib/errors";

const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const publicUser = (u: { id: string; email: string; displayName: string; createdAt: Date }) => ({
  id: u.id, email: u.email, displayName: u.displayName, createdAt: u.createdAt.toISOString(),
});

/** AuthService (Class C3): đăng ký, đăng nhập, làm mới phiên, đăng xuất. */
export function authService(db: Db) {
  const signAccess = (userId: string) =>
    jwt.sign({}, config.jwtSecret, { subject: userId, expiresIn: config.accessTtlSec, algorithm: "HS256" });

  async function issueRefresh(userId: string, familyId: string = crypto.randomUUID()) {
    const token = crypto.randomBytes(32).toString("base64url");
    await db.refreshToken.create({
      data: { userId, familyId, tokenHash: sha256(token), expiresAt: new Date(Date.now() + config.refreshTtlDays * 864e5) },
    });
    return token;
  }

  async function session(user: Parameters<typeof publicUser>[0], familyId?: string) {
    return {
      body: { accessToken: signAccess(user.id), expiresIn: config.accessTtlSec, user: publicUser(user) },
      refreshToken: await issueRefresh(user.id, familyId),
    };
  }

  return {
    async dangKy(email: string, password: string, displayName: string) {
      if (await db.user.findUnique({ where: { email } })) throw new ApiError(409, "EMAIL_TAKEN", "Email này đã được dùng.");
      const user = await db.user.create({
        data: { email, displayName, passwordHash: await argon2.hash(password, { type: argon2.argon2id }) },
      });
      return session(user);
    },

    async dangNhap(email: string, password: string) {
      const user = await db.user.findUnique({ where: { email } });
      if (!user || !(await argon2.verify(user.passwordHash, password)))
        throw new ApiError(401, "INVALID_CREDENTIALS", "Email hoặc mật khẩu không đúng.");
      await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
      return session(user);
    },

    async lamMoiPhien(token?: string) {
      const invalid = new ApiError(401, "INVALID_REFRESH_TOKEN", "Phiên đăng nhập đã hết hạn.");
      if (!token) throw invalid;
      const row = await db.refreshToken.findUnique({ where: { tokenHash: sha256(token) }, include: { user: true } });
      if (!row) throw invalid;
      if (row.revokedAt) {
        // Dùng lại token đã thu hồi → nghi bị đánh cắp, thu hồi cả chuỗi (API 4.4).
        await db.refreshToken.updateMany({ where: { familyId: row.familyId, revokedAt: null }, data: { revokedAt: new Date() } });
        throw invalid;
      }
      if (row.expiresAt < new Date()) throw invalid;
      await db.refreshToken.update({ where: { id: row.id }, data: { revokedAt: new Date() } });
      return session(row.user, row.familyId);
    },

    async dangXuat(token?: string) {
      if (!token) return;
      await db.refreshToken.updateMany({ where: { tokenHash: sha256(token), revokedAt: null }, data: { revokedAt: new Date() } });
    },

    async layTaiKhoan(userId: string) {
      const u = await db.user.findUnique({ where: { id: userId } });
      if (!u) throw new ApiError(401, "UNAUTHENTICATED", "Bạn cần đăng nhập.");
      return publicUser(u);
    },

    async doiTen(userId: string, displayName: string) {
      return publicUser(await db.user.update({ where: { id: userId }, data: { displayName } }));
    },

    async xoaTaiKhoan(userId: string, password: string) {
      const u = await db.user.findUnique({ where: { id: userId } });
      if (!u || !(await argon2.verify(u.passwordHash, password)))
        throw new ApiError(401, "INVALID_CREDENTIALS", "Mật khẩu không đúng.");
      await db.user.delete({ where: { id: userId } }); // cascade refresh_tokens, room_states; usage_sessions.user_id = NULL
    },
  };
}
