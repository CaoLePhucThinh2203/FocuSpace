/** Kiểu của hook kiểm thử window.__focuspace mà engine Căn phòng gắn vào (chỉ dùng trong test E2E). */
export interface SpatialInfo { d: number; gain: number; pan: number; bg?: boolean }
export interface FocuspaceHook {
  pomo: { remaining: number; running: boolean };
  POMO_LEN: { focus: number; break: number };
  pomoAdjust(step: number): void;
  sleepAdjust(step: number): void;
  switchRoom(to: "study" | "bed" | "out"): void;
  fireEm: { sp: SpatialInfo; setPos(x: number, y: number, instant?: boolean): void };
  windowEm: { sp: SpatialInfo };
}
export type HookWindow = Window & { __focuspace: FocuspaceHook };
