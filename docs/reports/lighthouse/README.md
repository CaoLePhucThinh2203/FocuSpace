# Báo cáo Lighthouse (L12 — Tuấn Lộc)

Đo Lighthouse mobile cho 6 trang, lưu file HTML/JSON trước và sau tối ưu vào thư mục này. Mục tiêu ≥ 90 cả 4 hạng mục (AC-NF.1).

| Trang | Trước (P/A/BP/SEO) | Sau (P/A/BP/SEO) | Thay đổi đã làm |
|---|---|---|---|
| / | | | |
| /room | | | (H12 — Hưng) |
| /library | | | |
| /stats | | | |
| /account | | | |
| /about | | | |

## 15/11/2026 — Font tự host, ảnh xem trước nhẹ (H12)

**Vấn đề** (Lighthouse mobile, bản Vercel, `/library`): CSS của Google Fonts chặn hiển thị khoảng 0,9–1,8 giây; 17 ảnh `previews/item-*.png` mỗi ảnh mang khoảng 5,7 KB siêu dữ liệu `caBX` (tổng 98 KiB thừa).

**Thay đổi:** font Be Vietnam Pro tự host trong `frontend/public/fonts/` (giấy phép OFL, 12 file woff2 theo bộ chữ, `font-display: optional`, tải trước độ đậm 400 và 700), bỏ mọi yêu cầu tới `fonts.googleapis.com` / `fonts.gstatic.com`; bỏ khối `caBX` khỏi 17 ảnh (101,5 KB → 3,5 KB, điểm ảnh giữ nguyên).

**Cách đo:** Lighthouse 12.6.1, cấu hình mobile mặc định, Chrome headless, bản build `vite preview` trên máy, mỗi trang 3 lần. `/library` lúc đo không có backend nên ở trạng thái "Không tải được thư viện" (giống nhau trước và sau; Best Practices 96 do lỗi gọi API trong console).

| Trang | Performance trước | Performance sau | FCP trước → sau (trung vị) | LCP trước → sau | CLS | A / BP / SEO |
|---|---|---|---|---|---|---|
| / | 93, 93, 93 | 95, 95, 95 | 2,53 s → 1,91 s | 2,68 s → 2,76 s | 0 | 100 / 100 / 100 |
| /library | 92, 93, 92 | 95, 95, 96 | 2,57 s → 1,90 s | 2,65 s → 2,61 s | 0,054 (trạng thái lỗi) | 100 / 96 / 100 |
| /about | 94, 93, 93 | 97, 97, 97 | 2,54 s → 1,83 s | 2,62 s → 2,30 s | 0 | 100 / 100 / 100 |

Đo bản Vercel `/library` trước thay đổi (có dữ liệu thật): Performance 88 / 96 / 91, CLS 0. Đo lại trên Vercel sau khi PR được merge và triển khai.

## 15/11/2026 — CLS trang Thư viện do thanh cuộn xuất hiện muộn

**Vấn đề:** Lighthouse trong Chrome desktop trên Windows báo CLS 0,327 ở `/library` (`<main>` 0,296, `<footer>` 0,031), trong khi Lighthouse headless và mobile đo CLS 0. Nguyên nhân: lúc danh sách đang tải, trang ngắn hơn màn hình nên không có thanh cuộn và chân trang lọt vào khung nhìn; khi 17 đồ vật về, trang dài ra, Chrome chèn thanh cuộn 15 px làm toàn bộ nội dung căn giữa lệch sang trái và chân trang bị đẩy ra ngoài. Headless ẩn thanh cuộn nên không thấy.

**Thay đổi:** `html { scrollbar-gutter: stable }` cho các trang thường (Căn phòng đặt lại `auto` vì không cuộn); `<main>` của Thư viện cao tối thiểu bằng màn hình.

**Đo** (Chrome hiện thanh cuộn, viewport desktop 1280×800, layout-shift qua PerformanceObserver): `/library` 0,352 → 0 (kể cả API chậm 1,2 giây); `/account` 0,036 → 0,020; `/stats` 0,058 → 0,032; `/`, `/about` 0 → 0; mobile và tablet 0. E2E `uc07-thu-vien-cls.spec.ts` giữ điều kiện này để chặn lỗi lặp lại.
