/**
 * T7 — Phúc Thịnh
 * Pomodoro 25/5 dùng chung ba không gian, tính theo thời điểm kết thúc nên không trôi khi tab ẩn (BR-01).
 * Nguồn: frontend/src/engine/legacy/roomEngine.js, khối POMODORO (dòng ~2844–2903). Chép logic/hằng số giữ nguyên, rồi xóa khối đó khỏi roomEngine.js.
 */
export interface Pomo { mode: "focus" | "break"; remaining: number; running: boolean; endAt: number }

export function tick(_p: Pomo, _now: number): Pomo {
  throw new Error("TODO T7");
}
