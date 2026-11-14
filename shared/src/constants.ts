/** Hằng số căn phòng (hệ logic 320×180) — lấy từ prototype, mục "HẰNG SỐ PHÒNG". */
export const ROOM_W = 320;
export const ROOM_H = 180;
export const D_MAX = Math.hypot(ROOM_W, ROOM_H);
export type RoomId = "study" | "bed" | "out";
export const LISTENERS: Record<RoomId, { x: number; y: number }> = {
  study: { x: 160, y: 100 },
  bed: { x: 286, y: 92 },
  out: { x: 160, y: 100 },
};
export const DESK = { x0: 92, x1: 228, top: 115, front: 158 } as const;
export const MAX_ITEMS_PER_ROOM = 40; // BR-06
export const MAX_ROOM_BYTES = 65536; // BR-06
export const STORAGE_KEY = "focuspace.room.v4";
