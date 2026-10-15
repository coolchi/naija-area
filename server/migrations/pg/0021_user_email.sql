-- Sign-up email (unique when set). Existing rows stay NULL.
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS ux_users_email ON users (email) WHERE email IS NOT NULL AND email <> '';
