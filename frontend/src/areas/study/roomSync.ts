import { flatToV4, v4ToFlat, RoomStateSchema, STORAGE_KEY, type RoomState } from "@focuspace/shared";
import { api, ApiError, json } from "../../lib/api";

/** Đồng bộ phòng giữa các thiết bị (UC.09, API 4.9–4.10): LocalStorage của engine ↔ /room-state. */
const META_KEY = "focuspace.sync";
interface Meta { userId: string; revision: number; deviceId: string }
interface Remote { data: RoomState; revision: number; updatedAt: string }

const readMeta = (userId: string): Meta => {
  try {
    const m = JSON.parse(localStorage.getItem(META_KEY) || "null") as Meta | null;
    if (m && m.userId === userId) return m;
    return { userId, revision: 0, deviceId: m?.deviceId ?? "dev-" + Math.random().toString(36).slice(2, 10) };
  } catch {
    return { userId, revision: 0, deviceId: "dev-" + Math.random().toString(36).slice(2, 10) };
  }
};
const writeMeta = (m: Meta) => { try { localStorage.setItem(META_KEY, JSON.stringify(m)); } catch { /* chặn lưu */ } };
const localFlat = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; } };
const writeLocal = (v: RoomState) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v4ToFlat(v))); } catch { /* */ } };
const localV4 = (): RoomState | null => {
  const f = localFlat();
  if (!f) return null;
  const v = flatToV4(f);
  return RoomStateSchema.safeParse(v).success ? v : null;
};

export type MergeChoice = "local" | "cloud";

/**
 * Gọi trước khi khởi động engine. Trả "merge" khi cần hỏi người dùng giữ bản nào (lần đầu đăng nhập trên máy có dữ liệu khách).
 */
export async function pullBeforeStart(userId: string): Promise<{ needMerge: false } | { needMerge: true; remote: Remote }> {
  const meta = readMeta(userId);
  let remote: Remote;
  try {
    remote = await api<Remote>("/room-state");
  } catch (e) {
    if (e instanceof ApiError && e.code === "NOT_FOUND") {
      const v = localV4();
      if (v) await push(userId, v, 0, false);
      return { needMerge: false };
    }
    return { needMerge: false }; // mất mạng: dùng bản cục bộ
  }
  const hasLocal = !!localFlat();
  if (meta.revision === 0 && hasLocal) return { needMerge: true, remote };
  if (remote.revision !== meta.revision) writeLocal(remote.data);
  writeMeta({ ...meta, revision: remote.revision });
  return { needMerge: false };
}

export async function resolveMerge(userId: string, choice: MergeChoice, remote: Remote) {
  if (choice === "cloud") {
    writeLocal(remote.data);
    writeMeta({ ...readMeta(userId), revision: remote.revision });
  } else {
    const v = localV4();
    if (v) await push(userId, v, remote.revision, true);
  }
}

async function push(userId: string, data: RoomState, baseRevision: number, force: boolean) {
  const meta = readMeta(userId);
  const r = await api<{ revision: number }>("/room-state", {
    method: "PUT",
    body: json({ data, baseRevision, deviceId: meta.deviceId, force }),
  });
  writeMeta({ ...meta, revision: r.revision });
}

/**
 * Theo dõi engine ghi LocalStorage; 2 giây sau thay đổi cuối thì PUT /room-state.
 * 409: áp bản server và tải lại phòng, báo người dùng. Mất mạng: thử lại khi có mạng.
 */
export function startAutoPush(userId: string, onConflict: () => void, onOffline: (off: boolean) => void) {
  let timer = 0;
  let pending = false;
  const flush = async () => {
    const v = localV4();
    if (!v) return;
    pending = false;
    try {
      await push(userId, v, readMeta(userId).revision, false);
      onOffline(false);
    } catch (e) {
      if (e instanceof ApiError && e.code === "REVISION_CONFLICT") {
        const cur = (e.body as { current?: Remote })?.current;
        if (cur) { writeLocal(cur.data); writeMeta({ ...readMeta(userId), revision: cur.revision }); }
        onConflict();
      } else if (e instanceof ApiError && e.status === 0) {
        pending = true;
        onOffline(true);
      }
    }
  };
  const origSet = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k: string, v: string) {
    origSet.call(this, k, v);
    if (this === localStorage && k === STORAGE_KEY) {
      clearTimeout(timer);
      timer = window.setTimeout(flush, 2000);
    }
  };
  const online = () => { if (pending) void flush(); };
  const hide = () => { if (document.visibilityState === "hidden") { clearTimeout(timer); void flush(); } };
  window.addEventListener("online", online);
  document.addEventListener("visibilitychange", hide);
  return () => {
    Storage.prototype.setItem = origSet;
    window.removeEventListener("online", online);
    document.removeEventListener("visibilitychange", hide);
  };
}
