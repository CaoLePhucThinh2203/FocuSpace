# FocuSpace — Danh sách task theo thành viên (TASKS.md)

> 13/11/2026 (cập nhật lịch) · nguồn: `docs/PLAN.md` §2–3 (phân vai; lịch từ 27/10/2026: S1 ✅ 27/10–07/11, S2 ✅ 08–12/11, S3 13–17/11, S4 18–22/11, S5 23–27/11; hạn **27/11/2026**), PRD 5.4 (AC).
> Issue đánh dấu ✅ là việc đã làm ở S1–S2: vẫn tạo trên GitHub rồi đóng ngay (kèm link Figma/file) để milestone S1, S2 có lịch sử.
> Mỗi dòng = **1 GitHub Issue**: tiêu đề đúng như cột "Issue", gán người, milestone = sprint, nhãn `area:*`, `type:*`, `P0/P1`. Mở nhánh `feat/<số>-<mô-tả>`, PR có `Closes #<số>` và mã UC.
> Cột **Xong khi** là điều kiện đóng issue (Definition of Done): test liên quan xanh, PR được 1 người khác duyệt, CI xanh.
> Phần backend và việc chung đánh dấu ⓓ là **[Đề xuất]** — nhóm xác nhận ở buổi họp giữa S3 (15/11).

Nhãn khu vực: `area:items-audio` (Hưng) · `area:garden` (Nhiên) · `area:bedroom` (Lộc) · `area:study` · `area:pages` · `area:repo` (Thịnh) · `area:backend` · `area:shared`.

## Tổng hợp khối lượng

| Thành viên | Số issue | Khu vực |
|---|---|---|
| Tuấn Hưng | 12 | Đồ vật, bảng đồ vật, âm thanh |
| Đình Nhiên | 11 | Sân vườn, telemetry, GA4/Sentry |
| Tuấn Lộc | 12 | Phòng ngủ, Hẹn giờ ngủ, auth, `/me`, thống kê API |
| Phúc Thịnh | 19 | Phòng học, repo, khung Căn phòng, 5 trang còn lại, đồng bộ |
| Cả nhóm | 9 | Wireframe review, review chéo, self-report, video |

---

## Tuấn Hưng — Đồ vật, bảng đồ vật, âm thanh

| # | Sprint | Issue | UC / AC | Xong khi |
|---|---|---|---|---|
| H1 | S3 | `test(items): khung unit test placement, spatial, catalog` | UC.03, UC.04 | Có `it.todo` cho BR-03→07, AC-03.3, AC-04.4 |
| H2 | S3 | `test(e2e): khung uc03-dieu-chinh-am-thanh, uc04-sap-xep-do-vat` | AC-03.x, AC-04.x | Mỗi AC là một `test.fixme` |
| H3 | S3 | `feat(shared): catalog.ts 17 loại đồ vật từ prototype TYPES` | UC.04, UC.07 | Test đủ 17 loại, kích thước, phòng, nhóm |
| H4 | S3 | `feat(engine): placement.ts quy tắc đặt đồ BR-03→06` | UC.04 | Unit test mỗi nhánh BR-04, giường mèo BR-05, ≤ 40 đồ |
| H5 | S3 | `feat(engine): spatial.ts gain/pan BR-07` | UC.03 | AC-03.3 xanh |
| H6 | S3 | `feat(db): bảng item_types + seeder đồ vật` ⓓ | UC.07 | `prisma db seed` chạy 2 lần vẫn 17 dòng |
| H7 | S4 | `feat(audio): AudioContext sau cú nhấp đầu, đồ thị âm, Master` | UC.03 | AC-03.1, AC-03.2 xanh; lỗi tạo → ghi telemetry |
| H8 | S4 | `feat(audio): âm tổng hợp đồ vật + nhạc Lo-fi (OfflineAudioContext)` | UC.03 | Nghe giống prototype bằng tai nghe; Lo-fi dựng nền ngay khi mở Căn phòng (cách 2) |
| H9 | S4 | `feat(items): khay đồ vật, kéo thả, bàn phím, xóa` | UC.04 | AC-04.1 → AC-04.5 xanh |
| H10 | S4 | `feat(items): popover đồ vật + Volume mixer` | UC.03 | AC-03.4 xanh; pan cập nhật < 30 ms |
| H11 | S4 | `feat(api): GET /catalog/items lọc room, group` ⓓ | UC.07 | Integration test 200/400; `Cache-Control` 1 giờ |
| H12 | S5 | `perf(room): tối ưu Lighthouse Căn phòng (tách mã, title + meta — cách 2)` ⓓ | AC-NF.1 | Báo cáo trước/sau trong `docs/reports/lighthouse/` |

## Đình Nhiên — Sân vườn

