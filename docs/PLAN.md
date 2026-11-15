# FocuSpace — Kế hoạch triển khai (PLAN.md)

> Trạng thái: **Đã duyệt** ở buổi họp kế hoạch 13/11/2026 · rút gọn 14/11/2026 · PA B cho Căn phòng 15/11/2026.
> Nguồn: đề bài `docs/references/Web Basic - Final Project Brief - CSB25022 - VNUK.docx` · `docs/PRD.md` · `docs/ARCHITECTURE.md` · `docs/API.md` · `docs/DATABASE.md` · `prototype/`.
> Quy tắc nguồn: đề bài đồ án > PRD > prototype. Hành vi giao diện của Căn phòng lấy theo prototype.

## 1. Đối chiếu tiêu chí chấm điểm

| Task | Tiêu chí (điểm) | Đáp ứng trong tài liệu | Sản phẩm phải có khi nộp | Sprint · Phase |
|---|---|---|---|---|
| — | Phân tích hệ thống: UC, đặc tả, Activity, Sequence, Class (không có trong đề bài CSB25022, dùng cho báo cáo) | Chương 1 Phân tích hệ thống | `docs/analysis/FocuSpace_Diagrams.drawio`, `docs/analysis/FocuSpace_Chuong2_PhanTich.docx` | ✅ S2 |
| 1a | Họp phân vai (0) | PLAN §2 | Biên bản họp `docs/meetings/` (27/10, 13/11) | ✅ S1 |
| 1b | Wireframe (0,5) | PRD 5.3 (bố cục 6 trang) | Wireframe Figma 6 trang, desktop + mobile (link Figma [Cần bổ sung]); bản xuất PNG + bản draw.io bổ sung trong `docs/wireframes/` | ✅ S1 |
| 1c | Kế hoạch, mốc, deadline (0,5) | PLAN §3, PRD 7.2 | Bảng sprint có ngày, người phụ trách; milestone trên GitHub | ✅ S2 (cập nhật 13/11) |
| 1d | Repo GitHub, nhánh, ticket (0,5) | Kiến trúc 4.2, PLAN §4 | Repo, nhánh chủ đề, Issues, bảng GitHub Projects, mọi thành viên commit đều | S3 → S5 |
| 1e | GitHub Workflow, commit đúng chuẩn (0,5) | Kiến trúc 4.2, PLAN §4 | Conventional Commits có số issue, PR liên kết issue, CI GitHub Actions | S3 → S5 |
| 2a | ≥ 3 trang theo wireframe, liên kết với nhau (1) | PRD Tính năng J | 6 trang: Trang chủ, Căn phòng, Thư viện, Thống kê, Tài khoản, Giới thiệu & Liên hệ | S4, S5 · P5, P7 |
| 2b | Tailwind CSS (0,5) | PRD 6.3, Kiến trúc 3.2 | Tailwind cấu hình trong `frontend/`, giao diện dùng utility class | S4 · P5 |
| 2c | Tương tác bằng JavaScript (1) | PRD Tính năng A–L | Kéo thả, popover, mixer, Pomodoro, form có kiểm tra dữ liệu, bộ lọc Thư viện, hộp thoại xác nhận | S4, S5 |
| 2d | Responsive (0,5) | PRD 6.3 | E2E chụp màn hình ở 375, 768, 1280 px | S4 → S5 · P8 |
| 3a | Thiết kế schema (0,5) | DATABASE §2–3, Kiến trúc Hình 4 (drawio trang ERD) | ERD trong README, `schema.prisma` | S3 · P6 |
| 3b | Tích hợp PostgreSQL, CRUD (0,5) | API 4.2–4.11, DATABASE §4 | Tạo/đọc/sửa/xóa tài khoản và trạng thái phòng chạy thật | S3 → S5 · P6 |
| 3c | ≥ 2 trang động từ CSDL (1) | PRD Tính năng K, L; API 4.12–4.14 | Thư viện (lọc theo phòng, nhóm), Thống kê (theo khoảng thời gian) | S5 · P7 |
| Nộp | Migration + seeder | DATABASE §3.7, 3.8, §6 | `prisma/migrations/`, `prisma/seed.ts` nạp 17 đồ vật, 5 khung cảnh | S3 · P6 |
| 4a | Google Lighthouse (0,5) | PRD 6.1 | Báo cáo trước/sau tối ưu trong `docs/reports/lighthouse/`, ≥ 90 | S5 · P8 |
| 4b | Tracking & logging (0,5) | PRD Tính năng M, Kiến trúc 4.1 | Google Analytics 4, Sentry frontend + backend, log JSON | S5 · P8 |
| 5a | Góp ý cho ≥ 2 nhóm khác (1) | PLAN §5 | Báo cáo góp ý trong `docs/reviews/given/` | S5 |
| 5b | Sửa theo góp ý nhận được (1) | PLAN §5 | `docs/reviews/received.md`: góp ý → quyết định → PR hoặc lý do | S5 |
| Nộp | README ở thư mục gốc | PLAN §6 (P8) | Cách chạy, tổng quan và công cụ, tính năng + ảnh, ERD, thông tin khác | S5 · P8 |
| Nộp | Video demo ≤ 10 phút, MP4 ≥ 720p | PLAN §6 (P8) | Video trên YouTube (unlisted/public) thể hiện mọi tiêu chí | S5 · P8 |
| Cá nhân | Self-report 5 sprint (thiếu −10%) | PLAN §3 | `docs/reports/sprint-N/<tên>.md` mỗi sprint, mỗi người (S1, S2 viết bù) | S1 → S5 |

