// Gun shop: buy once, keep forever, carry one equipped gun into fights.
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { isOpen, venueDef } from './venues.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { addMood, notify } from './economy.js';
import * as DEFAULT from '../config/guns.js';

export const cfgOf = (app) => app.balance.guns || { GUNS: DEFAULT.GUNS, GUN_RULES: DEFAULT.GUN_RULES };
const itemOf = (app, id) => cfgOf(app).GUNS.find(g => g.id === id);
const MOOD_BUY = 3;

const gunVenue = (app, venueId) => {
  const v = venueDef(app, venueId);
  if (!v || !v.gunShop) bad('NO_SHOP', 'No such gun shop.', 404);
  return v;
};

export function catalogue(app) {
  const C = cfgOf(app);
  return { items: C.GUNS.map(g => ({ id: g.id, name: g.name, price: g.price, strength: g.strength, damageMult: g.damageMult, blurb: g.blurb })), rules: C.GUN_RULES, shop: C.GUN_RULES.shop };
}

export function equippedId(app, uid) {
  return app.db.prepare('SELECT item_id FROM guns_equipped WHERE user_id=?').get(uid)?.item_id || null;
}

export function equippedGun(app, uid) {
  const id = equippedId(app, uid); return id ? itemOf(app, id) : null;
}

export function gunView(app, uid) {
  const C = cfgOf(app);
  const own = app.db.prepare('SELECT item_id, price_paid, bought_at FROM guns_owned WHERE user_id=?').all(uid);
  const eq = equippedId(app, uid);
  const equipped = eq ? itemOf(app, eq) : null;
  return {
    owned: own.map(r => { const g = itemOf(app, r.item_id); return g ? { id: g.id, name: g.name, price: g.price, strength: g.strength, pricePaid: r.price_paid, equipped: r.item_id === eq } : null; }).filter(Boolean),
    equipped: equipped ? { id: equipped.id, name: equipped.name, strength: equipped.strength, damageMult: equipped.damageMult } : null,
    ownedCount: own.length,
    ownedValue: own.reduce((s, r) => s + r.price_paid, 0),
    status: equipped ? `Carrying ${equipped.name}` : own.length ? 'Guns in the stash (none carried)' : 'No guns'
  };
}

export function shopView(app, uid, venueId) {
  const v = gunVenue(app, venueId); const C = cfgOf(app);
  const own = new Set(app.db.prepare('SELECT item_id FROM guns_owned WHERE user_id=?').all(uid).map(r => r.item_id));
  const eq = equippedId(app, uid); const cash = balanceOf(app.db, cashId(uid));
  const items = C.GUNS.map(g => ({
    id: g.id, name: g.name, price: g.price, strength: g.strength, damageMult: g.damageMult, blurb: g.blurb,
    owned: own.has(g.id), equipped: eq === g.id, canAfford: cash >= g.price
  })).sort((a, b) => a.price - b.price);
  return { venueId, name: v.name, open: isOpen(app, v), hours: v.hours, cash, items, note: 'Prices are placeholders (ESTIMATE). Game money only. You keep what you buy. Carry one gun at a time into fights.' };
}

export function buy(app, uid, venueId, itemId, idem) {
  const v = gunVenue(app, venueId); const g = itemOf(app, itemId); if (!g) bad('NO_ITEM', 'This shop does not sell that.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== venueId) bad('NOT_INSIDE', 'Step inside the armoury first.', 409);
  if (!isOpen(app, v)) bad('CLOSED', `${v.name} is closed. Opens ${v.hours[0]}:00 to ${v.hours[1]}:00.`, 409, { hours: v.hours });
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT 1 FROM guns_owned WHERE user_id=? AND item_id=?').get(uid, g.id)) bad('ALREADY_OWNED', `You already own the ${g.name}.`, 409);
    if (balanceOf(app.db, cashId(uid)) < g.price) bad('NO_FUNDS', `The ${g.name} costs ₦${g.price.toLocaleString('en-NG')}. You do not have enough cash.`, 402, { need: g.price });
    move(app, { from: cashId(uid), to: SYS.SINK_SHOPS, amount: g.price, reason: 'gun', ref: g.id, userId: uid, idemKey: idem ? `gun:${uid}:${g.id}:${idem}` : null });
    app.db.prepare('INSERT INTO guns_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(uid, g.id, g.price, app.clock.now());
    app.db.prepare('INSERT INTO guns_equipped(user_id,item_id) VALUES (?,?) ON CONFLICT(user_id) DO UPDATE SET item_id=excluded.item_id').run(uid, g.id);
    const mood = addMood(app, uid, MOOD_BUY);
    notify(app, uid, 'venue', `You bought the ${g.name}. Keep it safe.`);
    return { ok: true, charged: g.price, item: { id: g.id, name: g.name }, mood, cash: balanceOf(app.db, cashId(uid)), text: `${g.name} is yours (₦${g.price.toLocaleString('en-NG')}). You are carrying it.`, guns: gunView(app, uid) };
  })();
}

export function equip(app, uid, itemId) {
  const g = itemOf(app, itemId); if (!g) bad('NO_ITEM', 'Unknown gun.', 404);
  if (!app.db.prepare('SELECT 1 FROM guns_owned WHERE user_id=? AND item_id=?').get(uid, g.id)) bad('NOT_OWNED', 'You do not own that.', 409);
  app.db.prepare('INSERT INTO guns_equipped(user_id,item_id) VALUES (?,?) ON CONFLICT(user_id) DO UPDATE SET item_id=excluded.item_id').run(uid, g.id);
  return { ok: true, guns: gunView(app, uid), text: `Carrying ${g.name}.` };
}

export function unequip(app, uid) {
  app.db.prepare('DELETE FROM guns_equipped WHERE user_id=?').run(uid);
  return { ok: true, guns: gunView(app, uid), text: 'Gun holstered.' };
}
