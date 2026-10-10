-- 0007: earned achievements and the title a player chose to show. Mirrors later-schema.js (n: 7).
CREATE TABLE IF NOT EXISTS achievements (user_id BIGINT NOT NULL, id TEXT NOT NULL, earned_at BIGINT NOT NULL, PRIMARY KEY (user_id, id));
CREATE TABLE IF NOT EXISTS player_titles (user_id BIGINT PRIMARY KEY, title_id TEXT NOT NULL DEFAULT '', updated_at BIGINT NOT NULL);
