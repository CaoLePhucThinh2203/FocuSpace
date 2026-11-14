import { describe, expect, it } from "vitest";
import { spatial } from "../src/spatial";
import { LISTENERS } from "../src/constants";

describe("spatial (BR-07, AC-03.3)", () => {
  it("góc xa nhất vẫn có gain ≥ 0,15", () => {
    expect(spatial(0, 0).gain).toBeGreaterThanOrEqual(0.15);
    expect(spatial(320, 180, LISTENERS.bed).gain).toBeGreaterThanOrEqual(0.15);
  });
  it("đồ bên trái người nghe thì pan âm, bên phải thì pan dương", () => {
    expect(spatial(20, 100).pan).toBeLessThan(0);
    expect(spatial(300, 100).pan).toBeGreaterThan(0);
  });
  it("đồ ở đúng vị trí người nghe: gain 1, pan 0", () => {
    const r = spatial(160, 100);
    expect(r.gain).toBe(1);
    expect(r.pan).toBe(0);
  });
});
