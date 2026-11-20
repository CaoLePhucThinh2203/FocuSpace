# Self-report — Tuấn Lộc

> Bản theo 5 sprint (đề bài yêu cầu *Self-Report for all 5 sprints*). Cùng nội dung trình bày theo Task 1–5 theo mẫu của môn: [`docs/self-reports/self-report-24090025.md`](../self-reports/self-report-24090025.md).

*Khu vực phụ trách:* Phòng ngủ, Thống kê, tài khoản (đăng ký, đăng nhập, /me, /me/stats).

| Sprint | Thời gian | Giai đoạn | Số commit trên main |
|---|---|---|---|
| [S1](#sprint-1) | 27/10 – 07/11/2026 | Thiết kế | — (chưa có repo) |
| [S2](#sprint-2) | 08/11 – 12/11/2026 | Kế hoạch | — (chưa có repo) |
| [S3](#sprint-3) | 13/11 – 14/11/2026 | Lập trình | 23 |
| [S4](#sprint-4) | 15/11/2026 | Lập trình | 4 |
| [S5](#sprint-5) | 16/11 – 17/11/2026 | Lập trình, nộp bài | 0 |

- S1, S2 viết bù ngày 13/11/2026. Repo GitHub tạo sau S2 nên cột Issue, PR ghi “—”.
- S3 – S5 soạn ngày 17/11/2026 từ git log và các PR đã merge vào main. Cột Issue ghi mã việc trong docs/TASKS.md, cột PR ghi số Pull Request trên GitHub, mã commit đặt trong ngoặc.

---

<a id="sprint-1"></a>
## Sprint 1 (27/10 – 07/11/2026 · Thiết kế)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Thiết kế Phòng ngủ trên prototype | Xong |
| — | — | Wireframe Thống kê, Tài khoản bằng draw.io (L1) | Xong |

### Khó khăn và cách xử lý
- Phòng ngủ dùng chung engine và đồ vật với Phòng học nên dễ trùng lặp. Cách xử lý: Phòng ngủ chọn không khí riêng (cửa sổ đêm: Đêm sao, Mưa đêm, Tuyết rơi; đồng hồ treo tường có Hẹn giờ ngủ, không có Pomodoro) để hai phòng khác nhau rõ ràng.
- Trang Thống kê chưa có dữ liệu thật để thiết kế. Cách xử lý: thiết kế wireframe theo các chỉ số trong PRD (tổng thời gian tập trung, số phiên, phân bố theo ngày), để trống phần số liệu.

### Công việc của sprint tới
Tham gia viết tài liệu kế hoạch và phân tích (S2).

### Tự đánh giá mức đóng góp (1–5)
*4* — Thiết kế Phòng ngủ, wireframe Thống kê và Tài khoản.

---

<a id="sprint-2"></a>
## Sprint 2 (08/11 – 12/11/2026 · Kế hoạch)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Góp nội dung Phòng ngủ, Hẹn giờ ngủ cho PRD (Tính năng C, G) | Xong |
| — | — | Góp ý phần tài khoản, thống kê trong API | Xong |

### Khó khăn và cách xử lý
- Phần tài khoản và thống kê liên quan nhiều tài liệu (PRD, API, DATABASE) do người khác viết. Cách xử lý: góp ý trực tiếp vào phần endpoint /auth/*, /me, /me/stats để khớp với wireframe Thống kê, Tài khoản đã làm ở S1.

### Công việc của sprint tới
Theo docs/TASKS.md, cột Sprint = S3: backend tài khoản, thống kê, trang Thống kê.

### Tự đánh giá mức đóng góp (1–5)
*4* — Góp nội dung PRD và góp ý API cho khu vực của mình.

---

<a id="sprint-3"></a>
## Sprint 3 (13/11 – 14/11/2026 · Lập trình)

Số commit trên main: 23.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| L2 | #5 | Khung integration test auth (f8ec609) | Xong |
| L7 | #5 | authService: đăng ký, đăng nhập, refresh xoay vòng (1ffb174) | Xong |
| L8, L9 | #5 | Router bedroom (/auth/*, /me, /me/stats); statsService tổng hợp theo khoảng thời gian và múi giờ (8b550f5, ed0359b) | Xong |
| L13 | #5 | Trang Thống kê, route /stats và mục Thống kê trên thanh điều hướng (a8362a9, 3ee6569) | Xong |
| L3 | #5 | Khung unit test sleepTimer BR-02 và khung sleepTimer.ts (b01ab2d, f2eb03d) | Xong (khung) |
| — | #5 | Khung E2E uc06, uc08, uc10, uc11 (8299e95, 93f896d, c49c58f, 3e59d0f) | Xong |
| L11 | #5 | E2E responsive: không cuộn ngang, trang 404 (2a895cb) | Xong |
| L12 | #5 | Bảng báo cáo Lighthouse 6 trang (fdece3a), nay gộp vào docs/lighthouse/README.md | Xong |
| L10 | #5, #8 | Góp ý UI/UX cho Nhóm 6 (Quản lí chi tiêu) cùng Phúc Thịnh (1c68c6c, 3278510) | Xong |
| — | #5 | README khu vực bedroom phía frontend và backend (c234f21, 70c4916) | Xong |
| G3 | #5 | Self-report S1, S2 (viết bù) và khung S3–S5 (8ffea0d, 38c00eb, 1de98b5, aeaae53, b589b04) | Xong |

### Khó khăn và cách xử lý
- Khung sleepTimer.ts phải chờ tách logic từ roomEngine.js (f2eb03d). Cách xử lý: theo PA B, hàm thuần sleepTimer.ts có unit test được hoàn thiện ở #31, engine gọi lại.
- Thống kê phải tính theo ngày của người dùng, không theo giờ máy chủ. Cách xử lý: statsService nhận khoảng thời gian và múi giờ, tổng hợp theo ngày địa phương (ed0359b).
- Nhiều việc (backend, trang Thống kê, E2E, Lighthouse, góp ý nhóm khác) dồn trong 2 ngày. Cách xử lý: làm khung test trước (integration, E2E), rồi viết code cho tới khi test chạy được, gom vào một PR (#5).

### Công việc của sprint tới
S4 (15/11): hoàn thiện trang Thống kê, đặc tả UC.06 Hẹn giờ ngủ, cập nhật icon.

### Tự đánh giá mức đóng góp (1–5)
*5* — Làm toàn bộ backend tài khoản, thống kê và trang Thống kê, kèm test và góp ý cho nhóm khác.

---

<a id="sprint-4"></a>
## Sprint 4 (15/11/2026 · Lập trình)

Số commit trên main: 4.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | #12 | Đặc tả UC.06 Hẹn giờ ngủ (50172b1) | Xong |
| L13 | #12 | Trang Thống kê khu vực bedroom (e4aebb3) | Xong |
| — | #17, #25 | Cập nhật icon (5a9ea80, bfc73cf) | Xong |
| — | #10, #15, #22, #23, #29, #31, #34, #38–#40, #42–#44 | Review và approve 13 Pull Request | Xong |

### Khó khăn và cách xử lý
- Trang Thống kê cần dữ liệu từ telemetry (Đình Nhiên làm phần gửi lô), nên khi chưa học phiên nào thì trang trống. Cách xử lý: hiển thị trạng thái chưa có dữ liệu thay vì biểu đồ rỗng; kiểm tra số liệu bằng integration test /me/stats.
- Hẹn giờ ngủ trong đặc tả UC.06 phải khớp với hành vi mới trong engine (chọn mức xong chờ Bắt đầu, có Tạm dừng, PRD v5.7). Cách xử lý: viết đặc tả theo PRD v5.7 và E2E AC-06.1, AC-06.2.

### Công việc của sprint tới
S5 (16–17/11): sửa theo góp ý nhận được (G5), quay clip demo phần Phòng ngủ, Thống kê (G6).

### Tự đánh giá mức đóng góp (1–5)
*4* — Hoàn thiện trang Thống kê và đặc tả UC.06; số việc ít hơn S3.

---

<a id="sprint-5"></a>
## Sprint 5 (16/11 – 17/11/2026 · Lập trình, nộp bài)

Số commit trên main: 0.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| G5 | #29 | Sửa theo góp ý nhận được: góp ý thuộc Phòng ngủ là "sửa lại chế độ Hẹn giờ ngủ"; chọn mức xong chờ Bắt đầu, có Tạm dừng, giảm âm dần 2 phút cuối đã có trong #29, không cần PR mới (docs/reviews/received.md) | Xong |
| — | — | Kiểm thử thủ công Phòng ngủ: cửa sổ đêm (Đêm sao, Mưa đêm, Tuyết rơi), rèm, đồng hồ treo tường, Hẹn giờ ngủ (chọn mức, Bắt đầu, Tạm dừng, giảm âm 2 phút cuối), tiếng mèo rù rù theo lượt (#49) | Xong |
| — | — | Kiểm thử thủ công trang Thống kê: chưa có dữ liệu, có dữ liệu, lỗi tải và nút Thử lại (#48) | Xong |
| — | — | Kiểm thử thủ công Tài khoản: đăng ký, đăng nhập, đăng xuất, đổi tên, xóa tài khoản, đồng bộ phòng sau khi đăng nhập | Xong |
| — | #46–#53 | Review 8 Pull Request: đọc thay đổi, chạy thử trên máy, kiểm tra tính năng đúng PRD rồi approve | Xong |
| G6, T19 | #61, #62 | Quay toàn bộ clip video trình bày bản Desktop (link trong README) | Xong |

### Khó khăn và cách xử lý
- Sprint 5 có nhiều thay đổi ở Phòng ngủ và các trang (âm thanh mèo, văn phong, font, nút Thử lại ở Thống kê), dễ làm hỏng phần đã chạy đúng. Cách xử lý: kiểm thử lại toàn bộ tính năng khu vực mình phụ trách (Phòng ngủ, Thống kê, Tài khoản) sau khi các PR #46–#49 được merge.
- Góp ý nhận được đến cuối sprint (17/11), không còn thời gian mở PR mới. Cách xử lý: đối chiếu từng góp ý với web; góp ý Hẹn giờ ngủ đã được làm ở #29 nên ghi vào received.md kèm số PR.

### Tự đánh giá mức đóng góp (1–5)
*4* — Kiểm thử Phòng ngủ, Thống kê và Tài khoản, review và approve Pull Request trước khi nộp bài; không có commit trong sprint.
