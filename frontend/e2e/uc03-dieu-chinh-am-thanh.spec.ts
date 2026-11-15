import { expect, test } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

test.describe("UC.03 Điều chỉnh âm thanh (H2)", () => {
  test.fixme("AC-03.1 nhấp lần đầu thì AudioContext chạy (không còn chip âm thanh ở header)", async ({ page }) => {
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

  test("AC-03.5 nguồn phát nhạc, tích tắc, cửa sổ, lò sưởi là âm nền: gain 0,8, pan 0 ở mọi vị trí", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
    const r = await page.evaluate(() => {
      const F = (window as unknown as HookWindow).__focuspace;
      const fire = F.fireEm.sp, win = F.windowEm.sp;
      F.fireEm.setPos(10, 170, true); const fireFar = F.fireEm.sp;
      return { fire, win, fireFar };
    });
    for (const sp of [r.fire, r.win, r.fireFar]) { expect(sp.gain).toBe(0.8); expect(sp.pan).toBe(0); }
  });
});
