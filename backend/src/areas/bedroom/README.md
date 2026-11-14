# bedroom — Tuấn Lộc (backend)

- `areas/bedroom/routes.ts` — `/auth/*` (L7), `/me` (L8), `/me/stats` (L9)
- `areas/bedroom/authService.ts`, `statsService.ts`

Router của khu vực được gắn vào `/api/v1` trong `backend/src/routes/index.ts`. Đặc tả endpoint: `docs/API.md`; bảng: `docs/DATABASE.md`. Viết test integration trong `backend/test/` (tên file theo khu vực, ví dụ `bedroom.test.ts`).
