# Góp ý UI/UX cho Nhóm 5 (ThaiTuFashion)
 
## Thông tin chung
- **Nhóm được review:** Nhóm 5 (ThaiTuFashion)
- **Link repo:** https://github.com/huynhsy986-droid/thai_tu_fashion
- **Ngày review:** 25/11/2026
- **Người review:** Tuấn Hưng, Đình Nhiên
## 1. Usability (Tính khả dụng)
**Điểm mạnh**
- Ô tìm kiếm ở trang Cửa hàng gợi ý ngay khi gõ và hiểu từ khóa không dấu (gõ "ao khoac" vẫn ra 3 áo khoác).
- Khi không có kết quả, trang báo rõ "Không có sản phẩm phù hợp", gợi ý từ khóa khác và có nút "Xoá bộ lọc".
- Trang Chi tiết sản phẩm chặn thêm vào giỏ khi chưa chọn size và báo "Hãy chọn size trước khi tiếp tục"; size sắp hết có nhãn "Còn 2".
- Sau khi thêm vào giỏ có thông báo nhỏ kèm liên kết "Xem giỏ", số trên biểu tượng giỏ hàng cập nhật ngay.
- Bộ lọc ở trang Cửa hàng đầy đủ (danh mục, dịp mặc, phong cách, khoảng giá, size, màu), mỗi mục có số lượng sản phẩm bên cạnh.
**Đề xuất cải thiện**
- Sau khi đặt hàng, website không hiển thị các món đã đặt và không có mục theo dõi đơn hàng, nên khách hàng không thể xem lại đơn và không thể đổi size đối với món đã đặt. Đề xuất bổ sung mục "Đơn hàng của tôi" liệt kê các đơn đã đặt kèm trạng thái, và cho phép đổi size khi đơn chưa được xử lý.
- Sau khi đặt hàng, website không cấp mã đơn hàng nên khách hàng không có căn cứ để theo dõi đơn. Đề xuất tạo mã đơn hàng, hiển thị ở trang xác nhận đặt hàng và dùng chính mã này trong mục "Đơn hàng của tôi".
- Trong Studio thử đồ, các món được chọn chưa đồng bộ với nhau: khi chọn mũ và kính, mũ che luôn phần kính mà model đang đeo thay vì hiển thị model đeo cả hai; khi chọn hai áo, ảnh của hai áo bị chồng lên nhau. Đề xuất đồng bộ lại thứ tự lớp hiển thị theo từng vùng trên cơ thể để mũ và kính cùng xuất hiện đúng vị trí, đồng thời chỉ cho phép mang một món ở mỗi vùng (ví dụ một áo, một phụ kiện đầu) để tránh các món cùng vùng chồng lên nhau.
- Đường dẫn `#admin` xuất hiện trên menu và mục "Khu quản trị" xuất hiện ở phần footer của trang người dùng. Người dùng thông thường không cần và không nên thấy lối vào khu quản trị. Đề xuất gỡ cả hai khỏi giao diện người dùng, chỉ truy cập khu quản trị bằng đường dẫn riêng hoặc sau khi đăng nhập bằng tài khoản quản trị.
- Khi thu nhỏ cửa sổ, biểu tượng Yêu thích và Giỏ hàng bị đẩy ra ngoài màn hình và bị thay bằng nút menu, khiến người dùng khó vào giỏ hàng. Đề xuất giữ hai biểu tượng này (kèm số lượng trong giỏ) hiển thị trên thanh trên cùng ở mọi kích thước màn hình.

## Bảng tổng hợp đề xuất
| # | Tiêu chí | Vấn đề | Đề xuất | Mức độ |
|---|---|---|---|---|
| 1 | Usability | Sau khi đặt hàng không có mục theo dõi, không xem được món đã đặt nên không đổi được size | Thêm mục "Đơn hàng của tôi" có trạng thái và cho đổi size khi đơn chưa xử lý | Cao |
| 2 | Usability | Đặt hàng xong không có mã đơn hàng | Tạo mã đơn hàng, hiển thị ở trang xác nhận và trong mục theo dõi | Cao |
| 3 | Usability | Studio: mũ che kính, hai áo chồng lên nhau | Đồng bộ thứ tự lớp theo vùng; mỗi vùng chỉ mang một món | Cao |
| 4 | Usability | `#admin` trên menu và "Khu quản trị" ở footer hiển thị ở trang người dùng | Gỡ khỏi giao diện người dùng, truy cập bằng đường dẫn riêng | Cao |
| 5 | Usability | Biểu tượng Yêu thích, Giỏ hàng bị đẩy ra ngoài khi thu nhỏ màn hình | Giữ hai biểu tượng hiển thị ở mọi kích thước màn hình | Trung bình |

 