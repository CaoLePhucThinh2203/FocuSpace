import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";

const SPACES = [
  { img: "/previews/room-study.webp", alt: "Phòng học", title: "Phòng học", text: "Nơi học tập trung: 4 kiểu thời tiết, lò sưởi, nhạc Lo-fi." },
  { img: "/previews/room-bed.webp", alt: "Phòng ngủ", title: "Phòng ngủ", text: "Nơi thư giãn trước khi ngủ: 3 kiểu trời đêm, đĩa than, hẹn giờ ngủ." },
  { img: "/previews/room-out.webp", alt: "Sân vườn", title: "Sân vườn", text: "Nơi nghỉ giữa giờ: 5 khung cảnh, xích đu, nhạc Lo-fi." },
];
const FEATURES = [
  { title: "Phòng dựng sẵn", text: "Bàn ghế, nhân vật đã sắp xếp; có thể thêm đồ vật tùy ý." },
  { title: "Âm thanh theo vị trí", text: "Mỗi đồ vật phát âm thanh riêng, nghe rõ hơn ở phía đặt đồ." },
  { title: "Pomodoro và hẹn giờ ngủ", text: "Chia giờ học, giờ nghỉ; tự tắt âm thanh khi đến giờ ngủ." },
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
        <h2 id="h-spaces" className="font-display text-2xl font-bold">Có 3 không gian</h2>
        <p className="mt-2 text-muted">Bấm mũi tên 2 bên để chuyển phòng.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPACES.map((s, i) => (
            <article key={s.title} className={`card overflow-hidden ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <img src={s.img} width={800} height={450} loading="lazy" alt={s.alt} className="pixel block aspect-video h-auto w-full" />
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
