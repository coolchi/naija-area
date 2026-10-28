-- 0032: daily treasures (100 cash chests ₦1M..₦10M + one free Cybertruck per Lagos day). One row per chest id, so the first INSERT wins.
CREATE TABLE IF NOT EXISTS daily_treasure_claims (
  treasure_id TEXT PRIMARY KEY,
  day BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  kind TEXT NOT NULL,
  prize TEXT NOT NULL,
  amount BIGINT NOT NULL DEFAULT 0,
  car_id BIGINT,
  city_id TEXT NOT NULL,
  x DOUBLE PRECISION NOT NULL,
  z DOUBLE PRECISION NOT NULL,
  claimed_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_daily_treasure_claims_day ON daily_treasure_claims(day, user_id);
