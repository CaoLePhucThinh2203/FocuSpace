/** Kiểu của hook kiểm thử window.__focuspace mà engine Căn phòng gắn vào (chỉ dùng trong test E2E). */
export interface SpatialInfo { d: number; gain: number; pan: number; bg?: boolean }
export interface FocuspaceHook {
  pomo: { mode: "focus" | "short" | "long"; done: number; remaining: number; running: boolean; endAt: number };
  pomoCfg: { rhythm: "classic" | "deep" | "light" | "custom"; custom: { focus: number; short: number; long: number } };
  pomoSetRhythm(id: "classic" | "deep" | "light" | "custom"): void;
  pomoSkip(): void;
  pomoReset(): void;
  switchRoom(to: "study" | "bed" | "out"): void;
  fireEm: { sp: SpatialInfo; setPos(x: number, y: number, instant?: boolean): void };
  windowEm: { sp: SpatialInfo };
}
export type HookWindow = Window & { __focuspace: FocuspaceHook };
