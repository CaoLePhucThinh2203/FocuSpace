# items-audio — Tuấn Hưng

**Khu vực:** Đồ vật, bảng đồ vật, âm thanh · nhãn GitHub `area:items-audio` · danh sách task: `docs/TASKS.md`, mục Tuấn Hưng.

## Thư mục này (frontend)

- `engine/placement.ts` — quy tắc đặt đồ BR-03→06, hình học mặt bàn/giá/tủ, giới hạn 25 đồ và câu thông báo "Phòng đã đầy…" (H4, có test)
- `lighthouse-room.md` — số đo Lighthouse `/room` trước/sau (H12)
- Danh mục 17 đồ vật và công thức âm thanh không gian nằm ở `shared/src/catalog.ts`, `shared/src/spatial.ts` (H3, H5)

## Phần trong `frontend/src/engine/legacy/roomEngine.js` (PA B)

AUDIO ENGINE, ĐỊNH TUYẾN ÂM THANH THEO PHÒNG, SPRITES ĐỒ VẬT, thanh công cụ + khay, kéo thả, POPOVER (đồ vật, Volume mixer) giữ trong engine; quy tắc mới viết thành hàm thuần ở `engine/` kèm test rồi gọi từ engine. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng

Xem `backend/src/areas/items-audio/README.md`.
