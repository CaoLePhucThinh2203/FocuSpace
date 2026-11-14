import { Prisma } from "@prisma/client";
import type { RoomState } from "@focuspace/shared";
import type { Db } from "../../lib/prisma";
import { ApiError, notFound } from "../../lib/errors";

const view = (r: { data: Prisma.JsonValue; revision: number; updatedAt: Date }) => ({
  data: r.data, revision: r.revision, updatedAt: r.updatedAt.toISOString(),
});

/** RoomStateService (Class C3): đọc/ghi trạng thái phòng với optimistic concurrency theo revision (UC.09). */
export function roomStateService(db: Db) {
  return {
    async layTrangThai(userId: string) {
      const r = await db.roomStateRow.findUnique({ where: { userId } });
      if (!r) throw notFound("NOT_FOUND", "Tài khoản chưa có phòng.");
      return view(r);
    },

    async luuTrangThai(userId: string, data: RoomState, baseRevision: number, deviceId: string, force = false) {
      const json = data as unknown as Prisma.InputJsonValue;
      const now = new Date();
      const cur = await db.roomStateRow.findUnique({ where: { userId } });
      if (!cur) {
        const r = await db.roomStateRow.create({ data: { userId, schemaVer: 4, data: json, revision: 1, updatedFrom: deviceId, updatedAt: now } });
        return { revision: r.revision, updatedAt: r.updatedAt.toISOString() };
      }
      // UPDATE ... WHERE revision = baseRevision (hoặc bỏ điều kiện khi force = true — “Giữ phòng trên máy này”)
      const { count } = await db.roomStateRow.updateMany({
        where: force ? { userId } : { userId, revision: baseRevision },
        data: { data: json, schemaVer: 4, revision: { increment: 1 }, updatedFrom: deviceId, updatedAt: now },
      });
      const after = await db.roomStateRow.findUniqueOrThrow({ where: { userId } });
      if (count === 0) {
        throw new ApiError(409, "REVISION_CONFLICT", "Phòng đã được cập nhật từ thiết bị khác.", { current: view(after) });
      }
      return { revision: after.revision, updatedAt: after.updatedAt.toISOString() };
    },
  };
}
