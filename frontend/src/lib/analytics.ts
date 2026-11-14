/**
 * Điểm gọi GA4 dùng chung. Base chỉ phát sự kiện; khu vực garden (Nhiên) đăng ký nơi nhận
 * bằng registerAnalytics(). Chưa đăng ký thì các hàm này không làm gì.
 */
export interface AnalyticsSink {
  track(event: string, params?: Record<string, string | number>): void;
  trackPage(path: string, title: string): void;
}
let sink: AnalyticsSink | null = null;
export const registerAnalytics = (s: AnalyticsSink) => { sink = s; };
export const track = (event: string, params: Record<string, string | number> = {}) => sink?.track(event, params);
export const trackPage = (path: string, title: string) => sink?.trackPage(path, title);
