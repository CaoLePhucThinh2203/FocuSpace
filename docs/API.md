> Bản chính thức duy nhất (bản Word cũ `docs/FocuSpace_API_Docs.docx` đã gộp vào file này ngày 13/11/2026; cần bản Word thì xuất bằng `pandoc docs/API.md -o FocuSpace_API_Docs.docx`). Đối chiếu lần cuối với `prototype/FocuSpace-Semi-Sandbox.html` ngày 10/11/2026.

# FocuSpace — API Docs

Tài liệu API REST — FocuSpace bản chính thức

|                        |                                                                         |
|------------------------|-------------------------------------------------------------------------|
| **Sản phẩm**           | FocuSpace — web app pixel art Lo-fi Semi-Sandbox                        |
| **Phiên bản API**      | v1                                                                      |
| **Phiên bản tài liệu** | v1.2 · v1.0 đã phê duyệt 07/11/2026; v1.1 (danh mục, thống kê) và v1.2 (truy vết use case) đã duyệt ở buổi họp kế hoạch 13/11/2026 |
| **Ngày cập nhật**      | 13/11/2026 (duyệt v1.1 – v1.2) |
| **Nguồn**              | docs/API.md · docs/DATABASE.md · docs/PRD.md · prototype/FocuSpace-Semi-Sandbox.html · docs/analysis/FocuSpace_Diagrams.drawio, Chương 1 Phân tích hệ thống |

# 1. Tổng quan & Giới thiệu

|                           |                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------|
| **Base URL (production)** | https://\<tên-miền\>/api/v1 — \[Cần xác nhận\] khi chọn nơi triển khai                        |
| **Base URL (dev)**        | http://localhost:3000/api/v1 (gọi qua frontend dev: http://localhost:5173/api/v1, Vite proxy) |
| **Định dạng dữ liệu**     | application/json; charset=utf-8 cho cả request và response                                    |
| **Quy ước JSON**          | Khóa camelCase; thời gian ISO 8601 UTC (ví dụ 2026-11-07T10:00:00.000Z); id dạng UUID         |

API phục vụ frontend FocuSpace (ứng dụng web chạy trong trình duyệt). FocuSpace là ứng dụng **local-first**: toàn bộ trải nghiệm phòng chạy ở client, API chỉ dùng cho bốn việc:

- **Tài khoản:** đăng ký, đăng nhập, duy trì phiên, đổi tên, xóa tài khoản.

- **Đồng bộ trạng thái phòng** giữa các thiết bị, có kiểm soát phiên bản để tránh ghi đè.

- **Thu thập số liệu** (phiên dùng, Pomodoro, lỗi âm thanh) để đo KPI — dùng được cả khi chưa đăng nhập.

- **Nội dung trang động:** danh mục đồ vật, khung cảnh cho trang Thư viện và thống kê học tập của người dùng cho trang Thống kê.

| **Nhóm**   | **Endpoint**                                                                    |
|------------|---------------------------------------------------------------------------------|
| Health     | GET /health                                                                     |
| Auth       | POST /auth/register · POST /auth/login · POST /auth/refresh · POST /auth/logout |
| Tài khoản  | GET /me · PATCH /me · DELETE /me                                                |
| Room state | GET /room-state · PUT /room-state                                               |
| Telemetry  | POST /telemetry/batch                                                           |
| Danh mục | GET /catalog/items · GET /catalog/scenes |
| Thống kê | GET /me/stats |

Tóm tắt endpoint ↔ use case ↔ phương thức service (theo Chương 1 Phân tích hệ thống, Class C3):

| **Mục** | **Endpoint** | **Use case** | **Phương thức service** |
|---|---|---|---|
| 4.1 | GET /health | — (vận hành) | — |
| 4.2 | POST /auth/register | UC.08 Đăng ký / Đăng nhập | AuthService.dangKy |
| 4.3 | POST /auth/login | UC.08 Đăng ký / Đăng nhập | AuthService.dangNhap |
| 4.4 | POST /auth/refresh | UC.09 Đồng bộ phòng giữa các thiết bị (làm mới phiên khi mở app) | AuthService.lamMoiPhien |
| 4.5 | POST /auth/logout | UC.11 Quản lý tài khoản (extend Đăng xuất) | AuthService.dangXuat |
| 4.6 | GET /me | UC.11 Quản lý tài khoản | AuthService.layTaiKhoan |
| 4.7 | PATCH /me | UC.11 Quản lý tài khoản (extend Đổi tên hiển thị) | AuthService.doiTenHienThi |
| 4.8 | DELETE /me | UC.11 Quản lý tài khoản (extend Xóa tài khoản) | AuthService.xoaTaiKhoan |
| 4.9 | GET /room-state | UC.09 Đồng bộ phòng giữa các thiết bị | RoomStateService.layTrangThai |
| 4.10 | PUT /room-state | UC.09 (kích hoạt bởi thay đổi ở UC.02–UC.04) | RoomStateService.luuTrangThai |
| 4.11 | POST /telemetry/batch | UC.05, UC.06 (include Ghi nhận số liệu sử dụng), UC.03 (lỗi audio), UC.10 (gửi lô trước khi tải thống kê) | TelemetryService.nhanLo (202 Accepted) |
| 4.12 | GET /catalog/items | UC.07 Xem Thư viện đồ vật & khung cảnh | CatalogService.layDoVat |
| 4.13 | GET /catalog/scenes | UC.07 Xem Thư viện đồ vật & khung cảnh | CatalogService.layKhungCanh |
| 4.14 | GET /me/stats | UC.10 Xem Thống kê học tập | StatsService.layThongKe |

