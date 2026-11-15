import { describe, expect, it } from "vitest";
import {
  BED_GEOMETRY, FLOOR_MAX_BASE, FLOOR_MIN_BASE, ROOM_FULL_MESSAGE, STUDY_SHELVES,
  canAdd, canPlaceIn, clampPos, studyGeometry, type ItemSpec,
} from "./placement";

const LAMP: ItemSpec = { w: 20, h: 24, deskOnly: true };
const PLANT: ItemSpec = { w: 12, h: 16 };
const BIGPLANT: ItemSpec = { w: 24, h: 50, floorOnly: true };
const CAT: ItemSpec = { w: 24, h: 13 };
const CATBED: ItemSpec = { w: 30, h: 10 };
const study = studyGeometry("right");

describe("placement — quy tắc đặt đồ (H4, BR-03→06)", () => {
  it("BR-03: đèn bàn và ly cà phê chỉ trượt dọc mặt bàn", () => {
    expect(clampPos({ type: "lamp", x: 10, y: 170 }, LAMP, "study", study, [], CATBED)).toEqual({ x: 94, y: 91 });
    expect(clampPos({ type: "lamp", x: 300, y: 0 }, LAMP, "study", study, [], CATBED)).toEqual({ x: 206, y: 91 });
  });

  it("BR-04: đồ cao ≤ 28 px thả gần tầng giá (≤ 13 px) thì khớp vào tầng, trượt trong giá", () => {
    expect(STUDY_SHELVES[0]).toEqual({ x0: 226, x1: 268, top: 40 });
    expect(clampPos({ type: "plant", x: 240, y: 32 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 240, y: 24 });
    expect(clampPos({ type: "plant", x: 262, y: 32 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 256, y: 24 });
  });

  it("BR-04: ngăn tủ đầu giường Phòng ngủ chỉ hút trong 9 px", () => {
    const shelf = { x: 288, y: 146 - 16 };
    expect(clampPos({ type: "plant", ...shelf, y: shelf.y + 8 }, PLANT, "bed", BED_GEOMETRY, [], CATBED).y).toBe(130);
    expect(clampPos({ type: "plant", ...shelf, y: shelf.y + 11 }, PLANT, "bed", BED_GEOMETRY, [], CATBED).y).not.toBe(130);
  });

  it("BR-04: thả phía trên mặt bàn thì đặt sát mặt bàn, thả phía trước thì đứng sàn trước bàn", () => {
    expect(clampPos({ type: "plant", x: 150, y: 110 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 150, y: 99 });
    expect(clampPos({ type: "plant", x: 150, y: 125 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 150, y: 161 - 16 });
  });

  it("lò sưởi bên trái thì mặt lò dời theo (dx −266)", () => {
    expect(studyGeometry("left").surfaces[1]).toMatchObject({ x0: 8, x1: 52, top: 40 });
  });

  it("BR-05: giường mèo chỉ đặt ở Phòng ngủ; mèo lại gần giường mèo thì nằm vào", () => {
    expect(canPlaceIn("catbed", "study")).toBe(false);
    expect(canPlaceIn("catbed", "bed")).toBe(true);
    expect(canPlaceIn("tv", "bed")).toBe(false);
    const bed = { id: "b1", type: "catbed", x: 100, y: 150 };
    expect(clampPos({ type: "cat", x: 100, y: 147 }, CAT, "bed", BED_GEOMETRY, [bed], CATBED)).toEqual({ x: 103, y: 145, bedId: "b1" });
    expect(clampPos({ type: "cat", x: 10, y: 147 }, CAT, "bed", BED_GEOMETRY, [bed], CATBED)).toMatchObject({ bedId: null });
  });

  it("BR-06: phòng đủ 25 đồ thì không thêm, có câu thông báo (AC-04.2)", () => {
    expect(canAdd(24)).toBe(true);
    expect(canAdd(25)).toBe(false);
    expect(ROOM_FULL_MESSAGE).toBe("Phòng đã đầy — hãy xóa bớt đồ để thêm mới");
  });

  it("chậu cây lớn chỉ đứng sàn; trước bàn Phòng học đáy ≥ 160 (AC-04.4)", () => {
    expect(clampPos({ type: "bigplant", x: 240, y: 0 }, BIGPLANT, "study", study, [], CATBED)).toEqual({ x: 240, y: 138 - 50 });
    expect(clampPos({ type: "bigplant", x: 150, y: 0 }, BIGPLANT, "study", study, [], CATBED)).toEqual({ x: 150, y: 160 - 50 });
    expect(clampPos({ type: "bigplant", x: 20, y: 0 }, BIGPLANT, "bed", BED_GEOMETRY, [], CATBED)).toEqual({ x: 20, y: 88 });
  });

  it("đồ thả ra ngoài bị giữ trong khung 320×180, đứng sàn đáy y 112–178", () => {
    expect([FLOOR_MIN_BASE, FLOOR_MAX_BASE]).toEqual([112, 178]);
    expect(clampPos({ type: "plant", x: -50, y: 400 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 0, y: 178 - 16 });
    expect(clampPos({ type: "plant", x: 999, y: 400 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 308, y: 178 - 16 });
    expect(clampPos({ type: "plant", x: 20, y: 10 }, PLANT, "study", study, [], CATBED)).toEqual({ x: 20, y: 112 - 16 });
  });
});
