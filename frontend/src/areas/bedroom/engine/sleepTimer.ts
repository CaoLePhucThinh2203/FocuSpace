/**
 * L3 — Tuấn Lộc · Hẹn giờ ngủ (UC.06, BR-02, FR-TIME-03).
 * Hàm thuần, không đụng DOM hay Web Audio — roomEngine.js (khối POMODORO + HẸN GIỜ NGỦ) gọi lại rồi tự áp âm lượng, vẽ ô header.
 * Chọn mức xong chờ bấm Bắt đầu; tính theo thời điểm kết thúc nên không trôi khi tab ẩn; 2 phút cuối âm tổng giảm dần về 0.
 */
export const SLEEP_OPTIONS = [0, 15, 30, 60] as const;   // phút; 0 = Tắt
export const FADE_SEC = 120;                              // 2 phút cuối nhỏ dần

/** min: mức đã chọn (phút) · remaining: số giây còn lại khi đang dừng · endAt: thời điểm kết thúc (ms) khi đang chạy. */
export interface Sleep { min: number; remaining: number; running: boolean; endAt: number }

export const SLEEP_OFF: Sleep = { min: 0, remaining: 0, running: false, endAt: 0 };

/** Chọn mức: hiện số phút, chưa chạy. Chọn 0 (Tắt) là hủy. */
export function sleepSet(min: number): Sleep {
  return { min, remaining: min * 60, running: false, endAt: 0 };
}

/** Số giây còn lại (làm tròn lên) tại thời điểm now. */
export function sleepRemaining(s: Sleep, now: number): number {
  return s.running ? Math.max(0, Math.ceil((s.endAt - now) / 1000)) : s.remaining;
}

/** Bắt đầu / Tạm dừng. Chưa chọn mức hoặc đã hết giây thì không đổi. */
export function sleepToggle(s: Sleep, now: number): Sleep {
  if (!s.min) return s;
  if (s.running) return { ...s, remaining: sleepRemaining(s, now), running: false, endAt: 0 };
  if (s.remaining > 0) return { ...s, running: true, endAt: now + s.remaining * 1000 };
  return s;
}

/** Hệ số âm tổng (0–1) khi còn remSec giây: 1 cho tới 2 phút cuối, rồi giảm tuyến tính về 0. */
export function sleepGain(remSec: number): number {
  if (remSec <= 0) return 0;
  return remSec <= FADE_SEC ? remSec / FADE_SEC : 1;
}

/** Đang chạy và đã tới thời điểm kết thúc. */
export function sleepFinished(s: Sleep, now: number): boolean {
  return s.running && s.endAt - now <= 0;
}