Use case không gọi API trực tiếp: UC.01 Chuyển không gian, UC.04 Sắp xếp đồ vật (thay đổi phòng được đẩy lên gián tiếp qua `PUT /room-state` ở UC.09) và UC.12 Xem Trang chủ và Giới thiệu & Liên hệ (trang tĩnh; chỉ ghi page_view lên Google Analytics).

# 2. Xác thực (Authentication)

API dùng **Bearer Token (JWT)** kèm **refresh token trong cookie**. Không dùng API Key.

| **Loại**                 | **Cách truyền**                                                     | **Thời hạn**             | **Ghi chú**                                                           |
|--------------------------|---------------------------------------------------------------------|--------------------------|-----------------------------------------------------------------------|
| Access token (JWT HS256) | Header Authorization: Bearer \<accessToken\>                        | 15 phút (expiresIn: 900) | Client giữ trong bộ nhớ, không lưu LocalStorage                       |
| Refresh token            | Cookie fs_rt (httpOnly, Secure, SameSite=Strict, Path=/api/v1/auth) | 30 ngày                  | Trình duyệt tự gửi; xoay vòng mỗi lần refresh; server chỉ lưu bản băm |

### Lấy token lần đầu

1.  Gọi POST /auth/register (tài khoản mới) hoặc POST /auth/login (đã có tài khoản).

2.  Response trả accessToken trong body và đặt cookie fs_rt.

3.  Gửi Authorization: Bearer \<accessToken\> cho các endpoint có ký hiệu 🔒.

4.  Khi nhận 401 UNAUTHENTICATED, gọi POST /auth/refresh (không body, cookie tự gửi) để lấy access token mới rồi gọi lại request.

5.  Refresh trả 401 INVALID_REFRESH_TOKEN → phiên đã hết: client quay về chế độ khách, không xóa dữ liệu cục bộ.

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"linh@example.com","password":"matkhau-cua-ban"}'

curl http://localhost:3000/api/v1/me \
  -H "Authorization: Bearer <accessToken>"
```

> **Lưu ý:** Các request có cookie phải gửi kèm credentials (`fetch(url, { credentials: "include" })`). CORS chỉ chấp nhận origin của frontend.

# 3. Quy ước chung (Conventions)

## 3.1 HTTP Methods

| **Method** | **Ý nghĩa trong API này**                                                                   |
|------------|---------------------------------------------------------------------------------------------|
| GET        | Đọc thông tin (health, tài khoản, trạng thái phòng, danh mục, thống kê)                                         |
| POST       | Tạo mới hoặc thực hiện hành động (đăng ký, đăng nhập, refresh, đăng xuất, gửi lô telemetry) |
| PUT        | Ghi đè toàn bộ tài nguyên (trạng thái phòng luôn gửi nguyên khối)                           |
| PATCH      | Cập nhật một phần (đổi tên hiển thị)                                                        |
| DELETE     | Xóa tài nguyên (xóa tài khoản)                                                              |

## 3.2 Mã trạng thái HTTP

| **HTTP**                  | **Mã lỗi (error.code)** | **Khi nào**                                                                      |
|---------------------------|-------------------------|----------------------------------------------------------------------------------|
| 200 OK                    | —                       | Thành công                                                                       |
| 201 Created               | —                       | Đăng ký tài khoản thành công                                                     |
| 202 Accepted              | —                       | Đã nhận lô telemetry                                                             |
| 204 No Content            | —                       | Đăng xuất, xóa tài khoản thành công                                              |
| 400 Bad Request           | VALIDATION_ERROR        | Body/tham số sai schema                                                          |
| 401 Unauthorized          | UNAUTHENTICATED         | Thiếu hoặc hết hạn access token                                                  |
| 401 Unauthorized          | INVALID_CREDENTIALS     | Sai email hoặc mật khẩu                                                          |
| 401 Unauthorized          | INVALID_REFRESH_TOKEN   | Refresh token sai, hết hạn hoặc đã thu hồi                                       |
| 404 Not Found             | NOT_FOUND               | Không có tài nguyên (ví dụ tài khoản chưa có phòng) hoặc đường dẫn không tồn tại |
| 409 Conflict              | EMAIL_TAKEN             | Email đã được đăng ký                                                            |
| 409 Conflict              | REVISION_CONFLICT       | baseRevision cũ hơn bản trên server                                              |
| 413 Payload Too Large     | PAYLOAD_TOO_LARGE       | Trạng thái phòng \> 64 KB, lô telemetry \> 256 KB                                |
| 429 Too Many Requests     | RATE_LIMITED            | Vượt giới hạn tần suất (kèm header Retry-After)                                  |
| 500 Internal Server Error | INTERNAL_ERROR          | Lỗi phía server                                                                  |
| 503 Service Unavailable   | —                       | Health check: database không trả lời                                             |

API không dùng 403: mỗi người dùng chỉ truy cập tài nguyên của chính mình, xác định từ token, nên không có trường hợp “đã xác thực nhưng không có quyền”.

## 3.3 Cấu trúc Error Response chuẩn

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Trường 'email' không đúng định dạng.",
    "details": [
      {
        "path": "email",
        "issue": "invalid"
      }
    ]
  }
}
```

| **Trường**    | **Kiểu** | **Bắt buộc** | **Mô tả**                                                    |
|---------------|----------|--------------|--------------------------------------------------------------|
| error.code    | string   | Có           | Mã lỗi máy đọc, cố định (bảng 3.2)                           |
| error.message | string   | Có           | Mô tả tiếng Việt cho người đọc; không dùng để rẽ nhánh logic |
| error.details | array    | Không        | Chỉ có với VALIDATION_ERROR: danh sách { path, issue }       |

