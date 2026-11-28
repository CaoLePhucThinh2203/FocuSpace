# Self-Report — Đậu Tuấn Lộc

## Thông tin cá nhân

| | |
|---|---|
| **Họ tên** | Đậu Tuấn Lộc |
| **MSSV** | 24090025 |
| **Nhóm** | Nhóm 2 — FocuSpace |
| **Vai trò trong nhóm** | Fullstack: Phòng ngủ, Hẹn giờ ngủ; đăng ký, đăng nhập, API `/me`, `/me/stats`; trang Thống kê; kiểm thử E2E giao diện tương thích; quay video demo |

Nội dung soạn lại theo mẫu từ self-report 5 sprint ([`docs/sprint-reports/Tuan-Loc_Self-Report.md`](../sprint-reports/Tuan-Loc_Self-Report.md)). Điểm tự đánh giá là điểm cũ (thang 1–5) của các sprint tương ứng nhân 2, làm tròn.

---

## Task 1 — Planning & Setup

**Tuần:** S1–S2, ngày 27/10 – 12/11/2026; S7, ngày 28/11/2026

**Công việc đã làm:**

- Thiết kế Phòng ngủ trên prototype: cửa sổ đêm (Đêm sao, Mưa đêm, Tuyết rơi), đồng hồ treo tường có Hẹn giờ ngủ.
- Wireframe Thống kê, Tài khoản bằng draw.io ([L1 #92](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/92)).
- Góp nội dung Phòng ngủ, Hẹn giờ ngủ cho PRD (Tính năng C, G).
- Góp ý phần tài khoản, thống kê trong API (`/auth/*`, `/me`, `/me/stats`).
- S7: cập nhật README §1(c), §1(e), §3(c), §4(b) và PLAN §3 theo bản chấm thử lần 2 ngày 27/11: ghi sprint S7, việc nối 73 PR cũ với issue, lý do không chuyển sang Next.js, ảnh Sentry nhận lỗi từ bản Render ([#183](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/183), [PR #187](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/187)).

**Bằng chứng đóng góp:**

- [`docs/wireframes/wf-thong-ke.png`](../wireframes/wf-thong-ke.png), [`docs/wireframes/wf-tai-khoan.png`](../wireframes/wf-tai-khoan.png); [`docs/PRD.md`](../PRD.md) Tính năng C, G; [`docs/API.md`](../API.md).
- Repo GitHub tạo sau S2 nên giai đoạn này không có commit.
- S7: [`README.md`](../../README.md) §1(c), §1(e), §3(c), §4(b); [`docs/PLAN.md`](../PLAN.md) §3; [PR #187](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/187).

**Khó khăn gặp phải:**

- Phòng ngủ dùng chung engine và đồ vật với Phòng học nên dễ trùng lặp. Cách xử lý: Phòng ngủ chọn không khí riêng (cửa sổ đêm, Hẹn giờ ngủ thay cho Pomodoro).
- Trang Thống kê chưa có dữ liệu thật để thiết kế. Cách xử lý: thiết kế wireframe theo các chỉ số trong PRD, để trống phần số liệu.
- Phần tài khoản và thống kê liên quan nhiều tài liệu do người khác viết. Cách xử lý: góp ý trực tiếp vào phần endpoint để khớp với wireframe đã làm.
- S7: VS Code tự định dạng lại cả README khi lưu (Prettier) và nhánh mang theo các commit gộp cũ từ `main` trên máy, làm PR #187 có diff rất lớn. Cách xử lý: tắt tự định dạng cho Markdown, làm sạch `main` trên máy theo `origin/main`; nhánh PR được dựng lại chỉ còn đúng phần nội dung thêm.

**Đánh giá bản thân:** 8 (quy đổi từ 4/5 ở S1, S2)

---

## Task 2 — UI Implementation

**Tuần:** S3–S5, ngày 13/11 – 17/11/2026

**Công việc đã làm:**

- Trang Thống kê: route `/stats`, mục Thống kê trên thanh điều hướng, chọn khoảng thời gian, biểu đồ, bảng phiên ([L13 #104](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/104), [PR #5](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/5), [PR #12](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/12)).
- Khung unit test `sleepTimer` BR-02 và khung `sleepTimer.ts` ([L3 #94](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/94)); bản hoàn chỉnh ở PR #31.
- Khung E2E uc06, uc08, uc10, uc11; E2E responsive: không cuộn ngang, trang 404 ([L11 #102](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/102)).
- Đặc tả UC.06 Hẹn giờ ngủ ([PR #12](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/12)); cập nhật icon ([PR #17](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/17), [PR #25](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/25)).
- README khu vực bedroom phía frontend và backend.
- S5: kiểm thử thủ công Phòng ngủ, trang Thống kê, Tài khoản sau khi các PR #46–#49 được merge.
- Review và approve Pull Request: 13 PR trong S4, 8 PR trong S5 (#46–#53).
- Quay toàn bộ clip video trình bày bản Desktop ([T19 #122](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/122), [PR #61](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/61), [PR #62](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/62)).

**Bằng chứng đóng góp:**

- Commit: [`a8362a9`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/a8362a9), [`3ee6569`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/3ee6569), [`e4aebb3`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/e4aebb3), [`b01ab2d`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/b01ab2d), [`2a895cb`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/2a895cb), [`50172b1`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/50172b1).
- File: `frontend/src/areas/bedroom/pages/Stats.tsx`; ảnh [`docs/images/screenshots/thong-ke-co-du-lieu.jpg`](../images/screenshots/thong-ke-co-du-lieu.jpg); video https://www.youtube.com/watch?v=9J9uekvG_xA.

**Khó khăn gặp phải:**

- Khung `sleepTimer.ts` phải chờ tách logic từ `roomEngine.js`. Cách xử lý: theo PA B, hàm thuần có unit test được hoàn thiện ở #31, engine gọi lại.
- Trang Thống kê trống khi chưa học phiên nào. Cách xử lý: hiển thị trạng thái chưa có dữ liệu thay vì biểu đồ rỗng.
- S5 có nhiều thay đổi ở Phòng ngủ và các trang, dễ làm hỏng phần đã chạy đúng. Cách xử lý: kiểm thử lại toàn bộ khu vực mình phụ trách sau khi các PR được merge.

**Đánh giá bản thân:** 9 (quy đổi từ trung bình 5/5, 4/5, 4/5 ở S3, S4, S5)

---

## Task 3 — Database Integration

**Tuần:** S3, ngày 13/11 – 14/11/2026

**Công việc đã làm:**

- Khung integration test auth ([L2 #93](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/93)).
- `authService`: đăng ký, đăng nhập, refresh xoay vòng ([L7 #98](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/98)).
- Router bedroom: `/auth/*`, `GET/PATCH/DELETE /me` ([L8 #99](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/99)); `statsService` tổng hợp `/me/stats` theo khoảng thời gian và múi giờ ([L9 #100](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/100)).

**Bằng chứng đóng góp:**

- [PR #5](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/5); commit [`f8ec609`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/f8ec609), [`1ffb174`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/1ffb174), [`8b550f5`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/8b550f5), [`ed0359b`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/ed0359b).

**Khó khăn gặp phải:**

- Thống kê phải tính theo ngày của người dùng, không theo giờ máy chủ. Cách xử lý: `statsService` nhận khoảng thời gian và múi giờ, tổng hợp theo ngày địa phương.
- Nhiều việc dồn trong 2 ngày. Cách xử lý: làm khung test trước (integration, E2E), rồi viết code tới khi test chạy được, gom vào một PR (#5).

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3)

---

## Task 4 — Optimization

**Tuần:** S3, ngày 13/11 – 14/11/2026

**Công việc đã làm:**

- Lập bảng báo cáo Lighthouse 6 trang ([L12 #103](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/103)), nay gộp vào `docs/lighthouse/README.md`.

**Bằng chứng đóng góp:**

- Commit [`fdece3a`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/fdece3a); [`docs/lighthouse/README.md`](../lighthouse/README.md).

**Khó khăn gặp phải:**

Không có.

**Đánh giá bản thân:** 10 (quy đổi từ 5/5 ở S3)

---

## Task 5 — Peer Review

**Tuần:** S1, S3, S5, S6 và S7, ngày 07/11 (review trực tiếp), 14/11 (viết bản góp ý), 16/11 – 17/11, 25/11 – 27/11 và 28/11/2026

**Công việc đã làm:**

- Góp ý UI/UX cho Nhóm 6 (Quản lí chi tiêu) cùng Phúc Thịnh ngày 07/11, góp ý trực tiếp: điểm mạnh menu gọn, màu sắc bắt mắt, trình bày rõ ràng; đề xuất làm đơn giản hơn, thêm nhập nhanh bằng giọng nói, thiết kế lại giao diện ([L10 #101](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/101), [PR #5](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/5), [PR #8](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/8)).
- Sửa theo góp ý nhận được: góp ý “sửa lại chế độ Hẹn giờ ngủ” đã làm ở PR #29 (chọn mức xong chờ Bắt đầu, có Tạm dừng, giảm âm dần 2 phút cuối) ([G5 #127](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/127)).
- S6: tổng hợp góp ý nhận được Đợt 2 (sau bản chấm thử 22/11) của Nhóm 3 Let's Talk và Nhóm 4 PawPass vào `received.md`, mục 11–21, mỗi góp ý có quyết định và lý do ([#168](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/168), [PR #171](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/171)).
- S6: review và duyệt các PR của sprint: [PR #166](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/166) (góp ý Nhóm 5), [PR #170](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/170) (lý do dừng góp ý Nhóm 6), [PR #173](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/173) (Sentry backend), [PR #175](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/175) (README, PLAN).
- S7: review và duyệt [PR #184](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/184) (route thử Sentry trên bản Render, #182) và [PR #185](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/185) (nhãn chữ cho nút thanh công cụ trên thiết bị cảm ứng, #181).
- S7: cập nhật README §5(b): góp ý #11, #17 (nhãn cho 3 nút biểu tượng, Nhóm 3 và Nhóm 4 cùng nêu) chuyển thành "Đã implement", thêm ảnh điện thoại, tablet sau khi sửa ([#183](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/183), [PR #187](https://github.com/CaoLePhucThinh2203/FocuSpace/pull/187)).

**Bằng chứng đóng góp:**

- [`docs/reviews/given/nhom-6-quan-li-chi-tieu.md`](../reviews/given/nhom-6-quan-li-chi-tieu.md), [`docs/reviews/received.md`](../reviews/received.md) (dòng 6); commit [`1c68c6c`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/1c68c6c), [`3278510`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/3278510).
- [`docs/reviews/received.md`](../reviews/received.md) (Đợt 2, mục 11–21); commit [`71a8fe1`](https://github.com/CaoLePhucThinh2203/FocuSpace/commit/71a8fe1); lượt duyệt ở PR #166, #170, #173, #175.
- S7: lượt duyệt ở PR #184, #185; README §5(b) Đợt 2 và ảnh [`gop-y-nhan-nut-dien-thoai.webp`](../images/screenshots/gop-y-nhan-nut-dien-thoai.webp), [`gop-y-nhan-nut-tablet.webp`](../images/screenshots/gop-y-nhan-nut-tablet.webp).

**Khó khăn gặp phải:**

- Góp ý nhận được đến cuối sprint (17/11), không còn thời gian mở PR mới. Cách xử lý: đối chiếu từng góp ý với web; góp ý Hẹn giờ ngủ đã có ở #29 nên ghi vào `received.md` kèm số PR.
- Hai nhóm gửi góp ý Đợt 2 có ý trùng nhau (nhãn cho nút biểu tượng, chữ nhỏ trên nền tối). Cách xử lý: ghi riêng từng mục, đánh dấu mục trùng và thêm ghi chú cuối bảng để ưu tiên hai ý này ở bản sau.
- S7: PR #185 đổi giao diện Căn phòng khác prototype. Cách xử lý: khi duyệt, đối chiếu PRD v5.21 (AC-01.6), xem ảnh điện thoại, tablet và kết quả E2E trong PR trước khi approve.

**Đánh giá bản thân:** 9 (quy đổi từ trung bình 5/5, 4/5 ở S3, S5)

---

## Tổng Kết Đóng Góp Cá Nhân

**Tóm tắt những gì bạn đã đóng góp cho dự án:**

Tôi thiết kế Phòng ngủ, vẽ wireframe Thống kê và Tài khoản, góp nội dung cho PRD và API phần tài khoản, thống kê. Ở backend, tôi làm toàn bộ phần tài khoản (đăng ký, đăng nhập, refresh xoay vòng, `/me`) và thống kê `/me/stats` tính theo múi giờ người dùng. Ở frontend, tôi làm trang Thống kê, các khung E2E và E2E responsive, đặc tả UC.06 Hẹn giờ ngủ. Cuối kỳ tôi kiểm thử thủ công khu vực của mình, review Pull Request và quay video demo (30 commit trên `main` từ S3 đến S5).

Kỹ năng học được: xác thực người dùng (đăng ký, đăng nhập, JWT, refresh token xoay vòng, băm mật khẩu Argon2id); kiểm thử phần mềm (integration test, E2E bằng Playwright, kiểm thử thủ công).

**Ước tính % đóng góp so với cả nhóm:** ~25%

**Điểm tự đánh giá tổng thể:** 10
