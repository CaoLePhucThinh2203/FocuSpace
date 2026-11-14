import { expect, test } from "@playwright/test";

// AC-12.x, AC-NF.3 — khung E2E; thêm test cho từng UC theo docs/PLAN.md Phase 0.
const pages = ["/", "/library", "/stats", "/account", "/about"];

for (const path of pages) {
  test(`${path} hiển thị, không cuộn ngang`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
}

test("URL không tồn tại hiện trang Không tìm thấy (AC-12.3)", async ({ page }) => {
  await page.goto("/khong-co-trang-nay");
  await expect(page.getByRole("heading", { name: /Không tìm thấy/ })).toBeVisible();
});
