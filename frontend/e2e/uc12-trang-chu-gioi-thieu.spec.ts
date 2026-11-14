import { test } from "@playwright/test";

test.describe("UC.12 Trang chủ, Giới thiệu (Thịnh)", () => {
  test.fixme("AC-12.1 Vào phòng chuyển /room", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-12.2 /about đủ mục tiêu, cách dùng, thành viên, liên hệ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-12.3 URL lạ hiện 404", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-12.4 thanh điều hướng thu thành menu dưới 640 px", async ({ page }) => {
    await page.goto("/");
  });
});
