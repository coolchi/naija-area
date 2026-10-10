// Sports hall CLIENT side (10 Oct 2026): the animation maths, the 3D props and the stage, all headless (no browser). The server rules are in tests/sports.test.js.
import test from 'node:test'; import assert from 'node:assert/strict'; import * as THREE from 'three';
import { GEOM, standAt, strike, landing, colZ, viewCol, sideSign, toNet, yawOf, beatFor, beatsFor, ballAt, ambientEvents, strokePose, lungePose, cheerPose, slumpPose, idlePose, READY, flightMs, eventText } from '../client/src/sports-anim.js';
import { pingPongTable, tennisCourt, loungeTable, sportsModel, SportsStage, rigPose } from '../client/src/sports3d.js';
import { Crowd } from '../client/src/people.js'; import { PERF } from '../server/config/perf-budget.js';
import * as pingpong from '../server/core/games/pingpong.js'; import * as tennis from '../server/core/games/tennis.js'; import { mulberry32 } from '../server/core/games/rally.js';
const tris = (o) => { let n = 0; o.traverse(m => { if (m.geometry) n += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3; }); return n; };
const finite = (o) => Object.values(o).every(v => Number.isFinite(v));
/** play a whole engine match with two bots and return the final log events (all of them: the engine only keeps 14, so collect after every move) */
function playLog(eng, seed) { const r = mulberry32(seed); const st = eng.newGame(2, r); st.skill = { 0: 0.5, 1: 0.7 }; const all = []; let seen = 0; for (let i = 0; i < 4000 && st.winner == null; i++) { const mv = eng.bot(st, st.turn, r); eng.play(st, st.turn, mv); for (const e of st.log) if (e.i > seen) { all.push(e); seen = e.i; } } return all; }

