# study — Phúc Thịnh

**Khu vực:** Phòng học, quản lý repo, các trang còn lại · nhãn GitHub `area:study · area:pages · area:repo` · danh sách task: `docs/TASKS.md`, mục Phúc Thịnh.

## Thư mục này (frontend)
- `pages/` — Home, Library, Account, About, NotFound, Room (T11, T13, T14, T10)
- `components/` — NavBar, Footer, Layout (T11)
- `roomSync.ts` — đồng bộ phòng với `/room-state` (T12)
- `engine/` — `markup.ts`, `room.css` (khung Căn phòng); sẽ thêm `static.ts`, `animation.ts`, `lighting.ts` (T9), `rooms.ts`, `pomodoro.ts` (T7)

## Khối cần tách từ `frontend/src/engine/legacy/roomEngine.js`
- 99–206 TRẠNG THÁI
- 456–571 PIXEL HELPERS + LỚP TĨNH
- 725–818 LỚP HOẠT HỌA
- 2474–2522 PHÒNG
- 2844–2903 POMODORO
- 3051–hết CHUYỂN PHÒNG + KHỞI ĐỘNG

Tách xong khối nào thì xóa khối đó khỏi `roomEngine.js`, import module mới vào, mở `/room` kiểm tra vẫn chạy. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng
Xem `backend/src/areas/study/README.md`.

## Toàn bộ file trong gói `PhucThinh.zip` (Phúc Thịnh)

Giải nén cùng chỗ với các gói khác (Extract Here) là gộp vào `FocuSpace/`.

- `backend/src/areas/study/README.md`
- `backend/src/areas/study/roomStateService.ts`
- `backend/src/areas/study/routes.ts`
- `backend/test/study.test.ts`
- `docs/reports/sprint-1/phuc-thinh.md`
- `docs/reports/sprint-2/phuc-thinh.md`
- `docs/reports/sprint-3/phuc-thinh.md`
- `docs/reports/sprint-4/phuc-thinh.md`
- `docs/reports/sprint-5/phuc-thinh.md`
- `docs/reviews/given/phuc-thinh.md`
- `docs/reviews/received.md`
- `frontend/e2e/uc01-chuyen-khong-gian.spec.ts`
- `frontend/e2e/uc02-tuy-bien-moi-truong.spec.ts`
- `frontend/e2e/uc05-pomodoro.spec.ts`
- `frontend/e2e/uc07-thu-vien.spec.ts`
- `frontend/e2e/uc09-dong-bo.spec.ts`
- `frontend/e2e/uc12-trang-chu-gioi-thieu.spec.ts`
- `frontend/src/areas/study/README.md`
- `frontend/src/areas/study/components/Footer.tsx`
- `frontend/src/areas/study/components/Layout.tsx`
- `frontend/src/areas/study/components/NavBar.tsx`
- `frontend/src/areas/study/components/RoomHeader.tsx`
- `frontend/src/areas/study/components/RoomNav.tsx`
- `frontend/src/areas/study/engine/animation.ts`
- `frontend/src/areas/study/engine/lighting.ts`
- `frontend/src/areas/study/engine/markup.ts`
- `frontend/src/areas/study/engine/pixel.ts`
- `frontend/src/areas/study/engine/pomodoro.test.ts`
- `frontend/src/areas/study/engine/pomodoro.ts`
- `frontend/src/areas/study/engine/room.css`
- `frontend/src/areas/study/engine/rooms.test.ts`
- `frontend/src/areas/study/engine/rooms.ts`
- `frontend/src/areas/study/engine/static.ts`
- `frontend/src/areas/study/pages/About.tsx`
- `frontend/src/areas/study/pages/Account.tsx`
- `frontend/src/areas/study/pages/Home.tsx`
- `frontend/src/areas/study/pages/Library.tsx`
- `frontend/src/areas/study/pages/NotFound.tsx`
- `frontend/src/areas/study/pages/Room.tsx`
- `frontend/src/areas/study/roomSync.ts`

Ngoài các file trên, gói của Thịnh chứa phần chung (cấu hình gốc, `shared/` còn lại, khung frontend/backend, `prisma/`, `.github/`), `docs/` và `prototype/`.
