/** Seeder: gọi mọi hàm seed* trong backend/src/areas/<khu-vực>/seed.ts (đồ vật — Hưng, khung cảnh — Nhiên). */
import { PrismaClient } from "@prisma/client";
import { loadAreaExports } from "../src/lib/areas";

const prisma = new PrismaClient();

async function main() {
  const seeds = await loadAreaExports("seed", (n) => n.startsWith("seed"));
  if (!seeds.length) console.log("Chưa có khu vực nào có seed.ts — bỏ qua.");
  for (const { area, name, fn } of seeds) console.log(`${area}/${name}: ${await fn(prisma)} dòng`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
