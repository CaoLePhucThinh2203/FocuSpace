# FocuSpace — Kế hoạch triển khai (PLAN.md)

> Trạng thái: **Đã duyệt** ở buổi họp kế hoạch 13/11/2026 · bản đầu 08/11/2026 · cập nhật 13/11/2026 (lần 2): lịch tính từ 27/10/2026, S1–S2 đã xong (họp, Figma, prototype, tài liệu kế hoạch) · cập nhật 13/11/2026: phân vai 4 thành viên, lịch 2 tuần (hạn 27/11/2026), Phase 0 test-first · cập nhật 10/11/2026 theo đề bài đồ án `docs/Web Basic - Final Project Brief - CSB25022 - VNUK.docx` · cập nhật 12/11/2026 theo Chương 1 Phân tích hệ thống
> Nguồn: `docs/PRD.md` · `docs/ARCHITECTURE.md` · `docs/API.md` · `docs/DATABASE.md` · `prototype/FocuSpace-Semi-Sandbox.html` · `prototype/web/` · `docs/analysis/FocuSpace_Diagrams.drawio`, `docs/analysis/FocuSpace_Chuong2_PhanTich.docx` (Chương 1 Phân tích hệ thống)
> Quy tắc nguồn: đề bài đồ án > PRD > prototype > tài liệu cũ. Hành vi giao diện của Căn phòng lấy theo prototype.

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
| Nộp | README ở thư mục gốc | PLAN Phase 8 | Cách chạy, tổng quan và công cụ, tính năng + ảnh, ERD, thông tin khác | S5 · P8 |
| Nộp | Video demo ≤ 10 phút, MP4 ≥ 720p | PLAN Phase 8 | Video trên YouTube (unlisted/public) thể hiện mọi tiêu chí | S5 · P8 |
| Cá nhân | Self-report 5 sprint (thiếu −10%) | PLAN §3 | `docs/reports/sprint-N/<tên>.md` mỗi sprint, mỗi người (S1, S2 viết bù) | S1 → S5 |

## 2. Phân vai (Task 1a)

Nhóm 4 người, họp khởi động 27/10/2026 (biên bản: `docs/meetings/2026-10-27-khoi-dong.md`); phân vai khu vực chốt lại ở buổi họp kế hoạch 13/11/2026 (`docs/meetings/2026-11-13-hop-ke-hoach.md`). Phân công theo **khu vực sản phẩm**: mỗi người làm trọn khu vực của mình từ giao diện, engine tới backend liên quan, để ai cũng có commit ở cả frontend lẫn backend (đề bài Task 2, Task 3 yêu cầu mỗi thành viên làm một phần UI và một module backend).

| Thành viên | Khu vực phụ trách (nhóm đã chốt) | Frontend / engine | Backend & CSDL (chốt 13/11) | Việc chung (chốt 13/11) |
|---|---|---|---|---|
| **Tuấn Hưng** | Đồ vật, bảng đồ vật, âm thanh | `shared/catalog.ts` (17 loại đồ vật); `engine/logic/placement.ts` (BR-03→06), `spatial.ts` (BR-07); `engine/audio/*` (AudioContext, đồ thị âm, âm tổng hợp, Lo-fi, định tuyến); khay đồ vật, kéo thả, popover đồ vật, Volume mixer; hàm vẽ hình xem trước đồ vật (dùng lại ở Trang chủ, Thư viện) — UC.03, UC.04 | Bảng `item_types`, phần đồ vật của seeder; `GET /catalog/items` (CatalogService.layDoVat) | Lighthouse phần Căn phòng (âm thanh, tải lười Lo-fi); review chéo nhóm A |
| **Đình Nhiên** | Sân vườn | `engine/render/out` (5 khung cảnh, cây, xích đu, nhà gỗ, lá/tuyết rơi); âm nền 5 cảnh; ScenePicker (lưới ảnh xem trước); cửa nhà → Phòng học; tai nghe và Pomodoro mini ở Sân vườn — UC.01 (phần Sân vườn), UC.02 (khung cảnh) | Bảng `scenes`, phần khung cảnh của seeder; `GET /catalog/scenes`; `POST /telemetry/batch` (TelemetryService) + `persistence/telemetry.ts` | Google Analytics 4, Sentry (Phase 8); review chéo nhóm A |
| **Tuấn Lộc** | Phòng ngủ | `engine/render/bed` (cửa sổ 3 thời tiết, rèm, đồng hồ tường, đèn ngủ, thảm, kệ, giường mèo); `engine/logic/sleepTimer.ts` và giao diện Hẹn giờ ngủ; trang Thống kê `pages/Stats` (chuyển từ Thịnh, chốt 13/11) — UC.02 (Phòng ngủ), UC.06, UC.10 | Auth: `register`, `login`, `refresh`, `logout` (AuthService, Argon2id, JWT, cookie); `GET/PATCH/DELETE /me`; `GET /me/stats` (StatsService) | Tổng hợp báo cáo Lighthouse 6 trang; test E2E responsive; review chéo nhóm B |
| **Phúc Thịnh** | Phòng học, quản lý repo, các trang còn lại | `engine/render/static`, `sprites`, `animation`, `lighting` của Phòng học (bàn, nhân vật, cửa sổ 4 thời tiết, rèm, lò sưởi trái/phải, thảm, đèn); `engine/logic/rooms.ts` (chuyển phòng), `pomodoro.ts`; khung Căn phòng (Header, Toolbar, store Zustand); 4 trang Trang chủ, Thư viện, Tài khoản, Giới thiệu & Liên hệ + 404, NavBar, Footer — UC.01, UC.02 (Phòng học), UC.05, UC.07, UC.08, UC.11, UC.12 (giao diện) | `schema.prisma` + migration đầu; `GET/PUT /room-state` (RoomStateService) + `persistence/sync.ts`, hộp thoại hợp nhất — UC.09 | PM: repo GitHub, nhánh bảo vệ, Projects, milestone, CI, duyệt PR; biên bản họp; tạo tài khoản GA4, Sentry, Vercel, Render, Neon; triển khai; README; dựng video; review chéo nhóm B |

