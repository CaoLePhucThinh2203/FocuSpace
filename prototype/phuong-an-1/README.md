# Phương án 1 — Tailwind chỉ ở các trang mới. Căn phòng (room.html) giữ nguyên CSS viết tay của prototype gốc, thêm title, meta description và menu trang ở logo.

Mở `index.html` bằng trình duyệt (cần Internet để tải Tailwind CDN và font). Các trang: Trang chủ, Căn phòng, Thư viện, Thống kê, Tài khoản, Giới thiệu & Liên hệ.

Thư viện, Thống kê, Tài khoản chưa nối backend: Thư viện đọc danh mục trong `assets/catalog.js` (cùng nội dung seeder), Thống kê dùng dữ liệu minh họa, đăng nhập được giả lập trên trình duyệt. Hình trong `assets/previews/` chụp từ prototype gốc; bản React sẽ vẽ trực tiếp bằng engine.
