// Age-check tables. PRIVACY BY DESIGN: only the outcome and the date are kept. No date of birth, name, ID number, document or face data ever reaches these tables.
export const AGE_SQL = `
CREATE TABLE IF NOT EXISTS age_verifications (     -- one row per player: the latest standing outcome
  user_id INTEGER PRIMARY KEY,
  result TEXT NOT NULL,                            -- pass | fail
  verified_at INTEGER NOT NULL,
  provider TEXT NOT NULL                           -- which service attested it (no vendor chosen yet: 'mock' today)
);
CREATE TABLE IF NOT EXISTS age_sessions (          -- a check in progress or recently finished; the vendor's own opaque id, nothing about the person
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL, session_ref TEXT NOT NULL UNIQUE, provider TEXT NOT NULL,
  state TEXT NOT NULL,                             -- pending | pass | fail | inconclusive | expired
  created_at INTEGER NOT NULL, done_at INTEGER
);
CREATE INDEX IF NOT EXISTS ix_age_sess_user ON age_sessions(user_id, created_at);
`;
