import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, call } from './helpers.js';
import { startBots } from '../server/bots.js';

test('bots: simulated residents move through the heartbeat path, are flagged as bots, and are excluded from registered players', async () => {
  const s = makeServer(); const b = startBots(s.app, 3); const before = b.bots.map(x => { const p = s.app.world.players.get(x.uid); return [p.x, p.z]; });
  await new Promise(r => setTimeout(r, 4300)); b.stop();
  const moved = b.bots.filter((x, i) => { const p = s.app.world.players.get(x.uid); return Math.hypot(p.x - before[i][0], p.z - before[i][1]) > 1; }).length; assert.ok(moved >= 1, 'at least one bot walked');
  const st = (await call(s, 'GET', '/api/stats', {})).json; assert.equal(st.registeredPlayers, 0); assert.equal(st.simulatedBots, 3); assert.equal(st.onlineNow, 3);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM users WHERE is_bot=1 AND pass_hash IS NOT NULL').get().n, 0); // bots cannot log in
});
test('static pages are served: game, advertise, advertiser, admin, methodology, terms, stats', async () => {
  const s = makeServer(); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try {
    for (const [path, needle] of [['/', 'Naija Area'], ['/advertise', 'billboard'], ['/advertiser', 'campaigns'], ['/admin', 'moderation'], ['/methodology', 'valid impression'], ['/terms', 'pretend money'], ['/stats.html', 'Live numbers'], ['/game.js', '']]) {
      const r = await fetch(base + path); assert.equal(r.status, 200, path); const t = await r.text(); assert.ok(t.includes(needle), `${path} should mention "${needle}"`); }
    assert.ok((await fetch(base + '/api/dev/cash', { method: 'POST' })).status >= 400);
  } finally { await s.close(); }
});
