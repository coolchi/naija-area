-- 0028: hunger faint flag on player_state (SQLite already had this via schema.js add()).
ALTER TABLE player_state ADD COLUMN IF NOT EXISTS fainted INTEGER NOT NULL DEFAULT 0;
