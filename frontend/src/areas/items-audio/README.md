# items-audio — Tuấn Hưng

**Khu vực:** Đồ vật, bảng đồ vật, âm thanh · nhãn GitHub `area:items-audio` · danh sách task: `docs/TASKS.md`, mục Tuấn Hưng.

## Thư mục này (frontend)
- `pages/` — (không có trang riêng; Thư viện do Thịnh làm, dùng dữ liệu `GET /catalog/items` của bạn)
- `components/` — `ItemTray` (khay đồ vật, kéo thả), `ItemPopover`, `VolumeMixer` (H9, H10)
- `engine/` — `audio/{context,graph,synth,lofi,routing}.ts` (H7, H8), `sprites.ts` (H9), `placement.ts` (H4)

## Khối cần tách từ `frontend/src/engine/legacy/roomEngine.js`
- 12–98 HẰNG SỐ + SPATIAL (đã có ở `shared/`)
- 207–455 AUDIO ENGINE
- 572–724 SPRITES ĐỒ VẬT
- 819–826 ĐỊNH TUYẾN ÂM THANH
- 2523–2843 KHUNG PHÒNG, ĐỒ VẬT, KÉO THẢ
- 2904–3050 POPOVER + MIXER

Tách xong khối nào thì xóa khối đó khỏi `roomEngine.js`, import module mới vào, mở `/room` kiểm tra vẫn chạy. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng
Xem `backend/src/areas/items-audio/README.md`.

## Toàn bộ file trong gói `TuanHung.zip` (Tuấn Hưng)

Giải nén cùng chỗ với các gói khác (Extract Here) là gộp vào `FocuSpace/`.

- `backend/src/areas/items-audio/README.md`
- `backend/src/areas/items-audio/catalogItemsService.ts`
- `backend/src/areas/items-audio/routes.ts`
- `backend/src/areas/items-audio/seed.ts`
- `backend/test/items-audio.test.ts`
- `docs/reports/sprint-1/tuan-hung.md`
- `docs/reports/sprint-2/tuan-hung.md`
- `docs/reports/sprint-3/tuan-hung.md`
- `docs/reports/sprint-4/tuan-hung.md`
- `docs/reports/sprint-5/tuan-hung.md`
- `docs/reviews/given/tuan-hung.md`
- `frontend/e2e/uc03-dieu-chinh-am-thanh.spec.ts`
- `frontend/e2e/uc04-sap-xep-do-vat.spec.ts`
- `frontend/src/areas/items-audio/README.md`
- `frontend/src/areas/items-audio/components/ItemPopover.tsx`
- `frontend/src/areas/items-audio/components/ItemTray.tsx`
- `frontend/src/areas/items-audio/components/VolumeMixer.tsx`
- `frontend/src/areas/items-audio/engine/audio/context.ts`
- `frontend/src/areas/items-audio/engine/audio/lofi.ts`
- `frontend/src/areas/items-audio/engine/audio/routing.ts`
- `frontend/src/areas/items-audio/engine/audio/synth.ts`
- `frontend/src/areas/items-audio/engine/placement.test.ts`
- `frontend/src/areas/items-audio/engine/placement.ts`
- `frontend/src/areas/items-audio/engine/sprites.ts`
- `frontend/src/areas/items-audio/lighthouse-room.md`
- `shared/src/catalog.ts`
- `shared/src/spatial.ts`
- `shared/test/catalog.test.ts`
- `shared/test/spatial.test.ts`
