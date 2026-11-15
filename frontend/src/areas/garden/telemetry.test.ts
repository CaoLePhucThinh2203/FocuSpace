import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { bindBrowser, createTelemetry, pomoMode, type Batch, type Pending, type TelemetryDeps } from "./telemetry";

/** Phụ thuộc giả: thời gian điều khiển được, uuid tuần tự, ghi lại các lô đã gửi. */
function fakeDeps(over: Partial<TelemetryDeps> = {}) {
  let t = Date.UTC(2026, 10, 15, 9, 0, 0), n = 0;
  const sent: { batch: Batch; keepalive: boolean }[] = [];
  let stored: Pending | null = null;
  const deps: TelemetryDeps = {
    clientId: "cl-test",
    now: () => t,
    uuid: () => `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`,
    send: async (batch, keepalive) => { sent.push({ batch: structuredClone(batch), keepalive }); },
    load: () => stored,
    store: (p) => { stored = p; },
    ...over,
  };
  return { deps, sent, tick: (ms: number) => { t += ms; }, stored: () => stored, setStored: (p: Pending | null) => { stored = p; } };
}

describe("telemetry — gom và gửi số liệu (N10, FR-TEL-01→03)", () => {
  it("phiên sử dụng: thời gian tới thao tác đầu, số tương tác, không gian đã ghé, hẹn giờ ngủ", async () => {
    const f = fakeDeps();
    const tel = createTelemetry(f.deps, { session: true });
    tel.track("room_visit", "study");
    f.tick(8200);
    tel.track("interaction");
    tel.track("interaction");
    tel.track("room_visit", "out");
    tel.track("room_visit", "study");
    tel.track("sleep_timer_set");
    tel.track("sleep_timer_completed");
    await tel.flush();
    const s = f.sent[0].batch.sessions[0];
    expect(f.sent[0].batch.clientId).toBe("cl-test");
    expect(s).toMatchObject({ setupMs: 8200, interactionCount: 2, visited: ["study", "out"], sleepTimerSet: true, sleepTimerCompleted: true });
    expect(s.endedAt).toBe(new Date(f.deps.now()).toISOString());
  });

  it("Nghỉ ngắn và Nghỉ dài đều ghi mode break (DATABASE 3.5)", () => {
    expect(pomoMode("focus")).toBe("focus");
    expect(pomoMode("short")).toBe("break");
    expect(pomoMode("long")).toBe("break");
  });

  it("phiên Pomodoro hết giờ ghi completed, Đặt lại ghi reset, gắn với phiên sử dụng", async () => {
    const f = fakeDeps();
    const tel = createTelemetry(f.deps, { session: true });
    tel.pomodoroStart("focus", 1500);
    f.tick(1500_000);
    tel.pomodoroEnd("completed");
    tel.pomodoroStart("short", 300);
    tel.pomodoroEnd("reset");
    tel.pomodoroEnd("reset");   // không có phiên đang mở thì bỏ qua
    await tel.flush();
    const b = f.sent[0].batch;
    expect(b.pomodoros.map((p) => [p.mode, p.plannedSec, p.outcome])).toEqual([["focus", 1500, "completed"], ["break", 300, "reset"]]);
    expect(b.pomodoros[0].sessionId).toBe(b.sessions[0].id);
    expect(Date.parse(b.pomodoros[0].endedAt!) - Date.parse(b.pomodoros[0].startedAt)).toBe(1500_000);
  });

  describe("gửi theo lô trong trình duyệt", () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });
    const page = () => ({ win: new EventTarget(), doc: Object.assign(new EventTarget(), { visibilityState: "visible" as DocumentVisibilityState }) });

    it("gom sự kiện và gửi lô sau 60 giây; không có gì mới thì không gửi", async () => {
      const f = fakeDeps();
      const tel = createTelemetry(f.deps, { session: true });
      bindBrowser(tel, page().win, page().doc);
      tel.track("interaction");
      await vi.advanceTimersByTimeAsync(59_000);
      expect(f.sent).toHaveLength(0);
      await vi.advanceTimersByTimeAsync(1_000);
      expect(f.sent).toHaveLength(1);
      expect(f.sent[0].keepalive).toBe(false);
      await vi.advanceTimersByTimeAsync(60_000);
      expect(f.sent).toHaveLength(1);
    });

    it("ẩn tab thì gửi ngay bằng keepalive", async () => {
      const f = fakeDeps();
      const tel = createTelemetry(f.deps, { session: true });
      const p = page();
      bindBrowser(tel, p.win, p.doc);
      tel.track("interaction");
      p.doc.visibilityState = "hidden";
      p.doc.dispatchEvent(new Event("visibilitychange"));
      await vi.advanceTimersByTimeAsync(0);
      expect(f.sent).toHaveLength(1);
      expect(f.sent[0].keepalive).toBe(true);
    });

    it("phiên Pomodoro đang chạy khi tải lại / đóng tab ghi abandoned", async () => {
      const f = fakeDeps();
      const tel = createTelemetry(f.deps, { session: true });
      const p = page();
      bindBrowser(tel, p.win, p.doc);
      tel.pomodoroStart("focus", 1500);
      p.win.dispatchEvent(new Event("pagehide"));
      await vi.advanceTimersByTimeAsync(0);
      expect(f.sent.at(-1)!.keepalive).toBe(true);
      expect(f.sent.at(-1)!.batch.pomodoros).toMatchObject([{ mode: "focus", outcome: "abandoned" }]);
    });
  });

  it("gửi lỗi thì giữ lại lô (lưu LocalStorage) để lần sau gửi lại", async () => {
    const f = fakeDeps({ send: async () => { throw new Error("mất mạng"); } });
    const tel = createTelemetry(f.deps, { session: true });
    tel.pomodoroStart("focus", 1500);
    tel.pomodoroEnd("completed");
    tel.error("storage_write", "QuotaExceededError");
    await tel.flush();
    expect(f.stored()?.pomodoros).toHaveLength(1);
    expect(f.stored()?.errors).toHaveLength(1);
    expect(f.stored()?.sessions).toHaveLength(1);

    // Trang khác (ví dụ Thống kê, FR-STAT-06) mở lại: đọc lô còn sót và gửi trước khi tải số liệu.
    const g = fakeDeps();
    g.setStored(f.stored());
    const later = createTelemetry(g.deps, { session: false });
    await later.flush();
    expect(g.sent[0].batch.pomodoros).toHaveLength(1);
    expect(g.sent[0].batch.errors[0]).toMatchObject({ kind: "storage_write", message: "QuotaExceededError" });
    expect(g.sent[0].batch.sessions).toHaveLength(1);
    expect(g.stored()).toBeNull();
  });

  it("không có gì để gửi thì không gọi API", async () => {
    const f = fakeDeps();
    await createTelemetry(f.deps, { session: false }).flush();
    expect(f.sent).toHaveLength(0);
  });
});
