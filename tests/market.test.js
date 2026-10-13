// Player marketplace: escrow, fees, price bands, anti-scam limits, ledger conservation. GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { MARKET } from '../server/config/market.js';
import { resaleValue } from '../server/core/cars.js';

const trader = (s, cash = 5000000) => mkUser(s, { cash, ageMs: 61 * 60000 });
const giveCar = (s, uid, model = 'oga', active = 1) => Number(s.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active,damage) VALUES (?,?,?,?,?,?)').run(uid, model, 2500000, s.app.clock.now(), active, 12).lastInsertRowid);
const giveItem = (s, uid, id = 'neck_cuban', paid = 900000) => s.db.prepare('INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(uid, id, paid, s.app.clock.now());
const P = (s, u, path, body) => call(s, 'POST', '/api/market/' + path, { uid: u, body });
const total = (s) => s.db.prepare('SELECT COALESCE(SUM(balance),0) t FROM accounts').get().t;

test('selling a car: escrow takes it out of the garage, the sale moves it and the money in ONE transaction, fees go to the sink, supply of money is conserved', async () => {
  const s = makeServer(); const a = trader(s, 1000000), b = trader(s, 4000000); const car = giveCar(s, a); const value = resaleValue(s.app, s.db.prepare('SELECT * FROM player_cars WHERE id=?').get(car));
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'car', ref: car, ask: value } }); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM player_cars WHERE user_id=?').get(a).n, 0, 'in escrow, not in the garage');
  const fee = Math.max(MARKET.listingFeeMin, Math.floor(value * MARKET.listingFeeFraction)); assert.equal(l.fee, fee); const id = l.id;
  const pub = await ok(s, 'GET', '/api/market', { uid: b }); assert.equal(pub.listings.length, 1); assert.equal(pub.listings[0].ask, value); assert.match(pub.listings[0].details, /damage 12%/); assert.equal(pub.listings[0].seller.startsWith('user'), true);
  const supply = total(s); const cashA = balanceOf(s.db, cashId(a)), cashB = balanceOf(s.db, cashId(b));
  const r = await ok(s, 'POST', '/api/market/buy', { uid: b, body: { id, expect: value } }); const saleFee = Math.max(MARKET.saleFeeMin, Math.floor(value * MARKET.saleFeeFraction));
  assert.equal(balanceOf(s.db, cashId(b)), cashB - value); assert.equal(balanceOf(s.db, cashId(a)), cashA + value - saleFee); assert.equal(total(s), supply, 'money is only moved'); assert.equal(balanceOf(s.db, SYS.SINK_MARKET), fee + saleFee);
  const mine = s.db.prepare('SELECT * FROM player_cars WHERE user_id=?').all(b); assert.equal(mine.length, 1); assert.equal(mine[0].paid, 2500000, 'keeps its ORIGINAL price paid: the market price never changes what the Auto Mart pays'); assert.equal(mine[0].damage, 12); assert.equal(mine[0].active, 1);
  const tx = s.db.prepare("SELECT id FROM ledger_tx WHERE reason='market_sale'").all(); assert.equal(tx.length, 1); assert.equal(s.db.prepare('SELECT SUM(amount) s FROM ledger_entries WHERE tx_id=?').get(tx[0].id).s, 0);
  assert.equal((await P(s, b, 'buy', { id, expect: value })).json.error, 'GONE', 'no double sale'); assert.equal(checkInvariants(s.db).ok, true); assert.ok(r.paid === value);
  assert.ok(s.db.prepare("SELECT 1 FROM notifications WHERE user_id=? AND kind='market'").get(a), 'the seller is told');
});
test('no money machine: a friend who pays a high price gets a car that the Auto Mart still values by the ORIGINAL price paid', async () => {
  const s = makeServer(); const a = trader(s, 100000), b = trader(s, 9000000); const car = giveCar(s, a); const row = s.db.prepare('SELECT * FROM player_cars WHERE id=?').get(car); const v = resaleValue(s.app, row);
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'car', ref: car, ask: Math.floor(v * 1.4) } }); await ok(s, 'POST', '/api/market/buy', { uid: b, body: { id: l.id, expect: Math.floor(v * 1.4) } });
  const got = s.db.prepare('SELECT * FROM player_cars WHERE user_id=?').get(b); assert.ok(resaleValue(s.app, got) <= v + 1, 'the system never pays more for it than before');
});
test('wearables trade too; crowns cannot; you cannot buy what you own; the item leaves the seller (and what they wear)', async () => {
  const s = makeServer(); const a = trader(s), b = trader(s); giveItem(s, a); s.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?)').run(a, 'neck', 'neck_cuban'); giveItem(s, a, 'crown_prince', 20000000);
  assert.equal((await P(s, a, 'list', { kind: 'wearable', ref: 'crown_prince', ask: 20000000 })).json.error, 'UNTRADEABLE');
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: 'neck_cuban', ask: 1000000 } }); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM wearables_equipped WHERE user_id=? AND item_id='neck_cuban'").get(a).n, 0);
  giveItem(s, b); assert.equal((await P(s, b, 'buy', { id: l.id, expect: 1000000 })).json.error, 'ALREADY_OWNED'); s.db.prepare("DELETE FROM wearables_owned WHERE user_id=? AND item_id='neck_cuban'").run(b);
  await ok(s, 'POST', '/api/market/buy', { uid: b, body: { id: l.id, expect: 1000000 } }); assert.ok(s.db.prepare("SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id='neck_cuban'").get(b)); assert.equal(checkInvariants(s.db).ok, true);
});
test('anti-scam: price bands, asking price must match what the buyer was shown, new accounts, guests, own listing, funds, listing cap, relist cooldown', async () => {
  const s = makeServer(); const a = trader(s), b = trader(s, 3000000); const c1 = giveCar(s, a), c2 = giveCar(s, a, 'oga', 0);
  const v = resaleValue(s.app, s.db.prepare('SELECT * FROM player_cars WHERE id=?').get(c1)); assert.equal((await P(s, a, 'list', { kind: 'car', ref: c1, ask: Math.ceil(v * MARKET.bands.car.max) + 1 })).json.error, 'PRICE_BAND'); assert.equal((await P(s, a, 'list', { kind: 'car', ref: c1, ask: 1 })).json.error, 'PRICE_BAND');
  assert.equal((await P(s, a, 'list', { kind: 'car', ref: 99999, ask: v })).status, 404); assert.equal((await P(s, b, 'list', { kind: 'car', ref: c1, ask: v })).status, 404, 'not your car');
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'car', ref: c1, ask: v } }); assert.equal((await P(s, a, 'buy', { id: l.id, expect: v })).json.error, 'OWN_LISTING'); assert.equal((await P(s, b, 'buy', { id: l.id, expect: v - 1 })).json.error, 'PRICE_CHANGED');
  const broke = trader(s, 10); assert.equal((await P(s, broke, 'buy', { id: l.id, expect: v })).status, 402); const fresh = mkUser(s, { cash: 9000000 }); assert.equal((await P(s, fresh, 'buy', { id: l.id, expect: v })).json.error, 'TOO_NEW'); assert.equal((await P(s, fresh, 'list', { kind: 'car', ref: 1, ask: 1 })).json.error, 'TOO_NEW'); const gst = mkUser(s, { cash: 9000000, guest: true, ageMs: 61 * 60000 }); assert.equal((await P(s, gst, 'buy', { id: l.id, expect: v })).json.error, 'GUEST');
  await ok(s, 'POST', '/api/market/cancel', { uid: a, body: { id: l.id } }); const back = s.db.prepare('SELECT id FROM player_cars WHERE user_id=? ORDER BY id').all(a); assert.equal(back.length, 2, 'asset is returned');
  void c2;
});
test('relisting the same wearable right after cancelling waits a few minutes; the cap on open listings; expiry keeps it in escrow until claimed', async () => {
  const s = makeServer(); const a = trader(s); const ids = ['neck_thin', 'neck_rope', 'neck_cuban', 'neck_pendant', 'neck_boss', 'neck_iced']; ids.forEach((i, k) => giveItem(s, a, i, 1000 + k));
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: 'neck_thin', ask: 150000 } }); await ok(s, 'POST', '/api/market/cancel', { uid: a, body: { id: l.id } }); assert.equal((await P(s, a, 'list', { kind: 'wearable', ref: 'neck_thin', ask: 150000 })).json.error, 'COOLDOWN');
  s.app.clock.advance(MARKET.relistCooldownMs + 1000); await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: 'neck_thin', ask: 150000 } });
  for (const i of ['neck_rope', 'neck_cuban', 'neck_pendant', 'neck_boss']) await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: i, ask: s.app.balance.wearables?.[i] || { neck_rope: 400000, neck_cuban: 900000, neck_pendant: 1800000, neck_boss: 3500000 }[i] } });
  assert.equal((await P(s, a, 'list', { kind: 'wearable', ref: 'neck_iced', ask: 5500000 })).json.error, 'TOO_MANY');
  s.app.clock.advance(MARKET.listingTtlMs + 1000); const b = trader(s); assert.equal((await ok(s, 'GET', '/api/market', { uid: b })).listings.length, 0, 'expired listings are not for sale'); const mine = await ok(s, 'GET', '/api/market/mine', { uid: a }); assert.equal(mine.listings.length, 5); assert.ok(mine.listings.every(x => x.status === 'expired'));
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM wearables_owned WHERE user_id=? AND item_id='neck_rope'").get(a).n, 0, 'still in escrow'); await ok(s, 'POST', '/api/market/cancel', { uid: a, body: { id: mine.listings[0].id } }); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM wearables_owned WHERE user_id=?').get(a).n, 2);
});
test('a full garage cannot buy a car (the listing stays), and the same pair can only trade so many times a day; a seller cannot sell past the daily cap', async () => {
  const s = makeServer(); const a = trader(s, 1000000), b = trader(s, 99000000); for (let i = 0; i < 5; i++) giveCar(s, b, 'kekere', i ? 0 : 1); const car = giveCar(s, a); const v = resaleValue(s.app, s.db.prepare('SELECT * FROM player_cars WHERE id=?').get(car));
  const l = await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'car', ref: car, ask: v } }); assert.equal((await P(s, b, 'buy', { id: l.id, expect: v })).json.error, 'GARAGE_FULL'); assert.equal(s.db.prepare("SELECT status FROM market_listings WHERE id=?").get(l.id).status, 'open', 'rolled back'); assert.equal(checkInvariants(s.db).ok, true);
  const s2 = makeServer(); const x = trader(s2, 99000000), y = trader(s2, 99000000); const cheap = ['neck_thin', 'neck_rope', 'neck_cuban']; cheap.forEach(i => giveItem(s2, x, i)); const prices = { neck_thin: 150000, neck_rope: 400000, neck_cuban: 900000 }; const ids = []; for (const i of cheap) ids.push((await ok(s2, 'POST', '/api/market/list', { uid: x, body: { kind: 'wearable', ref: i, ask: prices[i] } })).id);
  await ok(s2, 'POST', '/api/market/buy', { uid: y, body: { id: ids[0], expect: prices.neck_thin } }); await ok(s2, 'POST', '/api/market/buy', { uid: y, body: { id: ids[1], expect: prices.neck_rope } }); assert.equal((await P(s2, y, 'buy', { id: ids[2], expect: prices.neck_cuban })).json.error, 'PAIR_LIMIT');
  const z = trader(s2, 99000000); await ok(s2, 'POST', '/api/market/buy', { uid: z, body: { id: ids[2], expect: prices.neck_cuban } });
  const sc = makeServer(); sc.app.balance.market = { ...MARKET, dailySellCap: 1000000, maxTradesPerPairPerDay: 9 }; const p = trader(sc, 99000000), q = trader(sc, 99000000); giveItem(sc, p, 'neck_thin'); giveItem(sc, p, 'neck_cuban'); const l1 = await ok(sc, 'POST', '/api/market/list', { uid: p, body: { kind: 'wearable', ref: 'neck_cuban', ask: 900000 } }); const l2 = await ok(sc, 'POST', '/api/market/list', { uid: p, body: { kind: 'wearable', ref: 'neck_thin', ask: 150000 } });
  await ok(sc, 'POST', '/api/market/buy', { uid: q, body: { id: l1.id, expect: 900000 } }); assert.equal((await P(sc, q, 'buy', { id: l2.id, expect: 150000 })).json.error, 'SELLER_CAP');
});
test('browse sorts and filters, shows a warning for high asks, and the sale fee is stated up front', async () => {
  const s = makeServer(); const a = trader(s); giveItem(s, a, 'neck_thin'); giveItem(s, a, 'neck_rope'); await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: 'neck_thin', ask: 300000 } }); await ok(s, 'POST', '/api/market/list', { uid: a, body: { kind: 'wearable', ref: 'neck_rope', ask: 400000 } });
  const b = trader(s); const r = await ok(s, 'GET', '/api/market?kind=wearable&sort=price_desc', { uid: b }); assert.deepEqual(r.listings.map(x => x.ask), [400000, 300000]); assert.ok(r.listings[1].warn, 'twice the value: warned'); assert.equal(r.listings[0].warn, null); assert.equal(r.listings[0].saleFee, Math.floor(400000 * MARKET.saleFeeFraction)); assert.equal((await ok(s, 'GET', '/api/market?kind=car', { uid: b })).listings.length, 0);
});
