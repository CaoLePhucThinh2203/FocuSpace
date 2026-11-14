/** 5 khung cảnh Sân vườn — nguồn cho engine, seeder và trang Thư viện (DATABASE §3.8). Người phụ trách: Đình Nhiên (N3). */
export interface Scene {
  code: string;
  name: string;
  description: string;
  isDefault: boolean;
  sortOrder: number;
}

export const SCENES: Scene[] = [
  { code: "city", name: "Thành phố", description: "Buổi tối, xe cộ lofi chill êm dịu", isDefault: false, sortOrder: 1 },
  { code: "forest", name: "Khu rừng", description: "Gió xào xạc lá, chim hót", isDefault: true, sortOrder: 2 },
  { code: "beach", name: "Bãi biển", description: "Sóng vỗ bờ, hải âu", isDefault: false, sortOrder: 3 },
  { code: "glacier", name: "Núi băng", description: "Hồ núi, suối băng róc rách êm", isDefault: false, sortOrder: 4 },
  { code: "hill", name: "Đồi ven biển", description: "Biển xa, mây trôi, gió nhẹ", isDefault: false, sortOrder: 5 },
];

export const SCENE_CODES = SCENES.map((s) => s.code);
export const DEFAULT_SCENE = "forest";

/** Trạng thái mặc định của Sân vườn (prototype DEFAULT_STATE.out). */
export const DEFAULT_OUT = { scene: DEFAULT_SCENE, on: true, vol: 0.6 } as const;
