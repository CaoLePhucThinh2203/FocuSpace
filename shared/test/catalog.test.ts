import { describe, expect, it } from "vitest";
import { BED_CODES, ITEM_TYPES, STUDY_CODES } from "../src/catalog";

describe("catalog (BR-12)", () => {
  it("có đủ 17 loại đồ vật, mã không trùng", () => {
    expect(ITEM_TYPES).toHaveLength(17);
    expect(new Set(ITEM_TYPES.map((t) => t.code)).size).toBe(17);
  });
  it("Phòng ngủ + Phát âm thanh có 7 đồ (AC-07.2)", () => {
    expect(ITEM_TYPES.filter((t) => t.inBed && t.group === "sound")).toHaveLength(7);
  });
  it("đèn bàn, ly cà phê không xóa được (BR-03)", () => {
    expect(ITEM_TYPES.filter((t) => !t.removable).map((t) => t.code)).toEqual(["lamp", "cup"]);
  });
  it("danh sách loại theo phòng khớp API Phụ lục A", () => {
    expect(STUDY_CODES).toHaveLength(11);
    expect(BED_CODES).toHaveLength(14);
  });
});
