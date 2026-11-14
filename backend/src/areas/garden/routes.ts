import { Router } from "express";
import { z } from "zod";
import type { Db } from "../../lib/prisma";
import { a } from "../../lib/http";
import { optionalAuth } from "../../middleware/auth";
import { publicLimiter, telemetryLimiter } from "../../middleware/rateLimit";
import { scenesService } from "./scenesService";
import { telemetryService } from "./telemetryService";

const batchSchema = z.object({
  clientId: z.string().min(1).max(64),
  sessions: z.array(z.object({
    id: z.string().uuid(), startedAt: z.string().datetime(), endedAt: z.string().datetime().nullish(),
    setupMs: z.number().int().min(0).nullish(), interactionCount: z.number().int().min(0),
    visited: z.array(z.enum(["study", "bed", "out"])), sleepTimerSet: z.boolean(), sleepTimerCompleted: z.boolean(),
  })).max(50),
  pomodoros: z.array(z.object({
    id: z.string().uuid(), sessionId: z.string().uuid(), mode: z.enum(["focus", "break"]), plannedSec: z.number().int().positive(),
    startedAt: z.string().datetime(), endedAt: z.string().datetime().nullish(), outcome: z.enum(["completed", "reset", "abandoned"]),
  })).max(200),
  errors: z.array(z.object({
    sessionId: z.string().uuid(), kind: z.enum(["audio_context_create", "audio_context_resume", "storage_write"]),
    message: z.string().max(500).nullish(), occurredAt: z.string().datetime(),
  })).max(100),
});

/** Đình Nhiên — GET /catalog/scenes (N8), POST /telemetry/batch (N9). */
export function gardenRoutes(db: Db) {
  const r = Router();
  const scenes = scenesService(db), telemetry = telemetryService(db);
  r.get("/catalog/scenes", publicLimiter, a(async (_req, res) => {
    res.set("Cache-Control", "public, max-age=3600").json({ scenes: await scenes.layKhungCanh() });
  }));
  r.post("/telemetry/batch", optionalAuth, telemetryLimiter, a(async (req, res) => {
    const b = batchSchema.parse(req.body);
    res.status(202).json({ accepted: await telemetry.nhanLo(b, req.userId) });
  }));
  return r;
}