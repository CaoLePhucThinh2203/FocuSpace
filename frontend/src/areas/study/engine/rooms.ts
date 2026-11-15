/**
 * T7 — Phúc Thịnh · Chuyển ba không gian (UC.01, FR-NAV-01→03).
 * Hàm thuần, không đụng DOM — roomEngine.js (khối CHUYỂN PHÒNG) gọi lại; phần mờ màn hình, cross-fade âm vẫn ở engine.
 */
import type { RoomId } from "@focuspace/shared";

export type Indoor = Exclude<RoomId, "out">;
export interface NavLink { d?: "l" | "r"; door?: true; to: RoomId; label: string }

/** Mũi tên / cửa nhà của từng phòng: Phòng ngủ ← Phòng học → Sân vườn; ở Sân vườn bấm cửa nhà luôn vào Phòng học (Q-07). */
export const NAVS: Record<RoomId, NavLink[]> = {
  study: [{ d: "l", to: "out", label: "Ra sân vườn" }, { d: "r", to: "bed", label: "Sang phòng ngủ" }],
  bed: [{ d: "l", to: "study", label: "Về phòng học" }],
  out: [{ door: true, to: "study", label: "Vào phòng học" }],
};

/** Bỏ qua lệnh khi đang chuyển hoặc bấm vào phòng đang ở (AC-01.2). */
export function canSwitch(cur: RoomId, to: RoomId, busy: boolean): boolean {
  return to !== cur && !busy;
}

/** Phòng trong nhà gần nhất sau khi chuyển (FR-NAV-03): ra Sân vườn thì nhớ phòng vừa rời. */
export function lastIndoorAfter(from: RoomId, to: RoomId, lastIndoor: Indoor): Indoor {
  if (to !== "out") return to;
  return from !== "out" ? from : lastIndoor;
}

/** Vào Phòng ngủ thì Pomodoro tự tạm dừng, giữ số giờ còn lại (BR-01, AC-05.8). */
export const pausesPomodoro = (to: RoomId): boolean => to === "bed";
