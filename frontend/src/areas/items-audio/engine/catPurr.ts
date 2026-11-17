/**
 * Tuấn Hưng · Mèo rù rù theo lượt (UC.03, FR-AUD-05, PRD v5.18).
 * Hàm thuần, không đụng DOM hay Web Audio — roomEngine.js (khối "Mèo rù rù theo lượt") gọi lại rồi tự áp âm lượng.
 * Bật mèo hoặc vào phòng thì rù rù ngay một lượt; sau đó im 3–5 phút rồi rù rù 10–15 giây, lặp lại; mỗi con một lịch riêng.
 */
export const PURR_ON_SEC = [10, 15] as const;    // một lượt rù rù (giây)
export const PURR_OFF_SEC = [180, 300] as const; // khoảng im giữa hai lượt (giây)
export const PURR_FADE_SEC = 2;                  // to dần đầu lượt, nhỏ dần cuối lượt (giây)

const pick = ([a, b]: readonly [number, number], rand: () => number) => a + rand() * (b - a);

/** Thời lượng một lượt rù rù, ngẫu nhiên trong 10–15 giây. */
export function purrOnSec(rand: () => number = Math.random): number {
  return pick(PURR_ON_SEC, rand);
}

/** Khoảng im trước lượt kế tiếp, ngẫu nhiên trong 3–5 phút. */
export function purrOffSec(rand: () => number = Math.random): number {
  return pick(PURR_OFF_SEC, rand);
}
