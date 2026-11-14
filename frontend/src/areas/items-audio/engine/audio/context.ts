/**
 * H7 — Tuấn Hưng
 * Tạo AudioContext sau cú nhấp/phím đầu tiên, đồ thị âm (gain, pan, highpass), Master; lỗi tạo → ghi telemetry (FR-AUD-07).
 * Nguồn: frontend/src/engine/legacy/roomEngine.js, khối AUDIO ENGINE (dòng ~207–455). Chép logic/hằng số giữ nguyên, rồi xóa khối đó khỏi roomEngine.js.
 */
export interface AudioEngine { ctx: AudioContext; master: GainNode; resume(): Promise<void> }

export function createAudioEngine(): AudioEngine | null {
  throw new Error("TODO H7");
}
