import { describe, expect, it } from "vitest";
import { SCENES, DEFAULT_OUT } from "../src/scenes";

describe("scenes (N3)", () => {
  it("5 khung cảnh, đúng 1 mặc định là Khu rừng", () => {
    expect(SCENES).toHaveLength(5);
    expect(SCENES.filter((s) => s.isDefault).map((s) => s.code)).toEqual(["forest"]);
  });
  it("mặc định Sân vườn khớp prototype", () => {
    expect(DEFAULT_OUT.scene).toBe("forest");
  });
});