Quy ước phối hợp:

- **Chủ sở hữu thư mục:** mỗi người chỉ sửa thư mục của mình; sửa phần của người khác thì mở PR và gán người đó duyệt. Phần dùng chung (`shared/`, `store/`, `ui/Header`, `ui/Toolbar`, `persistence/local.ts`) do Phúc Thịnh giữ.
- **Giao diện giữa các khu vực** (chốt đầu S3, trước khi code song song): `RoomState` (`shared/roomState.ts`), hàm vẽ mỗi phòng `drawStudy/drawBed/drawOut(ctx, state, t)`, đăng ký nguồn âm `audio.register(sourceId, node)`, sự kiện telemetry `telemetry.track(name, data)`.
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

## Nguyên tắc chung

- Bám tài liệu đã duyệt, không thiết kế lại. Hình vẽ canvas và âm thanh tổng hợp **chuyển nguyên từ prototype** sang module TypeScript, không vẽ lại.
- Không tự thêm dữ liệu. Mặc định phòng lấy đúng `DEFAULT_STATE` trong prototype và PRD. Seeder chỉ nạp danh mục có sẵn trong prototype (BR-12); dữ liệu khác thì hỏi trước.
- YAGNI · KISS · DRY: chỉ làm P0/P1 của PRD §7.1 Phase 1. Không làm hạng mục Phase 2 (quên mật khẩu, Q-01, Q-02, Q-06).
- Mỗi phase: Planning → Review → Code → Test → dừng cho người dùng duyệt.
- Mỗi PR tính năng ghi mã UC trong mô tả; test E2E đặt tên theo UC (ví dụ `uc04-sap-xep-do-vat.spec.ts`).
- Không sửa `prototype/`. Tài liệu chỉ giữ bản `.md` (cần Word thì xuất bằng pandoc).

## Tech stack (theo Kiến trúc §3.2)

| Phần | Công nghệ |
|---|---|
| Monorepo | npm workspaces: `shared`, `frontend`, `backend` |
| Shared | TypeScript, Zod (schema RoomState, migrate, danh mục) |
| Frontend | Vite, React 18, TypeScript, React Router 6, Zustand, Tailwind CSS 3, Canvas 2D, Web Audio API |
| Backend | Node.js 20, Express, Prisma (migrate + seed), Zod, Argon2id, JWT HS256, pino |
| Database | PostgreSQL 16 |
| Theo dõi | Google Analytics 4 (gtag.js), Sentry (`@sentry/react`, `@sentry/node`) |
| Test | Vitest (unit + integration), Supertest, Playwright (E2E), Lighthouse CI |

## Cấu trúc thư mục đích

