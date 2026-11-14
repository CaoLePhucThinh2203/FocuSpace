import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

/**
 * Cổng cắm khu vực phía backend. Mỗi thư mục src/areas/<khu-vực>/ có thể có:
 *   routes.ts — export một hàm tên kết thúc bằng "Routes": (db) => express.Router
 *   seed.ts   — export các hàm tên bắt đầu bằng "seed": (db) => Promise<number>
 * Base tự nạp những file có mặt; khu vực chưa có thì bỏ qua (web vẫn chạy).
 */
const AREAS_DIR = fileURLToPath(new URL("../areas/", import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any[]) => any;

export async function loadAreaExports(file: "routes" | "seed", pick: (name: string) => boolean) {
  const out: { area: string; name: string; fn: AnyFn }[] = [];
  if (!existsSync(AREAS_DIR)) return out;
  for (const area of readdirSync(AREAS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
    const f = path.join(AREAS_DIR, area, `${file}.ts`);
    if (!existsSync(f)) continue;
    const mod = (await import(pathToFileURL(f).href)) as Record<string, unknown>;
    for (const [name, fn] of Object.entries(mod)) if (typeof fn === "function" && pick(name)) out.push({ area, name, fn: fn as AnyFn });
  }
  return out;
}
