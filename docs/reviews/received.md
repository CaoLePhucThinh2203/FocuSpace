# Góp ý nhận được

Nhóm nhận góp ý UI/UX theo 2 đợt. Mỗi góp ý có quyết định (làm / không làm / đã có sẵn) kèm PR hoặc lý do.

## Đợt 1 — trước khi nộp bài (đến 18/11/2026)

Người góp ý: Hữu Triết, Bá Phát, Thành Long.

| # | Góp ý | Quyết định | PR hoặc lý do |
|---|---|---|---|
| 1 | Mèo có thể đổi màu | Làm | #30: popover mèo có 3 màu lông Cam, Xám tro, Kem |
| 2 | Sửa lại giao diện Trang chủ | Làm | #10: thêm phần Mô tả & Tính năng; #44, #48: viết lại chữ cho ngắn gọn, Trang chủ gọn lại (PRD v5.17) |
| 3 | Tối ưu web | Làm | #40: tự host font, ảnh xem trước nhẹ hơn 98 KiB; #41: hết CLS do thanh cuộn; #42: dọn mã; #43: chữ chú thích 12 px; #48: tải trước đủ 4 độ đậm font. Báo cáo Lighthouse 6 trang kèm JSON |
| 4 | Sửa lại đồng hồ Pomodoro | Làm | #29: Pomodoro theo vòng, 4 nhịp học, bảng Nhịp học (PRD v5.7) |
| 5 | Thêm nút bắt đầu, kết thúc cho đồng hồ | Làm | #29: Pomodoro và Hẹn giờ ngủ có nút Bắt đầu / Tạm dừng; Pomodoro có Đặt lại vòng, Bỏ qua lượt nghỉ |
| 6 | Sửa lại chế độ Hẹn giờ ngủ | Làm | #29: Hẹn giờ ngủ trên header, chọn mức Tắt/15/30/60 phút xong chờ bấm Bắt đầu, có Tạm dừng; âm thanh giảm dần trong 2 phút cuối |
| 7 | Thêm khung cảnh tuyết | Không làm | Đã có tuyết ở cảnh Núi băng (Sân vườn) và thời tiết Tuyết rơi ở cửa sổ Phòng ngủ. Thêm một cảnh mới cần vẽ, làm âm nền và thêm vào seeder, không kịp trước hạn nộp; để dành cho phiên bản sau |
| 8 | Làm khung cảnh Thành phố sinh động hơn | Làm | #46: âm nền Thành phố buổi tối, bỏ tiếng nói chuyện, 30–50 giây có một tiếng còi xe nhỏ ở xa (PRD v5.13); #50: chỉnh lại vị trí xe trên cả 2 làn |
| 9 | Sửa lại độ lớn âm thanh | Làm | #46: tiếng mèo, máy xông chỉnh theo số đo thật (PRD v5.12–v5.13); #49: mèo rù rù theo lượt, làm lại tiếng rù rù (PRD v5.18–v5.19). Bảng âm lượng có âm lượng tổng và âm lượng từng nguồn |
| 10 | Thêm nhạc Lo-fi | Làm | #10: âm nền và 6 bài Lo-fi; #47: đổi bài mượt, báo "Đang chuẩn bị…", chuyển 1,5 giây, giữ bài vừa nghe (PRD v5.14) |

## Đợt 2 — sau bản chấm thử 22/11/2026

Hai nhóm gửi góp ý theo 3 tiêu chí của đề bài; nhóm trả lời từng ý ngay tại nơi góp ý (sprint S6).

### Nhóm 3 (Let's Talk)

