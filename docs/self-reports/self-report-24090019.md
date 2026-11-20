# Self-Report — Nguyễn Tuấn Hưng

## Thông tin cá nhân

| | |
|---|---|
| **Họ tên** | Nguyễn Tuấn Hưng |
| **MSSV** | 24090019 |
| **Nhóm** | Nhóm 2 — FocuSpace |
| **Vai trò trong nhóm** | Fullstack: đồ vật, khay đồ vật, âm thanh; API `/catalog/items`; tối ưu Lighthouse |

Nội dung soạn lại theo mẫu từ self-report 5 sprint ([`docs/reports/Tuan-Hung_Self-Report.md`](../reports/Tuan-Hung_Self-Report.md)). Điểm tự đánh giá là điểm cũ (thang 1–5) của các sprint tương ứng nhân 2.

---

## Task 1 — Planning & Setup

**Tuần:** S1–S2, ngày 27/10 – 12/11/2026

**Công việc đã làm:**

- Thiết kế 17 loại đồ vật và bảng đồ vật trên prototype.
- Thiết kế âm thanh đồ vật (Tivi, mèo, đồng hồ, radio…) và Volume mixer.
- Góp ý wireframe Căn phòng; cùng nhóm duyệt bộ wireframe 6 trang ([G2 #124](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/124)).
- Góp nội dung đồ vật, âm thanh cho PRD (Tính năng E, F) và API danh mục.
- Rà danh mục 17 đồ vật cho seeder (DATABASE §3.7).

**Bằng chứng đóng góp:**

- Prototype [`prototype/FocuSpace-Semi-Sandbox.html`](../../prototype/FocuSpace-Semi-Sandbox.html) (phần đồ vật, âm thanh); [`docs/PRD.md`](../PRD.md) Tính năng E, F; [`docs/DATABASE.md`](../DATABASE.md) §3.7.
- Repo GitHub tạo sau S2 nên giai đoạn này không có commit.

**Khó khăn gặp phải:**

- 17 đồ vật đều cần âm thanh riêng nhưng dự án không dùng file âm thanh. Cách xử lý: tạo âm tổng hợp bằng Web Audio API cho từng đồ vật, nghe thử trong prototype rồi chỉnh.
- Bật nhiều đồ vật cùng lúc dễ ồn. Cách xử lý: Volume mixer có âm lượng tổng và từng nguồn; âm to nhỏ và lệch trái phải theo vị trí đồ vật (BR-07).
- Danh mục đồ vật xuất hiện ở nhiều tài liệu nên dễ lệch tên, kích thước, phòng, nhóm. Cách xử lý: lấy danh sách `TYPES` trong prototype làm nguồn.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S1, S2)

---

## Task 2 — UI Implementation

**Tuần:** S3–S4, ngày 13/11 – 15/11/2026

**Công việc đã làm:**

- Khung E2E `uc03-dieu-chinh-am-thanh`, `uc04-sap-xep-do-vat` ([H2 #65](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/65)); khung unit test placement BR-03→06 ([H1 #64](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/64)).
- Khung `placement.ts` quy tắc đặt đồ BR-03→06 ([H4 #67](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/67)), bản hoàn chỉnh ở PR #31.
- Khung AudioContext và Master, âm tổng hợp đồ vật và Lo-fi, sprites, khay kéo thả, popover và Bảng âm lượng ([H7–H10 #70–#73](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/70)); sau ngày 15/11 thay bằng PA B (dùng thẳng `roomEngine.js`).
- Nến phát sáng, bỏ tiếng rè sau tiếng meo ([PR #28](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/28)).
- Mèo đổi màu lông Cam, Xám tro, Kem theo góp ý ([H13 #76](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/76), [PR #30](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/30)).
- Thêm AC-03.5 âm nền vào PRD ([PR #11](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/11)).

**Bằng chứng đóng góp:**

- PR: [#6](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/6), [#11](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/11), [#28](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/28), [#30](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/30).
- Commit: [`c23bedf`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/c23bedf), [`f8bc805`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/f8bc805), [`57eeb5a`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/57eeb5a), [`00e8693`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/00e8693), [`7c93a86`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/7c93a86), [`f4030be`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/f4030be).

**Khó khăn gặp phải:**

- Phải chờ code nền (PR #1, #3) merge chiều 14/11 nên việc S3 dồn vào tối 14/11. Cách xử lý: làm trong `areas/items-audio/` theo cổng cắm khu vực và gửi một PR (#6) kịp demo 15/11.
- Làm “test trước, code sau” nên nhiều phần mới dừng ở mức khung. Cách xử lý: ghi rõ trạng thái trong TASKS; từ 15/11 theo PA B, `placement.ts` hoàn thiện thành hàm thuần có test ở #31.
- PR #30 ghi đè phần vẽ nến trong `roomEngine.js` nên nến mất ánh sáng. Cách xử lý: khôi phục kèm E2E; bài học là lấy `main` mới nhất trước khi sửa engine và chạy lại E2E sau khi sửa.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3, S4)

---

## Task 3 — Database Integration

**Tuần:** S3, ngày 13/11 – 14/11/2026

**Công việc đã làm:**

- Seeder bảng `item_types` 17 đồ vật, upsert chạy lại không trùng ([H6 #69](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/69)).
- `GET /catalog/items`: service lọc theo phòng, nhóm; kiểm tra tham số bằng Zod; `Cache-Control` 1 giờ; khung integration test ([H11 #74](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/74)).

**Bằng chứng đóng góp:**

- [PR #6](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/6); commit [`88684ff`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/88684ff), [`9b51279`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/9b51279), [`a0ae4bd`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/a0ae4bd), [`40ff6f4`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/40ff6f4).

**Khó khăn gặp phải:**

- Seeder chỉ được nạp dữ liệu có trong prototype (BR-12). Cách xử lý: chỉ đưa đúng 17 loại đã có, đồ vật mới phải hỏi nhóm trước.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3)

---

## Task 4 — Optimization

**Tuần:** S3–S4, ngày 14/11 – 15/11/2026

**Công việc đã làm** (thuộc [H12 #75](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/75)):

- Bảng đo Lighthouse `/room` trước/sau, sau gộp vào `docs/reports/lighthouse/README.md`.
- `/room` Performance 60, TBT 6,2 s: dựng âm thanh sau cú nhấp đầu, font không chặn hiển thị ([PR #19](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/19)).
- Thêm `robots.txt`, bỏ lỗi 401 khi khách tải trang ([PR #20](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/20)); nhúng CSS chính vào `index.html` ([PR #21](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/21)).
- Trả 404 cho file không tồn tại ([PR #26](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/26)); tải trước ảnh LCP Trang chủ ([PR #27](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/27)).
- Thư viện hết nhảy bố cục: khung chờ cùng cỡ thẻ thật, sửa giao diện mobile, Suspense trong Layout, ảnh nhẹ, bỏ JS thừa, font `display=optional` ([PR #32](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/32), [#34](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/34), [#36](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/36)–[#39](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/39)).

**Bằng chứng đóng góp:**

- Commit: [`2fe5264`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/2fe5264), [`a8ebd6a`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/a8ebd6a), [`798acea`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/798acea), [`7a0b305`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/7a0b305), [`4f3cabc`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/4f3cabc), [`e3ddd5e`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/e3ddd5e), [`d82663b`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/d82663b).
- Nhật ký tối ưu: [`docs/reports/lighthouse/README.md`](../reports/lighthouse/README.md). Kết quả trên desktop: `/room` 60 → 100, `/library` 83 → 98.
- Ảnh Lighthouse trước tối ưu: [`/room`](../images/screenshots/lighthouse-truoc-room.png), [`/library`](../images/screenshots/lighthouse-truoc-library.png); sau tối ưu: [`/room`](../images/screenshots/lighthouse-sau-desktop-room.png), [`/library`](../images/screenshots/lighthouse-sau-desktop-library.png).

**Khó khăn gặp phải:**

- Nhánh `toi-uu-lighthouse` xung đột với `main` ở `index.html`. Cách xử lý: merge `main` vào nhánh, gỡ dấu xung đột rồi mới mở PR.
- Thư viện vẫn nhảy bố cục sau lần sửa đầu. Cách xử lý: mỗi lần đo lại Lighthouse rồi sửa nguyên nhân tiếp theo qua 5 PR.
- Một số commit chưa đúng Conventional Commits. Cách xử lý: từ sau ghi đủ loại commit và mã việc như các commit `perf(...)(H12)`.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S4)

---

## Task 5 — Peer Review

**Tuần:** S5, ngày 16/11 – 17/11/2026

**Công việc đã làm:**

- Góp ý UI/UX cho Nhóm 4 (PawPass) cùng Tuấn Lộc, Đình Nhiên: giữ người dùng ở trang cuối cùng khi tải lại ([G4 #126](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/126)).
- Sửa theo góp ý nhận được: góp ý số 1 (mèo đổi màu) đã làm ở PR #30 trong S4 ([G5 #127](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/127)).

**Bằng chứng đóng góp:**

- [`docs/reviews/given/tuan-hung.md`](../reviews/given/tuan-hung.md), [`docs/reviews/received.md`](../reviews/received.md) (dòng 1), [PR #30](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/30).

**Khó khăn gặp phải:**

- Thời gian cuối kỳ gấp, sprint này không có commit. Cách xử lý: đọc lại PRD v5.12–v5.19 và các test mới để nắm hành vi hiện hành của đồ vật, âm thanh.

**Đánh giá bản thân:** 8 (quy đổi từ 4/5 ở S5)

---

## Tổng Kết Đóng Góp Cá Nhân

**Tóm tắt những gì bạn đã đóng góp cho dự án:**

Tôi thiết kế 17 đồ vật, bảng đồ vật, âm thanh từng đồ vật và Volume mixer trên prototype, rồi góp nội dung cho PRD, API và danh mục seeder. Trong giai đoạn lập trình, tôi làm seeder `item_types`, API `GET /catalog/items` kèm Zod và integration test, các khung test và khung âm thanh, khay, popover cho khu vực đồ vật. Phần tôi đóng góp nhiều nhất là tối ưu Lighthouse: đưa `/room` từ 60 lên 95 điểm Performance và Thư viện hết nhảy bố cục qua nhiều PR. Tôi cũng làm mèo đổi màu lông theo góp ý nhận được (31 commit trên `main` từ S3 đến S5).

Kỹ năng học được: tối ưu hiệu năng theo Lighthouse (đọc báo cáo, sửa TBT, CLS, LCP và tài nguyên chặn hiển thị); tạo âm thanh tổng hợp bằng Web Audio API; làm việc nhóm trên GitHub (nhánh, Pull Request, xử lý xung đột khi merge, Conventional Commits).

**Ước tính % đóng góp so với cả nhóm:** ~25%

**Điểm tự đánh giá tổng thể:** 10
