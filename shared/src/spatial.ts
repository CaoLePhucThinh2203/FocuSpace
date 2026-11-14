import { D_MAX, LISTENERS, ROOM_W } from "./constants";

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Công thức âm thanh không gian 2D (PRD Tính năng F, BR-07): gain theo khoảng cách (≥ 0,15), pan theo vị trí. */
export function spatial(x: number, y: number, listener = LISTENERS.study) {
  const d = Math.hypot(x - listener.x, y - listener.y);
  const gain = Math.max(0.15, 1 - d / D_MAX);
  const pan = clamp((x - listener.x) / Math.max(40, x < listener.x ? listener.x : ROOM_W - listener.x), -1, 1);
  return { d, gain, pan };
}
