/**
 * Dựng PostgreSQL 16 tạm cho integration test (CLAUDE.md: DB `focuspace_test`).
 * Mặc định khởi động embedded-postgres trong thư mục tạm, chạy `prisma migrate deploy` và seeder danh mục;
 * đặt TEST_DATABASE_URL để dùng một PostgreSQL có sẵn. Chỉ chấp nhận DB trên localhost — không bao giờ chạm DB triển khai.
 */
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import EmbeddedPostgres from "embedded-postgres";
import { PrismaClient } from "@prisma/client";
import type { GlobalSetupContext } from "vitest/node";
import { seedItemTypes } from "../../src/areas/items-audio/seed";
import { seedScenes } from "../../src/areas/garden/seed";

declare module "vitest" {
  export interface ProvidedContext { databaseUrl: string }
}

const freePort = () =>
  new Promise<number>((resolve, reject) => {
    const s = net.createServer().listen(0, "127.0.0.1", () => {
      const { port } = s.address() as net.AddressInfo;
      s.close(() => resolve(port));
    }).on("error", reject);
  });

export default async function setup({ provide }: GlobalSetupContext) {
  let pg: EmbeddedPostgres | null = null;
  let dir = "";
  let url = process.env.TEST_DATABASE_URL ?? "";

  if (!url) {
    const port = await freePort();
    dir = mkdtempSync(path.join(os.tmpdir(), "focuspace-pg-"));
    pg = new EmbeddedPostgres({
      databaseDir: dir, port, user: "postgres", password: "postgres", persistent: false, onLog: () => {},
      initdbFlags: ["--encoding=UTF8", "--locale=C"],   // Windows mặc định WIN1252: không lưu được tiếng Việt
    });
    url = `postgresql://postgres:postgres@127.0.0.1:${port}/focuspace_test?schema=public`;
  }

  const teardown = async () => {
    if (pg) await pg.stop().catch(() => {});
    if (dir) rmSync(dir, { recursive: true, force: true });
  };

  try {
    if (pg) {
      await pg.initialise();
      await pg.start();
      await pg.createDatabase("focuspace_test");
    }
    const host = new URL(url).hostname;
    if (!["localhost", "127.0.0.1", "::1"].includes(host)) throw new Error(`Integration test chỉ chạy trên DB localhost, nhận được host "${host}".`);

    execSync("npx prisma migrate deploy --schema prisma/schema.prisma", {
      cwd: fileURLToPath(new URL("../..", import.meta.url)),
      env: { ...process.env, DATABASE_URL: url },
      stdio: "pipe",
    });
    const db = new PrismaClient({ datasourceUrl: url });
    await seedItemTypes(db);
    await seedScenes(db);
    await db.$disconnect();
  } catch (e) {
    await teardown();
    throw e;
  }

  provide("databaseUrl", url);
  return teardown;
}
