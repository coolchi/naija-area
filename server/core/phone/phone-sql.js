// GENERATED from server/migrations/drafts/001_phone_v2.sql (kept as a string so the browser demo bundle can run it too). Idempotent.
export const PHONE_SQL = `-- DRAFT migration for the phone system (phase 3, PHONE_V2). NOT applied automatically: nothing in the server reads this folder.
-- Spec: /workspace/game_project/15_phone_system_spec.md section 6. Written for SQLite today and kept Postgres-friendly (no SQLite-only types except
-- INTEGER PRIMARY KEY AUTOINCREMENT, which becomes GENERATED ... AS IDENTITY on Postgres). Idempotent: every statement is IF NOT EXISTS.
-- To try it on a COPY of a database:  sqlite3 copy.db < server/migrations/drafts/001_phone_v2.sql   (tests/phone-draft.test.js does this in memory)

-- ---- friends. One row per pair, user_a < user_b so a pair can never be stored twice. requested_by says who sent it.
CREATE TABLE IF NOT EXISTS friendships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_a INTEGER NOT NULL, user_b INTEGER NOT NULL, requested_by INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',          -- pending | accepted | declined | removed
  created_at INTEGER NOT NULL, responded_at INTEGER,
  CHECK (user_a < user_b), CHECK (requested_by IN (user_a, user_b)),
  UNIQUE (user_a, user_b)
);
CREATE INDEX IF NOT EXISTS ix_friend_a ON friendships(user_a, status);
CREATE INDEX IF NOT EXISTS ix_friend_b ON friendships(user_b, status);

-- ---- per-player phone settings (one row, created lazily)
CREATE TABLE IF NOT EXISTS phone_settings (
  user_id INTEGER PRIMARY KEY,
  dnd INTEGER NOT NULL DEFAULT 0,                  -- do not disturb: calls go straight to "missed", messages are silent
  calls_from TEXT NOT NULL DEFAULT 'friends',      -- friends | nobody
  messages_from TEXT NOT NULL DEFAULT 'friends',   -- friends | anyone (anyone = today's behaviour for plain DMs)
  voice_notes_from TEXT NOT NULL DEFAULT 'friends',-- friends | nobody
  show_presence INTEGER NOT NULL DEFAULT 1,        -- friends can see online/at-home dot
  ringtone TEXT NOT NULL DEFAULT 'default',
  voice_consent_at INTEGER,                        -- when the player accepted the microphone/voice notice (see spec 9.1)
  updated_at INTEGER NOT NULL DEFAULT 0
);

-- ---- 1:1 chats. Today's DMs are notifications only (no history); phone chats keep history. pair ordered like friendships.
CREATE TABLE IF NOT EXISTS phone_threads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_a INTEGER NOT NULL, user_b INTEGER NOT NULL,
  created_at INTEGER NOT NULL, last_message_id INTEGER, last_message_at INTEGER,
  CHECK (user_a < user_b), UNIQUE (user_a, user_b)
);
CREATE TABLE IF NOT EXISTS phone_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id INTEGER NOT NULL, sender_id INTEGER NOT NULL,
  kind TEXT NOT NULL,                              -- text | voice | system (e.g. "Missed call")
  body TEXT,                                       -- text content (already through filter.screen) or system text
  voice_id INTEGER,                                -- -> voice_notes.id when kind='voice'
  created_at INTEGER NOT NULL, deleted_at INTEGER  -- soft delete (sender delete, moderation removal)
);
CREATE INDEX IF NOT EXISTS ix_pmsg_thread ON phone_messages(thread_id, id);
CREATE TABLE IF NOT EXISTS phone_reads (           -- read cursor per user per thread (unread badges)
  thread_id INTEGER NOT NULL, user_id INTEGER NOT NULL, last_read_message_id INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (thread_id, user_id)
);

-- ---- voice notes. The audio bytes live OUTSIDE the main database (disk or object storage); this row is the index + safety state.
CREATE TABLE IF NOT EXISTS voice_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL, thread_id INTEGER NOT NULL,
  mime TEXT NOT NULL,                              -- audio/webm;codecs=opus | audio/mp4 | audio/ogg;codecs=opus (allow-list, spec 7.3)
  bytes INTEGER NOT NULL, duration_ms INTEGER NOT NULL,
  storage_key TEXT NOT NULL UNIQUE,                -- path or object key, never user-supplied
  sha256 TEXT NOT NULL,
  waveform TEXT,                                   -- optional: ~48 small ints as JSON, for the bubble
  status TEXT NOT NULL DEFAULT 'ready',            -- ready | removed (moderation) | expired (retention)
  created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, removed_at INTEGER, removed_reason TEXT
);
CREATE INDEX IF NOT EXISTS ix_vn_owner ON voice_notes(owner_id, created_at);
CREATE INDEX IF NOT EXISTS ix_vn_expiry ON voice_notes(status, expires_at);

-- ---- call log. Metadata ONLY. Call audio is never stored (spec 9.2).
CREATE TABLE IF NOT EXISTS phone_calls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caller_id INTEGER NOT NULL, callee_id INTEGER NOT NULL,
  state TEXT NOT NULL,                             -- ringing | active | ended   (terminal detail in end_reason)
  end_reason TEXT,                                 -- completed | declined | missed | cancelled | busy | dnd | blocked | failed | timeout
  created_at INTEGER NOT NULL, answered_at INTEGER, ended_at INTEGER, duration_s INTEGER,
  ice_path TEXT                                    -- host | srflx | relay (from getStats at the end; tells us how often TURN is needed). nullable
);
CREATE INDEX IF NOT EXISTS ix_calls_caller ON phone_calls(caller_id, id);
CREATE INDEX IF NOT EXISTS ix_calls_callee ON phone_calls(callee_id, id);
CREATE INDEX IF NOT EXISTS ix_calls_open ON phone_calls(state);

-- ---- sponsored phone apps (06_ad_revenue_model.md surface #4). Max 8 live at once is a business rule, enforced in code not SQL.
CREATE TABLE IF NOT EXISTS phone_apps (
  id TEXT PRIMARY KEY,                             -- e.g. 'wallet', 'jobs', or a sponsor slug
  kind TEXT NOT NULL,                              -- builtin | sponsored
  title TEXT NOT NULL, icon TEXT NOT NULL,         -- emoji or creative id
  target_url TEXT,                                 -- sponsored: tap goes through /api/go for counting
  campaign_id INTEGER,                             -- -> ad_campaigns.id (moderation + billing reuse)
  starts_at INTEGER, ends_at INTEGER, enabled INTEGER NOT NULL DEFAULT 1
);

-- Safety reuse (no schema change): reports.kind is free text, so 'voice_note' and 'call' reports use the existing reports table; the allow-list
-- REPORT_KINDS in server/core/safety.js is where they get enabled. user_blocks and the limiter are reused as they are.
`;
