import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import roomCss from "../engine/room.css?inline";
import { ROOM_MARKUP } from "../engine/markup";
import { startRoomEngine } from "../../../engine/legacy/roomEngine";
import { Logo, SiteNav } from "../components/SiteNav";
import { pullBeforeStart, resolveMerge, startAutoPush, type MergeChoice } from "../roomSync";
import { useTitle } from "../../../lib/useTitle";
import { useAuth } from "../../../store/auth";

type Merge = Extract<Awaited<ReturnType<typeof pullBeforeStart>>, { needMerge: true }>;

/**
 * Căn phòng (UC.01–UC.06, UC.09). Trang này luôn được mở bằng tải trang đầy đủ (thẻ <a href="/room">)
 * để engine có tài liệu sạch; rời phòng cũng tải trang mới nên không cần dọn engine.
 */
export default function Room() {
  useTitle("FocuSpace — Căn phòng học Lo-fi", "Căn phòng pixel art có sẵn bàn học: âm thanh không gian 2D, thời tiết, Pomodoro và hẹn giờ ngủ. Nhấp vào phòng để bật âm thanh.");
  const host = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const { user, ready } = useAuth();
  const [merge, setMerge] = useState<Merge | null>(null);
  const [notice, setNotice] = useState("");
  const [headSlot, setHeadSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ready || started.current || !host.current) return;
    started.current = true;
    const style = document.createElement("style");
    style.textContent = roomCss;
    document.head.appendChild(style);
    document.getElementById("root")?.style.setProperty("height", "100%");
    host.current.innerHTML = ROOM_MARKUP;
    setHeadSlot(document.getElementById("siteHead"));

    (async () => {
      if (user) {
        const r = await pullBeforeStart(user.id).catch(() => ({ needMerge: false as const }));
        if (r.needMerge) { setMerge(r); return; }
      }
      boot();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function boot() {
    startRoomEngine();
    if (user) {
      startAutoPush(
        user.id,
        () => { setNotice("Phòng đã được cập nhật từ thiết bị khác."); setTimeout(() => location.reload(), 1500); },
        (off) => setNotice(off ? "Chưa đồng bộ – đang ngoại tuyến" : ""),
      );
    }
  }

  async function choose(choice: MergeChoice) {
    if (!merge || !user) return;
    await resolveMerge(user.id, choice, merge.remote).catch(() => undefined);
    setMerge(null);
    boot();
  }

  return (
    <>
      <div ref={host} className="contents" />
      {headSlot && createPortal(<><Logo fullReload /><SiteNav current="/room" fullReload /></>, headSlot)}
      {notice && (
        <p role="status" className="fixed bottom-4 left-1/2 z-[1000] -translate-x-1/2 border border-[#3e2c21] bg-[#211712] px-4 py-2 text-sm text-[#f2e4cf]">
          {notice}
        </p>
      )}
      {merge && (
        <div role="dialog" aria-modal="true" aria-labelledby="merge-title" className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-4">
          <div className="grid w-full max-w-sm gap-4 border border-[#3e2c21] bg-[#211712] p-6 text-[#f2e4cf]">
            <h2 id="merge-title" className="text-xl font-bold">Giữ căn phòng nào?</h2>
            <p className="text-sm text-[#b49b81]">Máy này có phòng đã bày khi chưa đăng nhập, tài khoản của bạn cũng đã có phòng. Bản không chọn sẽ bị ghi đè.</p>
            <button type="button" className="border border-[#f3a84b] bg-[#f3a84b] px-4 py-2 font-semibold text-[#2a1606]" onClick={() => void choose("local")}>Giữ phòng trên máy này</button>
            <button type="button" className="border border-[#3e2c21] px-4 py-2 font-semibold" onClick={() => void choose("cloud")}>Dùng phòng đã lưu trên tài khoản</button>
          </div>
        </div>
      )}
    </>
  );
}
