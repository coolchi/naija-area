// Safety and family controls (queue batch 1 item 7). The server enforces every one of these; the client only shows them.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, HOUR } from './helpers.js';
import { GUARDIAN } from '../server/config/guardian.js';
import { PAYMENTS } from '../server/config/payments.js';
import { inCurfew, lagosHour } from '../server/core/guardian.js';
import { dayKey } from '../server/core/rewards.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';

const nameOf = (s, u) => s.db.prepare('SELECT username FROM users WHERE id=?').get(u).username;
const set = (s, u, body) => call(s, 'POST', '/api/guardian', { uid: u, body });
const setOk = (s, u, body) => ok(s, 'POST', '/api/guardian', { uid: u, body });
const beat = (s, u, body = {}) => call(s, 'POST', '/api/heartbeat', { uid: u, body });
const adult = (s, o = {}) => mkUser(s, { ageMs: 10 * 60000, cash: 5000, ...o });
const befriend = async (s, a, b) => { await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: nameOf(s, b) } }); const inc = (await ok(s, 'GET', '/api/phone/friends', { uid: b })); const id = (inc.incoming || inc.requests || [])[0]?.id; await ok(s, 'POST', '/api/phone/friends/respond', { uid: b, body: { id, accept: true } }); };
const failAge = (s, u) => s.db.prepare("INSERT INTO age_verifications(user_id,result,verified_at,provider) VALUES (?,?,?,?)").run(u, 'fail', s.app.clock.now(), 'mock');
const sleepToLagosHour = (s, h) => { const now = s.app.clock.now(); const cur = lagosHour(now); s.app.clock.advance(((h - cur + 24) % 24) * HOUR + 1000); };

