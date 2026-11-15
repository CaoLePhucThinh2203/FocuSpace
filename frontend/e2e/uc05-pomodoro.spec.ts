import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Mở Căn phòng và chờ engine chạy (hook kiểm thử window.__focuspace). */
async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
}

test.describe("UC.05 Pomodoro (Thịnh)", () => {
  test.fixme("AC-05.1 Pomodoro mini ở Sân vườn cùng giờ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.2 tab ẩn không trôi giờ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.3 hết giờ chuông + chuyển Nghỉ ngắn theo nhịp đã chọn (mặc định 5:00)", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.4 Đặt lại vòng về phiên Focus đầu tiên (mặc định 25:00)", async ({ page }) => {
    await page.goto("/");
  });

  test("AC-05.5 chọn nhịp học: đang dừng áp dụng ngay, đang chạy áp dụng từ phiên sau", async ({ page }) => {
    await openRoom(page);
    await page.locator("#pomoTrig").click();
    const panel = page.locator("#pomoPanel");
    await expect(panel).toBeVisible();
    await panel.getByRole("radio", { name: /Sâu/ }).click();
    await expect(page.locator("#pomoMiniTime")).toHaveText("50:00");
    await page.locator("#pomoMiniBtn").click();
    await panel.getByRole("radio", { name: /Nhẹ/ }).click();
    await expect(panel.getByRole("status")).toContainText("phiên sau");
    await expect(page.locator("#pomoMiniTime")).toHaveText(/^(50:00|49:5\d)$/);
  });

  test("AC-05.7 đủ 4 phiên Focus thì nghỉ dài, xong nghỉ dài bắt đầu vòng mới", async ({ page }) => {
    await openRoom(page);
    const end = () => page.evaluate(() => {
      const F = (window as unknown as HookWindow).__focuspace;
      if (!F.pomo.running) (document.getElementById("pomoMiniBtn") as HTMLButtonElement).click();
      F.pomo.endAt = Date.now() - 1;
    });
    const phases: string[] = [];
    for (let i = 0; i < 8; i++) {
      await end();
      await page.waitForFunction(() => !(window as unknown as HookWindow).__focuspace.pomo.running);
      phases.push(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.mode));
    }
    expect(phases).toEqual(["short", "focus", "short", "focus", "short", "focus", "long", "focus"]);
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.done)).toBe(0);
  });

  test("AC-05.8 vào Phòng ngủ thì Pomodoro tự tạm dừng và ẩn khỏi header", async ({ page }) => {
    await openRoom(page);
    await page.locator("#pomoMiniBtn").click();
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
    await expect(page.locator(".pomo-mini")).toBeHidden();
    await expect(page.locator("#sleepMini")).toBeVisible();
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.running)).toBe(false);
  });
});
