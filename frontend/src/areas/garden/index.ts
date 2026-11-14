import type { AreaModule } from "../../lib/areas";
import { registerAnalytics } from "../../lib/analytics";
import { initObservability, track, trackPage } from "./observability";

/** Cắm khu vực Sân vườn (Đình Nhiên) vào base: bật GA4 + Sentry và nhận sự kiện track/trackPage từ các trang. */
export const area: AreaModule = {
  name: "garden",
  setup() {
    initObservability();
    registerAnalytics({ track, trackPage });
  },
};