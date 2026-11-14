import { Router } from "express";
import type { Db } from "../lib/prisma";
import { a } from "../lib/http";
import { itemsAudioRoutes } from "../areas/items-audio/routes";
import { gardenRoutes } from "../areas/garden/routes";
import { bedroomRoutes } from "../areas/bedroom/routes";
import { studyRoutes } from "../areas/study/routes";

/** Gộp router của 4 khu vực (docs/PLAN.md §2) dưới /api/v1. */
export function apiRouter(db: Db) {
  const r = Router();

  // 4.1 Health — phần chung (Thịnh)
  r.get("/health", a(async (_req, res) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: "ok", db: "ok", time: new Date().toISOString() });
    } catch {
      res.status(503).json({ status: "degraded", db: "down", time: new Date().toISOString() });
    }
  }));

  r.use(itemsAudioRoutes(db)); // Tuấn Hưng: /catalog/items
  r.use(gardenRoutes(db)); // Đình Nhiên: /catalog/scenes, /telemetry/batch
  r.use(bedroomRoutes(db)); // Tuấn Lộc: /auth/*, /me, /me/stats
  r.use(studyRoutes(db)); // Phúc Thịnh: /room-state
  return r;
}
