# Báo cáo Lighthouse (L12 — Tuấn Lộc; tối ưu H12 — Tuấn Hưng)

Mục tiêu: ≥ 90 cả 4 hạng mục (Performance, Accessibility, Best Practices, SEO) ở mọi trang, cấu hình mobile (AC-NF.1, PRD 6.1).
Cách đo chung: Lighthouse 12.6.1, cấu hình mobile mặc định, Chrome headless, bản triển khai https://focuspace-iota.vercel.app, mỗi trang 3 lần, ghi lần có Performance trung vị. File JSON đầy đủ của lần đo cuối nằm trong thư mục ngày đo (mở bằng [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/)).

## Đo lại — 20/11/2026, sau khi bật Google Analytics 4 và Sentry

Kết quả 15/11 bên dưới đo khi bản triển khai chưa có mã GA4 và DSN Sentry (bật ngày 17/11). Đo lại bằng Lighthouse trong Chrome DevTools, mỗi trang một lần, ảnh chụp trong `docs/images/screenshots/lighthouse-sau-*.png`:

| Performance | `/` | `/room` | `/library` | `/stats` | `/account` | `/about` |
|---|---|---|---|---|---|---|
| Desktop | 96 | 100 | 98 | 98 | 97 | 96 |
| Mobile | 83 | 100 | 83 | 82 | 82 | 83 |

