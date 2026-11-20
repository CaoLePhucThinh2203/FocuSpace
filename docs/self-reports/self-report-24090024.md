# Self-Report — Cao Lê Phúc Thịnh

## Thông tin cá nhân

| | |
|---|---|
| **Họ tên** | Cao Lê Phúc Thịnh |
| **MSSV** | 24090024 |
| **Nhóm** | Nhóm 2 — FocuSpace |
| **Vai trò trong nhóm** | Leader · Fullstack: Phòng học, Trang chủ, Thư viện, Tài khoản, Giới thiệu & Liên hệ, 404; đồng bộ trạng thái phòng; quản lý repo, CI, triển khai, duyệt PR |

Nội dung soạn lại theo mẫu từ self-report 5 sprint ([`docs/sprint-reports/Phuc-Thinh_Self-Report.md`](../sprint-reports/Phuc-Thinh_Self-Report.md)). Điểm tự đánh giá là điểm cũ (thang 1–5) của các sprint tương ứng nhân 2.

---

## Task 1 — Planning & Setup

**Tuần:** S1–S3, ngày 27/10 – 14/11/2026

**Công việc đã làm:**

- Chủ trì họp khởi động 27/10, ghi biên bản, chia khu vực cho 4 thành viên ([G1 #123](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/123)).
- Dựng prototype Căn phòng `prototype/FocuSpace-Semi-Sandbox.html` cùng cả nhóm và prototype 6 trang `prototype/web/` ([G8 #130](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/130)).
- Wireframe Căn phòng, Thư viện bằng draw.io ([T4 #108](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/108)).
- Viết PRD v5.0 (duyệt 07/11), PLAN, Kiến trúc, API, DATABASE; Chương 1 Phân tích hệ thống: use case, đặc tả, Activity, Sequence, Class ([G9 #131](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/131)).
- Lập `docs/TASKS.md`, gán khu vực và sprint cho từng thành viên.
- Tạo repo GitHub, đưa tài liệu lên; monorepo npm workspaces, ESLint, Prettier, `.env.example`; GitHub Actions lint, test, build với PostgreSQL 16 ([T1 #105](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/105), [T2 #106](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/106), [PR #1](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/1)).
- Cổng cắm khu vực `areas/*/index.ts` để 4 người làm song song ([T5 #109](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/109), [PR #3](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/3)).
- Triển khai Vercel + Render + Neon, `render.yaml`, Vercel chuyển tiếp `/api` sang Render ([G11 #133](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/133), [PR #3](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/3)).

**Bằng chứng đóng góp:**

- Biên bản họp: [`docs/meetings/`](../meetings/); tài liệu: [`docs/PRD.md`](../PRD.md), [`docs/PLAN.md`](../PLAN.md), [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md), [`docs/API.md`](../API.md), [`docs/DATABASE.md`](../DATABASE.md).
- Commit: [`18852b1`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/18852b1), [`9c481db`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/9c481db), [`305904a`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/305904a), [`adc118e`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/adc118e), [`87813a7`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/87813a7).

**Khó khăn gặp phải:**

- Ý tưởng ban đầu rộng, dễ vượt thời gian đồ án. Cách xử lý: chia hạng mục P0/P1/P2 trong PRD, Phase 1 chỉ làm P0/P1.
- Nhiều tài liệu viết song song dễ lệch tên bảng, tên trường, mã lỗi. Cách xử lý: lấy PRD làm nguồn, đối chiếu chéo khi viết API và DATABASE.
- Code nền đưa lên trong một PR lớn (#1), 3 bạn phải chờ. Cách xử lý: PR #3 tách cổng cắm khu vực để mỗi người làm trong thư mục riêng.
- Frontend (Vercel) và backend (Render) khác tên miền làm cookie đăng nhập không chạy. Cách xử lý: Vercel chuyển tiếp `/api` sang Render.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S1, S2, S3)

---

## Task 2 — UI Implementation

**Tuần:** S3–S5, ngày 13/11 – 17/11/2026

**Công việc đã làm:**

- Vite + React + TypeScript + Tailwind 4, router 6 trang ([T3 #107](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/107)).
- NavBar, Footer, Trang chủ, Giới thiệu & Liên hệ, 404 ([T11 #115](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/115)); Thư viện lọc theo phòng, nhóm ([T14 #118](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/118)); Tài khoản đăng nhập, đăng ký, đổi tên, xóa ([T13 #117](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/117)) — [PR #1](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/1).
- Header dùng chung, menu mobile, font Be Vietnam Pro, âm nền và 6 bài Lo-fi, xoay ngang trên điện thoại, phần Mô tả & Tính năng ở Trang chủ ([T9 #113](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/113), [T10 #114](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/114), [PR #10](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/10)).
- Pomodoro theo vòng, 4 nhịp học; Hẹn giờ ngủ trên header, có Bắt đầu / Tạm dừng ([PR #29](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/29)).
- PA B: tách `rooms.ts`, `pomodoro.ts`, `sleepTimer.ts`, `placement.ts` thành hàm thuần có unit test, engine gọi lại ([T7 #111](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/111), [PR #31](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/31)).
- Khôi phục nến phát sáng kèm E2E ([PR #33](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/33)); văn phong giao diện lần 1 và 2 ([PR #44](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/44), [PR #48](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/48)).
- Âm thanh mèo, máy xông theo số đo thật; đổi bài nhạc mượt; mèo rù rù theo lượt; cảnh Thành phố ([PR #46](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/46), [PR #47](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/47), [PR #49](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/49), [PR #50](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/50)).
- Vẽ lại toàn bộ sơ đồ phân tích ([PR #51](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/51)); README theo 5 tiêu chí đề bài ([T18 #121](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/121), [PR #52](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/52)).
- Duyệt và merge phần lớn PR của nhóm (#1–#52).

**Bằng chứng đóng góp:**

- PR: [#1](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/1), [#10](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/10), [#29](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/29), [#31](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/31), [#44](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/44), [#46](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/46)–[#52](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/52).
- Commit: [`6b96e4d`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/6b96e4d), [`2d66fe4`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/2d66fe4), [`93fe63d`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/93fe63d), [`d2d199b`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/d2d199b), [`5556579`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/5556579).

**Khó khăn gặp phải:**

- Tách toàn bộ Căn phòng thành module React không kịp và dễ lệch prototype. Cách xử lý: chốt PA B ngày 15/11, giữ vẽ và âm thanh trong `roomEngine.js`, chỉ tách quy tắc nghiệp vụ có unit test.
- Nến mất ánh sáng do một PR khác ghi đè engine. Cách xử lý: khôi phục và thêm E2E kiểm tra vùng sáng (#33).
- Hơn 20 PR cần duyệt trong ngày 15/11. Cách xử lý: yêu cầu mỗi PR có `Closes #…`, mã UC và CI xanh trước khi duyệt.
- Tiếng mèo và máy xông phải chỉnh nhiều lần. Cách xử lý: chỉnh theo số đo âm thanh thật, mỗi lần đổi cập nhật PRD và có test.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3, S4, S5)

---

## Task 3 — Database Integration

**Tuần:** S3–S4, ngày 13/11 – 15/11/2026

**Công việc đã làm:**

- Schema `RoomState` v4 bằng Zod ([T6 #110](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/110)); `schema.prisma` 8 bảng, ràng buộc CHECK, migration đầu ([T8 #112](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/112)).
- Khung Express `createApp`, lỗi chuẩn, auth middleware, rate limit ([PR #1](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/1)).
- `GET/PUT /room-state` kiểm tra `revision`, trả 409 khi xung đột; đồng bộ LocalStorage ↔ `/room-state`, hộp thoại hợp nhất ([T12 #116](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/116)).
- Integration test backend trên PostgreSQL 16 tạm (`embedded-postgres`): auth, `/me`, `/me/stats`, `/room-state`, `/catalog/*`, `/telemetry/batch` ([PR #31](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/31)).
- `telemetry.ts` gom phiên, gửi lô 60 giây / khi ẩn tab / khi rời trang ([N10 #86](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/86), [PR #31](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/31)).

**Bằng chứng đóng góp:**

- Commit: [`ebae024`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/ebae024), [`8d22f93`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/8d22f93), [`82ea1f9`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/82ea1f9), [`cb9dd21`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/cb9dd21), [`bb85b71`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/bb85b71), [`814ab5c`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/814ab5c).
- File: `backend/prisma/schema.prisma`, `shared/src/roomState.ts`, `frontend/src/areas/study/roomSync.ts`.

**Khó khăn gặp phải:**

- CI lỗi khi repo chưa có `package-lock.json`, `npm run db:migrate` không nhận tham số. Cách xử lý: cài bằng `npm install` khi thiếu lock file, truyền tham số qua `--`.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3, S4)

---

## Task 4 — Optimization

**Tuần:** S4–S5, ngày 15/11 – 17/11/2026

**Công việc đã làm:**

- Tự host font Be Vietnam Pro, ảnh xem trước nhẹ hơn 98 KiB ([PR #40](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/40)); hết CLS do thanh cuộn ở Thư viện kèm E2E ([PR #41](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/41)); dọn mã ([PR #42](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/42)); chữ chú thích 12 px ([PR #43](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/43)) — thuộc [H12 #75](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/75).
- Báo cáo Lighthouse 6 trang kèm JSON ([`docs/lighthouse/`](../lighthouse/README.md)).
- Tải trước font nét 500, 600; E2E AC-12.6 đo font thật trình duyệt dùng ([PR #48](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/48)).
- Tạo tài khoản GA4, Sentry ([G10 #132](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/132)); đặt mã GA4, DSN Sentry trên Vercel, build lại; kiểm tra GA4 Realtime (`page_view`, `login`) và Sentry frontend nhận lỗi thử.

**Bằng chứng đóng góp:**

- Commit: [`9994510`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/9994510), [`599b7fa`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/599b7fa), [`4001f9f`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/4001f9f), [`ed9e466`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/ed9e466).
- Kết quả Lighthouse sau tối ưu: desktop 96–100 Performance, mọi trang 100 ở Accessibility, Best Practices, SEO ([ảnh trong `docs/images/screenshots/`](../images/screenshots/), file `lighthouse-sau-*.png`).
- Sentry nhận lỗi thử: [`docs/images/screenshots/sentry-issues.png`](../images/screenshots/sentry-issues.png).
- GA4 tổng quan báo cáo: [`docs/images/screenshots/ga4-tong-quan.webp`](../images/screenshots/ga4-tong-quan.webp).

**Khó khăn gặp phải:**

- Thư viện bị CLS 0,35 trên Chrome desktop do thanh cuộn xuất hiện muộn. Cách xử lý: `scrollbar-gutter: stable`, Thư viện cao tối thiểu một màn hình, kèm E2E (#41).
- Chữ nét 500, 600 vẫn hiện bằng font hệ thống dù đã tự host font. Cách xử lý: tải trước đủ 4 độ đậm, E2E đo font thật (#48).

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S4, S5)

---

## Task 5 — Peer Review

**Tuần:** S1 và S5, ngày 07/11 và 16/11 – 17/11/2026

**Công việc đã làm:**

- Góp ý UI/UX cho Nhóm 6 (Quản lí chi tiêu) cùng Tuấn Lộc ngày 07/11: làm đơn giản hơn, thêm nhập nhanh bằng giọng nói, thiết kế lại giao diện ([T16 #119](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/119)).
- Tổng hợp 10 góp ý nhận được từ Hữu Triết, Bá Phát, Thành Long vào `docs/reviews/received.md`: 9 góp ý đã làm, 1 góp ý không làm kèm lý do (khung cảnh tuyết) ([T17 #120](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/120), [PR #53](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/53)).
- Sửa theo góp ý: mèo đổi màu, Trang chủ, tối ưu web, Pomodoro, nút Bắt đầu / Tạm dừng, Hẹn giờ ngủ, cảnh Thành phố, độ lớn âm thanh, nhạc Lo-fi ([G5 #127](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/127); PR #10, #29, #30, #40–#44, #46–#50).

**Bằng chứng đóng góp:**

- [`docs/reviews/given/nhom-6-quan-li-chi-tieu.md`](../reviews/given/nhom-6-quan-li-chi-tieu.md), [`docs/reviews/received.md`](../reviews/received.md), [PR #53](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/53).

**Khó khăn gặp phải:**

- Góp ý “thêm khung cảnh tuyết” cần vẽ cảnh mới, làm âm nền và thêm vào seeder, không kịp hạn nộp. Cách xử lý: ghi Không làm kèm lý do trong `received.md` (đã có tuyết ở cảnh Núi băng và cửa sổ Phòng ngủ).

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S5)

---

## Tổng Kết Đóng Góp Cá Nhân

**Tóm tắt những gì bạn đã đóng góp cho dự án:**

Là trưởng nhóm, tôi chủ trì họp, viết PRD, phần lớn tài liệu kế hoạch và Chương 1 Phân tích hệ thống. Tôi dựng toàn bộ code nền (monorepo, CI, schema, khung Express, cổng cắm khu vực) và triển khai lên Vercel, Render, Neon để cả nhóm làm song song. Tôi làm Phòng học, Pomodoro, đồng bộ trạng thái phòng và 4 trang Trang chủ, Thư viện, Tài khoản, Giới thiệu & Liên hệ, cùng PA B tách quy tắc nghiệp vụ có test và integration test backend. Cuối kỳ tôi hoàn thiện âm thanh, văn phong, sơ đồ phân tích, README, tổng hợp góp ý và duyệt phần lớn PR của nhóm (147 commit trên `main` từ S3 đến S5).

Kỹ năng học được: quản lý dự án trên GitHub (chia việc, duyệt Pull Request, CI GitHub Actions); thiết kế hệ thống và viết tài liệu (PRD, kiến trúc, API, cơ sở dữ liệu, sơ đồ phân tích); phát triển fullstack với React, Express, Prisma và triển khai lên Vercel, Render, Neon.

**Ước tính % đóng góp so với cả nhóm:** ~25%

**Điểm tự đánh giá tổng thể:** 10
