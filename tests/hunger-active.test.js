// Food rework (Sherif, 28 Oct 2026): a full gauge lasts 24 h of ACTIVE play; nothing drains while offline, and no catch-up on login.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, HOUR } from './helpers.js';
import { refreshNeeds } from '../server/core/economy.js';
const full = (s, u) => s.app.db.prepare('UPDATE player_state SET hunger=100, needs_at=? WHERE user_id=?').run(s.app.clock.now(), u);
const hunger = (s, u) => refreshNeeds(s.app, u).hunger;
/** play actively for ms: a refresh (heartbeat) every 10 s */
function play(s, u, ms) { for (let t = 0; t < ms; t += 10000) { s.app.clock.advance(Math.min(10000, ms - t)); refreshNeeds(s.app, u); } }

test('no drain while offline, and no catch-up drain on login after a long absence', async () => {
  const s = makeServer(); const u = mkUser(s); full(s, u); s.app.clock.advance(72 * HOUR);
  assert.equal(hunger(s, u), 100);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); assert.ok(hunger(s, u) > 99.99, 'only the heartbeat itself (ms), never the 72 h away');
});
test('partial: 6 h of active play drains a quarter', () => {
  const s = makeServer(); const u = mkUser(s); full(s, u); play(s, u, 6 * HOUR); assert.ok(Math.abs(hunger(s, u) - 75) < 0.01, String(hunger(s, u)));
});
test('24 h of active play empties a full gauge (and faints at 0); offline breaks in between do not count', () => {
  const s = makeServer(); const u = mkUser(s); full(s, u); play(s, u, 12 * HOUR); s.app.clock.advance(30 * HOUR); refreshNeeds(s.app, u);
  assert.ok(Math.abs(hunger(s, u) - 50) < 0.01); play(s, u, 12 * HOUR); const st = refreshNeeds(s.app, u); assert.ok(st.hunger < 0.01, String(st.hunger));
  assert.equal(s.app.db.prepare('SELECT fainted FROM player_state WHERE user_id=?').get(u).fainted, 1);
});
