# Tách engine Căn phòng (roomEngine.js → module)

`roomEngine.js` là phần `<script>` của `prototype/web/room.html`, chạy nguyên trong trang `/room` (`frontend/src/areas/study/pages/Room.tsx`) để có sản phẩm chạy được ngay (mốc demo 15/11/2026).
Việc tiếp theo (S3–S4, theo `docs/PLAN.md` Phase 1–5 và `docs/TASKS.md`): mỗi người chuyển khối của mình sang module TypeScript, viết test, rồi xóa khối đó khỏi file này. Làm từng khối một, sau mỗi khối mở `/room` kiểm tra vẫn chạy.

| Dòng (khoảng) | Khối trong roomEngine.js | Chuyển sang | Người | Task |
|---|---|---|---|---|
| 12–88 | HẰNG SỐ PHÒNG (TYPES, SCENES, SLOTS, LOFI…) | `shared/src/constants.ts`, `shared/src/catalog.ts` (đã có phần danh mục) | Hưng | H3 |
| 89–98 | CÔNG THỨC SPATIAL AUDIO | `shared/src/spatial.ts` (đã có, có test) | Hưng | H5 |
| 99–206 | TRẠNG THÁI (loadState, save) | `shared/src/roomState.ts`, `shared/src/migrate.ts` (đã có) + `frontend/src/store/room.ts` (Zustand, phần chung) | Thịnh, Lộc | T6, L4 |
| 207–455 | AUDIO ENGINE | `frontend/src/areas/items-audio/engine/audio/` | Hưng | H7, H8 |
| 456–478 | PIXEL HELPERS | `frontend/src/areas/study/engine/pixel.ts` | Thịnh | T9 |
| 479–571 | LỚP TĨNH (Phòng học) | `frontend/src/areas/study/engine/static.ts` | Thịnh | T9 |
| 572–724 | SPRITES ĐỒ VẬT | `frontend/src/areas/items-audio/engine/sprites.ts` | Hưng | H9 |
| 725–818 | LỚP HOẠT HỌA | `frontend/src/areas/study/engine/animation.ts` | Thịnh | T9 |
| 819–826 | ĐỊNH TUYẾN ÂM THANH + HẸN GIỜ NGỦ | `areas/items-audio/engine/audio/routing.ts`, `areas/bedroom/engine/sleepTimer.ts` | Hưng, Lộc | H7, L3 |
| 827–1343 | PHÒNG NGỦ | `frontend/src/areas/bedroom/engine/bed.ts` (+ âm thanh phòng ngủ) | Lộc | L5 |
| 1344–2473 | SÂN VƯỜN | `frontend/src/areas/garden/engine/out.ts`, `sceneAudio.ts` | Nhiên | N5, N6 |
| 2474–2522 | PHÒNG: cấu hình từng phòng | `frontend/src/areas/study/engine/rooms.ts` | Thịnh | T7 |
| 2523–2843 | KHUNG PHÒNG, ĐỒ VẬT, KÉO THẢ, THANH CÔNG CỤ | `areas/items-audio/engine/placement.ts` + `areas/items-audio/components/ItemTray.tsx` | Hưng | H4, H9 |
| 2844–2903 | POMODORO + HẸN GIỜ NGỦ | `areas/study/engine/pomodoro.ts`, `areas/bedroom/engine/sleepTimer.ts` + component | Thịnh, Lộc | T7, L6 |
| 2904–3050 | POPOVER | `areas/items-audio/components/ItemPopover.tsx`, `VolumeMixer.tsx` | Hưng | H10 |
| 3051–3119 | CHUYỂN PHÒNG | `areas/study/engine/rooms.ts` + `areas/study/components/RoomNav.tsx` | Thịnh | T7 |
| 3120–hết | KHỞI ĐỘNG | `areas/study/engine/index.ts` (`mountRoom`) | Thịnh | T10 |

Quy tắc khi tách: giữ nguyên hằng số và công thức (CLAUDE.md, mục Constraint); hàm thuần đưa vào `shared/` hoặc `engine/logic/` kèm unit test; phần đụng DOM/canvas để trong `engine/render/` hoặc component React.
