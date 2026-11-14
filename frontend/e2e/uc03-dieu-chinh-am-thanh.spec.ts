import { test } from "@playwright/test";

test.describe("UC.03 Điều chỉnh âm thanh (H2)", () => {
  test.fixme("AC-03.1 nhấp lần đầu thì chip đổi thành Âm thanh đang phát", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-03.2 kéo Master xuống 50% thì mọi nguồn nhỏ lại", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-03.3 đồ ở góc xa nhất vẫn có gain ≥ 0,15", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-03.4 popover Tivi: thanh Trái/Phải lệch trái", async ({ page }) => {
    await page.goto("/");
  });
});