- *Góp ý gốc:* issue [#164](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/164) (bản đăng nhầm tài khoản: #163), ngày 26/11/2026
- *Nhóm trả lời:* [comment trong #164](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/164#issuecomment-7188234516)

| # | Góp ý | Quyết định | PR hoặc lý do |
|---|---|---|---|
| 11 | Nhãn thường trực cho 3 nút biểu tượng (Usability) | Làm (sau bản chấm thử lần 2, sprint S7) | [#181](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/181): trên điện thoại, tablet (thiết bị không có chuột) mỗi nút có nhãn chữ dưới biểu tượng "Âm thanh", "Trang trí", "Âm lượng" (Sân vườn có "Khung cảnh"); máy có chuột giữ tooltip khi rê chuột như cũ (PRD v5.21, AC-01.6) |
| 12 | Hiện tên phòng kế tiếp trên hai mũi tên (Usability) | Đã có sẵn | Rê chuột hoặc Tab vào mũi tên đã hiện tên đích ("Ra sân vườn", "Sang phòng ngủ", "Về phòng học"); trên điện thoại bấm là chuyển ngay, tên phòng hiện ở đầu trang |
| 13 | Tăng cỡ chữ, độ tương phản trong bảng điều khiển (Aesthetics) | Không làm | Màu lấy theo bảng màu Lo-fi của thiết kế đã duyệt; Lighthouse Accessibility (có kiểm độ tương phản) đạt ≥ 95 trên cả 6 trang; đây là chú thích phụ nên giữ cỡ nhỏ để không lấn phần điều khiển chính |
| 14 | Gợi ý cho "Hẹn giờ ngủ --:--" (User-friendliness) | Đã có sẵn | Ô "--:--" là nút có mũi tên ▾ và tooltip "Chọn hẹn giờ ngủ", bấm mở bảng Tắt / 15 / 30 / 60 phút; popover đồng hồ treo tường trong Phòng ngủ cũng ghi "Đặt hẹn giờ ngủ tại đây" |

### Nhóm 4 (PawPass)

- *Người góp ý:* Nguyễn Thế Dũng, ngày 26/11/2026
- *Góp ý gốc:* [`docs/reviews/given/nhom-2-focuspace.md`](https://github.com/iceruychi-netizen/PawPass-Hosothucung/blob/main/docs/reviews/given/nhom-2-focuspace.md) trên repo PawPass (issue [#9 bên PawPass](https://github.com/iceruychi-netizen/PawPass-Hosothucung/issues/9))
- *Nhóm trả lời:* [comment trong issue #9 bên PawPass](https://github.com/iceruychi-netizen/PawPass-Hosothucung/issues/9#issuecomment-7189142577)
- *Bản đăng lại trên repo FocuSpace:* issue [#174](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/174), cùng nội dung, ứng với các mục #16, #17 bên dưới

| # | Góp ý | Quyết định | PR hoặc lý do |
|---|---|---|---|
| 15 | Căn phòng xoay ngang 90° khi cầm điện thoại dọc | Giữ nguyên, ghi nhận gợi ý cho bản sau | Chủ ý thiết kế: căn phòng pixel art tỷ lệ 16:9, màn dọc chỉ còn một dải nhỏ nên web tự xoay để căn phòng đủ lớn. Dòng gợi ý "Xoay ngang điện thoại" là hợp lý, chưa kịp thêm trước hạn nộp |
| 16 | Đồ vật trên bàn có vùng bấm nhỏ | Không làm | Đồ vật vẽ đúng toạ độ pixel của thiết kế đã duyệt (hệ 320×180); mở vùng bấm lên 44×44 px làm vùng bấm ly cà phê, đèn bàn, tai nghe chồng nhau, dễ bấm nhầm. Mọi đồ vật dùng được bằng bàn phím (Tab, Enter) |
| 17 | 3 nút biểu tượng không có chữ trên màn hình cảm ứng | Làm (sau bản chấm thử lần 2, sprint S7) | Trùng góp ý #11 của Nhóm 3, làm cùng [#181](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/181) đúng như đề xuất "hiện chữ dưới biểu tượng trên màn hình cảm ứng" |
| 18 | Không biết đồ vật kéo thả được | Đã có một phần | Khay đồ vật có dòng "Kéo vào phòng. Bấm vào đồ vật để chỉnh âm lượng."; bảng đèn bàn ghi "Kéo để dời dọc mặt bàn"; mỗi đồ vật có nhãn "kéo để di chuyển" cho trình đọc màn hình. Gợi ý tự hiện ở lần đầu vào phòng ghi nhận cho bản sau |
| 19 | Khó theo dõi Pomodoro khi chuyển tab | Đã có một phần | Hết mỗi phiên có tiếng chuông báo (nghe được cả khi ở tab khác) và tự sang phiên nghỉ. Thời gian còn lại trên tiêu đề tab chưa có, ghi nhận cho bản sau |
| 20 | Chưa rõ lựa chọn có được lưu khi chuyển phòng | Đã có sẵn | Mọi thay đổi tự lưu vào trình duyệt sau khoảng 0,25 giây, chuyển phòng hay tải lại trang đều giữ nguyên; đăng nhập thì đồng bộ lên tài khoản. Nhãn "Đã lưu" từng có nhưng đã bỏ để header gọn |
| 21 | Chữ nhỏ, màu nhạt trên nền tối | Không làm | Trùng góp ý #13 của Nhóm 3, cùng lý do (bảng màu thiết kế đã duyệt, Lighthouse Accessibility ≥ 95) |

*Các ý trùng giữa 2 nhóm:* nhãn cho 3 nút biểu tượng (#11, #17) và chữ nhỏ trên nền tối (#13, #21). Ý nhãn cho 3 nút đã làm ở sprint S7 ([#181](https://github.com/CaoLePhucThinh2203/FocuSpace/issues/181)); ý chữ nhỏ trên nền tối ưu tiên cho bản sau.