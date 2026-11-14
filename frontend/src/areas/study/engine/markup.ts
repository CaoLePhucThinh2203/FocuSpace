/** Khung HTML của Căn phòng — chép từ prototype/web/room.html (thẻ <div class="app"> và lớp fade). */
export const ROOM_MARKUP = `<div class="app grid h-full grid-rows-[auto_auto_1fr] gap-3 py-3 max-[720px]:h-auto max-[720px]:min-h-full">
  <header class="top flex min-w-0 flex-wrap items-center gap-4">
    <div class="relative"><button type="button" class="logo cursor-pointer" id="logoBtn" aria-haspopup="true" aria-expanded="false" aria-controls="siteMenu" title="Các trang khác"><i></i>FocuSpace<svg viewBox="0 0 6 4" width="9" height="6" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h6v1H5v1H4v1H2V2H1V1H0z"/></svg></button><nav class="site-menu absolute top-[calc(100%+8px)] left-0 z-[700] grid min-w-[190px] border border-line bg-panel-a p-1 shadow-[3px_3px_0_var(--shadow),0_10px_24px_rgba(0,0,0,.45)]" id="siteMenu" aria-label="Các trang" hidden></nav></div>
    <div class="room-name text-[13px] text-muted">Phòng: <b class="font-semibold text-ink" id="roomName">Góc học tập ấm áp</b></div>
    <div class="spacer flex-1"></div>
    <div class="pomo-mini" title="Pomodoro">
      <span class="mode" id="pomoMiniMode">Focus</span>
      <span class="time" id="pomoMiniTime">25:00</span>
      <button class="btn" id="pomoMiniBtn" type="button">Bắt đầu</button>
    </div>
    <div class="sleep-mini" id="sleepMini" hidden>
      <span class="mode">Hẹn giờ ngủ</span>
      <div class="seg" role="group" aria-label="Hẹn giờ ngủ">
        <button type="button" data-sl="0" aria-pressed="true">Tắt</button><button type="button" data-sl="15" aria-pressed="false">15p</button><button type="button" data-sl="30" aria-pressed="false">30p</button><button type="button" data-sl="45" aria-pressed="false">45p</button><button type="button" data-sl="60" aria-pressed="false">60p</button>
      </div>
      <span class="time" id="sleepTime">--:--</span>
    </div>
    <span class="chip" id="audioChip" title="Đeo tai nghe để trải nghiệm không gian âm thanh 2D chân thực nhất."><span class="dot"></span><span id="audioTxt">Âm thanh: nhấn vào phòng để bật</span></span>
    <span class="chip" id="saveChip"><span class="dot"></span><span id="saveTxt">Chưa thay đổi</span></span>
  </header>

  <div class="toolwrap relative z-[500] flex flex-wrap items-center gap-[14px]">
    <div class="toolbar" id="toolbar" role="toolbar" aria-label="Công cụ phòng">
      <button type="button" class="tb-btn" data-tray="sound" aria-pressed="false" aria-label="Đồ vật phát âm thanh">
        <svg viewBox="0 0 12 12" fill="currentColor" shape-rendering="crispEdges"><rect x="5" y="1" width="5" height="2"/><rect x="5" y="3" width="1" height="6"/><rect x="9" y="3" width="1" height="5"/><rect x="3" y="8" width="3" height="3"/><rect x="7" y="7" width="3" height="3"/></svg>
        <span class="tb-tip">Đồ vật phát âm thanh</span>
      </button>
      <button type="button" class="tb-btn" data-tray="decor" aria-pressed="false" aria-label="Đồ vật trang trí">
        <svg viewBox="0 0 12 12" fill="currentColor" shape-rendering="crispEdges"><rect x="5" y="0" width="2" height="2"/><rect x="2" y="2" width="3" height="2"/><rect x="7" y="2" width="3" height="2"/><rect x="5" y="3" width="2" height="5"/><rect x="3" y="8" width="6" height="1"/><rect x="4" y="9" width="4" height="3"/></svg>
        <span class="tb-tip">Đồ vật trang trí</span>
      </button>
      <button type="button" class="tb-btn" data-tray="mixer" aria-pressed="false" aria-label="Volume mixer">
        <svg viewBox="0 0 12 12" fill="currentColor" shape-rendering="crispEdges"><rect x="0" y="4" width="2" height="4"/><rect x="2" y="3" width="1" height="6"/><rect x="3" y="2" width="1" height="8"/><rect x="4" y="1" width="1" height="10"/><rect x="6" y="4" width="1" height="4"/><rect x="8" y="2" width="1" height="8"/><rect x="10" y="4" width="1" height="4"/></svg>
        <span class="tb-tip">Volume mixer</span>
      </button>
      <button type="button" class="tb-btn" data-tray="scene" aria-pressed="false" aria-label="Khung cảnh" hidden>
        <svg viewBox="0 0 12 12" fill="currentColor" shape-rendering="crispEdges"><rect x="0" y="1" width="12" height="1"/><rect x="0" y="10" width="12" height="1"/><rect x="0" y="1" width="1" height="10"/><rect x="11" y="1" width="1" height="10"/><rect x="8" y="3" width="2" height="2"/><rect x="2" y="8" width="8" height="2"/><rect x="3" y="7" width="3" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="7" y="7" width="2" height="1"/></svg>
        <span class="tb-tip">Khung cảnh</span>
      </button>
      <span class="drop-hint">Thả để xóa</span>
    </div>
    <span class="mixchip"><span class="dot"></span><span id="mixCount">0 nguồn âm đang hoạt động</span></span>
    <div class="tray" id="tray" hidden></div>
  </div>

  <main class="main grid min-h-0 grid-cols-[clamp(40px,5vw,64px)_minmax(0,1fr)_clamp(40px,5vw,64px)] gap-2 max-[720px]:grid-cols-[44px_minmax(0,1fr)_44px] max-[720px]:content-start">
    <nav class="room-nav" id="roomNav" hidden aria-label="Chuyển phòng"></nav>
    <section class="stage-wrap relative col-start-2 row-start-1 grid min-h-0 min-w-0 place-items-center max-[720px]:flex max-[720px]:min-h-[200px] max-[720px]:flex-col max-[720px]:items-center max-[720px]:gap-2" id="stageWrap">
      <div class="room" id="room">
        <canvas class="layer" id="bgCv" width="320" height="180"></canvas>
        <canvas class="layer" id="animCv" width="320" height="180"></canvas>
        <div class="items" id="items"></div>
        <canvas class="layer" id="lightCv" width="160" height="90"></canvas>
      </div>

    </section>
  </main>

</div>

<div class="fade" id="fade" aria-hidden="true"></div>`;
