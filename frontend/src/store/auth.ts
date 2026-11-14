import { create } from "zustand";
import { api, json, refreshSession, setAccessToken, type Session, type User } from "../lib/api";

interface AuthState {
  user: User | null;
  ready: boolean; // đã thử khôi phục phiên khi mở app
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  rename: (displayName: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
}

/** Trạng thái đăng nhập (Zustand). Access token chỉ giữ trong bộ nhớ; refresh token nằm trong cookie httpOnly. */
export const useAuth = create<AuthState>((set) => ({
  user: null,
  ready: false,
  async init() {
    const s = await refreshSession();
    set({ user: s?.user ?? null, ready: true });
  },
  async login(email, password) {
    const s = await api<Session>("/auth/login", { method: "POST", body: json({ email, password }) });
    setAccessToken(s.accessToken);
    set({ user: s.user });
  },
  async register(email, password, displayName) {
    const s = await api<Session>("/auth/register", { method: "POST", body: json({ email, password, displayName }) });
    setAccessToken(s.accessToken);
    set({ user: s.user });
  },
  async logout() {
    await api("/auth/logout", { method: "POST" }).catch(() => undefined);
    setAccessToken(null);
    set({ user: null });
  },
  async rename(displayName) {
    const user = await api<User>("/me", { method: "PATCH", body: json({ displayName }) });
    set({ user });
  },
  async deleteAccount(password) {
    await api("/me", { method: "DELETE", body: json({ password }) });
    setAccessToken(null);
    set({ user: null });
  },
}));
