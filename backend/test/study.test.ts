import { describe, it } from "vitest";

describe("/room-state (T12)", () => {
  it.todo("chưa có phòng trả 404");
  it.todo("PUT baseRevision 0 tạo revision 1");
  it.todo("PUT baseRevision cũ trả 409 kèm current (AC-09.2)");
  it.todo("force = true ghi đè");
  it.todo("data > 64 KB trả 413");
  it.todo("đồ sai phòng trả 400");
});
