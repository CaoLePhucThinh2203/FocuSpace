/** Gọi API backend (docs/API.md). Tự làm mới access token một lần khi gặp 401. */
const BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

export interface User { id: string; email: string; displayName: string; createdAt: string }
export interface Session { accessToken: string; expiresIn: number; user: User }
export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public body?: unknown) { super(message); }
}

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => { accessToken = t; };
export const hasAccessToken = () => !!accessToken;

async function raw<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  let res: Response;
  try {
    res = await fetch(BASE + path, { ...init, headers, credentials: "include" });
  } catch {
    throw new ApiError(0, "NETWORK", "Không kết nối được máy chủ.");
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, body?.error?.code ?? "ERROR", body?.error?.message ?? "Có lỗi xảy ra.", body);
  return body as T;
}

let refreshing: Promise<Session | null> | null = null;
export function refreshSession(): Promise<Session | null> {
  refreshing ??= raw<Session>("/auth/refresh", { method: "POST" })
    .then((s) => { setAccessToken(s.accessToken); return s; })
    .catch(() => { setAccessToken(null); return null; })
    .finally(() => { refreshing = null; });
  return refreshing;
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  try {
    return await raw<T>(path, init);
  } catch (e) {
    if (e instanceof ApiError && e.code === "UNAUTHENTICATED" && accessToken !== null) {
      if (await refreshSession()) return raw<T>(path, init);
    }
    throw e;
  }
}

export const json = (body: unknown) => JSON.stringify(body);
