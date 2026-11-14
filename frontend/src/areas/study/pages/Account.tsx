import { useState, type FormEvent } from "react";
import { ApiError } from "../../../lib/api";
import { track } from "../../garden/observability";
import { useTitle } from "../../../lib/useTitle";
import { useAuth } from "../../../store/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field(props: { label: string; type?: string; value: string; onChange: (v: string) => void; error?: string; autoComplete?: string }) {
  const id = props.label.replace(/\s/g, "-");
  return (
    <label htmlFor={id} className="grid gap-1">
      <span className="text-xs text-muted">{props.label}</span>
      <input id={id} className="field" type={props.type ?? "text"} value={props.value} autoComplete={props.autoComplete}
        aria-invalid={!!props.error} aria-describedby={props.error ? id + "-err" : undefined}
        onChange={(e) => props.onChange(e.target.value)} />
      {props.error && <span id={id + "-err"} className="text-xs text-danger">{props.error}</span>}
    </label>
  );
}

/** Tài khoản: đăng nhập/đăng ký (UC.08), đổi tên, đăng xuất, xóa tài khoản (UC.11). */
export default function Account() {
  useTitle("Tài khoản — FocuSpace", "Đăng nhập hoặc đăng ký tài khoản FocuSpace để đồng bộ căn phòng giữa các thiết bị và xem thống kê.");
  const { user, ready } = useAuth();
  if (!ready) return <main className="mx-auto max-w-md px-4 py-10" aria-busy="true" />;
  return <main className="mx-auto max-w-md px-4 py-10">{user ? <Profile /> : <AuthForm />}</main>;
}

function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [busy, setBusy] = useState(false);
  const errs = {
    email: email && !EMAIL_RE.test(email) ? "Email không đúng định dạng." : "",
    password: password && password.length < 8 ? "Mật khẩu cần ít nhất 8 ký tự." : "",
    name: mode === "register" && name.length > 40 ? "Tên hiển thị tối đa 40 ký tự." : "",
  };
  const valid = EMAIL_RE.test(email) && password.length >= 8 && (mode === "login" || (name.trim().length >= 1 && name.length <= 40));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setBusy(true); setServerErr("");
    try {
      if (mode === "login") { await login(email, password); track("login"); }
      else { await register(email, password, name.trim()); track("sign_up"); }
    } catch (err) {
      setServerErr(err instanceof ApiError ? err.message : "Có lỗi xảy ra.");
    } finally { setBusy(false); }
  }

  return (
    <section className="card grid gap-6 p-6">
      <div className="flex gap-2" role="tablist">
        {(["login", "register"] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} className={`btn flex-1 ${mode === m ? "btn-primary" : ""}`}
            onClick={() => { setMode(m); setServerErr(""); }}>
            {m === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>
        ))}
      </div>
      <form className="grid gap-4" onSubmit={submit} noValidate>
        <h1 className="font-display text-2xl font-bold">{mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</h1>
        <Field label="Email" type="email" value={email} onChange={setEmail} error={errs.email} autoComplete="email" />
        <Field label="Mật khẩu" type="password" value={password} onChange={setPassword} error={errs.password}
          autoComplete={mode === "login" ? "current-password" : "new-password"} />
        {mode === "register" && <Field label="Tên hiển thị" value={name} onChange={setName} error={errs.name} autoComplete="nickname" />}
        {serverErr && <p role="alert" className="text-sm text-danger">{serverErr}</p>}
        <button className="btn btn-primary" disabled={!valid || busy}>{busy ? "Đang xử lý…" : mode === "login" ? "Đăng nhập" : "Đăng ký"}</button>
        <p className="text-xs text-muted">Không cần tài khoản để dùng Căn phòng. Đăng nhập để đồng bộ phòng giữa các thiết bị và xem thống kê.</p>
      </form>
    </section>
  );
}

function Profile() {
  const { user, rename, logout, deleteAccount } = useAuth();
  const [name, setName] = useState(user!.displayName);
  const [msg, setMsg] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const [pw, setPw] = useState("");
  const [delErr, setDelErr] = useState("");

  async function saveName(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    if (!n || n.length > 40) { setNameErr(n ? "Tên hiển thị tối đa 40 ký tự." : "Tên hiển thị không được để trống."); return; }
    setNameErr("");
    try { await rename(n); setMsg("Đã lưu tên mới."); } catch (err) { setNameErr(err instanceof ApiError ? err.message : "Có lỗi xảy ra."); }
  }
  async function doDelete(e: FormEvent) {
    e.preventDefault();
    try { await deleteAccount(pw); } catch (err) { setDelErr(err instanceof ApiError ? err.message : "Có lỗi xảy ra."); }
  }

  return (
    <section className="grid gap-6">
      <h1 className="font-display text-2xl font-bold">Tài khoản</h1>
      <div className="card grid gap-1 p-4">
        <p className="text-xs text-muted">Email</p><p>{user!.email}</p>
        <p className="mt-2 text-xs text-muted">Ngày tạo</p><p>{new Date(user!.createdAt).toLocaleDateString("vi-VN")}</p>
      </div>
      <form className="card grid gap-3 p-4" onSubmit={saveName}>
        <Field label="Tên hiển thị" value={name} onChange={(v) => { setName(v); setMsg(""); }} error={nameErr} />
        {msg && <p className="text-xs text-ok">{msg}</p>}
        <button className="btn btn-primary w-fit">Lưu</button>
      </form>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn" onClick={() => void logout()}>Đăng xuất</button>
        <button type="button" className="btn btn-danger" onClick={() => setConfirmDel(true)}>Xóa tài khoản</button>
      </div>
      {confirmDel && (
        <div role="dialog" aria-modal="true" aria-labelledby="del-title" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <form className="card grid w-full max-w-sm gap-4 p-6" onSubmit={doDelete}>
            <h2 id="del-title" className="font-display text-xl font-bold text-danger">Xóa tài khoản?</h2>
            <p className="text-muted">Tài khoản và căn phòng lưu trên máy chủ sẽ bị xóa vĩnh viễn. Phòng trên máy này vẫn giữ.</p>
            <Field label="Nhập mật khẩu để xác nhận" type="password" value={pw} onChange={setPw} error={delErr} autoComplete="current-password" />
            <div className="flex justify-end gap-2">
              <button type="button" className="btn" onClick={() => { setConfirmDel(false); setPw(""); setDelErr(""); }}>Hủy</button>
              <button className="btn btn-danger" disabled={!pw}>Xóa vĩnh viễn</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
