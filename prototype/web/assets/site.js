/* FocuSpace prototype — phần dùng chung cho các trang:
   1. Khai báo theme Tailwind (màu, font lấy từ prototype Căn phòng) trước khi Tailwind CDN chạy.
   2. Vẽ thanh điều hướng + chân trang, menu thu gọn dưới 640 px.
   3. Trạng thái đăng nhập giả lập (chỉ cho prototype, lưu ở localStorage). */
(function () {
  "use strict";
  var PAGES = [
    { id: "home", href: "index.html", label: "Trang chủ" },
    { id: "room", href: "room.html", label: "Căn phòng" },
    { id: "library", href: "library.html", label: "Thư viện" },
    { id: "stats", href: "stats.html", label: "Thống kê" },
    { id: "account", href: "account.html", label: "Tài khoản" },
    { id: "about", href: "about.html", label: "Giới thiệu & Liên hệ" },
  ];

  var THEME = [
    "@theme {",
    "  --color-bg: #16100d; --color-panel: #211712; --color-panel-2: #2b1e17; --color-line: #3e2c21;",
    "  --color-ink: #f2e4cf; --color-muted: #b49b81; --color-amber: #f3a84b; --color-amber-ink: #2a1606;",
    "  --color-rain: #8fb3d9; --color-danger: #e0705a; --color-ok: #8fd49a; --color-deep: #120c09; --color-shadow: #0b0806;",
    "  --color-bed: #171230; --color-bed-line: #32285c; --color-bed-amber: #f7d070;",
    "  --color-out: #15251d; --color-out-line: #2f5242; --color-out-amber: #f2c14e;",
    '  --font-logo: "Press Start 2P", "Pixelify Sans", "Courier New", monospace;',
    '  --font-display: "Pixelify Sans", "Courier New", monospace;',
    '  --font-body: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", sans-serif;',
    '  --font-digit: "VT323", "Courier New", monospace;',
    "}",
    "@layer base {",
    "  html { color-scheme: dark; }",
    "  body { @apply bg-bg text-ink font-body text-sm leading-relaxed; }",
    "  :focus-visible { @apply outline-2 outline-offset-2 outline-amber; }",
    "}",
    "@layer components {",
    "  .pixel { image-rendering: pixelated; }",
    "  .btn { @apply inline-flex items-center justify-center gap-2 border border-line bg-panel-2 px-4 py-2 text-sm font-semibold hover:border-amber cursor-pointer; }",
    "  .btn-primary { @apply bg-amber text-amber-ink border-amber hover:brightness-110; }",
    "  .btn-danger { @apply text-danger hover:border-danger; }",
    "  .card { @apply border border-line bg-panel shadow-[3px_3px_0_var(--color-shadow)]; }",
    "  .chip { @apply inline-flex items-center gap-2 border border-line bg-panel px-2.5 py-1 text-xs text-muted; }",
    "  .field { @apply w-full border border-line bg-deep px-3 py-2 text-ink placeholder:text-muted/70 focus:border-amber focus:outline-none; }",
    "}",
  ].join("\n");

  if (document.documentElement.dataset.siteTheme !== "off") {
    var st = document.createElement("style");
    st.setAttribute("type", "text/tailwindcss");
    st.textContent = THEME;
    document.head.appendChild(st);
  }

  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null");
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  var USER_KEY = "focuspace.demo.user";

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function renderNav() {
    var host = document.getElementById("site-nav"); if (!host) return;
    var cur = document.body.dataset.page, user = store(USER_KEY);
    var links = PAGES.map(function (p) {
      var on = p.id === cur;
      return '<a href="' + p.href + '"' + (on ? ' aria-current="page"' : "") +
        ' class="block px-3 py-2 text-sm font-medium border-b-2 ' + (on ? "border-amber text-amber" : "border-transparent text-muted hover:text-ink") + '">' + p.label + "</a>";
    }).join("");
    host.className = "sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur";
    host.innerHTML =
      '<nav class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3" aria-label="Điều hướng chính">' +
        '<a href="index.html" class="flex items-center gap-2 font-logo text-[13px] text-ink" aria-label="FocuSpace — Trang chủ">' +
          '<i class="inline-block size-3 bg-amber shadow-[3px_3px_0_#7a4b1c]"></i>FocuSpace</a>' +
        '<div class="ml-auto hidden items-center sm:flex">' + links + "</div>" +
        '<span class="hidden chip lg:inline-flex" title="Trạng thái đăng nhập (giả lập trong prototype)">' +
          '<span class="size-1.5 ' + (user ? "bg-ok" : "bg-muted") + '"></span>' + (user ? esc(user.name) : "Khách") + "</span>" +
        '<button type="button" id="nav-toggle" class="btn ml-auto px-3 sm:hidden" aria-expanded="false" aria-controls="nav-menu" aria-label="Mở menu">' +
          '<svg viewBox="0 0 12 12" class="size-4" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true"><rect y="2" width="12" height="2"/><rect y="5" width="12" height="2"/><rect y="8" width="12" height="2"/></svg></button>' +
      "</nav>" +
      '<div id="nav-menu" class="hidden border-t border-line px-4 py-2 sm:hidden">' + links + "</div>";
    var btn = document.getElementById("nav-toggle"), menu = document.getElementById("nav-menu");
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer"); if (!host) return;
    host.className = "mt-16 border-t border-line";
    host.innerHTML =
      '<div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">' +
        "<p><span class=\"font-display text-ink\">FocuSpace</span> · Đồ án môn Web Design and Development (CSB25022) · VNUK · Học kỳ 1, năm học 2026–2027</p>" +
        '<p>GitHub: <a class="text-ink underline hover:text-amber" href="https://github.com/CaoLePhucThinh2203/FocuSpace" target="_blank" rel="noopener">CaoLePhucThinh2203/FocuSpace</a> · <a class="underline hover:text-amber" href="about.html#lien-he">Liên hệ</a></p>' +
      "</div>";
  }

  window.FS = {
    PAGES: PAGES,
    esc: esc,
    user: function (v) { return v === undefined ? store(USER_KEY) : store(USER_KEY, v); },
    /* Giả lập gọi API: prototype không có backend, trả dữ liệu sau một khoảng trễ để thấy trạng thái đang tải. */
    fakeFetch: function (fn, ms) { return new Promise(function (res) { setTimeout(function () { res(fn()); }, ms || 300); }); },
  };

  document.addEventListener("DOMContentLoaded", function () { renderNav(); renderFooter(); });
})();
