import { describe, expect, it } from "vitest";
import { RoomStateSchema } from "../src/roomState";
import { flatToV4, v4ToFlat } from "../src/migrate";

const flat = {
  room: "study", lastIndoor: "study", weather: "rain", curtain: "open", windowOn: true, windowVol: 0.6,
  fireOn: true, fireVol: 0.5, fireSide: "right", rug: 0, studyRug: 1, lampOn: true, masterOn: true, masterVol: 0.8,
  headphone: { on: false, vol: 0.6, track: 0 }, out: { scene: "forest", on: true, vol: 0.6 },
  items: [{ id: "a1", type: "lamp", x: 124, y: 91, on: true, vol: 0, track: 0 }],
  bed: { weather: "stars", curtain: "open", windowOn: true, windowVol: 0.5, lampOn: true, clock: { on: false, vol: 0.4 },
    items: [{ id: "b1", type: "radio", x: 284, y: 134, on: false, vol: 0.5, track: 0 }] },
};

/** T6 — Phúc Thịnh: schema RoomState v4. */
describe("RoomState v4 (API Phụ lục A)", () => {
  it("từ chối quá 40 đồ (BR-06)", () => {
    const v = flatToV4(flat);
    v.study.items = Array.from({ length: 41 }, (_, i) => ({ id: "p" + i, type: "plant", x: 10, y: 10, on: true, vol: 0 }));
    expect(RoomStateSchema.safeParse(v).success).toBe(false);
  });
  it("từ chối đồ của Phòng ngủ đặt trong Phòng học", () => {
    const v = flatToV4(flat);
    v.study.items.push({ id: "r1", type: "radio", x: 10, y: 10, on: true, vol: 0.5 });
    expect(RoomStateSchema.safeParse(v).success).toBe(false);
  });
});
