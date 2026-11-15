/**
 * N10 — Đình Nhiên · Ghi nhận số liệu sử dụng (FR-TEL-01→03, API 4.11 POST /telemetry/batch).
 * Gom phiên sử dụng, phiên Pomodoro, lỗi client; gửi theo lô mỗi 60 giây (khi có thay đổi), khi ẩn tab và khi đóng/tải lại trang
 * (fetch keepalive; Pomodoro đang chạy lúc đó ghi "abandoned"). Gửi lỗi thì giữ lô trong LocalStorage để lần sau gửi lại;
 * trang Thống kê gọi flushPending() trước khi tải số liệu (FR-STAT-06). Id phiên sinh bằng crypto.randomUUID().
 */
import type { RoomId } from "@focuspace/shared";
import { api, json } from "../../lib/api";

export type Phase = "focus" | "short" | "long";
export type Outcome = "completed" | "reset" | "abandoned";
export type ErrorKind = "audio_context_create" | "audio_context_resume" | "storage_write";
export type TrackEvent = "room_visit" | "interaction" | "sleep_timer_set" | "sleep_timer_completed";

export interface SessionRow {
  id: string; startedAt: string; endedAt: string | null; setupMs: number | null; interactionCount: number;
  visited: RoomId[]; sleepTimerSet: boolean; sleepTimerCompleted: boolean;
}
export interface PomodoroRow {
  id: string; sessionId: string; mode: "focus" | "break"; plannedSec: number; startedAt: string; endedAt: string | null; outcome: Outcome;
}
export interface ErrorRow { sessionId: string; kind: ErrorKind; message: string | null; occurredAt: string }
export interface Pending { sessions: SessionRow[]; pomodoros: PomodoroRow[]; errors: ErrorRow[] }
export interface Batch extends Pending { clientId: string }

export interface TelemetryDeps {
  clientId: string;
  now(): number;
  uuid(): string;
  send(batch: Batch, keepalive: boolean): Promise<void>;
  load(): Pending | null;          // lô còn sót từ lần trước
  store(p: Pending | null): void;  // lưu lô chưa gửi được (null = đã gửi hết)
}

export interface Telemetry {
  readonly dirty: boolean;
  track(event: TrackEvent, room?: RoomId): void;
  pomodoroStart(phase: Phase, plannedSec: number): void;   // bỏ qua nếu đang có phiên mở (bấm Bắt đầu sau Tạm dừng)
  pomodoroEnd(outcome: Outcome): void;                     // bỏ qua nếu không có phiên mở
  error(kind: ErrorKind, message?: string): void;
  flush(keepalive?: boolean): Promise<void>;
  close(): Promise<void>;                                  // đóng/tải lại trang: Pomodoro đang mở ghi abandoned, gửi keepalive
}

/** Nghỉ ngắn và Nghỉ dài đều ghi "break" (DATABASE 3.5). */
export const pomoMode = (p: Phase): "focus" | "break" => (p === "focus" ? "focus" : "break");

const iso = (t: number) => new Date(t).toISOString();

