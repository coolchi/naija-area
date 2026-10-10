// Account download and account closing (NDPA data-subject rights), 10 Oct 2026.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { registerPlayerData, registeredNames } from '../server/core/account.js';
import * as auth from '../server/core/auth.js';

const mkReg = async (s, name = 'ada_test', password = 'secret-pass-1') => { const uid = await auth.signup(s.app, { username: name, password, age18: true }, 'ip'); return uid; };
const fill = async (s, u) => {
  await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { interestCity: 'kano', interests: ['music'] } });
  await ok(s, 'POST', '/api/office/idea', { uid: u, body: { category: 'gameplay', title: 'Okada race idea', description: 'A short okada race through the old lanes with a prize.', priority: 3 } });
  await ok(s, 'POST', '/api/office/apply', { uid: u, body: { role: 'tester', message: 'I would like to test the new districts every week.', contact: 'ada@example.com', contactOk: true } });
  at(s, u, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'hello lagos' } });
};

test('download: everything we hold, no password hash or ip hash, the ledger entries of the wallet, and a note for the reader', async () => {
  const s = makeServer(); const u = await mkReg(s); await fill(s, u);
  const d = await ok(s, 'GET', '/api/account/export', { uid: u }); assert.equal(d.format, 'naija-area-data-export'); assert.equal(d.account.username, 'ada_test'); assert.ok(d.wallet.ledger.length >= 1, 'starting money is listed'); assert.ok(d.wallet.accounts.some(a => a.kind === 'cash'));
  assert.equal(d.signupChoices.interestCity, 'kano'); assert.equal(d.office.ideas.length, 1); assert.equal(d.office.applications[0].contact, 'ada@example.com'); assert.equal(d.chatMessagesYouSent[0].text, 'hello lagos'); assert.ok(d.notifications.length >= 1);
  const raw = JSON.stringify(d); assert.ok(!/pass_hash|\$2[aby]\$|signup_ip_hash/.test(raw), 'no secrets'); assert.match(d.about, /one-way hash/);
  for (const k of ['wearables', 'home', 'cars', 'friends', 'phone', 'games', 'travel', 'payments', 'ageCheck', 'reportsYouFiled', 'adActivity']) assert.ok(k in d, k);
});
test('download is private to the player, limited to 5 an hour, and each player gets only their own rows', async () => {
  const s = makeServer(); const a = await mkReg(s, 'ada_a'), b = await mkReg(s, 'bola_b'); await fill(s, a);
  assert.equal((await call(s, 'GET', '/api/account/export')).status, 401); const mine = await ok(s, 'GET', '/api/account/export', { uid: b }); assert.equal(mine.office.ideas.length, 0); assert.equal(mine.chatMessagesYouSent.length, 0); assert.equal(mine.account.username, 'bola_b');
  for (let i = 0; i < 4; i++) await ok(s, 'GET', '/api/account/export', { uid: b }); assert.equal((await call(s, 'GET', '/api/account/export', { uid: b })).status, 429);
});
test('closing needs the word DELETE and the password; a wrong password changes nothing', async () => {
  const s = makeServer(); const u = await mkReg(s); const del = (body) => call(s, 'POST', '/api/account/delete', { uid: u, body });
  assert.equal((await del({ password: 'secret-pass-1' })).json.error, 'CONFIRM_NEEDED'); assert.equal((await del({ confirm: 'DELETE', password: 'wrong-pass-123' })).json.error, 'BAD_PASSWORD'); assert.equal((await del({ confirm: 'DELETE' })).json.error, 'BAD_PASSWORD');
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.username, 'ada_test'); assert.equal((await call(s, 'POST', '/api/account/delete', { body: { confirm: 'DELETE' } })).status, 401);
});
test('closing erases personal content, anonymises the user, forfeits the wallet, keeps the ledger whole, kills the session and the login', async () => {
  const s = makeServer(); const u = await mkReg(s); const other = await mkReg(s, 'bola_b'); await fill(s, u); await ok(s, 'POST', '/api/office/idea', { uid: other, body: { category: 'gameplay', title: 'Idea from another', description: 'A different idea that is long enough to be accepted.', priority: 2 } });
  const cash = balanceOf(s.app.db, cashId(u)); assert.ok(cash > 0);
  const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'delete', password: 'secret-pass-1' } }); assert.equal(r.forfeited, cash); assert.ok(r.kept.some(k => /ledger/.test(k)));
  const db = s.app.db; const row = db.prepare('SELECT username, pass_hash, signup_ip_hash FROM users WHERE id=?').get(u); assert.equal(row.username, `deleted_${u}`); assert.equal(row.pass_hash, null); assert.equal(row.signup_ip_hash, null);
  for (const [t, col] of [['notifications', 'user_id'], ['chat_messages', 'user_id'], ['signup_profiles', 'user_id'], ['applications', 'user_id'], ['office_ideas', 'user_id'], ['player_state', 'user_id'], ['wearables_owned', 'user_id']]) assert.equal(db.prepare(`SELECT COUNT(*) n FROM ${t} WHERE ${col}=?`).get(u).n, 0, t);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM office_ideas WHERE user_id=?').get(other).n, 1, 'other players untouched'); assert.equal(balanceOf(db, cashId(u)), 0); assert.equal(checkInvariants(db).ok, true, 'money book still balances');
  assert.ok(db.prepare('SELECT 1 FROM ledger_entries e JOIN accounts a ON a.id=e.account_id WHERE a.user_id=?').get(u), 'ledger history kept'); assert.equal(db.prepare('SELECT forfeited FROM account_deletions WHERE user_id=?').get(u).forfeited, cash); assert.ok(db.prepare("SELECT 1 FROM audit_log WHERE action='account_closed'").get());
  assert.equal((await call(s, 'GET', '/api/me', { uid: u })).status, 401, 'old session is dead'); assert.equal((await call(s, 'POST', '/api/auth/login', { body: { username: 'ada_test', password: 'secret-pass-1' } })).json.error, 'BAD_LOGIN'); assert.equal((await call(s, 'POST', '/api/auth/login', { body: { username: `deleted_${u}`, password: 'secret-pass-1' } })).json.error, 'BAD_LOGIN');
  assert.equal(s.app.world.players.has(u), false, 'gone from the world'); assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'ada_test', password: 'secret-pass-2', age18: true } })).status, 200, 'the old name is free again');
});
test('closing releases a bought home (sell-back rules apply), forfeits the wallet, keeps the book balanced; the session is dead afterwards', async () => {
  const s = makeServer(); const u = await mkReg(s); const p = s.app.city.properties.find(x => x.price > 0); move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(u), amount: 900000000, reason: 'test_topup', userId: u }); at(s, u, p.door.x, p.door.z);
  await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'own', idem: 'buy1' } }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM property_owner WHERE user_id=?').get(u).n, 1);
  const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'DELETE', password: 'secret-pass-1' } }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM property_owner WHERE user_id=?').get(u).n, 0, 'house is back on the market'); assert.ok(r.forfeited > 0); assert.equal(balanceOf(s.app.db, cashId(u)), 0); assert.equal(checkInvariants(s.app.db).ok, true);
  assert.equal((await call(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'DELETE', password: 'secret-pass-1' } })).status, 401, 'session dead after closing');
});
test('guests can close too (no password), bots cannot, and you cannot close while flying or in a venue', async () => {
  const s = makeServer(); const g = mkUser(s, { guest: true }); const b = mkUser(s, { bot: true });
  assert.equal((await ok(s, 'POST', '/api/account/delete', { uid: g, body: { confirm: 'DELETE' } })).ok, true); assert.equal((await call(s, 'POST', '/api/account/delete', { uid: b, body: { confirm: 'DELETE' } })).json.error, 'NO_BOTS');
  const u = await mkReg(s, 'musa_v'); const v = s.app.city.venueById.venue_office; at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); s.app.clock.advance(600000); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } });
  assert.equal((await call(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'DELETE', password: 'secret-pass-1' } })).json.error, 'INSIDE'); s.app.db.prepare("INSERT INTO flights(user_id,from_city,to_city,state,fare,departs_at,arrive_at,created_at) VALUES (?,?,?,?,?,?,?,?)").run(u, 'lagos-mainland', 'kano', 'flying', 0, 1, 2, 1);
  await ok(s, 'POST', '/api/venue/leave', { uid: u, body: {} }); assert.equal((await call(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'DELETE', password: 'secret-pass-1' } })).json.error, 'TRAVELLING');
});
test('modules can register their own player data so new games are never forgotten: it appears in the download and is erased on closing', async () => {
  const s = makeServer(); const u = await mkReg(s); s.app.db.exec('CREATE TABLE IF NOT EXISTS zz_demo (user_id INTEGER, note TEXT)'); s.app.db.prepare('INSERT INTO zz_demo VALUES (?,?)').run(u, 'secret move');
  registerPlayerData('zzDemo', (app, uid) => app.db.prepare('SELECT note FROM zz_demo WHERE user_id=?').all(uid), (app, uid) => app.db.prepare('DELETE FROM zz_demo WHERE user_id=?').run(uid), 'demo rows kept for 0 days'); assert.ok(registeredNames().includes('zzDemo'));
  assert.equal((await ok(s, 'GET', '/api/account/export', { uid: u })).zzDemo[0].note, 'secret move'); const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'DELETE', password: 'secret-pass-1' } }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM zz_demo').get().n, 0); assert.ok(r.kept.includes('demo rows kept for 0 days'));
  registerPlayerData('zzDemo', () => ({}), () => {}); registeredNames(); // leave the registry harmless for other tests in this process
});
