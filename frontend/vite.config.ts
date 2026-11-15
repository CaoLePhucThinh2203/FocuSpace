import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** H12 — Tuấn Hưng: nhúng CSS chính vào index.html khi build để không còn yêu cầu chặn hiển thị (Lighthouse). */
function inlineMainCss(): Plugin {
  return {
    name: "inline-main-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = bundle["index.html"];
      if (!html || html.type !== "asset") return;
      let src = String(html.source);
      for (const [file, out] of Object.entries(bundle)) {
        if (out.type !== "asset" || !file.endsWith(".css")) continue;
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${file}"[^>]*>`);
        if (tag.test(src)) src = src.replace(tag, () => `<style>${out.source}</style>`);
      }
      html.source = src;
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineMainCss()],
  server: { port: 5173, proxy: { "/api": "http://localhost:3000" } },
  build: { sourcemap: true },
});