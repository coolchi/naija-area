// Festivals (Track G item 6): Detty December, Christmas, Eid al-Fitr and Eid al-Adha. Calendar windows, limited items, daily gifts. GAME MONEY ONLY; every number is an ESTIMATE.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { EVENTS } from '../server/config/events.js';
import { WEARABLES, wearableById, MATERIALS } from '../server/config/wearables.js';
import * as ev from '../server/core/events.js';

const L = (iso) => Date.parse(iso + ':00Z') - 3600000; // a Lagos (UTC+1) wall-clock time as a timestamp
const setNow = (s, iso) => { s.app.clock.now = () => L(iso); };
const def = (id) => EVENTS.events.find(e => e.id === id);
const fest = (s) => ev.activeFestivals(s.app, s.app.clock.now()).map(f => f.id);

test('calendar windows: Detty December wraps the new year, Christmas is the 20th to the 27th, and they overlap on the right days', () => {
  const s = makeServer(); const on = (iso) => { setNow(s, iso); s.app._fest = null; return fest(s); };
  assert.deepEqual(on('2026-10-10T15:00'), []); assert.deepEqual(on('2026-12-09T23:59'), []); assert.deepEqual(on('2026-12-10T00:00'), ['detty_december']);
  assert.deepEqual(on('2026-12-21T12:00'), ['detty_december', 'christmas']); assert.deepEqual(on('2026-12-28T12:00'), ['detty_december']); assert.deepEqual(on('2027-01-05T23:30'), ['detty_december']); assert.deepEqual(on('2027-01-06T00:00'), []);
  const d = def('detty_december'); setNow(s, '2027-01-02T10:00'); const a = ev.status(s.app, d), b = (setNow(s, '2026-12-15T10:00'), ev.status(s.app, d)); assert.equal(a.key, b.key, 'one run, one key, across new year'); assert.equal(a.key, 'detty_december:y2026');
  setNow(s, '2027-01-05T12:00'); const left = ev.status(s.app, d).endsInMs; assert.ok(left > 11 * 3600000 && left < 13 * 3600000, 'about 12 hours left on the last day: ' + left);
});
test('Eid: explicit dates per year, three days each; a new year is a new key; nothing between', () => {
  const s = makeServer(); const f = def('eid_al_fitr'), a = def('eid_al_adha'); setNow(s, '2027-03-08T23:00'); assert.equal(ev.status(s.app, f).active, false); const nx = ev.startsInMs(s.app, f); assert.ok(nx > 0 && nx < 3 * 3600000, 'starts within hours');
  setNow(s, '2027-03-09T08:00'); assert.equal(ev.status(s.app, f).active, true); setNow(s, '2027-03-11T22:00'); const st = ev.status(s.app, f); assert.equal(st.active, true); assert.equal(st.key, 'eid_al_fitr:2027-03-09'); setNow(s, '2027-03-12T00:30'); assert.equal(ev.status(s.app, f).active, false);
  setNow(s, '2027-05-17T12:00'); assert.equal(ev.status(s.app, a).active, true); assert.equal(ev.status(s.app, f).active, false); setNow(s, '2028-02-27T12:00'); assert.equal(ev.status(s.app, f).key, 'eid_al_fitr:2028-02-26');
  for (const e of EVENTS.events.filter(x => x.window.type === 'spans')) for (const [x, y] of e.window.spans) { assert.ok(x <= y && (Date.parse(y) - Date.parse(x)) / 86400000 === 2, `${e.id} ${x}: three days`); }
  setNow(s, '2030-06-01T12:00'); assert.equal(ev.startsInMs(s.app, a), null, 'no more dates known: no start time');
});
test('config sanity: every festival item exists, limited items are wearables in the event shop with modest size and are not sold in the status shops', () => {
  const festivals = EVENTS.events.filter(e => e.kind === 'festival'); assert.equal(festivals.length, 4); assert.equal(new Set(EVENTS.events.map(e => e.id)).size, EVENTS.events.length);
  for (const e of festivals) { assert.ok(e.shop.length >= 2 && e.claim?.perDay, e.id); for (const it of e.shop) { assert.ok(it.stockPerRun > 0 && it.limitPerPlayer > 0 && it.price > 0, it.id); if (it.limited) { const w = wearableById[it.wear]; assert.ok(w && w.shop === 'event' && w.limited, it.id + ' wearable'); assert.ok(w.size <= 1.2, 'limited items are not a status flex'); assert.equal(w.price, it.price, 'price matches the festival shop'); assert.ok(MATERIALS[w.mat]); } } }
  assert.ok(WEARABLES.filter(w => w.shop === 'event').every(w => festivals.some(f => f.shop.some(i => i.wear === w.id))), 'no orphan limited item');
  assert.ok(EVENTS.events.every(e => e.claim?.cash === undefined || e.claim.cash <= EVENTS.claimDailyCap));
});
test('a festival is off the rest of the year: not listed active, buying and claiming are refused, the heartbeat has no festival', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 500000 }); setNow(s, '2026-10-10T15:00'); const v = await ok(s, 'GET', '/api/events', { uid: u }); const d = v.events.find(e => e.id === 'detty_december'); assert.equal(d.active, false); assert.ok(d.startsInMs > 50 * 86400000, 'starts in about 2 months'); assert.match(d.window, /10 Dec to 5 Jan/);
  const r = await call(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'detty_december', item: 'dd_hat' } }); assert.equal(r.json.error, 'NOT_ON'); assert.equal((await call(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } })).json.error, 'NOT_ON');
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { x: 0, z: 0 } }); assert.deepEqual(hb.fest || [], []); assert.equal(checkInvariants(s.db).ok, true);
});
test('limited item: bought once, through the ledger, worn at once, kept after the festival ends, refused in the second year while owned; cannot be bought in the normal shops', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1000000 }); setNow(s, '2026-12-22T12:00'); const before = balanceOf(s.db, cashId(u));
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { x: 0, z: 0 } }); assert.deepEqual(hb.fest.map(f => f.id), ['detty_december', 'christmas']);
  const r = await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap', idem: 'a' } }); assert.equal(r.charged, 100000); assert.equal(balanceOf(s.db, cashId(u)), before - 100000);
  const row = s.db.prepare("SELECT * FROM ledger_tx WHERE reason='event_buy' AND user_id=?").get(u); assert.ok(row); assert.ok(row.ref.startsWith('christmas:y2026:xm_cap'));
  const mine = await ok(s, 'GET', '/api/wearables/mine', { uid: u }); assert.deepEqual(mine.worn.map(w => w.id), ['fest_xmas_cap']); assert.equal(mine.ownedValue, 100000);
  assert.equal((await call(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap' } })).json.error, 'OWNED');
  const cat = await ok(s, 'GET', '/api/wearables/catalogue'); const ci = cat.items.find(i => i.id === 'fest_xmas_cap'); assert.equal(ci.limited, true); assert.equal(ci.shop, 'event');
  const caps = Object.keys(s.app.city.venueById || {}).find(k => s.app.city.venueById[k].wearShop === 'caps'); assert.ok(caps, 'a cap shop exists'); { const shop = await ok(s, 'GET', `/api/wearables/shop?venueId=${caps}`, { uid: u }); assert.ok(!shop.items.some(i => i.id.startsWith('fest_')), 'not in the cap shop'); }
  setNow(s, '2027-03-01T12:00'); const after = await ok(s, 'GET', '/api/wearables/mine', { uid: u }); assert.deepEqual(after.worn.map(w => w.id), ['fest_xmas_cap'], 'kept after the festival'); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap' } })).json.error, 'NOT_ON');
  setNow(s, '2027-12-22T12:00'); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap' } })).json.error, 'OWNED', 'second year: already yours, not charged twice'); assert.equal(checkInvariants(s.db).ok, true);
});
test('limited stock is per festival run, shared by everyone, and restocks next year', async () => {
  const s = makeServer(); setNow(s, '2026-12-22T12:00'); s.app.balance.events = { ...EVENTS, events: EVENTS.events.map(e => e.id === 'christmas' ? { ...e, shop: e.shop.map(i => i.id === 'xm_cap' ? { ...i, stockPerRun: 2 } : i) } : e) };
  const a = mkUser(s, { cash: 500000 }), b = mkUser(s, { cash: 500000 }), c = mkUser(s, { cash: 500000 }); for (const u of [a, b]) await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap' } });
  const r = await call(s, 'POST', '/api/events/buy', { uid: c, body: { event: 'christmas', item: 'xm_cap' } }); assert.equal(r.json.error, 'SOLD_OUT'); assert.equal(balanceOf(s.db, cashId(c)), 500000, 'a refused buy costs nothing');
  const v = await ok(s, 'GET', '/api/events', { uid: c }); assert.equal(v.events.find(e => e.id === 'christmas').shop.find(i => i.id === 'xm_cap').left, 0);
  setNow(s, '2027-12-22T12:00'); await ok(s, 'POST', '/api/events/buy', { uid: c, body: { event: 'christmas', item: 'xm_cap' } }); assert.equal(checkInvariants(s.db).ok, true);
});
test('food items: ledger sink, hunger up, per-player limit; poor players are refused without charge', async () => {
  const s = makeServer(); setNow(s, '2026-12-25T12:00'); const u = mkUser(s, { cash: 10000 }); s.db.prepare('UPDATE player_state SET hunger=20 WHERE user_id=?').run(u); const cash = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_jollof' } }); assert.equal(balanceOf(s.db, cashId(u)), cash - 2000); assert.ok(s.db.prepare('SELECT hunger FROM player_state WHERE user_id=?').get(u).hunger >= 70);
  for (let i = 0; i < 3; i++) await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_jollof' } }); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_jollof' } })).json.error, 'LIMIT'); void r;
  const poor = mkUser(s, { cash: 10 }); assert.equal((await call(s, 'POST', '/api/events/buy', { uid: poor, body: { event: 'christmas', item: 'xm_cap' } })).json.error, 'NO_FUNDS'); assert.equal(balanceOf(s.db, cashId(poor)), 10);
});
test('daily gift: once per player per day while the festival runs, again the next day, capped by the daily event cap, faucet account balanced', async () => {
  const s = makeServer(); setNow(s, '2026-12-21T12:00'); const u = mkUser(s, { cash: 100 }); const c0 = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } }); assert.equal(r.paid, 700); assert.equal(balanceOf(s.db, cashId(u)), c0 + 700); assert.equal(r.events.find(e => e.id === 'christmas').claim.claimed, true);
  assert.equal((await call(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } })).json.error, 'CLAIMED'); assert.equal(balanceOf(s.db, cashId(u)), c0 + 700);
  setNow(s, '2026-12-22T12:00'); const r2 = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } }); assert.equal(r2.paid, 700); assert.equal(r2.events.find(e => e.id === 'christmas').claim.claimed, true);
  // the daily cap is shared by every event: Detty (600) + Christmas (700) fine; a tiny cap stops it
  s.app.balance.events = { ...EVENTS, claimDailyCap: 1000 }; setNow(s, '2026-12-23T12:00'); const a = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } }); assert.equal(a.paid, 700); const b = await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'detty_december' } }); assert.equal(b.paid, 300, 'only what is left under the cap');
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='event_claim' AND user_id=?").get(u).n, 4); assert.equal(checkInvariants(s.db).ok, true);
});
test('account data: festival rows are in the download and are erased with the account', async () => {
  const s = makeServer(); setNow(s, '2026-12-22T12:00'); const u = mkUser(s, { cash: 500000 }); await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'christmas' } }); await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'christmas', item: 'xm_cap' } });
  const dl = JSON.stringify(await ok(s, 'GET', '/api/account/export', { uid: u })); assert.match(dl, /fest_xmas_cap/); assert.match(dl, /christmas:y2026/); assert.match(dl, /xm_cap/);
});
