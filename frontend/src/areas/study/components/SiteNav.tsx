import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { PAGES } from "../../../lib/pages";
import { useAuth } from "../../../store/auth";

/**
 * Danh sách trang dùng chung cho header mọi trang và header Căn phòng (FR-PAGE-02).
 * Từ 768 px: 5 mục nằm một hàng, không xuống dòng. Dưới 768 px: gom vào nút ☰.
 * fullReload: dùng thẻ <a> (Căn phòng cần tải trang đầy đủ khi vào và khi rời).
 */
export function SiteNav({ current, fullReload = false }: { current: string; fullReload?: boolean }) {
  const [open, setOpen] = useState(false);
  const user = useAuth((s) => s.user);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const label = (p: { path: string; label: string }) => (p.path === "/account" && user ? user.displayName : p.label);
  const base = "block whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 hover:text-amber";
  const cls = (active: boolean) => `${base} ${active ? "border-amber text-amber" : "border-transparent text-ink"}`;
  const items = PAGES.filter((p) => p.path !== "/").map((p) => {
    const active = p.path === current;
    const link = fullReload || p.path === "/room"
      ? <a href={p.path} className={cls(active)} aria-current={active ? "page" : undefined}>{label(p)}</a>
      : <NavLink to={p.path} end className={({ isActive }) => cls(isActive)} onClick={() => setOpen(false)}>{label(p)}</NavLink>;
    return <li key={p.path}>{link}</li>;
  });

  return (
    <div ref={box} className="site-nav relative ml-auto md:ml-0">
      <ul className="hidden items-center md:flex" aria-label="Các trang">{items}</ul>
      <button
        type="button"
        className="grid size-10 cursor-pointer place-items-center border border-line bg-panel-2 text-ink hover:border-amber md:hidden"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label="Mở menu các trang"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 12 10" width="16" height="14" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h12v2H0zM0 4h12v2H0zM0 8h12v2H0z" /></svg>
      </button>
      {open && (
        <ul id="site-menu" className="absolute top-[calc(100%+8px)] right-0 z-[700] grid min-w-[210px] border border-line bg-panel p-1 shadow-[3px_3px_0_var(--color-shadow),0_10px_24px_rgba(0,0,0,.45)] md:hidden">
          {items}
        </ul>
      )}
    </div>
  );
}

/** Logo FocuSpace: ô vuông amber + chữ đậm, dùng chung cho mọi header. */
export function Logo({ fullReload = false }: { fullReload?: boolean }) {
  const inner = (<><i className="inline-block size-3 bg-amber shadow-[3px_3px_0_#7a4b1c]" aria-hidden="true" />FocuSpace</>);
  const cls = "flex items-center gap-2 whitespace-nowrap text-base font-bold text-amber";
  return fullReload ? <a href="/" className={cls}>{inner}</a> : <NavLink to="/" className={cls}>{inner}</NavLink>;
}