# 4. Chi tiết từng Endpoint (Endpoint Reference)

Ký hiệu 🔒 = cần header Authorization: Bearer \<accessToken\>. Mọi request có body cần header Content-Type: application/json.

## 4.1 Kiểm tra tình trạng hệ thống

|                  |                                                                                         |
|------------------|-----------------------------------------------------------------------------------------|
| **Method & URL** | GET /health                                                                             |
| **Mô tả**        | Kiểm tra server và kết nối database. Dùng cho load balancer và dịch vụ kiểm tra uptime. |
| **Use case** | — (vận hành) |
| **Phương thức service** | — |

**Headers yêu cầu**

Không có.

**URL / Query Parameters**

Không có.

**Response thành công (200 OK)**

```json
{
  "status": "ok",
  "db": "ok"
}
```

**Response lỗi**

503 Service Unavailable

```json
{
  "status": "degraded",
  "db": "down"
}
```

## 4.2 Đăng ký tài khoản

|                  |                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | POST /auth/register                                                                                               |
| **Mô tả**        | Tạo tài khoản mới và đăng nhập luôn (trả access token, đặt cookie refresh token). Giới hạn 10 lần / 15 phút / IP. |
| **Use case** | UC.08 Đăng ký / Đăng nhập |
| **Phương thức service** | AuthService.dangKy |

**Headers yêu cầu**

| **Header**   | **Kiểu** | **Bắt buộc** | **Mô tả**        |
|--------------|----------|--------------|------------------|
| Content-Type | string   | Bắt buộc     | application/json |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường**  | **Kiểu** | **Bắt buộc** | **Mô tả / ràng buộc**                                           |
|-------------|----------|--------------|-----------------------------------------------------------------|
| email       | string   | Bắt buộc     | Email hợp lệ, ≤ 254 ký tự; không phân biệt hoa thường, duy nhất |
| password    | string   | Bắt buộc     | 8–128 ký tự                                                     |
| displayName | string   | Bắt buộc     | 1–40 ký tự                                                      |

```json
{
  "email": "linh@example.com",
  "password": "matkhau-cua-ban",
  "displayName": "Linh"
}
```

**Response thành công (201 Created)**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 900,
  "user": {
    "id": "0192f3a1-7c2e-7b10-9a51-3f2c8d4e6a01",
    "email": "linh@example.com",
    "displayName": "Linh",
    "createdAt": "2026-11-07T10:00:00.000Z"
  }
}
```

Kèm header Set-Cookie: fs_rt=...; HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth.

**Response lỗi**

400 VALIDATION_ERROR

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Mật khẩu cần ít nhất 8 ký tự.",
    "details": [
      {
        "path": "password",
        "issue": "too_small"
      }
    ]
  }
}
```

409 EMAIL_TAKEN

```json
{
  "error": {
    "code": "EMAIL_TAKEN",
    "message": "Email này đã được đăng ký."
  }
}
```

429 RATE_LIMITED

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Bạn thử quá nhiều lần. Vui lòng đợi rồi thử lại."
  }
}
```

## 4.3 Đăng nhập

|                  |                                                                                                                     |
|------------------|---------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | POST /auth/login                                                                                                    |
| **Mô tả**        | Đăng nhập bằng email và mật khẩu; cập nhật thời điểm đăng nhập gần nhất. Giới hạn 10 lần / 15 phút theo IP + email. |
| **Use case** | UC.08 Đăng ký / Đăng nhập |
| **Phương thức service** | AuthService.dangNhap |

**Headers yêu cầu**

| **Header**   | **Kiểu** | **Bắt buộc** | **Mô tả**        |
|--------------|----------|--------------|------------------|
| Content-Type | string   | Bắt buộc     | application/json |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường** | **Kiểu** | **Bắt buộc** | **Mô tả / ràng buộc** |
|------------|----------|--------------|-----------------------|
| email      | string   | Bắt buộc     | Email đã đăng ký      |
| password   | string   | Bắt buộc     | Mật khẩu              |

```json
{
  "email": "linh@example.com",
  "password": "matkhau-cua-ban"
}
```

**Response thành công (200 OK)**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 900,
  "user": {
    "id": "0192f3a1-7c2e-7b10-9a51-3f2c8d4e6a01",
    "email": "linh@example.com",
    "displayName": "Linh",
    "createdAt": "2026-11-07T10:00:00.000Z"
  }
}
```

Kèm cookie fs_rt như khi đăng ký.

**Response lỗi**

401 INVALID_CREDENTIALS

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email hoặc mật khẩu không đúng."
  }
}
```

429 RATE_LIMITED

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Bạn thử quá nhiều lần. Vui lòng đợi rồi thử lại."
  }
}
```

- Thông báo lỗi giống nhau cho sai email và sai mật khẩu để không lộ email nào đã đăng ký.

## 4.4 Làm mới phiên (refresh)

|                  |                                                                                                      |
|------------------|------------------------------------------------------------------------------------------------------|
| **Method & URL** | POST /auth/refresh                                                                                   |
| **Mô tả**        | Đổi refresh token (cookie) lấy access token mới. Refresh token cũ bị thu hồi và cookie mới được đặt. |
| **Use case** | UC.09 Đồng bộ phòng giữa các thiết bị (làm mới phiên khi mở app) |
| **Phương thức service** | AuthService.lamMoiPhien |

**Headers yêu cầu**

| **Header** | **Kiểu** | **Bắt buộc** | **Mô tả**                                    |
|------------|----------|--------------|----------------------------------------------|
| Cookie     | string   | Bắt buộc     | fs_rt=\<refresh token\> (trình duyệt tự gửi) |

**URL / Query Parameters**

Không có.

**Request Body**