| # | Sprint | Issue | UC / AC | Xong khi |
|---|---|---|---|---|
| N1 | S1 ✅ | `docs(wireframe): wireframe Figma Trang chủ, Giới thiệu & Liên hệ` | UC.12 | ✅ Figma desktop + mobile, nhóm duyệt; PNG xuất vào `docs/wireframes/` |
| N2 | S3 | `test(garden): khung test Sân vườn, khung cảnh, telemetry` | UC.01, UC.02 | `test.fixme` cho AC-01.3, AC-02.3 |
| N3 | S3 | `feat(shared): defaults Sân vườn + catalog 5 khung cảnh` | UC.02 | Test đủ 5 cảnh, mặc định Khu rừng |
| N4 | S3 | `feat(db): bảng scenes + seeder khung cảnh` ⓓ | UC.07 | Seed 2 lần vẫn 5 dòng |
| N5 | S4 | `feat(render): Sân vườn — cây, xích đu, nhà gỗ, 5 khung cảnh, lá/tuyết rơi` | UC.02 | Ảnh chụp từng cảnh khớp prototype |
| N6 | S4 | `feat(audio): âm nền 5 khung cảnh, cross-fade khi đổi cảnh` | UC.02 | Đổi cảnh liên tục không chồng lớp âm |
| N7 | S4 | `feat(garden): ScenePicker + cửa nhà → Phòng học` | UC.01, UC.02 | AC-01.3, AC-02.3 xanh |
| N8 | S4 | `feat(api): GET /catalog/scenes` ⓓ | UC.07 | Integration test; AC-07.3 xanh |
| N9 | S4 | `feat(api): POST /telemetry/batch upsert idempotent` ⓓ | UC.05, UC.06 | Gửi trùng lô không nhân đôi dòng; 202/400/413/429 |
| N10 | S5 | `feat(persistence): telemetry.ts gom sự kiện, gửi lô 60 s / khi ẩn tab` ⓓ | UC.05, UC.06 | Phiên `completed`/`reset`/`abandoned` ghi đúng |
| N11 | S5 | `feat(obs): Google Analytics 4 + Sentry frontend/backend` ⓓ | AC-NF.2 | Realtime GA4 thấy page_view; Sentry nhận lỗi thử; không gửi PII |

## Tuấn Lộc — Phòng ngủ

| # | Sprint | Issue | UC / AC | Xong khi |
|---|---|---|---|---|
| L1 | S1 ✅ | `docs(wireframe): wireframe Figma Thống kê, Tài khoản` | UC.08, UC.10, UC.11 | ✅ Figma desktop + mobile, nhóm duyệt |
| L2 | S3 | `test(api): khung integration test auth, me, stats` ⓓ | UC.08, UC.10, UC.11 | Liệt kê đủ mã trạng thái API §3.2 |
| L3 | S3 | `feat(engine): sleepTimer.ts Tắt/15/30/45/60, giảm dần 2 phút cuối` | UC.06 | Unit test BR-02 |
| L4 | S3 | `feat(shared): migrate.ts dữ liệu prototype → v4` | UC.09 | Test: rỗng, JSON hỏng, bản phẳng `ver: 3`, > 40 đồ |
| L5 | S4 | `feat(render): Phòng ngủ — cửa sổ 3 thời tiết, rèm, đồng hồ tường, đèn ngủ, thảm, kệ` | UC.02 | Ảnh chụp khớp prototype |
| L6 | S4 | `feat(bedroom): giao diện Hẹn giờ ngủ + thông báo hết giờ` | UC.06 | AC-06.1, AC-06.2, AC-01.4 xanh |
| L7 | S4 | `feat(api): auth register/login/refresh/logout` ⓓ | UC.08 | AC-08.3, AC-08.4; refresh xoay vòng, thu hồi family |
| L8 | S5 | `feat(api): GET/PATCH/DELETE /me` ⓓ | UC.11 | Xóa cascade, telemetry `user_id = NULL` |
| L9 | S5 | `feat(api): GET /me/stats range, tz` ⓓ | UC.10 | Số liệu đúng với dữ liệu tạo trong test |
| L10 | S5 | `docs(review): góp ý UI/UX cho nhóm B` | Task 5a | `docs/reviews/given/<nhóm>.md` |
| L11 | S5 | `test(e2e): responsive 375/768/1280 cho 6 trang` ⓓ | AC-NF.3, AC-12.4 | Ảnh chụp 3 cỡ mỗi trang |
| L12 | S5 | `docs(lighthouse): tổng hợp báo cáo 6 trang trước/sau` ⓓ | AC-NF.1 | ≥ 90 cả 4 hạng mục |

## Phúc Thịnh — Phòng học, quản lý repo, các trang còn lại

