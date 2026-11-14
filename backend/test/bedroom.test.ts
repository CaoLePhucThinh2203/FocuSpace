import { describe, it } from "vitest";

describe("Auth, /me, /me/stats (L2, L7–L9)", () => {
  it.todo("register 201 + cookie fs_rt; email trùng 409 EMAIL_TAKEN");
  it.todo("login sai trả 401 INVALID_CREDENTIALS (AC-08.4)");
  it.todo("login lần 11 trả 429 (AC-08.3)");
  it.todo("refresh xoay vòng; dùng lại token cũ thì thu hồi cả family");
  it.todo("logout 204 và xóa cookie");
  it.todo("PATCH /me tên rỗng hoặc > 40 ký tự trả 400");
  it.todo("DELETE /me sai mật khẩu 401; đúng thì xóa cascade, usage_sessions.user_id = NULL");
  it.todo("GET /me/stats 7d/30d/all đúng số liệu; daily đủ ngày kể cả 0");
});
