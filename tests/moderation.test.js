// Moderator dashboard back end (queue batch 1 item 6): look-up, warn/mute/ban, lift, ban enforcement, audit log, report-driven mutes in the history.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { MOD } from '../server/config/moderation.js';
import { activeBan } from '../server/core/moderation.js';
import { chatMuted } from '../server/core/safety.js';

const adm = (s, m, p, body, query) => call(s, m, p, { admin: true, body, query });
const sanction = (s, who, kind, extra = {}) => adm(s, 'POST', '/api/admin/mod/sanction', { who, kind, reason: 'abusive', ...extra });
const nameOf = (s, u) => s.app.db.prepare('SELECT username FROM users WHERE id=?').get(u).username;

test('player directory: online and active filters, and players cannot read it', async () => {
  const s = makeServer(); const a = mkUser(s, { ageMs: 600000 }); const b = mkUser(s); at(s, a, 3, 3); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} });
  const all = await ok(s, 'GET', '/api/admin/players', { admin: true }); assert.ok(all.rows.some(r => r.id === a && r.cash != null && r.city)); assert.ok(all.counts.players >= 2); assert.ok(all.counts.online >= 1);
  const on = await ok(s, 'GET', '/api/admin/players?scope=online', { admin: true }); assert.ok(on.rows.some(r => r.id === a)); assert.equal(on.rows.some(r => r.id === b), false);
  assert.equal((await call(s, 'GET', '/api/admin/players', { uid: a })).status, 401);
});
test('all moderator endpoints need the admin login', async () => {
  const s = makeServer(); for (const [m, p] of [['GET', '/api/admin/mod/overview'], ['GET', '/api/admin/mod/player?q=x'], ['POST', '/api/admin/mod/sanction'], ['POST', '/api/admin/mod/lift'], ['GET', '/api/admin/mod/sanctions'], ['GET', '/api/admin/mod/audit'], ['GET', '/api/admin/mod/options']]) assert.equal((await call(s, m, p, { uid: mkUser(s) })).status, 401, p);
});
test('warn: recorded, the player is told, it counts as a strike, it cannot be lifted, and it lands in the audit log', async () => {
  const s = makeServer(); const u = mkUser(s); const r = (await sanction(s, nameOf(s, u), 'warn', { note: 'Please keep it friendly' })).json; assert.equal(r.kind, 'warn');
  assert.match(s.app.db.prepare("SELECT text FROM notifications WHERE user_id=? AND kind='safety'").get(u).text, /keep it friendly/); const l = (await adm(s, 'GET', '/api/admin/mod/player', null, { q: nameOf(s, u) })).json; assert.equal(l.strikes, 1); assert.equal(l.history.length, 1); assert.equal((await adm(s, 'POST', '/api/admin/mod/lift', { id: r.id })).json.error, 'NOT_LIFTABLE');
  const a = (await adm(s, 'GET', '/api/admin/mod/audit', null, { action: 'sanction_' })).json; assert.ok(a.rows.some(x => x.action === 'sanction_warn' && x.detail.includes('abusive')));
});
test('mute: chat is blocked by the existing chat guard, lasts the given hours, can be lifted early, and a longer second mute is kept when one is lifted', async () => {
  const s = makeServer(); const u = mkUser(s, { ageMs: 600000 }); at(s, u, 3, 3); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'before' } });
  const m1 = (await sanction(s, nameOf(s, u), 'mute', { hours: 2 })).json; assert.equal(chatMuted(s.app, u), true); s.app.clock.advance(10000); assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'during' } })).json.error, 'CHAT_PAUSED');
  const m2 = (await sanction(s, nameOf(s, u), 'mute', { hours: 10 })).json; await adm(s, 'POST', '/api/admin/mod/lift', { id: m1.id }); assert.equal(chatMuted(s.app, u), true, 'the 10-hour mute is still on'); await adm(s, 'POST', '/api/admin/mod/lift', { id: m2.id }); assert.equal(chatMuted(s.app, u), false); s.app.clock.advance(10000); await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'after' } });
  assert.equal((await sanction(s, nameOf(s, u), 'mute', { hours: MOD.maxMuteHours + 1 })).json.error, 'BAD_LENGTH'); assert.equal((await adm(s, 'POST', '/api/admin/mod/lift', { id: m1.id })).json.error, 'ALREADY_LIFTED');
  s.app.clock.advance(3 * 3600000); assert.equal((await adm(s, 'GET', '/api/admin/mod/sanctions')).json.rows.length, 0, 'expired or lifted mutes leave the active list');
});
test('ban: every request is refused with the reason except logout and the player\'s own data; timed bans expire; lifting works at once; the player leaves the map', async () => {
  const s = makeServer(); const u = mkUser(s, { ageMs: 600000 }); at(s, u, 3, 3); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); assert.ok(s.app.world.players.has(u));
  const b = (await sanction(s, nameOf(s, u), 'ban', { hours: 48, reason: 'cheating', note: 'duplicating' })).json; assert.equal(s.app.world.players.has(u), false);
  for (const [m, p] of [['GET', '/api/me'], ['POST', '/api/heartbeat'], ['POST', '/api/chat'], ['GET', '/api/missions']]) { const r = await call(s, m, p, { uid: u, body: { text: 'x' } }); assert.equal(r.status, 403, p); assert.equal(r.json.error, 'BANNED'); assert.match(r.json.message, /suspended.*cheating/i); }
  assert.equal((await call(s, 'GET', '/api/account/export', { uid: u })).status, 200); assert.equal((await call(s, 'POST', '/api/auth/logout', { uid: u })).status, 200);
  s.app.clock.advance(49 * 3600000); assert.equal(activeBan(s.app, u), null); assert.equal((await call(s, 'GET', '/api/me', { uid: u })).status, 200, 'timed ban over');
  const p = (await sanction(s, nameOf(s, u), 'ban')).json; assert.equal(p.until, null); s.app.clock.advance(400 * 86400000); assert.equal(activeBan(s.app, u) !== null, true, 'permanent'); await adm(s, 'POST', '/api/admin/mod/lift', { id: p.id }); assert.equal((await call(s, 'GET', '/api/me', { uid: u })).status, 200, 'lifting is immediate even with the cache');
  void b;
});
test('validation: bots cannot be sanctioned, unknown players and bad reasons are refused, lookup by id or @name', async () => {
  const s = makeServer(); const bot = mkUser(s, { bot: true }); const u = mkUser(s); assert.equal((await sanction(s, nameOf(s, bot), 'warn')).json.error, 'BOT'); assert.equal((await sanction(s, 'nobody_here', 'warn')).json.error, 'NO_PLAYER'); assert.equal((await sanction(s, nameOf(s, u), 'warn', { reason: 'rude' })).json.error, 'BAD_REASON'); assert.equal((await sanction(s, nameOf(s, u), 'kick')).json.error, 'BAD_KIND');
  assert.equal((await adm(s, 'GET', '/api/admin/mod/player', null, { q: String(u) })).json.user.id, u); assert.equal((await adm(s, 'GET', '/api/admin/mod/player', null, { q: '@' + nameOf(s, u) })).json.user.id, u); assert.equal((await sanction(s, nameOf(s, u), 'ban', { hours: 'abc' })).json.error, 'BAD_LENGTH');
});
test('lookup shows strikes, suggests a ban at three, lists reports and chat; the overview counts what is open', async () => {
  const s = makeServer(); const u = mkUser(s, { ageMs: 600000 }); const rep = mkUser(s, { ageMs: 600000 }); at(s, u, 3, 3); at(s, rep, 4, 3); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/heartbeat', { uid: rep, body: {} }); await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'rude words' } });
  const msg = s.app.db.prepare('SELECT id FROM chat_messages WHERE user_id=?').get(u); await ok(s, 'POST', '/api/report', { uid: rep, body: { kind: 'chat', target: String(msg.id), reason: 'abusive' } });
  let o = (await adm(s, 'GET', '/api/admin/mod/overview')).json; assert.equal(o.openReports, 1); const l0 = (await adm(s, 'GET', '/api/admin/mod/player', null, { q: nameOf(s, u) })).json; assert.equal(l0.reportsAgainst.length, 1); assert.equal(l0.recentChat[0].text, 'rude words'); assert.equal(l0.suggestBan, false);
  for (let i = 0; i < 3; i++) await sanction(s, nameOf(s, u), 'warn'); const l1 = (await adm(s, 'GET', '/api/admin/mod/player', null, { q: nameOf(s, u) })).json; assert.equal(l1.strikes, 3); assert.equal(l1.suggestBan, true); o = (await adm(s, 'GET', '/api/admin/mod/overview')).json; assert.equal(o.warnings7d, 3);
  s.app.clock.advance((MOD.strikeWindowDays + 1) * 86400000); assert.equal((await adm(s, 'GET', '/api/admin/mod/player', null, { q: nameOf(s, u) })).json.strikes, 0, 'old strikes age out');
});
test('report actions that mute (remove_and_mute) and the automatic mute after several reports now show in the sanction history', async () => {
  const s = makeServer(); const u = mkUser(s, { ageMs: 600000 }); const r1 = mkUser(s, { ageMs: 600000 }); at(s, u, 3, 3); at(s, r1, 4, 3); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'bad words' } });
  const id = s.app.db.prepare('SELECT id FROM chat_messages WHERE user_id=?').get(u).id; await ok(s, 'POST', '/api/report', { uid: r1, body: { kind: 'chat', target: String(id), reason: 'abusive' } }); const res = await adm(s, 'POST', '/api/admin/reports/resolve', { kind: 'chat', target: String(id), action: 'remove_and_mute', note: 'x' }); assert.equal(res.status, 200);
  const l = (await adm(s, 'GET', '/api/admin/mod/player', null, { q: nameOf(s, u) })).json; assert.ok(l.history.some(h => h.kind === 'mute' && h.actor === 'admin' && h.reportRef === `chat:${id}`), JSON.stringify(l.history));
});
test('audit log: filters by action, actor and text, pages with before, lists the filter choices; a closed account keeps its sanction record but it is in the data download', async () => {
  const s = makeServer(); const u = mkUser(s); await sanction(s, nameOf(s, u), 'warn', { note: 'needle' }); await sanction(s, nameOf(s, u), 'mute', { hours: 1 });
  const a = (await adm(s, 'GET', '/api/admin/mod/audit', null, { q: 'needle' })).json; assert.equal(a.rows.length, 1); assert.ok(a.actions.includes('sanction_mute')); assert.ok(a.actors.includes('admin')); assert.equal((await adm(s, 'GET', '/api/admin/mod/audit', null, { actor: 'nobody' })).json.rows.length, 0);
  const all = (await adm(s, 'GET', '/api/admin/mod/audit')).json.rows; const older = (await adm(s, 'GET', '/api/admin/mod/audit', null, { before: all[0].id })).json.rows; assert.ok(older.every(r => r.id < all[0].id));
  const ex = (await call(s, 'GET', '/api/account/export', { uid: u })).json; assert.equal(ex.moderation.length, 2);
});
