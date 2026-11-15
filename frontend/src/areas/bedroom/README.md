# bedroom — Tuấn Lộc

**Khu vực:** Phòng ngủ, tài khoản & thống kê · nhãn GitHub `area:bedroom` · danh sách task: `docs/TASKS.md`, mục Tuấn Lộc.

## Thư mục này (frontend)

- `pages/Stats.tsx` — trang Thống kê (L13)
- `engine/sleepTimer.ts` — Hẹn giờ ngủ Tắt/15/30/60 phút, Bắt đầu/Tạm dừng, giảm dần 2 phút cuối (L3, có test)

## Phần trong `frontend/src/engine/legacy/roomEngine.js` (PA B)

PHÒNG NGỦ (vẽ, âm phòng ngủ) và giao diện Hẹn giờ ngủ (ô header, bảng chọn) giữ trong engine; quy tắc mới viết thành hàm thuần ở `engine/` kèm test rồi gọi từ engine. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng

Xem `backend/src/areas/bedroom/README.md`.
