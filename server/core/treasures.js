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
const cityLabel = (app, cityId) => {
  const c = app.cities?.[cityId]; if (!c) return cityId;
  return c.cityName && c.cityName !== c.name ? `${c.cityName} · ${c.name}` : (c.cityName || c.name || cityId);
};

/** Admin directory: every treasure, who collected it (if any), and where remaining chests still sit. */
export function adminTreasures(app, { city = '', q = '' } = {}) {
  const claims = app.db.prepare(`SELECT tc.treasure_id, tc.user_id, tc.amount, tc.claimed_at, u.username
    FROM treasure_claims tc JOIN users u ON u.id = tc.user_id`).all();
  const byTreasure = new Map(claims.map((r) => [r.treasure_id, r]));
  const cityFilter = String(city || '').trim();
  const query = String(q || '').trim().toLowerCase().replace(/^@/, '');
  const rows = [];
  let collected = 0, remaining = 0, paidOut = 0;
  for (const t of TREASURES) {
    if (cityFilter && t.city !== cityFilter) continue;
    const cl = byTreasure.get(t.id);
    const worth = cl?.amount ?? treasureWorth(t.id);
    const row = {
      id: t.id, cityId: t.city, city: cityLabel(app, t.city), x: t.x, z: t.z, worth,
      taken: !!cl,
      collector: cl ? { id: cl.user_id, username: cl.username } : null,
      claimedAt: cl?.claimed_at || null,
    };
    if (query) {
      const hay = `${row.id} ${row.city} ${row.collector?.username || ''}`.toLowerCase();
      if (!hay.includes(query)) continue;
    }
    if (row.taken) { collected++; paidOut += worth; } else remaining++;
    rows.push(row);
  }
  rows.sort((a, b) => {
    if (a.taken !== b.taken) return a.taken ? 1 : -1; // remaining first
    if (a.cityId !== b.cityId) return a.cityId < b.cityId ? -1 : 1;
    return a.id < b.id ? -1 : 1;
  });
  const cities = [...new Set(TREASURES.map((t) => t.city))].sort().map((id) => ({ id, name: cityLabel(app, id) }));
  return {
    summary: { total: collected + remaining, collected, remaining, paidOut, shown: rows.length, worldTotal: TREASURES.length },
    cities,
    collected: rows.filter((r) => r.taken),
    remaining: rows.filter((r) => !r.taken),
    rows,
  };
}

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
