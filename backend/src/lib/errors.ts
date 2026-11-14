/** Lỗi nghiệp vụ trả về theo định dạng chuẩn (API §3.3). */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public extra?: Record<string, unknown>,
  ) {
    super(message);
  }
}
export const notFound = (code: string, msg: string) => new ApiError(404, code, msg);
export const unauthenticated = (msg = "Bạn cần đăng nhập.") => new ApiError(401, "UNAUTHENTICATED", msg);
