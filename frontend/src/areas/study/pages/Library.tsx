import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GROUP_LABEL, type ItemGroup } from "@focuspace/shared";
import { api } from "../../../lib/api";
import { useTitle } from "../../../lib/useTitle";

interface Item { code: string; name: string; description: string | null; group: ItemGroup; width: number; height: number; rooms: string[] }
interface Scene { code: string; name: string; description: string; isDefault: boolean }
const ROOM_LABEL: Record<string, string> = { study: "Phòng học", bed: "Phòng ngủ" };
type Load<T> = { state: "loading" } | { state: "error" } | { state: "ok"; data: T };

/** Thư viện đồ vật & khung cảnh — trang động đọc CSDL (UC.07, FR-LIB-01→06). */
export default function Library() {
  useTitle("Thư viện đồ vật và khung cảnh — FocuSpace", "Danh mục 17 đồ vật và 5 khung cảnh của FocuSpace, lọc theo phòng và nhóm âm thanh.");
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "scenes" ? "scenes" : "items";
  const room = params.get("room") ?? "";
  const group = params.get("group") ?? "";
  const [items, setItems] = useState<Load<Item[]>>({ state: "loading" });
  const [scenes, setScenes] = useState<Load<Scene[]>>({ state: "loading" });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (tab !== "items") return;
    setItems({ state: "loading" });
    const q = new URLSearchParams();
    if (room) q.set("room", room);
    if (group) q.set("group", group);
    api<{ items: Item[] }>(`/catalog/items${q.size ? "?" + q : ""}`)
      .then((r) => setItems({ state: "ok", data: r.items }))
      .catch(() => setItems({ state: "error" }));
  }, [tab, room, group, retry]);

  useEffect(() => {
    if (tab !== "scenes") return;
    setScenes({ state: "loading" });
    api<{ scenes: Scene[] }>("/catalog/scenes")
      .then((r) => setScenes({ state: "ok", data: r.scenes }))
      .catch(() => setScenes({ state: "error" }));
  }, [tab, retry]);

  const set = (k: string, v: string) => {
    const p = new URLSearchParams(params);
    if (v) p.set(k, v); else p.delete(k);
    setParams(p, { replace: true });
  };
  const seg = (k: string, cur: string, opts: [string, string][]) => (
    <div className="flex flex-wrap gap-2" role="group">
      {opts.map(([v, label]) => (
        <button key={v} type="button" className={`btn px-3 py-1.5 ${cur === v ? "border-amber text-amber" : ""}`} aria-pressed={cur === v} onClick={() => set(k, v)}>
          {label}
        </button>
      ))}
    </div>
  );
  const errorBox = (
    <div className="card grid justify-items-start gap-3 p-6">
      <p>Không tải được thư viện.</p>
      <button type="button" className="btn" onClick={() => setRetry((n) => n + 1)}>Thử lại</button>
    </div>
  );
  const skeleton = (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }, (_, i) => <li key={i} className="card h-36 animate-pulse" />)}
    </ul>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Thư viện</h1>
      <p className="mt-2 text-muted">Mọi đồ vật và khung cảnh có trong FocuSpace. Dữ liệu đọc từ cơ sở dữ liệu.</p>

      <div className="mt-6 flex gap-2" role="tablist">
        {(["items", "scenes"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} type="button"
            className={`btn ${tab === t ? "btn-primary" : ""}`} onClick={() => set("tab", t === "items" ? "" : "scenes")}>
            {t === "items" ? "Đồ vật" : "Khung cảnh"}
          </button>
        ))}
      </div>

      {tab === "items" ? (
        <section className="mt-6 grid gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-muted">Phòng</span>
            {seg("room", room, [["", "Tất cả"], ["study", "Phòng học"], ["bed", "Phòng ngủ"]])}
            <span className="text-xs text-muted">Nhóm</span>
            {seg("group", group, [["", "Tất cả"], ["sound", "Phát âm thanh"], ["decor", "Trang trí"], ["desk", "Trên bàn"]])}
          </div>
          {items.state === "loading" && skeleton}
          {items.state === "error" && errorBox}
          {items.state === "ok" && (items.data.length === 0 ? (
            <p className="card p-6 text-muted">Không có đồ vật phù hợp.</p>
          ) : (
            <>
              <p className="text-xs text-muted">{items.data.length} đồ vật</p>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.data.map((it) => (
                  <li key={it.code} className="card flex gap-4 p-4">
                    <img src={`/previews/item-${it.code}.png`} alt="" width={64} height={64} loading="lazy" className="pixel size-16 shrink-0 bg-deep object-contain" />
                    <div className="min-w-0 space-y-1">
                      <h2 className="font-display text-lg font-bold">{it.name}</h2>
                      {it.description && <p className="text-muted">{it.description}</p>}
                      <p className="text-xs text-muted">
                        {GROUP_LABEL[it.group]} · {it.width}×{it.height} · {it.rooms.map((r) => ROOM_LABEL[r]).join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ))}
        </section>
      ) : (
        <section className="mt-6">
          {scenes.state === "loading" && skeleton}
          {scenes.state === "error" && errorBox}
          {scenes.state === "ok" && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenes.data.map((s) => (
                <li key={s.code} className="card overflow-hidden">
                  <img src={`/previews/scene-${s.code}.webp`} alt={`Khung cảnh ${s.name}`} width={320} height={180} loading="lazy" className="pixel block h-auto w-full" />
                  <div className="space-y-1 p-4">
                    <h2 className="font-display text-lg font-bold">{s.name} {s.isDefault && <span className="chip ml-2">Mặc định</span>}</h2>
                    <p className="text-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
