# FocuSpace — Danh sách task theo thành viên (TASKS.md)

> Cập nhật 15/11/2026 · nguồn: `docs/PLAN.md` §2–3 (phân vai; lịch từ 27/10/2026: S1 ✅ 27/10–07/11, S2 ✅ 08–12/11, S3 13–17/11, S4 18–22/11, S5 23–27/11; hạn **27/11/2026**), PRD 5.4 (AC).
> Issue đánh dấu ✅ là việc đã làm ở S1–S2: vẫn tạo trên GitHub rồi đóng ngay (kèm link file) để milestone S1, S2 có lịch sử.
> Issue trên GitHub tạo bù ngày 18/11/2026 từ bảng này: #64–#134 (cột # ghi mã việc · số issue), gắn milestone S1–S5 theo ngày merge PR; việc đã xong được đóng kèm bình luận số PR, còn mở #129 (G7).
> Mỗi dòng = **1 GitHub Issue**: tiêu đề đúng như cột "Issue", gán người, milestone = sprint, nhãn `area:*`, `type:*`, `P0/P1`. Mở nhánh `feat/<số>-<mô-tả>`, PR có `Closes #<số>` và mã UC.
> Cột **Xong khi** là điều kiện đóng issue (Definition of Done): test liên quan xanh, PR được 1 người khác duyệt, CI xanh.
> Phần backend và việc chung (đánh dấu ⓓ) đã chốt 13/11/2026; trang Thống kê chuyển từ Thịnh (T15 cũ) sang Lộc (L13).
> **PA B (15/11/2026, `docs/PLAN.md` §2):** việc vẽ, âm thanh, khay, popover của Căn phòng (H7–H10, H13, N5–N7, N12–N15, L5, L6, T9, T10) làm thẳng trong `frontend/src/engine/legacy/roomEngine.js`, không tách module; issue đóng khi E2E/ảnh chụp đạt. Quy tắc nghiệp vụ là hàm thuần có test: T7 `rooms.ts` + `pomodoro.ts`, L3 `sleepTimer.ts`, H4 `placement.ts` (đã xong 15/11).
> Cột **Trạng thái** (rà soát 15/11/2026 từ git log và PR đã merge): ✅ xong, kèm số PR · ◐ đang làm · ☐ chưa làm. Phần lớn việc ghi S4, S5 đã làm sớm trong S3.

Nhãn khu vực: `area:items-audio` (Hưng) · `area:garden` (Nhiên) · `area:bedroom` (Lộc) · `area:study` · `area:pages` · `area:repo` (Thịnh) · `area:backend` · `area:shared`.

## Thư mục của từng người

Mỗi người chỉ sửa thư mục của mình; sửa chỗ khác thì mở PR và gán chủ thư mục duyệt. Mỗi thư mục khu vực có `README.md` ghi việc còn lại.

| Người | Frontend | Backend | Phần đã có | Issue còn mở |
|---|---|---|---|---|
| Tuấn Hưng | `frontend/src/areas/items-audio/` | `backend/src/areas/items-audio/` | `GET /catalog/items`, seeder `item_types` | G4, G5, G6 |
| Đình Nhiên | `frontend/src/areas/garden/` | `backend/src/areas/garden/` | GA4 + Sentry phía web, `GET /catalog/scenes`, `POST /telemetry/batch`, seeder `scenes` | N11, G4, G5, G6 |
| Tuấn Lộc | `frontend/src/areas/bedroom/` | `backend/src/areas/bedroom/` | trang Thống kê, auth, `/me`, `/me/stats` | G5, G6 |
| Phúc Thịnh | `frontend/src/areas/study/` | `backend/src/areas/study/` | 5 trang + 404, NavBar/Footer, trang Căn phòng, đồng bộ phòng, `/room-state` | T16–T19, G5–G7 |
| Phần chung (Thịnh giữ) | `frontend/src/{App.tsx, main.tsx, lib/, store/, styles/, engine/legacy/}` | `backend/src/{app.ts, server.ts, routes/, middleware/, lib/}`, `backend/prisma/` | monorepo, CI, `shared/` + 12 unit test, schema 8 bảng | G10 |