Không có body.

**Response thành công (200 OK)**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 900,
  "user": {
    "id": "0192f3a1-7c2e-7b10-9a51-3f2c8d4e6a01",
    "email": "linh@example.com",
    "displayName": "Linh",
    "createdAt": "2026-11-07T10:00:00.000Z"
  }
}
```

Kèm cookie fs_rt mới.

**Response lỗi**

401 INVALID_REFRESH_TOKEN

```json
{
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Phiên đăng nhập đã hết hạn."
  }
}
```

- Nếu một refresh token đã thu hồi bị dùng lại, server thu hồi toàn bộ chuỗi token cùng family_id (nghi bị đánh cắp).

## 4.5 Đăng xuất

|                  |                                                                                  |
|------------------|----------------------------------------------------------------------------------|
| **Method & URL** | POST /auth/logout                                                                |
| **Mô tả**        | Thu hồi refresh token hiện tại và xóa cookie. Không báo lỗi nếu không có cookie. |
| **Use case** | UC.11 Quản lý tài khoản (extend Đăng xuất) |
| **Phương thức service** | AuthService.dangXuat |

**Headers yêu cầu**

| **Header** | **Kiểu** | **Bắt buộc** | **Mô tả**               |
|------------|----------|--------------|-------------------------|
| Cookie     | string   | Tùy chọn     | fs_rt=\<refresh token\> |

**URL / Query Parameters**

Không có.

**Request Body**

Không có body.

**Response thành công (204 No Content)**

Không có body.

## 4.6 Lấy thông tin tài khoản

|                  |                                          |
|------------------|------------------------------------------|
| **Method & URL** | GET /me 🔒                               |
| **Mô tả**        | Trả thông tin người dùng đang đăng nhập. |
| **Use case** | UC.11 Quản lý tài khoản |
| **Phương thức service** | AuthService.layTaiKhoan |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**              |
|---------------|----------|--------------|------------------------|
| Authorization | string   | Bắt buộc     | Bearer \<accessToken\> |

**URL / Query Parameters**

Không có.

**Response thành công (200 OK)**

```json
{
  "id": "0192f3a1-7c2e-7b10-9a51-3f2c8d4e6a01",
  "email": "linh@example.com",
  "displayName": "Linh",
  "createdAt": "2026-11-07T10:00:00.000Z"
}
```

**Response lỗi**

401 UNAUTHENTICATED

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Bạn cần đăng nhập."
  }
}
```

## 4.7 Đổi tên hiển thị

|                  |                                                                   |
|------------------|-------------------------------------------------------------------|
| **Method & URL** | PATCH /me 🔒                                                      |
| **Mô tả**        | Cập nhật một phần thông tin tài khoản (hiện chỉ có tên hiển thị). |
| **Use case** | UC.11 Quản lý tài khoản (extend Đổi tên hiển thị) |
| **Phương thức service** | AuthService.doiTenHienThi |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**              |
|---------------|----------|--------------|------------------------|
| Authorization | string   | Bắt buộc     | Bearer \<accessToken\> |
| Content-Type  | string   | Bắt buộc     | application/json       |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường**  | **Kiểu** | **Bắt buộc** | **Mô tả / ràng buộc** |
|-------------|----------|--------------|-----------------------|
| displayName | string   | Bắt buộc     | 1–40 ký tự            |

```json
{
  "displayName": "Linh Nguyễn"
}
```

**Response thành công (200 OK)**

```json
{
  "id": "0192f3a1-7c2e-7b10-9a51-3f2c8d4e6a01",
  "email": "linh@example.com",
  "displayName": "Linh Nguyễn",
  "createdAt": "2026-11-07T10:00:00.000Z"
}
```

**Response lỗi**

400 VALIDATION_ERROR

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Tên hiển thị tối đa 40 ký tự.",
    "details": [
      {
        "path": "displayName",
        "issue": "too_big"
      }
    ]
  }
}
```

401 UNAUTHENTICATED

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Bạn cần đăng nhập."
  }
}
```

## 4.8 Xóa tài khoản

|                  |                                                                                                                              |
|------------------|------------------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | DELETE /me 🔒                                                                                                                |
| **Mô tả**        | Xóa tài khoản, mọi refresh token và trạng thái phòng. Số liệu telemetry được giữ nhưng tách khỏi tài khoản (user_id = NULL). |
| **Use case** | UC.11 Quản lý tài khoản (extend Xóa tài khoản) |
| **Phương thức service** | AuthService.xoaTaiKhoan |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**              |
|---------------|----------|--------------|------------------------|
| Authorization | string   | Bắt buộc     | Bearer \<accessToken\> |
| Content-Type  | string   | Bắt buộc     | application/json       |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường** | **Kiểu** | **Bắt buộc** | **Mô tả / ràng buộc**         |
|------------|----------|--------------|-------------------------------|
| password   | string   | Bắt buộc     | Mật khẩu hiện tại để xác nhận |

```json
{
  "password": "matkhau-cua-ban"
}
```

**Response thành công (204 No Content)**

Không có body; cookie fs_rt bị xóa.

**Response lỗi**

401 INVALID_CREDENTIALS

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Mật khẩu không đúng."
  }
}
```

401 UNAUTHENTICATED

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Bạn cần đăng nhập."
  }
}
```

## 4.9 Lấy trạng thái phòng

|                  |                                                                                                                  |
|------------------|------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | GET /room-state 🔒                                                                                               |
| **Mô tả**        | Trả trạng thái phòng đã đồng bộ của người dùng. Nếu dữ liệu lưu theo schemaVer cũ, server migrate trước khi trả. |
| **Use case** | UC.09 Đồng bộ phòng giữa các thiết bị |
| **Phương thức service** | RoomStateService.layTrangThai |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**              |
|---------------|----------|--------------|------------------------|
| Authorization | string   | Bắt buộc     | Bearer \<accessToken\> |

