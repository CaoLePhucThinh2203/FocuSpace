import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { trackPage } from "../../../lib/analytics";

/** Khung chung cho mọi trang trừ Căn phòng. */
export function Layout() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPage(loc.pathname, document.title);
  }, [loc.pathname]);
  return (
    <>
      <NavBar />
      {/* Suspense đặt TRONG khung: thanh điều hướng hiện ngay, chỉ phần thân chờ tải trang.
          Nếu đặt ngoài (App.tsx), thanh điều hướng xuất hiện muộn và đẩy cả trang xuống (Lighthouse CLS 0,296). */}
      <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
