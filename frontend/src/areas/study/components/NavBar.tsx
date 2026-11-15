import { useLocation } from "react-router-dom";
import { Logo, SiteNav } from "./SiteNav";

/** Thanh điều hướng chung (FR-PAGE-02): cùng kiểu header Căn phòng, 1 hàng từ 768 px, nút ☰ dưới 768 px. */
export function NavBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel/95 backdrop-blur-[6px]">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4" aria-label="Điều hướng chính">
        <Logo />
        <SiteNav current={pathname} />
      </nav>
    </header>
  );
}
