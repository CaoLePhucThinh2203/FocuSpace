import { ITEM_TYPES } from "@focuspace/shared";
import type { Db } from "../../lib/prisma";

/** Seeder bảng item_types (H6): upsert nên chạy nhiều lần vẫn 17 dòng. */
export async function seedItemTypes(db: Db) {
  for (const t of ITEM_TYPES) {
    const data = {
      name: t.name, description: t.description, itemGroup: t.group, width: t.width, height: t.height,
      inStudy: t.inStudy, inBed: t.inBed, defaultVol: t.defaultVol, removable: t.removable, sortOrder: t.sortOrder,
    };
    await db.itemType.upsert({ where: { code: t.code }, update: data, create: { code: t.code, ...data } });
  }
  return ITEM_TYPES.length;
}