**URL / Query Parameters**

Không có.

**Response thành công (200 OK)**

```json
{
  "data": {
    "schemaVer": 4,
    "room": "study",
    "lastIndoor": "study",
    "masterOn": true,
    "masterVol": 0.8,
    "headphone": {
      "on": false,
      "vol": 0.6,
      "track": 0
    },
    "study": {
      "weather": "rain",
      "curtain": "open",
      "windowOn": true,
      "windowVol": 0.6,
      "fireOn": true,
      "fireVol": 0.5,
      "fireSide": "right",
      "rug": 0,
      "lampOn": true,
      "items": [
        {
          "id": "a1b2c3d",
          "type": "lamp",
          "x": 124,
          "y": 91,
          "on": true,
          "vol": 0
        },
        {
          "id": "e4f5g6h",
          "type": "cup",
          "x": 186,
          "y": 101,
          "on": true,
          "vol": 0
        },
        {
          "id": "i7j8k9l",
          "type": "bigplant",
          "x": 296,
          "y": 125,
          "on": true,
          "vol": 0
        }
      ]
    },
    "bed": {
      "weather": "stars",
      "curtain": "open",
      "windowOn": true,
      "windowVol": 0.5,
      "lampOn": true,
      "wallClock": {
        "on": false,
        "vol": 0.4
      },
      "rug": 0,
      "items": [
        "…"
      ]
    },
    "out": {
      "scene": "forest",
      "on": true,
      "vol": 0.6
    }
  },
  "schemaVer": 4,
  "revision": 12,
  "updatedAt": "2026-11-07T10:05:00.000Z",
  "updatedFrom": "dev-7f3a9c"
}
```

Cấu trúc data xem Phụ lục A. Ví dụ rút gọn bed.items.

**Response lỗi**

404 NOT_FOUND

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Tài khoản chưa có phòng được lưu."
  }
}
```

401 UNAUTHENTICATED

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Bạn cần đăng nhập."
  }
}
```

- 404 là kết quả bình thường lần đầu đăng nhập: client tải phòng cục bộ lên bằng PUT với baseRevision: 0.

## 4.10 Lưu trạng thái phòng

|                  |                                                                                                                                                                            |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | PUT /room-state 🔒                                                                                                                                                         |
| **Mô tả**        | Ghi đè toàn bộ trạng thái phòng, có kiểm tra phiên bản để tránh hai thiết bị ghi đè lẫn nhau. Client gọi sau 2 giây kể từ thay đổi cuối và khi đóng tab (fetch keepalive). |
| **Use case** | UC.09 (kích hoạt bởi thay đổi ở UC.02–UC.04) |
| **Phương thức service** | RoomStateService.luuTrangThai |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**              |
|---------------|----------|--------------|------------------------|
| Authorization | string   | Bắt buộc     | Bearer \<accessToken\> |
| Content-Type  | string   | Bắt buộc     | application/json       |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường**   | **Kiểu**           | **Bắt buộc** | **Mô tả / ràng buộc**                                                      |
|--------------|--------------------|--------------|----------------------------------------------------------------------------|
| data         | object (RoomState) | Bắt buộc     | Toàn bộ trạng thái phòng (Phụ lục A); ≤ 64 KB                              |
| baseRevision | integer ≥ 0        | Bắt buộc     | Revision client đang có; 0 nếu tài khoản chưa có phòng                     |
| deviceId     | string             | Bắt buộc     | ≤ 64 ký tự; id ngẫu nhiên của trình duyệt                                  |
| force        | boolean            | Tùy chọn     | Mặc định false. true chỉ dùng khi người dùng chọn “Giữ phòng trên máy này” |

```json
{
  "data": {
    "schemaVer": 4,
    "room": "bed",
    "…": "…"
  },
  "baseRevision": 12,
  "deviceId": "dev-7f3a9c",
  "force": false
}
```

**Response thành công (200 OK)**

```json
{
  "revision": 13,
  "updatedAt": "2026-11-07T10:06:02.000Z"
}
```

**Response lỗi**

409 REVISION_CONFLICT

```json
{
  "error": {
    "code": "REVISION_CONFLICT",
    "message": "Phòng đã được cập nhật từ thiết bị khác."
  },
  "current": {
    "data": {
      "schemaVer": 4,
      "…": "…"
    },
    "revision": 14,
    "updatedAt": "2026-11-07T10:05:40.000Z"
  }
}
```

