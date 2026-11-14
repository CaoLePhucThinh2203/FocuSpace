import { Link } from "react-router-dom";
import { useTitle } from "../../../lib/useTitle";

const SPACES = [
  { img: "/previews/room-study.webp", alt: "Góc học tập ấm áp", title: "Góc học tập ấm áp", text: "Cửa sổ 4 kiểu thời tiết, lò sưởi, tai nghe phát nhạc Lo-fi, đồng hồ Pomodoro." },
  { img: "/previews/room-bed.webp", alt: "Phòng ngủ yên tĩnh", title: "Phòng ngủ yên tĩnh", text: "Đêm sao, mưa đêm, tuyết rơi; đĩa than, hộp nhạc, quạt bàn và hẹn giờ ngủ tự tắt." },
  { img: "/previews/room-out.webp", alt: "Sân vườn: xích đu dưới gốc cây", title: "Sân vườn · xích đu dưới gốc cây", text: "Nghỉ giữa giờ với 5 khung cảnh: Thành phố, Khu rừng, Bãi biển, Núi băng, Đồi ven biển." },
];
const FEATURES = [
  { title: "Semi-Sandbox", text: "Phòng đã bày sẵn bàn ghế và nhân vật. Bạn chỉ kéo thêm vài đồ vật — không mất thời gian sắp xếp." },
  { title: "Âm thanh không gian 2D", text: "Kéo Tivi sang trái, tiếng nhiễu sóng lệch sang tai trái. Volume mixer chỉnh từng nguồn và âm lượng tổng." },
  { title: "Pomodoro & Hẹn giờ ngủ", text: "Một bộ đếm 25/5 phút dùng chung mọi không gian; hẹn giờ ngủ giảm âm dần rồi tắt." },
];

/** Trang chủ (FR-PAGE-04, UC.12). */
export default function Home() {
  useTitle("FocuSpace — Căn phòng pixel để học tập Lo-fi", "FocuSpace: căn phòng pixel art có sẵn bàn học, âm thanh không gian 2D, Pomodoro và hẹn giờ ngủ. Vào là học được ngay.");
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-10 md:grid-cols-2 md:pt-20">
        <div className="space-y-6">
          <p className="chip w-fit"><span className="size-1.5 bg-ok" />Pixel art · Lo-fi · Semi-Sandbox</p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Vào phòng là học được ngay.</h1>
          <p className="max-w-prose text-base text-muted">
            FocuSpace dựng sẵn ba không gian ấm áp: góc học tập, phòng ngủ và sân vườn. Bạn chỉ cần chọn âm thanh, thời tiết và vài đồ vật — thiết lập dưới 15 giây, rồi tập trung.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/room" className="btn btn-primary px-6 py-3 text-base">Vào phòng</a>
            <Link to="/library" className="btn px-6 py-3 text-base">Xem thư viện đồ vật</Link>
          </div>
          <p className="text-xs text-muted">Đeo tai nghe để nghe rõ âm thanh không gian 2D. Không cần tài khoản để dùng thử.</p>
        </div>
        <figure className="card overflow-hidden">
          <img src="/previews/room-study.webp" width={800} height={450} alt="Góc học tập ấm áp: nhân vật ngồi học bên bàn, cửa sổ đang mưa, lò sưởi cháy" className="pixel block h-auto w-full" fetchPriority="high" />
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="h-spaces">
        <h2 id="h-spaces" className="font-display text-2xl font-bold">Ba không gian dựng sẵn</h2>
        <p className="mt-2 text-muted">Chuyển qua lại bằng mũi tên trong phòng; âm nền đổi mượt theo không gian.</p>
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
        <h2 id="h-features" className="font-display text-2xl font-bold">Vì sao chọn FocuSpace</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="card p-5">
              <h3 className="font-display text-lg font-bold text-amber">{f.title}</h3>
              <p className="mt-2 text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/room" className="btn btn-primary">Bắt đầu học ngay</a>
          <Link to="/about" className="btn">Tìm hiểu thêm</Link>
        </div>
      </section>
    </main>
  );
}
