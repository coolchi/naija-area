// Jewelry store + cap store: a "wearables" system. Items are bought through the ledger (audit row), owned per player, and one item per slot is worn on the avatar.
// The catalogue (items, prices, sizes) lives in server/config/wearables.js. Game money only.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { isOpen, venueDef } from './venues.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { addMood, notify } from './economy.js';
import * as DEFAULT from '../config/wearables.js';

export const cfgOf = (app) => app.balance.wearables || { SLOTS: DEFAULT.SLOTS, SLOT_LABEL: DEFAULT.SLOT_LABEL, WEARABLES: DEFAULT.WEARABLES, WEAR_RULES: DEFAULT.WEAR_RULES, MATERIALS: DEFAULT.MATERIALS, MAX_SIZE: DEFAULT.MAX_SIZE };
const itemOf = (app, id) => cfgOf(app).WEARABLES.find(w => w.id === id);
const MOOD_BUY = 4;

/** the public catalogue (the client needs it to draw what other players wear) */
export function catalogue(app) {
  const C = cfgOf(app); return { slots: C.SLOTS.map(s => ({ id: s, label: C.SLOT_LABEL[s] })), items: C.WEARABLES.map(w => ({ id: w.id, shop: w.shop, slot: w.slot, name: w.name, price: w.price, size: w.size, kind: w.kind, mat: w.mat, gems: w.gems || null, shine: w.shine || 0, crown: !!w.crown, limited: !!w.limited })), materials: C.MATERIALS, maxSize: C.MAX_SIZE, rules: { uniqueCrowns: !!C.WEAR_RULES.uniqueCrowns, resale: C.WEAR_RULES.resale }, shops: C.WEAR_RULES.shops };
}
export const equippedIds = (app, uid) => app.db.prepare('SELECT slot, item_id FROM wearables_equipped WHERE user_id=?').all(uid);
/** compact list of item ids a player is wearing, cached on the presence record (null when nothing) */
export function wearIds(app, p) {
  if (p.wear === undefined) { const C = cfgOf(app); p.wear = equippedIds(app, p.id).filter(r => C.WEARABLES.some(w => w.id === r.item_id)).sort((a, b) => C.SLOTS.indexOf(a.slot) - C.SLOTS.indexOf(b.slot)).map(r => r.item_id); }
  return p.wear;
}
const invalidate = (app, uid) => { const p = app.world.players.get(uid); if (p) p.wear = undefined; };
/** what a player owns and wears, as the profile shows it (status line) */
export function wearView(app, uid) {
  const C = cfgOf(app); const eq = equippedIds(app, uid); const own = app.db.prepare('SELECT item_id, price_paid FROM wearables_owned WHERE user_id=?').all(uid);
  const worn = eq.map(r => itemOf(app, r.item_id)).filter(Boolean).sort((a, b) => C.SLOTS.indexOf(a.slot) - C.SLOTS.indexOf(b.slot));
  const ownedValue = own.reduce((s, r) => s + r.price_paid, 0);
  return { worn: worn.map(w => ({ id: w.id, slot: w.slot, name: w.name, size: w.size, price: w.price })), ownedCount: own.length, ownedValue, wornValue: worn.reduce((s, w) => s + w.price, 0), status: worn.length ? `Wearing ${worn.map(w => w.name).join(', ')}` : 'Wearing no jewelry or hats' };
}
const shopOfVenue = (app, venueId) => { const v = venueDef(app, venueId); if (!v || !v.wearShop) bad('NO_SHOP', 'No such wearables shop.', 404); return v; };

