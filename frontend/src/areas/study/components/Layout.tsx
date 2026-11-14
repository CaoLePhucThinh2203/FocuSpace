import { useEffect } from "react";
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
      <Outlet />
      <Footer />
    </>
  );
}
