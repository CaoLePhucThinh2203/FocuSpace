import { describe, it } from "vitest";

describe("Khung cảnh và telemetry (N8, N9)", () => {
  it.todo("GET /catalog/scenes trả 5 khung cảnh, đúng 1 mặc định (AC-07.3)");
  it.todo("POST /telemetry/batch trả 202");
  it.todo("gửi trùng lô không nhân đôi dòng");
  it.todo("lô > 256 KB trả 413");
  it.todo("quá 60 lô/giờ/clientId trả 429");
  it.todo("có access token thì gắn user_id");
});