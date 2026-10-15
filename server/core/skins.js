// Skins shop (Track G item 9): cosmetic looks for your avatar, car and home. GAME MONEY ONLY. Catalogue and prices: server/config/skins.js (ESTIMATES).
// A purchase is ONE balanced ledger transaction (cash -> sys:sink_cosmetics, reason `skin_buy`) plus the ownership row, in one database transaction; a repeated request with the same
// idem key is paid once. Skins never change a gameplay number. They are not tradeable (the marketplace only lists cars and wearables).
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { SKINS, KINDS, skinById, SKIN_RULES } from '../config/skins.js';

const cfgOf = (app) => app.balance.skins || { SKINS, KINDS, skinById, RULES: SKIN_RULES };
const money = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
const defOf = (app, id) => cfgOf(app).skinById[id] || null;
const ownedSet = (app, uid) => new Map(app.db.prepare('SELECT skin_id, how, price_paid FROM skins_owned WHERE user_id=?').all(uid).map(r => [r.skin_id, r]));
export const equippedRows = (app, uid) => app.db.prepare('SELECT slot, skin_id FROM skins_equipped WHERE user_id=?').all(uid);
const invalidate = (app, uid) => { const p = app.world.players.get(uid); if (p) p.skins = undefined; };
const look = (s) => { const { id, kind, name, rarity, color, glow, accent, wall, floor, body, gender } = s; return { id, kind, name, rarity, ...(color ? { color } : {}), ...(glow ? { glow } : {}), ...(accent ? { accent } : {}), ...(wall ? { wall } : {}), ...(floor ? { floor } : {}), ...(body ? { body } : {}), ...(gender ? { gender } : {}) }; };

const genderOf = (app, uid) => {
  const row = app.db.prepare('SELECT gender FROM player_state WHERE user_id=?').get(uid);
  return row?.gender === 'female' ? 'female' : 'male';
};

/** Body upgrades that require a matching profile gender (set at signup). */
const assertBodyGender = (app, uid, d) => {
  if (!d?.gender) return;
  const g = genderOf(app, uid);
  if (d.gender !== g) {
    const need = d.gender === 'female' ? 'Woman' : 'Man';
    bad('WRONG_GENDER', `${d.name} is for ${need} profiles only.`, 409, { need: d.gender, gender: g });
  }
};

/** the public look catalogue (the client needs it to draw what other players wear, drive and own) */
export function catalogue(app) { const C = cfgOf(app); return { kinds: Object.entries(C.KINDS).map(([id, label]) => ({ id, label })), skins: C.SKINS.map(look) }; }

/** compact {a, c} of the avatar and car skins a player has on (null when none), cached on the presence record: what the heartbeat shows other players */
export function wornIds(app, p) {
  if (p.skins === undefined) { const o = {}; for (const r of equippedRows(app, p.id)) { const d = defOf(app, r.skin_id); if (!d) continue; if (r.slot === 'avatar' && d.kind === 'avatar') o.a = d.id; else if (r.slot === 'car' && d.kind === 'car') o.c = d.id; } p.skins = Object.keys(o).length ? o : null; }
  return p.skins;
}
/** the home skin a player has on, if they still own a home (the wall, floor and facade come from it): { id, accent, wall, floor } or null */
export function homeSkinOf(app, uid) {
  if (!uid) return null; const r = app.db.prepare("SELECT skin_id FROM skins_equipped WHERE user_id=? AND slot='home'").get(uid); if (!r) return null; const d = defOf(app, r.skin_id); if (!d || d.kind !== 'home') return null;
  if (!app.db.prepare('SELECT 1 FROM skins_owned WHERE user_id=? AND skin_id=?').get(uid, d.id)) return null; return { id: d.id, name: d.name, accent: d.accent, wall: d.wall, floor: d.floor };
}
/** give a skin to a player (a pass reward, or a test). Returns false if they already had it. */
export function grant(app, uid, skinId, how, pricePaid = 0) {
  const d = defOf(app, skinId); if (!d) bad('NO_SKIN', 'Unknown skin.', 404); if (app.db.prepare('SELECT 1 FROM skins_owned WHERE user_id=? AND skin_id=?').get(uid, d.id)) return false;
  app.db.prepare('INSERT INTO skins_owned(user_id,skin_id,how,price_paid,acquired_at) VALUES (?,?,?,?,?)').run(uid, d.id, how, pricePaid, app.clock.now()); return true;
}

