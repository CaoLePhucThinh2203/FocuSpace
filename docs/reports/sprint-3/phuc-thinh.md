# Self-report — Sprint 3 (13/11/2026 – 17/11/2026) — Phúc Thịnh

> Soạn ngày 15/11/2026 từ git log và các PR đã merge; cuối sprint (17/11) bổ sung nếu có thêm việc. Cột Issue ghi mã việc trong `docs/TASKS.md`, cột PR ghi số Pull Request trên GitHub. Số commit trong sprint tính đến 15/11: 98 (gồm 4 commit nhánh `fix/van-phong-tieng-viet` chưa merge).

## Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| T1, G1, G9 | — | Tạo repo, đưa tài liệu, prototype, phân tích hệ thống lên GitHub; biên bản họp kế hoạch 13/11 | Xong |
| T2, T3 | #1 | Monorepo workspaces, ESLint, Prettier, `.env.example`; GitHub Actions lint, test, build với PostgreSQL 16; Vite + React + TypeScript + Tailwind 4, router 6 trang | Xong |
| T6, T8 | #1, #3 | Schema `RoomState` v4 bằng Zod; `schema.prisma` 8 bảng, ràng buộc CHECK, migration đầu | Xong |
| T12 | #1 | `GET/PUT /room-state` kiểm tra revision, 409 khi xung đột; Căn phòng chạy engine prototype, đồng bộ LocalStorage ↔ `/room-state`, hộp thoại hợp nhất | Xong |
| T11, T13, T14 | #1 | NavBar, Footer, Trang chủ, Giới thiệu & Liên hệ, 404; Thư viện lọc theo phòng, nhóm; Tài khoản đăng nhập, đăng ký, đổi tên, xóa | Xong |
| T5 | #3 | Cổng cắm khu vực `areas/*/index.ts` (frontend) và tự nạp `routes.ts`, `seed.ts` (backend); đưa `catalog`, `scenes`, `spatial`, `migrate` vào `shared/` để web chạy độc lập (nền cho H3, H5, N3, L4) | Xong |
| G11 | #3 | `render.yaml`, Vercel chuyển tiếp `/api` sang Render; triển khai Vercel + Render + Neon | Xong |
| T9, T10 | #10 | Header dùng chung, menu mobile; font Be Vietnam Pro; âm nền, 6 bài Lo-fi, xoay ngang trên điện thoại; Trang chủ phần Mô tả & Tính năng; E2E AC-03.5, AC-05.5, AC-06.3, AC-12.4–12.6 | Xong |
| — | #15, #22, #23 | Sửa lint E2E; tinh gọn tài liệu; bỏ than đỏ nhấp nháy khi tắt lửa lò sưởi | Xong |
| L6 | #29 | Pomodoro theo vòng và 4 nhịp học, bảng Nhịp học; Hẹn giờ ngủ trên header, chọn xong chờ Bắt đầu, có Tạm dừng (PRD v5.7) | Xong |
| T7, L3, H4 | #31 | PA B: `rooms.ts`, `pomodoro.ts`, `sleepTimer.ts`, `placement.ts` thành hàm thuần có unit test, engine gọi lại; đủ 25 đồ thì chỉ hiện thông báo; E2E UC.01, UC.04, UC.06 | Xong |
| N10 | #31 | `telemetry.ts` gom phiên, gửi lô 60 giây / khi ẩn tab / khi rời trang (keepalive); E2E kiểm tra lô `completed`/`reset` | Xong |
| L2, H11, N8, N9, T12 | #31 | Integration test backend trên PostgreSQL 16 tạm (`embedded-postgres`): auth, `/me`, `/me/stats`, `/room-state`, `/catalog/*`, `/telemetry/batch` | Xong |
| — | #31 | PRD, API, DATABASE theo 25 đồ, cookie SameSite; drawio và Chương 1 xuất lại 11 hình | Xong |
| — | #33, #35 | Khôi phục nến phát sáng kèm E2E; Thư viện ô ảnh đồ vật cùng màu thẻ | Xong |
| H12 | #40, #41, #42, #43 | Tự host font, CLS do thanh cuộn, dọn mã tối ưu, chữ chú thích 12 px; báo cáo Lighthouse 6 trang kèm JSON | Xong |
| — | (chưa mở PR) | Nhánh `fix/van-phong-tieng-viet`: chữ trên giao diện đơn giản, thực tế (PRD v5.11) | Chờ PR |
| — | #1–#35, #40–#42 | Duyệt và merge PR | Xong |

## Khó khăn và cách xử lý
[Tự điền]

## Việc sprint sau
Các issue S4 đã làm sớm trong S3. S4 (18–22/11): mở PR nhánh văn phong và chạy lại seeder trên Neon; kiểm tra bản triển khai, sửa lỗi phát sinh. S5: góp ý UI/UX cho nhóm B (T16), tổng hợp góp ý nhận được (T17), sửa theo góp ý (G5), dựng video demo (T19), nộp bài (G7).

## Tự đánh giá mức đóng góp (1–5)
[Tự điền]
