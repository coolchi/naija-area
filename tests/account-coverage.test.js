// Every table added after the baseline (later-schema.js, from BOTH tracks) that holds a player id must be covered by the account download and closing, or be on the short, reasoned "kept" list.
// This is a net for the future: a new table with a user_id column fails here until someone decides what happens to it.
import test from 'node:test'; import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import { makeServer, ok, HOUR } from './helpers.js';
import { LATER } from '../server/core/later-schema.js';
import { checkInvariants, move, cashId, SYS } from '../server/core/ledger.js';
import { registeredNames } from '../server/core/account.js';
import * as auth from '../server/core/auth.js';

// tables with a user_id that are NOT erased when the account closes, and why
const KEPT = {
  account_deletions: 'the record that the account was closed (needed to keep the ledger explainable)',
  sanctions: 'moderator warnings, mutes and bans are kept to stop repeat abuse (docs/MODERATION.md); they are in the download'
};
const lite = new Database(':memory:'); for (const c of LATER) lite.exec(c.sql);
const tables = lite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(r => r.name);
const info = (t) => lite.prepare(`PRAGMA table_info(${t})`).all();
const personal = tables.filter(t => info(t).some(c => c.name === 'user_id'));

test('every later-schema table with a user_id is either erased with the account or on the kept list (so nothing new is forgotten)', async () => {
  assert.ok(personal.length >= 25, 'found the tables: ' + personal.length);
  const s = makeServer(); const u = await auth.signup(s.app, { username: 'cover_ada', password: 'secret-pass-1', age18: true }, 'ip'); s.db.prepare('UPDATE users SET created_at=? WHERE id=?').run(s.app.clock.now() - 3 * HOUR, u);
  move(s.app, { from: SYS.FAUCET_START, to: cashId(u), amount: 1000, reason: 'test', ref: 't', userId: u, idemKey: 'cov' + u });
  const seeded = []; const val = (c, t) => /user_id|leader_id|seller_id/.test(c.name) ? u : /INT/i.test(c.type) ? 1 : /REAL/i.test(c.type) ? 0 : 'x';
  for (const t of personal) {
    if (KEPT[t]) continue; const all = info(t); const pks = all.filter(c => c.pk > 0); const rowid = pks.length === 1 && /INTEGER/i.test(pks[0].type) && pks[0].name !== 'user_id';
    const uniq = all.filter(c => c.name === 'user_id' || (c.pk > 0 && !(rowid && c.name === pks[0].name)) || (c.notnull && c.dflt_value == null && !(rowid && c.name === pks[0].name))); const names = uniq.map(c => c.name);
    try { s.db.prepare(`INSERT INTO ${t}(${names.join(',')}) VALUES (${names.map(() => '?').join(',')})`).run(...uniq.map(c => val(c, t))); seeded.push(t); } catch (e) { assert.fail(`could not seed ${t}: ${e.message}`); }
  }
  assert.ok(seeded.length >= 20, 'seeded ' + seeded.length);
  const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'delete', password: 'secret-pass-1' } }); assert.ok(r.ok !== false);
  const left = seeded.filter(t => s.db.prepare(`SELECT COUNT(*) n FROM ${t} WHERE user_id=?`).get(u).n > 0); assert.deepEqual(left, [], 'these tables still hold the closed player: ' + left.join(', '));
  assert.equal(checkInvariants(s.db).ok, true);
});
test('the kept list is short and every entry still exists; the data modules of both tracks are registered by name', () => {
  for (const t of Object.keys(KEPT)) assert.ok(tables.includes(t), t + ' is a real table'); assert.ok(Object.keys(KEPT).length <= 8);
  for (const n of ['businesses', 'marketplace', 'clubs', 'events', 'skinsAndBattlePass', 'seasons', 'guardian', 'moderation', 'tableGamesAndWordGames']) assert.ok(registeredNames().includes(n), n + ' is registered');
});

test('the download also lists what each later table holds about the player (a marker written into every text column of every personal table must show up in the export)', async () => {
  const s = makeServer(); const u = await auth.signup(s.app, { username: 'dl_ada', password: 'secret-pass-1', age18: true }, 'ip');
  const marked = []; const val = (c, t) => /user_id|leader_id|seller_id/.test(c.name) ? u : /INT/i.test(c.type) ? 1 : /REAL/i.test(c.type) ? 0 : 'MK_' + t;
  s.db.prepare("INSERT INTO clubs(id, name, name_key, tag, color, leader_id, created_at) VALUES (1,'MK club','mkclub','MK','#fff',?,1)").run(u);   // the club listing joins to a real club
  const NOT_LISTED = { account_deletions: 'the closure record itself (kept, not personal content)', tutorial_state: 'only internal step ticks; the download lists whether it was done, skipped and the reward' };
  for (const t of personal) {
    if (NOT_LISTED[t]) continue;
    const all = info(t); const pks = all.filter(c => c.pk > 0); const rowid = pks.length === 1 && /INTEGER/i.test(pks[0].type) && pks[0].name !== 'user_id';
    const uniq = all.filter(c => c.name === 'user_id' || (c.pk > 0 && !(rowid && c.name === pks[0].name)) || (c.notnull && c.dflt_value == null && !(rowid && c.name === pks[0].name)) || (/TEXT/i.test(c.type) && !(rowid && c.name === pks[0].name)));
    if (!uniq.some(c => /TEXT/i.test(c.type))) continue;   // nothing to mark in an all-number table
    const names = uniq.map(c => c.name);
    try { s.db.prepare(`INSERT INTO ${t}(${names.join(',')}) VALUES (${names.map(() => '?').join(',')})`).run(...uniq.map(c => c.name === 'user_id' ? u : (/TEXT/i.test(c.type) ? 'MK_' + t : val(c, t)))); marked.push(t); } catch (e) { assert.fail(`could not seed ${t}: ${e.message}`); }
  }
  assert.ok(marked.length >= 15, 'marked ' + marked.length);
  const json = JSON.stringify((await import('../server/core/account.js')).exportData(s.app, u));
  const missing = marked.filter(t => !json.includes('MK_' + t));
  assert.deepEqual(missing, [], 'these tables are not in the account download: ' + missing.join(', '));
});
