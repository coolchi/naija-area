// One-time treasures. Each chest pays a fixed amount (₦1 billion to ₦10 billion) to the first player who reaches it.
// The amount is chosen on the server from the treasure id. The client cannot pick it. A second player cannot take the same chest.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bad, GameError } from './util.js';
import { move, cashId, SYS } from './ledger.js';

const REACH_M = 12;
const MIN = 1_000_000_000;
const MAX = 10_000_000_000;

export const TREASURES = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../config/treasures.json'), 'utf8'));
const byId = new Map(TREASURES.map(t => [t.id, t]));

/** ₦1,000,000,000 .. ₦10,000,000,000 in steps of ₦100,000,000. Stable for a given id. */
export function treasureWorth(id) {
  let h = 2166136261;
  for (let i = 0; i < String(id).length; i++) h = Math.imul(h ^ String(id).charCodeAt(i), 16777619);
  return MIN + ((h >>> 0) % 91) * 100_000_000;
}

function takenSet(app) {
  if (!app._treasureTaken) app._treasureTaken = new Set(app.db.prepare('SELECT treasure_id FROM treasure_claims').all().map(r => r.treasure_id));
  return app._treasureTaken;
}
export function publicTreasures(app, cityId) {
  const taken = takenSet(app);
  return TREASURES.filter(t => t.city === cityId).map(t => ({ id: t.id, x: t.x, z: t.z, worth: treasureWorth(t.id), taken: taken.has(t.id) }));
}
export function takenInCity(app, cityId) {
  const taken = takenSet(app);
  return TREASURES.filter(t => t.city === cityId && taken.has(t.id)).map(t => t.id);
}

const naira = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

/** Pay the standing player. One row per treasure, so a second player loses the race. */
export function claimTreasure(app, uid, id) {
  const t = byId.get(id); if (!t) bad('NO_TREASURE', 'That treasure is not here.', 404);
  const p = app.world.players.get(uid); if (!p) bad('NOT_IN_WORLD', 'Join the world first.', 409);
  if (p.city !== t.city) bad('WRONG_CITY', 'That treasure is in another place.', 409);
  if (p.venue) bad('INSIDE', 'Step outside first.', 409);
  if (Math.hypot(p.x - t.x, p.z - t.z) > REACH_M) bad('TOO_FAR', 'Walk up to the treasure first.', 409);
  const amount = treasureWorth(t.id);
  if (amount < MIN || amount > MAX) bad('BAD_TREASURE', 'That treasure is not set up.', 500);
  const now = app.clock.now();
  let result;
  try {
    result = app.db.transaction(() => {
      const ex = app.db.prepare('SELECT user_id, amount FROM treasure_claims WHERE treasure_id=?').get(t.id);
      if (ex) {
        if (ex.user_id === uid) return { ok: true, duplicate: true, amount: ex.amount, id: t.id, text: 'You already took this treasure.' };
        bad('TAKEN', 'Someone already took this treasure.', 409);
      }
      app.db.prepare('INSERT INTO treasure_claims(treasure_id, user_id, amount, claimed_at) VALUES (?,?,?,?)').run(t.id, uid, amount, now);
      move(app, { from: SYS.FAUCET_TREASURE, to: cashId(uid), amount, reason: 'treasure', ref: t.id, userId: uid, idemKey: `treasure:${t.id}` });
      return { ok: true, duplicate: false, amount, id: t.id, text: `You found a treasure worth ${naira(amount)}.` };
    })();
  } catch (e) {
    if (e instanceof GameError) throw e;
    if (/SQLITE_CONSTRAINT/.test(String(e.code || '') + (e.message || ''))) bad('TAKEN', 'Someone already took this treasure.', 409);
    throw e;
  }
  if (!result.duplicate) takenSet(app).add(t.id);
  return result;
}