export function createTelemetry(deps: TelemetryDeps, opts: { session: boolean }): Telemetry {
  const left = deps.load();
  const pending: Pending = { sessions: left?.sessions ?? [], pomodoros: left?.pomodoros ?? [], errors: left?.errors ?? [] };
  const t0 = deps.now();
  const session: SessionRow | null = opts.session
    ? { id: deps.uuid(), startedAt: iso(t0), endedAt: null, setupMs: null, interactionCount: 0, visited: [], sleepTimerSet: false, sleepTimerCompleted: false }
    : null;
  let open: Omit<PomodoroRow, "endedAt" | "outcome"> | null = null;
  let dirty = !!left;

  const tel: Telemetry = {
    get dirty() { return dirty; },
    track(event, room) {
      if (!session) return;
      if (event === "room_visit") { if (room && !session.visited.includes(room)) session.visited.push(room); }
      else if (event === "interaction") { session.interactionCount++; session.setupMs ??= deps.now() - t0; }
      else if (event === "sleep_timer_set") session.sleepTimerSet = true;
      else session.sleepTimerCompleted = true;
      dirty = true;
    },
    pomodoroStart(phase, plannedSec) {
      if (!session || open) return;
      open = { id: deps.uuid(), sessionId: session.id, mode: pomoMode(phase), plannedSec, startedAt: iso(deps.now()) };
      dirty = true;
    },
    pomodoroEnd(outcome) {
      if (!open) return;
      pending.pomodoros.push({ ...open, endedAt: iso(deps.now()), outcome });
      open = null;
      dirty = true;
    },
    error(kind, message) {
      if (!session) return;
      pending.errors.push({ sessionId: session.id, kind, message: message ? message.slice(0, 500) : null, occurredAt: iso(deps.now()) });
      dirty = true;
    },
    async flush(keepalive = false) {
      if (session) session.endedAt = iso(deps.now());
      const batch: Batch = {
        clientId: deps.clientId,
        sessions: [...pending.sessions.filter((s) => s.id !== session?.id), ...(session ? [{ ...session }] : [])],
        pomodoros: [...pending.pomodoros],
        errors: [...pending.errors],
      };
      if (!dirty) return;   // không có gì mới (giữ dưới giới hạn 60 lô/giờ/clientId)
      dirty = false;
      try {
        await deps.send(batch, keepalive);
        const sentP = new Set(batch.pomodoros.map((p) => p.id)), sentE = new Set(batch.errors), sentS = new Set(batch.sessions.map((s) => s.id));
        pending.pomodoros = pending.pomodoros.filter((p) => !sentP.has(p.id));
        pending.errors = pending.errors.filter((e) => !sentE.has(e));
        pending.sessions = pending.sessions.filter((s) => !sentS.has(s.id));
        deps.store(pending.pomodoros.length || pending.errors.length || pending.sessions.length ? pending : null);
      } catch {
        dirty = true;   // lỗi gửi: bỏ qua, không ảnh hưởng trải nghiệm; giữ lô để lần sau gửi lại
        deps.store({ sessions: batch.sessions, pomodoros: pending.pomodoros, errors: pending.errors });
      }
    },
    close() {
      tel.pomodoroEnd("abandoned");
      if (session) dirty = true;   // luôn gửi lần cuối để ghi giờ kết thúc phiên
      return tel.flush(true);
    },
  };
  return tel;
}

/** Gắn vào trang: gửi mỗi 60 giây khi có thay đổi, gửi ngay khi ẩn tab, đóng phiên khi rời trang. Trả hàm gỡ. */
export function bindBrowser(tel: Telemetry, win: EventTarget, doc: EventTarget & { visibilityState: DocumentVisibilityState }) {
  const timer = setInterval(() => { if (tel.dirty) void tel.flush(); }, 60_000);
  const onHide = () => { if (doc.visibilityState === "hidden" && tel.dirty) void tel.flush(true); };
  const onLeave = () => { void tel.close(); };
  doc.addEventListener("visibilitychange", onHide);
  win.addEventListener("pagehide", onLeave);
  return () => { clearInterval(timer); doc.removeEventListener("visibilitychange", onHide); win.removeEventListener("pagehide", onLeave); };
}

/* ---------- Trình duyệt ---------- */
const CLIENT_KEY = "focuspace.client";
const PENDING_KEY = "focuspace.telemetry";

function clientId(): string {
  try {
    let id = localStorage.getItem(CLIENT_KEY);
    if (!id) { id = "cl-" + crypto.randomUUID(); localStorage.setItem(CLIENT_KEY, id); }
    return id;
  } catch {
    return "cl-" + crypto.randomUUID();
  }
}

function browserDeps(): TelemetryDeps {
  return {
    clientId: clientId(),
    now: () => Date.now(),
    uuid: () => crypto.randomUUID(),
    send: async (batch, keepalive) => { await api("/telemetry/batch", { method: "POST", body: json(batch), keepalive }); },
    load: () => { try { return JSON.parse(localStorage.getItem(PENDING_KEY) || "null") as Pending | null; } catch { return null; } },
    store: (p) => { try { if (p) localStorage.setItem(PENDING_KEY, JSON.stringify(p)); else localStorage.removeItem(PENDING_KEY); } catch { /* bị chặn lưu */ } },
  };
}

/** Trang Căn phòng: mở một phiên sử dụng và gửi theo lô. */
export function startRoomTelemetry(): Telemetry {
  const tel = createTelemetry(browserDeps(), { session: true });
  bindBrowser(tel, window, document);
  return tel;
}

/** Trang Thống kê: gửi ngay lô còn chờ trước khi tải số liệu (FR-STAT-06). Lỗi thì bỏ qua. */
export function flushPending(): Promise<void> {
  return createTelemetry(browserDeps(), { session: false }).flush();
}
