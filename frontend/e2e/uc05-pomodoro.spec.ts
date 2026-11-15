import { expect, test, type Page } from "@playwright/test";

/** Mở Căn phòng và chờ engine chạy (hook kiểm thử window.__focuspace). */
async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as any).__focuspace);
}

test.describe("UC.05 Pomodoro (Thịnh)", () => {
  test.fixme("AC-05.1 Pomodoro mini ở Sân vườn cùng giờ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.2 tab ẩn không trôi giờ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.3 hết giờ chuông + chuyển Nghỉ theo độ dài đã đặt (mặc định 5:00)", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-05.4 Đặt lại về độ dài Focus đã đặt (mặc định 25:00)", async ({ page }) => {
    await page.goto("/");
  });

  test("AC-05.5 ▲▼ trái ±1 phút, phải ±10 phút; khóa khi đang chạy", async ({ page }) => {
    await openRoom(page);
    const r = await page.evaluate(() => {
      const F = (window as any).__focuspace;
      F.pomoAdjust(1); const a = F.pomo.remaining;
      F.pomoAdjust(10); const b = F.pomo.remaining;
      F.pomoAdjust(-10); F.pomoAdjust(-1); const c = F.pomo.remaining;
      (document.getElementById("pomoMiniBtn") as HTMLButtonElement).click();
      F.pomoAdjust(10); const d = F.pomo.remaining;
      (document.getElementById("pomoMiniBtn") as HTMLButtonElement).click();
      return { a, b, c, d };
    });
    expect(r.a).toBe(26 * 60);
    expect(r.b).toBe(36 * 60);
    expect(r.c).toBe(25 * 60);
    expect(r.d).toBeLessThanOrEqual(25 * 60);   // đang chạy thì không chỉnh
  });
});
