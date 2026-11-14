import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PAGES } from "../../../lib/pages";
import { useAuth } from "../../../store/auth";

/** Thanh điều hướng chung (FR-PAGE-02): đánh dấu trang hiện tại, thu thành nút menu dưới 640 px. */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const user = useAuth((s) => s.user);
  const cls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 hover:text-amber ${isActive ? "text-amber" : "text-ink"}`;
  return (
    <header className="border-b border-line bg-panel">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3" aria-label="Điều hướng chính">
        <Link to="/" className="font-logo text-xs text-amber">FocuSpace</Link>
        <button
          type="button"
          className="btn ml-auto px-3 py-1.5 sm:hidden"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <ul id="main-menu" className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[52px] z-50 flex-col border-b border-line bg-panel p-2 sm:static sm:ml-auto sm:flex sm:flex-row sm:border-0 sm:p-0`}>
          {PAGES.filter((p) => p.path !== "/").map((p) => (
            <li key={p.path}>
              {p.path === "/room" ? (
                <a href="/room" className="block px-3 py-2 text-ink hover:text-amber">{p.label}</a>
              ) : (
                <NavLink to={p.path} className={cls} end onClick={() => setOpen(false)}>
                  {p.path === "/account" && user ? `${user.displayName} ▾` : p.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
