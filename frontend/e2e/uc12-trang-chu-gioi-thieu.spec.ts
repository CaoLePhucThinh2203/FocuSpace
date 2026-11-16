import { expect, test, type Page } from "@playwright/test";

/** Font trình duyệt dùng thật để vẽ chữ của các phần tử (CDP, chỉ Chromium): mỗi phần tử → tên font và số ký tự. */
async function renderedFonts(page: Page, selector: string) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector });
  const out: string[] = [];
  for (const nodeId of nodeIds) {
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    fonts.forEach((f) => out.push(f.familyName));
  }
  return out;
}

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

  test("AC-12.6 font Be Vietnam Pro tự host được tải thật, không gọi Google Fonts (H12)", async ({ page }) => {
    const google: string[] = [];
    page.on("request", (r) => { if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) google.push(r.url()); });
    await page.goto("/about");
    await expect(page.locator("main h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family.replace(/"/g, "")} ${f.weight}`));
    expect(loaded).toContain("Be Vietnam Pro 400");
    expect(google).toEqual([]);
  });

  test("AC-12.6 chữ nét 500, 600 (menu, nút, tiêu đề bảng, giờ Pomodoro) hiện thật bằng Be Vietnam Pro, không rơi về font máy", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "đo font thật cần CDP của Chromium");
    for (const [path, ready, sel] of [
      ["/about", "main h1", "header a, main .btn, main th"],
      ["/library", "main h1", "header a, main .btn"],
      ["/room", "#roomName", ".room-name, .pomo-mini .time, .pomo-mini .btn"],
    ] as const) {
      await page.goto(path);
      await expect(page.locator(ready).first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const fams = await renderedFonts(page, sel);
      expect(fams.length, path).toBeGreaterThan(0);
      expect([...new Set(fams)].filter((f) => !f.startsWith("Be Vietnam Pro")), path).toEqual([]);
    }
  });
});
