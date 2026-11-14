-- Ràng buộc CHECK theo docs/DATABASE.md (Prisma không khai báo được).
-- Cách dùng (một lần, sau migration init):
--   npx prisma migrate dev --create-only --name checks
--   chép nội dung file này vào prisma/migrations/<thời-gian>_checks/migration.sql
--   npx prisma migrate dev
ALTER TABLE "users" ADD CONSTRAINT "users_display_name_len" CHECK (char_length(display_name) BETWEEN 1 AND 40);
ALTER TABLE "users" ADD CONSTRAINT "users_email_len" CHECK (char_length(email) <= 254);
ALTER TABLE "room_states" ADD CONSTRAINT "room_states_data_size" CHECK (octet_length(data::text) <= 65536);
ALTER TABLE "room_states" ADD CONSTRAINT "room_states_revision_pos" CHECK (revision >= 1);
ALTER TABLE "usage_sessions" ADD CONSTRAINT "usage_sessions_counts" CHECK (interaction_count >= 0 AND (setup_ms IS NULL OR setup_ms >= 0));
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_mode" CHECK (mode IN ('focus','break'));
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_outcome" CHECK (outcome IN ('completed','reset','abandoned'));
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_planned" CHECK (planned_sec > 0);
ALTER TABLE "client_errors" ADD CONSTRAINT "client_errors_kind" CHECK (kind IN ('audio_context_create','audio_context_resume','storage_write'));
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_group" CHECK (item_group IN ('sound','decor','desk'));
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_size" CHECK (width > 0 AND height > 0);
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_vol" CHECK (default_vol IS NULL OR default_vol BETWEEN 0 AND 1);
CREATE UNIQUE INDEX "scenes_one_default" ON "scenes" (is_default) WHERE is_default;
