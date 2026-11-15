import { expect, test } from "@playwright/test";

test.describe("UC.12 Trang chủ, Giới thiệu (Thịnh)", () => {
  test.fixme("AC-12.1 Vào phòng chuyển /room", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-12.2 /about đủ mục tiêu, cách dùng, thành viên, liên hệ", async ({ page }) => {
    await page.goto("/");
  });
  test.fixme("AC-12.3 URL lạ hiện 404", async ({ page }) => {
    await page.goto("/");
  });

  test("AC-12.4 từ 768 px menu 5 mục nằm 1 hàng; dưới 768 px thu thành nút ☰", async ({ page }) => {
    await page.goto("/");
    const width = page.viewportSize()!.width;
    const menuBtn = page.getByRole("button", { name: "Mở menu các trang" });
    const links = page.locator("header ul[aria-label='Các trang'] a");
    if (width >= 768) {
      await expect(menuBtn).toBeHidden();
      await expect(links).toHaveCount(5);
      const tops = await links.evaluateAll((as) => as.map((a) => Math.round(a.getBoundingClientRect().top)));
      expect(new Set(tops).size).toBe(1);   // cùng một hàng
    } else {
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();
      await expect(page.locator("#site-menu a")).toHaveCount(5);
    }
  });

  test("AC-12.5 trang chủ: không còn ô Pixel art, tiêu đề Mô tả & Tính năng, không còn nút cuối trang", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Pixel art · Lo-fi · Semi-Sandbox")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Mô tả & Tính năng" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vì sao chọn FocuSpace" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Bắt đầu học ngay" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Tìm hiểu thêm" })).toHaveCount(0);
  });

  test("AC-12.6 toàn site dùng một font Be Vietnam Pro", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main h1")).toBeVisible();   // trang chủ tải lười: chờ nội dung hiện rồi mới đọc font
    const fonts = await page.evaluate(() => [...document.querySelectorAll("h1, h2, h3, p, a, button")].map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/"/g, "").trim()));
    expect(new Set(fonts)).toEqual(new Set(["Be Vietnam Pro"]));
  });
});
