import { expect, test } from "@playwright/test";

test.describe("UC.06 Hẹn giờ ngủ (Lộc)", () => {
  test.fixme("AC-06.1 chọn 15 phút: đếm ngược, 2 phút cuối giảm âm, hết giờ hiện thông báo trong ô Hẹn giờ ngủ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-06.2 chạm thông báo thì âm trở lại", async ({ page }) => {
    await page.goto("/");
  });

  test("AC-06.3 ▲▼ ở header chỉnh hẹn giờ: đang tắt bấm ▲ 10 phút thì bắt đầu 10:00, ▼ 1 phút còn 9:00", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as any).__focuspace);
    await page.evaluate(() => (window as any).__focuspace.switchRoom("bed"));
    const box = page.locator('#sleepMini [data-adj="sleep"]');
    await expect(box).toBeVisible();
    await box.getByRole("button", { name: "Tăng 10 phút" }).click();
    await expect(page.locator("#sleepTime")).toHaveText(/^(10:00|09:5\d)$/);
    await box.getByRole("button", { name: "Giảm 1 phút" }).click();
    await expect(page.locator("#sleepTime")).toHaveText(/^(09:00|08:5\d)$/);
  });
});