```
D:\du an FocuSpace\
├── README.md                    # báo cáo nộp bài (mẫu ở Phase 8)
├── package.json                 # workspaces
├── .github/
│   ├── ISSUE_TEMPLATE/          # feature.md, bug.md
│   ├── pull_request_template.md
│   └── workflows/ci.yml
├── CLAUDE.md                    # Role · Skill · Constraint cho Claude Code
├── docs/
│   ├── PRD.md · ARCHITECTURE.md · API.md · DATABASE.md   # bản chính thức duy nhất (không còn bản Word song song)
│   ├── PLAN.md · TASKS.md       # kế hoạch, task theo người/sprint
│   ├── analysis/                # FocuSpace_Diagrams.drawio (nguồn biểu đồ UC-TQ, A1–A12, S1–S12, C1–C3, ERD) · FocuSpace_Chuong2_PhanTich.docx (Chương 1)
│   ├── images/                  # hình dùng trong PRD.md, ARCHITECTURE.md (uc-tong-quat, class-* xuất từ drawio)
│   ├── wireframes/              # FocuSpace_Wireframes.drawio + PNG (bản bổ sung cho Figma)
│   ├── meetings/                # biên bản họp (2026-10-27 khởi động, 2026-11-13 kế hoạch)
│   ├── reports/                 # sprint-1 … sprint-5 (self-report), lighthouse/
│   ├── reviews/                 # given/, received.md
│   └── references/              # đề bài CSB25022, PlanDesignWeb.docx — chỉ đọc
├── prototype/                   # không sửa
│   ├── FocuSpace-Semi-Sandbox.html   # bản gốc Căn phòng (đã duyệt 07/11) — nguồn logic, hằng số khi chuyển sang React
│   ├── web/                     # prototype 6 trang: Căn phòng viết bằng Tailwind (phương án 2) + tối ưu Lighthouse cách 2 (title, meta)
│   └── so-sanh-lighthouse/      # bằng chứng đo trước/sau: cách 1 (dựng Lo-fi sau cú nhấp) và cách 2 (title + meta, đã chọn)
├── shared/src/
│   ├── catalog.ts               # 17 loại đồ vật, 5 khung cảnh — nguồn cho engine và seeder
│   ├── constants.ts             # 320×180, DESK, SLOTS, SHELF_SLOTS, điểm nghe
│   ├── roomState.ts             # Zod schema RoomState v4 (API Phụ lục A)
│   ├── defaults.ts              # trạng thái mặc định (từ prototype)
│   └── migrate.ts               # dữ liệu cũ → v4
├── frontend/
│   ├── tailwind.config.ts · postcss.config.js
│   └── src/
│       ├── pages/               # Home, Room, Library, Stats, Account, About, NotFound
│       ├── engine/logic/        # spatial, placement, pomodoro, sleepTimer, rooms
│       ├── engine/render/       # static, sprites, animation, lighting, bed, out
│       ├── engine/audio/        # context, graph, synth, lofi, routing
│       ├── store/               # Zustand
│       ├── persistence/         # local, api, sync, telemetry
│       ├── observability/       # analytics.ts (GA4), sentry.ts
│       └── ui/                  # NavBar, Footer, Header, Toolbar, Tray, Popover, Mixer, ScenePicker, RoomNav, MergeDialog
└── backend/
    ├── prisma/schema.prisma · prisma/migrations/ · prisma/seed.ts
    └── src/ app.ts (createApp({ db })), routes/, services/, middleware/
```

---

## Phase 0 — Khởi tạo & khung test (S3, 13–15/11) — test-first