## Tổng hợp khối lượng

| Thành viên | Số issue | Khu vực |
|---|---|---|
| Tuấn Hưng | 13 | Đồ vật, bảng đồ vật, âm thanh |
| Đình Nhiên | 15 | Sân vườn (gồm tinh chỉnh hình ảnh 15/11), telemetry, GA4/Sentry |
| Tuấn Lộc | 13 | Phòng ngủ, Hẹn giờ ngủ, auth, `/me`, thống kê (API + trang) |
| Phúc Thịnh | 18 | Phòng học, repo, khung Căn phòng, 4 trang còn lại, đồng bộ |
| Cả nhóm | 12 | Wireframe review, review chéo, self-report, video, tài khoản dịch vụ, triển khai |

---

## Tuấn Hưng — Đồ vật, bảng đồ vật, âm thanh

| # | Sprint | Issue | UC / AC | Xong khi | Trạng thái |
|---|---|---|---|---|---|
| H1 · #64 | S3 | `test(items): khung unit test placement, spatial, catalog` | UC.03, UC.04 | Có `it.todo` cho BR-03→07, AC-03.3, AC-04.4 | ✅ #6 |
| H2 · #65 | S3 | `test(e2e): khung uc03-dieu-chinh-am-thanh, uc04-sap-xep-do-vat` | AC-03.x, AC-04.x | Mỗi AC là một `test.fixme` | ✅ #6 |
| H3 · #66 | S3 | `feat(shared): catalog.ts 17 loại đồ vật từ prototype TYPES` | UC.04, UC.07 | Test đủ 17 loại, kích thước, phòng, nhóm | ✅ #3 |
| H4 · #67 | S3 | `feat(engine): placement.ts quy tắc đặt đồ BR-03→06` | UC.04 | Unit test mỗi nhánh BR-04, giường mèo BR-05, ≤ 25 đồ; đủ 25 đồ thì không thêm, chỉ hiện “Phòng đã đầy — hãy xóa bớt đồ để thêm mới” (AC-04.2) | ✅ #31 |
| H5 · #68 | S3 | `feat(engine): spatial.ts gain/pan BR-07` | UC.03 | AC-03.3 xanh | ✅ #3 |
| H6 · #69 | S3 | `feat(db): bảng item_types + seeder đồ vật` ⓓ | UC.07 | `prisma db seed` chạy 2 lần vẫn 17 dòng | ✅ #6 |
| H7 · #70 | S4 | `feat(audio): AudioContext sau cú nhấp đầu, đồ thị âm, Master` | UC.03 | AC-03.1, AC-03.2 xanh; lỗi tạo → ghi telemetry | ✅ #1, #19 (PA B) |
| H8 · #71 | S4 | `feat(audio): âm tổng hợp đồ vật + nhạc Lo-fi (OfflineAudioContext)` | UC.03 | Nghe giống prototype bằng tai nghe; Lo-fi dựng sau cú nhấp đầu (PRD v5.5, thay cách 2) | ✅ #1, #10 (PA B) |
| H9 · #72 | S4 | `feat(items): khay đồ vật, kéo thả, bàn phím, xóa` | UC.04 | AC-04.1 → AC-04.5 xanh | ✅ #1, #31 (PA B) |
| H10 · #73 | S4 | `feat(items): popover đồ vật + Volume mixer` | UC.03 | AC-03.4 xanh; pan cập nhật < 30 ms | ✅ #1 (PA B) |
| H11 · #74 | S4 | `feat(api): GET /catalog/items lọc room, group` ⓓ | UC.07 | Integration test 200/400; `Cache-Control` 1 giờ | ✅ #6, #31 |
| H12 · #75 | S5 | `perf(room): tối ưu Lighthouse Căn phòng (tách mã, title + meta, âm thanh dựng sau cú nhấp đầu)` ⓓ | AC-NF.1 | Báo cáo trước/sau trong `docs/reports/lighthouse/` (đã làm thêm cho Thư viện, font tự host, CLS — xem nhật ký trong báo cáo) | ✅ #19–#21, #26, #27, #32, #34, #36–#43 |
| H13 · #76 | S4 | `feat(items): mèo đổi màu lông (Cam, Xám tro, Kem) + rõ màu dưới ánh trăng Phòng ngủ` | UC.03, UC.04 | Bấm mèo → popover có hàng "Màu lông" 3 nút, đổi ngay và lưu như chọn thảm; mèo nằm trong vệt trăng giữ màu lông (đục bóng tối 55% theo hình mèo); `coat` 0–2 trong schema + migrate giữ `coat`, test xanh; Thịnh duyệt phần `shared/` | ✅ #30 |

