import { Router } from "express";
import type { Db } from "../lib/prisma";
import { a } from "../lib/http";
import { loadAreaExports } from "../lib/areas";

/** Router /api/v1: health (base) + router của mọi khu vực có trong src/areas/ (docs/PLAN.md §2). */
export async function apiRouter(db: Db) {
  const r = Router();

  // 4.1 Health
  r.get("/health", a(async (_req, res) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: "ok", db: "ok", time: new Date().toISOString() });
    } catch {
      res.status(503).json({ status: "degraded", db: "down", time: new Date().toISOString() });
    }
  }));

  // study (Thịnh): /room-state · items-audio (Hưng): /catalog/items · garden (Nhiên): /catalog/scenes, /telemetry/batch
  // bedroom (Lộc): /auth/*, /me, /me/stats — khu vực nào chưa có routes.ts thì endpoint đó trả 404.
  for (const { fn } of await loadAreaExports("routes", (n) => n.endsWith("Routes"))) r.use(fn(db));
  return r;
}