## 2. Phân vai (Task 1a)

Nhóm 4 người, họp khởi động 27/10/2026 (biên bản: `docs/meetings/2026-10-27-khoi-dong.md`); phân vai khu vực chốt lại ở buổi họp kế hoạch 13/11/2026 (`docs/meetings/2026-11-13-hop-ke-hoach.md`). Phân công theo **khu vực sản phẩm**: mỗi người làm trọn khu vực của mình từ giao diện, engine tới backend liên quan, để ai cũng có commit ở cả frontend lẫn backend (đề bài Task 2, Task 3 yêu cầu mỗi thành viên làm một phần UI và một module backend).

| Thành viên | Khu vực phụ trách (nhóm đã chốt) | Frontend / engine | Backend & CSDL (chốt 13/11) | Việc chung (chốt 13/11) |
|---|---|---|---|---|
| **Tuấn Hưng** | Đồ vật, bảng đồ vật, âm thanh | `shared/src/catalog.ts` (17 loại đồ vật), `shared/src/spatial.ts` (BR-07); `areas/items-audio/engine/placement.ts` (BR-03→06); trong `engine/legacy/roomEngine.js`: AUDIO ENGINE (AudioContext, âm tổng hợp, Lo-fi, định tuyến), SPRITES ĐỒ VẬT, khay đồ vật, kéo thả, POPOVER đồ vật, Volume mixer — UC.03, UC.04 | Bảng `item_types`, phần đồ vật của seeder; `GET /catalog/items` (CatalogService.layDoVat) | Lighthouse phần Căn phòng (âm thanh, tải lười Lo-fi); review chéo nhóm A |
| **Đình Nhiên** | Sân vườn | `shared/src/scenes.ts` (5 khung cảnh); trong `engine/legacy/roomEngine.js`: SÂN VƯỜN (5 khung cảnh, cây, xích đu, nhà gỗ, lá/tuyết rơi, âm nền 5 cảnh, khay Khung cảnh, cửa nhà → Phòng học); `areas/garden/telemetry.ts`, `observability.ts` — UC.01 (phần Sân vườn), UC.02 (khung cảnh) | Bảng `scenes`, phần khung cảnh của seeder; `GET /catalog/scenes`; `POST /telemetry/batch` (TelemetryService) + `areas/garden/telemetry.ts` | Google Analytics 4, Sentry (Phase 8); review chéo nhóm A |
| **Tuấn Lộc** | Phòng ngủ | `areas/bedroom/engine/sleepTimer.ts`; trong `engine/legacy/roomEngine.js`: PHÒNG NGỦ (cửa sổ 3 thời tiết, rèm, đồng hồ tường, đèn ngủ, thảm, kệ, giường mèo) và giao diện Hẹn giờ ngủ; `shared/src/migrate.ts`; trang Thống kê `areas/bedroom/pages/Stats.tsx` (chuyển từ Thịnh, chốt 13/11) — UC.02 (Phòng ngủ), UC.06, UC.10 | Auth: `register`, `login`, `refresh`, `logout` (AuthService, Argon2id, JWT, cookie); `GET/PATCH/DELETE /me`; `GET /me/stats` (StatsService) | Tổng hợp báo cáo Lighthouse 6 trang; test E2E responsive; review chéo nhóm B |
| **Phúc Thịnh** | Phòng học, quản lý repo, các trang còn lại | `areas/study/engine/rooms.ts` (chuyển phòng), `pomodoro.ts`, `markup.ts`, `room.css` (khung Căn phòng); trong `engine/legacy/roomEngine.js`: PIXEL HELPERS, LỚP TĨNH, LỚP HOẠT HỌA của Phòng học (bàn, nhân vật, cửa sổ 4 thời tiết, rèm, lò sưởi trái/phải, thảm, đèn), giao diện Pomodoro, KHỞI ĐỘNG; `shared/src/roomState.ts`; 4 trang Trang chủ, Thư viện, Tài khoản, Giới thiệu & Liên hệ + 404, NavBar, Footer (`areas/study/pages`, `components`) — UC.01, UC.02 (Phòng học), UC.05, UC.07, UC.08, UC.11, UC.12 (giao diện) | `schema.prisma` + migration đầu; `GET/PUT /room-state` (RoomStateService) + `areas/study/roomSync.ts`, hộp thoại hợp nhất — UC.09 | PM: repo GitHub, nhánh bảo vệ, Projects, milestone, CI, duyệt PR; biên bản họp; tạo tài khoản GA4, Sentry, Vercel, Render, Neon; triển khai; README; dựng video; review chéo nhóm B |

