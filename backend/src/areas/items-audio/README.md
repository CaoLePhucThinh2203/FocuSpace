# items-audio — Tuấn Hưng (backend)

- `areas/items-audio/routes.ts` — `GET /catalog/items` (H11)
- `areas/items-audio/catalogItemsService.ts`
- `areas/items-audio/seed.ts` — seeder `item_types` (H6)

Router của khu vực được gắn vào `/api/v1` trong `backend/src/routes/index.ts`. Đặc tả endpoint: `docs/API.md`; bảng: `docs/DATABASE.md`. Viết test integration trong `backend/test/` (tên file theo khu vực, ví dụ `items-audio.test.ts`).
