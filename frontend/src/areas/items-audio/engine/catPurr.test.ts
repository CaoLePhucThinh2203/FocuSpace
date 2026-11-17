import { describe, expect, it } from "vitest";
import { PURR_FADE_SEC, PURR_OFF_SEC, PURR_ON_SEC, purrOffSec, purrOnSec } from "./catPurr";

describe("catPurr — mèo rù rù theo lượt (FR-AUD-05, PRD v5.18)", () => {
  it("mỗi lượt rù rù 10–15 giây, im 3–5 phút, to/nhỏ dần 2 giây", () => {
    expect(PURR_ON_SEC).toEqual([10, 15]);
    expect(PURR_OFF_SEC).toEqual([180, 300]);
    expect(PURR_FADE_SEC).toBe(2);
  });
  it("thời lượng nằm trong khoảng, theo số ngẫu nhiên 0–1", () => {
    expect(purrOnSec(() => 0)).toBe(10);
    expect(purrOnSec(() => 0.999999)).toBeCloseTo(15, 3);
    expect(purrOffSec(() => 0)).toBe(180);
    expect(purrOffSec(() => 0.5)).toBe(240);
    for (let k = 0; k < 50; k++) {
      const on = purrOnSec(), off = purrOffSec();
      expect(on).toBeGreaterThanOrEqual(10); expect(on).toBeLessThan(15);
      expect(off).toBeGreaterThanOrEqual(180); expect(off).toBeLessThan(300);
    }
  });
});