test('config: option lists are sane and restricted mode is strict', () => {
  assert.ok(GUARDIAN.playLimitOptions.every(n => n > 0) && GUARDIAN.breakOptions.every(n => n > 0) && GUARDIAN.topupDailyOptionsNgn.includes(0));
  assert.deepEqual([GUARDIAN.restricted.maxStake, GUARDIAN.restricted.topupDailyNgn, GUARDIAN.restricted.transfersOff, GUARDIAN.restricted.chat], [0, 0, true, 'friends']);
  assert.equal(inCurfew({ start: 22, end: 6 }, 23), true); assert.equal(inCurfew({ start: 22, end: 6 }, 5), true); assert.equal(inCurfew({ start: 22, end: 6 }, 6), false); assert.equal(inCurfew({ start: 9, end: 17 }, 12), true); assert.equal(inCurfew({ start: 9, end: 17 }, 17), false); assert.equal(inCurfew(null, 3), false);
  assert.equal(lagosHour(Date.UTC(2026, 9, 10, 23, 30)), 0, 'Lagos is UTC+1');
});
test('settings: defaults, validation, clearing, needs a login, bots and guests', async () => {
  const s = makeServer(); const u = adult(s); assert.equal((await call(s, 'GET', '/api/guardian')).status, 401);
  const v = await ok(s, 'GET', '/api/guardian', { uid: u }); assert.deepEqual([v.enabled, v.saved.chat, v.saved.maxStake, v.saved.playLimitMin, v.saved.curfew, v.hasPin, v.restricted], [true, 'all', null, null, null, false, false]); assert.deepEqual(v.options.stakeOptions, s.app.balance.games.stakes);
  const r = await setOk(s, u, { chat: 'friends', maxStake: 100, transfersOff: true, topupDailyNgn: 2000, playLimitMin: 60, curfew: { start: 22, end: 6 }, breakEveryMin: 30 }); assert.deepEqual([r.saved.chat, r.saved.maxStake, r.saved.transfersOff, r.saved.topupDailyNgn, r.saved.playLimitMin, r.saved.breakEveryMin], ['friends', 100, true, 2000, 60, 30]); assert.deepEqual(r.saved.curfew, { start: 22, end: 6 });
  for (const bad of [{ chat: 'loud' }, { maxStake: 250 }, { topupDailyNgn: 7 }, { playLimitMin: 5 }, { breakEveryMin: 3 }, { curfew: { start: 5, end: 5 } }, { curfew: { start: 1, end: 24 } }, { curfew: { start: 4, end: 23 } }, { curfew: {} }]) assert.equal((await set(s, u, bad)).json.error, 'BAD_VALUE', JSON.stringify(bad));
  assert.equal((await ok(s, 'GET', '/api/guardian', { uid: u })).saved.chat, 'friends', 'a refused change changes nothing');
  const c = await setOk(s, u, { maxStake: null, playLimitMin: null, curfew: null, topupDailyNgn: null, transfersOff: false, chat: 'all', breakEveryMin: null }); assert.deepEqual([c.saved.maxStake, c.saved.playLimitMin, c.saved.curfew, c.saved.topupDailyNgn, c.saved.transfersOff, c.saved.chat], [null, null, null, null, false, 'all']);
  const bot = mkUser(s, { bot: true }); assert.equal((await ok(s, 'GET', '/api/guardian', { uid: bot })).enabled, false); assert.equal((await set(s, bot, { chat: 'off' })).json.error, 'OFF');
  const g = mkUser(s, { guest: true }); assert.equal((await setOk(s, g, { chat: 'off' })).saved.chat, 'off', 'a guest may limit themselves');
});
test('chat modes: off blocks every way of talking and hides public chat; friends allows only friends; the other side is protected too', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s), c = adult(s); for (const u of [a, b, c]) { at(s, u, 5, 5); await beat(s, u); } await befriend(s, a, b);
  const say = (u, t) => call(s, 'POST', '/api/chat', { uid: u, body: { text: t } });
  assert.equal((await say(a, 'hello all')).status, 200); s.app.clock.advance(5000);
  await setOk(s, a, { chat: 'friends' }); assert.equal((await say(a, 'second hello')).json.error, 'CHAT_FRIENDS');
  assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: nameOf(s, c), text: 'hi stranger' } })).json.error, 'CHAT_FRIENDS'); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: nameOf(s, b), text: 'hi friend' } })).status, 200);
  assert.equal((await call(s, 'POST', '/api/phone/messages', { uid: a, body: { to: nameOf(s, b), text: 'phone hi' } })).status, 200, 'a friend may be messaged in friends mode');
  // public chat from others: a "friends" player only sees friends' lines
  s.app.clock.advance(5000); await say(b, 'from my friend'); await say(c, 'from a stranger'); const seen = (await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { chatSince: 0 } })).chat.map(m => m.t); assert.ok(seen.includes('from my friend') && !seen.includes('from a stranger'), JSON.stringify(seen));
  const seenC = (await ok(s, 'POST', '/api/heartbeat', { uid: c, body: { chatSince: 0 } })).chat.map(m => m.t); assert.ok(seenC.includes('from a stranger') && seenC.includes('from my friend'), 'other players see everything as normal');
  // the receiving side: a stranger's message to a "friends" player is quietly not delivered, and a "chat off" player is not reachable at all
  const before = s.db.prepare("SELECT COUNT(*) n FROM notifications WHERE user_id=? AND kind='dm'").get(a).n; assert.equal((await call(s, 'POST', '/api/dm', { uid: c, body: { to: nameOf(s, a), text: 'ping' } })).status, 200); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM notifications WHERE user_id=? AND kind='dm'").get(a).n, before, 'not delivered');
  await setOk(s, a, { chat: 'off' }); assert.equal((await say(a, 'x')).json.error, 'CHAT_OFF'); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: nameOf(s, b), text: 'x' } })).json.error, 'CHAT_OFF');
  assert.equal((await call(s, 'POST', '/api/phone/messages', { uid: a, body: { to: nameOf(s, b), text: 'x' } })).json.error, 'CHAT_OFF'); assert.equal((await call(s, 'POST', '/api/phone/messages', { uid: b, body: { to: nameOf(s, a), text: 'to a' } })).json.error, 'CANNOT_MESSAGE', 'a friend cannot message someone whose chat is off');
  assert.equal((await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { chatSince: 0 } })).chat.length, 0, 'public chat is hidden');
});
test('stakes: a limit refuses bigger stakes, 0 means friendly games only, joining someone else\'s staked table is checked too, and nothing moves in the ledger when refused', async () => {
  const s = makeServer(); const a = adult(s), b = adult(s), c = adult(s), d = adult(s); const V = s.app.city.venues.find(v => v.id === 'venue_joint');
  for (const u of [a, b, c, d]) { at(s, u, V.x, V.z); await beat(s, u); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: V.id } }); }
  const sit = (u, stake, st) => call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: V.id, stationId: st, stake } }); const cash = (u) => balanceOf(s.db, cashId(u));
  await setOk(s, a, { maxStake: 0 }); const c0 = cash(a); assert.equal((await sit(a, 100, 'football1')).json.error, 'STAKE_LIMIT'); assert.equal(cash(a), c0, 'nothing was taken'); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM game_matches').get().n, 0);
  const f = await sit(a, 0, 'football1'); assert.equal(f.status, 200); assert.equal(f.json.stake, 0, 'a friendly game is fine');
  await setOk(s, b, { maxStake: 100 }); assert.equal((await sit(b, 500, 'ludo1')).json.error, 'STAKE_LIMIT'); const w = await sit(b, 100, 'ludo1'); assert.equal(w.status, 200); assert.equal(w.json.stake, 100); assert.equal(cash(b), 4900);
  // c joins b's waiting table: the stake is b's (100). c allows only 0, so the join is refused; d has no limit and joins
  await setOk(s, c, { maxStake: 0 }); const cj = await sit(c, 0, 'ludo1'); assert.equal(cj.json.error, 'STAKE_LIMIT'); assert.equal(cash(c), 5000); assert.equal((await sit(d, 0, 'ludo1')).status, 200); assert.equal(cash(d), 4900, 'd paid the stake of the table it joined');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('transfers off blocks sending money; receiving is still fine', async () => {
  const s = makeServer({}); s.app.balance.transfer.minAccountAgeMs = 0; const a = adult(s), b = adult(s); await setOk(s, a, { transfersOff: true });
  const t = await call(s, 'POST', '/api/transfer', { uid: a, body: { to: nameOf(s, b), amount: 100, idem: 'g1' } }); assert.equal(t.json.error, 'TRANSFERS_OFF'); assert.equal(balanceOf(s.db, cashId(a)), 5000);
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: b, body: { to: nameOf(s, a), amount: 100, idem: 'g2' } })).status, 200, 'the other player can still send to a'); assert.equal(balanceOf(s.db, cashId(a)), 5100);
  await setOk(s, a, { transfersOff: false }); assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: nameOf(s, b), amount: 100, idem: 'g3' } })).status, 200);
});
test('own buying limit: 0 blocks real-money purchases, a daily limit counts what was already bought (with VAT), and clearing it reopens buying', async () => {
  const s = makeServer({ paymentsConfig: { ...PAYMENTS } }); const u = adult(s); const buy = (pack) => call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack, email: 'b@example.com' } });
  assert.equal((await buy('p1000')).status, 200, 'works with no setting'); const n0 = s.db.prepare('SELECT COUNT(*) n FROM payment_intents').get().n;
  await setOk(s, u, { topupDailyNgn: 0 }); assert.equal((await buy('p1000')).json.error, 'SPEND_OFF'); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM payment_intents').get().n, n0, 'refused before anything was opened');
  await setOk(s, u, { topupDailyNgn: 2000 }); assert.equal((await buy('p5000')).json.error, 'SPEND_LIMIT'); assert.equal((await buy('p1000')).json.error, 'SPEND_LIMIT', 'the first pack (₦1,075 with VAT) already used most of the day');
  s.db.prepare("UPDATE payment_intents SET status='failed' WHERE user_id=?").run(u); assert.equal((await buy('p1000')).status, 200, 'a failed payment does not count, so ₦1,075 fits ₦2,000 again'); assert.equal((await buy('p1000')).json.error, 'SPEND_LIMIT', 'a second one does not');
  await setOk(s, u, { topupDailyNgn: null }); const last = await buy('p1000'); assert.ok(!/^SPEND/.test(last.json.error || ''), 'no limit of our own any more (the shop\'s own open-payments rule may still answer)');
});
test('play limit: the server counts heartbeat time, then closes the game for the day (BREAK_TIME) but never blocks your own data, logout or the settings; midnight Lagos time reopens it', async () => {
  const s = makeServer(); const u = adult(s); at(s, u, 5, 5); await beat(s, u); await setOk(s, u, { playLimitMin: 30 });
  assert.equal((await ok(s, 'GET', '/api/guardian', { uid: u })).today.leftMin, 30);
  for (let i = 0; i < 20; i++) { s.app.clock.advance(30000); assert.equal((await beat(s, u)).status, 200); } // 10 minutes in 30 s beats
  const hb = (await beat(s, u)).json; assert.ok(hb.gd && hb.gd.left <= 20 && hb.gd.left >= 19, JSON.stringify(hb.gd));
  s.app.clock.advance(3 * 3600000); await beat(s, u); // a long gap (closed tab) counts for at most one beat
  assert.ok((await ok(s, 'GET', '/api/guardian', { uid: u })).today.playedMin <= 12);
  for (let i = 0; i < 45; i++) { s.app.clock.advance(30000); const r = await beat(s, u); if (r.status !== 200) { assert.equal(r.json.error, 'BREAK_TIME'); assert.equal(r.status, 403); break; } }
  const blocked = await beat(s, u); assert.equal(blocked.json.error, 'BREAK_TIME'); assert.equal(blocked.json.why, 'limit'); assert.ok(blocked.json.until > s.app.clock.now());
  assert.equal((await call(s, 'GET', '/api/jobs', { uid: u })).json.error, 'BREAK_TIME'); assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'hi' } })).json.error, 'BREAK_TIME');
  for (const p of ['/api/me', '/api/guardian', '/api/config', '/api/account/export']) assert.equal((await call(s, 'GET', p, { uid: u })).status, 200, p); assert.equal((await call(s, 'POST', '/api/auth/logout', { uid: u })).status, 200);
  assert.equal((await setOk(s, u, { playLimitMin: 60 })).saved.playLimitMin, 60, 'the player can raise it (no PIN set)'); assert.equal((await beat(s, u)).status, 200, 'raising the limit reopens today');
  await setOk(s, u, { playLimitMin: 30 }); assert.equal((await beat(s, u)).json.error, 'BREAK_TIME'); s.app.clock.advance(Math.max(0, blocked.json.until - s.app.clock.now()) + 1000); assert.equal((await beat(s, u)).status, 200, 'a new Lagos day');
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM guardian_play WHERE user_id=?').get(u).n >= 1, true);
});
test('quiet hours (Lagos time): closed inside the window, open outside, wraps past midnight, and the heartbeat says how long until they start', async () => {
  const s = makeServer(); const u = adult(s); at(s, u, 5, 5); await beat(s, u); sleepToLagosHour(s, 20); await setOk(s, u, { curfew: { start: 22, end: 6 } });
  assert.equal((await beat(s, u)).status, 200); const gd = (await beat(s, u)).json.gd; assert.ok(gd.curfewIn > 60 && gd.curfewIn <= 120, JSON.stringify(gd));
  s.app.clock.advance(2 * HOUR); const r = await beat(s, u); assert.equal(r.json.error, 'BREAK_TIME'); assert.equal(r.json.why, 'curfew'); assert.match(r.json.message, /22:00 to 06:00/); assert.ok(r.json.until - s.app.clock.now() > 7 * HOUR - 10000 && r.json.until - s.app.clock.now() <= 8 * HOUR + 1000);
  s.app.clock.advance(8 * HOUR + 2000); assert.equal((await beat(s, u)).status, 200, 'open again at 06:00');
});
test('PIN: while set, every change needs it; wrong tries lock it; clearing needs it; an admin can reset a forgotten PIN; the PIN is stored hashed', async () => {
  const s = makeServer(); const u = adult(s); await setOk(s, u, { maxStake: 100 });
  assert.equal((await call(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'set', pin: '12' } })).json.error, 'BAD_PIN_FORMAT'); assert.equal((await call(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'set', pin: 'abcd' } })).json.error, 'BAD_PIN_FORMAT');
  const v = (await ok(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'set', pin: '4821' } })); assert.equal(v.hasPin, true); assert.ok(!JSON.stringify(v).includes('4821')); const row = s.db.prepare('SELECT pin_hash FROM guardian_settings WHERE user_id=?').get(u); assert.ok(row.pin_hash && !row.pin_hash.includes('4821') && row.pin_hash.startsWith('$2'));
  assert.equal((await set(s, u, { maxStake: 500 })).json.error, 'PIN_REQUIRED'); assert.equal((await set(s, u, { maxStake: 500, pin: '0000' })).json.error, 'BAD_PIN'); assert.equal((await ok(s, 'GET', '/api/guardian', { uid: u })).saved.maxStake, 100);
  assert.equal((await setOk(s, u, { maxStake: 500, pin: '4821' })).saved.maxStake, 500); assert.equal((await call(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'clear', current: '1111' } })).json.error, 'BAD_PIN');
  for (let i = 0; i < GUARDIAN.pin.maxFails; i++) await set(s, u, { chat: 'off', pin: '9999' }); const lk = await set(s, u, { chat: 'off', pin: '4821' }); assert.equal(lk.json.error, 'PIN_LOCKED', 'even the right PIN is refused while locked'); assert.equal((await ok(s, 'GET', '/api/guardian', { uid: u })).saved.chat, 'all');
  s.app.clock.advance(GUARDIAN.pin.lockMs + 1000); assert.equal((await setOk(s, u, { chat: 'off', pin: '4821' })).saved.chat, 'off');
  assert.equal((await call(s, 'POST', '/api/admin/guardian/reset-pin', { body: { who: nameOf(s, u) } })).status, 401); const ar = await ok(s, 'POST', '/api/admin/guardian/reset-pin', { admin: true, body: { who: nameOf(s, u) } }); assert.equal(ar.hadPin, true);
  const after = await ok(s, 'GET', '/api/guardian', { uid: u }); assert.deepEqual([after.hasPin, after.saved.chat, after.saved.maxStake], [false, 'off', 500], 'the limits stay, only the PIN goes'); assert.ok(s.db.prepare("SELECT 1 FROM audit_log WHERE action='guardian_pin_reset'").get());
  await ok(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'set', pin: '777777' } }); assert.equal((await ok(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'clear', current: '777777' } })).hasPin, false);
});
test('restricted mode: an account that FAILED the age check is limited by the server whatever it saved, cannot loosen it, and cannot enter clubs', async () => {
  const s = makeServer(); const u = adult(s), f = adult(s); failAge(s, u); at(s, u, 5, 5); await beat(s, u); at(s, f, 5, 5); await beat(s, f);
  const v = await ok(s, 'GET', '/api/guardian', { uid: u }); assert.equal(v.restricted, true); assert.deepEqual([v.effective.chat, v.effective.maxStake, v.effective.transfersOff, v.effective.topupDailyNgn], ['friends', 0, true, 0]); assert.match(v.note, /restricted mode/);
  await setOk(s, u, { chat: 'all', maxStake: null, transfersOff: false, topupDailyNgn: null }); const v2 = await ok(s, 'GET', '/api/guardian', { uid: u }); assert.deepEqual([v2.saved.chat, v2.effective.chat, v2.effective.maxStake, v2.effective.transfersOff], ['all', 'friends', 0, true], 'saving "all" changes nothing for them');
  assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'hello' } })).json.error, 'CHAT_FRIENDS'); s.app.balance.transfer.minAccountAgeMs = 0; assert.equal((await call(s, 'POST', '/api/transfer', { uid: u, body: { to: nameOf(s, f), amount: 100, idem: 'r1' } })).json.error, 'TRANSFERS_OFF');
  const V = s.app.city.venues.find(x => x.id === 'venue_joint'); at(s, u, V.x, V.z); await beat(s, u); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: V.id } }); assert.equal((await call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: V.id, stationId: 'football1', stake: 100 } })).json.error, 'STAKE_LIMIT');
  const club = s.app.city.venues.find(x => x.kind === 'club');
  const clubVenue = s.app.all.venueById[club.id]; at(s, u, clubVenue.x, clubVenue.z); await beat(s, u); const e1 = await call(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: club.id } }); assert.equal(e1.json.error, 'VENUE_RESTRICTED'); at(s, f, clubVenue.x, clubVenue.z); await beat(s, f); assert.equal((await call(s, 'POST', '/api/venue/enter', { uid: f, body: { venueId: club.id } })).status, 200, 'a normal account walks in');
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: 'b@example.com' } })).json.error, 'AGE_BLOCKED', 'the age check already refuses buying; our own limit is the second wall');
  assert.equal((await ok(s, 'GET', '/api/guardian', { uid: f })).restricted, false, 'a player without a recorded fail is unaffected');
});
test('optional: stakes from a threshold need a RECORDED age pass (off by default)', async () => {
  const s = makeServer(); const u = adult(s); const old = GUARDIAN.stakeNeedsAgePassFrom; try { assert.equal(old, null); GUARDIAN.stakeNeedsAgePassFrom = 500;
    const { assertStake } = await import('../server/core/guardian.js'); assertStake(s.app, u, 100); assert.throws(() => assertStake(s.app, u, 500), (e) => e.code === 'AGE_CHECK_REQUIRED');
    s.db.prepare("INSERT INTO age_verifications(user_id,result,verified_at,provider) VALUES (?,?,?,?)").run(u, 'pass', 1, 'mock'); assertStake(s.app, u, 500); } finally { GUARDIAN.stakeNeedsAgePassFrom = old; }
});
test('data: settings and play time are in the download (the PIN only as "set"), and closing the account erases them', async () => {
  const s = makeServer({}); const u = adult(s); at(s, u, 5, 5); await beat(s, u); await setOk(s, u, { playLimitMin: 60, chat: 'friends' }); await ok(s, 'POST', '/api/guardian/pin', { uid: u, body: { action: 'set', pin: '2468' } }); s.app.clock.advance(20000); await beat(s, u);
  const dl = await ok(s, 'GET', '/api/account/export', { uid: u }); assert.equal(dl.guardian.settings.playLimitMin, 60); assert.ok(dl.guardian.playTime.length >= 1); const txt = JSON.stringify(dl); assert.ok(txt.includes('"pinSet":true') && !txt.includes('2468') && !/\$2[aby]\$/.test(txt));
  const { registeredNames } = await import('../server/core/account.js'); assert.ok(registeredNames().includes('guardian'), 'registered with the closing routine');
  const { deleteMine } = await import('../server/core/guardian.js'); deleteMine(s.app, u); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM guardian_settings WHERE user_id=?').get(u).n + s.db.prepare('SELECT COUNT(*) n FROM guardian_play WHERE user_id=?').get(u).n, 0);
});
test('cost: players with no settings write nothing and the dispatch guard is cheap', async () => {
  const s = makeServer(); const u = adult(s); at(s, u, 5, 5); await beat(s, u); for (let i = 0; i < 5; i++) { s.app.clock.advance(20000); await beat(s, u); } assert.equal(s.db.prepare('SELECT COUNT(*) n FROM guardian_play').get().n, 0); assert.equal((await beat(s, u)).json.gd, undefined, 'no gd block unless a limit is set');
  assert.equal(dayKey(0), 0);
});
test('client watcher: warns at 10 and 1 minute left, once each; reminds about breaks; quiet-hours warning; the time-up screen goes when the server lets the player back in', async () => {
  const { GuardianWatch } = await import('../client/src/guardian-ui.js'); const toasts = []; let overlay = true; let t = 0;
  globalThis.document = { getElementById: (id) => (id === 'breaktime' && overlay ? { remove() { overlay = false; } } : null) };
  try { const w = new GuardianWatch({ ui: { toast: (m) => toasts.push(m) }, audio: null }, () => t);
    w.onBeat({ left: 30, br: 20 }); assert.equal(toasts.length, 0); assert.equal(overlay, false, 'a successful beat removes the time-up screen');
    w.onBeat({ left: 10, br: 20 }); w.onBeat({ left: 9, br: 20 }); assert.equal(toasts.filter(m => /10 minutes/.test(m)).length, 1); w.onBeat({ left: 1, br: 20 }); assert.equal(toasts.filter(m => /1 minute/.test(m)).length, 1); w.onBeat({ left: 1, br: 20 }); assert.equal(toasts.length, 2, 'no repeats');
    t = 21 * 60000; w.onBeat({ left: 25, br: 20 }); assert.equal(toasts.filter(m => /take a break|short break/i.test(m)).length, 1); t = 30 * 60000; w.onBeat({ left: 25, br: 20 }); assert.equal(toasts.filter(m => /short break/i.test(m)).length, 1, 'not again before the next 20 minutes'); t = 41 * 60000; w.onBeat({ left: 25, br: 20 }); assert.equal(toasts.filter(m => /short break/i.test(m)).length, 2);
    w.onBeat({ curfewIn: 8 }); assert.ok(toasts.some(m => /Quiet hours start in 8 minutes/.test(m))); w.onBeat(undefined); } finally { delete globalThis.document; }
});
