/**
 * Chu kỳ Pomodoro (AC-05.3, AC-05.5, AC-05.7): Focus → nghỉ ngắn, lặp lại; đủ n phiên Focus thì nghỉ dài rồi bắt đầu vòng mới.
 * Hàm thuần, không đụng DOM — engine Căn phòng (roomEngine.js) gọi lại.
 */
export type Phase = "focus" | "short" | "long";
export type RhythmId = "classic" | "deep" | "light" | "custom";

export interface Rhythm { name: string; focus: number; short: number; long: number; rounds: number }
export interface PomoConfig { rhythm: RhythmId; custom: { focus: number; short: number; long: number } }

/** Nhịp có sẵn, thời lượng tính bằng phút. */
export const RHYTHMS: Record<Exclude<RhythmId, "custom">, Rhythm> = {
  classic: { name: "Cổ điển", focus: 25, short: 5, long: 15, rounds: 4 },
  deep: { name: "Sâu", focus: 50, short: 10, long: 30, rounds: 2 },
  light: { name: "Nhẹ", focus: 15, short: 3, long: 10, rounds: 4 },
};
export const RHYTHM_IDS: RhythmId[] = ["classic", "deep", "light", "custom"];
export const CUSTOM_ROUNDS = 4;
export const MIN_MIN = 1;
export const MAX_MIN = 120;
export const DEFAULT_CONFIG: PomoConfig = { rhythm: "classic", custom: { focus: 25, short: 5, long: 15 } };

const clampMin = (v: unknown, d: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(MAX_MIN, Math.max(MIN_MIN, n)) : d;
};

/** Nhịp đang dùng (Tùy chỉnh lấy 3 thời lượng người dùng đặt, nghỉ dài sau 4 phiên). */
export function rhythmOf(cfg: PomoConfig): Rhythm {
  if (cfg.rhythm === "custom") return { name: "Tùy chỉnh", ...cfg.custom, rounds: CUSTOM_ROUNDS };
  return RHYTHMS[cfg.rhythm] ?? RHYTHMS.classic;
}

/** Số giây của một giai đoạn theo nhịp. */
export function phaseSeconds(cfg: PomoConfig, phase: Phase): number {
  return rhythmOf(cfg)[phase] * 60;
}

/** Giai đoạn kế tiếp khi giai đoạn hiện tại hết giờ. `done` = số phiên Focus đã xong trong vòng. */
export function nextPhase(phase: Phase, done: number, rounds: number): { phase: Phase; done: number } {
  if (phase === "focus") {
    const d = done + 1;
    return d >= rounds ? { phase: "long", done: d } : { phase: "short", done: d };
  }
  if (phase === "long") return { phase: "focus", done: 0 };
  return { phase: "focus", done };
}

/** Đọc cấu hình đã lưu, bỏ qua giá trị hỏng. */
export function parseConfig(raw: string | null): PomoConfig {
  try {
    const o = raw ? JSON.parse(raw) : null;
    if (!o || typeof o !== "object") return structuredClone(DEFAULT_CONFIG);
    const d = DEFAULT_CONFIG.custom, c = o.custom ?? {};
    return {
      rhythm: RHYTHM_IDS.includes(o.rhythm) ? o.rhythm : "classic",
      custom: { focus: clampMin(c.focus, d.focus), short: clampMin(c.short, d.short), long: clampMin(c.long, d.long) },
    };
  } catch {
    return structuredClone(DEFAULT_CONFIG);
  }
}

/** Đổi một thời lượng Tùy chỉnh, kẹp trong 1–120 phút. */
export function setCustom(cfg: PomoConfig, key: Phase, minutes: number): PomoConfig {
  return { ...cfg, custom: { ...cfg.custom, [key]: clampMin(minutes, cfg.custom[key]) } };
}
