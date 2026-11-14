import { SCENES } from "@focuspace/shared";
import type { Db } from "../../lib/prisma";

/** Seeder bảng scenes (N4): upsert nên chạy nhiều lần vẫn 5 dòng. */
export async function seedScenes(db: Db) {
  for (const s of SCENES) {
    const data = { name: s.name, description: s.description, isDefault: s.isDefault, sortOrder: s.sortOrder };
    await db.scene.upsert({ where: { code: s.code }, update: data, create: { code: s.code, ...data } });
  }
  return SCENES.length;
}