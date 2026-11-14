import type { Db } from "../../lib/prisma";

export interface Batch {
  clientId: string;
  sessions: {
    id: string; startedAt: string; endedAt?: string | null; setupMs?: number | null; interactionCount: number;
    visited: ("study" | "bed" | "out")[]; sleepTimerSet: boolean; sleepTimerCompleted: boolean;
  }[];
  pomodoros: {
    id: string; sessionId: string; mode: "focus" | "break"; plannedSec: number; startedAt: string;
    endedAt?: string | null; outcome: "completed" | "reset" | "abandoned";
  }[];
  errors: { sessionId: string; kind: "audio_context_create" | "audio_context_resume" | "storage_write"; message?: string | null; occurredAt: string }[];
}

/** TelemetryService (Class C3): nhận lô số liệu, upsert theo id nên gửi trùng không nhân đôi (API 4.11). */
export function telemetryService(db: Db) {
  return {
    async nhanLo(b: Batch, userId?: string) {
      await db.$transaction(async (tx) => {
        for (const s of b.sessions) {
          const data = {
            clientId: b.clientId, startedAt: new Date(s.startedAt), endedAt: s.endedAt ? new Date(s.endedAt) : null,
            setupMs: s.setupMs ?? null, interactionCount: s.interactionCount,
            visitedStudy: s.visited.includes("study"), visitedBed: s.visited.includes("bed"), visitedOut: s.visited.includes("out"),
            sleepTimerSet: s.sleepTimerSet, sleepTimerCompleted: s.sleepTimerCompleted,
            ...(userId ? { userId } : {}),
          };
          await tx.usageSession.upsert({ where: { id: s.id }, update: data, create: { id: s.id, ...data } });
        }
        for (const p of b.pomodoros) {
          const data = {
            usageSessionId: p.sessionId, mode: p.mode, plannedSec: p.plannedSec, startedAt: new Date(p.startedAt),
            endedAt: p.endedAt ? new Date(p.endedAt) : null, outcome: p.outcome,
          };
          await tx.pomodoroSession.upsert({ where: { id: p.id }, update: data, create: { id: p.id, ...data } });
        }
        for (const e of b.errors) {
          await tx.clientError.upsert({
            where: { usageSessionId_kind_occurredAt: { usageSessionId: e.sessionId, kind: e.kind, occurredAt: new Date(e.occurredAt) } },
            update: {},
            create: { usageSessionId: e.sessionId, kind: e.kind, message: e.message ?? null, occurredAt: new Date(e.occurredAt) },
          });
        }
      });
      return { sessions: b.sessions.length, pomodoros: b.pomodoros.length, errors: b.errors.length };
    },
  };
}