Accessibility, Best Practices, SEO đạt 100 ở mọi lần đo. Trên mobile, LCP 4,6 giây do `gtag.js` (GA4) và thư viện Sentry trong bundle chính; phân tích và ảnh chụp đầy đủ trong [`docs/report.md`](../report.md#a-kiểm-tra-hiệu-năng-với-lighthouse) (Task 4a).

## Kết quả 15/11/2026, trước khi bật GA4 và Sentry (`2026-11-15/`)

| Trang | Trước tối ưu (P) | Sau: P / A / BP / SEO | Performance 3 lần | FCP | LCP | TBT | CLS | File |
|---|---|---|---|---|---|---|---|---|
| / | — (chưa đo) | 100 / 100 / 100 / 100 | 99, 100, 100 | 1,3 s | 1,7 s | 0 ms | 0 | `2026-11-15/home.json` |
| /room | 60 (TBT 6,2 s, PRD v5.5) | 95 / 100 / 96 / 100 | 95, 91, 95 | 2,1 s | 2,4 s | 90 ms | 0 | `2026-11-15/room.json` |
| /library | 84 (CLS 0,327) | 100 / 100 / 100 / 100 | 100, 100, 100 | 1,3 s | 1,7 s | 0 ms | 0 | `2026-11-15/library.json` |
| /stats | — (chưa đo) | 100 / 100 / 100 / 100 | 100, 98, 100 | 1,2 s | 1,6 s | 0 ms | 0 | `2026-11-15/stats.json` |
| /account | — (chưa đo) | 100 / 100 / 100 / 100 | 100, 100, 100 | 1,3 s | 1,8 s | 20 ms | 0 | `2026-11-15/account.json` |
| /about | — (chưa đo) | 100 / 100 / 100 / 100 | 100, 100, 100 | 1,3 s | 1,7 s | 0 ms | 0 | `2026-11-15/about.json` |

`/stats`, `/account` đo ở chế độ khách (lời mời đăng nhập / form). `/room` Best Practices 96 lúc đo do chữ chú thích 11 px (nhãn vùng bấm `.hot .tag`, `.nav-arrow .tag`, tooltip `.tb-tip`, nhãn `.mode` trên header) lấy từ prototype — chỉ 31,65% chữ ≥ 12 px; đã nâng lên 12 px (PRD v5.10), đo lại trên bản build ở máy: Best Practices 100, 100% chữ đủ cỡ.

## Nhật ký tối ưu

| Ngày | Vấn đề (Lighthouse) | Thay đổi | File | Commit / PR | Người |
|---|---|---|---|---|---|
| 14–15/11 | `/room` Performance 60, TBT 6,2 s: dựng toàn bộ âm thanh tổng hợp lúc mở trang | Dựng âm thanh sau cú nhấp/phím đầu tiên, mỗi nguồn một tác vụ; font không chặn hiển thị (thay quyết định "cách 2" — PRD v5.5) | `engine/legacy/roomEngine.js` (khối AUDIO ENGINE), `index.html` | a8ebd6a · #19 | Hưng |
| 15/11 | "Đã ghi lỗi vào console" (401 khi khách gọi `/auth/refresh`); thiếu `robots.txt` | Khách chưa từng đăng nhập không gọi refresh; thêm `robots.txt` | `lib/api.ts`, `public/robots.txt` | 798acea · #20 | Hưng |
| 15/11 | CSS chính chặn hiển thị | Plugin build nhúng CSS chính vào `index.html` | `vite.config.ts` | 7a0b305 · #21 | Hưng |
| 15/11 | File không tồn tại trả `index.html` (lỗi MIME, SEO) | Vercel chỉ chuyển về `index.html` cho đường dẫn không có dấu chấm | `vercel.json` | 4f3cabc · #26 | Hưng |
| 15/11 | LCP Trang chủ (ảnh đầu trang) tải muộn | Tải trước ảnh LCP ngay khi đọc HTML | `index.html` | e3ddd5e · #27 | Hưng |
| 15/11 | `/library` CLS: khung chờ khác kích thước thẻ thật | Khung chờ cùng kích thước, chừa sẵn dòng "N đồ vật" | `areas/study/pages/Library.tsx` | f906c50 · #32 | Hưng |
| 15/11 | CLS: thanh điều hướng hiện muộn, đẩy trang xuống | `Suspense` đặt trong khung trang | `areas/study/components/Layout.tsx` | e5b8800 · #36 | Hưng |
| 15/11 | Ảnh xem trước nặng; JS Thư viện kéo theo Zod (~14 KiB) | Bỏ siêu dữ liệu ảnh; Thư viện chỉ lấy phần catalog của `shared` | `public/previews/`, `Library.tsx` | 4c98e5a, 81200ff · #37, #38 | Hưng |
| 15/11 | CLS 0,327 do đổi font giữa chừng | Tải CSS Google Fonts kiểu thường với `display=optional` | `index.html` | d82663b · #39 | Hưng |
| 15/11 | CSS Google Fonts chặn hiển thị 0,9–1,8 s; ảnh xem trước còn 98 KiB siêu dữ liệu `caBX` | Tự host Be Vietnam Pro (OFL, woff2 theo bộ chữ, `optional`, tải trước 400/700); bỏ `caBX` (101,5 KB → 3,5 KB) | `public/fonts/`, `styles/index.css`, `index.html`, `public/previews/` | 9994510, 599b7fa · #40 | Thịnh |
| 15/11 | CLS 0,327 trên Chrome desktop: thanh cuộn xuất hiện muộn làm nội dung lệch | `scrollbar-gutter: stable` (Căn phòng đặt lại `auto`); Thư viện cao tối thiểu một màn hình; E2E `uc07-thu-vien-cls.spec.ts` | `styles/index.css`, `engine/room.css`, `Library.tsx` | 4001f9f · #41 | Thịnh |
| 15/11 | Import vòng qua `@focuspace/shared/src/catalog` | `shared` khai báo `"sideEffects": false`, Thư viện import `@focuspace/shared` như nơi khác (kích thước JS không đổi, không lẫn Zod) | `shared/package.json`, `Library.tsx` | nhánh `chore/don-toi-uu` | Thịnh |
| 15/11 | `/room` Best Practices 96: chỉ 31,65% chữ ≥ 12 px (nhãn chú thích 11 px từ prototype) | Nâng nhãn vùng bấm, nhãn mũi tên, tooltip, nhãn `.mode` lên 12 px — Best Practices 100 (PRD v5.10) | `areas/study/engine/room.css` | nhánh `fix/chu-nhan-12px` | Thịnh |
| 17/11 | Chữ nét 500, 600 (menu, nút, tên phòng, giờ Pomodoro) hiện bằng Segoe UI: với `optional`, chỉ 400/700 được tải trước nên 500/600 về trễ | Tải trước thêm 500, 600 (Latin + tiếng Việt, ~68 KB); E2E AC-12.6 đo font thật trình duyệt dùng | `index.html` | (PR sắp mở) | Thịnh |

## Ghi chú đo

- **Tải trước thêm font 500, 600 (17/11)** — đo trên bản build `vite preview` ở máy, mobile, mỗi trang 3 lần, trước → sau: Performance `/` 95 → 93–94, `/library` 95–98 → 94, `/about` 97–98 → 96, `/room` 83–90 → 83–89; LCP chậm thêm khoảng 0,3 giây do 4 file font tải cùng lúc với ảnh đầu trang; CLS vẫn 0; Accessibility, SEO 100. `/library` Best Practices 96 ở cả hai bản vì `vite preview` không có backend (lỗi gọi API ghi vào console), không liên quan font. Đổi lại toàn bộ chữ hiện đúng Be Vietnam Pro.
- **Font tự host (PR #40)** — đo trên bản build `vite preview` ở máy, mỗi trang 3 lần: Performance `/` 93 → 95, `/library` 92–93 → 95–96, `/about` 93–94 → 97; FCP khoảng 2,55 s → 1,9 s. Bản Vercel `/library` trước thay đổi: 88 / 96 / 91.
- **CLS do thanh cuộn (PR #41)** — Lighthouse headless và mobile ẩn thanh cuộn nên đo CLS 0; Chrome desktop trên Windows hiện thanh cuộn nên thấy lỗi. Đo bằng PerformanceObserver khi hiện thanh cuộn, viewport 1280×800: `/library` 0,352 → 0 (kể cả API chậm 1,2 giây), `/account` 0,036 → 0,020, `/stats` 0,058 → 0,032, `/` và `/about` 0.
- `prototype/so-sanh-lighthouse/` là bằng chứng đo cách 1 / cách 2 trên prototype (07–13/11), giữ nguyên.