- **Mục tiêu:** khung monorepo chạy được, repo GitHub và quy trình nhóm sẵn sàng; **viết khung test trước khi code** (theo quy trình PlanDesignWeb: Phase 0 là Test, thiên hướng TDD) để mỗi phase sau chỉ việc làm cho test xanh.
- **Bước:**
  1. ✅ Họp khởi động 27/10/2026; họp kế hoạch 13/11/2026 chốt phân vai (§2).
  2. ✅ Wireframe 6 trang, desktop + mobile trên Figma (S1, link [Cần bổ sung] vào PRD 5.3); bản draw.io bổ sung ở `docs/wireframes/FocuSpace_Wireframes.drawio`.
  3. (Thịnh) Tạo repo GitHub, mời thành viên; bật bảo vệ `main`; tạo nhãn, milestone S1–S5 (đóng sẵn S1, S2), bảng Projects; thêm `.github/` (mẫu issue, PR đã có sẵn trong thư mục dự án, CI); tạo Issues theo `docs/TASKS.md`.
  4. (Thịnh) Tạo `package.json` gốc (workspaces), `tsconfig.base.json`, ESLint, Prettier, Vitest, Playwright config.
  5. (Thịnh) Khởi tạo `frontend` (Vite React TS, Tailwind, React Router, proxy `/api` → `localhost:3000`) và `backend` (Express TS).
  6. **Khung test (mỗi người cho khu vực của mình, mỗi test ứng với 1 BR hoặc 1 AC ở PRD 5.4, để ở trạng thái `it.todo` / `test.fixme`):**
     - Unit (Vitest): `shared/` (migrate, roomState, catalog), `engine/logic/*` (placement BR-03→06, spatial BR-07, pomodoro BR-01, sleepTimer BR-02, rooms).
     - Integration (Vitest + Supertest): một file cho mỗi nhóm endpoint (`auth`, `me`, `roomState`, `telemetry`, `catalog`, `stats`), liệt kê đủ mã trạng thái trong API §3.2.
     - E2E (Playwright): một file cho mỗi use case, đặt tên `ucXX-<tên>.spec.ts` (UC.01 → UC.12), mỗi AC là một `test`.
  7. ✅ Viết `CLAUDE.md` (Role · Skill · Constraint). ✅ Chuyển `docs/*.docx` → `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/API.md` (ảnh trong `docs/images/`; bản Word đã bỏ ngày 13/11). ✅ Viết `docs/DATABASE.md`. ✅ PRD 5.4 Tiêu chí nghiệm thu.
- **Tham chiếu:** Kiến trúc §3.2, §4.2; PLAN §2–4; PRD 5.4; `docs/TASKS.md`.
- **Kiểm tra:** `npm run lint`, `npm test` chạy qua (test ở trạng thái todo được báo "skipped", không lỗi); `npm run dev` mở trang trắng và `GET /api/v1/health` trả 200 (khi chưa có DB: 503); CI chạy xanh trên PR đầu tiên; đếm được ≥ 1 test todo cho mỗi BR-01→13 và mỗi AC.

## Phase 1 — Dữ liệu dùng chung (`shared`) (S3)

- **Mục tiêu:** một nguồn duy nhất cho schema, danh mục, mặc định, migrate — dùng ở client, server và seeder.
- **Bước:**
  1. `catalog.ts`, `constants.ts`: chép hằng số từ prototype (mục “HẰNG SỐ PHÒNG”, `TYPES`, `SCENES`).
  2. `roomState.ts`: Zod schema RoomState v4 đúng API Phụ lục A; giới hạn 40 đồ/phòng, ≤ 1 lamp, ≤ 1 cup, ≤ 64 KB (BR-03, BR-06).
  3. `defaults.ts`: mặc định Phòng học, Phòng ngủ, Sân vườn (PRD FR-STUDY, FR-BED, FR-OUT).
  4. `migrate.ts`: chuyển định dạng LocalStorage của prototype (dạng phẳng, `ver: 3`, `bed.clock`, `shelf[]`, `slot`) → v4 lồng (`study.*`, `bed.wallClock`, `schemaVer: 4`); thêm lại đèn/ly nếu thiếu; giá trị lạ về mặc định; ép số về khoảng hợp lệ; bỏ đồ sai loại phòng.
- **Tham chiếu:** API Phụ lục A, PRD FR-SAVE-02, BR-03/05/06/12, prototype `loadState()`.
- **Kiểm tra:** unit test migrate với: rỗng, JSON hỏng, bản prototype hiện tại, bản có `shelf`/`slot` cũ, giá trị ngoài khoảng, > 40 đồ; test `catalog` đủ 17 loại, 5 cảnh.

## Phase 2 — Logic engine (TypeScript thuần) (S3)

- **Mục tiêu:** toàn bộ quy tắc nghiệp vụ tách khỏi UI, có unit test.
- **Bước:**
  1. `spatial.ts`: d, Gdist, Pan, gain (PRD FR-AUD công thức, BR-07).
  2. `placement.ts`: thứ tự đặt đồ BR-04 (6 bước), giữ đồ trong khung, giường mèo (BR-05).
  3. `pomodoro.ts`: một bộ đếm (BR-01), tính theo thời điểm kết thúc, 25/5 phút, tự chuyển chế độ.
  4. `sleepTimer.ts`: Tắt/15/30/45/60, giảm dần 2 phút cuối, hủy khi rời Phòng ngủ (BR-02).
  5. `rooms.ts`: bảng chuyển phòng, chặn lệnh khi đang chuyển.
- **Tham chiếu:** PRD §5 Tính năng A, E, F, G; BR-01→07.
- **Kiểm tra:** unit test cho từng BR (gain ≥ 0,15 ở góc xa; pan đúng dấu; mỗi nhánh BR-04; tab ẩn không trôi giờ).
- **Use case hoàn thành:** UC.04 (quy tắc đặt), UC.05, UC.06