400 VALIDATION_ERROR

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Trạng thái phòng không hợp lệ.",
    "details": [
      {
        "path": "data.out.scene",
        "issue": "invalid_enum_value"
      }
    ]
  }
}
```

413 PAYLOAD_TOO_LARGE

```json
{
  "error": {
    "code": "PAYLOAD_TOO_LARGE",
    "message": "Trạng thái phòng vượt quá 64 KB."
  }
}
```

- force=false và baseRevision bằng revision hiện tại (hoặc 0 khi chưa có) → ghi, revision tăng 1.

- force=false và lệch → 409 kèm bản hiện có trong current; client áp bản này và thông báo người dùng.

- force=true → ghi đè, revision tăng 1.

- Server ép số về khoảng hợp lệ và bỏ đồ vật sai loại phòng thay vì báo lỗi.

## 4.11 Gửi lô số liệu (telemetry)

|                  |                                                                                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Method & URL** | POST /telemetry/batch                                                                                                                               |
| **Mô tả**        | Ghi phiên sử dụng, phiên Pomodoro và lỗi client để đo KPI. Không bắt buộc đăng nhập; nếu có access token thì gắn với tài khoản. Idempotent theo id. |
| **Use case** | UC.05, UC.06 (include Ghi nhận số liệu sử dụng), UC.03 (lỗi audio), UC.10 (gửi lô trước khi tải thống kê) |
| **Phương thức service** | TelemetryService.nhanLo (202 Accepted) |

**Headers yêu cầu**

| **Header**    | **Kiểu** | **Bắt buộc** | **Mô tả**                               |
|---------------|----------|--------------|-----------------------------------------|
| Content-Type  | string   | Bắt buộc     | application/json                        |
| Authorization | string   | Tùy chọn     | Bearer \<accessToken\> nếu đã đăng nhập |

**URL / Query Parameters**

Không có.

**Request Body**

| **Trường**                                       | **Kiểu**        | **Bắt buộc**           | **Mô tả / ràng buộc**                                                                                                  |
|--------------------------------------------------|-----------------|------------------------|------------------------------------------------------------------------------------------------------------------------|
| clientId                                         | string          | Bắt buộc               | ≤ 64 ký tự; id ẩn danh của trình duyệt                                                                                 |
| sessions\[\]                                     | array           | Bắt buộc (có thể rỗng) | Phiên sử dụng                                                                                                          |
| sessions\[\].id                                  | uuid            | Bắt buộc               | Client sinh; gửi lại thì cập nhật                                                                                      |
| sessions\[\].startedAt / endedAt                 | ISO 8601 / null | Bắt buộc / Tùy chọn    | Bắt đầu, kết thúc (null nếu chưa kết thúc)                                                                             |
| sessions\[\].setupMs                             | integer         | Tùy chọn               | Thời gian tới thao tác đầu tiên                                                                                        |
| sessions\[\].interactionCount                    | integer         | Bắt buộc               | Số lần tương tác đồ vật                                                                                                |
| sessions\[\].visited                             | array           | Bắt buộc               | Các giá trị "study" \| "bed" \| "out"                                                                                  |
| sessions\[\].sleepTimerSet / sleepTimerCompleted | boolean         | Bắt buộc               | Có đặt hẹn giờ ngủ / chạy đến hết                                                                                      |
| pomodoros\[\]                                    | array           | Bắt buộc (có thể rỗng) | id (uuid), sessionId, mode "focus"\|"break", plannedSec, startedAt, endedAt, outcome "completed"\|"reset"\|"abandoned" |
| errors\[\]                                       | array           | Bắt buộc (có thể rỗng) | sessionId, kind ("audio_context_create" \| "audio_context_resume" \| "storage_write"), message ≤ 500, occurredAt       |

```json
{
  "clientId": "cl-5d1e8b",
  "sessions": [
    {
      "id": "0192f3b0-1111-7000-8000-000000000001",
      "startedAt": "2026-11-07T09:00:00.000Z",
      "endedAt": "2026-11-07T09:55:00.000Z",
      "setupMs": 8200,
      "interactionCount": 3,
      "visited": [
        "study",
        "out"
      ],
      "sleepTimerSet": false,
      "sleepTimerCompleted": false
    }
  ],
  "pomodoros": [
    {
      "id": "0192f3b0-2222-7000-8000-000000000002",
      "sessionId": "0192f3b0-1111-7000-8000-000000000001",
      "mode": "focus",
      "plannedSec": 1500,
      "startedAt": "2026-11-07T09:01:00.000Z",
      "endedAt": "2026-11-07T09:26:00.000Z",
      "outcome": "completed"
    }
  ],
  "errors": []
}
```

**Response thành công (202 Accepted)**

```json
{
  "accepted": {
    "sessions": 1,
    "pomodoros": 1,
    "errors": 0
  }
}
```

**Response lỗi**

400 VALIDATION_ERROR

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Lô số liệu không hợp lệ.",
    "details": [
      {
        "path": "pomodoros.0.mode",
        "issue": "invalid_enum_value"
      }
    ]
  }
}
```

413 PAYLOAD_TOO_LARGE

```json
{
  "error": {
    "code": "PAYLOAD_TOO_LARGE",
    "message": "Lô số liệu vượt quá 256 KB."
  }
}
```

429 RATE_LIMITED

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Gửi quá nhiều lô. Vui lòng thử lại sau."
  }
}
```

- Client gửi mỗi 60 giây hoặc khi ẩn tab; lỗi gửi thì bỏ qua, không ảnh hưởng trải nghiệm.

## 4.12 Lấy danh mục đồ vật

| **Method & URL** | **GET /catalog/items** |
|---|---|
| Mô tả | Trả các loại đồ vật trong bảng item_types (dữ liệu do seeder nạp từ danh mục của prototype). Công khai, không cần đăng nhập. Dùng cho trang Thư viện. |
| Use case | UC.07 Xem Thư viện đồ vật & khung cảnh |
| Phương thức service | CatalogService.layDoVat |

**Headers yêu cầu**

Không có header bắt buộc.

**URL / Query Parameters**

| **Tham số** | **Kiểu** | **Bắt buộc** | **Mô tả** |
|---|---|---|---|
| room | string | Tùy chọn | "study" hoặc "bed" — chỉ trả đồ dùng được ở phòng đó |
| group | string | Tùy chọn | "sound", "decor" hoặc "desk" |

**Request Body**

Không có body.

**Response thành công (200 OK)**

Ví dụ rút gọn cho GET /catalog/items?room=bed&group=sound (đủ 7 mục, xếp theo sort_order):

```json
{
  "items": [
    {
      "code": "radio",
      "name": "Radio",
      "description": "Nhạc Lo-fi",
      "group": "sound",
      "width": 20,
      "height": 12,
      "rooms": [
        "bed"
      ],
      "defaultVol": 0.5,
      "removable": true
    }
  ],
  "total": 7
}
```

Kèm header Cache-Control: public, max-age=3600.

**Response lỗi**

400 VALIDATION_ERROR

room hoặc group không thuộc các giá trị cho phép.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ.",
    "details": [
      {
        "path": "room",
        "issue": "invalid_enum_value"
      }
    ]
  }
}
```

