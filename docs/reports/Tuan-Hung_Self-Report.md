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
- Mục **Thay đổi trong khu vực do thành viên khác làm** ghi các PR của người khác có sửa phần đồ vật, âm thanh, để biết khu vực đã đổi những gì. Các việc này không tính vào đóng góp của Tuấn Hưng.
- Mục có [Tự điền] do Tuấn Hưng tự viết.

---

<a id="sprint-1"></a>
## Sprint 1 (27/10 – 07/11/2026 · Thiết kế)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Thiết kế đồ vật, bảng đồ vật trên Figma/prototype (17 loại) | Xong |
| — | — | Thiết kế âm thanh đồ vật (Tivi, mèo, đồng hồ, radio…) và Volume mixer | Xong |
| — | — | Góp ý wireframe Căn phòng | Xong |

### Khó khăn và cách xử lý
- 17 loại đồ vật đều cần âm thanh riêng, nhưng dự án không dùng file âm thanh (đồ họa và âm thanh phải tạo bằng code). Cách xử lý: tạo âm tổng hợp bằng Web Audio API cho từng đồ vật (Tivi, mèo, đồng hồ, radio…), nghe thử ngay trong prototype rồi chỉnh.
- Bật nhiều đồ vật cùng lúc dễ bị ồn, khó nghe. Cách xử lý: thiết kế Volume mixer có âm lượng tổng và âm lượng từng nguồn, âm thanh to nhỏ và lệch trái phải theo vị trí đồ vật trong phòng (BR-07).

### Công việc của sprint tới
Tham gia viết tài liệu kế hoạch và phân tích (S2).

### Tự đánh giá mức đóng góp (1–5)
3	- Thiết kế 17 đồ vật, bảng đồ vật, âm thanh từng đồ vật và Volume mixer; góp ý wireframe Căn phòng

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
4 - 	Góp nội dung đồ vật, âm thanh cho PRD (Tính năng E, F) và API danh mục; rà 17 đồ vật cho seeder

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
5	 - Khu vực đồ vật, âm thanh trong PR #6, gồm 15 commit: khung test (H1, H2), seeder (H6), GET /catalog/items (H11), khung placement.ts (H4), khung âm thanh, khay, popover, Bảng âm lượng (H7–H10), bảng đo Lighthouse (H12), self-report (G3)

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

### Thay đổi trong khu vực do thành viên khác làm
| Issue | PR | Người làm | Thay đổi |
|---|---|---|---|
| H8 | #10 | Phúc Thịnh | Âm nền và 6 bài Lo-fi |
| H4, H11 | #31 | Phúc Thịnh | PA B: `placement.ts` thành hàm thuần có unit test, đủ 25 đồ thì chỉ hiện thông báo; xóa bản `placement.ts` trùng và các khung sprites, khay, popover, Bảng âm lượng ở `areas/items-audio/` (vẽ, âm thanh giữ trong `roomEngine.js`); integration test `/catalog/*` trên PostgreSQL 16 (`0daed0f`, `c81e8e7`, `533a618`) |
| — | #33 | Phúc Thịnh | Khôi phục nến phát sáng bị PR #30 ghi đè, thêm E2E kiểm tra vùng sáng quanh nến |
| — | #35 | Phúc Thịnh | Thư viện: ô ảnh đồ vật cùng màu thẻ |
| H12 | #40–#43 | Phúc Thịnh | Tự host font, ảnh xem trước nhẹ hơn 98 KiB, hết CLS do thanh cuộn, báo cáo Lighthouse 6 trang kèm JSON (gộp bảng đo `/room` của Tuấn Hưng) |
| — | #44 | Phúc Thịnh | Viết lại mô tả 17 đồ vật theo văn phong mới (Tivi CRT → Tivi cũ), tên Bảng âm lượng, chữ trong popover |
| G12 | #24 | Đình Nhiên | Giảm `MAX_ITEMS_PER_ROOM` 40 → 25 (BR-06); Tuấn Hưng duyệt phần `placement` |

