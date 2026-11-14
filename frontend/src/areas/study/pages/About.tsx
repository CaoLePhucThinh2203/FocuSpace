import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";
import { GITHUB_URL } from "../../../lib/pages";

const TEAM = [
  { name: "Phúc Thịnh", role: "Phòng học, quản lý repo, Trang chủ, Thư viện, Tài khoản, Giới thiệu", email: "thinh.cao240924@vnuk.udn.vn" },
  { name: "Tuấn Hưng", role: "Đồ vật, bảng đồ vật, âm thanh", email: "hung.nguyen240919@vnuk.udn.vn" },
  { name: "Đình Nhiên", role: "Sân vườn, Google Analytics, Sentry", email: "nhien.truong240960@vnuk.udn.vn" },
  { name: "Tuấn Lộc", role: "Phòng ngủ, tài khoản & thống kê (API), trang Thống kê", email: "loc.dau240925@vnuk.udn.vn" },
];
const PROBLEMS = [
  ["Ảnh tĩnh nhanh nhàm.", "Ba không gian có hoạt họa và câu chuyện thay cho “chấm icon trên ảnh phong cảnh”."],
  ["Mệt vì phải tự sắp xếp.", "Phòng dựng sẵn; bạn chỉ chỉnh âm thanh, thời tiết và vài đồ vật."],
  ["Âm thanh phẳng, chói tai.", "Âm thanh không gian 2D theo vị trí đồ vật, lọc dải trầm cho dễ nghe lâu."],
  ["Phải bật nhiều ứng dụng.", "Pomodoro, nhạc nền và hẹn giờ ngủ nằm chung một chỗ."],
];

/** Giới thiệu & Liên hệ (FR-PAGE-05, UC.12). */
export default function About() {
  useTitle("Giới thiệu và liên hệ — FocuSpace", "Mục tiêu dự án FocuSpace, cách dùng nhanh, nhóm phát triển và thông tin liên hệ.");
  return (
    <main className="mx-auto grid max-w-4xl gap-12 px-4 py-10 [&>*]:min-w-0">
      <section aria-labelledby="h-goal">
        <h1 id="h-goal" className="font-display text-3xl font-bold">Về FocuSpace</h1>
        <p className="mt-4 text-base text-muted">FocuSpace là căn phòng pixel art Lo-fi dành cho người học và làm việc buổi tối bằng tai nghe. Chúng tôi muốn giải quyết bốn vấn đề:</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PROBLEMS.map(([b, t]) => (
            <li key={b} className="card p-4"><b className="text-amber">{b}</b> <span className="text-muted">{t}</span></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-how">
        <h2 id="h-how" className="font-display text-2xl font-bold">Cách dùng nhanh</h2>
        <ol className="mt-4 grid list-decimal gap-2 pl-6 marker:font-display marker:text-amber">
          <li>Mở <a href="/room" className="text-amber underline">Căn phòng</a> và nhấp một lần để bật âm thanh (nên đeo tai nghe).</li>
          <li>Bấm cửa sổ để đổi thời tiết, bấm lò sưởi để chỉnh tiếng củi.</li>
          <li>Kéo đồ vật từ thanh công cụ vào phòng; kéo qua trái/phải để nghe âm lệch tai.</li>
          <li>Bấm <b>Bắt đầu</b> ở Pomodoro trên đầu trang; ra Sân vườn nghỉ giữa giờ bằng mũi tên trái.</li>
          <li>Đăng nhập ở trang <Link to="/account" className="text-amber underline">Tài khoản</Link> để đồng bộ phòng và xem thống kê.</li>
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
        <p className="mt-2 text-muted">FocuSpace dùng Google Analytics để đếm lượt xem trang và một số thao tác (đổi phòng, bắt đầu Pomodoro…), dùng Sentry để ghi lỗi. Không gửi email, tên hay nội dung căn phòng của bạn tới các dịch vụ này.</p>
      </section>

      <section id="lien-he" aria-labelledby="h-contact">
        <h2 id="h-contact" className="font-display text-2xl font-bold">Liên hệ</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Email liên hệ</p>
            <p className="mt-1"><a className="underline hover:text-amber" href="mailto:thinh.cao240924@vnuk.udn.vn">thinh.cao240924@vnuk.udn.vn</a> (trưởng nhóm)</p>
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