| # | Sprint | Issue | UC / AC | Xong khi |
|---|---|---|---|---|
| T1 | S3 | `chore(repo): repo GitHub, bảo vệ main, nhãn, milestone S1–S5, Projects` | Task 1d | Mọi thành viên có quyền; issue từ file này đã tạo |
| T2 | S3 | `chore(repo): monorepo workspaces, ESLint, Prettier, Vitest, Playwright, CI` | Task 1e | `npm run lint`, `npm test` xanh trên CI |
| T3 | S3 | `chore(frontend): Vite React TS + Tailwind + React Router 6 route + 404` | UC.12 | `npm run dev` mở được 6 route trống |
| T4 | S1 ✅ | `docs(wireframe): wireframe Figma Căn phòng, Thư viện` | UC.01–UC.07 | ✅ Figma desktop + mobile, nhóm duyệt |
| T5 | S3 | `feat(shared): chốt giao diện RoomState, drawX(ctx,state,t), audio.register, telemetry.track` | — | 3 người còn lại duyệt PR |
| T6 | S3 | `feat(shared): roomState.ts Zod schema v4 + defaults Phòng học` | UC.09 | Test giới hạn 40 đồ, ≤ 64 KB |
| T7 | S3 | `feat(engine): rooms.ts chuyển phòng, pomodoro.ts` | UC.01, UC.05 | AC-01.2, AC-05.2 (unit) xanh |
| T8 | S3 | `feat(db): schema.prisma + migration đầu` ⓓ | Task 3a | `prisma migrate deploy` chạy trên DB trống |
| T9 | S4 | `feat(render): Phòng học — bàn, nhân vật, cửa sổ 4 thời tiết, rèm, lò sưởi, thảm, đèn` | UC.02 | AC-02.1, AC-02.4 xanh; ảnh chụp khớp prototype |
| T10 | S4 | `feat(room): Header, Toolbar, store Zustand, chip lưu, LocalStorage 250 ms` | UC.01, UC.05 | AC-01.1, AC-02.2, AC-05.1, AC-05.3, AC-05.4 xanh |
| T11 | S4 | `feat(pages): Trang chủ, Giới thiệu & Liên hệ, NavBar, Footer, 404` | UC.12 | AC-12.1 → AC-12.4 xanh |
| T12 | S5 | `feat(api): GET/PUT /room-state + sync.ts + hộp thoại hợp nhất` ⓓ | UC.09 | AC-09.1 → AC-09.4 xanh |
| T13 | S5 | `feat(pages): Tài khoản — form đăng nhập/đăng ký, đổi tên, đăng xuất, xóa` | UC.08, UC.11 | AC-08.1, AC-08.2, AC-11.1 → AC-11.3 xanh |
| T14 | S5 | `feat(pages): Thư viện — 2 thẻ, bộ lọc, URL, đang tải/lỗi/rỗng` | UC.07 | AC-07.1 → AC-07.4 xanh |
| T15 | S5 | `feat(pages): Thống kê — khoảng thời gian, 4 ô, biểu đồ SVG, bảng phiên` | UC.10 | AC-10.1 → AC-10.3 xanh |
| T16 | S5 | `docs(review): góp ý UI/UX cho nhóm B` | Task 5a | `docs/reviews/given/<nhóm>.md` |
| T17 | S5 | `docs(review): received.md + issue cho từng góp ý được làm` | Task 5b | Bảng góp ý → quyết định → PR/lý do |
| T18 | S5 | `docs: README.md (cách chạy, tổng quan, tính năng + ảnh, ERD, khác)` | Nộp bài | Đủ 5 mục theo đề bài |
| T19 | S5 | `chore: dựng video demo ≤ 10 phút, 720p, đăng YouTube` | Nộp bài | Link trong README |

## Cả nhóm

| # | Sprint | Issue | Người | Xong khi |
|---|---|---|---|---|
| G1 | S1 ✅ | `docs(meeting): biên bản họp khởi động 27/10 và họp kế hoạch 13/11` | Thịnh | ✅ `docs/meetings/2026-10-27-khoi-dong.md`, `2026-11-13-hop-ke-hoach.md` |
| G2 | S1 ✅ | `docs(wireframe): duyệt bộ wireframe Figma 6 trang` | Cả nhóm | ✅ duyệt cùng PRD 07/11; link Figma ghi vào PRD 5.3 [Cần bổ sung] |
| G3 | S1→S5 | `docs(report): self-report sprint N` (5 issue, mỗi sprint 1) | Mỗi người | `docs/reports/sprint-N/<tên>.md`, thiếu bị trừ 10%; **S1, S2 viết bù trước 17/11** |
| G4 | S5 | `docs(review): góp ý UI/UX cho nhóm A` | Hưng, Nhiên | `docs/reviews/given/<nhóm>.md` |
| G5 | S5 | `fix: sửa theo góp ý nhận được` | Chủ khu vực liên quan | Mỗi góp ý được làm có PR riêng |
| G6 | S5 | `chore: quay phần demo khu vực mình cho video` | Mỗi người | Gửi clip cho Thịnh trước 26/11 |
| G7 | S5 | `chore: nộp bài` | Thịnh | Repo, README, video nộp trước hết 27/11 |
| G8 | S1 ✅ | `feat(prototype): prototype Căn phòng + 6 trang` | Thịnh (cả nhóm góp ý) | ✅ `prototype/FocuSpace-Semi-Sandbox.html`, `prototype/web/` |
| G9 | S2 ✅ | `docs(plan): PRD, PLAN, Kiến trúc, API, DATABASE, Chương 1 Phân tích hệ thống` | Thịnh (cả nhóm góp nội dung khu vực mình) | ✅ các file trong `docs/` |