## Đình Nhiên — Sân vườn

| # | Sprint | Issue | UC / AC | Xong khi | Trạng thái |
|---|---|---|---|---|---|
| N1 · #77 | S1 ✅ | `docs(wireframe): wireframe Trang chủ, Giới thiệu & Liên hệ` | UC.12 | ✅ draw.io desktop + mobile, nhóm duyệt; PNG xuất vào `docs/wireframes/` | ✅ |
| N2 · #78 | S3 | `test(garden): khung test Sân vườn, khung cảnh, telemetry` | UC.01, UC.02 | `test.fixme` cho AC-01.3, AC-02.3 | ✅ #9 |
| N3 · #79 | S3 | `feat(shared): defaults Sân vườn + catalog 5 khung cảnh` | UC.02 | Test đủ 5 cảnh, mặc định Khu rừng | ✅ #3 |
| N4 · #80 | S3 | `feat(db): bảng scenes + seeder khung cảnh` ⓓ | UC.07 | Seed 2 lần vẫn 5 dòng | ✅ #9 |
| N5 · #81 | S4 | `feat(render): Sân vườn — cây, xích đu, nhà gỗ, 5 khung cảnh, lá/tuyết rơi` | UC.02 | Ảnh chụp từng cảnh khớp prototype, trừ các điểm đã đổi ở N12–N14 | ✅ #1 (PA B) |
| N6 · #82 | S4 | `feat(audio): âm nền 5 khung cảnh, cross-fade khi đổi cảnh` | UC.02 | Đổi cảnh liên tục không chồng lớp âm | ✅ #1 (PA B) |
| N7 · #83 | S4 | `feat(garden): ScenePicker + cửa nhà → Phòng học` | UC.01, UC.02 | AC-01.3, AC-02.3 xanh | ✅ #1 (PA B) |
| N8 · #84 | S4 | `feat(api): GET /catalog/scenes` ⓓ | UC.07 | Integration test; AC-07.3 xanh | ✅ #9, #31 |
| N9 · #85 | S4 | `feat(api): POST /telemetry/batch upsert idempotent` ⓓ | UC.05, UC.06 | Gửi trùng lô không nhân đôi dòng; 202/400/413/429 | ✅ #9, #31 |
| N10 · #86 | S5 | `feat(persistence): telemetry.ts gom sự kiện, gửi lô 60 s / khi ẩn tab` ⓓ | UC.05, UC.06 | Phiên `completed`/`reset`/`abandoned` ghi đúng | ✅ #31 |
| N11 · #87 | S5 | `feat(obs): Google Analytics 4 + Sentry frontend/backend` ⓓ | AC-NF.2 | Realtime GA4 thấy page_view; Sentry nhận lỗi thử; không gửi PII; mã GA4/DSN do Thịnh tạo (G10), lưu `.env` | ✅ #9 — GA4 Realtime thấy `page_view`, `login`; Sentry frontend nhận lỗi thử (issue JAVASCRIPT-REACT-1) |
| N12 · #88 | S4 | `feat(render): Sân vườn — bồn hoa và dây hoa ở chân cửa sổ nhà gỗ` | UC.02 | Ảnh chụp 5 cảnh: chân 2 cửa sổ có bồn hoa + 2 vòng dây hoa; dùng màu hoa/lá sẵn có của prototype | ✅ #24 |
| N13 · #89 | S4 | `feat(render): Núi băng — thêm núi thấp, hạ hàng thông, sửa phản chiếu hồ` | UC.02 | Ảnh chụp Núi băng: 2 núi tách rời, núi cao giữ nguyên, núi thấp theo phác thảo (đỉnh bằng, bậc hụt bên phải), thông thấp hơn, bóng dưới hồ khớp | ✅ #24 |
| N14 · #90 | S4 | `feat(render): lối đá Thành phố, Khu rừng theo đường vòng của Đồi ven biển` | UC.02 | Lối đá thưa (5 viên) cùng đường với Đồi ven biển, màu đá giữ nguyên; Bãi biển không đổi | ✅ #24 |
| N15 · #91 | S4 | `fix(render): Thành phố — đèn cửa chính đè lên khung cửa sổ trái, cửa sổ tròn gác mất viền và chữ thập` | UC.02 | Ảnh chụp cảnh Thành phố: khung cửa sổ trái nguyên vẹn; đèn cửa chính nằm trên tường phía trên cửa; cửa sổ tròn có kính sáng, viền gỗ và chữ thập như các cảnh khác, quầng sáng phủ lên khung (vẽ khung trước, sáng sau — PA1 đã chọn 15/11); 4 cảnh còn lại không đổi | ✅ #24 |

