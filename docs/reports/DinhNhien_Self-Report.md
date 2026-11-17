# Self-report — Đình Nhiên

**Khu vực phụ trách:** Sân vườn, 5 khung cảnh (`frontend/src/areas/garden/`, `backend/src/areas/garden/`, phần Sân vườn trong `roomEngine.js`); `GET /catalog/scenes`, `POST /telemetry/batch`, GA4 và Sentry.

| Sprint | Thời gian | Giai đoạn | Số commit trên `main` |
|---|---|---|---|
| [S1](#sprint-1) | 27/10 – 07/11/2026 | Thiết kế | — (chưa có repo) |
| [S2](#sprint-2) | 08/11 – 12/11/2026 | Kế hoạch | — (chưa có repo) |
| [S3](#sprint-3) | 13/11 – 14/11/2026 | Lập trình | 8 |
| [S4](#sprint-4) | 15/11/2026 | Lập trình | 3 |
| [S5](#sprint-5) | 16/11 – 17/11/2026 | Lập trình, nộp bài | 3 |

- S1, S2 viết bù ngày 13/11/2026. Repo GitHub tạo sau S2 nên cột Issue, PR ghi “—”.
- S3 – S5 soạn ngày 17/11/2026 từ git log và các PR đã merge vào `main`. Cột Issue ghi mã việc trong `docs/TASKS.md`, cột PR ghi số Pull Request trên GitHub, mã commit đặt trong ngoặc.

---

<a id="sprint-1"></a>
## Sprint 1 (27/10 – 07/11/2026 · Thiết kế)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Thiết kế Sân vườn và 5 khung cảnh trên prototype | Xong |
| G8 | — | Cùng cả nhóm dựng prototype Căn phòng `prototype/FocuSpace-Semi-Sandbox.html`: phần Sân vườn và các khung cảnh | Xong |
| N1 | — | Wireframe Trang chủ, Giới thiệu & Liên hệ bằng draw.io (desktop + mobile), PNG xuất vào `docs/wireframes/` | Xong |

### Khó khăn và cách xử lý
- Cần đảm bảo nội dung Sân vườn trong PRD thống nhất với cấu trúc dữ liệu và danh sách khung cảnh được sử dụng trong seeder. Cách xử lý: chốt danh sách 5 khung cảnh ngay trong prototype (mỗi cảnh có tên, hình, âm nền), lấy prototype làm nguồn khi viết PRD và seeder.
- 5 khung cảnh dùng chung một Sân vườn (cây, xích đu, nhà gỗ) trên canvas 320×180, dễ vẽ lệch giữa các cảnh. Cách xử lý: giữ nguyên các vật thể chung, mỗi cảnh chỉ đổi nền, màu và hiệu ứng (lá rơi, tuyết rơi).

### Công việc của sprint tới
Tham gia viết tài liệu kế hoạch và phân tích (S2).

### Tự đánh giá mức đóng góp (1–5)
5

---

<a id="sprint-2"></a>
## Sprint 2 (08/11 – 12/11/2026 · Kế hoạch)

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| — | — | Góp ý đồ vật, âm thanh cho PRD (Tính năng E, F) | Xong |
| — | — | Góp nội dung Sân vườn cho PRD (Tính năng D) và danh sách khung cảnh cho seeder (DATABASE §3.8) | Xong |

### Khó khăn và cách xử lý
- Nội dung Sân vườn trong PRD (Tính năng D) và danh sách khung cảnh cho seeder (DATABASE §3.8) viết ở hai nơi, dễ lệch tên và thứ tự cảnh. Cách xử lý: đối chiếu cả hai với prototype, thống nhất 5 cảnh và cảnh mặc định là Khu rừng.
- Seeder chỉ được nạp dữ liệu có trong prototype (BR-12). Cách xử lý: chỉ đưa 5 khung cảnh đã có vào seeder, không thêm cảnh mới.

### Công việc của sprint tới
Theo `docs/TASKS.md`, cột Sprint = S3: khung test, seeder khung cảnh, API khung cảnh và telemetry.

### Tự đánh giá mức đóng góp (1–5)
4

---

<a id="sprint-3"></a>
## Sprint 3 (13/11 – 14/11/2026 · Lập trình)

Số commit trên `main`: 8.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| N2 | #9 | Khung test Sân vườn, khung cảnh, telemetry (`04982cb`) | Xong |
| N4 | #9 | Seeder bảng `scenes` 5 khung cảnh, upsert (`17ede47`) | Xong |
| N8 | #9 | `scenesService` và route `GET /catalog/scenes` (`a632ebf`, `78bcf92`) | Xong |
| N9 | #9 | `telemetryService` upsert idempotent và route `POST /telemetry/batch` (`74c8aae`, `78bcf92`) | Xong |
| N11 | #9 | Cắm GA4 và Sentry vào khu vực garden (`72b5fab`) | Đang làm: còn kiểm tra GA4 Realtime và Sentry trên bản triển khai |
| N5–N7 | #9 | Khung `out`, `sceneAudio`, `ScenePicker`, telemetry (`e77ef06`) | Xong (thay bằng PA B ngày 15/11) |
| G3 | #9 | Khung self-report S1–S5 và góp ý UI/UX (`eff7460`) | Xong |
| — | #9 | Merge PR | Xong |

### Khó khăn và cách xử lý
- Phải chờ code nền (PR #1, #3) merge chiều 14/11 rồi mới bắt đầu được khu vực của mình. Cách xử lý: làm trong thư mục `areas/garden/` theo cổng cắm khu vực (#3) và gửi một PR (#9) trong tối 14/11 để kịp demo 15/11.
- GA4 và Sentry cần mã đo lường và DSN do Phúc Thịnh tạo (G10), chưa có nên chưa kiểm tra được trên bản triển khai. Cách xử lý: cắm sẵn code, mã lấy từ biến môi trường, không commit; kiểm tra khi có mã (N11).

### Công việc của sprint tới
S4 (15/11): tinh chỉnh hình Sân vườn theo góp ý khi chạy thử (N12–N15), giảm giới hạn đồ vật mỗi phòng (G12), duyệt PR tối ưu Lighthouse.

### Tự đánh giá mức đóng góp (1–5)
5

---

<a id="sprint-4"></a>
## Sprint 4 (15/11/2026 · Lập trình)

Số commit trên `main`: 3.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| N12–N15 | #24 | Bồn hoa và dây hoa ở chân cửa sổ nhà gỗ; Núi băng thêm núi thấp, hạ hàng thông, sửa phản chiếu hồ; lối đá Thành phố, Khu rừng theo đường vòng Đồi ven biển; Thành phố sửa đèn cửa chính và cửa sổ tròn gác (`a5cc022`) | Xong |
| G12 | #24 | Giảm `MAX_ITEMS_PER_ROOM` 40 → 25 (BR-06) (`0bd3127`) | Xong |
| — | #24 | Thêm N12–N15, G12 vào `docs/TASKS.md` (`c10d6b9`) | Xong |
| — | #36, #37, #38, #43 | Duyệt và merge PR | Xong |

### Thay đổi trong khu vực do thành viên khác làm
| Issue | PR | Người làm | Thay đổi |
|---|---|---|---|
| N10 | #31 | Phúc Thịnh | `telemetry.ts` gom phiên, gửi lô 60 giây / khi ẩn tab / khi rời trang; engine ghi telemetry; E2E kiểm tra lô `completed`/`reset` (`814ab5c`) |
| N5–N7 | #31 | Phúc Thịnh | PA B: xóa các khung vẽ, âm thanh, `ScenePicker` ở `areas/garden/`, phần Sân vườn giữ trong `roomEngine.js` (`533a618`) |
| N8, N9 | #31 | Phúc Thịnh | Integration test `/catalog/scenes`, `/telemetry/batch` trên PostgreSQL 16 tạm |
| — | #44 | Phúc Thịnh | Viết lại mô tả 5 khung cảnh theo văn phong mới |

### Khó khăn và cách xử lý
- Cảnh Thành phố: đèn cửa chính đè lên khung cửa sổ trái, cửa sổ tròn gác mất viền và chữ thập. Cách xử lý: đưa đèn lên tường phía trên cửa, vẽ khung trước rồi vẽ quầng sáng sau (PA1 chọn 15/11), kiểm tra 4 cảnh còn lại không đổi (N15).
- Giảm giới hạn 40 → 25 đồ sửa vào `shared/` và quy tắc `placement` của khu vực khác. Cách xử lý: đề xuất trong PR #24, gán Phúc Thịnh duyệt phần `shared/`, Tuấn Hưng duyệt phần `placement`; cập nhật PRD (BR-06, AC-04.2), API, DATABASE cùng PR (G12).

### Công việc của sprint tới
S5 (16–17/11): self-report cả nhóm, README; kiểm tra GA4, Sentry (N11); góp ý UI/UX cho Nhóm 4 (PawPass) cùng Tuấn Hưng (G4); sửa theo góp ý (G5); quay clip demo Sân vườn (G6).

### Tự đánh giá mức đóng góp (1–5)
4

---

<a id="sprint-5"></a>
## Sprint 5 (16/11 – 17/11/2026 · Lập trình, nộp bài)

Số commit trên `main`: 3.

### Việc đã làm
| Issue | PR | Mô tả | Trạng thái |
|---|---|---|---|
| G3 | #45 | Self-report S3 cả nhóm theo git log và PR, khung S4–S5, bỏ file mẫu (`e48a736`) | Xong |
| G3 | #45 | Thêm cột Trạng thái cho từng issue trong `docs/TASKS.md`, cập nhật P5–P8 trong `docs/PLAN.md`, ghi phần Sân vườn trong prototype Căn phòng (`3d8e55c`) | Xong |
| T18 | #45 | README hoàn chỉnh theo đề bài: cách chạy, công cụ, tính năng kèm ảnh, ERD, thông tin thêm (`676a2fa`) | Xong |
| — | #49, #50 | Duyệt và merge PR | Xong |
| N11 | — | Kiểm tra GA4 Realtime thấy `page_view`, Sentry nhận lỗi thử, không gửi dữ liệu cá nhân | Đang làm |
| G4 | — | Góp ý UI/UX cho Nhóm 4 (PawPass) cùng Tuấn Lộc, Tuấn Hưng (`docs/reviews/given/dinh-nhien.md`) | Xong |
| G5 | #46, #50 | Sửa theo góp ý: góp ý số 8 (cảnh Thành phố sinh động hơn) đã làm ở #46, #50, không cần PR mới (`docs/reviews/received.md`) | Xong |

### Thay đổi trong khu vực do thành viên khác làm
| Issue | PR | Người làm | Thay đổi |
|---|---|---|---|
| — | #46 | Phúc Thịnh | Cảnh Thành phố: âm nền buổi tối, bỏ tiếng nói chuyện, 30–50 giây có một tiếng còi xe nhỏ ở xa (PRD v5.13) |
| — | #50 | Phúc Thịnh | Cảnh Thành phố: xe cả 2 làn nhích lên 1 px (`c69be2c`) |

### Khó khăn và cách xử lý
- Tổng hợp self-report S3 cho cả nhóm từ git log khó vì nhiều commit không ghi mã issue và một PR gộp nhiều việc. Cách xử lý: đối chiếu từng commit với PR đã merge và `docs/TASKS.md`, ghi mã commit trong ngoặc để kiểm tra lại được (#45).
- README cần ảnh minh họa cho từng tính năng theo đề bài. Cách xử lý: chụp màn hình từng trang và từng không gian của Căn phòng, lưu vào `docs/images/screenshots/` rồi chèn vào README (#45).
- GA4 và Sentry vẫn chưa kiểm tra xong vì chưa xác nhận mã GA4, DSN đã đặt trên Vercel, Render (G10). Cách xử lý: nhắc Phúc Thịnh xác nhận biến môi trường, sau đó kiểm tra GA4 Realtime, gửi lỗi thử lên Sentry (N11).

### Tự đánh giá mức đóng góp (1–5)
5
