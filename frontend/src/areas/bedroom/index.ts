import { lazy } from "react";
import type { AreaModule } from "../../lib/areas";

/** Cắm khu vực Phòng ngủ (Tuấn Lộc) vào base: thêm trang /stats và mục "Thống kê" trên thanh điều hướng. */
export const area: AreaModule = {
  name: "bedroom",
  routes: [{ path: "/stats", element: lazy(() => import("./pages/Stats")), nav: { label: "Thống kê", order: 30 } }],
};
