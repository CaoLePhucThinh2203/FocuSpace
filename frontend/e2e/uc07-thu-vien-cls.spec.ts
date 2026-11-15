import { expect, test } from "@playwright/test";
import { ITEM_TYPES } from "@focuspace/shared";

// Hiện thanh cuộn như Chrome desktop trên Windows (headless mặc định ẩn): thanh cuộn xuất hiện muộn từng làm Thư viện nhảy bố cục (CLS 0,352).
test.use({ launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] } });

/** Dữ liệu GET /catalog/items dựng từ danh mục dùng chung (giống CatalogService). */
const items = ITEM_TYPES.map((t) => ({
  code: t.code, name: t.name, description: t.description, group: t.group, width: t.width, height: t.height,
  rooms: [...(t.inStudy ? ["study"] : []), ...(t.inBed ? ["bed"] : [])], defaultVol: t.defaultVol, removable: t.removable,
}));

test.describe("UC.07 Thư viện — không nhảy bố cục (AC-NF.1, H12)", () => {
  test("API chậm 1,2 giây: tổng layout shift của trang bằng 0", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.route("**/api/v1/catalog/items*", async (r) => {
      await new Promise((ok) => setTimeout(ok, 1200));
      await r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items }) });
    });
    await page.goto("/library");
    await expect(page.getByText("17 đồ vật")).toBeVisible();
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls)).toBeLessThan(0.01);
  });
});
