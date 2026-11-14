# bedroom — Tuấn Lộc

**Khu vực:** Phòng ngủ, tài khoản & thống kê · nhãn GitHub `area:bedroom` · danh sách task: `docs/TASKS.md`, mục Tuấn Lộc.

## Thư mục này (frontend)
- `pages/Stats.tsx` — trang Thống kê (L13, đã có)
- `components/` — `SleepTimer` giao diện Hẹn giờ ngủ (L6)
- `engine/` — `bed.ts` vẽ Phòng ngủ (L5), `sleepTimer.ts` (L3)

## Khối cần tách từ `frontend/src/engine/legacy/roomEngine.js`
- 827–1343 PHÒNG NGỦ
- 2844–2903 HẸN GIỜ NGỦ (phần Phòng ngủ)

Tách xong khối nào thì xóa khối đó khỏi `roomEngine.js`, import module mới vào, mở `/room` kiểm tra vẫn chạy. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng
Xem `backend/src/areas/bedroom/README.md`.

## Toàn bộ file trong gói `TuanLoc.zip` (Tuấn Lộc)

Giải nén cùng chỗ với các gói khác (Extract Here) là gộp vào `FocuSpace/`.

- `backend/src/areas/bedroom/README.md`
- `backend/src/areas/bedroom/authService.ts`
- `backend/src/areas/bedroom/routes.ts`
- `backend/src/areas/bedroom/statsService.ts`
- `backend/test/bedroom.test.ts`
- `docs/reports/lighthouse/README.md`
- `docs/reports/sprint-1/tuan-loc.md`
- `docs/reports/sprint-2/tuan-loc.md`
- `docs/reports/sprint-3/tuan-loc.md`
- `docs/reports/sprint-4/tuan-loc.md`
- `docs/reports/sprint-5/tuan-loc.md`
- `docs/reviews/given/tuan-loc.md`
- `frontend/e2e/responsive.spec.ts`
- `frontend/e2e/uc06-hen-gio-ngu.spec.ts`
- `frontend/e2e/uc08-dang-ky-dang-nhap.spec.ts`
- `frontend/e2e/uc10-xem-thong-ke.spec.ts`
- `frontend/e2e/uc11-quan-ly-tai-khoan.spec.ts`
- `frontend/src/areas/bedroom/README.md`
- `frontend/src/areas/bedroom/components/SleepTimer.tsx`
- `frontend/src/areas/bedroom/engine/bed.ts`
- `frontend/src/areas/bedroom/engine/sleepTimer.test.ts`
- `frontend/src/areas/bedroom/engine/sleepTimer.ts`
- `frontend/src/areas/bedroom/pages/Stats.tsx`
- `shared/src/migrate.ts`
- `shared/test/migrate.test.ts`
