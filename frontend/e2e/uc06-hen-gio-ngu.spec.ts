import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Vào Phòng ngủ, chọn 15 phút rồi bấm Bắt đầu. */
async function startSleep15(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
  await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
  await page.waitForFunction(() => !(window as unknown as HookWindow).__focuspace.ROOM.busy && (window as unknown as HookWindow).__focuspace.ROOM.cur === "bed");
  await page.locator("#sleepTrig").click();
  await page.locator("#sleepPanel").getByRole("radio", { name: /^15 phút/ }).click();
  await page.locator("#sleepPlay").click();
  await expect(page.locator("#sleepTime")).toHaveText(/^(15:00|14:5\d)$/);
}

test.describe("UC.06 Hẹn giờ ngủ (Lộc)", () => {
  test("AC-06.1 chọn 15 phút: đếm ngược, 2 phút cuối giảm âm, hết giờ hiện thông báo trong ô Hẹn giờ ngủ", async ({ page }) => {
    await startSleep15(page);
    await page.keyboard.press("Shift");   // cú phím đầu tiên bật âm thanh (FR-AUD-07)
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.sleepRemaining(60));
    await expect(page.locator("#sleepMini")).toHaveClass(/fading/);
    await expect.poll(() => page.evaluate(() => (window as unknown as HookWindow).__focuspace.fade?.gain.value ?? 1)).toBeLessThan(0.9);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.sleepRemaining(1));
    await expect(page.locator("#sleepNote")).toBeVisible();
    await expect(page.locator("#sleepNote")).toHaveText("Hết giờ ngủ · chạm để bật lại âm thanh");
    await expect(page.locator("#sleepTime")).toHaveText("--:--");
  });
  test("AC-06.2 chạm thông báo thì âm trở lại", async ({ page }) => {
    await startSleep15(page);
    await page.keyboard.press("Shift");
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.sleepRemaining(1));
    await expect(page.locator("#sleepNote")).toBeVisible();
    await page.locator("#sleepNote").click();
    await expect(page.locator("#sleepNote")).toBeHidden();
    const audio = await page.evaluate(() => {
      const f = (window as unknown as HookWindow).__focuspace.fade;
      return f && { gain: f.gain.value, state: f.context.state };
    });
    expect(audio).toEqual({ gain: 1, state: "running" });
  });

  test("AC-06.3 header Phòng ngủ: bấm số giờ chọn Tắt/15/30/60 phút, rồi Bắt đầu / Tạm dừng như Pomodoro", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
    const box = page.locator("#sleepMini");
    await expect(box).toBeVisible();
    await expect(box.locator("[data-step]")).toHaveCount(0);
    await page.locator("#sleepTrig").click();
    const panel = page.locator("#sleepPanel");
    await expect(panel.getByRole("radio")).toHaveCount(4);
    await panel.getByRole("radio", { name: /^15 phút/ }).click();
    await expect(panel).toBeHidden();
    await expect(page.locator("#sleepTime")).toHaveText("15:00");   // chọn xong chưa chạy, chờ Bắt đầu
    const play = page.locator("#sleepPlay");
    await expect(play).toHaveText("Bắt đầu");
    await play.click();
    await expect(play).toHaveText("Tạm dừng");
    await expect(page.locator("#sleepTime")).toHaveText(/^(15:00|14:5\d)$/);
    await page.locator("#sleepTrig").click();
    await panel.getByRole("radio", { name: /^Tắt/ }).click();
    await expect(page.locator("#sleepTime")).toHaveText("--:--");
    await expect(play).toBeHidden();
  });
});
