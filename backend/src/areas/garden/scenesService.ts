import type { Db } from "../../lib/prisma";

/** CatalogService — phần khung cảnh (UC.07, API 4.13). Người phụ trách: Đình Nhiên. */
export function scenesService(db: Db) {
  return {
    async layKhungCanh() {
      const rows = await db.scene.findMany({ orderBy: { sortOrder: "asc" } });
      return rows.map((r) => ({ code: r.code, name: r.name, description: r.description, isDefault: r.isDefault }));
    },
  };
}