/** the shop window and what you own: every skin with owned / worn / affordable flags */
export function view(app, uid) {
  const C = cfgOf(app); const own = ownedSet(app, uid); const worn = new Map(equippedRows(app, uid).map(r => [r.slot, r.skin_id])); const cash = balanceOf(app.db, cashId(uid));
  const hasHome = !!app.db.prepare('SELECT 1 FROM property_owner WHERE user_id=?').get(uid);
  const gender = genderOf(app, uid);
  // Only list skins this profile can use (Casual Woman is omitted for Man players, and vice versa).
  const items = C.SKINS.filter(s => !s.gender || s.gender === gender).map(s => {
    const o = own.get(s.id);
    return {
      ...look(s), sell: s.sell, price: s.sell === 'shop' ? s.price : null, owned: !!o, how: o?.how || null,
      worn: worn.get(s.kind) === s.id, canAfford: s.sell === 'shop' && cash >= s.price,
      genderOk: true, howToGet: s.sell === 'pass' ? 'Battle pass reward' : null
    };
  });
  const note = gender === 'female'
    ? 'Skins are only for looks: they never change speed, health, prices or rewards. Casual Woman ₦50M (Woman profiles). Prices are placeholders (ESTIMATE). Game money only; they cannot be traded.'
    : 'Skins are only for looks: they never change speed, health, prices or rewards. Soldier Man ₦10B and Casual Man ₦100M (Man profiles). Prices are placeholders (ESTIMATE). Game money only; they cannot be traded.';
  return {
    cash, gender, kinds: Object.entries(C.KINDS).map(([id, label]) => ({ id, label })), items, hasHome, realMoney: C.RULES.realMoney, note
  };
}
export function buy(app, uid, skinId, idem) {
  const d = defOf(app, skinId); if (!d) bad('NO_SKIN', 'We do not sell that.', 404); if (d.sell !== 'shop') bad('NOT_FOR_SALE', `${d.name} cannot be bought. It is a battle pass reward.`, 409);
  const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); if (!u || u.is_bot) bad('NO_PLAYER', 'Unknown player.', 404);
  assertBodyGender(app, uid, d);
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT 1 FROM skins_owned WHERE user_id=? AND skin_id=?').get(uid, d.id)) bad('ALREADY_OWNED', `You already own ${d.name}.`, 409);
    if (balanceOf(app.db, cashId(uid)) < d.price) bad('NO_FUNDS', `${d.name} costs ${money(d.price)}. You do not have enough cash.`, 402, { need: d.price });
    move(app, { from: cashId(uid), to: SYS.SINK_COSMETICS, amount: d.price, reason: 'skin_buy', ref: d.id, userId: uid, idemKey: idem ? `skin:${uid}:${d.id}:${idem}` : null });
    grant(app, uid, d.id, 'shop', d.price);
    // Put it on straight away (body upgrades especially must replace the blocky mesh without a second tap).
    let on = false;
    if (d.kind !== 'home' || app.db.prepare('SELECT 1 FROM property_owner WHERE user_id=?').get(uid)) {
      app.db.prepare('DELETE FROM skins_equipped WHERE user_id=? AND slot=?').run(uid, d.kind);
      app.db.prepare('INSERT INTO skins_equipped(user_id,slot,skin_id) VALUES (?,?,?)').run(uid, d.kind, d.id);
      invalidate(app, uid); on = true;
    }
    return { ok: true, charged: d.price, skin: look(d), cash: balanceOf(app.db, cashId(uid)), text: on ? `${d.name} is on (${money(d.price)}).` : `${d.name} is yours (${money(d.price)}). Wear am when you have a home.` };
  })();
}
export function equip(app, uid, skinId) {
  const d = defOf(app, skinId); if (!d) bad('NO_SKIN', 'Unknown skin.', 404);
  if (!app.db.prepare('SELECT 1 FROM skins_owned WHERE user_id=? AND skin_id=?').get(uid, d.id)) bad('NOT_OWNED', 'You do not own that skin.', 409);
  if (d.kind === 'home' && !app.db.prepare('SELECT 1 FROM property_owner WHERE user_id=?').get(uid)) bad('NO_HOME', 'You need a home to use a home skin.', 409);
  assertBodyGender(app, uid, d);
  app.db.transaction(() => { app.db.prepare('DELETE FROM skins_equipped WHERE user_id=? AND slot=?').run(uid, d.kind); app.db.prepare('INSERT INTO skins_equipped(user_id,slot,skin_id) VALUES (?,?,?)').run(uid, d.kind, d.id); })();
  invalidate(app, uid); return { ok: true, text: `${d.name} is on.`, ...view(app, uid) };
}
export function unequip(app, uid, kind) {
  if (!cfgOf(app).KINDS[kind]) bad('BAD_KIND', 'Unknown kind.'); app.db.prepare('DELETE FROM skins_equipped WHERE user_id=? AND slot=?').run(uid, kind); invalidate(app, uid); return { ok: true, ...view(app, uid) };
}
/** what the profile and the downloads show: what you own */
export const ownedList = (app, uid) => app.db.prepare('SELECT skin_id, how, price_paid, acquired_at FROM skins_owned WHERE user_id=? ORDER BY acquired_at, skin_id').all(uid);
