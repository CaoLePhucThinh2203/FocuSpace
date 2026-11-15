/** Danh mục 17 đồ vật — nguồn cho engine, seeder và trang Thư viện (DATABASE §3.7). Người phụ trách: Tuấn Hưng (H3). */
export type ItemGroup = "sound" | "decor" | "desk";
export interface ItemType {
  code: string;
  name: string;
  description: string | null;
  group: ItemGroup;
  width: number;
  height: number;
  inStudy: boolean;
  inBed: boolean;
  defaultVol: number | null;
  removable: boolean;
  sortOrder: number;
}

type Row = [string, string, string | null, ItemGroup, number, number, boolean, boolean, number | null, boolean];
const ROWS: Row[] = [
  ["tv", "Tivi cũ", "Tiếng rè nhiễu sóng", "sound", 26, 26, true, false, 0.35, true],
  ["cat", "Mèo ngủ", "Tiếng mèo rù rù", "sound", 24, 13, true, true, 0.6, true],
  ["clock", "Đồng hồ Pomodoro", "Đếm giờ học, có tiếng tích tắc", "sound", 24, 12, true, true, 0.4, true],
  ["radio", "Radio", "Nhạc Lo-fi", "sound", 20, 12, false, true, 0.5, true],
  ["diffuser", "Máy xông tinh dầu", "Tiếng bọt nước", "sound", 14, 16, false, true, 0.4, true],
  ["vinyl", "Đĩa than", "Nhạc chậm, có tiếng rè đĩa", "sound", 26, 16, false, true, 0.5, true],
  ["musicbox", "Hộp nhạc", "Nhạc chuông nhẹ", "sound", 14, 16, false, true, 0.45, true],
  ["fan", "Quạt bàn", "Tiếng quạt gió", "sound", 18, 22, false, true, 0.35, true],
  ["bigplant", "Chậu cây lớn", null, "decor", 24, 50, true, true, null, true],
  ["catbed", "Giường mèo", null, "decor", 30, 10, false, true, null, true],
  ["plant", "Chậu cây", null, "decor", 12, 16, true, true, null, true],
  ["cactus", "Xương rồng", null, "decor", 10, 14, true, true, null, true],
  ["books", "Chồng sách", null, "decor", 14, 10, true, true, null, true],
  ["frame", "Khung ảnh", null, "decor", 14, 12, true, true, null, true],
  ["candle", "Nến", null, "decor", 6, 12, true, true, null, true],
  ["lamp", "Đèn bàn", "Chiếu sáng bàn học", "desk", 20, 24, true, false, null, false],
  ["cup", "Ly cà phê", "Đồ trang trí trên bàn", "desk", 12, 14, true, false, null, false],
];

export const ITEM_TYPES: ItemType[] = ROWS.map(
  ([code, name, description, group, width, height, inStudy, inBed, defaultVol, removable], i) => ({
    code, name, description, group, width, height, inStudy, inBed, defaultVol, removable, sortOrder: i + 1,
  }),
);


export const ITEM_CODES = ITEM_TYPES.map((t) => t.code);
export const STUDY_CODES = ITEM_TYPES.filter((t) => t.inStudy).map((t) => t.code);
export const BED_CODES = ITEM_TYPES.filter((t) => t.inBed).map((t) => t.code);
export const GROUP_LABEL: Record<ItemGroup, string> = { sound: "Phát âm thanh", decor: "Trang trí", desk: "Trên bàn" };
