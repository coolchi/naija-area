-- 0030: password reset (login page "Forgot password?" and admin reset). SQLite gets the same through schema.js migrate().
ALTER TABLE users ADD COLUMN IF NOT EXISTS pass_changed_at BIGINT NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS must_change_pw INTEGER NOT NULL DEFAULT 0;
CREATE TABLE IF NOT EXISTS password_resets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  via TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  used_at BIGINT
);
CREATE INDEX IF NOT EXISTS ix_password_resets_user ON password_resets(user_id, used_at);
