import type { RoomState } from "./roomState";

/**
 * Chuyển dữ liệu LocalStorage dạng phẳng của prototype (ver 3, khóa "focuspace.room.v4")
 * sang RoomState v4 (API Phụ lục A) và ngược lại. Engine Căn phòng hiện vẫn đọc/ghi dạng phẳng.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Flat = Record<string, any>;

export function flatToV4(s: Flat): RoomState {
  const bed = s.bed ?? {};
  return {
    schemaVer: 4,
    room: s.room === "bed" || s.room === "out" ? s.room : "study",
    lastIndoor: s.lastIndoor === "bed" ? "bed" : "study",
    masterOn: s.masterOn !== false,
    masterVol: s.masterVol ?? 0.8,
    headphone: { on: !!s.headphone?.on, vol: s.headphone?.vol ?? 0.6, track: s.headphone?.track ?? 0 },
    study: {
      weather: s.weather ?? "rain",
      curtain: s.curtain ?? "open",
      windowOn: s.windowOn !== false,
      windowVol: s.windowVol ?? 0.6,
      fireOn: !!s.fireOn,
      fireVol: s.fireVol ?? 0.5,
      fireSide: s.fireSide === "left" ? "left" : "right",
      rug: s.rug ?? 0,
      lampOn: s.lampOn !== false,
      items: (s.items ?? []).map(cleanItem),
    },
    bed: {
      weather: bed.weather ?? "stars",
      curtain: bed.curtain ?? "open",
      windowOn: bed.windowOn !== false,
      windowVol: bed.windowVol ?? 0.5,
      lampOn: bed.lampOn !== false,
      wallClock: { on: !!bed.clock?.on, vol: bed.clock?.vol ?? 0.4 },
      rug: bed.rug ?? s.studyRug ?? 0,
      items: (bed.items ?? []).map(cleanItem),
    },
    out: { scene: s.out?.scene ?? "forest", on: s.out?.on !== false, vol: s.out?.vol ?? 0.6 },
  };
}

export function v4ToFlat(v: RoomState): Flat {
  return {
    ver: 3,
    room: v.room,
    lastIndoor: v.lastIndoor,
    masterOn: v.masterOn,
    masterVol: v.masterVol,
    headphone: v.headphone,
    weather: v.study.weather,
    curtain: v.study.curtain,
    windowOn: v.study.windowOn,
    windowVol: v.study.windowVol,
    fireOn: v.study.fireOn,
    fireVol: v.study.fireVol,
    fireSide: v.study.fireSide,
    rug: v.study.rug,
    studyRug: v.bed.rug,
    lampOn: v.study.lampOn,
    items: v.study.items,
    bed: {
      weather: v.bed.weather,
      curtain: v.bed.curtain,
      windowOn: v.bed.windowOn,
      windowVol: v.bed.windowVol,
      lampOn: v.bed.lampOn,
      clock: v.bed.wallClock,
      items: v.bed.items,
    },
    out: v.out,
  };
}

function cleanItem(i: Flat) {
  const o: Flat = { id: String(i.id).slice(0, 16), type: i.type, x: i.x, y: i.y, on: i.on !== false, vol: i.vol ?? 0.5 };
  if (Number.isInteger(i.track)) o.track = i.track;
  if (Number.isInteger(i.art)) o.art = i.art;
  if (i.bedId !== undefined) o.bedId = i.bedId;
  return o as RoomState["study"]["items"][number];
}
