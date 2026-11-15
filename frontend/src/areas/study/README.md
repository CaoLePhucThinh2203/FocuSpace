# study — Phúc Thịnh

**Khu vực:** Phòng học, quản lý repo, các trang còn lại · nhãn GitHub `area:study · area:pages · area:repo` · danh sách task: `docs/TASKS.md`, mục Phúc Thịnh.

## Thư mục này (frontend)

- `pages/` — Home, Library, Account, About, NotFound, Room (T10, T11, T13, T14)
- `components/` — NavBar, SiteNav, Footer, Layout (T11)
- `roomSync.ts` — đồng bộ phòng với `/room-state`, hộp thoại hợp nhất (T12)
- `engine/markup.ts`, `engine/room.css` — khung HTML/CSS của Căn phòng
- `engine/rooms.ts` — bảng mũi tên/cửa nhà, quy tắc chuyển phòng (T7, có test)
- `engine/pomodoro.ts` — chu kỳ Pomodoro theo vòng, 4 nhịp học (T7, có test)

## Phần trong `frontend/src/engine/legacy/roomEngine.js` (PA B)

Vẽ Phòng học (PIXEL HELPERS, LỚP TĨNH, LỚP HOẠT HỌA), cấu hình PHÒNG, giao diện Pomodoro, CHUYỂN PHÒNG, KHỞI ĐỘNG giữ trong engine; quy tắc mới viết thành hàm thuần ở `engine/` kèm test rồi gọi từ engine. Chi tiết: `frontend/src/engine/legacy/README.md`.

## Backend tương ứng

Xem `backend/src/areas/study/README.md`.
