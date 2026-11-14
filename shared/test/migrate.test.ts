import { describe, expect, it } from "vitest";
import { RoomStateSchema } from "../src/roomState";
import { flatToV4, v4ToFlat } from "../src/migrate";

/** L4 — Tuấn Lộc: dữ liệu prototype (dạng phẳng ver 3) ↔ RoomState v4. */
const flat = {
  room: "study", lastIndoor: "study", weather: "rain", curtain: "open", windowOn: true, windowVol: 0.6,
  fireOn: true, fireVol: 0.5, fireSide: "right", rug: 0, studyRug: 1, lampOn: true, masterOn: true, masterVol: 0.8,
  headphone: { on: false, vol: 0.6, track: 0 }, out: { scene: "forest", on: true, vol: 0.6 },
  items: [{ id: "a1", type: "lamp", x: 124, y: 91, on: true, vol: 0, track: 0 }],
  bed: { weather: "stars", curtain: "open", windowOn: true, windowVol: 0.5, lampOn: true, clock: { on: false, vol: 0.4 },
    items: [{ id: "b1", type: "radio", x: 284, y: 134, on: false, vol: 0.5, track: 0 }] },
};

describe("migrate (L4)", () => {
  it("dữ liệu prototype chuyển sang v4 hợp lệ", () => {
    expect(RoomStateSchema.safeParse(flatToV4(flat)).success).toBe(true);
  });
  it("chuyển đi rồi chuyển về giữ nguyên đồ vật", () => {
    const back = v4ToFlat(flatToV4(flat));
    expect(back.items[0].type).toBe("lamp");
    expect(back.bed.items[0].type).toBe("radio");
  });
  it.todo("LocalStorage rỗng hoặc JSON hỏng trả trạng thái mặc định");
  it.todo("bản cũ có “ngăn” (shelf, slot) đổi thành đồ vật trên giá");
  it.todo("quá 40 đồ thì cắt bớt");
});
