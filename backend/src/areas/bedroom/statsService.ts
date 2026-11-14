import type { Db } from "../../lib/prisma";

const dayKey = (d: Date, tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(d); // YYYY-MM-DD

/** StatsService (Class C3): số liệu trang Thống kê từ pomodoro_sessions ⨝ usage_sessions của chính người dùng (API 4.14). */
export function statsService(db: Db) {
  return {
    async layThongKe(userId: string, range: "7d" | "30d" | "all", tz: string) {
      const now = new Date();
      const today = dayKey(now, tz);
      const days = range === "7d" ? 7 : range === "30d" ? 30 : 0;
      const since = days ? new Date(now.getTime() - (days + 1) * 864e5) : new Date(0);

      const [poms, sessions] = await Promise.all([
        db.pomodoroSession.findMany({
          where: { usageSession: { userId }, startedAt: { gte: since } },
          orderBy: { startedAt: "desc" },
        }),
        db.usageSession.findMany({ where: { userId, startedAt: { gte: since } }, select: { startedAt: true } }),
      ]);

      // Lọc chính xác theo ngày của múi giờ tz
      let from: string;
      if (days) {
        const d = new Date(now.getTime() - (days - 1) * 864e5);
        from = dayKey(d, tz);
      } else {
        const first = [...poms.map((p) => p.startedAt), ...sessions.map((s) => s.startedAt)].sort((a, b) => +a - +b)[0];
        from = first ? dayKey(first, tz) : today;
      }
      const inRange = (d: Date) => dayKey(d, tz) >= from;
      const focus = poms.filter((p) => p.mode === "focus" && inRange(p.startedAt));

      const minutes = (p: (typeof poms)[number]) => (p.endedAt ? Math.max(0, (+p.endedAt - +p.startedAt) / 60000) : 0);
      const completed = focus.filter((p) => p.outcome === "completed").length;
      const daily = new Map<string, { focusMinutes: number; pomodoroCompleted: number }>();
      for (let t = new Date(from + "T12:00:00Z"); dayKey(t, "UTC") <= today; t = new Date(+t + 864e5)) {
        daily.set(dayKey(t, "UTC"), { focusMinutes: 0, pomodoroCompleted: 0 });
      }
      for (const p of focus) {
        const k = dayKey(p.startedAt, tz);
        const row = daily.get(k);
        if (!row) continue;
        row.focusMinutes += minutes(p);
        if (p.outcome === "completed") row.pomodoroCompleted += 1;
      }

      return {
        range, from, to: today,
        totals: {
          focusMinutes: Math.floor(focus.reduce((a, p) => a + minutes(p), 0)),
          pomodoroCompleted: completed,
          pomodoroStarted: focus.length,
          completionRate: focus.length ? Math.round((completed / focus.length) * 100) / 100 : 0,
          sessions: sessions.filter((s) => inRange(s.startedAt)).length,
        },
        daily: [...daily.entries()].map(([date, v]) => ({ date, focusMinutes: Math.floor(v.focusMinutes), pomodoroCompleted: v.pomodoroCompleted })),
        recent: poms.slice(0, 10).map((p) => ({
          id: p.id, mode: p.mode, plannedSec: p.plannedSec, startedAt: p.startedAt.toISOString(),
          endedAt: p.endedAt?.toISOString() ?? null, outcome: p.outcome,
        })),
      };
    },
  };
}
