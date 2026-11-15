import { defineConfig } from "vitest/config";

/** Integration test dùng chung một PostgreSQL tạm (test/setup/globalSetup.ts) nên chạy từng file một. */
export default defineConfig({
  test: {
    globalSetup: ["test/setup/globalSetup.ts"],
    fileParallelism: false,
    testTimeout: 20_000,
    hookTimeout: 120_000,
  },
});
