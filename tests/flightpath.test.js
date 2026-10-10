import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { planFlight, flightPose, chaseCam, FLIGHT } from '../client/src/flightpath.js';
const lagos = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))); const prev = JSON.parse(fs.readFileSync(new URL('../server/config/cities/preview-town.json', import.meta.url)));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
for (const [name, city] of [['Lagos', lagos], ['preview town', prev]]) {
  test(`${name}: the flight starts at the apron, takes off down the runway, climbs, and circles at one radius around one centre`, () => {
    const ap = city.airport, plan = planFlight(ap); const p0 = flightPose(plan, 0); assert.ok(Math.hypot(p0.x - ap.apron.x, p0.z - ap.apron.z) < 0.01); assert.equal(p0.y, 0); assert.equal(p0.phase, 'taxi');
    const pr = flightPose(plan, FLIGHT.taxiS + 0.001); assert.ok(Math.hypot(pr.x - ap.runway.x0, pr.z - ap.runway.z0) < 0.5, 'reaches the runway start'); assert.equal(pr.phase, 'roll');
    const pc = flightPose(plan, plan.totalPreCruise + 0.001); assert.ok(Math.abs(pc.y - FLIGHT.climbH) < 1); assert.equal(pc.phase, 'cruise');
    for (const t of [plan.totalPreCruise + 1, plan.totalPreCruise + 20, plan.totalPreCruise + 80]) { const p = flightPose(plan, t); assert.ok(Math.abs(Math.hypot(p.x - plan.c[0], p.z - plan.c[1]) - FLIGHT.circleR) < 0.01, 'on the circle'); }
  });
  test(`${name}: the path is continuous (no jumps at phase borders), never underground, finite, and the plane never goes backwards on the runway`, () => {
    const plan = planFlight(city.airport); let prevP = flightPose(plan, 0), maxStep = 0, lastS = -1;
    for (let t = 0.05; t < 120; t += 0.05) { const p = flightPose(plan, t); assert.ok([p.x, p.y, p.z, p.yaw, p.pitch, p.roll].every(Number.isFinite)); assert.ok(p.y >= 0); const d = dist(p, prevP); maxStep = Math.max(maxStep, d / 0.05); prevP = p; if (p.phase === 'roll') { const s = Math.hypot(p.x - city.airport.runway.x0, p.z - city.airport.runway.z0); assert.ok(s >= lastS - 1e-9); lastS = s; } }
    assert.ok(maxStep < 80, 'max speed m/s ' + maxStep);
  });
  test(`${name}: heading changes smoothly (no snap larger than a few degrees per 50 ms)`, () => {
    const plan = planFlight(city.airport); let last = flightPose(plan, 0).yaw; for (let t = 0.05; t < 60; t += 0.05) { const y = flightPose(plan, t).yaw; let d = Math.abs(((y - last + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI); assert.ok(d < 0.12, `yaw jump ${d} at ${t}`); last = y; }
  });
}
test('the circuit bends toward the middle of the city', () => { const plan = planFlight(lagos.airport, [0, -60]); const other = planFlight(lagos.airport, [900, -60]); assert.notEqual(plan.side, other.side); assert.ok(Math.hypot(plan.c[0], plan.c[1] + 60) < Math.hypot(other.c[0], other.c[1] + 60)); });
test('chase camera sits behind and above the plane and looks ahead', () => { const plan = planFlight(lagos.airport); const p = flightPose(plan, 30); const c = chaseCam(p); assert.ok(c.pos[1] > p.y); const h = -p.yaw; const f = [Math.cos(h), Math.sin(h)]; const back = (c.pos[0] - p.x) * f[0] + (c.pos[2] - p.z) * f[1]; const lookAhead = (c.look[0] - p.x) * f[0] + (c.look[2] - p.z) * f[1]; assert.ok(back < 0 && lookAhead > 0); });
