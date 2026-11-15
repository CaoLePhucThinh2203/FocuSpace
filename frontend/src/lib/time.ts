/**
 * Tiếng tích tắc của đồng hồ Pomodoro (AC-05.6). Hàm thuần, không đụng DOM — engine Căn phòng (roomEngine.js) gọi lại.
 */

/** Tiếng tích tắc chỉ kêu khi đồng hồ đang chạy và số giây hiển thị vừa giảm (AC-05.6). */
export function shouldTick(running: boolean, prevSec: number, sec: number): boolean {
  return running && sec < prevSec && sec > 0;
}
