// Player-to-player marketplace: sell cars and wearables (clothes, jewelry, caps) to each other. GAME MONEY ONLY. Numbers: server/config/market.js (ESTIMATES).
// ESCROW: listing takes the asset OUT of the seller's hands into the listing row (a snapshot), so it cannot be used, worn, sold twice or listed twice. A sale is ONE balanced ledger
// transaction (buyer pays the ask; the seller gets it minus the sale fee; the fee goes to a sink), and the asset moves in the same database transaction. Cancelling or expiry gives
// the asset back. A car keeps its ORIGINAL price paid and purchase date, so the market price can never raise what the system pays for it at the Auto Mart (no money machine between friends).
import { bad, dayKey } from './util.js';
import { post, move, cashId, balanceOf, SYS } from './ledger.js';
import { notify } from './economy.js';
import { resaleValue, conditionOf, modelDef } from './cars.js';
import { cfgOf as wearCfg } from './wearables.js';
import { MARKET } from '../config/market.js';

export const cfg = (app) => app.balance.market || MARKET;
const money = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
const DAY = 86400000;
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username || 'someone';
const rowOf = (app, id) => app.db.prepare('SELECT * FROM market_listings WHERE id=?').get(Number(id));

function gate(app, uid, buying) {
  const C = cfg(app); const u = app.db.prepare('SELECT is_guest, is_bot, created_at FROM users WHERE id=?').get(uid); if (!u || u.is_bot) bad('NO_PLAYER', 'Unknown player.', 404);
  if (u.is_guest && !C.guestsMay) bad('GUEST', 'Create an account first: guests cannot use the marketplace.', 403);
  const need = buying ? C.minBuyerAgeMs : C.minAccountAgeMs; const age = app.clock.now() - u.created_at; if (age < need) bad('TOO_NEW', `Your account is too new for the marketplace. Come back in ${Math.ceil((need - age) / 60000)} minutes.`, 403);
}
const carRow = (app, snap) => ({ ...snap, bought_at: snap.bought_at });
/** what a buyer sees about the asset (from the frozen snapshot) */
function describe(app, l) {
  const snap = JSON.parse(l.snapshot);
  if (l.kind === 'car') { const m = modelDef(app, snap.model) || { name: snap.model, color: '#888' }; const cd = conditionOf(app, snap); return { title: m.name, color: m.color, details: `${cd.label} · condition ${cd.pct}% · damage ${snap.damage || 0}% · ${Math.floor((app.clock.now() - snap.bought_at) / DAY)} days old`, condition: cd.pct, damage: snap.damage || 0 }; }
  const w = wearCfg(app).WEARABLES.find(x => x.id === snap.item_id); return { title: w ? w.name : snap.item_id, details: w ? `${w.slot} · ${w.kind || ''}`.trim() : '', slot: w?.slot, crown: !!w?.crown };
}
const listingView = (app, l, uid) => {
  const C = cfg(app); const d = describe(app, l); const over = l.ask / Math.max(1, l.base_value);
  return { id: l.id, kind: l.kind, seller: nameOf(app, l.seller_id), mine: l.seller_id === uid, ask: l.ask, baseValue: l.base_value, ratio: Math.round(over * 100) / 100, warn: over > C.warnOverFraction ? `Asking ${Math.round(over * 100)}% of what it is worth.` : null, saleFee: Math.max(C.saleFeeMin, Math.floor(l.ask * C.saleFeeFraction)), status: l.status, expiresAt: l.expires_at, createdAt: l.created_at, ...d };
};
/** expire what is past its time (the asset stays in escrow until the seller claims it) */
export function tickMarket(app) { app.db.prepare("UPDATE market_listings SET status='expired' WHERE status='open' AND expires_at<=?").run(app.clock.now()); }