## 4.13 Lấy danh sách khung cảnh

| **Method & URL** | **GET /catalog/scenes** |
|---|---|
| Mô tả | Trả 5 khung cảnh của Sân vườn trong bảng scenes (do seeder nạp). Công khai, không cần đăng nhập. Dùng cho trang Thư viện. |
| Use case | UC.07 Xem Thư viện đồ vật & khung cảnh |
| Phương thức service | CatalogService.layKhungCanh |

**Headers yêu cầu**

Không có header bắt buộc.

**URL / Query Parameters**

Không có.

**Request Body**

Không có body.

**Response thành công (200 OK)**

Ví dụ rút gọn (đủ 5 mục, xếp theo sort_order):

```json
{
  "scenes": [
    {
      "code": "city",
      "name": "Thành phố",
      "description": "Buổi tối, xe cộ lofi chill êm dịu",
      "isDefault": false
    },
    {
      "code": "forest",
      "name": "Khu rừng",
      "description": "Gió xào xạc lá, chim hót",
      "isDefault": true
    }
  ],
  "total": 5
}
```

Kèm header Cache-Control: public, max-age=3600.

**Response lỗi**

Không có lỗi riêng; lỗi chung theo mục 3.2.

## 4.14 Lấy thống kê học tập

| **Method & URL** | **GET /me/stats 🔒** |
|---|---|
| Mô tả | Trả số liệu học tập của người dùng đang đăng nhập, tính từ pomodoro_sessions và usage_sessions gắn với tài khoản. Dùng cho trang Thống kê. |
| Use case | UC.10 Xem Thống kê học tập |
| Phương thức service | StatsService.layThongKe |

**Headers yêu cầu**

| **Header** | **Kiểu** | **Bắt buộc** | **Mô tả** |
|---|---|---|---|
| Authorization | string | Bắt buộc | Bearer \<accessToken\> |

**URL / Query Parameters**

| **Tham số** | **Kiểu** | **Bắt buộc** | **Mô tả** |
|---|---|---|---|
| range | string | Tùy chọn | "7d" (mặc định), "30d" hoặc "all" |
| tz | string | Tùy chọn | Múi giờ IANA để gom số liệu theo ngày; mặc định "Asia/Ho_Chi_Minh" |

**Request Body**

Không có body.

**Response thành công (200 OK)**

```json
{
  "range": "7d",
  "from": "2026-11-04",
  "to": "2026-11-10",
  "totals": {
    "focusMinutes": 58,
    "pomodoroCompleted": 2,
    "pomodoroStarted": 3,
    "completionRate": 0.67,
    "sessions": 2
  },
  "daily": [
    {
      "date": "2026-11-10",
      "focusMinutes": 58,
      "pomodoroCompleted": 2
    }
  ],
  "recent": [
    {
      "id": "0192f3b0-2222-7000-8000-000000000001",
      "mode": "focus",
      "plannedSec": 1500,
      "startedAt": "2026-11-10T13:00:00.000Z",
      "endedAt": "2026-11-10T13:25:00.000Z",
      "outcome": "completed"
    }
  ]
}
```

- focusMinutes: tổng số phút thực của các phiên Focus đã kết thúc trong khoảng (gồm cả phiên đặt lại hoặc bỏ dở), làm tròn xuống.

- pomodoroCompleted / pomodoroStarted: số phiên Focus hoàn thành / đã bắt đầu; completionRate = completed / started, bằng 0 khi chưa có phiên.

- sessions: số phiên sử dụng của tài khoản trong khoảng.

- daily: mỗi ngày trong khoảng một phần tử, kể cả ngày bằng 0, theo múi giờ tz; với "all", bắt đầu từ ngày đầu tiên có dữ liệu.

- recent: tối đa 10 phiên Pomodoro gần nhất, mới nhất trước.

- Chỉ tính số liệu được gửi kèm access token của chính tài khoản này.

**Response lỗi**

