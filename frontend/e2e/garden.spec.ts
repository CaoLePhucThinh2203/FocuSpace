import { test } from "@playwright/test";

test.describe("Sân vườn, khung cảnh (N2)", () => {
  test.fixme("AC-01.3 bấm cửa nhà luôn vào Phòng học", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-02.3 mở Khung cảnh, chọn Bãi biển thì hình và âm đổi ngay, lựa chọn được lưu", async ({ page }) => {
    await page.goto("/");
  });
});