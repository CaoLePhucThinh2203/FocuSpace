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

test("Căn phòng trên điện thoại dựng dọc tự xoay ngang (AC-01.5)", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "chỉ kiểm trên điện thoại");
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as any).__focuspace);
  await expect(page.locator("html")).toHaveClass(/\brot\b/);
  const room = await page.locator("#room").boundingBox();
  expect(room!.height).toBeGreaterThan(room!.width);   // phòng 16:9 nằm dọc theo màn hình = đang xoay
});
