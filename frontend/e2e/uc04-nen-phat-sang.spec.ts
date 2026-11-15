import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Độ đục (alpha) của lớp bóng tối #lightCv tại vị trí ngọn nến (lớp sáng 160×90 = toạ độ logic / 2). */
async function darknessAtCandle(page: Page, x: number, y: number) {
  await page.waitForTimeout(400);   // chờ vài khung hình 10 FPS
  return page.evaluate(([cx, cy]) => {
    const cv = document.getElementById("lightCv") as HTMLCanvasElement;
    return cv.getContext("2d")!.getImageData(Math.round(cx), Math.round(cy), 1, 1).data[3];
  }, [(x + 3) / 2, (y + 1) / 2]);
}

test.describe("UC.04 Đồ vật — nến phát sáng (Hưng)", () => {
  test("nến đặt trong phòng làm sáng vùng quanh ngọn lửa; xóa nến thì bóng tối trở lại", async ({ page }) => {
    await page.goto("/room");
    await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
    await page.locator('#toolbar [data-tray="decor"]').click();
    await page.getByRole("button", { name: "Thêm Nến" }).click();
    const candle = await page.evaluate(() => (window as unknown as HookWindow).__focuspace.state.items.find((i) => i.type === "candle")!);
    expect(candle).toBeTruthy();
    const lit = await darknessAtCandle(page, candle.x, candle.y);
    await page.getByRole("button", { name: /^Nến — kéo để di chuyển/ }).focus();
    await page.keyboard.press("Delete");
    const dark = await darknessAtCandle(page, candle.x, candle.y);
    expect(dark - lit).toBeGreaterThan(15);   // có nến: bóng tối được đục bớt (đo được 26–35); mất ánh sáng nến thì chênh 0
  });
});
