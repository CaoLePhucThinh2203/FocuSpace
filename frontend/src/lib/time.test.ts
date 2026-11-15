import { describe, expect, it } from "vitest";
import { shouldTick } from "./time";

describe("shouldTick (AC-05.6)", () => {
  it("đang chạy và giây vừa giảm thì kêu", () => expect(shouldTick(true, 61, 60)).toBe(true));
  it("đang dừng thì không kêu", () => expect(shouldTick(false, 61, 60)).toBe(false));
  it("giây chưa đổi thì không kêu (vòng lặp 250 ms)", () => expect(shouldTick(true, 60, 60)).toBe(false));
  it("hết giờ (0) thì để chuông, không tích tắc", () => expect(shouldTick(true, 1, 0)).toBe(false));
});
