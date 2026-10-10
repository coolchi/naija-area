import test from 'node:test'; import assert from 'node:assert/strict';
import { approachPose, crossPose, boatCam, tripPhase, unit, headingOf } from '../client/src/boatpath.js';

test('the boat comes in from the sea, slows, and stops exactly at the berth', () => {
  const berth = { x: -80, z: 176 }; const out = [0, 1]; let prev = Infinity; for (let i = 0; i <= 20; i++) { const p = approachPose(berth, out, 150, i / 20); const d = Math.hypot(p.x - berth.x, p.z - berth.z); assert.ok(d <= prev + 1e-9, 'never moves away'); prev = d; }
  const s = approachPose(berth, out, 150, 0), e = approachPose(berth, out, 150, 1); assert.ok(Math.abs(Math.hypot(s.x - berth.x, s.z - berth.z) - 150) < 1e-6); assert.ok(Math.hypot(e.x - berth.x, e.z - berth.z) < 1e-6); assert.equal(e.speed, 0);
  assert.ok(Math.abs(approachPose(berth, out, 150, 0.5).z - 176 - 75 * (1 - 0.0)) < 80, 'sane midpoint');
});
test('heading: forward is (cos ry, -sin ry), so sailing along +x is ry 0 and along -z is ry +90 degrees', () => {
  assert.ok(Math.abs(headingOf(1, 0)) < 1e-9); assert.ok(Math.abs(headingOf(0, -1) - Math.PI / 2) < 1e-9); const p = crossPose({ x: 0, z: 0 }, { x: 0, z: 100 }, [0, 1], 300, 0.5); assert.ok(Math.abs(Math.cos(p.ry)) < 1e-9 && Math.sin(p.ry) < 0, 'heads +z');
});
test('crossing: starts at a, ends at b, passes the middle; to another district it sails away out of sight', () => {
  const a = { x: -80, z: 176 }, b = { x: -80, z: 236 }; assert.deepEqual([crossPose(a, b, [0, 1], 300, 0).x, crossPose(a, b, [0, 1], 300, 0).z], [-80, 176]); const e = crossPose(a, b, [0, 1], 300, 1); assert.ok(Math.hypot(e.x - b.x, e.z - b.z) < 1e-9); assert.ok(Math.abs(crossPose(a, b, [0, 1], 300, 0.5).z - 206) < 1e-9);
  const far = crossPose(a, null, [0, 1], 300, 1); assert.equal(far.z, 476); assert.deepEqual(unit(0, 0, 0, 5), [0, 1]);
});
test('trip phases follow the server times: arriving, waiting at the jetty, crossing', () => {
  const t = { state: 'called', calledAt: 1000, boatAt: 21000, expiresAt: 81000, arriveAt: 0, crossMs: 30000 };
  let ph = tripPhase(t, 1000); assert.equal(ph.phase, 'arriving'); assert.equal(ph.t01, 0); ph = tripPhase(t, 11000); assert.ok(Math.abs(ph.t01 - 0.5) < 1e-9); ph = tripPhase(t, 30000); assert.equal(ph.phase, 'waiting'); assert.equal(ph.leftMs, 51000);
  const c = { ...t, state: 'crossing', arriveAt: 100000 }; ph = tripPhase(c, 85000); assert.equal(ph.phase, 'crossing'); assert.ok(Math.abs(ph.t01 - 0.5) < 1e-9); assert.equal(tripPhase(null, 0), null);
});
test('camera sits behind and above the boat, looking ahead', () => { const c = boatCam({ x: 0, z: 0, ry: 0 }); assert.ok(c.pos[0] < 0 && c.pos[1] > 0 && c.look[0] > 0); });
