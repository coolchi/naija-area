-- Body choice for the player rig. Existing rows stay male until they pick female in the cloth shop.
ALTER TABLE player_state ADD COLUMN IF NOT EXISTS gender TEXT NOT NULL DEFAULT 'male';
