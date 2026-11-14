import { areaRoutes } from "./areas";

/** Trang của base (Thịnh). Trang của khu vực khác (ví dụ /stats) được thêm qua areas/<khu-vực>/index.ts. */
const BASE_PAGES = [
  { path: "/", label: "Trang chủ", order: 0 },
  { path: "/room", label: "Căn phòng", order: 10 },
  { path: "/library", label: "Thư viện", order: 20 },
  { path: "/account", label: "Tài khoản", order: 40 },
  { path: "/about", label: "Giới thiệu & Liên hệ", order: 50 },
];

export const PAGES = [
  ...BASE_PAGES,
  ...areaRoutes().filter((r) => r.nav).map((r) => ({ path: r.path, label: r.nav!.label, order: r.nav!.order })),
].sort((a, b) => a.order - b.order);

export const GITHUB_URL = "https://github.com/CaoLePhucThinh2203/FocuSpace";
