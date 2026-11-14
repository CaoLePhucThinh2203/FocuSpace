/** Seeder danh mục (DATABASE §3.7, §3.8): gọi seeder của từng khu vực. */
import { PrismaClient } from "@prisma/client";
import { seedItemTypes } from "../src/areas/items-audio/seed";
import { seedScenes } from "../src/areas/garden/seed";

const prisma = new PrismaClient();

async function main() {
  const items = await seedItemTypes(prisma);
  const scenes = await seedScenes(prisma);
  console.log(`Seed xong: ${items} đồ vật, ${scenes} khung cảnh.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