## Phase 3 — Render (S4)

- **Mục tiêu:** ba không gian hiển thị giống prototype.
- **Bước:**
  1. Chuyển các mục “PIXEL HELPERS”, “LỚP TĨNH”, “SPRITES”, “LỚP HOẠT HỌA”, “PHÒNG NGỦ”, “SÂN VƯỜN” sang `engine/render/*`.
  2. 4 lớp: nền tĩnh vẽ một lần, hoạt họa 10 FPS, DOM đồ vật, ánh sáng 160×90; dừng vẽ khi tab ẩn.
  3. Thời tiết, rèm 3 mức, lò sưởi trái/phải (tranh dời x 58), thảm 4 họa tiết, đèn, 5 khung cảnh, 10 tranh khung ảnh.
  4. Xuất hàm vẽ hình xem trước đồ vật và khung cảnh để Trang chủ, Thư viện dùng lại (DRY).
- **Tham chiếu:** prototype (nguồn chính), PRD Tính năng B, C, D, NFR §6.1.
- **Kiểm tra:** Playwright chụp từng phòng ở trạng thái mặc định, so với ảnh chụp prototype cùng kích thước (sai khác pixel ≈ 0).
- **Use case hoàn thành:** UC.01, UC.02, UC.03 (cùng Phase 4)

## Phase 4 — Âm thanh (S4)

- **Mục tiêu:** âm thanh không gian 2D giống prototype.
- **Bước:**
  1. AudioContext chỉ tạo sau cú nhấp/phím đầu; lỗi tạo → ghi telemetry, app vẫn chạy.
  2. Chuỗi mỗi nguồn: nguồn lặp → (highpass 120 Hz cho âm ngoài cửa sổ, tivi) → âm lượng → suy giảm → pan → chuyển phòng → hẹn giờ ngủ → Master.
  3. Chuyển âm tổng hợp và nhạc Lo-fi (OfflineAudioContext, dựng nền lần lượt ngay khi mở Căn phòng như `prototype/web/room.html`; chỉ AudioContext phát âm chờ cú nhấp đầu) từ prototype.
  4. Cross-fade 0,3 s khi chuyển phòng/khung cảnh; ramp 0,2 s (Master 0,1 s); hủy node khi rời phòng/xóa đồ/rời trang Căn phòng.
- **Tham chiếu:** PRD Tính năng F, Kiến trúc §3.2, prototype “AUDIO ENGINE”, “ĐỊNH TUYẾN ÂM THANH”.
- **Kiểm tra:** unit test đồ thị âm với AudioContext giả; đo cập nhật pan khi kéo < 30 ms; người dùng nghe thử bằng tai nghe.
- **Use case hoàn thành:** UC.01, UC.02, UC.03 (cùng Phase 3)

## Phase 5 — Giao diện, các trang tĩnh & lưu cục bộ (S4)

- **Mục tiêu:** Căn phòng dùng đầy đủ không cần tài khoản; khung website nhiều trang bằng Tailwind.
- **Bước:**
  1. Tailwind: `tailwind.config.ts` khai báo màu theo phòng, font (Pixelify Sans, Be Vietnam Pro, VT323, Press Start 2P) lấy từ prototype; `content` quét `src/**` để chỉ giữ class dùng tới.
  2. React Router: 6 route + 404, tải lười từng trang; `NavBar`, `Footer`; title và meta description theo trang.
  3. Trang Căn phòng: Zustand store nối engine với UI; Header (logo mở menu trang, tên phòng, Pomodoro mini / Hẹn giờ ngủ, chip âm thanh, chip lưu), thanh công cụ, khay, popover, Volume mixer, chọn khung cảnh, mũi tên + cửa nhà — chuyển CSS của prototype sang class Tailwind, giữ đúng hành vi.
  4. Kéo thả, thêm/xóa đồ, bàn phím (Enter/Space, Delete, mũi tên ±2/±8, Escape).
  5. Lưu LocalStorage sau 250 ms, khóa `focuspace.room.v4`; báo lỗi khi bị chặn.
  6. Trang chủ và Giới thiệu & Liên hệ theo wireframe (nội dung nhóm, email, link GitHub: hỏi trước — PRD Q-15).
  7. Responsive: mobile < 640, tablet 640–1023, desktop ≥ 1024; Căn phòng giữ mốc 720 px.
