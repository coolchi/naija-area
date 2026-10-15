import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, ok, call } from './helpers.js';
import * as auth from '../server/core/auth.js';
import { move, cashId, SYS, balanceOf } from '../server/core/ledger.js';
import * as police from '../server/core/police.js';
import * as fight from '../server/core/fight.js';
import { ensurePresence } from '../server/core/world.js';

const fund = (app, uid, n = 500000) => move(app, { from: SYS.FAUCET_START, to: cashId(uid), amount: n, reason: 'test', ref: 'p', userId: uid, idemKey: 'pf' + uid + n + Math.random() });

async function two(s) {
  const a = await auth.signup(s.app, { username: 'cop_ada', password: 'secret-pass-1', age18: true, email: 'cop_ada@example.com' }, 'ip');
  const b = await auth.signup(s.app, { username: 'cop_bola', password: 'secret-pass-1', age18: true, email: 'cop_bola@example.com' }, 'ip');
  fund(s.app, a); fund(s.app, b);
  const st = s.app.all.venueById.venue_police || s.app.city.venues.find(v => v.id === 'venue_police');
  assert.ok(st, 'police venue exists');
  for (const uid of [a, b]) {
    const p = ensurePresence(s.app, uid); p.x = st.x; p.z = st.z; p.venue = st.id;
    s.db.prepare('UPDATE player_state SET x=?, z=? WHERE user_id=?').run(st.x, st.z, uid);
  }
  return { a, b, st };
}

test('police station is on the mainland map with report and bail desks', () => {
  const s = makeServer(); const v = s.app.city.venues.find(x => x.id === 'venue_police');
  assert.ok(v); assert.equal(v.kind, 'police');
  assert.ok(v.stations.some(x => x.type === 'report')); assert.ok(v.stations.some(x => x.type === 'bail'));
  const b = s.app.city.buildings.find(x => x.id === 'b_police'); assert.ok(b && b.label.includes('Police'));
});

test('reporting with fight evidence holds the accused; bail frees them', async () => {
  const s = makeServer(); const { a, b, st } = await two(s);
  // A punches B and takes purse → evidence + auto hold on A
  const pa = ensurePresence(s.app, a); const pb = ensurePresence(s.app, b);
  pa.venue = 'venue_joint'; pb.venue = 'venue_joint'; // same place to fight
  s.app.db.prepare('UPDATE player_state SET strength=? WHERE user_id=?').run(50, a);
  s.app.db.prepare('UPDATE player_state SET strength=? WHERE user_id=?').run(5, b);
  const punch = fight.punch(s.app, a, 'cop_bola', 't1');
  assert.ok(punch.ok);
  let hold = police.activeHold(s.app, a);
  if (punch.purse > 0) assert.ok(hold, 'purse theft auto-holds the attacker');
  else {
    // no purse: B reports assault with evidence
    pa.venue = st.id; pb.venue = st.id;
    police.noteFight(s.app, a, b, { damage: 5 });
    const r = await ok(s, 'POST', '/api/police/report', { uid: b, body: { venueId: st.id, username: 'cop_ada', reason: 'assault' } });
    assert.ok(r.held || r.evidence);
    hold = police.activeHold(s.app, a); assert.ok(hold);
  }
  // put A at station for bail
  pa.venue = st.id; pa.x = st.x; pa.z = st.z;
  const before = balanceOf(s.app.db, cashId(a));
  const bail = await ok(s, 'POST', '/api/police/bail', { uid: a, body: { venueId: st.id, idem: 'bail1' } });
  assert.ok(bail.ok); assert.ok(bail.fee > 0); assert.ok(balanceOf(s.app.db, cashId(a)) <= before - bail.fee);
  assert.equal(police.activeHold(s.app, a), null);
});

test('report without evidence only logs the case', async () => {
  const s = makeServer(); const { a, b, st } = await two(s);
  const r = await ok(s, 'POST', '/api/police/report', { uid: a, body: { venueId: st.id, username: 'cop_bola', reason: 'harassment', detail: 'wahala' } });
  assert.equal(r.evidence, false); assert.ok(/logged/i.test(r.text));
  assert.equal(police.activeHold(s.app, b), null);
  const n = s.db.prepare('SELECT COUNT(*) n FROM police_cases WHERE reporter_id=?').get(a).n;
  assert.ok(n >= 1);
});

test('cannot leave the station while detained', async () => {
  const s = makeServer(); const { a, st } = await two(s);
  police.detain(s.app, a, { reason: 'assault', charge: 0 });
  const p = ensurePresence(s.app, a); p.venue = st.id;
  const r = await call(s, 'POST', '/api/venue/leave', { uid: a, body: {} });
  assert.equal(r.json.error, 'DETAINED');
});
