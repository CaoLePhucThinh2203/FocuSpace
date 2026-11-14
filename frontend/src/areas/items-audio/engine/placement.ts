/**
 * H4 — Tuấn Hưng
 * Quy tắc đặt đồ BR-03→06: đèn bàn/ly chỉ trượt mặt bàn, chậu cây lớn chỉ đứng sàn, giường mèo chỉ Phòng ngủ, ≤ 40 đồ, khớp tầng giá.
 * Nguồn: frontend/src/engine/legacy/roomEngine.js, khối KHUNG PHÒNG + đồ vật (dòng ~2523–2843). Chép logic/hằng số giữ nguyên, rồi xóa khối đó khỏi roomEngine.js.
 */
import type { Item } from "@focuspace/shared";

export interface PlaceResult { ok: boolean; x: number; y: number; reason?: "full" | "wrong-room" | "floor-only" | "desk-only" }

/** Trả vị trí hợp lệ gần nhất cho đồ vật khi thả (H4). */
export function place(_item: Item, _x: number, _y: number, _room: "study" | "bed", _others: Item[]): PlaceResult {
  throw new Error("TODO H4: chuyển logic đặt đồ từ roomEngine.js");
}