- **Tham chiếu:** ① prototype · ② PRD Tính năng A–H (phần khách), J · ③ Kiến trúc · wireframe.
- **Kiểm tra:** E2E US-01 → US-10, US-12, US-13, US-16; tải lại trang giữ phòng; Pomodoro/Hẹn giờ ngủ không giữ (FR-SAVE-04); chụp 3 cỡ màn hình mỗi trang.
- **Use case hoàn thành:** UC.12, include Tự động lưu cục bộ

## Phase 6 — Backend & cơ sở dữ liệu (S3 bước 1–2, S4–S5 phần còn lại)

- **Mục tiêu:** 14 endpoint đúng API Docs; CSDL có migration và seeder.
- **Bước:**
  1. `schema.prisma` theo `docs/DATABASE.md` đã duyệt (gồm `item_types`, `scenes`); migration đầu tiên.
  2. `prisma/seed.ts`: đọc `shared/src/catalog.ts`, upsert 17 đồ vật + 5 khung cảnh; khai báo `prisma.seed` trong `package.json`.
  3. `createApp({ db })`: CORS, giới hạn body 64/256 KB, định dạng lỗi chuẩn, requestId, log JSON (pino), Sentry (lỗi 5xx).
  4. Auth: register, login, refresh (xoay vòng, thu hồi cả family khi dùng lại), logout; Argon2id; JWT 15 phút; cookie `fs_rt`.
  5. `/me` GET/PATCH/DELETE (xóa cascade, telemetry `user_id = NULL`).
  6. `/room-state` GET/PUT: migrate khi đọc, kiểm tra `baseRevision`, `force`, 409 kèm `current`.
  7. `/telemetry/batch`: upsert idempotent theo id.
  8. `/catalog/items` (lọc `room`, `group`), `/catalog/scenes` — có `Cache-Control`; `/me/stats` (`range`, `tz`) theo truy vấn DATABASE §5.
  9. Rate limit theo API §5.1; `/health` kiểm tra DB.
- **Tham chiếu:** ② PRD · ③ Kiến trúc · ④ DATABASE.md · ⑤ API Docs.
- **Kiểm tra:** integration test (Supertest + PostgreSQL `focuspace_test`) cho mọi mã trạng thái trong API §3.2; seeder chạy 2 lần vẫn đúng 17 + 5 dòng; `/me/stats` đúng với dữ liệu tạo trong test.
- **Use case hoàn thành:** API của UC.07, UC.08

## Phase 7 — Tài khoản, đồng bộ & trang động (S5)

- **Mục tiêu:** tài khoản tùy chọn, đồng bộ nhiều thiết bị; Thư viện và Thống kê lấy dữ liệu từ CSDL.
- **Bước:**
  1. `api.ts`: access token trong bộ nhớ, `credentials: "include"`, tự refresh khi 401, refresh hỏng → về chế độ khách.
  2. Trang Tài khoản: form Đăng nhập/Đăng ký kiểm tra dữ liệu khi nhập, hiện lỗi server; đổi tên; đăng xuất; xóa tài khoản (hộp thoại xác nhận).
  3. `sync.ts`: tải phòng khi mở app; PUT debounce 2 s; keepalive khi đóng tab; backoff khi lỗi; xử lý 409 + thông báo.
  4. Hộp thoại hợp nhất lần đầu (“Giữ phòng trên máy này” / “Dùng phòng đã lưu trên tài khoản”, BR-10).
  5. Chip “Chưa đồng bộ – đang ngoại tuyến”, tự đồng bộ khi có mạng.
  6. `telemetry.ts`: gom sự kiện, gửi lô mỗi 60 s, khi ẩn tab và khi mở trang Thống kê.
  7. Trang Thư viện: 2 thẻ, bộ lọc gọi lại API, tham số lọc trên URL, trạng thái đang tải / lỗi / rỗng.
  8. Trang Thống kê: chọn khoảng thời gian, 4 ô số liệu, biểu đồ cột SVG, bảng 10 phiên gần nhất, trạng thái chưa đăng nhập / rỗng.
- **Tham chiếu:** ① · ② Tính năng H, I, K, L · ③ Hình 2 (Sequence UC.09) · ⑤.
- **Kiểm tra:** E2E US-11, US-14, US-15 với hai browser context; mất mạng; phiên hết hạn; 409; bộ lọc Thư viện ra 7 đồ cho Phòng ngủ + Phát âm thanh.
- **Use case hoàn thành:** UC.08, UC.09, UC.10, UC.11, UC.07 (trang Thư viện)

## Phase 8 — Tối ưu, theo dõi & nộp bài (S5)

