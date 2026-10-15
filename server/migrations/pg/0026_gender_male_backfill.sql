-- 0026: one-time — assign every existing account Man. Woman only via new signup.
CREATE TABLE IF NOT EXISTS app_meta (k TEXT PRIMARY KEY, v TEXT NOT NULL);
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM app_meta WHERE k = 'gender_all_male_v1') THEN
    UPDATE player_state SET gender = 'male';
    DELETE FROM skins_equipped WHERE skin_id = 'av_casual_woman';
    INSERT INTO app_meta(k, v) VALUES ('gender_all_male_v1', '1');
  END IF;
END $$;
