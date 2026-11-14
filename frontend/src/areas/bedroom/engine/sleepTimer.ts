/**
 * L3 — Tuấn Lộc
 * Hẹn giờ ngủ Tắt/15/30/45/60 phút; 2 phút cuối âm tổng giảm dần về 0; rời Phòng ngủ thì hủy (BR-02).
 * Nguồn: frontend/src/engine/legacy/roomEngine.js, khối POMODORO + HẸN GIỜ NGỦ (dòng ~2844–2903), biến sleep. Chép logic/hằng số giữ nguyên, rồi xóa khối đó khỏi roomEngine.js.
 */
export type SleepMinutes = 0 | 15 | 30 | 45 | 60;

/** Hệ số âm lượng tổng (0–1) tại thời điểm now, khi hẹn giờ kết thúc lúc endAt. */
export function sleepGain(_endAt: number, _now: number): number {
  throw new Error("TODO L3");
}
