import { Link } from "react-router-dom";
import { GITHUB_URL } from "../../../lib/pages";

/** Chân trang (FR-PAGE-06). */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-ink">FocuSpace</span> · Đồ án môn Web Design and Development (CSB25022) · VNUK · Học kỳ 1, năm học 2026–2027
        </p>
        <p>
          GitHub:{" "}
          <a className="text-ink underline hover:text-amber" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            CaoLePhucThinh2203/FocuSpace
          </a>{" "}
          · <Link className="underline hover:text-amber" to="/about#lien-he">Liên hệ</Link>
        </p>
      </div>
    </footer>
  );
}
