/** Kết nối DB test, app Express và tiện ích tạo dữ liệu cho integration test (Supertest + PostgreSQL thật). */
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { inject } from "vitest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";

export const db = new PrismaClient({ datasourceUrl: inject("databaseUrl") });
export const app = await createApp({ db });

/** Xóa dữ liệu người dùng và số liệu giữa các test; giữ danh mục do seeder nạp. */
export async function resetData() {
  await db.$executeRawUnsafe(
    `TRUNCATE users, refresh_tokens, room_states, usage_sessions, pomodoro_sessions, client_errors RESTART IDENTITY CASCADE`,
  );
}

export const PASSWORD = "matkhau-dung-1";

/** Tạo tài khoản thẳng trong DB (không đi qua /auth/register để không chạm giới hạn 10 lần/15 phút) và cấp access token. */
export async function makeUser(email = "linh@example.com", displayName = "Linh") {
  const user = await db.user.create({
    data: { email, displayName, passwordHash: await argon2.hash(PASSWORD, { type: argon2.argon2id }) },
  });
  const token = jwt.sign({}, config.jwtSecret, { subject: user.id, expiresIn: config.accessTtlSec, algorithm: "HS256" });
  return { user, token, auth: `Bearer ${token}` };
}

/** Lấy giá trị cookie fs_rt từ header Set-Cookie. */
export function refreshCookie(setCookie: string | string[] | undefined): string | undefined {
  const list = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const c = list.find((s) => s.startsWith("fs_rt="));
  return c ? c.split(";")[0].slice("fs_rt=".length) : undefined;
}
