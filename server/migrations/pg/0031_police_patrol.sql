-- 0031: police patrol missions (duty desk, shared suspects, ₦1M per completed mission). SQLite gets the same through later-schema.js.
CREATE TABLE IF NOT EXISTS police_patrols (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  city_id TEXT NOT NULL,
  station_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  started_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  ended_at BIGINT,
  arrests BIGINT NOT NULL DEFAULT 0,
  needed BIGINT NOT NULL,
  ammo BIGINT NOT NULL DEFAULT 0,
  paid BIGINT NOT NULL DEFAULT 0,
  day BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_police_patrols_user ON police_patrols(user_id, status, ended_at);
CREATE TABLE IF NOT EXISTS police_suspects (
  id BIGSERIAL PRIMARY KEY,
  city_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  road_id TEXT NOT NULL,
  s0 DOUBLE PRECISION NOT NULL,
  speed DOUBLE PRECISION NOT NULL,
  hp BIGINT NOT NULL,
  armed BIGINT NOT NULL DEFAULT 0,
  spawned_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  caught_by BIGINT,
  caught_at BIGINT,
  caught_how TEXT
);
CREATE INDEX IF NOT EXISTS ix_police_suspects_live ON police_suspects(city_id, caught_by, expires_at);
