import type { ComponentType, LazyExoticComponent } from "react";

/**
 * Cổng cắm khu vực. Mỗi khu vực (items-audio, garden, bedroom…) có thể thêm file
 * `src/areas/<khu-vực>/index.ts` export `area: AreaModule`. Base tự tìm bằng import.meta.glob:
 * khu vực chưa có file này thì bị bỏ qua, web vẫn build và chạy được.
 */
export interface AreaRoute {
  path: string; // ví dụ "/stats"
  element: LazyExoticComponent<ComponentType> | ComponentType;
  nav?: { label: string; order: number }; // hiện trên thanh điều hướng
}
export interface AreaModule {
  name: string;
  routes?: AreaRoute[];
  setup?: () => void; // chạy một lần trước khi render (GA4, Sentry…)
}

const found = import.meta.glob<{ area?: AreaModule }>("../areas/*/index.ts", { eager: true });
export const AREAS: AreaModule[] = Object.values(found)
  .map((m) => m.area)
  .filter((a): a is AreaModule => !!a);

export const areaRoutes = () => AREAS.flatMap((a) => a.routes ?? []);
export const setupAreas = () => AREAS.forEach((a) => a.setup?.());
