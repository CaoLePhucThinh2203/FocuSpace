import * as Sentry from "@sentry/react";

/** GA4 + Sentry (PRD Tính năng M). Chỉ bật khi có mã trong biến môi trường; không gửi dữ liệu cá nhân (BR-13). */
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;

declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function initObservability() {
  if (SENTRY_DSN) Sentry.init({ dsn: SENTRY_DSN, sendDefaultPii: false, environment: import.meta.env.MODE });
  if (GA_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
  }
}

export function trackPage(path: string, title: string) {
  window.gtag?.("event", "page_view", { page_path: path, page_title: title });
}

/** Sự kiện GA4: room_switch, item_add, scene_change, pomodoro_start, pomodoro_complete, sleep_timer_set, sign_up, login. */
export function track(event: string, params: Record<string, string | number> = {}) {
  window.gtag?.("event", event, params);
}