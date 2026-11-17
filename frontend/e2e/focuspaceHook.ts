/** Kiểu của hook kiểm thử window.__focuspace mà engine Căn phòng gắn vào (chỉ dùng trong test E2E). */
export interface SpatialInfo { d: number; gain: number; pan: number; bg?: boolean }
export type RoomId = "study" | "bed" | "out";
export interface FocuspaceHook {
  ROOM: { cur: RoomId; busy: boolean };
  tel: { flush(keepalive?: boolean): Promise<void> };
  state: { room: RoomId; items: { id: string; type: string; x: number; y: number }[]; bed: { items: { id: string; type: string; x: number; y: number }[] } };
  sleep: { min: number; remaining: number; running: boolean; endAt: number };
  sleepRemaining(sec: number): void;
  fade: { gain: { value: number }; context: { state: string } } | null;
  pomo: { mode: "focus" | "short" | "long"; done: number; remaining: number; running: boolean; endAt: number };
  pomoCfg: { rhythm: "classic" | "deep" | "light" | "custom"; custom: { focus: number; short: number; long: number } };
  pomoSetRhythm(id: "classic" | "deep" | "light" | "custom"): void;
  pomoSkip(): void;
  pomoReset(): void;
  switchRoom(to: RoomId): void;
  fireEm: { sp: SpatialInfo; setPos(x: number, y: number, instant?: boolean): void };
  windowEm: { sp: SpatialInfo };
  outHeadEm: { cur: { s: { buffer: AudioBuffer | null }; g: { gain: { value: number } } } | null };
  lofiCache: { lofi: (AudioBuffer | null)[]; sleep: (AudioBuffer | null)[] };
  setCatPurrSpeed(on: number, off?: number): void;
  catPurrState(): { purring: boolean; gain: number; bursts: number }[];
}
export type HookWindow = Window & { __focuspace: FocuspaceHook };
