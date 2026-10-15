-- 0029: crash wreck flags on owned cars (SQLite already had these via schema.js add()).
ALTER TABLE player_cars ADD COLUMN IF NOT EXISTS wrecked INTEGER NOT NULL DEFAULT 0;
ALTER TABLE player_cars ADD COLUMN IF NOT EXISTS wreck_x DOUBLE PRECISION;
ALTER TABLE player_cars ADD COLUMN IF NOT EXISTS wreck_z DOUBLE PRECISION;
ALTER TABLE player_cars ADD COLUMN IF NOT EXISTS wreck_ry DOUBLE PRECISION;