401 UNAUTHENTICATED

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "Bạn cần đăng nhập."
  }
}
```

400 VALIDATION_ERROR

range hoặc tz không hợp lệ; cấu trúc lỗi như mục 4.12.

# 5. Rate Limiting & Versioning

## 5.1 Rate Limit

| **Endpoint**                        | **Giới hạn**         | **Khóa đếm** |
|-------------------------------------|----------------------|--------------|
| POST /auth/register                 | 10 request / 15 phút | IP           |
| POST /auth/login                    | 10 request / 15 phút | IP + email   |
| POST /telemetry/batch               | 60 request / giờ     | clientId     |
| POST /auth/refresh                  | 30 request / 15 phút | IP           |
| Các endpoint 🔒 còn lại             | 120 request / phút   | user id      |
| GET /health                         | Không giới hạn       | —            |
| GET /catalog/items, GET /catalog/scenes | 120 request / phút | IP |

Mọi response của endpoint có giới hạn kèm header:

| **Header**            | **Ý nghĩa**                                                 |
|-----------------------|-------------------------------------------------------------|
| X-RateLimit-Limit     | Số request tối đa trong cửa sổ hiện tại |
| X-RateLimit-Remaining | Số request còn lại                      |
| X-RateLimit-Reset     | Số giây đến khi cửa sổ mới bắt đầu      |
| Retry-After           | Chỉ có ở response 429: số giây nên chờ trước khi thử lại    |

## 5.2 Versioning

- Phiên bản API nằm trên URL: /api/v1/.... Mọi endpoint hiện tại thuộc v1.

- Thay đổi **không phá vỡ** (thêm endpoint, thêm trường tùy chọn trong request, thêm trường trong response) được làm ngay trong v1. Client phải bỏ qua trường không biết.

- Thay đổi **phá vỡ** (đổi tên/xóa trường, đổi kiểu, đổi ý nghĩa mã lỗi) ra mắt ở /api/v2; v1 được duy trì song song ít nhất 90 ngày \[Đề xuất\] và báo trước qua header Deprecation.

- Cấu trúc trạng thái phòng có phiên bản riêng schemaVer (hiện là 4), độc lập với phiên bản API; server tự migrate dữ liệu cũ khi đọc.

# Phụ lục A — Đối tượng RoomState

Dùng trong GET /room-state (trường data) và PUT /room-state (trường data). Cùng nội dung với dữ liệu LocalStorage của prototype FocuSpace-Semi-Sandbox.html (prototype lưu dạng phẳng, ver 3), sắp lại theo từng phòng và thêm schemaVer; hàm migrate chuyển dạng cũ sang dạng này.

| **Trường**                                  | **Kiểu**                  | **Giá trị / ràng buộc**                                                                                                     |
|---------------------------------------------|---------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| schemaVer                                   | integer                   | 4                                                                                                                           |
| room                                        | string                    | "study" \| "bed" \| "out" — không gian đang ở                                                                               |
| lastIndoor                                  | string                    | "study" \| "bed"                                                                                                            |
| masterOn / masterVol                        | boolean / number          | Mặc định true / 0.8 (0–1)                                                                                                   |
| headphone                                   | object                    | { on, vol, track: 0\|1\|2 } — dùng chung Phòng học và Sân vườn                                                              |
| study.weather                               | string                    | "clear" \| "rain" \| "storm" \| "sunset"                                                                                    |
| study.curtain                               | string                    | "open" \| "half" \| "closed"                                                                                                |
| study.windowOn / windowVol                  | boolean / number          | Âm ngoài cửa sổ                                                                                                             |
| study.fireOn / fireVol / fireSide           | boolean / number / string | Lò sưởi; fireSide "left" \| "right"                                                                                         |
| study.rug                                   | integer                   | 0–3 (Đỏ rượu, Xanh rêu, Xanh lam, Kem len)                                                                                  |
| study.lampOn                                | boolean                   | Đèn bàn                                                                                                                     |
| study.items                                 | Item\[\]                  | ≤ 40; loại hợp lệ: tv, cat, clock, bigplant, plant, cactus, books, frame, candle, lamp, cup                                 |
| bed.weather                                 | string                    | "stars" \| "rain" \| "wind"                                                                                                 |
| bed.curtain / windowOn / windowVol / lampOn | —                         | Như Phòng học; lampOn là đèn ngủ                                                                                            |
| bed.wallClock                               | object                    | { on, vol } — tiếng tích tắc đồng hồ tường                                                                                  |
| bed.rug                                     | integer                   | 0–3 (Tím sao, Xanh đêm, Hồng nhạt, Kem len)                                                                                 |
| bed.items                                   | Item\[\]                  | ≤ 40; loại hợp lệ: catbed, radio, diffuser, vinyl, musicbox, fan, cat, clock, bigplant, plant, cactus, books, frame, candle |
| out.scene                                   | string                    | "city" \| "forest" \| "beach" \| "glacier" \| "hill"                                                                        |
| out.on / out.vol                            | boolean / number          | Âm khung cảnh                                                                                                               |

### Item

| **Trường** | **Kiểu**        | **Mô tả**                              |
|------------|-----------------|----------------------------------------|
| id         | string          | ≤ 16 ký tự                             |
| type       | string          | Một trong 17 loại đồ vật (bảng item_types, GET /catalog/items)               |
| x, y       | number          | Góc trên-trái trong hệ 320×180         |
| on, vol    | boolean, number | Bật/tắt và âm lượng 0–1                |
| track      | integer         | Tùy chọn, 0–2 (radio, vinyl)           |
| art        | integer         | Tùy chọn, 0–9 (khung ảnh)              |
| bedId      | string \| null  | Tùy chọn (mèo): id giường mèo đang nằm |

*Giới hạn: tối đa 1 lamp và 1 cup; tổng data ≤ 64 KB.*

# Lịch sử thay đổi

| **Phiên bản** | **Ngày** | **Thay đổi** |
|---|---|---|
| v1.0 | 07/11/2026 | Bản đã phê duyệt. |
| v1.1 | 10/11/2026 | Bổ sung endpoint danh mục (4.12, 4.13) và thống kê (4.14). |
| v1.2 | 12/11/2026 | Đồng bộ với Chương 1 Phân tích hệ thống: mỗi endpoint 4.1–4.14 thêm dòng “Use case” và “Phương thức service”; mục 1 thêm bảng tóm tắt endpoint ↔ use case ↔ service. Không đổi schema request/response, mã lỗi, rate limit. |
| v1.2 (duyệt) | 13/11/2026 | Nội dung không đổi; v1.1 – v1.2 đã duyệt ở buổi họp kế hoạch 13/11/2026. |
| v1.2 (chốt) | 13/11/2026 | 5.1: chốt giới hạn cho /auth/refresh (30 / 15 phút), endpoint 🔒 còn lại và danh mục (120 / phút), cùng 3 header X-RateLimit-*. |