test('frame: seat 0 stands at -x facing +x, seat 1 at +x facing -x; columns are server columns and a screen mirrors them for seat 1', () => {
  assert.equal(sideSign(0), -1); assert.equal(sideSign(1), 1); assert.equal(toNet(0), 1); assert.equal(yawOf(0), 0); assert.equal(yawOf(1), Math.PI);
  assert.deepEqual([0, 1, 2].map(c => viewCol(0, c)), [0, 1, 2]); assert.deepEqual([0, 1, 2].map(c => viewCol(1, c)), [2, 1, 0]); for (const c of [0, 1, 2]) assert.equal(viewCol(1, viewCol(1, c)), c, 'an involution: tap -> server column -> screen');
  for (const sp of ['pingpong', 'tennis']) { const g = GEOM[sp]; assert.equal(colZ(g, 1), 0); assert.ok(colZ(g, 0) < 0 && colZ(g, 2) > 0); assert.ok(Math.abs(colZ(g, 2)) < g.halfW, 'the columns lie inside the table / court width');
    for (const seat of [0, 1]) for (const depth of [0, 1]) for (const col of [0, 1, 2]) { const l = landing(g, seat, col, depth); assert.equal(Math.sign(l.x), sideSign(seat), 'a ball aimed at a side lands on that side of the net'); assert.ok(Math.abs(l.x) < g.halfLen, 'inside the baseline'); assert.ok(Math.abs(l.z) <= g.halfW); }
    assert.ok(Math.abs(landing(g, 0, 1, 1).x) > Math.abs(landing(g, 0, 1, 0).x), 'deep lands farther from the net than short'); }
});
test('every event of full ping pong and tennis matches becomes a finite beat; balls start and end where the maths says', () => {
  for (const [name, eng] of [['pingpong', pingpong], ['tennis', tennis]]) for (const seed of [1, 2]) {
    const log = playLog(eng, seed); assert.ok(log.length > 100, `${name}: a real match has many events`); const g = GEOM[name]; const kinds = new Set();
    const beats = beatsFor(name, log, [standAt(g, 0), standAt(g, 1)], (s) => ({ push: 0.25, lob: 0.3 }[s] ?? 0.6)); assert.equal(beats.length, log.length);
    for (const b of beats) { kinds.add(b.type); assert.ok(b.dur >= 0 && b.dur <= 1200, `${name} ${b.type} duration ${b.dur}`);
      if (b.path) { for (const u of [0, 0.25, 0.5, 0.75, 1]) { const p = ballAt(b.path, u); assert.ok(finite(p), 'finite ball position'); assert.ok(p.y >= g.floor - 0.001, `${name}: the ball never goes below the surface (${p.y})`); assert.ok(Math.abs(p.z) < 8 && Math.abs(p.x) < 14); }
        const s0 = ballAt(b.path, 0), s1 = ballAt(b.path, 1); assert.ok(Math.hypot(s0.x - b.path[0].a[0], s0.z - b.path[0].a[2]) < 1e-9); assert.ok(Math.abs(s1.x - b.path.at(-1).b[0]) < 1e-9); }
      if (b.type === 'flight') { const bounce = ballAt(b.path, 0.55); assert.ok(Math.abs(bounce.y - (g.floor + g.ballR)) < 0.02, 'it bounces on the table / court at the landing cell'); assert.equal(Math.sign(bounce.x), sideSign(b.receiver), 'the bounce is on the receiver side'); const ev = b.ev; assert.ok(Math.abs(bounce.z - colZ(g, ev.aim)) < 0.02, 'in the aimed column'); }
      if (b.type === 'error' && b.why === 'net') { const e = ballAt(b.path, 1); assert.ok(Math.abs(e.x) < 0.05, 'a net error ends at the net'); } if (b.type === 'error' && b.why === 'out') { assert.ok(Math.abs(ballAt(b.path, 1).x) > g.halfLen, 'an out error ends beyond the baseline'); } }
    assert.ok(['swing', 'flight', 'cheer', 'pause'].every(k => kinds.has(k) || k === 'pause' && name === 'pingpong'), `${name}: swings, flights and cheers all occur (${[...kinds]})`); assert.ok(kinds.has('error'), `${name}: errors occur`); }
});
test('the ball is hit from where the hitter stands and is returned to where the receiver ends up', () => {
  const g = GEOM.tennis; const stands = [standAt(g, 0), standAt(g, 1)]; const ev = { k: 'resolve', hitter: 0, receiver: 1, shot: 'flat', serve: false, aim: 2, depth: 1, cover: [0, 0], reach: 0.5, returned: true };
  const b = beatFor(ev, { sport: 'tennis', stands, pace: () => 0.72 }); const a = strike(g, 0, stands[0]); assert.ok(Math.abs(b.path[0].a[0] - a.x) < 1e-9 && Math.abs(b.path[0].a[2] - a.z) < 1e-9);
  assert.equal(b.coverStand.z, standAt(g, 1, [0, 0]).z, 'the receiver first slides to the cover cell they chose'); assert.ok(b.goalStand.z > b.coverStand.z, 'then to the ball (column 2) when they got it'); assert.ok(b.stretch > 0.3, 'covering the wrong side makes a long lunge');
  const miss = beatFor({ ...ev, returned: false }, { sport: 'tennis', stands, pace: () => 0.72 }); assert.ok(Math.abs(ballAt(miss.path, 1).x) > g.halfLen, 'a ball that is not returned flies past the receiver');
  assert.ok(flightMs(0.95) < flightMs(0.2), 'a smash is faster than a drop'); const bad = beatFor({ k: 'score', score: {} }, { sport: 'tennis', stands, pace: () => 0.5 }); assert.equal(bad.type, 'none');
});
test('poses: a stroke winds up, hits, follows through and returns to ready; overhead shots raise the arm; a lunge grows with the stretch; all finite', () => {
  for (const sp of ['pingpong', 'tennis']) for (const [shot, serve] of [['drive', false], ['lob', false], ['smash', false], ['drop', false], ['flat', true]]) { const a = strokePose(sp, shot, serve, 0), mid = strokePose(sp, shot, serve, 0.5), end = strokePose(sp, shot, serve, 1);
    assert.ok(finite(a) && finite(mid) && finite(end)); assert.ok(Math.abs(end.armR - READY.armR) < 1e-9 && Math.abs(end.lean - READY.lean) < 1e-9, 'it recovers to ready'); assert.ok(strokePose(sp, shot, serve, 0.45).armR !== a.armR, 'the arm moves'); }
  assert.ok(strokePose('tennis', 'flat', true, 0.6).armR > 2, 'a serve reaches overhead'); assert.ok(strokePose('tennis', 'drive', false, 0.6).armR < 2, 'a groundstroke does not'); assert.ok(lungePose(1, 'tennis').crouch > lungePose(0, 'tennis').crouch && lungePose(1).lean > lungePose(0).lean);
  assert.ok(cheerPose(0.3).armR > 2.5 && slumpPose().lean > 0.3 && finite(idlePose(3.3)));
});
test('ambient rally for tables you only watch: alternating hitters, ends with a point, deterministic for a seeded generator', () => {
  const a = ambientEvents('tennis', 4, mulberry32(3)), b = ambientEvents('tennis', 4, mulberry32(3)); assert.deepEqual(a, b); const sends = a.filter(e => e.k === 'send'); assert.equal(sends.length, 4); sends.forEach((e, i) => assert.equal(e.hitter, i % 2)); assert.equal(a.at(-1).k, 'point'); assert.equal(a.filter(e => e.k === 'resolve').at(-1).returned, false);
});
test('rally text reads naturally for both players', () => {
  const names = ['Ada', 'Bola']; const ev = { k: 'resolve', hitter: 1, receiver: 0, shot: 'loop', serve: false, quality: 'good', returned: false };
  assert.equal(eventText(ev, 0, names, { loop: 'Loop (topspin)' }), 'Bola hit a loop (topspin) (good). You could not reach it.'.replace('Bola', '@Bola')); assert.match(eventText({ k: 'point', winner: 0, why: 'ace' }, 0, names), /Point to You \(ace!\)/); assert.match(eventText({ k: 'error', hitter: 0, serve: true, why: 'net' }, 1, names), /@Ada served into the net: fault/); assert.match(eventText({ k: 'fault', hitter: 1 }, 1, names), /second serve/);
});
test('3D props: the table, court and every lounge table build, are finite, and stay within the per-prop triangle budget; a coming-soon table looks different', () => {
  let total = 0; for (const [n, o] of [['pingpong', pingPongTable()], ['tennis', tennisCourt()], ...['whot', 'ludo', 'dominoes', 'draughts', 'ayo', 'football', 'chess', 'wordduel', 'property', 'suwe'].map(k => [k, loungeTable(k, false)]), ['soon', loungeTable('chess', true)]]) { const t = tris(o); total += t; assert.ok(t > 30 && t <= PERF.interior.propTriangles, `${n}: ${t} triangles`);
    o.traverse(m => { if (m.geometry) for (const v of m.geometry.attributes.position.array) assert.ok(Number.isFinite(v), n + ' NaN'); }); }
  assert.ok(total < 12000, 'the whole set is small: ' + total); assert.notEqual(tris(loungeTable('chess', true)), tris(loungeTable('chess', false)));
  const grp = new THREE.Group(); assert.equal(sportsModel({ type: 'game', sport: 'pingpong' }, grp), true); assert.equal(sportsModel({ type: 'game', game: 'whot', compact: true, soon: true }, new THREE.Group()), true); assert.equal(sportsModel({ type: 'game', game: 'whot' }, new THREE.Group()), false, 'normal tables keep the old model');
  const t = pingPongTable(); const box = new THREE.Box3().setFromObject(t); assert.ok(Math.abs((box.max.x - box.min.x) - 2.74) < 0.05 && Math.abs(box.max.y - 0.9) < 0.05, 'a regulation table: 2.74 m long, 76 cm top, net above');
});
test('athlete rig: every part gets a finite matrix, the racket arm swings, crouching shortens the legs, all in the one shared Crowd (7 draw calls)', () => {
  const cr = new Crowd(new THREE.Group(), 2, 5); const rm = new THREE.Matrix4(); const read = (im, i) => { const m = new THREE.Matrix4(); im.getMatrixAt(i, m); return m.elements.slice(); };
  rigPose(cr, 0, 1, 0, 2, 0, { ...READY, armR: 0 }, 0, 0, rm); const down = read(cr.parts.armR, 0); rigPose(cr, 0, 1, 0, 2, 0, { ...READY, armR: 2.5 }, 0, 0, rm); const up = read(cr.parts.armR, 0); assert.notDeepEqual(down, up, 'the right arm moves with armR');
  for (const k in cr.parts) assert.ok(read(cr.parts[k], 0).every(Number.isFinite), k); assert.ok(rm.elements.every(Number.isFinite), 'the racket matrix');
  rigPose(cr, 1, 0, 0, 0, 0, { ...READY, crouch: 0 }, 0, 0, null); const tall = read(cr.parts.head, 1)[13]; rigPose(cr, 1, 0, 0, 0, 0, { ...READY, crouch: 0.3 }, 0, 0, null); assert.ok(read(cr.parts.head, 1)[13] < tall, 'crouching lowers the head'); assert.equal(Object.keys(cr.parts).length, 7);
});
const fakeStation = (id, sport, x, z, match) => ({ id, type: 'game', game: sport, sport, x, z, match });
test('stage: headless run through a real match log: athletes appear when seated, the ball arcs, a long backlog skips ahead, athletes leave after the match', () => {
  const scene = new THREE.Scene(); const venue = { cam: new THREE.PerspectiveCamera(), el: { clientWidth: 1000, clientHeight: 700 }, dist: 16 }; const stage = new SportsStage(scene, () => new THREE.Sprite(new THREE.SpriteMaterial()), venue);
  const sts = [fakeStation('pp1', 'pingpong', -9.5, -6.9, null), fakeStation('tennis1', 'tennis', 3.5, -6.3, null)]; stage.sync(sts); assert.equal(stage.slots.size, 2); const s = stage.slots.get('pp1'); assert.ok(s.ath.every(a => !a.show), 'empty table, nobody there');
  stage.sync([fakeStation('pp1', 'pingpong', -9.5, -6.9, { id: 5, status: 'waiting', players: ['ada'], you: true }), sts[1]]); assert.deepEqual(s.ath.map(a => a.show), [true, false], 'the host waits alone');
  stage.sync([fakeStation('pp1', 'pingpong', -9.5, -6.9, { id: 5, status: 'active', players: ['ada', 'bola'], you: true }), sts[1]]); assert.deepEqual(s.ath.map(a => a.show), [true, true]);
  const log = playLog(pingpong, 7); const view = (upto) => ({ id: 5, board: { log: log.slice(0, upto), shots: [], serves: [] } }); stage.feed('pp1', view(2)); assert.equal(s.queue.length, 0, 'the first sight of a match never replays the old log'); stage.feed('pp1', view(10)); assert.equal(s.queue.length, 8, 'new events queue up');
  let t = 0, ballSeen = 0, flights = 0; const types = new Set(); for (let i = 0; i < 600; i++) { t += 0.033; stage.tick(t); if (s.cur) types.add(s.cur.type); if (s.ball.m.visible) { ballSeen++; assert.ok(Number.isFinite(s.ball.m.position.x + s.ball.m.position.y + s.ball.m.position.z)); assert.ok(s.ball.m.position.y >= 0.7, 'the ball is above the table level'); } if (s.cur?.type === 'flight') flights++; }
  assert.ok(ballSeen > 20 && flights > 5, `the ball was drawn (${ballSeen} frames, ${flights} flight frames)`); assert.ok(types.has('swing') && types.has('flight')); assert.equal(s.queue.length, 0, 'the queue drained');
  stage.feed('pp1', view(300)); assert.ok(s.queue.length <= 8, 'a huge backlog is cut to the latest events'); assert.ok(stage.crowd.parts.torso.count === 4, 'one crowd for all athletes: 2 sport stations x 2');
  stage.sync([fakeStation('pp1', 'pingpong', -9.5, -6.9, null), sts[1]]); for (let i = 0; i < 1200 && s.ath.some(a => a.show); i++) { t += 0.05; stage.tick(t); } assert.ok(s.ath.every(a => !a.show), 'after the match the athletes leave the court (after the last beats play)');
  assert.ok(venue.focus && Number.isFinite(venue.focus.x), 'the camera focus is maintained'); stage.dispose();
});
test('stage: a table you only watch plays a made-up rally by itself; your own match moves the camera to your court and back', () => {
  const venue = { cam: new THREE.PerspectiveCamera(), el: { clientWidth: 1000, clientHeight: 700 }, dist: 16, yaw: 0.63 }; const stage = new SportsStage(new THREE.Scene(), () => new THREE.Sprite(new THREE.SpriteMaterial()), venue);
  stage.sync([fakeStation('t1', 'tennis', 3.5, -6.3, { id: 9, status: 'active', players: ['x', 'y'], you: false })]); const s = stage.slots.get('t1'); assert.ok(s.watch); let t = 0, shown = 0; for (let i = 0; i < 400; i++) { t += 0.05; stage.tick(t); if (s.ball.m.visible) shown++; } assert.ok(shown > 30, 'strangers rally: the ball moves');
  stage.sync([fakeStation('t1', 'tennis', 3.5, -6.3, { id: 9, status: 'active', players: ['x', 'y'], you: true })]); stage.feed('t1', { id: 9, board: { log: [{ i: 1 }], shots: [], serves: [] } }); for (let i = 0; i < 200; i++) { t += 0.05; stage.tick(t); } assert.ok(Math.abs(venue.focus.x - 3.5) < 0.2 && venue.dist > 16 && venue.yaw < 0.2, 'camera moved to the court, turned square on and pulled back for the long tennis court'); assert.ok(venue.cam.view?.enabled, 'the picture is shifted clear of the panel');
  stage.sync([fakeStation('t1', 'tennis', 3.5, -6.3, null)]); for (let i = 0; i < 400; i++) { t += 0.05; stage.tick(t); } assert.ok(Math.abs(venue.dist - 16) < 0.1 && Math.abs(venue.yaw - 0.63) < 0.02 && Math.abs(venue.focus.x) < 0.2, 'and back when you leave'); assert.ok(!venue.cam.view?.enabled);
});
