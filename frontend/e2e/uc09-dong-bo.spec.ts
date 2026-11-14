import { test } from "@playwright/test";

test.describe("UC.09 Đồng bộ phòng (Thịnh)", () => {
  test.fixme("AC-09.1 đổi ở máy A, máy B thấy sau 2 giây", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-09.2 409 thì áp bản mới và báo", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-09.3 hộp thoại hợp nhất lần đầu", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-09.4 mất mạng vẫn lưu cục bộ", async ({ page }) => {
    await page.goto("/");
  });
});