Quy ước phối hợp:

- **Chủ sở hữu thư mục:** code chia theo khu vực ở `frontend/src/areas/{items-audio, garden, bedroom, study}/` và `backend/src/areas/` cùng tên (Hưng, Nhiên, Lộc, Thịnh); phần chung do Thịnh giữ. Mỗi người chỉ sửa thư mục của mình; sửa phần của người khác thì mở PR và gán người đó duyệt. Phần dùng chung (`shared/`, `frontend/src/{App.tsx, main.tsx, lib/, store/, styles/}`, `frontend/src/engine/legacy/roomEngine.js`, `backend/src/{app.ts, routes/, middleware/, lib/}`, `backend/prisma/`) do Phúc Thịnh giữ; mỗi người vẫn sửa khối của mình trong `roomEngine.js`, PR gán Thịnh duyệt.
- **Căn phòng theo PA B (chốt 15/11/2026):** vẽ canvas, âm thanh, khay, popover giữ trong `frontend/src/engine/legacy/roomEngine.js` (nguồn logic hiện hành, đã có các thay đổi PRD v5.5–v5.8); chỉ quy tắc nghiệp vụ (BR/AC) được tách thành hàm thuần TypeScript trong `areas/<khu-vực>/engine/` kèm unit test, engine import và gọi lại (`frontend/src/engine/legacy/README.md`).
- **Giao diện giữa các khu vực:** `RoomState` (`shared/src/roomState.ts`), hàm thuần của từng khu vực mà engine gọi lại (`rooms.ts`, `pomodoro.ts`, `sleepTimer.ts`, `placement.ts`), sự kiện telemetry `TelemetryApi` (`areas/garden/telemetry.ts`), thông báo ngắn từ engine qua sự kiện `focuspace:notice`.
- Mỗi người: ≥ 1 commit mỗi ngày làm việc, self-report cuối mỗi sprint (`docs/reports/sprint-N/<tên>.md`).
- Danh sách task chi tiết theo người và sprint: `docs/TASKS.md` (mỗi dòng = 1 GitHub Issue).

