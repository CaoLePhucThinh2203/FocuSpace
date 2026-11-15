# Engine Căn phòng (`roomEngine.js`) — PA B: chỉ tách logic thuần

`roomEngine.js` là phần `<script>` của `prototype/web/room.html`, chạy trong trang `/room` (`frontend/src/areas/study/pages/Room.tsx`). Từ PRD v5.5 các thay đổi đã duyệt (âm nền, Pomodoro theo vòng, Hẹn giờ ngủ, màu lông mèo, N12–N15…) được sửa thẳng ở file này, nên **đây là nguồn logic và hằng số hiện hành**; `prototype/FocuSpace-Semi-Sandbox.html` chỉ dùng để đối chiếu hình, màu.

**Quyết định 15/11/2026 (PA B, `docs/PLAN.md` §6):** phần vẽ canvas, âm thanh Web Audio, khay, popover, mixer **giữ trong file này** (không tách sang React/TS). Chỉ tách **hàm thuần** có quy tắc nghiệp vụ (BR/AC) ra module TypeScript kèm unit test; engine import và gọi lại.

## Hàm thuần đã tách

| Module | Khối trong `roomEngine.js` gọi lại | Quy tắc | Người |
|---|---|---|---|
| `shared/src/spatial.ts`, `catalog.ts`, `scenes.ts`, `roomState.ts`, `migrate.ts` | HẰNG SỐ PHÒNG, CÔNG THỨC SPATIAL AUDIO, TRẠNG THÁI (định dạng lưu, đồng bộ) | BR-06, BR-07, BR-12 | Hưng, Nhiên, Thịnh, Lộc |
| `areas/study/engine/pomodoro.ts` | POMODORO | BR-01, AC-05.3–05.7 | Thịnh |
| `areas/study/engine/rooms.ts` | CHUYỂN PHÒNG (`NAVS`, `switchRoom`) | FR-NAV-01→03, AC-01.2, AC-05.8 | Thịnh |
| `areas/bedroom/engine/sleepTimer.ts` | HẸN GIỜ NGỦ | BR-02, FR-TIME-03 | Lộc |
| `areas/items-audio/engine/placement.ts` | KHUNG PHÒNG — đồ vật di động (`clampPos`, `addItem`), `ROOMCFG.surfaces/shelves` | BR-03→06, AC-04.2, AC-04.4 | Hưng |
| `lib/time.ts` | POMODORO (tiếng tích tắc) | AC-05.6 | Thịnh |

## Giữ nguyên trong `roomEngine.js` (tìm theo tiêu đề khối `=====`)

| Khối | Chủ khu vực |
|---|---|
| AUDIO ENGINE, ĐỊNH TUYẾN ÂM THANH THEO PHÒNG, SPRITES ĐỒ VẬT, POPOVER (đồ vật, mixer), thanh công cụ + khay, kéo thả | Hưng |
| SÂN VƯỜN (vẽ, âm khung cảnh) | Nhiên |
| PHÒNG NGỦ (vẽ, âm phòng ngủ), giao diện Hẹn giờ ngủ | Lộc |
| PIXEL HELPERS, LỚP TĨNH, LỚP HOẠT HỌA, PHÒNG (cấu hình), giao diện Pomodoro, KHỞI ĐỘNG | Thịnh |

Mỗi người vẫn sửa khối của mình trong file này (PR gán Thịnh duyệt vì đây là file chung). Thêm quy tắc mới thì viết thành hàm thuần trong thư mục khu vực, test trước, rồi gọi từ engine.

## Hook kiểm thử

Cuối file engine gắn `window.__focuspace` (state, ROOM, sleep, pomo, switchRoom…) để test E2E đọc trạng thái; kiểu khai báo ở `frontend/e2e/focuspaceHook.ts`. Engine báo thông điệp ngắn cho người dùng bằng sự kiện `focuspace:notice` (ví dụ "Phòng đã đầy…"), `Room.tsx` hiện ở ô `role="status"`.