### Khó khăn và cách xử lý
- Nhánh `toi-uu-lighthouse` bị xung đột với `main` ở `index.html`. Cách xử lý: merge `main` vào nhánh, gỡ dấu xung đột rồi mới mở PR (`2019c5d`).
- Thư viện vẫn nhảy bố cục (CLS) sau lần sửa đầu, phải sửa thêm 5 PR (#34, #36–#39). Cách xử lý: mỗi lần đo lại Lighthouse rồi sửa nguyên nhân tiếp theo: khung chờ cùng cỡ thẻ thật, Suspense đặt trong Layout, ảnh nhẹ, font `display=optional`.
- PR #30 (mèo đổi màu) ghi đè phần vẽ nến trong `roomEngine.js` nên nến mất ánh sáng. Phúc Thịnh khôi phục ở #33 và thêm E2E. Bài học: trước khi sửa `roomEngine.js` phải lấy `main` mới nhất, sau khi sửa chạy lại E2E.
- Một số commit chưa đúng Conventional Commits (“đổi màu mèo”, “fix mobile library”, “thêm AC-03.5 âm nền”, “review”). Cách xử lý: từ sau ghi đủ loại commit, mã issue và mã UC như các commit `perf(...)(H12)` cùng ngày.

### Công việc của sprint tới
S5 (16–17/11): góp ý UI/UX cho nhóm A cùng Đình Nhiên (G4), sửa theo góp ý nhận được (G5), quay clip demo phần đồ vật, âm thanh (G6).

### Tự đánh giá mức đóng góp (1–5)
5	 - 16 commit qua 13 PR: tối ưu Lighthouse (H12, có 6 PR sửa CLS ở Thư viện), nến phát sáng (#28), mèo đổi màu lông (H13, #30), AC-03.5 (#11), merge #34, #39

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

### Thay đổi trong khu vực do thành viên khác làm
| Issue | PR | Người làm | Thay đổi |
|---|---|---|---|
| — | #46 | Phúc Thịnh | Tiếng mèo, máy xông chỉnh theo số đo thật; máy xông bỏ tiếng xì (PRD v5.12–v5.13) |
| — | #47 | Phúc Thịnh | Đổi bài nhạc mượt: báo “Đang chuẩn bị…”, chuyển 1,5 giây giữ độ to đều, giữ bài vừa nghe; E2E AC-03.6 (PRD v5.14) |
| — | #48 | Phúc Thịnh | Chữ trong Căn phòng và popover đồ vật (văn phong lần 2) |
| — | #49 | Phúc Thịnh | Mèo rù rù theo lượt (10–15 giây, im 3–5 phút, bấm mèo thì rù rù luôn), làm lại tiếng rù rù; unit test và E2E (`462dcec`, `e9d3bdf`; PRD v5.18–v5.19) |

### Khó khăn và cách xử lý
- Thời gian cuối kỳ gấp, sprint này không có commit; phần âm thanh đồ vật (tiếng mèo, máy xông, đổi bài nhạc, mèo rù rù) do trưởng nhóm làm tiếp (#46, #47, #49). Cách xử lý: đọc lại PRD v5.12–v5.19 và các test mới để nắm hành vi hiện hành của khu vực, dùng bản này khi quay clip demo (G6).
- Chưa biết nhóm A là nhóm nào nên chưa góp ý UI/UX được (`docs/reviews/given/tuan-hung.md` ghi tên nhóm [Cần bổ sung]). Cách xử lý: hỏi Phúc Thịnh tên nhóm A, cùng Đình Nhiên review theo 3 tiêu chí của đề bài (usability, aesthetics, user-friendliness), hoàn thành G4, G6 trước 26/11.

### Tự đánh giá mức đóng góp (1–5)
3	- Không có commit. G5 đã có từ PR #30 làm ở S4; G4 và G6 chưa làm; âm thanh đồ vật do Thịnh làm tiếp (#46, #47, #49)
