import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";

/** Trang 404 (FR-PAGE-07, AC-12.3). */
export default function NotFound() {
  useTitle("Không tìm thấy trang — FocuSpace");
  return (
    <main className="mx-auto grid max-w-xl place-items-center gap-4 px-4 py-24 text-center">
      <p className="font-logo text-3xl text-amber">404</p>
      <h1 className="font-display text-2xl font-bold">Không tìm thấy trang</h1>
      <p className="text-muted">Đường dẫn này không tồn tại hoặc đã được đổi.</p>
      <Link to="/" className="btn btn-primary">Về Trang chủ</Link>
    </main>
  );
}
