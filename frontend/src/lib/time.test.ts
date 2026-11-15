import { describe, expect, it } from "vitest";
import { adjustSeconds, MAX_SEC, MIN_SEC, shouldTick } from "./time";

describe("adjustSeconds (AC-05.5, AC-06.3)", () => {
  it("▲ trái +1 phút, ▲ phải +10 phút", () => {
    expect(adjustSeconds(25 * 60, 1)).toBe(26 * 60);
    expect(adjustSeconds(25 * 60, 10)).toBe(35 * 60);
  });
  it("▼ trái −1 phút, ▼ phải −10 phút", () => {
    expect(adjustSeconds(25 * 60, -1)).toBe(24 * 60);
    expect(adjustSeconds(25 * 60, -10)).toBe(15 * 60);
  });
  it("giữ số giây lẻ khi đang tạm dừng giữa phiên", () => {
    expect(adjustSeconds(12 * 60 + 34, 1)).toBe(13 * 60 + 34);
  });
  it("không xuống dưới 1 phút, không vượt 120 phút", () => {
    expect(adjustSeconds(5 * 60, -10)).toBe(MIN_SEC);
    expect(adjustSeconds(115 * 60, 10)).toBe(MAX_SEC);
  });
});

describe("shouldTick (AC-05.6)", () => {
  it("đang chạy và giây vừa giảm thì kêu", () => expect(shouldTick(true, 61, 60)).toBe(true));
  it("đang dừng thì không kêu", () => expect(shouldTick(false, 61, 60)).toBe(false));
  it("giây chưa đổi thì không kêu (vòng lặp 250 ms)", () => expect(shouldTick(true, 60, 60)).toBe(false));
  it("hết giờ (0) thì để chuông, không tích tắc", () => expect(shouldTick(true, 1, 0)).toBe(false));
});
