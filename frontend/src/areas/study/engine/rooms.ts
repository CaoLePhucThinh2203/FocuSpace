/**
 * T7 — Phúc Thịnh
 * Chuyển ba không gian: đóng popover/khay, hủy hẹn giờ ngủ, mờ 0,3 giây; bỏ qua lệnh khi đang chuyển (FR-NAV-01→03).
 * Nguồn: frontend/src/engine/legacy/roomEngine.js, khối PHÒNG + CHUYỂN PHÒNG (dòng ~2474–2522, 3051–3119). Chép logic/hằng số giữ nguyên, rồi xóa khối đó khỏi roomEngine.js.
 */
export type Room = "study" | "bed" | "out";

/** Phòng đích khi bấm mũi tên/cửa nhà; null nếu không đi được. */
export function nextRoom(_from: Room, _dir: "left" | "right" | "door"): Room | null {
  throw new Error("TODO T7");
}
