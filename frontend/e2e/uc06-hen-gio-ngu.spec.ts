import { expect, test } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

test.describe("UC.06 Hẹn giờ ngủ (Lộc)", () => {
  test.fixme("AC-06.1 chọn 15 phút: đếm ngược, 2 phút cuối giảm âm, hết giờ hiện thông báo trong ô Hẹn giờ ngủ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-06.2 chạm thông báo thì âm trở lại", async ({ page }) => {
    await page.goto("/");
  });

  test("AC-06.3 header Phòng ngủ chỉ có lựa chọn Tắt/15/30/45/60, không có nút chỉnh", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
    const box = page.locator("#sleepMini");
    await expect(box).toBeVisible();
    await expect(box.locator("[data-step]")).toHaveCount(0);
    await box.getByRole("button", { name: "15p" }).click();
    await expect(page.locator("#sleepTime")).toHaveText(/^(15:00|14:5\d)$/);
    await box.getByRole("button", { name: "Tắt" }).click();
    await expect(page.locator("#sleepTime")).toHaveText("--:--");
  });
});