## Tuấn Lộc — Phòng ngủ, tài khoản & thống kê

| # | Sprint | Issue | UC / AC | Xong khi | Trạng thái |
|---|---|---|---|---|---|
| L1 · #92 | S1 ✅ | `docs(wireframe): wireframe Thống kê, Tài khoản` | UC.08, UC.10, UC.11 | ✅ draw.io desktop + mobile, nhóm duyệt | ✅ |
| L2 · #93 | S3 | `test(api): khung integration test auth, me, stats` ⓓ | UC.08, UC.10, UC.11 | Liệt kê đủ mã trạng thái API §3.2 | ✅ #5, #31 |
| L3 · #94 | S3 | `feat(engine): sleepTimer.ts Tắt/15/30/60, giảm dần 2 phút cuối` | UC.06 | Unit test BR-02; chọn xong chờ Bắt đầu, có Tạm dừng (PRD v5.7) | ✅ #5, #31 |
| L4 · #95 | S3 | `feat(shared): migrate.ts dữ liệu prototype → v4` | UC.09 | Test: rỗng, JSON hỏng, bản phẳng `ver: 3`, > 25 đồ | ✅ #3 |
| L5 · #96 | S4 | `feat(render): Phòng ngủ — cửa sổ 3 thời tiết, rèm, đồng hồ tường, đèn ngủ, thảm, kệ` | UC.02 | Ảnh chụp khớp prototype | ✅ #1 (PA B) |
| L6 · #97 | S4 | `feat(bedroom): giao diện Hẹn giờ ngủ + thông báo hết giờ` | UC.06 | AC-06.1, AC-06.2, AC-01.4 xanh | ✅ #29 |
| L7 · #98 | S4 | `feat(api): auth register/login/refresh/logout` ⓓ | UC.08 | AC-08.3, AC-08.4; refresh xoay vòng, thu hồi family | ✅ #5 |
| L8 · #99 | S5 | `feat(api): GET/PATCH/DELETE /me` ⓓ | UC.11 | Xóa cascade, telemetry `user_id = NULL` | ✅ #5 |
| L9 · #100 | S5 | `feat(api): GET /me/stats range, tz` ⓓ | UC.10 | Số liệu đúng với dữ liệu tạo trong test | ✅ #5 |
| L10 · #101 | S5 | `docs(review): góp ý UI/UX cho nhóm B` | Task 5a | `docs/reviews/given/<nhóm>.md` | ✅ #5, #8 |
| L11 · #102 | S5 | `test(e2e): responsive 375/768/1280 cho 6 trang` ⓓ | AC-NF.3, AC-12.4 | Ảnh chụp 3 cỡ mỗi trang | ✅ #5 |
| L12 · #103 | S5 | `docs(lighthouse): tổng hợp báo cáo 6 trang trước/sau` ⓓ | AC-NF.1 | ≥ 90 cả 4 hạng mục | ✅ #5, #42 |
| L13 · #104 | S5 | `feat(pages): Thống kê — khoảng thời gian, 4 ô, biểu đồ SVG, bảng phiên` | UC.10 | AC-10.1 → AC-10.3 xanh (chuyển từ T15) | ✅ #5, #12 |