export function browse(app, uid, { kind, sort, page } = {}) {
  tickMarket(app); const C = cfg(app); const k = kind === 'car' || kind === 'wearable' ? kind : null; const order = sort === 'price_desc' ? 'ask DESC' : sort === 'new' ? 'id DESC' : 'ask ASC';
  const rows = app.db.prepare(`SELECT * FROM market_listings WHERE status='open' ${k ? 'AND kind=?' : ''} ORDER BY ${order}, id DESC LIMIT ? OFFSET ?`).all(...(k ? [k] : []), C.pageSize, Math.max(0, Number(page) || 0) * C.pageSize);
  return { listings: rows.map(l => listingView(app, l, uid)), rules: rulesView(C), cash: balanceOf(app.db, cashId(uid)), note: 'Prices are set by players. Fees and limits are placeholders (ESTIMATE). Game money only: no cash-out.' };
}
const rulesView = (C) => ({ listingFeePercent: C.listingFeeFraction * 100, saleFeePercent: C.saleFeeFraction * 100, maxActiveListings: C.maxActiveListings, ttlHours: C.listingTtlMs / 3600000, bands: C.bands, dailySellCap: C.dailySellCap, maxTradesPerPairPerDay: C.maxTradesPerPairPerDay });
/** what I could list (not already listed, not parked, not unique crowns) and my listings */
export function mine(app, uid) {
  tickMarket(app); const C = cfg(app); const cars = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? ORDER BY id').all(uid).map(c => ({ kind: 'car', ref: String(c.id), title: modelDef(app, c.model)?.name || c.model, value: resaleValue(app, c), active: !!c.active }));
  const W = wearCfg(app); const wear = app.db.prepare('SELECT item_id, price_paid FROM wearables_owned WHERE user_id=?').all(uid).map(r => ({ r, w: W.WEARABLES.find(x => x.id === r.item_id) })).filter(x => x.w && !(C.untradeable.wearableCrowns && x.w.crown)).map(x => ({ kind: 'wearable', ref: x.w.id, title: x.w.name, value: x.w.price }));
  const listings = app.db.prepare("SELECT * FROM market_listings WHERE seller_id=? AND status IN ('open','expired') ORDER BY id DESC").all(uid).map(l => listingView(app, l, uid));
  const history = app.db.prepare("SELECT * FROM market_listings WHERE (seller_id=? OR buyer_id=?) AND status='sold' ORDER BY id DESC LIMIT 20").all(uid, uid).map(l => ({ ...listingView(app, l, uid), role: l.seller_id === uid ? 'sold' : 'bought', soldAt: l.sold_at }));
  return { sellable: [...cars, ...wear], listings, history, rules: rulesView(C), cash: balanceOf(app.db, cashId(uid)) };
}
function ensureSlot(app, uid) { const n = app.db.prepare('SELECT COUNT(*) n FROM player_cars WHERE user_id=?').get(uid).n; if (n >= app.balance.cars.garageSlots) bad('GARAGE_FULL', `Your garage holds ${app.balance.cars.garageSlots} cars. Make room first.`, 409); return n; }
function giveAsset(app, uid, l) {
  const snap = JSON.parse(l.snapshot);
  if (l.kind === 'car') { const n = ensureSlot(app, uid); app.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active,serviced_at,serviced_until,damage) VALUES (?,?,?,?,?,?,?,?)').run(uid, snap.model, snap.paid, snap.bought_at, n ? 0 : 1, snap.serviced_at || null, snap.serviced_until || null, snap.damage || 0); }
  else { if (app.db.prepare('SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, snap.item_id)) bad('ALREADY_OWNED', 'You already own that item.', 409); app.db.prepare('INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(uid, snap.item_id, snap.price_paid, app.clock.now()); const p = app.world.players.get(uid); if (p) p.wear = undefined; }
}
export function list(app, uid, kind, ref, ask, idem) {
  gate(app, uid, false); tickMarket(app); const C = cfg(app); ask = Math.floor(Number(ask)); if (!Number.isInteger(ask) || ask < 1 || ask > C.maxAsk) bad('BAD_PRICE', `Set a price between ₦1 and ${money(C.maxAsk)}.`);
  if (kind !== 'car' && kind !== 'wearable') bad('BAD_KIND', 'You can sell cars and wearables.');
  const now = app.clock.now();
  return app.db.transaction(() => {
    if (app.db.prepare("SELECT COUNT(*) n FROM market_listings WHERE seller_id=? AND status IN ('open','expired')").get(uid).n >= C.maxActiveListings) bad('TOO_MANY', `You can have ${C.maxActiveListings} listings at a time. Cancel or claim one first.`, 409);
    if (app.db.prepare("SELECT 1 FROM market_listings WHERE seller_id=? AND kind=? AND item_ref=? AND status IN ('cancelled','returned') AND returned_at>?").get(uid, kind, String(ref), now - C.relistCooldownMs)) bad('COOLDOWN', 'You just took that off the market. Wait a few minutes before listing it again.', 429);
    let snap, base; const band = C.bands[kind];
    if (kind === 'car') {
      const c = app.db.prepare('SELECT * FROM player_cars WHERE id=? AND user_id=?').get(Number(ref), uid); if (!c) bad('NO_ITEM', 'That car is not yours.', 404);
      base = resaleValue(app, c); snap = { model: c.model, paid: c.paid, bought_at: c.bought_at, damage: c.damage || 0, serviced_at: c.serviced_at || null, serviced_until: c.serviced_until || null };
    } else {
      const w = wearCfg(app).WEARABLES.find(x => x.id === String(ref)); if (!w) bad('NO_ITEM', 'Unknown item.', 404); if (C.untradeable.wearableCrowns && w.crown) bad('UNTRADEABLE', 'Crowns cannot be traded: they belong to whoever bought them.', 409);
      const o = app.db.prepare('SELECT price_paid FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, w.id); if (!o) bad('NO_ITEM', 'You do not own that.', 404); base = w.price; snap = { item_id: w.id, price_paid: o.price_paid };
    }
    const lo = Math.ceil(base * band.min), hi = Math.floor(base * band.max); if (ask < lo || ask > hi) bad('PRICE_BAND', `For this one the price must be between ${money(lo)} and ${money(hi)} (it is worth about ${money(base)}).`, 400, { min: lo, max: hi, value: base });
    const fee = Math.max(C.listingFeeMin, Math.floor(ask * C.listingFeeFraction)); if (balanceOf(app.db, cashId(uid)) < fee) bad('NO_FUNDS', `The listing fee is ${money(fee)} and you do not have it.`, 402, { need: fee });
    move(app, { from: cashId(uid), to: SYS.SINK_MARKET, amount: fee, reason: 'market_listing_fee', ref: `${kind}:${ref}`, userId: uid, idemKey: idem ? `mktlist:${uid}:${kind}:${ref}:${idem}` : null });
    // take the asset out of the seller's hands (escrow)
    if (kind === 'car') { const c = app.db.prepare('SELECT * FROM player_cars WHERE id=? AND user_id=?').get(Number(ref), uid); app.db.prepare('DELETE FROM car_parking WHERE car_id=?').run(c.id); const del = app.db.prepare('DELETE FROM player_cars WHERE id=?').run(c.id); if (del.changes !== 1) bad('CONFLICT', 'That car is gone.', 409); if (c.active) { const next = app.db.prepare('SELECT id FROM player_cars WHERE user_id=? ORDER BY id LIMIT 1').get(uid); if (next) app.db.prepare('UPDATE player_cars SET active=1 WHERE id=?').run(next.id); } }
    else { const del = app.db.prepare('DELETE FROM wearables_owned WHERE user_id=? AND item_id=?').run(uid, String(ref)); if (del.changes !== 1) bad('CONFLICT', 'That item is gone.', 409); app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND item_id=?').run(uid, String(ref)); const p = app.world.players.get(uid); if (p) p.wear = undefined; }
    const id = Number(app.db.prepare('INSERT INTO market_listings(seller_id,kind,item_ref,snapshot,ask,base_value,listing_fee,status,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?)').run(uid, kind, String(ref), JSON.stringify(snap), ask, base, fee, 'open', now, now + C.listingTtlMs).lastInsertRowid);
    return { ok: true, id, fee, text: `Listed for ${money(ask)}. The listing fee was ${money(fee)}.`, ...mine(app, uid) };
  })();
}
/** take your own listing off and get the asset back (open, or expired and still held) */
export function cancel(app, uid, id) {
  return app.db.transaction(() => {
    tickMarket(app); const l = rowOf(app, id); if (!l || l.seller_id !== uid) bad('NO_LISTING', 'That is not your listing.', 404); if (l.status !== 'open' && l.status !== 'expired') bad('NOT_OPEN', 'That listing is already closed.', 409);
    const up = app.db.prepare("UPDATE market_listings SET status='returned', returned_at=? WHERE id=? AND status IN ('open','expired')").run(app.clock.now(), l.id); if (up.changes !== 1) bad('CONFLICT', 'That listing just changed.', 409);
    giveAsset(app, uid, l); return { ok: true, text: 'It is back with you.', ...mine(app, uid) };
  })();
}
export function buy(app, uid, id, expectAsk, idem) {
  gate(app, uid, true); tickMarket(app); const C = cfg(app); const now = app.clock.now();
  return app.db.transaction(() => {
    const l = rowOf(app, id); if (!l || l.status !== 'open') bad('GONE', 'That listing is no longer available.', 409); if (l.seller_id === uid) bad('OWN_LISTING', 'You cannot buy your own listing.', 409);
    if (Number(expectAsk) !== l.ask) bad('PRICE_CHANGED', 'The price is not what you were shown. Look again.', 409, { ask: l.ask });
    const day0 = now - (now % DAY); const pair = app.db.prepare("SELECT COUNT(*) n FROM market_listings WHERE status='sold' AND seller_id=? AND buyer_id=? AND sold_at>=?").get(l.seller_id, uid, day0).n; if (pair >= C.maxTradesPerPairPerDay) bad('PAIR_LIMIT', 'You two have traded a lot today. Try again tomorrow.', 429);
    const sold = app.db.prepare("SELECT COALESCE(SUM(ask),0) s FROM market_listings WHERE status='sold' AND seller_id=? AND sold_at>=?").get(l.seller_id, day0).s; if (sold + l.ask > C.dailySellCap) bad('SELLER_CAP', 'That seller has reached the daily selling limit. Try tomorrow.', 409);
    const fee = Math.max(C.saleFeeMin, Math.floor(l.ask * C.saleFeeFraction)); const net = l.ask - fee; if (net < 1) bad('BAD_PRICE', 'Too cheap to trade.');
    if (balanceOf(app.db, cashId(uid)) < l.ask) bad('NO_FUNDS', `It costs ${money(l.ask)} and you do not have enough.`, 402, { need: l.ask });
    const up = app.db.prepare("UPDATE market_listings SET status='sold', buyer_id=?, sold_at=?, sale_fee=? WHERE id=? AND status='open'").run(uid, now, fee, l.id); if (up.changes !== 1) bad('GONE', 'Somebody just bought that.', 409);
    giveAsset(app, uid, l);
    post(app, { reason: 'market_sale', ref: `listing:${l.id}`, userId: uid, idemKey: idem ? `mktbuy:${l.id}:${idem}` : `mktbuy:${l.id}`, legs: [{ account: cashId(uid), amount: -l.ask }, { account: cashId(l.seller_id), amount: net }, { account: SYS.SINK_MARKET, amount: fee }] });
    const d = describe(app, l); notify(app, l.seller_id, 'market', `@${nameOf(app, uid)} bought your ${d.title} for ${money(l.ask)}. You received ${money(net)} after the ${money(fee)} fee.`);
    return { ok: true, paid: l.ask, text: `You bought the ${d.title} for ${money(l.ask)}.`, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
