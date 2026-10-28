// Inactivity tax (Sherif, 28 Oct 2026): 1% of cash + bank per full 24 h away past a 24 h grace; under ₦1M exempt; idempotent; never negative.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer as mk, mkUser, ok, DAY, HOUR } from './helpers.js';
const makeServer = () => { const s = mk(); s.app.balance.inactivityTax.enabled = true; return s; };
import { chargeAway, taxCatchUp, tickInactivityTax } from '../server/core/inactivity-tax.js';
import { balanceOf, cashId, savId, move, SYS, checkInvariants } from '../server/core/ledger.js';
import { sanction } from '../server/core/moderation.js';

const away = (s, uid, ms) => s.app.db.prepare('UPDATE users SET last_seen=? WHERE id=?').run(s.app.clock.now() - ms, uid);
const worth = (s, u) => balanceOf(s.app.db, cashId(u)) + balanceOf(s.app.db, savId(u));

test('under ₦1M is exempt', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 999_999 }); away(s, u, 5 * DAY);
  assert.equal(taxCatchUp(s.app, u)?.total || 0, 0); assert.equal(worth(s, u), 999_999);
});
test('no tax within 24 h, 1% after more than 24 h', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10_000_000 }); away(s, u, 23 * HOUR); assert.deepEqual(chargeAway(s.app, u), []);
  away(s, u, 25 * HOUR); const r = taxCatchUp(s.app, u); assert.equal(r.total, 100_000); assert.equal(worth(s, u), 9_900_000); assert.match(r.text, /away 1 day, inactivity tax ₦100,000/);
  const n = s.app.db.prepare("SELECT kind, text FROM notifications WHERE user_id=? ORDER BY id DESC LIMIT 1").get(u); assert.match(n.text, /inactivity tax/);
  assert.equal(Number(s.app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='inactivity_tax' AND user_id=?").get(u).n), 1);
});
test('never charged twice: the scheduled tick and the login catch-up agree', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10_000_000 }); away(s, u, 25 * HOUR);
  assert.equal(tickInactivityTax(s.app, { everyMs: 0 }), 1); assert.equal(tickInactivityTax(s.app, { everyMs: 0 }), 0);
  const r = taxCatchUp(s.app, u); assert.equal(r.total, 100_000); assert.equal(r.charged, 0, 'already charged by the tick, only the notice now');
  assert.equal(taxCatchUp(s.app, u), null); assert.equal(worth(s, u), 9_900_000); assert.equal(checkInvariants(s.app.db).ok, true);
});
test('multi-day: one charge per full day, compounding on what is left, cash first then bank, never negative', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 2_000_000 });
  move(s.app, { from: cashId(u), to: savId(u), amount: 1_990_000, reason: 'deposit', userId: u }); // cash ₦10,000 (+ start cash), bank ₦1.99M
  const start = worth(s, u); away(s, u, 3 * DAY + HOUR); // 73 h away = 3 charges
  const r = taxCatchUp(s.app, u); let w = start; for (let i = 0; i < 3; i++) w -= Math.floor(w * 0.01); assert.equal(worth(s, u), w); assert.equal(r.total, start - w);
  assert.ok(balanceOf(s.app.db, cashId(u)) >= 0 && balanceOf(s.app.db, savId(u)) >= 0); assert.equal(balanceOf(s.app.db, cashId(u)), 0, 'cash used first');
  assert.equal(checkInvariants(s.app.db).ok, true);
});
test('drops under ₦1M part way: later days are free', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1_000_000 }); const w0 = worth(s, u); away(s, u, 10 * DAY);
  taxCatchUp(s.app, u); assert.ok(worth(s, u) >= 990_000 && worth(s, u) < 1_000_000 || w0 > 1_000_000);
});
test('bots, guests and banned players are exempt; the heartbeat path charges a returning session', async () => {
  const s = makeServer(); const b = mkUser(s, { cash: 5e6, bot: true }), g = mkUser(s, { cash: 5e6, guest: true }), x = mkUser(s, { cash: 5e6 });
  const xu = s.app.db.prepare('SELECT username FROM users WHERE id=?').get(x).username; sanction(s.app, { who: xu, kind: 'ban', reason: 'cheating' });
  for (const u of [b, g, x]) { away(s, u, 4 * DAY); assert.deepEqual(chargeAway(s.app, u), []); }
  const p = mkUser(s, { cash: 5e6 }); away(s, p, 2 * DAY + HOUR); const w = worth(s, p);
  await ok(s, 'POST', '/api/heartbeat', { uid: p, body: {} }); assert.ok(worth(s, p) < w);
});
