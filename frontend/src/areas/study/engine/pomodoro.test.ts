import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, nextPhase, parseConfig, phaseSeconds, rhythmOf, setCustom } from "./pomodoro";

describe("nextPhase — chu kỳ Pomodoro (AC-05.3, AC-05.7)", () => {
  it("Focus xong, chưa đủ vòng thì nghỉ ngắn và tăng số phiên", () => {
    expect(nextPhase("focus", 0, 4)).toEqual({ phase: "short", done: 1 });
  });
  it("nghỉ ngắn xong thì quay lại Focus, giữ số phiên", () => {
    expect(nextPhase("short", 1, 4)).toEqual({ phase: "focus", done: 1 });
  });
  it("đủ 4 phiên Focus thì nghỉ dài", () => {
    expect(nextPhase("focus", 3, 4)).toEqual({ phase: "long", done: 4 });
  });
  it("nghỉ dài xong thì bắt đầu vòng mới", () => {
    expect(nextPhase("long", 4, 4)).toEqual({ phase: "focus", done: 0 });
  });
  it("nhịp Sâu nghỉ dài sau 2 phiên", () => {
    expect(nextPhase("focus", 1, 2)).toEqual({ phase: "long", done: 2 });
  });
});

describe("nhịp học (AC-05.5)", () => {
  it("mặc định Cổ điển 25 / 5 / 15, 4 phiên", () => {
    expect(rhythmOf(DEFAULT_CONFIG)).toMatchObject({ focus: 25, short: 5, long: 15, rounds: 4 });
    expect(phaseSeconds(DEFAULT_CONFIG, "focus")).toBe(25 * 60);
  });
  it("chọn nhịp Sâu: Focus 50 phút, nghỉ ngắn 10 phút", () => {
    const cfg = { ...DEFAULT_CONFIG, rhythm: "deep" as const };
    expect(phaseSeconds(cfg, "focus")).toBe(50 * 60);
    expect(phaseSeconds(cfg, "short")).toBe(10 * 60);
  });
  it("Tuỳ chỉnh kẹp trong 1–120 phút", () => {
    const cfg = setCustom({ ...DEFAULT_CONFIG, rhythm: "custom" }, "focus", 500);
    expect(phaseSeconds(cfg, "focus")).toBe(120 * 60);
    expect(setCustom(cfg, "short", 0).custom.short).toBe(1);
  });
  it("cấu hình lưu bị hỏng thì về mặc định", () => {
    expect(parseConfig("{oops")).toEqual(DEFAULT_CONFIG);
    expect(parseConfig(JSON.stringify({ rhythm: "xyz", custom: { focus: "a" } }))).toEqual(DEFAULT_CONFIG);
    expect(parseConfig(JSON.stringify({ rhythm: "light" })).rhythm).toBe("light");
  });
});
