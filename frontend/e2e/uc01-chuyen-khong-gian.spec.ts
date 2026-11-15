import { expect, test, type Page } from "@playwright/test";
import type { HookWindow, RoomId } from "./focuspaceHook";

/** Mở Căn phòng và chờ engine chạy (hook kiểm thử window.__focuspace). */
async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
}
/** Chờ chuyển phòng xong (hết mờ 0,3 giây và hết khóa chuyển). */
async function settled(page: Page, room: RoomId) {
  await page.waitForFunction((r) => {
    const R = (window as unknown as HookWindow).__focuspace.ROOM;
    return R.cur === r && !R.busy;
  }, room);
}

test.describe("UC.01 Chuyển không gian (Thịnh)", () => {
  test("AC-01.1 bấm Sang phòng ngủ: hiện Phòng ngủ tone tím than, tải lại vẫn ở Phòng ngủ", async ({ page }) => {
    await openRoom(page);
    await page.getByRole("button", { name: "Sang phòng ngủ" }).dispatchEvent("click");
    await expect(page.locator("body")).toHaveAttribute("data-room", "bed", { timeout: 1000 });
    await settled(page, "bed");
    await page.waitForTimeout(400);   // chờ engine lưu LocalStorage
    await openRoom(page);
    await expect(page.locator("body")).toHaveAttribute("data-room", "bed");
  });

  test("AC-01.2 đang chuyển mà bấm tiếp thì lệnh mới bị bỏ qua", async ({ page }) => {
    await openRoom(page);
    await page.evaluate(() => {
      const h = (window as unknown as HookWindow).__focuspace;
      h.switchRoom("bed");
      h.switchRoom("out");
    });
    await settled(page, "bed");
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.ROOM.cur)).toBe("bed");
  });

  test("AC-01.3 ở Sân vườn bấm cửa nhà thì vào Phòng học", async ({ page }) => {
    await openRoom(page);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("out"));
    await settled(page, "out");
    await page.getByRole("button", { name: "Vào phòng học" }).dispatchEvent("click");
    await settled(page, "study");
    await expect(page.locator("body")).toHaveAttribute("data-room", "study");
  });

  test("AC-01.4 Hẹn giờ ngủ đang chạy mà sang Phòng học thì bị hủy", async ({ page }) => {
    await openRoom(page);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
    await settled(page, "bed");
    await page.locator("#sleepTrig").click();
    await page.locator("#sleepPanel").getByRole("radio", { name: /^15 phút/ }).click();
    await page.locator("#sleepPlay").click();
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.sleep.running)).toBe(true);
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("study"));
    await settled(page, "study");
    const s = await page.evaluate(() => (window as unknown as HookWindow).__focuspace.sleep);
    expect(s).toMatchObject({ min: 0, running: false });
  });
});