/** the shop window: every item of this shop, with owned / worn / affordable flags */
export function shopView(app, uid, venueId) {
  const v = shopOfVenue(app, venueId); const C = cfgOf(app); const own = new Map(app.db.prepare('SELECT item_id, price_paid FROM wearables_owned WHERE user_id=?').all(uid).map(r => [r.item_id, r.price_paid]));
  const worn = new Set(equippedIds(app, uid).map(r => r.item_id)); const cash = balanceOf(app.db, cashId(uid));
  const items = C.WEARABLES.filter(w => w.shop === v.wearShop).map(w => {
    const takenBy = C.WEAR_RULES.uniqueCrowns && w.crown && !own.has(w.id) ? app.db.prepare('SELECT u.username FROM wearables_owned o JOIN users u ON u.id=o.user_id WHERE o.item_id=? LIMIT 1').get(w.id)?.username || null : null;
    return { id: w.id, slot: w.slot, name: w.name, price: w.price, size: w.size, kind: w.kind, mat: w.mat, gems: w.gems || null, shine: w.shine || 0, crown: !!w.crown, owned: own.has(w.id), worn: worn.has(w.id), canAfford: cash >= w.price, takenBy, sellFor: C.WEAR_RULES.resale.enabled && own.has(w.id) ? Math.floor(own.get(w.id) * C.WEAR_RULES.resale.fraction) : null };
  }).sort((a, b) => C.SLOTS.indexOf(a.slot) - C.SLOTS.indexOf(b.slot) || a.price - b.price);
  return { venueId, shop: v.wearShop, name: v.name, open: isOpen(app, v), hours: v.hours, cash, items, slots: C.SLOTS.map(s => ({ id: s, label: C.SLOT_LABEL[s] })), rules: { uniqueCrowns: !!C.WEAR_RULES.uniqueCrowns, resale: C.WEAR_RULES.resale }, note: 'Prices are placeholders (ESTIMATE). Game money only. The bigger the piece, the more it costs.' };
}
export function buy(app, uid, venueId, itemId, idem) {
  const v = shopOfVenue(app, venueId); const w = itemOf(app, itemId); if (!w || w.shop !== v.wearShop) bad('NO_ITEM', 'This shop does not sell that.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside the shop first.', 409);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed. Opens ${v.hours[0]}:00 to ${v.hours[1]}:00.`, 409, { hours: v.hours });
  const C = cfgOf(app);
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, w.id)) bad('ALREADY_OWNED', `You already own the ${w.name}.`, 409);
    if (C.WEAR_RULES.uniqueCrowns && w.crown && app.db.prepare('SELECT 1 FROM wearables_owned WHERE item_id=?').get(w.id)) bad('TAKEN', `The ${w.name} already belongs to someone else.`, 409);
    if (balanceOf(app.db, cashId(uid)) < w.price) bad('NO_FUNDS', `The ${w.name} costs ₦${w.price.toLocaleString('en-NG')}. You do not have enough cash.`, 402, { need: w.price });
    move(app, { from: cashId(uid), to: SYS.SINK_SHOPS, amount: w.price, reason: 'wearable', ref: w.id, userId: uid, idemKey: idem ? `wearable:${uid}:${w.id}:${idem}` : null });
    app.db.prepare('INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(uid, w.id, w.price, app.clock.now());
    app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND slot=?').run(uid, w.slot); app.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?)').run(uid, w.slot, w.id); // you leave the shop wearing it
    invalidate(app, uid); const mood = addMood(app, uid, MOOD_BUY);
    if (w.crown) notify(app, uid, 'venue', `You bought the ${w.name}. Long may you reign! 👑`);
    return { ok: true, charged: w.price, item: { id: w.id, name: w.name, slot: w.slot }, mood, cash: balanceOf(app.db, cashId(uid)), text: `${w.name} is yours (₦${w.price.toLocaleString('en-NG')}). You dey shine! ✨`, worn: wearView(app, uid) };
  })();
}
export function equip(app, uid, itemId) {
  const w = itemOf(app, itemId); if (!w) bad('NO_ITEM', 'Unknown item.', 404);
  if (!app.db.prepare('SELECT 1 FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, w.id)) bad('NOT_OWNED', 'You do not own that.', 409);
  app.db.transaction(() => { app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND slot=?').run(uid, w.slot); app.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?)').run(uid, w.slot, w.id); })();
  invalidate(app, uid); return { ok: true, worn: wearView(app, uid) };
}
export function unequip(app, uid, slot) {
  if (!cfgOf(app).SLOTS.includes(slot)) bad('BAD_SLOT', 'Unknown slot.'); app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND slot=?').run(uid, slot);
  invalidate(app, uid); return { ok: true, worn: wearView(app, uid) };
}
/** resale: only when the rules switch it on (default off, to keep status value). Pays a fraction of what was paid. */
export function sell(app, uid, itemId, idem) {
  const C = cfgOf(app); if (!C.WEAR_RULES.resale.enabled) bad('NO_RESALE', 'This shop does not buy items back (they keep their status value).', 409);
  const w = itemOf(app, itemId); if (!w) bad('NO_ITEM', 'Unknown item.', 404);
  return app.db.transaction(() => {
    const o = app.db.prepare('SELECT price_paid FROM wearables_owned WHERE user_id=? AND item_id=?').get(uid, w.id); if (!o) bad('NOT_OWNED', 'You do not own that.', 409);
    const back = Math.floor(o.price_paid * C.WEAR_RULES.resale.fraction);
    app.db.prepare('DELETE FROM wearables_owned WHERE user_id=? AND item_id=?').run(uid, w.id); app.db.prepare('DELETE FROM wearables_equipped WHERE user_id=? AND item_id=?').run(uid, w.id);
    if (back > 0) move(app, { from: SYS.SINK_SHOPS, to: cashId(uid), amount: back, reason: 'wearable_resale', ref: w.id, userId: uid, idemKey: idem ? `wearable_resale:${uid}:${w.id}:${idem}` : null });
    invalidate(app, uid); return { ok: true, received: back, cash: balanceOf(app.db, cashId(uid)), worn: wearView(app, uid) };
  })();
}