## 3. Lịch sprint và mốc (Task 1c)

Dự án bắt đầu **27/10/2026** (họp khởi động), **hạn hoàn thành 27/11/2026**. Đề bài yêu cầu 5 sprint: S1–S2 là giai đoạn thiết kế và lập kế hoạch (**đã xong**), S3–S5 là giai đoạn lập trình, mỗi sprint 5 ngày. Mỗi sprint là một milestone trên GitHub; cuối sprint mỗi thành viên nộp self-report (`docs/reports/sprint-N/<tên>.md`: việc đã làm kèm link issue/PR hoặc file, khó khăn, việc sprint sau). Self-report S1, S2 viết bù trong S3 (link tới file Figma, prototype, tài liệu trong `docs/`). Họp ngắn 15 phút mỗi tối (online) và họp tổng kết cuối mỗi sprint.

| Sprint | Ngày | Phase | Kết quả cuối sprint (mốc) | Hưng | Nhiên | Lộc | Thịnh |
|---|---|---|---|---|---|---|---|
| S1 ✅ | 27/10–07/11 | Thiết kế | Họp khởi động 27/10; wireframe Figma 6 trang; prototype Căn phòng (`prototype/FocuSpace-Semi-Sandbox.html`); PRD v5.0 duyệt 07/11 | Thiết kế đồ vật, bảng đồ vật, âm thanh trên Figma/prototype | Thiết kế Sân vườn | Thiết kế Phòng ngủ | Thiết kế Phòng học, các trang còn lại; dựng prototype |
| S2 ✅ | 08/11–12/11 | Kế hoạch | PLAN, Kiến trúc, API, DATABASE; Chương 1 Phân tích hệ thống (UC, đặc tả, Activity, Sequence, Class); prototype 6 trang | Góp nội dung đồ vật, âm thanh cho PRD/API | Góp nội dung Sân vườn | Góp nội dung Phòng ngủ | Viết PLAN, tài liệu, phân tích hệ thống |
| S3 | 13–17/11 | 0, 1, 2, 6 (bước 1–2) | Repo + Projects + mẫu issue/PR + bảo vệ nhánh; monorepo chạy, CI lint/test; khung test (test-first); `shared/`, logic engine có test; `schema.prisma`, migration đầu, seeder 17 + 5 | Khung test đồ vật, âm thanh; `catalog.ts`, `placement.ts`, `spatial.ts`; seeder đồ vật | Khung test telemetry; `defaults.ts` Sân vườn; seeder khung cảnh | Khung test auth; `sleepTimer.ts`; `migrate.ts` | Repo, CI, monorepo; chốt giao diện giữa các khu vực; `roomState.ts`, `rooms.ts`, `pomodoro.ts`; `schema.prisma`, migration |
| S4 | 18–22/11 | 3, 4, 5, 6 (bắt đầu) | Ba không gian giống prototype ở chế độ khách; âm thanh không gian; Trang chủ, Giới thiệu bằng Tailwind; điều hướng 6 trang; endpoint auth, catalog, telemetry có test | Âm thanh, khay, kéo thả, mixer; `/catalog/items` | Render Sân vườn, ScenePicker, âm cảnh; `/catalog/scenes`, telemetry | Render Phòng ngủ, Hẹn giờ ngủ; auth | Render Phòng học, Header/Toolbar, lưu cục bộ, Trang chủ, Giới thiệu, NavBar/Footer |
| S5 | 23–27/11 | 6 (còn lại), 7, 8 | Đủ 14 endpoint; Tài khoản, Thư viện, Thống kê lấy dữ liệu thật; đồng bộ; góp ý 2 nhóm khác + sửa theo góp ý; Lighthouse ≥ 90; GA4, Sentry; README; video; **nộp bài 27/11** | Review nhóm A; tối ưu Căn phòng | Gửi telemetry; review nhóm A; GA4, Sentry | `/me`, `/me/stats`, trang Thống kê; review nhóm B; Lighthouse, E2E responsive | `/room-state`, sync, hộp thoại hợp nhất; trang Thư viện, Tài khoản; triển khai Vercel + Render + Neon; review nhóm B; README, video, `received.md`, nộp bài |

