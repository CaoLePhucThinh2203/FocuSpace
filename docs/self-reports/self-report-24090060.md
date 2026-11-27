# Self-Report — Trương Đình Nhiên

## Thông tin cá nhân

| | |
|---|---|
| **Họ tên** | Trương Đình Nhiên |
| **MSSV** | 24090060 |
| **Nhóm** | Nhóm 2 — FocuSpace |
| **Vai trò trong nhóm** | Fullstack: Sân vườn và 5 khung cảnh; API `/catalog/scenes`, `POST /telemetry/batch`; tích hợp Google Analytics 4, Sentry |

Nội dung soạn lại theo mẫu từ self-report 5 sprint ([`docs/sprint-reports/DinhNhien_Self-Report.md`](../sprint-reports/DinhNhien_Self-Report.md)). Điểm tự đánh giá là điểm cũ (thang 1–5) của các sprint tương ứng nhân 2, làm tròn.

---

## Task 1 — Planning & Setup

**Tuần:** S1–S2 và S5, ngày 27/10 – 12/11/2026 và 16/11 – 17/11/2026

**Công việc đã làm:**

- Thiết kế Sân vườn và 5 khung cảnh; cùng nhóm dựng prototype Căn phòng, phụ trách phần Sân vườn và các khung cảnh ([G8 #130](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/130)).
- Wireframe Trang chủ, Giới thiệu & Liên hệ bằng draw.io (desktop + mobile) ([N1 #77](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/77)).
- Góp nội dung Sân vườn cho PRD (Tính năng D) và danh sách khung cảnh cho seeder (DATABASE §3.8); góp ý đồ vật, âm thanh cho PRD (Tính năng E, F).
- S5: tổng hợp self-report S3 cả nhóm từ git log và PR; thêm cột Trạng thái trong `docs/TASKS.md`, cập nhật `docs/PLAN.md`; README hoàn chỉnh theo đề bài kèm ảnh chụp ([G3 #125](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/125), [T18 #121](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/121), [PR #45](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/45)).
- Khung self-report S1–S5 và góp ý UI/UX (G3 #125).

**Bằng chứng đóng góp:**

- [`docs/wireframes/FocuSpace_Wireframes.drawio`](../wireframes/FocuSpace_Wireframes.drawio) (trang WF-Trang chu, WF-Gioi thieu); prototype [`prototype/FocuSpace-Semi-Sandbox.html`](../../prototype/FocuSpace-Semi-Sandbox.html) (phần Sân vườn).
- Commit: [`e48a736`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/e48a736), [`3d8e55c`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/3d8e55c), [`676a2fa`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/676a2fa).

**Khó khăn gặp phải:**

- Cần đảm bảo nội dung Sân vườn trong PRD thống nhất với danh sách khung cảnh dùng trong seeder, vì hai phần viết ở hai nơi, dễ lệch tên và thứ tự cảnh. Cách xử lý: chốt danh sách 5 khung cảnh ngay trong prototype (mỗi cảnh có tên, hình, âm nền), đối chiếu PRD và seeder với prototype, cảnh mặc định là Khu rừng.
- 5 khung cảnh dùng chung một Sân vườn (cây, xích đu, nhà gỗ) trên canvas 320×180, dễ vẽ lệch giữa các cảnh. Cách xử lý: giữ nguyên các vật thể chung, mỗi cảnh chỉ đổi nền, màu và hiệu ứng (lá rơi, tuyết rơi).
- Tổng hợp self-report S3 cho cả nhóm từ git log khó vì nhiều commit không ghi mã issue và một PR gộp nhiều việc. Cách xử lý: đối chiếu từng commit với PR đã merge và `docs/TASKS.md`, ghi mã commit trong ngoặc để kiểm tra lại được (#45).
- README cần ảnh minh họa cho từng tính năng theo đề bài. Cách xử lý: chụp màn hình từng trang và từng không gian của Căn phòng, lưu vào `docs/images/screenshots/` rồi chèn vào README (#45).

**Đánh giá bản thân:** 9 (quy đổi từ trung bình 5/5, 4/5, 5/5 ở S1, S2, S5)

---

## Task 2 — UI Implementation

**Tuần:** S3–S4, ngày 13/11 – 15/11/2026

**Công việc đã làm:**

- Khung test Sân vườn, khung cảnh, telemetry ([N2 #78](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/78)).
- Khung `out`, `sceneAudio`, `ScenePicker` ([N5–N7 #81–#83](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/81)); sau ngày 15/11 theo PA B, phần Sân vườn giữ trong `roomEngine.js`.
- Bồn hoa và dây hoa ở chân cửa sổ nhà gỗ ([N12 #88](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/88)); Núi băng thêm núi thấp, hạ hàng thông, sửa phản chiếu hồ ([N13 #89](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/89)); lối đá Thành phố, Khu rừng theo đường vòng Đồi ven biển ([N14 #90](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/90)); sửa đèn cửa chính và cửa sổ tròn gác ở cảnh Thành phố ([N15 #91](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/91)) — [PR #24](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/24).
- Giảm giới hạn đồ vật mỗi phòng 40 → 25 (BR-06) ([G12 #134](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/134), [PR #24](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/24)).
- Duyệt và merge PR #36, #37, #38, #43, #49, #50.

**Bằng chứng đóng góp:**

- PR: [#9](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/9), [#24](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/24).
- Commit: [`04982cb`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/04982cb), [`e77ef06`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/e77ef06), [`a5cc022`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/a5cc022), [`0bd3127`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/0bd3127).
- Ảnh: [`docs/images/screenshots/can-san-vuon.jpg`](../images/screenshots/can-san-vuon.jpg).

**Khó khăn gặp phải:**

- Cảnh Thành phố: đèn cửa chính đè lên khung cửa sổ trái, cửa sổ tròn gác mất viền và chữ thập. Cách xử lý: đưa đèn lên tường phía trên cửa, vẽ khung trước rồi vẽ quầng sáng sau (PA1 chọn 15/11), kiểm tra 4 cảnh còn lại không đổi (N15).
- Giảm giới hạn 40 → 25 đồ sửa vào `shared/` và quy tắc `placement` của khu vực khác. Cách xử lý: đề xuất trong PR #24, gán Phúc Thịnh duyệt phần `shared/`, Tuấn Hưng duyệt phần `placement`; cập nhật PRD (BR-06, AC-04.2), API, DATABASE cùng PR (G12).

**Đánh giá bản thân:** 9 (quy đổi từ trung bình 5/5, 4/5 ở S3, S4)

---

## Task 3 — Database Integration

**Tuần:** S3, ngày 13/11 – 14/11/2026

**Công việc đã làm:**

- Seeder bảng `scenes` 5 khung cảnh, upsert ([N4 #80](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/80)).
- `scenesService` và route `GET /catalog/scenes` ([N8 #84](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/84)).
- `telemetryService` upsert idempotent và route `POST /telemetry/batch` ([N9 #85](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/85)).

**Bằng chứng đóng góp:**

- [PR #9](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/9); commit [`17ede47`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/17ede47), [`a632ebf`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/a632ebf), [`74c8aae`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/74c8aae), [`78bcf92`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/78bcf92).

**Khó khăn gặp phải:**

- Phải chờ code nền (PR #1, #3) merge chiều 14/11 rồi mới bắt đầu được khu vực của mình. Cách xử lý: làm trong thư mục `areas/garden/` theo cổng cắm khu vực (#3) và gửi một PR (#9) trong tối 14/11 để kịp demo 15/11.
- Seeder chỉ được nạp dữ liệu có trong prototype (BR-12). Cách xử lý: chỉ đưa 5 khung cảnh đã có vào seeder, không thêm cảnh mới.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3)

---

## Task 4 — Optimization

**Tuần:** S3, S5 và S6, ngày 14/11, 16/11 – 17/11 và 25/11 – 27/11/2026

**Công việc đã làm:**

- Cắm Google Analytics 4 và Sentry vào khu vực garden; mã đo lường và DSN lấy từ biến môi trường, không commit ([N11 #87](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/87)).
- Kiểm tra trên bản triển khai sau khi Phúc Thịnh đặt mã GA4, DSN trên Vercel: GA4 Realtime thấy `page_view`, `login`; Sentry frontend nhận lỗi thử.
- S6: cùng Phúc Thịnh sửa Sentry backend không nhận lỗi API ([#161](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/161), [PR #173](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/173)): viết unit test `backend/test/error.test.ts` cho hàm lọc lỗi gửi Sentry (4 trường hợp: lỗi Zod 400, ApiError 401/409, lỗi 413 bị bỏ qua; lỗi không rõ status và ApiError 503 được gửi), test đỏ trước khi sửa, xanh sau khi sửa.

**Bằng chứng đóng góp:**

- Commit [`72b5fab`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/72b5fab); file `frontend/src/areas/garden/observability.ts`.
- Sentry nhận lỗi thử: [`docs/images/screenshots/sentry-issues.png`](../images/screenshots/sentry-issues.png).
- GA4 tổng quan báo cáo: [`docs/images/screenshots/ga4-tong-quan.webp`](../images/screenshots/ga4-tong-quan.webp).
- Commit [`13ed7f2`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/13ed7f2); file `backend/test/error.test.ts`; ảnh Sentry backend nhận lỗi 500: [`docs/images/screenshots/sentry-backend.webp`](../images/screenshots/sentry-backend.webp).

**Khó khăn gặp phải:**

- GA4 và Sentry cần mã đo lường và DSN do Phúc Thịnh tạo (G10), chưa có nên chưa kiểm tra được trên bản triển khai. Cách xử lý: cắm sẵn code, mã lấy từ biến môi trường, không commit; kiểm tra khi có mã (N11).
- GA4 và Sentry chưa gửi dữ liệu vì bản trên Vercel được build khi chưa có mã GA4, DSN (G10). Cách xử lý: Phúc Thịnh đặt `VITE_GA_ID`, `VITE_SENTRY_DSN` trên Vercel rồi build lại; kiểm tra GA4 Realtime và gửi lỗi thử lên Sentry (N11).
- Bản chấm thử 22/11 chỉ ra Sentry backend chưa nhận lỗi API, vì handler của Sentry gắn sau `errorHandler` nên không bao giờ chạy. Cách xử lý: viết test cho quy tắc "chỉ gửi lỗi 5xx" trước, rồi cùng Phúc Thịnh chuyển handler lên trước `errorHandler` (#161).

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3, S5)

---

## Task 5 — Peer Review

**Tuần:** S5 và S6, ngày 16/11 – 17/11 và 25/11 – 27/11/2026

**Công việc đã làm:**

- Góp ý UI/UX cho Nhóm 4 (PawPass) cùng Tuấn Hưng: giữ người dùng ở trang cuối cùng khi tải lại ([G4 #126](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/126)).
- Sửa theo góp ý nhận được: góp ý số 8 (cảnh Thành phố sinh động hơn) đã làm ở PR #46, #50 ([G5 #127](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/127)).
- S6: cùng Tuấn Hưng góp ý chi tiết cho Nhóm 5 (ThaiTuFashion) theo bản chấm thử 22/11; phần tôi viết: đánh giá tính thẩm mỹ và tính thân thiện, kèm ảnh và video minh họa cho các đề xuất ([#160](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/160), [PR #166](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/166)).
- S6: đăng góp ý cho Nhóm 4 (PawPass) thành issue trên repo của nhóm ngày 26/11 ([PawPass-Hosothucung#16](https://github.com/iceruychi-netizen/PawPass-Hosothucung/issues/16)).

**Bằng chứng đóng góp:**

- [`docs/reviews/given/nhom-4-pawpass.md`](../reviews/given/nhom-4-pawpass.md), [`docs/reviews/received.md`](../reviews/received.md) (dòng 8), [PR #46](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/46), [PR #50](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/50).
- [`docs/reviews/given/nhom-5-thaitufashion.md`](../reviews/given/nhom-5-thaitufashion.md); commit [`e0fd19d`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/e0fd19d), [`b068994`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/b068994); issue [PawPass-Hosothucung#16](https://github.com/iceruychi-netizen/PawPass-Hosothucung/issues/16).

**Khó khăn gặp phải:**

- PR #166 lúc đầu xoá bản góp ý cũ cho Nhóm 6. Cách xử lý: khôi phục bản Nhóm 6 làm lịch sử ở PR #167, README §5(a) ghi lý do chuyển sang Nhóm 5 (#169).

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S5)

---

## Tổng Kết Đóng Góp Cá Nhân

**Tóm tắt những gì bạn đã đóng góp cho dự án:**

Tôi thiết kế và dựng phần Sân vườn cùng 5 khung cảnh trong prototype, vẽ wireframe Trang chủ và Giới thiệu & Liên hệ, và góp nội dung Sân vườn cho PRD, DATABASE. Ở backend, tôi làm seeder `scenes`, API `GET /catalog/scenes` và `POST /telemetry/batch` upsert idempotent. Tôi tích hợp Google Analytics 4 và Sentry, tinh chỉnh hình các khung cảnh Sân vườn và giảm giới hạn đồ vật mỗi phòng xuống 25. Cuối kỳ tôi tổng hợp self-report S3 cho cả nhóm và hoàn chỉnh README theo đề bài (17 commit trên `main` từ S3 đến S5).

Kỹ năng học được: viết prompt để làm việc cùng Claude; các bước cơ bản khi làm một website, lập kế hoạch trước khi code; dùng GitHub (nhánh, Pull Request, commit); làm việc trong một repo chung, chỉ sửa thư mục khu vực của mình và đề xuất qua PR khi cần sửa phần của người khác.

**Ước tính % đóng góp so với cả nhóm:** ~25%

**Điểm tự đánh giá tổng thể:** 10