## Phúc Thịnh — Phòng học, quản lý repo, các trang còn lại

| # | Sprint | Issue | UC / AC | Xong khi | Trạng thái |
|---|---|---|---|---|---|
| T1 · #105 | S3 | `chore(repo): repo GitHub, bảo vệ main, nhãn, milestone S1–S5, Projects` | Task 1d | Mọi thành viên có quyền; issue từ file này đã tạo | ✅ |
| T2 · #106 | S3 | `chore(repo): monorepo workspaces, ESLint, Prettier, Vitest, Playwright, CI` | Task 1e | `npm run lint`, `npm test` xanh trên CI | ✅ #1 |
| T3 · #107 | S3 | `chore(frontend): Vite React TS + Tailwind + React Router 6 route + 404` | UC.12 | `npm run dev` mở được 6 route trống | ✅ #1 |
| T4 · #108 | S1 ✅ | `docs(wireframe): wireframe Căn phòng, Thư viện` | UC.01–UC.07 | ✅ draw.io desktop + mobile, nhóm duyệt | ✅ |
| T5 · #109 | S3 | `feat(shared): chốt giao diện RoomState, drawX(ctx,state,t), audio.register, telemetry.track` | — | 3 người còn lại duyệt PR | ✅ #3 |
| T6 · #110 | S3 | `feat(shared): roomState.ts Zod schema v4 + defaults Phòng học` | UC.09 | Test giới hạn 25 đồ, ≤ 64 KB | ✅ #1 |
| T7 · #111 | S3 | `feat(engine): rooms.ts chuyển phòng, pomodoro.ts` | UC.01, UC.05 | AC-01.2, AC-05.2 (unit) xanh; cả hai nằm ở `areas/study/engine/` | ✅ #31 |
| T8 · #112 | S3 | `feat(db): schema.prisma + migration đầu` ⓓ | Task 3a | `prisma migrate deploy` chạy trên DB trống | ✅ #1, #3 |
| T9 · #113 | S4 | `feat(render): Phòng học — bàn, nhân vật, cửa sổ 4 thời tiết, rèm, lò sưởi, thảm, đèn` | UC.02 | AC-02.1, AC-02.4 xanh; ảnh chụp khớp prototype | ✅ #1 (PA B) |
| T10 · #114 | S4 | `feat(room): Header, Toolbar, store Zustand, chip lưu, LocalStorage 250 ms` | UC.01, UC.05 | AC-01.1, AC-02.2, AC-05.1, AC-05.3, AC-05.4 xanh | ✅ #1, #10 |
| T11 · #115 | S4 | `feat(pages): Trang chủ, Giới thiệu & Liên hệ, NavBar, Footer, 404` | UC.12 | AC-12.1 → AC-12.4 xanh | ✅ #1 |
| T12 · #116 | S5 | `feat(api): GET/PUT /room-state + sync.ts + hộp thoại hợp nhất` ⓓ | UC.09 | AC-09.1 → AC-09.4 xanh | ✅ #1, #31 |
| T13 · #117 | S5 | `feat(pages): Tài khoản — form đăng nhập/đăng ký, đổi tên, đăng xuất, xóa` | UC.08, UC.11 | AC-08.1, AC-08.2, AC-11.1 → AC-11.3 xanh | ✅ #1 |
| T14 · #118 | S5 | `feat(pages): Thư viện — 2 thẻ, bộ lọc, URL, đang tải/lỗi/rỗng` | UC.07 | AC-07.1 → AC-07.4 xanh | ✅ #1, #35 |
| T16 · #119 | S5 | `docs(review): góp ý UI/UX cho nhóm B` | Task 5a | `docs/reviews/given/<nhóm>.md` | ✅ Nhóm 6 (Quản lí chi tiêu), `docs/reviews/given/phuc-thinh.md` |
| T17 · #120 | S5 | `docs(review): received.md + issue cho từng góp ý được làm` | Task 5b | Bảng góp ý → quyết định → PR/lý do | ✅ #53 |
| T18 · #121 | S5 | `docs: README.md (cách chạy, tổng quan, tính năng + ảnh, ERD, khác)` | Nộp bài | Đủ 5 mục theo đề bài | ✅ #52, link video #61, #62 |
| T19 · #122 | S5 | `chore: dựng video demo ≤ 10 phút, 720p, đăng YouTube` | Nộp bài | Link trong README | ✅ #61, #62 (Tuấn Lộc quay) |

