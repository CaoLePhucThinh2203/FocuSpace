# Self-report — Tuấn Hưng

**Khu vực phụ trách:** Đồ vật, bảng đồ vật, âm thanh (`frontend/src/areas/items-audio/`, `backend/src/areas/items-audio/`, phần đồ vật và âm thanh trong `roomEngine.js`); tối ưu Lighthouse (H12).

| Sprint | Thời gian | Giai đoạn | Số commit trên `main` |
|---|---|---|---|
| [S1](#sprint-1) | 27/10 – 07/11/2026 | Thiết kế | — (chưa có repo) |
| [S2](#sprint-2) | 08/11 – 12/11/2026 | Kế hoạch | — (chưa có repo) |
| [S3](#sprint-3) | 13/11 – 14/11/2026 | Lập trình | 15 |
| [S4](#sprint-4) | 15/11/2026 | Lập trình | 16 |
| [S5](#sprint-5) | 16/11 – 17/11/2026 | Lập trình, nộp bài | 0 |

- S1, S2 viết bù ngày 13/11/2026. Repo GitHub tạo sau S2 nên cột Issue, PR ghi “—”.
- S3 – S5 soạn ngày 17/11/2026 từ git log và các PR đã merge vào `main`, theo lịch sprint trong `Phuc-Thinh_Self-Report.md`. Cột Issue ghi mã việc trong `docs/TASKS.md`, cột PR ghi số Pull Request trên GitHub, mã commit đặt trong ngoặc.

---

<a id="sprint-1"></a>
## Sprint 1 (27/10 – 07/11/2026 · Thiết kế)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Thiết kế đồ vật, bảng đồ vật trên prototype (17 loại) | Xong |
| — | — | Thiết kế âm thanh đồ vật (Tivi, mèo, đồng hồ, radio…) và Volume mixer | Xong |
| — | — | Góp ý wireframe Căn phòng | Xong |

### Khó khăn và cách xử lý
- 17 loại đồ vật đều cần âm thanh riêng, nhưng dự án không dùng file âm thanh (đồ họa và âm thanh phải tạo bằng code). Cách xử lý: tạo âm tổng hợp bằng Web Audio API cho từng đồ vật (Tivi, mèo, đồng hồ, radio…), nghe thử ngay trong prototype rồi chỉnh.
- Bật nhiều đồ vật cùng lúc dễ bị ồn, khó nghe. Cách xử lý: thiết kế Volume mixer có âm lượng tổng và âm lượng từng nguồn, âm thanh to nhỏ và lệch trái phải theo vị trí đồ vật trong phòng (BR-07).

### Công việc của sprint tới
Tham gia viết tài liệu kế hoạch và phân tích (S2).

### Tự đánh giá mức đóng góp (1–5)
**5** — Thiết kế 17 đồ vật và bảng đồ vật trên prototype, thiết kế âm thanh từng đồ vật (Tivi, mèo, đồng hồ, radio…) và Volume mixer, góp ý wireframe Căn phòng.

---

<a id="sprint-2"></a>
## Sprint 2 (08/11 – 12/11/2026 · Kế hoạch)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Góp nội dung đồ vật, âm thanh cho PRD (Tính năng E, F) và API danh mục | Xong |
| — | — | Rà danh mục 17 đồ vật cho seeder (DATABASE §3.7) | Xong |

### Khó khăn và cách xử lý
- Danh mục đồ vật xuất hiện ở nhiều nơi (prototype, PRD, API, DATABASE) nên dễ lệch tên, kích thước, phòng, nhóm. Cách xử lý: lấy danh sách `TYPES` trong prototype làm nguồn, rà từng loại trong 17 đồ vật khi viết DATABASE §3.7 và API danh mục.
- Seeder chỉ được nạp dữ liệu có trong prototype, không tự thêm đồ vật (BR-12). Cách xử lý: chỉ đưa vào seeder đúng 17 loại đã có, đồ vật mới (nếu có) phải hỏi nhóm trước.

### Công việc của sprint tới
Theo `docs/TASKS.md`, cột Sprint = S3: khung test, seeder đồ vật, API danh mục.

### Tự đánh giá mức đóng góp (1–5)
**5** — Góp nội dung đồ vật, âm thanh cho PRD (Tính năng E, F) và API danh mục; rà danh mục 17 đồ vật cho seeder (DATABASE §3.7).

---

<a id="sprint-3"></a>
## Sprint 3 (13/11 – 14/11/2026 · Lập trình)

Số commit trên `main`: 15.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| H1 | #6 | Khung unit test placement BR-03→06 (`c23bedf`) | Xong |
| H2 | #6 | Khung E2E `uc03-dieu-chinh-am-thanh`, `uc04-sap-xep-do-vat`, mỗi AC một `test.fixme` (`f8bc805`) | Xong |
| H6 | #6 | Seeder `item_types` 17 đồ vật, upsert chạy lại không trùng (`88684ff`) | Xong |
| H11 | #6 | `GET /catalog/items`: service lọc theo phòng, nhóm; kiểm tra tham số bằng Zod; `Cache-Control` 1 giờ; khung integration test (`9b51279`, `a0ae4bd`, `40ff6f4`) | Xong |
| H4 | #6 | Khung `placement.ts` quy tắc đặt đồ BR-03→06 (`57eeb5a`) | Xong (bản hoàn chỉnh ở #31) |
| H7–H10 | #6 | Khung AudioContext và Master, âm tổng hợp đồ vật và Lo-fi, sprites, khay kéo thả, popover và Bảng âm lượng (`00e8693`, `faf2a58`, `3413357`, `3a6653e`) | Xong (thay bằng PA B ngày 15/11) |
| H12 | #6 | Bảng đo Lighthouse `/room` trước/sau (`2fe5264`), sau gộp vào `docs/reports/lighthouse/README.md` | Xong |
| G3 | #6 | Self-report S1, S2 (viết bù) và khung S3–S5 (`861b509`, `5e51789`) | Xong |

### Khó khăn và cách xử lý
- Phải chờ code nền (PR #1, #3) merge chiều 14/11 rồi mới bắt đầu được khu vực của mình, nên toàn bộ việc S3 dồn vào tối 14/11. Cách xử lý: làm trong thư mục `areas/items-audio/` theo cổng cắm khu vực (#3) và gửi một PR (#6) để kịp demo 15/11.
- Làm theo cách "test trước, code sau" nên nhiều phần mới dừng ở mức khung (`placement.ts`, khay, popover, Bảng âm lượng). Cách xử lý: ghi rõ trạng thái khung trong TASKS; từ 15/11 nhóm chốt PA B, phần vẽ và âm thanh dùng thẳng `roomEngine.js`, `placement.ts` hoàn thiện thành hàm thuần có test ở #31.

### Công việc của sprint tới
S4 (15/11): tối ưu Lighthouse Căn phòng và các trang (H12), mèo đổi màu lông (H13), sửa lỗi đồ vật, âm thanh sau khi chạy thử.

### Tự đánh giá mức đóng góp (1–5)
**5** — Làm toàn bộ phần S3 của khu vực trong PR #6 (15 commit): khung unit test placement và E2E UC.03, UC.04 (H1, H2); seeder `item_types` 17 đồ vật (H6); API `GET /catalog/items` có Zod, `Cache-Control` và khung integration test (H11); khung `placement.ts` (H4); khung AudioContext, âm tổng hợp, Lo-fi, khay, popover, Bảng âm lượng (H7–H10); bảng đo Lighthouse `/room` (H12); self-report S1–S5 (G3).

---

<a id="sprint-4"></a>
## Sprint 4 (15/11/2026 · Lập trình)

Số commit trên `main`: 16.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | #11 | Thêm AC-03.5 âm nền vào PRD (`b50b733`) | Xong |
| H12 | #19 | Dựng âm thanh sau cú nhấp đầu, font không chặn hiển thị (`a8ebd6a`); khai báo kiểu hook `__focuspace` cho E2E, sửa lint (`bc191e2`); gỡ dấu xung đột trong `index.html` (`2019c5d`) | Xong |
| H12 | #20, #21 | Thêm `robots.txt`, bỏ lỗi 401 khi khách tải trang (`798acea`); nhúng CSS chính vào `index.html` (`7a0b305`) | Xong |
| H12 | #26, #27 | Trả 404 cho file không tồn tại thay vì `index.html` (`4f3cabc`); tải trước ảnh LCP Trang chủ (`e3ddd5e`) | Xong |
| — | #28 | Nến phát sáng, bỏ tiếng rè sau tiếng meo (`7c93a86`) | Xong |
| H13 | #30 | Mèo đổi màu lông Cam, Xám tro, Kem (`f4030be`); làm theo góp ý số 1 trong `docs/reviews/received.md` | Xong |
| H12 | #32, #34, #36–#39 | Thư viện hết nhảy bố cục: khung chờ cùng cỡ thẻ thật, sửa giao diện mobile, Suspense trong Layout, ảnh nhẹ, bỏ JS thừa, font `display=optional` (`f906c50`, `505e385`, `e5b8800`, `4c98e5a`, `81200ff`, `d82663b`) | Xong |
| — | #34, #39 | Merge PR | Xong |

### Khó khăn và cách xử lý
- Nhánh `toi-uu-lighthouse` bị xung đột với `main` ở `index.html`. Cách xử lý: merge `main` vào nhánh, gỡ dấu xung đột rồi mới mở PR (`2019c5d`).
- Thư viện vẫn nhảy bố cục (CLS) sau lần sửa đầu, phải sửa thêm 5 PR (#34, #36–#39). Cách xử lý: mỗi lần đo lại Lighthouse rồi sửa nguyên nhân tiếp theo: khung chờ cùng cỡ thẻ thật, Suspense đặt trong Layout, ảnh nhẹ, font `display=optional`.
- PR #30 (mèo đổi màu) ghi đè phần vẽ nến trong `roomEngine.js` nên nến mất ánh sáng. Cách xử lý: khôi phục ánh sáng nến kèm E2E kiểm tra vùng sáng; bài học: trước khi sửa `roomEngine.js` phải lấy `main` mới nhất, sau khi sửa chạy lại E2E.
- Một số commit chưa đúng Conventional Commits (“đổi màu mèo”, “fix mobile library”, “thêm AC-03.5 âm nền”, “review”). Cách xử lý: từ sau ghi đủ loại commit, mã issue và mã UC như các commit `perf(...)(H12)` cùng ngày.

### Công việc của sprint tới
S5 (16–17/11): góp ý UI/UX cho nhóm A cùng Đình Nhiên (G4), sửa theo góp ý nhận được (G5), quay clip demo phần đồ vật, âm thanh (G6).

### Tự đánh giá mức đóng góp (1–5)
**5** — 16 commit qua 13 PR: tối ưu Lighthouse (H12) gồm dựng âm thanh sau cú nhấp đầu, font không chặn hiển thị, `robots.txt`, nhúng CSS, trả 404 đúng, tải trước ảnh LCP, Thư viện hết CLS qua 6 PR; nến phát sáng, bỏ tiếng rè sau tiếng meo (#28); mèo đổi màu lông theo góp ý (H13, #30); thêm AC-03.5 âm nền (#11); merge PR #34, #39.

---

<a id="sprint-5"></a>
## Sprint 5 (16/11 – 17/11/2026 · Lập trình, nộp bài)

Số commit trên `main`: 0.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| G4 | — | Góp ý UI/UX cho nhóm A cùng Đình Nhiên (`docs/reviews/given/tuan-hung.md`, hiện mới có khung) | Chưa làm |
| G5 | #30 | Sửa theo góp ý: góp ý số 1 (mèo đổi màu) đã làm ở PR #30 trong S4, không cần PR mới (`docs/reviews/received.md`) | Xong |
| G6 | — | Quay clip demo phần đồ vật, âm thanh, gửi Thịnh trước 26/11 | Chưa làm |

### Khó khăn và cách xử lý
- Thời gian cuối kỳ gấp, sprint này không có commit. Cách xử lý: đọc lại PRD v5.12–v5.19 và các test mới để nắm hành vi hiện hành của đồ vật, âm thanh, dùng bản này khi quay clip demo (G6).
- Chưa biết nhóm A là nhóm nào nên chưa góp ý UI/UX được (`docs/reviews/given/tuan-hung.md` ghi tên nhóm [Cần bổ sung]). Cách xử lý: hỏi Phúc Thịnh tên nhóm A, cùng Đình Nhiên review theo 3 tiêu chí của đề bài (usability, aesthetics, user-friendliness), hoàn thành G4, G6 trước 26/11.

### Tự đánh giá mức đóng góp (1–5)
**4** — Không có commit trong sprint. Góp ý mèo đổi màu (G5) đã đáp ứng bằng PR #30 từ S4; còn góp ý UI/UX cho nhóm A (G4) và clip demo đồ vật, âm thanh (G6) chưa làm.
