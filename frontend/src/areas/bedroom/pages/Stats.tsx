import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../lib/api";
import { useTitle } from "../../../lib/useTitle";
import { useAuth } from "../../../store/auth";

interface StatsRes {
  range: string; from: string; to: string;
  totals: { focusMinutes: number; pomodoroCompleted: number; pomodoroStarted: number; completionRate: number; sessions: number };
  daily: { date: string; focusMinutes: number; pomodoroCompleted: number }[];
  recent: { id: string; mode: string; plannedSec: number; startedAt: string; endedAt: string | null; outcome: string }[];
}
const RANGES: [string, string][] = [["7d", "7 ngày"], ["30d", "30 ngày"], ["all", "Tất cả"]];
const OUTCOME: Record<string, string> = { completed: "Hoàn thành", reset: "Đặt lại", abandoned: "Bỏ dở" };
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Ho_Chi_Minh";

/** Thống kê học tập — trang động đọc CSDL (UC.10, FR-STAT-01→06). */
export default function Stats() {
  useTitle("Thống kê học tập — FocuSpace", "Số phút tập trung, số Pomodoro hoàn thành và các phiên học gần nhất của bạn trên FocuSpace.");
  const { user, ready } = useAuth();
  const [range, setRange] = useState("7d");
  const [data, setData] = useState<StatsRes | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!user) return;
    setErr(false);
    // TODO N10: gửi ngay lô telemetry đang chờ trước khi tải (FR-STAT-06)
    api<StatsRes>(`/me/stats?range=${range}&tz=${encodeURIComponent(tz)}`).then(setData).catch(() => setErr(true));
  }, [user, range]);

  if (!ready) return <main className="mx-auto max-w-6xl px-4 py-10" aria-busy="true" />;
  if (!user) {
    return (
      <main className="mx-auto grid max-w-xl gap-4 px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Thống kê học tập</h1>
        <p className="text-muted">Đăng nhập để xem số phút tập trung và các phiên Pomodoro của bạn.</p>
        <Link to="/account" className="btn btn-primary mx-auto">Đăng nhập</Link>
      </main>
    );
  }

  const max = Math.max(1, ...(data?.daily.map((d) => d.focusMinutes) ?? [1]));
  const n = data?.daily.length ?? 0;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Thống kê học tập</h1>
          <p className="mt-2 text-muted">Chào {user.displayName}, đây là kết quả của bạn.</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Khoảng thời gian">
          {RANGES.map(([v, l]) => (
            <button key={v} type="button" className={`btn px-3 py-1.5 ${range === v ? "border-amber text-amber" : ""}`} aria-pressed={range === v} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
      </div>

      {err && <p className="card mt-6 p-6">Không tải được thống kê. Vui lòng thử lại.</p>}
      {!data && !err && <div className="card mt-6 h-64 animate-pulse" aria-busy="true" />}
      {data && (data.totals.pomodoroStarted === 0 && data.totals.sessions === 0 ? (
        <div className="card mt-6 grid justify-items-center gap-3 p-10 text-center">
          <p>Chưa có phiên Pomodoro nào — vào phòng để bắt đầu.</p>
          <a href="/room" className="btn btn-primary">Vào phòng</a>
        </div>
      ) : (
        <>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Phút tập trung", data.totals.focusMinutes],
              ["Pomodoro hoàn thành", data.totals.pomodoroCompleted],
              ["Tỷ lệ hoàn thành", Math.round(data.totals.completionRate * 100) + "%"],
              ["Phiên sử dụng", data.totals.sessions],
            ].map(([l, v]) => (
              <li key={l} className="card p-4">
                <p className="text-xs uppercase tracking-wide text-muted">{l}</p>
                <p className="mt-1 font-digit text-4xl text-amber">{v}</p>
              </li>
            ))}
          </ul>

          <section className="card mt-6 p-4" aria-labelledby="h-chart">
            <h2 id="h-chart" className="font-display text-lg font-bold">Phút tập trung theo ngày</h2>
            <svg viewBox={`0 0 ${Math.max(n, 1) * 20} 120`} className="mt-4 h-48 w-full" preserveAspectRatio="none" role="img" aria-label="Biểu đồ cột phút tập trung theo ngày">
              {data.daily.map((d, i) => {
                const h = (d.focusMinutes / max) * 100;
                return (
                  <g key={d.date}>
                    <title>{`${d.date}: ${d.focusMinutes} phút`}</title>
                    <rect x={i * 20 + 3} y={110 - h} width={14} height={Math.max(h, 1)} className="fill-amber" />
                  </g>
                );
              })}
              <line x1="0" y1="110" x2={Math.max(n, 1) * 20} y2="110" className="stroke-line" />
            </svg>
            <p className="mt-2 text-xs text-muted">{data.from} → {data.to}</p>
          </section>

          <section className="card mt-6 overflow-x-auto" aria-labelledby="h-recent">
            <h2 id="h-recent" className="p-4 font-display text-lg font-bold">10 phiên gần nhất</h2>
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-xs uppercase text-muted">
                <tr><th className="p-3">Bắt đầu</th><th className="p-3">Chế độ</th><th className="p-3">Dự kiến</th><th className="p-3">Kết quả</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.recent.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3">{new Date(p.startedAt).toLocaleString("vi-VN")}</td>
                    <td className="p-3">{p.mode === "focus" ? "Focus" : "Nghỉ"}</td>
                    <td className="p-3">{Math.round(p.plannedSec / 60)} phút</td>
                    <td className="p-3">{OUTCOME[p.outcome] ?? p.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ))}
    </main>
  );
}
