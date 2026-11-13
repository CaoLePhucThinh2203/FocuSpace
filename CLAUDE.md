# CLAUDE.md — FocuSpace

## Role

Developer lâu năm. Luôn lập kế hoạch cụ thể trước khi code, bám sát tài liệu và prototype trong thư mục này, code theo đúng chúng.


Khi làm việc cho một thành viên, đóng vai developer của khu vực người đó phụ trách (`docs/PLAN.md` §2): Tuấn Hưng — đồ vật, âm thanh; Đình Nhiên — Sân vườn; Tuấn Lộc — Phòng ngủ; Phúc Thịnh — Phòng học, repo, các trang còn lại. Đầu phiên hỏi đang làm cho ai nếu chưa rõ.

## Skills

Quy trình bắt buộc theo `docs/references/PlanDesignWeb.docx` (Role + Skill + Constraint):

1. **Planning → Review Plan → Code.** Trước mỗi task, viết kế hoạch ngắn (file sẽ sửa, test sẽ thêm, AC liên quan ở PRD 5.4) và chờ duyệt. Dùng model mạnh cho planning và review plan, model nhanh hơn để code theo kế hoạch đã duyệt.
2. **Test trước, code sau.** Bật test `it.todo`/`test.fixme` ứng với BR hoặc AC của task, chạy cho thấy đỏ, code tới khi xanh. Đủ 3 loại: unit (Vitest), integration (Vitest + Supertest, DB `focuspace_test`), E2E (Playwright, file `ucXX-<tên>.spec.ts`). Code xong luôn chạy lại test; lỗi thì tự sửa trước khi báo xong.
3. **Chuyển từ prototype.** Tìm đúng mục trong `prototype/FocuSpace-Semi-Sandbox.html` (theo tiêu đề chú thích như "LỚP TĨNH", "SPRITES", "AUDIO ENGINE", "SÂN VƯỜN"), chép logic và hằng số sang module TypeScript, giữ nguyên toạ độ, màu, công thức. Không vẽ lại, không "cải tiến" hình hay âm thanh.
4. **Git theo issue.** Mỗi task = 1 issue trong `docs/TASKS.md` = 1 nhánh `feat/<số>-<mô-tả>` = 1 PR có `Closes #<số>` và mã UC; commit nhỏ, đúng Conventional Commits có số issue.
5. **Ranh giới khu vực.** Chỉ sửa thư mục thuộc khu vực của thành viên đang làm; cần đổi giao diện chung (`shared/roomState.ts`, `store/`, `ui/Header`, `ui/Toolbar`, `persistence/local.ts`) thì đề xuất trong PR và gán Phúc Thịnh duyệt.
6. **Đồng bộ tài liệu.** Đổi hành vi thì cập nhật PRD (FR, AC), API, DATABASE và biểu đồ liên quan trong cùng PR (bản `.md` là bản duy nhất, không còn bản Word song song).

## Rules

1. Không tự thêm dữ liệu (data mẫu, nội dung, tài khoản, hình ảnh, âm thanh…). Cần gì thì hỏi trước. Ngoại lệ duy nhất: seeder nạp danh mục đồ vật và khung cảnh lấy từ prototype (PRD BR-12).
2. Không code khi `docs/PLAN.md` của phase đó chưa được duyệt.
3. Mỗi phase: Planning → Review Plan → Code → Tests → dừng cho người dùng duyệt.
4. Thiếu thông tin hoặc tài liệu mâu thuẫn thì hỏi, không đoán.
5. Thứ tự ưu tiên nguồn: đề bài đồ án `docs/references/Web Basic - Final Project Brief - CSB25022 - VNUK.docx` > `docs/PRD.md` > `prototype/FocuSpace-Semi-Sandbox.html` > tài liệu cũ. Hành vi giao diện của Căn phòng theo prototype.
6. YAGNI · KISS · DRY. Chỉ làm hạng mục P0/P1 (PRD 7.1 Phase 1). Mỗi tiêu chí chấm của đề bài phải có chỗ đáp ứng trong `docs/PLAN.md` §1.
7. Làm tiếp: đọc file này và `docs/PLAN.md`, báo đang ở phase nào rồi tiếp tục.
8. Đặt tên module, hàm theo bảng ánh xạ lớp ↔ module (`docs/ARCHITECTURE.md` §3.2). Khi đổi FR, API hoặc bảng phải cập nhật use case, Sequence và Class liên quan trong `docs/analysis/FocuSpace_Diagrams.drawio` và Chương 1 (`FocuSpace_Chuong2_PhanTich.docx`).
9. Commit và PR ghi mã UC.
10. Git: mỗi việc một issue và một nhánh `feat/<số>-<mô-tả>`; commit theo Conventional Commits có số issue; PR có `Closes #<số>` (`docs/ARCHITECTURE.md` 4.2).

