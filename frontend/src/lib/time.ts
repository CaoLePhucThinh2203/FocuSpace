/**
 * Chỉnh thời gian bằng nút ▲▼ (Pomodoro AC-05.5, Hẹn giờ ngủ AC-06.3): dùng chung cho đồng hồ Pomodoro và hẹn giờ ngủ.
 * Hàm thuần, không đụng DOM — engine Căn phòng (roomEngine.js) gọi lại.
 */
export const MIN_SEC = 60;        // tối thiểu 1 phút
export const MAX_SEC = 120 * 60;  // tối đa 120 phút

/** Cộng/trừ deltaMin phút (±1 hoặc ±10), giữ nguyên số giây lẻ, kẹp trong 1–120 phút. */
export function adjustSeconds(sec: number, deltaMin: number): number {
  return Math.min(MAX_SEC, Math.max(MIN_SEC, Math.round(sec) + deltaMin * 60));
}

/** Tiếng tích tắc chỉ kêu khi đồng hồ đang chạy và số giây hiển thị vừa giảm (AC-05.6). */
export function shouldTick(running: boolean, prevSec: number, sec: number): boolean {
  return running && sec < prevSec && sec > 0;
}