**Mốc demo cho giảng viên: Chủ nhật 15/11/2026** (chốt 13/11). Code nền đã có từ 13/11: monorepo, `shared/` có test, backend đủ 14 endpoint + Prisma + seeder, frontend React 6 trang nối API, Căn phòng chạy từ engine prototype (`frontend/src/engine/legacy/`) kèm đồng bộ `/room-state`. Từ 14/11: chạy thử, sửa lỗi, rồi tách engine thành module theo `frontend/src/engine/legacy/README.md`.

Đường găng (critical path): giao diện giữa các khu vực (đầu S3) → `shared/roomState.ts` (S3) → render từng phòng (S4) → sync (S5). S5 nặng nhất, nên review chéo bắt đầu ngay khi có bản chạy được ở cuối S4. Nếu trễ, cắt theo PRD §8.2: dời P1 (xung đột hai thiết bị, xóa tài khoản) trước, giữ đủ tiêu chí chấm điểm.

## 4. Quy trình GitHub (Task 1d, 1e)

Chi tiết ở Kiến trúc 4.2. Tóm tắt:

- `main` được bảo vệ: chỉ merge qua Pull Request, CI xanh, ≥ 1 người duyệt.
- Mỗi việc = 1 Issue (nhãn loại, khu vực, P0/P1, milestone sprint) = 1 nhánh `feat/<số>-<mô-tả>` (hoặc `fix/`, `docs/`, `test/`, `chore/`) = 1 PR có `Closes #<số>`.
- Commit: `<type>(<phạm vi>): <mô tả> (#<số>)`, mỗi commit một thay đổi; merge commit để giữ lịch sử.
- `.github/`: `ISSUE_TEMPLATE/feature.md`, `ISSUE_TEMPLATE/bug.md`, `pull_request_template.md`, `workflows/ci.yml`.

## 5. Review chéo UI/UX (Task 5)

- S5 (ngày đầu): mỗi nhóm review ≥ 2 nhóm khác theo 3 tiêu chí của đề bài (usability, aesthetics, user-friendliness); báo cáo `docs/reviews/given/<tên-nhóm>.md` gồm điểm mạnh, đề xuất cải thiện, ảnh minh họa.
- S5 (cuối): gom góp ý nhận được vào `docs/reviews/received.md`, bảng: góp ý · người góp ý · quyết định (làm / không làm) · PR hoặc lý do không làm. Mỗi góp ý được làm có issue riêng.

## 6. Các phase và cách kiểm tra

Cấu trúc thư mục thật và cách chạy xem `README.md`; công nghệ xem Kiến trúc §3.2. Code chia theo 4 khu vực `frontend/src/areas/<khu-vực>/` và `backend/src/areas/<khu-vực>/` (§2); Căn phòng chạy bằng engine `frontend/src/engine/legacy/roomEngine.js`, quy tắc nghiệp vụ tách thành hàm thuần có test (PA B, §2).

