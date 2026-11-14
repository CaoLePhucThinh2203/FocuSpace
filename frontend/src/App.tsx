import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./areas/study/components/Layout";
import { useAuth } from "./store/auth";
import { areaRoutes } from "./lib/areas";

// Tách mã theo trang (Lighthouse): engine Căn phòng chỉ tải khi vào /room.
const Home = lazy(() => import("./areas/study/pages/Home"));
const Room = lazy(() => import("./areas/study/pages/Room"));
const Library = lazy(() => import("./areas/study/pages/Library"));
const Account = lazy(() => import("./areas/study/pages/Account"));
const About = lazy(() => import("./areas/study/pages/About"));
const NotFound = lazy(() => import("./areas/study/pages/NotFound"));

export default function App() {
  const init = useAuth((s) => s.init);
  useEffect(() => { void init(); }, [init]);
  return (
    <BrowserRouter>
      <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route path="/room" element={<Room />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            {areaRoutes().map(({ path, element: Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
