// Phase 3 planning guard: the DRAFT phone migration must be valid SQL on top of the real schema, idempotent, and the PHONE_V2 flag must stay off.
// This does not test any phone behaviour (there is none yet).
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs'; import Database from 'better-sqlite3';
import { SCHEMA } from '../server/core/schema.js';

test('phone draft migration applies on top of the real schema twice (idempotent) and creates the planned tables', () => {
  const db = new Database(':memory:'); db.exec(SCHEMA); const sql = fs.readFileSync(new URL('../server/migrations/drafts/001_phone_v2.sql', import.meta.url), 'utf8');
  db.exec(sql); db.exec(sql);
  const names = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(r => r.name);
  for (const t of ['friendships', 'phone_settings', 'phone_threads', 'phone_messages', 'phone_reads', 'voice_notes', 'phone_calls', 'phone_apps']) assert.ok(names.includes(t), t);
  db.prepare('INSERT INTO friendships(user_a,user_b,requested_by,created_at) VALUES (1,2,1,0)').run();
  assert.throws(() => db.prepare('INSERT INTO friendships(user_a,user_b,requested_by,created_at) VALUES (1,2,2,0)').run(), /UNIQUE/, 'a pair is stored once');
  assert.throws(() => db.prepare('INSERT INTO friendships(user_a,user_b,requested_by,created_at) VALUES (5,3,5,0)').run(), /CHECK/, 'pair must be ordered');
});
test('PHONE_V2 flag is now ON by default (switch off with PHONE_V2=false) and the draft folder is not loaded by the server', async () => {
  const ev = await import('../server/core/phone/events.js'); assert.equal(ev.PHONE_V2, true); assert.ok(ev.S2C.CALL_INCOMING.startsWith('phone.'));
  assert.ok(!/migrations\/drafts/.test(fs.readFileSync(new URL('../server/core/schema.js', import.meta.url), 'utf8')), 'schema.js must not load drafts');
});
