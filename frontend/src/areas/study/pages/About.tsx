import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";
import { GITHUB_URL } from "../../../lib/pages";

const TEAM = [
  { name: "Phúc Thịnh", role: "Phòng học, Trang chủ, Thư viện, Tài khoản, Giới thiệu; quản lý mã nguồn", email: "thinh.cao240924@vnuk.udn.vn" },
  { name: "Tuấn Hưng", role: "Đồ vật và âm thanh", email: "hung.nguyen240919@vnuk.udn.vn" },
  { name: "Đình Nhiên", role: "Sân vườn, theo dõi lượt dùng và lỗi", email: "nhien.truong240960@vnuk.udn.vn" },
  { name: "Tuấn Lộc", role: "Phòng ngủ, đăng nhập, trang Thống kê", email: "loc.dau240925@vnuk.udn.vn" },
];
const POINTS = [
  "Phòng có nhân vật, mưa rơi, lửa cháy, luôn có chuyển động nhẹ.",
  "Phòng bày sẵn, vào là học được ngay.",
  "Âm thanh nhẹ, phát theo vị trí đồ vật, đeo tai nghe lâu vẫn dễ chịu.",
  "Pomodoro, nhạc nền và hẹn giờ ngủ ở cùng một trang.",
];

/** Giới thiệu & Liên hệ (FR-PAGE-05, UC.12). */
export default function About() {
  useTitle("Giới thiệu & Liên hệ — FocuSpace", "Mục tiêu dự án FocuSpace, cách dùng nhanh, nhóm phát triển và thông tin liên hệ.");
  return (
    <main className="mx-auto grid max-w-4xl gap-12 px-4 py-10 [&>*]:min-w-0">
      <section aria-labelledby="h-goal">
        <h1 id="h-goal" className="font-display text-2xl font-bold sm:text-3xl">Về FocuSpace</h1>
        <p className="mt-4 text-base text-muted">FocuSpace là phòng học ảo phong cách pixel, có nhạc Lo-fi, dành cho người hay đeo tai nghe học buổi tối.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {POINTS.map((t) => (
            <li key={t} className="card p-4 text-muted">{t}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-how">
        <h2 id="h-how" className="font-display text-2xl font-bold">Cách dùng nhanh</h2>
        <ol className="mt-4 grid list-decimal gap-2 pl-6 marker:font-display marker:text-amber">
          <li>Mở <a href="/room" className="text-amber underline">Căn phòng</a>, nhấp một lần để bật âm thanh.</li>
          <li>Bấm cửa sổ, lò sưởi hoặc đồ vật để chỉnh.</li>
          <li>Kéo thêm đồ vật từ thanh công cụ vào phòng.</li>
          <li>Bấm <b>Bắt đầu</b> ở Pomodoro góc trên phải; giờ nghỉ thì ra Sân vườn.</li>
          <li><Link to="/account" className="text-amber underline">Đăng nhập</Link> để lưu phòng và xem thống kê.</li>
        </ol>
      </section>

      <section aria-labelledby="h-team">
        <h2 id="h-team" className="font-display text-2xl font-bold">Nhóm phát triển</h2>
        <p className="mt-2 text-muted">Đồ án môn Web Design and Development (CSB25022), VNUK.</p>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr><th className="p-3 font-semibold">Thành viên</th><th className="p-3 font-semibold">Phụ trách</th><th className="p-3 font-semibold">Email</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TEAM.map((m) => (
                <tr key={m.email}>
                  <td className="p-3">{m.name}</td>
                  <td className="p-3 text-muted">{m.role}</td>
                  <td className="p-3"><a className="underline hover:text-amber" href={`mailto:${m.email}`}>{m.email}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="quyen-rieng-tu" aria-labelledby="h-privacy">
        <h2 id="h-privacy" className="font-display text-2xl font-bold">Quyền riêng tư</h2>
        <p className="mt-2 text-muted">FocuSpace dùng Google Analytics để đếm lượt xem và Sentry để ghi lỗi. Email, tên và căn phòng của bạn không được gửi tới các dịch vụ này.</p>
      </section>

      <section id="lien-he" aria-labelledby="h-contact">
        <h2 id="h-contact" className="font-display text-2xl font-bold">Liên hệ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Email</p>
            <p className="mt-1"><a className="underline hover:text-amber" href="mailto:thinh.cao240924@vnuk.udn.vn">thinh.cao240924@vnuk.udn.vn</a> (Phúc Thịnh, trưởng nhóm)</p>
          </div>
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Mã nguồn GitHub</p>
            <p className="mt-1"><a className="break-all underline hover:text-amber" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/CaoLePhucThinh2203/FocuSpace</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
