import { expect, test, type Locator, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Mở Căn phòng (Phòng học) và chờ engine chạy. */
async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
}
const studyItems = (page: Page) =>
  page.evaluate(() => (window as unknown as HookWindow).__focuspace.state.items.map((i) => ({ ...i })));

/** Kéo bằng chuột qua nhiều bước để engine nhận pointermove. */
async function drag(page: Page, from: Locator, to: Locator) {
  const a = (await from.boundingBox())!, b = (await to.boundingBox())!;
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 });
  await page.mouse.up();
}

test.describe("UC.04 Sắp xếp đồ vật (Hưng)", () => {
  test("AC-04.1 kéo Mèo ngủ từ khay thả vào phòng", async ({ page }) => {
    await openRoom(page);
    const before = (await studyItems(page)).filter((i) => i.type === "cat").length;
    await page.locator('#toolbar [data-tray="sound"]').click();
    await drag(page, page.getByRole("button", { name: "Thêm Mèo ngủ" }), page.locator("#room"));
    await expect.poll(async () => (await studyItems(page)).filter((i) => i.type === "cat").length).toBe(before + 1);
    await expect(page.getByRole("button", { name: /^Mèo ngủ — kéo để di chuyển/ }).first()).toBeVisible();
  });

  test("AC-04.2 phòng đủ 25 đồ thì không thêm, chỉ hiện thông báo", async ({ page }) => {
    await openRoom(page);
    await page.evaluate(() => {
      const items = (window as unknown as HookWindow).__focuspace.state.items;
      for (let i = items.length; i < 25; i++) items.push({ id: "f" + i, type: "books", x: 20, y: 160 });
    });
    await page.locator('#toolbar [data-tray="decor"]').click();
    await page.getByRole("button", { name: "Thêm Chồng sách" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Phòng đã đầy — hãy xóa bớt đồ để thêm mới" })).toBeVisible();
    expect((await studyItems(page)).length).toBe(25);
  });

  test("AC-04.3 thả đèn bàn lên thanh công cụ thì đèn không bị xóa", async ({ page }) => {
    await openRoom(page);
    const lamp = page.getByRole("button", { name: /^Đèn bàn — kéo để di chuyển/ });
    await drag(page, lamp, page.locator("#toolbar"));
    await expect(lamp).toBeVisible();
    const lamps = (await studyItems(page)).filter((i) => i.type === "lamp");
    expect(lamps).toHaveLength(1);
    expect(lamps[0].y).toBe(115 - 24);   // vẫn nằm trên mặt bàn (BR-03)
  });

  // AC-04.4 (đồ khớp tầng giá, chậu cây lớn chỉ đứng sàn, giường mèo chỉ ở Phòng ngủ) là unit test:
  // frontend/src/areas/items-audio/engine/placement.test.ts.

  test("AC-04.5 phím mũi tên dịch 2 / 8 đơn vị, Delete xóa đồ", async ({ page }) => {
    await openRoom(page);
    const plant = page.getByRole("button", { name: /^Chậu cây lớn — kéo để di chuyển/ });
    const x0 = (await studyItems(page)).find((i) => i.type === "bigplant")!.x;
    await plant.focus();
    await page.keyboard.press(x0 > 200 ? "ArrowLeft" : "ArrowRight");
    const sign = x0 > 200 ? -1 : 1;
    expect((await studyItems(page)).find((i) => i.type === "bigplant")!.x).toBe(x0 + 2 * sign);
    await page.keyboard.press(x0 > 200 ? "Shift+ArrowLeft" : "Shift+ArrowRight");
    expect((await studyItems(page)).find((i) => i.type === "bigplant")!.x).toBe(x0 + 10 * sign);
    await page.keyboard.press("Delete");
    await expect(plant).toHaveCount(0);
    expect((await studyItems(page)).some((i) => i.type === "bigplant")).toBe(false);
  });
});
