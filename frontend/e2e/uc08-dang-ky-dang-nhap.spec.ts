import { test } from "@playwright/test";

test.describe("UC.08 Đăng ký / Đăng nhập (Lộc)", () => {
  test.fixme("AC-08.1 đăng ký hợp lệ thì đăng nhập luôn, phòng được tải lên", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-08.2 mật khẩu 7 ký tự báo lỗi ngay", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-08.3 đăng nhập lần 11 trả 429", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-08.4 sai mật khẩu báo lỗi", async ({ page }) => {
    await page.goto("/");
  });
});
