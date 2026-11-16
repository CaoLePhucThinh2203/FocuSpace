import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Bài đang phát ở tai nghe (cùng bộ đệm với tai nghe ngoài Sân vườn): chỉ số trong lofiCache, −1 nếu chưa có. */
const playing = (page: Page) => page.evaluate(() => {
  const F = (window as unknown as HookWindow).__focuspace, b = F.outHeadEm.cur?.s.buffer;
  return b ? F.lofiCache.lofi.indexOf(b) : -1;
});
const gain = (page: Page) => page.evaluate(() => (window as unknown as HookWindow).__focuspace.outHeadEm.cur?.g.gain.value ?? -1);

test.describe("UC.03 Đổi bài nhạc (PRD v5.14)", () => {
  test("AC-03.6 đổi bài: báo đang chuẩn bị, chuyển 1,5 giây, quay lại bài vừa nghe thì phát ngay", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
    await page.mouse.click(5, 5);   // cú nhấp đầu: bật âm thanh, dựng bài đang chọn (Chiều mưa)
    await expect.poll(() => playing(page), { timeout: 20000 }).toBe(0);

    await page.getByRole("button", { name: "Tai nghe · nhạc Lo-fi" }).click();
    const song1 = page.locator('.pop [data-t="1"]'), song0 = page.locator('.pop [data-t="0"]');
    await song1.click();
    await expect(song1).toHaveAttribute("aria-busy", "true");          // bài chưa dựng: hiện "Đang chuẩn bị…"
    expect(await playing(page)).toBe(0);                               // trong lúc chờ, bài cũ vẫn phát
    await expect(song1).toHaveAttribute("aria-busy", "false", { timeout: 20000 });

    await expect.poll(() => playing(page)).toBe(1);
    expect(await gain(page)).toBeLessThan(0.95);                       // đang chuyển, chưa to hẳn (chuyển 1,5 giây, không phải 0,3 giây)
    await expect.poll(() => gain(page), { timeout: 4000 }).toBeGreaterThan(0.99);

    const cached = await page.evaluate(() => (window as unknown as HookWindow).__focuspace.lofiCache.lofi.map(b => !!b));
    expect(cached.slice(0, 2)).toEqual([true, true]);                  // bài vừa nghe vẫn giữ trong bộ nhớ

    await song0.click();
    await expect(song0).toHaveAttribute("aria-busy", "false");
    expect(await playing(page)).toBe(0);                               // quay lại bài vừa nghe: phát ngay, không phải dựng lại
  });
});
