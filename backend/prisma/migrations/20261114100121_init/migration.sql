-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" CITEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "display_name" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "last_login_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "family_id" UUID NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "revoked_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_states" (
    "user_id" UUID NOT NULL,
    "schema_ver" SMALLINT NOT NULL,
    "data" JSONB NOT NULL,
    "revision" INTEGER NOT NULL,
    "updated_from" VARCHAR(64) NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_states_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "usage_sessions" (
    "id" UUID NOT NULL,
    "client_id" VARCHAR(64) NOT NULL,
    "user_id" UUID,
    "started_at" TIMESTAMPTZ NOT NULL,
    "ended_at" TIMESTAMPTZ,
    "setup_ms" INTEGER,
    "interaction_count" INTEGER NOT NULL DEFAULT 0,
    "visited_study" BOOLEAN NOT NULL DEFAULT false,
    "visited_bed" BOOLEAN NOT NULL DEFAULT false,
    "visited_out" BOOLEAN NOT NULL DEFAULT false,
    "sleep_timer_set" BOOLEAN NOT NULL DEFAULT false,
    "sleep_timer_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usage_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pomodoro_sessions" (
    "id" UUID NOT NULL,
    "usage_session_id" UUID NOT NULL,
    "mode" VARCHAR(8) NOT NULL,
    "planned_sec" INTEGER NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL,
    "ended_at" TIMESTAMPTZ,
    "outcome" VARCHAR(12) NOT NULL,

    CONSTRAINT "pomodoro_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_errors" (
    "id" BIGSERIAL NOT NULL,
    "usage_session_id" UUID NOT NULL,
    "kind" VARCHAR(32) NOT NULL,
    "message" VARCHAR(500),
    "occurred_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "client_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_types" (
    "code" VARCHAR(16) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(80),
    "item_group" VARCHAR(8) NOT NULL,
    "width" SMALLINT NOT NULL,
    "height" SMALLINT NOT NULL,
    "in_study" BOOLEAN NOT NULL DEFAULT false,
    "in_bed" BOOLEAN NOT NULL DEFAULT false,
    "default_vol" REAL,
    "removable" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" SMALLINT NOT NULL,

    CONSTRAINT "item_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "scenes" (
    "code" VARCHAR(16) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(80) NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" SMALLINT NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");

-- CreateIndex
CREATE INDEX "usage_sessions_user_id_started_at_idx" ON "usage_sessions"("user_id", "started_at");

-- CreateIndex
CREATE INDEX "pomodoro_sessions_usage_session_id_idx" ON "pomodoro_sessions"("usage_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_errors_usage_session_id_kind_occurred_at_key" ON "client_errors"("usage_session_id", "kind", "occurred_at");

-- CreateIndex
CREATE UNIQUE INDEX "item_types_sort_order_key" ON "item_types"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "scenes_sort_order_key" ON "scenes"("sort_order");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_states" ADD CONSTRAINT "room_states_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_sessions" ADD CONSTRAINT "usage_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_usage_session_id_fkey" FOREIGN KEY ("usage_session_id") REFERENCES "usage_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_errors" ADD CONSTRAINT "client_errors_usage_session_id_fkey" FOREIGN KEY ("usage_session_id") REFERENCES "usage_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
