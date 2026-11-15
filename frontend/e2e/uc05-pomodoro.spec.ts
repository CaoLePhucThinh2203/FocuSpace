import { expect, test, type Page } from "@playwright/test";
import type { HookWindow } from "./focuspaceHook";

/** Mở Căn phòng và chờ engine chạy (hook kiểm thử window.__focuspace). */
async function openRoom(page: Page) {
  await page.goto("/room");
  await page.waitForFunction(() => !!(window as unknown as HookWindow).__focuspace);
}

/** Chặn POST /telemetry/batch (trả 202) và ghi lại các lô gửi lên. */
async function captureTelemetry(page: Page) {
  const batches: { pomodoros: { mode: string; plannedSec: number; outcome: string }[] }[] = [];
  await page.route("**/api/v1/telemetry/batch", async (route) => {
    batches.push(route.request().postDataJSON());
    await route.fulfill({ status: 202, json: { accepted: {} } });
  });
  return batches;
}

test.describe("UC.05 Pomodoro (Thịnh)", () => {
  test("AC-05.1 Pomodoro mini ở Sân vườn hiện cùng thời gian còn lại", async ({ page }) => {
    await openRoom(page);
    await page.locator("#pomoMiniBtn").click();
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("out"));
    await page.waitForFunction(() => { const R = (window as unknown as HookWindow).__focuspace.ROOM; return R.cur === "out" && !R.busy; });
    await expect(page.locator(".pomo-mini")).toBeVisible();
    await expect(page.locator("#pomoMiniTime")).toHaveText(/^(25:00|24:5\d)$/);
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.running)).toBe(true);
  });
  test.fixme("AC-05.2 tab ẩn không trôi giờ", async ({ page }) => {
    await page.goto("/");
  });
  test("AC-05.3 hết Focus: chuyển Nghỉ ngắn 5:00, dừng chờ Bắt đầu; telemetry ghi completed", async ({ page }) => {
    const batches = await captureTelemetry(page);
    await openRoom(page);
    await page.locator("#pomoMiniBtn").click();
    await page.evaluate(() => { const p = (window as unknown as HookWindow).__focuspace.pomo; p.endAt = Date.now() + 600; });
    await page.waitForFunction(() => (window as unknown as HookWindow).__focuspace.pomo.mode === "short");
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo)).toMatchObject({ mode: "short", running: false, remaining: 300 });
    await expect(page.locator("#pomoMiniTime")).toHaveText("05:00");
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.tel.flush());
    expect(batches.flatMap((b) => b.pomodoros)).toMatchObject([{ mode: "focus", plannedSec: 1500, outcome: "completed" }]);
  });
  test("AC-05.4 Đặt lại vòng về phiên Focus đầu tiên 25:00; telemetry ghi reset", async ({ page }) => {
    const batches = await captureTelemetry(page);
    await openRoom(page);
    await page.locator("#pomoMiniBtn").click();
    await page.locator("#pomoTrig").click();
    await page.locator("#pomoPanel").getByRole("button", { name: "Đặt lại vòng" }).click();
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo)).toMatchObject({ mode: "focus", done: 0, running: false, remaining: 1500 });
    await expect(page.locator("#pomoMiniTime")).toHaveText("25:00");
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.tel.flush());
    expect(batches.flatMap((b) => b.pomodoros)).toMatchObject([{ mode: "focus", outcome: "reset" }]);
  });

  test("AC-05.5 chọn nhịp học: đang dừng áp dụng ngay, đang chạy áp dụng từ phiên sau", async ({ page }) => {
    await openRoom(page);
    await page.locator("#pomoTrig").click();
    const panel = page.locator("#pomoPanel");
    await expect(panel).toBeVisible();
    await panel.getByRole("radio", { name: /Sâu/ }).click();
    await expect(page.locator("#pomoMiniTime")).toHaveText("50:00");
    await page.locator("#pomoMiniBtn").click();
    await panel.getByRole("radio", { name: /Nhẹ/ }).click();
    await expect(panel.getByRole("status")).toContainText("phiên sau");
    await expect(page.locator("#pomoMiniTime")).toHaveText(/^(50:00|49:5\d)$/);
  });

  test("AC-05.7 đủ 4 phiên Focus thì nghỉ dài, xong nghỉ dài bắt đầu vòng mới", async ({ page }) => {
    await openRoom(page);
    const end = () => page.evaluate(() => {
      const F = (window as unknown as HookWindow).__focuspace;
      if (!F.pomo.running) (document.getElementById("pomoMiniBtn") as HTMLButtonElement).click();
      F.pomo.endAt = Date.now() - 1;
    });
    const phases: string[] = [];
    for (let i = 0; i < 8; i++) {
      await end();
      await page.waitForFunction(() => !(window as unknown as HookWindow).__focuspace.pomo.running);
      phases.push(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.mode));
    }
    expect(phases).toEqual(["short", "focus", "short", "focus", "short", "focus", "long", "focus"]);
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.done)).toBe(0);
  });

  test("AC-05.8 vào Phòng ngủ thì Pomodoro tự tạm dừng và ẩn khỏi header", async ({ page }) => {
    await openRoom(page);
    await page.locator("#pomoMiniBtn").click();
    await page.evaluate(() => (window as unknown as HookWindow).__focuspace.switchRoom("bed"));
    await expect(page.locator(".pomo-mini")).toBeHidden();
    await expect(page.locator("#sleepMini")).toBeVisible();
    expect(await page.evaluate(() => (window as unknown as HookWindow).__focuspace.pomo.running)).toBe(false);
  });
});
