import { describe, expect, it } from "vitest";
import { NAVS, canSwitch, lastIndoorAfter, pausesPomodoro } from "./rooms";

describe("rooms — chuyển ba không gian (T7, FR-NAV-01→03)", () => {
  it("Phòng học: mũi tên trái ra Sân vườn, mũi tên phải sang Phòng ngủ", () => {
    expect(NAVS.study).toEqual([
      { d: "l", to: "out", label: "Ra sân vườn" },
      { d: "r", to: "bed", label: "Sang phòng ngủ" },
    ]);
  });
  it("Phòng ngủ chỉ có mũi tên trái về Phòng học", () => {
    expect(NAVS.bed).toEqual([{ d: "l", to: "study", label: "Về phòng học" }]);
  });
  it("cửa nhà ở Sân vườn luôn vào Phòng học (AC-01.3, Q-07)", () => {
    expect(NAVS.out).toEqual([{ door: true, to: "study", label: "Vào phòng học" }]);
  });
  it("đang chuyển thì bỏ qua lệnh mới (AC-01.2)", () => {
    expect(canSwitch("study", "bed", true)).toBe(false);
    expect(canSwitch("study", "bed", false)).toBe(true);
  });
  it("bấm vào đúng phòng đang ở thì không chuyển", () => {
    expect(canSwitch("bed", "bed", false)).toBe(false);
  });
  it("nhớ phòng trong nhà gần nhất để cửa nhà / lần mở sau vào lại", () => {
    expect(lastIndoorAfter("study", "bed", "study")).toBe("bed");
    expect(lastIndoorAfter("bed", "study", "bed")).toBe("study");
    expect(lastIndoorAfter("study", "out", "bed")).toBe("study");
  });
  it("vào Phòng ngủ thì Pomodoro tự tạm dừng (AC-05.8), phòng khác thì không", () => {
    expect(pausesPomodoro("bed")).toBe(true);
    expect(pausesPomodoro("study")).toBe(false);
    expect(pausesPomodoro("out")).toBe(false);
  });
});
