import { expect, test } from "@playwright/test";

/**
 * #158: ảnh tải lười (loading="lazy") phải có kích thước rõ ràng để trình duyệt giữ chỗ trước khi ảnh về.
 * Đọc đúng mục "Lazy-loaded images should have explicit dimensions" trong tab Issues của DevTools (CDP, chỉ Chromium).
 */
test.describe("UC.12 Trang chủ: ảnh tải lười có kích thước rõ ràng (#158)", () => {
  test("Không có LazyLoadImageIssue khi cuộn hết Trang chủ", async ({ page }) => {
    const cdp = await page.context().newCDPSession(page);
    const lazy: string[] = [];
    cdp.on("Audits.issueAdded", ({ issue }) => {
      if (issue.code === "LazyLoadImageIssue") lazy.push(issue.details.lazyLoadImageIssueDetails?.url ?? "");
    });
    await cdp.send("Audits.enable");
    await page.goto("/");
    await page.mouse.wheel(0, 4000);
    await expect(page.locator('img[loading="lazy"]').last()).toBeVisible();
    await page.waitForTimeout(500);
    expect(lazy).toEqual([]);
  });
});
