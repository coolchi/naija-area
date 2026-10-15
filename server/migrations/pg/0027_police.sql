-- 0027: Police Station — case reports, evidence from fights, holding cells and bail.
CREATE TABLE IF NOT EXISTS police_evidence (
  id BIGSERIAL PRIMARY KEY,
  attacker_id BIGINT NOT NULL,
  victim_id BIGINT NOT NULL,
  kind TEXT NOT NULL,
  amount BIGINT NOT NULL DEFAULT 0,
  created_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_police_evidence_pair ON police_evidence(attacker_id, victim_id, expires_at);

CREATE TABLE IF NOT EXISTS police_cases (
  id BIGSERIAL PRIMARY KEY,
  reporter_id BIGINT NOT NULL,
  accused_id BIGINT NOT NULL,
  reason TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  evidence_id BIGINT,
  created_at BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'logged'
);
CREATE INDEX IF NOT EXISTS ix_police_cases_reporter ON police_cases(reporter_id, id);
CREATE INDEX IF NOT EXISTS ix_police_cases_accused ON police_cases(accused_id, id);

CREATE TABLE IF NOT EXISTS police_holds (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  reason TEXT NOT NULL,
  charge BIGINT NOT NULL DEFAULT 0,
  reporter_id BIGINT,
  status TEXT NOT NULL DEFAULT 'held',
  held_at BIGINT NOT NULL,
  until_at BIGINT NOT NULL,
  auto BIGINT NOT NULL DEFAULT 0,
  released_at BIGINT,
  released_by BIGINT,
  release_how TEXT
);
CREATE INDEX IF NOT EXISTS ix_police_holds_user ON police_holds(user_id, status, until_at);
CREATE INDEX IF NOT EXISTS ix_police_holds_active ON police_holds(status, until_at);
