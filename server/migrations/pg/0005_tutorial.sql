-- 0005: first-five-minutes tutorial progress. Mirrors later-schema.js (n: 5).
CREATE TABLE IF NOT EXISTS tutorial_state (user_id BIGINT PRIMARY KEY, start_x DOUBLE PRECISION NOT NULL, start_z DOUBLE PRECISION NOT NULL, acks TEXT NOT NULL DEFAULT '[]', skipped BIGINT NOT NULL DEFAULT 0, done_at BIGINT, reward BIGINT NOT NULL DEFAULT 0, created_at BIGINT NOT NULL);