| Phase | Nội dung | Sprint | Kiểm tra | Trạng thái |
|---|---|---|---|---|
| P0 Khởi tạo & khung test | Repo, nhánh bảo vệ, Projects, mẫu issue/PR, CI; monorepo (`shared`, `backend`, `frontend`), ESLint, Prettier, Vitest, Playwright; khung test: mỗi BR/AC ở PRD 5.4 là một test, E2E đặt tên `ucXX-<tên>.spec.ts` | S3 | CI xanh; `GET /api/v1/health` trả 200 | ✅ |
| P1 Dữ liệu dùng chung | `shared/`: catalog 17 đồ vật + 5 khung cảnh, RoomState v4 (Zod), migrate dữ liệu prototype → v4 | S3 | Unit test migrate, catalog | ✅ |
| P2 Logic engine | spatial (BR-07), placement (BR-03→06), pomodoro (BR-01), sleepTimer (BR-02), rooms | S3–S4 | Unit test từng BR | ✅ hàm thuần đã tách, engine gọi lại (15/11) |
| P3 Render | Vẽ canvas ba không gian, giữ nguyên toạ độ, màu của prototype | S4 | So ảnh chụp với prototype | ✅ giữ trong `roomEngine.js` (PA B, không tách) |
| P4 Âm thanh | AudioContext sau cú nhấp đầu, chuỗi xử lý mỗi nguồn, nhạc Lo-fi, cross-fade 0,3 s | S4 | Unit test công thức (`shared/src/spatial.ts`), E2E AC-03.x, nghe thử | ✅ giữ trong `roomEngine.js` (PA B, không tách) |
| P5 Giao diện & lưu cục bộ | Tailwind, 6 route + 404, NavBar/Footer, khung Căn phòng, LocalStorage `focuspace.room.v4`, responsive 3 cỡ | S4 | E2E theo UC, chụp 375/768/1280 px | ✅ bản đầu |
| P6 Backend & CSDL | `schema.prisma`, migration, seeder; 14 endpoint theo API Docs; rate limit, log, lỗi chuẩn | S3–S5 | Integration test (Supertest + PostgreSQL) | ✅ migration; endpoint theo khu vực |
| P7 Tài khoản, đồng bộ & trang động | Tự refresh token, Tài khoản, đồng bộ `/room-state` + hộp thoại hợp nhất + 409, telemetry, Thư viện, Thống kê | S5 | E2E UC.07–UC.11 | Đang làm |
| P8 Tối ưu, theo dõi & nộp bài | Lighthouse trước/sau ≥ 90 (cách 2: title + meta); GA4 + Sentry; triển khai Vercel + Render + Neon (Kiến trúc §3.5); sửa theo góp ý; README; video ≤ 10 phút | S5 | Đối chiếu bảng §1 và AC PRD 5.4 | Đã triển khai (14/11); Lighthouse đang tối ưu |

## Nguyên tắc chung

- Bám tài liệu đã duyệt, không thiết kế lại; hình vẽ canvas và âm thanh **chuyển nguyên từ prototype**, không vẽ lại.
- Không tự thêm dữ liệu: seeder chỉ nạp danh mục lấy từ prototype (BR-12), không có tài khoản demo hay số liệu mẫu (Q-13).
- YAGNI · KISS · DRY: chỉ làm P0/P1 (PRD §7.1); không làm Phase 2 (quên mật khẩu, Q-01, Q-02, Q-06).
- Mỗi PR ghi mã UC; tài liệu chỉ giữ bản `.md`; không sửa `prototype/`.

## Lịch sử thay đổi

| Ngày | Thay đổi |
|---|---|
| 08/11/2026 | Bản nháp đầu. |
| 10–13/11/2026 | Đối chiếu đề bài CSB25022; đồng bộ Chương 1 Phân tích hệ thống; phân vai 4 khu vực, lịch 5 sprint từ 27/10 → 27/11; chốt triển khai Vercel + Render + Neon; mốc demo 15/11; code chia 4 thư mục khu vực. Duyệt ở buổi họp 13/11. |
| 14/11/2026 | Rút gọn: bỏ cây thư mục và tech stack cũ (đã có ở README, Kiến trúc), gộp Phase 0–8 thành bảng §6 kèm trạng thái, bỏ mục "Review kế hoạch" (R1–R11 đã giải quyết), sửa đường dẫn engine. |
| 15/11/2026 | Chốt PA B cho Căn phòng: giữ vẽ/âm thanh trong `roomEngine.js`, chỉ tách hàm thuần (rooms, pomodoro, sleepTimer, placement) có test; §2 ghi đúng đường dẫn thật; §6 cập nhật trạng thái P2–P4. |
