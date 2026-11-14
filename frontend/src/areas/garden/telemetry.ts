/**
 * N10 — Đình Nhiên
 * Gom sự kiện phiên sử dụng + Pomodoro + lỗi audio, gửi POST /telemetry/batch mỗi 60 giây và khi ẩn tab (FR-TEL-01→03).
 * Id phiên, id Pomodoro sinh bằng crypto.randomUUID(); clientId lưu LocalStorage "focuspace.client".
 */
export interface TelemetryApi {
  track(event: "room_visit" | "interaction" | "sleep_timer_set" | "sleep_timer_completed", room?: "study" | "bed" | "out"): void;
  pomodoro(p: { mode: "focus" | "break"; plannedSec: number; startedAt: Date; endedAt?: Date; outcome: "completed" | "reset" | "abandoned" }): void;
  error(kind: "audio_context_create" | "audio_context_resume" | "storage_write", message?: string): void;
  flush(): Promise<void>; // trang Thống kê gọi trước khi tải số liệu (FR-STAT-06)
}

export function createTelemetry(): TelemetryApi {
  throw new Error("TODO N10");
}