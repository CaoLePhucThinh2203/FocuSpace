import type { Db } from "../../lib/prisma";

/** CatalogService — phần đồ vật (UC.07, API 4.12). Người phụ trách: Tuấn Hưng. */
export function catalogItemsService(db: Db) {
  return {
    async layDoVat(room?: "study" | "bed", group?: "sound" | "decor" | "desk") {
      const rows = await db.itemType.findMany({
        where: { ...(room === "study" ? { inStudy: true } : room === "bed" ? { inBed: true } : {}), ...(group ? { itemGroup: group } : {}) },
        orderBy: { sortOrder: "asc" },
      });
      return rows.map((r) => ({
        code: r.code, name: r.name, description: r.description, group: r.itemGroup, width: r.width, height: r.height,
        rooms: [...(r.inStudy ? ["study"] : []), ...(r.inBed ? ["bed"] : [])], defaultVol: r.defaultVol, removable: r.removable,
      }));
    },
  };
}
