import { expect, test, type Page } from "@playwright/test";
import type { HookWindow, RoomId } from "./focuspaceHook";

// AC-01.6 (#181, góp ý nhận được #11, #17): thiết bị cảm ứng có nhãn chữ dưới nút thanh công cụ;
// máy có chuột giữ như prototype (chỉ tooltip khi rê chuột).
const IN_ROOM = ["Âm thanh", "Trang trí", "Âm lượng"];
const GARDEN = ["Âm lượng", "Khung cảnh"];

async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
}

async function switchRoom(page: Page, to: RoomId) {
  await page.evaluate((r) => (window as unknown as HookWindow).__focuspace.switchRoom(r), to);
  await page.waitForFunction((r) => {
    const f = (window as unknown as HookWindow).__focuspace;
    return f.ROOM.cur === r && !f.ROOM.busy;
  }, to);
}

const visibleLabels = (page: Page) => page.locator("#toolbar .tb-btn:not([hidden]) .tb-label:visible");

async function expectLabels(page: Page) {
  await expect(visibleLabels(page)).toHaveText(IN_ROOM);
  await switchRoom(page, "out");
  await expect(visibleLabels(page)).toHaveText(GARDEN);
}

test.describe("Nhãn nút thanh công cụ trên thiết bị cảm ứng (AC-01.6)", () => {
  test("điện thoại: có nhãn, nhãn không đè lên phòng, mũi tên chuyển phòng không đổi", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "chỉ kiểm trên điện thoại");
    await openRoom(page);
    await expectLabels(page);
    // Nhãn nằm trong thanh công cụ, thanh công cụ không chồng lên khung phòng.
    const bar = (await page.locator("#toolbar").boundingBox())!;
    const room = (await page.locator("#room").boundingBox())!;
    const overlap = bar.x < room.x + room.width && room.x < bar.x + bar.width && bar.y < room.y + room.height && room.y < bar.y + bar.height;
    expect(overlap).toBe(false);
    await expect(page.locator("#roomNav .tb-label")).toHaveCount(0);
  });

  test.describe("tablet cảm ứng", () => {
    test.use({ viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: true });
    test("có nhãn", async ({ page }, info) => {
      test.skip(info.project.name !== "tablet", "chỉ kiểm trên tablet");
      await openRoom(page);
      await expectLabels(page);
    });
  });

  test("máy có chuột: không có nhãn, rê chuột vẫn hiện tooltip như prototype", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "chỉ kiểm trên máy tính");
    await openRoom(page);
    await expect(visibleLabels(page)).toHaveCount(0);
    const btn = page.locator('#toolbar [data-tray="sound"]');
    await btn.hover();
    await expect(btn.locator(".tb-tip")).toHaveCSS("opacity", "1");
  });
});
