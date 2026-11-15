/**
 * H4 — Tuấn Hưng · Quy tắc đặt đồ (UC.04, BR-03→06, FR-ITEM-04, 05, 08).
 * Hàm thuần, không đụng DOM — roomEngine.js (khối KHUNG PHÒNG, phần "Đồ vật di động") gọi lại.
 * Hằng số chép nguyên từ engine (ROOMCFG.surfaces/shelves, clampPos); hệ toạ độ logic 320×180.
 */
import { BED_CODES, MAX_ITEMS_PER_ROOM, ROOM_H, ROOM_W, STUDY_CODES, clamp, type RoomId } from "@focuspace/shared";

export const FLOOR_MIN_BASE = 112;
export const FLOOR_MAX_BASE = ROOM_H - 2;
export const ROOM_FULL_MESSAGE = "Phòng đã đầy — hãy xóa bớt đồ để thêm mới";   // AC-04.2, Q-16

/** Mặt phẳng đặt đồ: phía trên snapBelow thì đặt sát mặt (top), phía dưới thì đứng sàn từ front trở xuống. */
export interface Surface { x0: number; x1: number; top: number; snapBelow: number; front: number }
/** Tầng giá / ngăn tủ: đồ cao ≤ 28 px có đáy cách top ≤ tol (mặc định 13 px) thì khớp vào. */
export interface Shelf { x0: number; x1: number; top: number; tol?: number }
export interface Geometry { surfaces: Surface[]; shelves: Shelf[] }
/** Kích thước và ràng buộc của một loại đồ (engine TYPES). */
export interface ItemSpec { w: number; h: number; deskOnly?: boolean; floorOnly?: boolean }
export interface Placed { id?: string; type: string; x: number; y: number }
export interface Position { x: number; y: number; bedId?: string | null }

/** 3 tầng giá treo tường Phòng học. */
export const STUDY_SHELVES: Shelf[] = [{ x0: 226, x1: 268, top: 40 }, { x0: 214, x1: 262, top: 66 }, { x0: 236, x1: 270, top: 92 }];

/** Mặt bàn + mặt trên lò sưởi (lò sưởi bên trái thì dời −266 px). */
export function studyGeometry(fireSide: "left" | "right"): Geometry {
  const dx = fireSide === "left" ? -266 : 0;
  return {
    surfaces: [{ x0: 92, x1: 228, top: 115, snapBelow: 136, front: 161 }, { x0: 274 + dx, x1: 318 + dx, top: 40, snapBelow: 88, front: 121 }],
    shelves: STUDY_SHELVES,
  };
}

/** Phòng ngủ: giá treo tường + ngăn trên tủ đầu giường (hút ±9 px); mặt tủ đầu giường, mặt chăn. */
export const BED_GEOMETRY: Geometry = {
  shelves: [{ x0: 14, x1: 66, top: 40 }, { x0: 40, x1: 100, top: 66 }, { x0: 14, x1: 66, top: 92 }, { x0: 276, x1: 312, top: 146, tol: 9 }],
  surfaces: [
    { x0: 274, x1: 314, top: 124, snapBelow: 140, front: 156 },
    { x0: 200, x1: 230, top: 92, snapBelow: 114, front: 132 },   // phần giường thừa dưới chân: mèo (cao 13) nằm ở y=85
    { x0: 230, x1: 274, top: 91, snapBelow: 114, front: 132 },   // phần còn lại của giường: mặt đặt đồ y=94
  ],
};

/** BR-06: còn chỗ thêm đồ khi phòng chưa đủ 25 đồ. */
export const canAdd = (count: number): boolean => count < MAX_ITEMS_PER_ROOM;

/** Loại đồ dùng được ở phòng này (giường mèo chỉ Phòng ngủ — BR-05; danh mục shared/catalog). */
export function canPlaceIn(type: string, room: RoomId): boolean {
  if (room === "study") return STUDY_CODES.includes(type);
  if (room === "bed") return BED_CODES.includes(type);
  return false;
}

/**
 * Vị trí hợp lệ khi thả / kéo đồ (BR-04, theo thứ tự):
 * (1) đèn/ly chỉ trượt mặt bàn → (2) mèo gần giường mèo thì nằm vào → (3) chậu cây lớn chỉ đứng sàn
 * → (4) đồ cao ≤ 28 px gần tầng giá thì khớp → (5) bề mặt: trên thì sát mặt, trước thì đứng sàn → (6) còn lại đứng sàn.
 * Mèo luôn trả kèm bedId (null khi không nằm trong giường mèo).
 */
export function clampPos(d: Placed, t: ItemSpec, room: RoomId, geo: Geometry, items: Placed[], catbed: ItemSpec): Position {
  if (t.deskOnly) return { x: clamp(d.x, 94, 226 - t.w), y: 115 - t.h };
  const x = clamp(d.x, 0, ROOM_W - t.w);
  const cx = x + t.w / 2;
  let base = d.y + t.h;
  let bedId: string | null | undefined;
  if (d.type === "cat") {   // mèo kéo lại gần giường mèo thì tự nằm vào; kéo ra xa thì tách khỏi giường
    const bed = items.find((i) => i.type === "catbed" && cx >= i.x - 4 && cx <= i.x + catbed.w + 4 && Math.abs(base - (i.y + catbed.h)) <= 14);
    if (bed) return { x: bed.x + 3, y: bed.y + 8 - t.h, bedId: bed.id ?? null };
    bedId = null;
  }
  const out = (px: number, py: number): Position => (bedId === undefined ? { x: px, y: py } : { x: px, y: py, bedId });
  if (t.floorOnly) {   // chậu cây lớn: chỉ đứng trên sàn, đi khắp phòng (không lên bàn / giá)
    base = clamp(base, room === "study" && cx > 90 && cx < 230 ? 160 : 138, FLOOR_MAX_BASE);
    return out(x, base - t.h);
  }
  // Giá / ngăn: kéo đồ lại gần thì tự khớp vào, trượt dọc theo giá; kéo xuống sàn thì hết khớp
  const sh = t.h <= 28 && geo.shelves.find((s) => cx >= s.x0 && cx <= s.x1 && Math.abs(base - s.top) <= (s.tol || 13));
  if (sh) return out(clamp(x, sh.x0, sh.x1 - t.w), sh.top - t.h);
  let px = x, done = false;
  for (const s of geo.surfaces) {
    if (cx >= s.x0 && cx <= s.x1) {
      if (base < s.snapBelow) { px = clamp(px, s.x0 + 2, s.x1 - 2 - t.w); base = s.top; }
      else base = clamp(base, s.front, FLOOR_MAX_BASE);
      done = true; break;
    }
  }
  if (!done) base = clamp(base, FLOOR_MIN_BASE, FLOOR_MAX_BASE);
  return out(px, base - t.h);
}
