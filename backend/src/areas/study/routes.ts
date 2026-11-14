import { Router } from "express";
import { z } from "zod";
import { MAX_ROOM_BYTES, RoomStateSchema } from "@focuspace/shared";
import type { Db } from "../../lib/prisma";
import { ApiError } from "../../lib/errors";
import { a } from "../../lib/http";
import { requireAuth } from "../../middleware/auth";
import { userLimiter } from "../../middleware/rateLimit";
import { roomStateService } from "./roomStateService";

/** Phúc Thịnh — GET/PUT /room-state (T12). */
export function studyRoutes(db: Db) {
  const r = Router();
  const rooms = roomStateService(db);
  r.get("/room-state", requireAuth, userLimiter, a(async (req, res) => res.json(await rooms.layTrangThai(req.userId!))));
  r.put("/room-state", requireAuth, userLimiter, a(async (req, res) => {
    const b = z.object({
      data: RoomStateSchema, baseRevision: z.number().int().min(0), deviceId: z.string().min(1).max(64), force: z.boolean().optional(),
    }).parse(req.body);
    if (Buffer.byteLength(JSON.stringify(b.data)) > MAX_ROOM_BYTES)
      throw new ApiError(413, "PAYLOAD_TOO_LARGE", "Trạng thái phòng vượt quá 64 KB.");
    res.json(await rooms.luuTrangThai(req.userId!, b.data, b.baseRevision, b.deviceId, b.force));
  }));
  return r;
}
