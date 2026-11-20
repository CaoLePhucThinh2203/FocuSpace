# Self-report — Phúc Thịnh

> Bản theo 5 sprint (đề bài yêu cầu *Self-Report for all 5 sprints*). Cùng nội dung trình bày theo Task 1–5 theo mẫu của môn: [`docs/self-reports/self-report-24090024.md`](../self-reports/self-report-24090024.md).

**Khu vực phụ trách:** Phòng học, repo, các trang còn lại (Trang chủ, Giới thiệu & Liên hệ, Thư viện, Tài khoản, 404); trưởng nhóm, duyệt và merge PR.

| Sprint | Thời gian | Giai đoạn | Số commit trên `main` |
|---|---|---|---|
| [S1](#sprint-1) | 27/10 – 07/11/2026 | Thiết kế | — (chưa có repo) |
| [S2](#sprint-2) | 08/11 – 12/11/2026 | Kế hoạch | — (chưa có repo) |
| [S3](#sprint-3) | 13/11 – 14/11/2026 | Lập trình | 32 |
| [S4](#sprint-4) | 15/11/2026 | Lập trình | 66 |
| [S5](#sprint-5) | 16/11 – 17/11/2026 | Lập trình, nộp bài | 39 |

- S1, S2 viết bù ngày 13/11/2026. Repo GitHub tạo sau S2 nên cột Issue, PR ghi “—”.
- S3 – S5 soạn ngày 17/11/2026 từ git log và các PR đã merge vào `main`. Cột Issue ghi mã việc trong `docs/TASKS.md`, cột PR ghi số Pull Request trên GitHub, mã commit đặt trong ngoặc.

---

<a id="sprint-1"></a>
## Sprint 1 (27/10 – 07/11/2026 · Thiết kế)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Họp khởi động 27/10, ghi biên bản, phân chia khu vực cho 4 thành viên (G1) | Xong |
| — | — | Dựng prototype Căn phòng `prototype/FocuSpace-Semi-Sandbox.html` cùng cả nhóm (G8; Đình Nhiên làm phần Sân vườn, các khung cảnh) | Xong |
| — | — | Thiết kế Phòng học và các trang còn lại; wireframe Căn phòng, Thư viện bằng draw.io (T4) | Xong |
| — | — | Viết PRD v5.0: yêu cầu chức năng, quy tắc nghiệp vụ, tiêu chí chấp nhận (duyệt 07/11) | Xong |

### Khó khăn và cách xử lý
- Ý tưởng ban đầu rộng (nhiều phòng, nhiều đồ vật, âm thanh, đồng bộ tài khoản), dễ vượt quá thời gian đồ án. Cách xử lý: chia hạng mục theo mức ưu tiên P0/P1/P2 trong PRD, Phase 1 chỉ làm P0/P1.
- Chưa thống nhất giao diện Căn phòng giữa các thành viên. Cách xử lý: dựng prototype HTML chạy được để cả nhóm xem cùng một bản, lấy prototype làm chuẩn cho hình, màu và hành vi.

### Công việc của sprint tới
Viết tài liệu kế hoạch, kiến trúc, API, cơ sở dữ liệu và phân tích hệ thống (S2).

### Tự đánh giá mức đóng góp (1–5)
**5** — Chủ trì họp khởi động, viết PRD và thiết kế phần lớn giao diện.

---

<a id="sprint-2"></a>
## Sprint 2 (08/11 – 12/11/2026 · Kế hoạch)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Viết PLAN, Kiến trúc, API, DATABASE (G9) | Xong |
| — | — | Chương 1 Phân tích hệ thống: use case, đặc tả, Activity, Sequence, Class | Xong |
| — | — | Prototype 6 trang `prototype/web/` | Xong |
| — | — | Lập danh sách việc `docs/TASKS.md`, gán khu vực và sprint cho từng thành viên | Xong |
| — | — | Tạo repo GitHub, đưa tài liệu lên | Xong |

### Khó khăn và cách xử lý
- Nhiều tài liệu viết song song (PRD, API, DATABASE, biểu đồ) dễ lệch nhau về tên bảng, tên trường, mã lỗi. Cách xử lý: lấy PRD làm nguồn, đối chiếu chéo khi viết API và DATABASE; quy ước JSON `camelCase`, DB `snake_case`.
- Cần chia việc sao cho 4 người làm song song mà không sửa chồng lên nhau. Cách xử lý: chia theo khu vực (Phòng học, Phòng ngủ, Sân vườn, Đồ vật & âm thanh), phần dùng chung do trưởng nhóm duyệt.

### Công việc của sprint tới
Theo `docs/TASKS.md`, cột Sprint = S3: dựng repo, code nền, triển khai.

### Tự đánh giá mức đóng góp (1–5)
**5** — Viết phần lớn tài liệu kế hoạch, phân tích và tạo repo.

---

<a id="sprint-3"></a>
## Sprint 3 (13/11 – 14/11/2026 · Lập trình)

Số commit trên `main`: 32.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| T1, G1, G9 | — | Tạo repo, đưa tài liệu, prototype, phân tích hệ thống, kế hoạch, wireframe lên GitHub; gọn cấu trúc thư mục; duyệt tài liệu 13/11; self-report S1–S2 (`18852b1`, `9cf93d6`, `a8c80cd`, `b64ffc2`) | Xong |
| T2, T3 | #1 | Monorepo workspaces, ESLint, Prettier, `.env.example`; GitHub Actions lint, test, build với PostgreSQL 16; Vite + React + TypeScript + Tailwind 4, router 6 trang (`9c481db`, `305904a`, `0d5b73a`) | Xong |
| T6, T8 | #1, #3 | Schema `RoomState` v4 bằng Zod; `schema.prisma` 8 bảng, ràng buộc CHECK; migration đầu (`ebae024`, `8d22f93`, `11ece70`) | Xong |
| — | #1 | Khung Express `createApp`, lỗi chuẩn, auth middleware, rate limit (`82ea1f9`) | Xong |
| T12 | #1 | `GET/PUT /room-state` kiểm tra revision, 409 khi xung đột; Căn phòng chạy engine prototype, đồng bộ LocalStorage ↔ `/room-state`, hộp thoại hợp nhất (`cb9dd21`, `ddb8a96`) | Xong |
| T11, T13, T14 | #1 | NavBar, Footer, Trang chủ, Giới thiệu & Liên hệ, 404; Thư viện lọc theo phòng, nhóm; Tài khoản đăng nhập, đăng ký, đổi tên, xóa (`6b96e4d`, `2d66fe4`) | Xong |
| T7, T9 | #1 | Khung module Phòng học, `rooms`, `pomodoro` kèm test todo; RoomHeader, RoomNav; khung E2E UC.01, 02, 05, 07, 09, 12 (`3a12001`, `de3970d`) | Xong |
| T5 | #3 | Cổng cắm khu vực `areas/*/index.ts` (frontend), tự nạp `routes.ts`, `seed.ts` (backend); đưa `catalog`, `scenes`, `spatial`, `migrate` vào `shared/` để web chạy độc lập (`adc118e`, `8075603`, `a92feb4`) | Xong |
| G11 | #3 | `render.yaml`, Vercel chuyển tiếp `/api` sang Render, hướng dẫn triển khai; sửa `db:migrate`, log request gọn (`87813a7`, `2bda1f3`, `6f8670a`, `f4fdcda`) | Xong |
| — | #22 | Tinh gọn PLAN, Kiến trúc, PRD, API, DATABASE (`5cefd20`, `7da1214`, `a907f43`, `4f35c1a`, `efbe04b`) | Xong |
| — | #1, #3, #5, #6, #8 | Duyệt và merge PR | Xong |

### Khó khăn và cách xử lý
- Code nền đưa lên trong một PR lớn (#1), 3 bạn phải chờ mới bắt đầu được khu vực của mình. Cách xử lý: PR #3 tách cổng cắm khu vực để mỗi người làm trong thư mục riêng, web vẫn chạy khi khu vực khác chưa xong.
- CI lỗi khi repo chưa có `package-lock.json`, `npm run db:migrate` không nhận tham số. Cách xử lý: cài bằng `npm install` khi thiếu lock file, truyền tham số qua `--` (`a8d771c`, `6f8670a`).
- Triển khai tách frontend (Vercel) và backend (Render) làm cookie đăng nhập và lời gọi `/api` khác tên miền. Cách xử lý: Vercel chuyển tiếp `/api` sang Render để trình duyệt chỉ thấy một tên miền (#3).

### Công việc của sprint tới
S4 (15/11): tách quy tắc nghiệp vụ Căn phòng thành hàm thuần có test (PA B), integration test backend, tối ưu Lighthouse, chuẩn bị demo 15/11.

### Tự đánh giá mức đóng góp (1–5)
**5** — Dựng toàn bộ code nền, CI, triển khai và cổng cắm khu vực để cả nhóm làm song song.

---

<a id="sprint-4"></a>
## Sprint 4 (15/11/2026 · Lập trình)

Số commit trên `main`: 66.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| T9, T10 | #10 | Header dùng chung, menu mobile; font Be Vietnam Pro; âm nền, 6 bài Lo-fi, xoay ngang trên điện thoại; Trang chủ phần Mô tả & Tính năng; E2E AC-03.5, AC-05.5, AC-06.3, AC-12.4–12.6 (`93fe63d`, `b79c992`, `819671b`, `73f7ea6`, `aa74277`) | Xong |
| — | #15, #22, #23 | Sửa lint E2E; gọn TASKS, API; bỏ than đỏ nhấp nháy khi tắt lửa lò sưởi (`9c9a27c`, `89e8fd2`, `9e1f49d`) | Xong |
| L6 | #29 | Pomodoro theo vòng và 4 nhịp học, bảng Nhịp học; Hẹn giờ ngủ trên header, chọn xong chờ Bắt đầu, có Tạm dừng; PRD v5.7 (`d2d199b`, `83ea986`, `3e1217a`, `50abb72`, `89bfbd1`) | Xong |
| T7 | #31 | PA B: `rooms.ts`, `pomodoro.ts` thành hàm thuần có unit test, engine gọi lại; E2E AC-01.1–01.4 (`5556579`, `238da57`, `bf63a2c`) | Xong |
| L3 | #31 | `sleepTimer.ts` Tắt/15/30/60, giảm dần 2 phút cuối; E2E AC-06.1, AC-06.2 (`10a2708`, `c39323c`, `ceb74b4`) | Xong |
| H4 | #31 | `placement.ts` quy tắc đặt đồ BR-03→06, đủ 25 đồ thì chỉ hiện thông báo; E2E UC.04 (`0daed0f`, `c81e8e7`, `45f3f11`) | Xong |
| N10 | #31 | `telemetry.ts` gom phiên, gửi lô 60 giây / khi ẩn tab / khi rời trang; engine ghi telemetry; E2E kiểm tra lô `completed`/`reset` (`814ab5c`, `5e9ab5a`, `8e37495`) | Xong |
| L2, H11, N8, N9, T12 | #31 | Integration test backend trên PostgreSQL 16 tạm (`embedded-postgres`): auth, `/me`, `/me/stats`, `/room-state`, `/catalog/*`, `/telemetry/batch` (`bb85b71`, `568ded9`, `6a2ed70`, `4ad508e`, `8a36410`) | Xong |
| — | #31 | Tài liệu theo PA B: PRD, API, DATABASE (25 đồ, cookie SameSite), PLAN, TASKS, CLAUDE.md; drawio và Chương 1 xuất lại 11 hình (`118c3ef`, `0745cbc`, `1d8114b`, `b940ffb`, `088ecca`, `cffb815`) | Xong |
| — | #33, #35 | Khôi phục nến phát sáng kèm E2E chặn lặp lại; Thư viện ô ảnh đồ vật cùng màu thẻ (`f6b8d55`, `c6e3dfc`, `b3f1ba5`) | Xong |
| H12 | #40–#43 | Tự host font, ảnh xem trước nhẹ hơn 98 KiB; hết CLS do thanh cuộn ở Thư viện; dọn mã; chữ chú thích 12 px; báo cáo Lighthouse 6 trang kèm JSON (`599b7fa`, `9994510`, `4001f9f`, `dba0048`, `47f31cd`, `5b77458`) | Xong |
| — | #44 | Văn phong giao diện đơn giản, thực tế: tên phòng, mô tả đồ vật, khung cảnh, Trang chủ, Giới thiệu; PRD v5.11 (`649375e`, `e7e5c27`, `17f0ddc`, `3973c10`) | Xong |
| — | #10–#12, #15, #17, #19–#33, #35, #40–#42, #44 | Duyệt và merge PR | Xong |

### Khó khăn và cách xử lý
- Tách toàn bộ Căn phòng thành module React riêng không kịp và dễ lệch với prototype. Cách xử lý: chốt PA B ngày 15/11, giữ vẽ và âm thanh trong `roomEngine.js`, chỉ tách quy tắc nghiệp vụ thành hàm thuần có unit test (`533a618`, `1d8114b`).
- Nến mất ánh sáng do một PR khác ghi đè phần engine (`f4030be`). Cách xử lý: khôi phục và thêm E2E kiểm tra vùng sáng quanh nến để chặn lặp lại (#33).
- Thư viện bị CLS 0,35 trên Chrome desktop do thanh cuộn xuất hiện muộn. Cách xử lý: giữ chỗ thanh cuộn (`scrollbar-gutter`), Thư viện cao tối thiểu một màn hình, kèm E2E (#41).
- Khối lượng PR cần duyệt lớn trong một ngày (hơn 20 PR). Cách xử lý: yêu cầu mỗi PR có `Closes #…`, mã UC và CI xanh trước khi duyệt; PR đụng phần chung thì xem kỹ phần `roomEngine.js` và `shared/`.

### Công việc của sprint tới
S5 (16–17/11): hoàn thiện âm thanh đồ vật, đổi bài nhạc; văn phong lần 2; vẽ lại sơ đồ phân tích; README; nộp bài.

### Tự đánh giá mức đóng góp (1–5)
**5** — Làm PA B, integration test backend, tối ưu Lighthouse, đồng thời duyệt phần lớn PR của nhóm.

---

<a id="sprint-5"></a>
## Sprint 5 (16/11 – 17/11/2026 · Lập trình, nộp bài)

Số commit trên `main`: 39.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | #46, #47 | Tiếng mèo, máy xông chỉnh theo số đo thật; máy xông bỏ tiếng xì; cảnh Thành phố chỉ còn tiếng còi 30–50 giây; PRD v5.12–v5.13 (`e493c24`, `ea6d02d`, `0a79e3f`, `2a2f93a`) | Xong |
| — | #47 | Đổi bài nhạc mượt: báo "Đang chuẩn bị…", chuyển 1,5 giây giữ độ to đều, giữ bài vừa nghe; E2E AC-03.6; PRD v5.14 (`92f4e9e`, `25133e8`, `f31cdd6`) | Xong |
| H12 | #48 | Tải trước Be Vietnam Pro nét 500, 600 để menu, nút, giờ Pomodoro không rơi về font hệ thống; E2E AC-12.6 đo font thật; PRD v5.15 (`ed9e466`, `30ed71b`, `a74710c`) | Xong |
| — | #48 | Văn phong lần 2: Trang chủ, Giới thiệu & Liên hệ, Thư viện, Tài khoản, Thống kê (thêm nút Thử lại khi lỗi), chữ trong Căn phòng và popover; PRD v5.16–v5.17 (`05228dc`, `cb01a93`, `4504ad1`, `b04e92d`, `2578854`, `9d4a894`, `8be5396`) | Xong |
| — | #49 | Mèo rù rù theo lượt (10–15 giây, im 3–5 phút, bấm mèo thì rù rù luôn), làm lại tiếng rù rù; unit test và E2E; PRD v5.18–v5.19 (`462dcec`, `e9d3bdf`, `b4e3c2b`, `0662a68`, `8d922ae`, `ba59e51`) | Xong |
| — | #50 | Cảnh Thành phố ở Sân vườn: xe cả 2 làn nhích lên 1 px (`c69be2c`) | Xong |
| G9 | #51 | Vẽ lại toàn bộ sơ đồ theo mẫu báo cáo (use case, 12 Activity, 12 Sequence, biểu đồ lớp tách 3 tầng, ERD, Lược đồ quan hệ, 2 WND); dựng lại Chương 1 Phân tích hệ thống, đặt biểu đồ lớp, ERD, Lược đồ quan hệ trên trang ngang (`aa6984c`, `43d5921`, `0e3aa8f`) | Xong |
| T18 | #52 | README trình bày lại theo 5 tiêu chí đề bài (cách chạy, tổng quan và công cụ, tính năng kèm ảnh, ERD, thông tin bổ sung), văn phong báo cáo, thêm ảnh Thống kê có số liệu minh họa (`23ce686`, `ec20fda`, `171993b`) | Xong |
| G3 | #54 | Self-report 5 sprint của Phúc Thịnh (`docs/sprint-reports/Phuc-Thinh_Self-Report.md`); soạn từ git log khung self-report cho các thành viên | Xong |
| T16 | — | Góp ý UI/UX cho Nhóm 6 (Quản lí chi tiêu) ngày 07/11: làm đơn giản hơn, thêm nhập nhanh bằng giọng nói, thiết kế lại giao diện (`docs/reviews/given/phuc-thinh.md`) | Xong |
| T17 | #53 | Tổng hợp 10 góp ý nhận được từ Triết, Phát, Long vào `docs/reviews/received.md`: 9 góp ý đã làm (mèo đổi màu, Trang chủ, tối ưu web, Pomodoro, nút Bắt đầu/Tạm dừng, Hẹn giờ ngủ, cảnh Thành phố, độ lớn âm thanh, nhạc Lo-fi; PR #10, #29, #30, #40–#44, #46–#50), 1 góp ý không làm kèm lý do (khung cảnh tuyết) | Xong |
| G5 | #10, #29, #30, #40–#44, #46–#50 | Sửa theo góp ý: các góp ý được làm đã có trong các PR trên, không cần PR mới | Xong |
| G10 | — | Đặt mã GA4, DSN Sentry trên Vercel, build lại; kiểm tra GA4 Realtime (`page_view`, `login`) và Sentry frontend nhận lỗi thử | Xong |
| T19 | #61, #62 | Video demo đăng YouTube (Tuấn Lộc quay), link trong README | Xong |
| — | #45–#52 | Duyệt và merge PR | Xong |

### Khó khăn và cách xử lý
- Tiếng mèo và máy xông phải chỉnh nhiều lần (giảm còn 1/10, tăng lại, rồi làm lại theo lượt) vì nghe bằng tai nghe chưa giống thật. Cách xử lý: chỉnh theo số đo âm thanh thật, mỗi lần đổi đều cập nhật PRD và có test (#46, #47, #49).
- Chữ nét 500, 600 vẫn hiện bằng font hệ thống dù đã tự host font. Cách xử lý: tải trước đủ 4 độ đậm, E2E đo font trình duyệt thực sự dùng (#48).
- Biểu đồ lớp gộp quá rộng, in trong Chương 1 không đọc được. Cách xử lý: tách thành 3 hình theo tầng, đặt trên trang ngang (#51).
- Trang Thống kê khi chưa có dữ liệu chỉ hiện ô trống, khó minh họa trong README. Cách xử lý: chụp ảnh với số liệu minh họa, ghi rõ trong chú thích hình là dữ liệu minh họa (#52).
- Góp ý "thêm khung cảnh tuyết" cần vẽ cảnh mới, làm âm nền và thêm vào seeder, không kịp trước hạn nộp. Cách xử lý: ghi Không làm kèm lý do trong `received.md` (cảnh Núi băng và cửa sổ Phòng ngủ đã có tuyết rơi), để dành cho phiên bản sau.
- Thời gian cuối kỳ gấp, hai thành viên không có commit trong sprint này. Cách xử lý: trưởng nhóm nhận thêm phần âm thanh đồ vật và tài liệu chung để kịp hạn nộp.

### Tự đánh giá mức đóng góp (1–5)
**5** — Hoàn thiện âm thanh, văn phong, sơ đồ phân tích, README, tổng hợp góp ý nhận được và self-report của nhóm để nộp bài.