- **Mục tiêu:** đạt NFR PRD §6 và đủ hồ sơ nộp bài.
- **Bước:**
  1. Lighthouse (mobile) cho 6 trang → lưu báo cáo “trước”; tối ưu (tách mã, title + meta description từng trang theo cách 2 đã chọn, vẽ hình xem trước khi cuộn tới, nhãn truy cập, tương phản) → báo cáo “sau”, mục tiêu ≥ 90; thêm Lighthouse CI.
  2. Google Analytics 4: lượt xem theo route và 8 sự kiện (PRD Tính năng M), chỉ khi có `VITE_GA_ID`; Sentry frontend (`VITE_SENTRY_DSN`) và backend (`SENTRY_DSN`), `sendDefaultPii: false`, gắn release theo commit.
  3. Đo gói JS nén < 300 KB, FCP < 2 s; test phiên dài 6 giờ tăng tốc (không rò bộ nhớ, số node âm không tăng).
  4. E2E Chromium, Firefox, WebKit ở 375, 768, 1280 px; kiểm tra bàn phím.
  5. Sửa theo góp ý review chéo (§5), cập nhật `docs/reviews/received.md`.
  6. README.md ở thư mục gốc: cách chạy (yêu cầu Node 20, PostgreSQL 16; `npm install`, `.env`, `npx prisma migrate deploy`, `npx prisma db seed`, `npm run dev`); tổng quan dự án và công cụ đã dùng; danh sách tính năng kèm ảnh chụp; ERD; thông tin khác (phân vai, link video, link Figma, giới hạn đã biết).
  7. Video demo ≤ 10 phút, MP4 ≥ 720p, đăng YouTube unlisted/public: lần lượt 6 trang, tương tác, responsive, dữ liệu động, Lighthouse, Google Analytics realtime, Sentry, repo/Issues/PR.
  8. CI theo Kiến trúc §4.2. Triển khai (chốt 13/11, Kiến trúc §3.5): frontend lên Vercel, backend lên Render (Web Service miễn phí), PostgreSQL trên Neon; biến môi trường đặt trên từng dịch vụ, không commit `.env`; chạy `prisma migrate deploy` và seed trên Neon; ghi link vào README. Thịnh tạo tài khoản và triển khai, các tài khoản GA4/Sentry cũng do Thịnh tạo rồi gửi mã cho Nhiên.
- **Kiểm tra:** đối chiếu toàn bộ bảng §1 và AC trong PRD; báo cáo kết quả.
- **Use case hoàn thành:** include Ghi nhận số liệu sử dụng, FR-OBS

---

## Review kế hoạch — các điểm cần chốt trước khi code

