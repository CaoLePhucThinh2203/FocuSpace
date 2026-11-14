import { Router } from "express";
import { z } from "zod";
import type { Db } from "../../lib/prisma";
import { a } from "../../lib/http";
import { publicLimiter } from "../../middleware/rateLimit";
import { catalogItemsService } from "./catalogItemsService";

/** Tuấn Hưng — GET /catalog/items (H11). */
export function itemsAudioRoutes(db: Db) {
  const r = Router();
  const catalog = catalogItemsService(db);
  r.get("/catalog/items", publicLimiter, a(async (req, res) => {
    const q = z.object({ room: z.enum(["study", "bed"]).optional(), group: z.enum(["sound", "decor", "desk"]).optional() }).parse(req.query);
    res.set("Cache-Control", "public, max-age=3600").json({ items: await catalog.layDoVat(q.room, q.group) });
  }));
  return r;
}
