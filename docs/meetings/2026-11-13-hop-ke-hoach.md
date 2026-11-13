# Biên bản họp kế hoạch giai đoạn lập trình (S3–S5) — 13/11/2026

| | |
|---|---|
| **Thời gian / hình thức** | 13/11/2026 · [Cần bổ sung: giờ, online/trực tiếp] |
| **Tham dự** | Tuấn Hưng, Đình Nhiên, Tuấn Lộc, Phúc Thịnh |
| **Người ghi** | Phúc Thịnh |
| **Tiêu chí đề bài** | Task 1a — chốt phân vai và trách nhiệm cho giai đoạn lập trình (họp khởi động: `2026-10-27-khoi-dong.md`) |

## 1. Bối cảnh

- Đồ án cuối kỳ CSB25022, sản phẩm FocuSpace (PRD v5.3). Prototype, PRD, Kiến trúc, DATABASE, API, Phân tích hệ thống đã có trong thư mục dự án.
- Nhóm bắt đầu từ 27/10/2026. Đã xong S1 (27/10–07/11: wireframe Figma, prototype Căn phòng, PRD duyệt 07/11) và S2 (08–12/11: PLAN, Kiến trúc, API, DATABASE, Phân tích hệ thống, prototype 6 trang).
- Còn **2 tuần** (S3–S5) để lập trình, hoàn thành toàn bộ trước **27/11/2026**.

## 2. Phân vai đã thống nhất

| Thành viên | Phụ trách |
|---|---|
| Tuấn Hưng | Thiết kế đồ vật, bảng đồ vật, âm thanh |
| Đình Nhiên | Sân vườn |
| Tuấn Lộc | Phòng ngủ |
| Phúc Thịnh | Phòng học, quản lý repo, các trang còn lại (Trang chủ, Thư viện, Thống kê, Tài khoản, Giới thiệu & Liên hệ) |

Chi tiết từng việc theo khu vực: `docs/PLAN.md` §2 và `docs/TASKS.md`.

## 3. Đã chốt sau buổi họp (13/11)

- Phân công backend và việc chung (đánh dấu ⓓ trong `docs/TASKS.md`): Hưng — `item_types`, `/catalog/items`; Nhiên — `scenes`, `/catalog/scenes`, telemetry, GA4/Sentry; Lộc — auth, `/me`, `/me/stats`, Lighthouse, E2E responsive; Thịnh — `schema.prisma`, `/room-state`, đồng bộ, README, video.
- Ghép cặp review chéo: Hưng + Nhiên → nhóm A, Lộc + Thịnh → nhóm B (tên nhóm: [Cần bổ sung]).
- Trang Thống kê chuyển từ Phúc Thịnh sang Tuấn Lộc (Lộc đã làm API `/me/stats`); Thịnh còn 18 issue.
- Phúc Thịnh tạo tài khoản GA4, Sentry rồi gửi mã cho Đình Nhiên; triển khai lên Vercel + Render + Neon ở S5.
- Không tạo tài khoản demo/số liệu mẫu; nhóm tự dùng thật vài ngày trước khi quay video.

## 4. Quy ước làm việc

- Lịch: S1 ✅ 27/10–07/11, S2 ✅ 08–12/11, S3 13–17/11, S4 18–22/11, S5 23–27/11; mỗi sprint là một milestone GitHub (S1, S2 tạo rồi đóng ngay).
- Họp ngắn 15 phút mỗi tối; họp tổng kết cuối mỗi sprint, ghi biên bản vào `docs/meetings/`.
- Mỗi việc = 1 issue = 1 nhánh = 1 PR có `Closes #<số>` và mã UC; commit theo Conventional Commits có số issue; PR cần 1 người khác duyệt và CI xanh.
- Mỗi người commit đều mỗi ngày; nộp self-report cuối mỗi sprint (`docs/reports/sprint-N/<tên>.md`).
- Viết test trước (Phase 0), code tới khi test xanh.

## 5. Việc tiếp theo

| Việc | Người | Hạn |
|---|---|---|
| Tạo repo GitHub, mời thành viên, milestone, nhãn, Projects; tạo issue từ `docs/TASKS.md` | Phúc Thịnh | 14/11 |
| Monorepo + CI chạy xanh | Phúc Thịnh | 15/11 |
| Dán link Figma vào PRD 5.3; xuất PNG wireframe vào `docs/wireframes/` | Phúc Thịnh | 14/11 |
| Khung test khu vực mình | Mỗi người | 15/11 |
| Viết bù self-report S1, S2 | Mỗi người | 15/11 |
| Xong Phase 0–2 + schema, migration, seeder (hết S3) | Theo `docs/TASKS.md` | 17/11 |