## Cả nhóm

| # | Sprint | Issue | Người | Xong khi | Trạng thái |
|---|---|---|---|---|---|
| G1 · #123 | S1 ✅ | `docs(meeting): biên bản họp khởi động 27/10 và họp kế hoạch 13/11` | Thịnh | ✅ `docs/meetings/2026-10-27-khoi-dong.md`, `2026-11-13-hop-ke-hoach.md` | ✅ |
| G2 · #124 | S1 ✅ | `docs(wireframe): duyệt bộ wireframe 6 trang` | Cả nhóm | ✅ duyệt cùng PRD 07/11; `docs/wireframes/FocuSpace_Wireframes.drawio` + PNG | ✅ |
| G3 · #125 | S1→S5 | `docs(report): self-report sprint N` (5 issue, mỗi sprint 1) | Mỗi người | `docs/reports/<Tên>_Self-Report.md` (mỗi người một file, đủ 5 sprint), thiếu bị trừ 10%; **S1, S2 viết bù trước 17/11** | ✅ #54–#60, #63 |
| G4 · #126 | S5 | `docs(review): góp ý UI/UX cho nhóm A` | Hưng, Nhiên | `docs/reviews/given/<nhóm>.md` | ✅ Nhóm 4 (PawPass), review chung với Lộc (`tuan-hung.md`, `dinh-nhien.md`) |
| G5 · #127 | S5 | `fix: sửa theo góp ý nhận được` | Chủ khu vực liên quan | Mỗi góp ý được làm có PR riêng | ✅ 9/10 góp ý đã có trong PR trước đó (#10, #29, #30, #40–#44, #46–#50), 1 không làm kèm lý do (`docs/reviews/received.md`) |
| G6 · #128 | S5 | `chore: quay phần demo khu vực mình cho video` | Mỗi người | Gửi clip cho Thịnh trước 26/11 | ✅ Tuấn Lộc quay toàn bộ clip video |
| G7 · #129 | S5 | `chore: nộp bài` | Thịnh | Repo, README, video nộp trước hết 27/11 | ☐ |
| G8 · #130 | S1 ✅ | `feat(prototype): prototype Căn phòng + 6 trang` | Thịnh; Nhiên dựng phần Sân vườn, 5 khung cảnh của prototype Căn phòng; cả nhóm góp ý | ✅ `prototype/FocuSpace-Semi-Sandbox.html`, `prototype/web/` | ✅ |
| G9 · #131 | S2 ✅ | `docs(plan): PRD, PLAN, Kiến trúc, API, DATABASE, Chương 1 Phân tích hệ thống` | Thịnh (cả nhóm góp nội dung khu vực mình) | ✅ các file trong `docs/` | ✅ |
| G10 · #132 | S3 | `chore(obs): tạo tài khoản GA4, Sentry; gửi mã đo lường và DSN` | Thịnh | Nhiên nhận mã qua kênh riêng, không commit | ✅ `VITE_GA_ID`, `VITE_SENTRY_DSN` đặt trên Vercel, build lại; `SENTRY_DSN` trên Render |
| G11 · #133 | S5 | `chore(deploy): triển khai Vercel (frontend) + Render (backend) + Neon (PostgreSQL)` | Thịnh | Link chạy được ghi trong README; migrate + seed trên Neon | ✅ #3 |
| G12 · #134 | S3 | `feat(shared): giảm MAX_ITEMS_PER_ROOM 40 → 25 (BR-06), chặn thêm đồ khi đủ 25` | Nhiên đề xuất; Thịnh duyệt (`shared/`), Hưng duyệt (`placement`) | Test schema từ chối 26 đồ; AC-04.2 xanh; PRD (BR-06, AC-04.2), API Phụ lục A, DATABASE cập nhật cùng PR | ✅ #24 |