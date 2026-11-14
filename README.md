# FocuSpace

Căn phòng pixel art Lo-fi giúp tập trung: Phòng học, Phòng ngủ, Sân vườn; đồ vật phát âm thanh không gian, Pomodoro, hẹn giờ ngủ, thống kê. Đồ án cuối kỳ Web Design & Development (CSB25022, VNUK).

> README đầy đủ (cách chạy, tính năng kèm ảnh, ERD, video demo) sẽ hoàn thiện ở Sprint 5 — xem `docs/PLAN.md` Phase 8.

## Cách chạy (máy cá nhân)

Yêu cầu: Node.js 20 trở lên, một cơ sở dữ liệu PostgreSQL 16 (cài trên máy hoặc tạo miễn phí trên [Neon](https://neon.tech)).

```bash
npm install                                   # cài cho cả shared, backend, frontend
copy .env.example backend\.env               # Windows (macOS/Linux: cp .env.example backend/.env)
# sửa DATABASE_URL và JWT_SECRET trong backend/.env
npm run db:migrate -- --name init             # tạo bảng (lần đầu); commit thư mục backend/prisma/migrations
npm run db:seed                               # nạp 17 đồ vật + 5 khung cảnh
npm run dev                                   # API: http://localhost:3000/api/v1 · Web: http://localhost:5173
```

Lệnh khác: `npm test` (unit + integration), `npm run test:e2e` (Playwright), `npm run lint`, `npm run build`.
Ràng buộc CHECK của CSDL: xem `backend/prisma/checks.sql` (thêm bằng một migration SQL sau migration đầu).

## Thành viên

| Thành viên | Phụ trách |
|---|---|
| Tuấn Hưng | Đồ vật, bảng đồ vật, âm thanh |
| Đình Nhiên | Sân vườn |
| Tuấn Lộc | Phòng ngủ, trang Thống kê |
| Phúc Thịnh | Phòng học, quản lý repo, các trang còn lại |

## Cấu trúc thư mục

```
FocuSpace/
├── CLAUDE.md          # quy tắc làm việc (Role · Skill · Constraint)
├── shared/            # dữ liệu dùng chung: danh mục, RoomState (Zod), công thức âm thanh không gian
├── backend/           # Express + Prisma: API /api/v1, schema, seeder; src/areas/<khu vực>
├── frontend/          # React + Vite + Tailwind: 6 trang; src/areas/<khu vực>
│                      #   khu vực: items-audio (Hưng) · garden (Nhiên) · bedroom (Lộc) · study (Thịnh)
├── .github/           # mẫu issue, PR
├── docs/
│   ├── PRD.md · ARCHITECTURE.md · API.md · DATABASE.md
│   ├── PLAN.md · TASKS.md
│   ├── analysis/      # biểu đồ phân tích (.drawio) + Chương 1 (.docx)
│   ├── images/        # hình trong tài liệu
│   ├── wireframes/    # wireframe 6 trang
│   ├── meetings/      # biên bản họp
│   ├── reports/       # self-report từng sprint
│   └── references/    # đề bài, quy trình
└── prototype/
    ├── FocuSpace-Semi-Sandbox.html   # bản gốc Căn phòng
    ├── web/                          # prototype 6 trang (mở index.html), Lighthouse theo cách 2
    └── so-sanh-lighthouse/           # đo Lighthouse: cách 1 vs cách 2 (đã chọn cách 2)
```

Repo: https://github.com/CaoLePhucThinh2203/FocuSpace · Triển khai: Vercel + Render + Neon (link ghi khi hoàn tất ở S5).

Lịch: bắt đầu 27/10/2026, hạn nộp 27/11/2026 (5 sprint, chi tiết `docs/PLAN.md` §3).