| # | Vấn đề | Đề xuất |
|---|---|---|
| R1 | Tài liệu nhắc `docs/PRD.md`, `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `PLAN.md` và ghi “Phase 0 đã code”, nhưng thư mục hiện chỉ có `docs/`, `images/` và `prototype/` — chưa có mã nguồn. | Hỏi: code Phase 0 có ở thư mục khác không? Nếu không → làm Phase 0 từ đầu. |
| R2 | Không có `DATABASE.md`. ERD thiếu cột mà API/PRD cần: `usage_sessions.visited`, `sleep_timer_set`, `sleep_timer_completed`; `pomodoro_sessions.started_at`, `ended_at`; `client_errors.message`; không thấy index/ràng buộc. | Đã viết `DATABASE.md` bổ sung các cột này và hai bảng danh mục; duyệt trước Phase 6. |
| R3 | Định dạng lưu của prototype là **dạng phẳng** (`weather`, `items` ở gốc, `ver: 3`, `bed.clock`, có cả `rug` và `studyRug`), còn API là **v4 lồng** (`study.*`, `bed.wallClock`). | Migrate xử lý cả hai. Theo prototype: `studyRug` là thảm Phòng học (→ `study.rug`), `rug` là thảm Phòng ngủ (→ `bed.rug`). |
| R4 | Rate limit đăng nhập: BR-09 ghi “mỗi IP”, API §5.1 ghi “IP + email”. | Theo API Docs (chi tiết hơn) — cần xác nhận. |
| R5 | Môi trường làm việc: phiên này không cài được gói npm. | Tôi viết code và ghi vào thư mục; bạn chạy `npm install`, `npm test`, `npm run dev` trên máy và gửi lại kết quả. Hoặc bật quyền mạng để tôi tự chạy test. |
| R6 | Máy bạn đã có Node.js 20 và PostgreSQL 16 chưa? | Cần trước Phase 0 (Node) và Phase 6 (PostgreSQL). |
| R7 | Q-01, Q-02, Q-09 còn mở. | Giữ đúng hành vi prototype hiện tại. |
| R8 | Dữ liệu: test tích hợp tạo/xóa tài khoản tạm trong DB `focuspace_test` (theo Kiến trúc §4.2). | Xin xác nhận cho phép. |
| R9 | Đề bài bắt buộc seeder, còn quy tắc cũ cấm thêm dữ liệu. | Seeder chỉ nạp danh mục lấy từ prototype (BR-12); tài khoản demo / số liệu mẫu cho video chỉ làm khi nhóm cung cấp (Q-13). |
| R10 | Đề bài bắt buộc Tailwind; prototype dùng CSS viết tay. | Chuyển CSS giao diện của prototype sang class Tailwind ở Phase 5, giữ nguyên hình vẽ canvas; prototype không sửa. |
| R11 | Chưa có tên thành viên, ngày bắt đầu, hạn nộp, email liên hệ, link GitHub (Q-11, Q-12, Q-15). | **Đã chốt 13/11:** thành viên và khu vực (§2), bắt đầu 27/10/2026, hạn 27/11/2026 (§3), email từng thành viên và link GitHub (PRD Q-15), phân công backend (§2). Còn thiếu: link Figma, tên 2 nhóm review chéo. |

## Lịch sử thay đổi

| Ngày | Thay đổi |
|---|---|
| 08/11/2026 | Bản nháp đầu. |
| 10/11/2026 | Cập nhật theo đề bài đồ án CSB25022 (§1–§5). |
| 12/11/2026 | Đồng bộ với Chương 1 Phân tích hệ thống: §1 thêm dòng Phân tích hệ thống; Cấu trúc thư mục thêm 2 file phân tích (giữ ở thư mục gốc theo quyết định của người dùng) và ảnh biểu đồ trong `images/`; Phase 2 – 8 thêm dòng “Use case hoàn thành”; Nguyên tắc chung thêm quy ước ghi mã UC trong PR và tên test E2E. |
| 13/11/2026 | §2 điền 4 thành viên theo khu vực (Tuấn Hưng: đồ vật, âm thanh; Đình Nhiên: Sân vườn; Tuấn Lộc: Phòng ngủ; Phúc Thịnh: Phòng học, repo, các trang còn lại), phần backend và việc chung ghi [Đề xuất]; §3 rút lịch còn 2 tuần, 5 sprint × 3 ngày (13/11 → 27/11) có cột việc từng người; Phase 0 đổi thành "Khởi tạo & khung test" (test-first theo PlanDesignWeb); R11 cập nhật. |
| 13/11/2026 (lần 2) | Lịch tính lại từ 27/10/2026: S1 ✅ 27/10–07/11 (họp khởi động, wireframe Figma, prototype, PRD duyệt), S2 ✅ 08–12/11 (PLAN, tài liệu, phân tích hệ thống), S3 13–17/11, S4 18–22/11, S5 23–27/11; §1 cập nhật cột sprint; Phase 0–7 đổi sprint; đường dẫn 2 file phân tích chuyển vào `docs/`. |
| 13/11/2026 (lần 3) | Gọn cấu trúc thư mục: bỏ 3 bản Word trùng PRD/Kiến trúc/API, bỏ `docs/github-templates/` (trùng `.github/`), gộp prototype phương án 1 & 2 thành `prototype/web/` (chọn phương án 2); `CLAUDE.md` ra thư mục gốc; `images/` → `docs/images/`; thêm `docs/analysis/`, `docs/references/`; sửa `.gitignore`. |
| 13/11/2026 (lần 4) | Trạng thái: đã duyệt ở buổi họp kế hoạch 13/11/2026; Phase 7 tham chiếu Kiến trúc Hình 2 (Sequence UC.09, Hình 3 đã gộp); drawio thêm trang ERD. |
| 13/11/2026 (lần 5) | Prototype: chốt cách 2 cho Lighthouse (title + meta description; nhạc Lo-fi dựng nền ngay khi mở Căn phòng); Phase 4 bước 3, Phase 8 bước 1 và cây thư mục cập nhật theo. |
| 13/11/2026 (lần 6) | §2 chốt phân công backend và việc chung; trang Thống kê chuyển từ Thịnh sang Lộc; Thịnh tạo tài khoản GA4, Sentry và triển khai. §3 cột S5 cập nhật. Phase 8 bước 8: triển khai Vercel + Render + Neon. R11 cập nhật. |
