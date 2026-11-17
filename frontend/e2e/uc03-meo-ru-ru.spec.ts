import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Mèo đầu tiên trong phòng: đang trong lượt rù rù không, hệ số to/nhỏ và số lượt đã bắt đầu. */
const cat = (page: Page) => page.evaluate(() => (window as unknown as HookWindow).__focuspace.catPurrState()[0] ?? null);
const bursts = (page: Page) => cat(page).then((c) => c?.bursts ?? 0);
const silentNow = async (page: Page) => {   // chờ tới lúc mèo đang im, trả về số lượt đã có
  await expect.poll(() => cat(page).then((c) => c?.purring), { timeout: 3000 }).toBe(false);
  return bursts(page);
};

/** Mở Phòng ngủ (có sẵn mèo) với thời gian tua nhanh: on = hệ số cho lượt rù rù, off = hệ số cho lúc im. */
async function openBed(page: Page, on: number, off: number) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
  await page.evaluate(([a, b]) => { const F = (window as unknown as HookWindow).__focuspace; F.setCatPurrSpeed(a, b); F.switchRoom("bed"); }, [on, off]);
  await page.waitForFunction(() => { const F = (window as unknown as HookWindow).__focuspace; return F.ROOM.cur === "bed" && !F.ROOM.busy; });
  await page.mouse.click(5, 5);   // cú nhấp đầu: bật âm thanh
}

test.describe("UC.03 Mèo rù rù theo lượt (PRD v5.18)", () => {
  test("vào phòng là rù rù ngay, rồi im, rồi rù rù lại", async ({ page }) => {
    await openBed(page, 100, 100);   // lượt rù rù 0,10–0,15 giây, im 1,8–3 giây
    await expect.poll(() => bursts(page)).toBeGreaterThanOrEqual(1);   // lượt đầu ngay khi có âm thanh
    const b0 = await silentNow(page);
    await expect.poll(() => cat(page).then((c) => c?.gain ?? 1), { timeout: 3000 }).toBeLessThan(0.05);   // lúc im thì tắt hẳn tiếng
    await expect.poll(() => bursts(page), { timeout: 6000 }).toBeGreaterThan(b0);   // hết 3–5 phút (đã tua) thì rù rù lại
  });

  test("tắt rồi bật lại công tắc mèo thì rù rù ngay", async ({ page }) => {
    await openBed(page, 100, 10);   // im 18–30 giây: lượt mới trong lúc kiểm tra chỉ có thể do bật lại
    await expect.poll(() => bursts(page)).toBeGreaterThanOrEqual(1);
    const b0 = await silentNow(page);
    await page.locator('#items [aria-label^="Mèo"]').first().click();
    const sw = page.locator(".pop #iOn");
    await sw.click(); await sw.click();
    await expect.poll(() => bursts(page), { timeout: 1000 }).toBeGreaterThan(b0);
  });

  test("bấm vào mèo lúc đang im: kêu meo xong thì rù rù luôn", async ({ page }) => {
    await openBed(page, 100, 10);
    await expect.poll(() => bursts(page)).toBeGreaterThanOrEqual(1);
    const b0 = await silentNow(page);
    await page.locator('#items [aria-label^="Mèo"]').first().click();
    await expect.poll(() => bursts(page), { timeout: 6000 }).toBeGreaterThan(b0);
  });
});
