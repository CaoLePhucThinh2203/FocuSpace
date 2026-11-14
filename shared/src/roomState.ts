import { z } from "zod";
import { BED_CODES, ITEM_CODES, STUDY_CODES } from "./catalog";
import { SCENE_CODES } from "./scenes";
import { MAX_ITEMS_PER_ROOM } from "./constants";

/** Schema RoomState v4 (API Phụ lục A). Backend dùng để kiểm tra PUT /room-state. */
const vol = z.number().min(0).max(1);
export const ItemSchema = z.object({
  id: z.string().min(1).max(16),
  type: z.enum(ITEM_CODES as [string, ...string[]]),
  x: z.number().min(-100).max(500),
  y: z.number().min(-100).max(400),
  on: z.boolean(),
  vol,
  track: z.number().int().min(0).max(2).optional(),
  art: z.number().int().min(0).max(9).optional(),
  bedId: z.string().max(16).nullable().optional(),
});
export type Item = z.infer<typeof ItemSchema>;

const items = (allowed: string[]) =>
  z
    .array(ItemSchema)
    .max(MAX_ITEMS_PER_ROOM)
    .refine((xs) => xs.every((i) => allowed.includes(i.type)), { message: "Loại đồ vật không hợp lệ cho phòng này" })
    .refine((xs) => xs.filter((i) => i.type === "lamp").length <= 1 && xs.filter((i) => i.type === "cup").length <= 1, {
      message: "Tối đa 1 đèn bàn và 1 ly cà phê",
    });

const curtain = z.enum(["open", "half", "closed"]);
export const RoomStateSchema = z.object({
  schemaVer: z.literal(4),
  room: z.enum(["study", "bed", "out"]),
  lastIndoor: z.enum(["study", "bed"]),
  masterOn: z.boolean(),
  masterVol: vol,
  headphone: z.object({ on: z.boolean(), vol, track: z.number().int().min(0).max(2) }),
  study: z.object({
    weather: z.enum(["clear", "rain", "storm", "sunset"]),
    curtain,
    windowOn: z.boolean(),
    windowVol: vol,
    fireOn: z.boolean(),
    fireVol: vol,
    fireSide: z.enum(["left", "right"]),
    rug: z.number().int().min(0).max(3),
    lampOn: z.boolean(),
    items: items(STUDY_CODES),
  }),
  bed: z.object({
    weather: z.enum(["stars", "rain", "wind"]),
    curtain,
    windowOn: z.boolean(),
    windowVol: vol,
    lampOn: z.boolean(),
    wallClock: z.object({ on: z.boolean(), vol }),
    rug: z.number().int().min(0).max(3),
    items: items(BED_CODES),
  }),
  out: z.object({ scene: z.enum(SCENE_CODES as [string, ...string[]]), on: z.boolean(), vol }),
});
export type RoomState = z.infer<typeof RoomStateSchema>;
