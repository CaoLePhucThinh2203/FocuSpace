import { describe, expect, it } from "vitest";
import { FADE_SEC, SLEEP_OFF, SLEEP_OPTIONS, sleepFinished, sleepGain, sleepRemaining, sleepSet, sleepToggle } from "./sleepTimer";

const T0 = 1_000_000;

describe("sleepTimer — Hẹn giờ ngủ (L3, BR-02, FR-TIME-03)", () => {
  it("chỉ có 4 lựa chọn Tắt / 15 / 30 / 60 phút (AC-06.3)", () => {
    expect(SLEEP_OPTIONS).toEqual([0, 15, 30, 60]);
  });
  it("chọn mức thì hiện số phút và chờ bấm Bắt đầu", () => {
    expect(sleepSet(15)).toEqual({ min: 15, remaining: 900, running: false, endAt: 0 });
  });
  it("chọn Tắt thì không hẹn giờ; bấm Bắt đầu cũng không chạy", () => {
    expect(sleepSet(0)).toEqual(SLEEP_OFF);
    expect(sleepToggle(SLEEP_OFF, T0)).toEqual(SLEEP_OFF);
  });
  it("Bắt đầu tính theo thời điểm kết thúc; Tạm dừng giữ số giây còn lại", () => {
    const run = sleepToggle(sleepSet(15), T0);
    expect(run).toMatchObject({ running: true, endAt: T0 + 900_000 });
    expect(sleepRemaining(run, T0 + 60_000)).toBe(840);
    const paused = sleepToggle(run, T0 + 60_000);
    expect(paused).toEqual({ min: 15, remaining: 840, running: false, endAt: 0 });
    expect(sleepRemaining(paused, T0 + 999_000)).toBe(840);
  });
  it("còn hơn 2 phút thì gain = 1", () => {
    expect(FADE_SEC).toBe(120);
    expect(sleepGain(300)).toBe(1);
    expect(sleepGain(120)).toBe(1);
  });
  it("2 phút cuối gain giảm tuyến tính về 0", () => {
    expect(sleepGain(60)).toBe(0.5);
    expect(sleepGain(30)).toBe(0.25);
  });
  it("hết giờ gain = 0 và hẹn giờ kết thúc", () => {
    const run = sleepToggle(sleepSet(15), T0);
    expect(sleepGain(0)).toBe(0);
    expect(sleepFinished(run, T0 + 899_000)).toBe(false);
    expect(sleepFinished(run, T0 + 900_000)).toBe(true);
    expect(sleepFinished(sleepSet(15), T0 + 9e9)).toBe(false);
  });
});