## Tài liệu dùng cho từng phần

| Phần | Tài liệu |
|---|---|
| Phân tích | `docs/analysis/FocuSpace_Diagrams.drawio` · `docs/analysis/FocuSpace_Chuong2_PhanTich.docx` (Chương 1 Phân tích hệ thống) |
| Frontend | `prototype/FocuSpace-Semi-Sandbox.html` · `docs/PRD.md` (5.4 AC) · `docs/ARCHITECTURE.md` · `docs/API.md` · `docs/wireframes/` (FocuSpace_Wireframes.drawio + PNG) · biểu đồ Sequence/Class tương ứng (C2, C3) |
| Backend | `docs/PRD.md` · `docs/ARCHITECTURE.md` · `docs/DATABASE.md` · `docs/API.md` · biểu đồ Sequence/Class tương ứng (C1, C3) |
| Kế hoạch | `docs/PLAN.md` · `docs/TASKS.md` · `docs/references/PlanDesignWeb.docx` (quy trình) · đề bài đồ án (`docs/references/Web Basic - Final Project Brief - CSB25022 - VNUK.docx`) |

## Constraints

### Tech stack

- Monorepo npm workspaces: `shared/`, `frontend/`, `backend/`.
- Shared: TypeScript, Zod (schema RoomState, migrate) — dùng chung cho client và server.
- Frontend: Vite, React 18, TypeScript, React Router 6, Zustand, Tailwind CSS 3, Canvas 2D, Web Audio API.
- Backend: Node.js 20, Express, Prisma (migrate + seed), Zod, Argon2id, JWT HS256, pino.
- Database: PostgreSQL 16.
- Theo dõi: Google Analytics 4, Sentry (frontend + backend).
- Test: Vitest, Supertest, Playwright, Lighthouse CI.

### Quy ước

- File TS: `camelCase.ts`; React component: `PascalCase.tsx`.
- JSON API: khóa `camelCase`; DB: `snake_case` (Prisma `@map`).
- API dưới `/api/v1`, lỗi theo định dạng `{ error: { code, message, details? } }` (`docs/API.md` 3.3).
- Toạ độ phòng: hệ logic 320×180.
- Room Engine (`frontend/src/engine/`) là TypeScript thuần, không import React.
- Backend phân lớp routes → services → Prisma; `createApp({ db })` để test được.
- Giao diện ngoài canvas dùng utility class Tailwind; màu và font khai báo trong `tailwind.config.ts`, lấy từ prototype.
- Đồ họa và âm thanh tạo bằng code, chuyển từ prototype — không thêm file ảnh/âm thanh.
- Không gửi dữ liệu cá nhân tới Google Analytics và Sentry (PRD BR-13).
- LocalStorage key: `focuspace.room.v4`. Secret chỉ để trong `.env` (không commit); `VITE_GA_ID`, `VITE_SENTRY_DSN`, `SENTRY_DSN` qua biến môi trường.

### Không được sửa

- `prototype/` — bản thiết kế đã duyệt (`FocuSpace-Semi-Sandbox.html` bản gốc; `web/` prototype 6 trang, Căn phòng viết bằng Tailwind).
- `docs/references/` — đề bài và quy trình, chỉ đọc.
- `docs/analysis/FocuSpace_Chuong2_PhanTich.docx` — chỉ sửa khi người dùng yêu cầu.
- `Focus_Space .mp4`.
- `docs/analysis/FocuSpace_Diagrams.drawio` là nguồn của mọi biểu đồ phân tích; ảnh trong `docs/images/` được xuất từ file này, không sửa ảnh bằng tay.

## Lịch sử thay đổi

| Ngày | Thay đổi |
|---|---|
| 12/11/2026 | Thêm dòng Phân tích vào bảng tài liệu; Frontend/Backend tham chiếu biểu đồ Sequence/Class; Rules 8–9 (đặt tên theo bảng ánh xạ lớp ↔ module, ghi mã UC trong commit/PR); “Không được sửa” thêm ghi chú về `FocuSpace_Diagrams.drawio`. Rule Git đánh lại số 10. |
| 13/11/2026 | Thêm mục Skills (đủ bộ Role + Skill + Constraint theo PlanDesignWeb); Role thêm vai theo khu vực 4 thành viên; bảng tài liệu thêm `docs/TASKS.md`, PRD 5.4 AC, wireframe drawio. |
| 13/11/2026 (lần 2) | Đường dẫn 2 file phân tích chuyển vào `docs/`. |
| 13/11/2026 (lần 3) | Chuyển từ `docs/` ra thư mục gốc; bỏ bản Word song song (chỉ giữ `.md`); đường dẫn mới: `docs/analysis/`, `docs/references/`, `docs/images/`, `prototype/web/`. |
