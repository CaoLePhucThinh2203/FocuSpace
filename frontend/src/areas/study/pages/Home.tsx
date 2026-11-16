import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";

const SPACES = [
  { img: "/previews/room-study.webp", alt: "Phòng học", title: "Phòng học", text: "Bàn học, cửa sổ đổi được 4 kiểu thời tiết, lò sưởi, tai nghe phát nhạc Lo-fi." },
  { img: "/previews/room-bed.webp", alt: "Phòng ngủ", title: "Phòng ngủ", text: "3 kiểu trời đêm, đĩa than, hộp nhạc, quạt bàn và hẹn giờ ngủ tự tắt âm thanh." },
  { img: "/previews/room-out.webp", alt: "Sân vườn", title: "Sân vườn", text: "Có 5 khung cảnh: Thành phố, Khu rừng, Bãi biển, Núi băng, Đồi ven biển." },
];
const FEATURES = [
  { title: "Phòng có sẵn", text: "Bàn ghế và nhân vật đã đặt sẵn. Bạn chỉ thêm vài đồ vật nếu muốn, không phải sắp xếp từ đầu." },
  { title: "Âm thanh theo vị trí", text: "Đặt Tivi bên trái thì tiếng Tivi nghe lệch về tai trái. Nhạc, radio, đĩa than và tiếng ngoài cửa sổ nghe đều hai tai. Bảng âm lượng chỉnh từng nguồn và âm lượng tổng." },
  { title: "Pomodoro và hẹn giờ ngủ", text: "Pomodoro có 4 nhịp học (mặc định 25 phút học, 5 phút nghỉ), dùng chung ở Phòng học và Sân vườn. Hẹn giờ ngủ giảm âm dần trong 2 phút cuối rồi tắt." },
];

/** Trang chủ (FR-PAGE-04, UC.12). */
export default function Home() {
  useTitle("FocuSpace — Phòng học ảo có nhạc Lo-fi", "FocuSpace: phòng học ảo dạng pixel có sẵn bàn học, âm thanh theo vị trí đồ vật, Pomodoro và hẹn giờ ngủ. Dùng ngay, không cần tài khoản.");
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-10 md:grid-cols-2 md:pt-20">
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Không gian ảo giúp tập trung.</h1>
          <p className="max-w-prose text-base text-muted">
            FocuSpace có sẵn ba phòng: phòng học, phòng ngủ và sân vườn. Bạn chọn âm thanh, thời tiết, thêm vài đồ vật rồi bắt đầu học.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/room" className="btn btn-primary px-6 py-3 text-base">Vào phòng</a>
            <Link to="/library" className="btn px-6 py-3 text-base">Xem thư viện</Link>
          </div>
          <p className="text-xs text-muted">Để trải nghiệm tốt nhất, hãy đeo tai nghe.</p>
        </div>
        <figure className="card overflow-hidden">
          <img src="/previews/room-study.webp" width={800} height={450} alt="Phòng học: nhân vật ngồi học bên bàn, ngoài cửa sổ đang mưa, lò sưởi đang cháy" className="pixel block h-auto w-full" fetchPriority="high" />
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="h-spaces">
        <h2 id="h-spaces" className="font-display text-2xl font-bold">Ba phòng có sẵn</h2>
        <p className="mt-2 text-muted">Bấm mũi tên 2 bên để chuyển phòng.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPACES.map((s, i) => (
            <article key={s.title} className={`card overflow-hidden ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <img src={s.img} width={800} height={450} loading="lazy" alt={s.alt} className="pixel block h-auto w-full" />
              <div className="space-y-1 p-4">
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="h-features">
        <h2 id="h-features" className="font-display text-2xl font-bold">Tính năng chính</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="card p-5">
              <h3 className="font-display text-lg font-bold text-amber">{f.title}</h3>
              <p className="mt-2 text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
