// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/roads-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/${String(++step).padStart(2, '0')}-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js'; import { BALANCE } from '../server/config/balance.js';
const MV = BALANCE.movement; let failed = false;
try {
  console.log('Naija Area physics smoke (speed stays under the server clamp, ramps, wall slide, knock slide, no trimming by the server)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(1500);
  const myId = await g(page, () => window.__game.user.id); const susp = () => s.app.world.players.get(myId)?.suspicious || 0;
  await g(page, () => { window.__rec = []; clearInterval(window.__recT); const G = window.__game; window.__recT = setInterval(() => { const c = G.ctrl; window.__rec.push({ t: performance.now(), x: c.x, z: c.z, v: c.v, lat: c.car.lat, mode: c.mode, shake: c.shake, blocked: c.blocked, roll: c.susp.roll, pitch: c.susp.pitch, ry: c.ry }); }, 25); });
  const rec = async () => g(page, () => { const r = window.__rec; window.__rec = []; return r; });
  const flush = async () => { await g(page, () => window.__game.net.nudge()); await sleep(1800); };
  // a spot with no collider within 40 m
  const open = await g(page, () => { const G = window.__game; for (const r of G.city.roads) for (const p of (r.pts || r.points || [])) { const [x, z] = Array.isArray(p) ? p : [p.x, p.z]; if (G.world.colliders.every(c => x < c.x0 - 40 || x > c.x1 + 40 || z < c.z0 - 40 || z > c.z1 + 40)) return { x, z }; } return null; });
  assert.ok(open, 'found open ground'); await tp(page, open.x, open.z); await sleep(800); await flush(); const base0 = susp(); await rec();
  const fps = await g(page, async () => { let n = 0; const t0 = performance.now(); await new Promise(res => { const f = () => { n++; if (performance.now() - t0 > 1000) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }); return n; }); console.log(`  (headless frame rate about ${fps} fps)`);
  // 1. walk: ramp up, never above the run speed, glide to a stop
  await g(page, () => { window.__game.ctrl.keys.add('w'); window.__game.ctrl.run = true; }); await sleep(1600); await g(page, () => { window.__game.ctrl.keys.delete('w'); }); await sleep(900); let r = await rec();
  const walk = r.filter(q => q.mode === 'walk'); const vmax = Math.max(...walk.map(q => q.v)); assert.ok(vmax <= MV.maxWalkSpeed + 1e-6 && vmax > 5, 'walk top speed ' + vmax); const up = walk.findIndex(q => q.v > 0.2); assert.ok(walk[up].v < vmax * 0.8, 'first moving sample is below top speed (ramp): ' + walk[up].v);
  const dn = walk.findIndex((q, i) => i > up && q.v === vmax || q.v > vmax - 0.01); const after = walk.slice(walk.findLastIndex(q => q.v > vmax - 0.05)); assert.ok(after.some(q => q.v > 0.3 && q.v < vmax - 0.3), 'a glide down (some in-between speeds), not an instant stop'); void dn; assert.equal(walk.at(-1).v, 0); ok(`walking: top ${vmax.toFixed(2)} m/s (server clamp ${MV.maxWalkSpeed}), ramps up and glides to a stop`);
  // 2. drive: ramp, top speed, handbrake slide
  await g(page, () => window.__game.toggleCar()); await sleep(300); assert.equal(await g(page, () => window.__game.ctrl.mode), 'drive'); await rec();
  await g(page, () => window.__game.ctrl.keys.add('w')); await sleep(2300); await g(page, () => { window.__game.ctrl.keys.add('d'); window.__game.ctrl.keys.add(' '); window.__game.ctrl.hand = true; }); await sleep(1400); await g(page, () => { window.__game.ctrl.keys.delete('d'); window.__game.ctrl.keys.delete(' '); window.__game.ctrl.hand = false; });
  await sleep(800); await g(page, () => { const k = window.__game.ctrl.keys; k.delete('w'); k.add('s'); }); await sleep(2500); await g(page, () => window.__game.ctrl.keys.delete('s')); r = await rec();
  const dr = r.filter(q => q.mode === 'drive'); const dv = Math.max(...dr.map(q => Math.abs(q.v))); assert.ok(dv > 8 && dv <= 20 + 1e-6 && dv <= MV.maxDriveSpeed, 'drive top speed ' + dv); const first = dr.findIndex(q => q.v > 0.3); assert.ok(dr[first].v < 8, 'throttle ramps, no instant jump: ' + dr[first].v); const lat = Math.max(...dr.map(q => Math.abs(q.lat))); assert.ok(lat > 0.3, 'the handbrake turn slid sideways: ' + lat.toFixed(2)); const roll = Math.max(...dr.map(q => Math.abs(q.roll))); assert.ok(roll > 0.005 && roll <= 0.2, 'body rolled: ' + roll.toFixed(3));
  ok(`driving: top ${dv.toFixed(2)} m/s (server clamp ${MV.maxDriveSpeed}), first sample ${dr[first].v.toFixed(2)} m/s, slide up to ${lat.toFixed(2)} m/s sideways, body roll ${roll.toFixed(3)} rad`);
  // 3. wall: drive at a building box, never end up inside, shake, slow down, then slide out
  const wall = await g(page, () => { const G = window.__game; const cs = G.world.colliders.filter(c => c.x1 - c.x0 > 8 && c.z1 - c.z0 > 8 && c.x1 - c.x0 < 80); for (const c of cs) { const x = c.x0 - 14, z = (c.z0 + c.z1) / 2; if (G.world.colliders.every(o => o === c || x < o.x0 - 8 || x > o.x1 + 8 || z < o.z0 - 8 || z > o.z1 + 8) && x > G.city.bounds.minX + 8) return { x, z, x0: c.x0, z0: c.z0, z1: c.z1 }; } return null; }); assert.ok(wall, 'a building with a clear run-up');
  await tp(page, wall.x, wall.z); await sleep(700); await g(page, () => { const c = window.__game.ctrl; c.ry = 0; c.car.v = 15; c.car.th = 1; c.car.lat = 0; c.v = 15; c.mode === 'drive' || window.__game.toggleCar(); }); await rec(); await g(page, () => window.__game.ctrl.keys.add('w')); await sleep(2800); await g(page, () => window.__game.ctrl.keys.delete('w')); r = await rec();
  const hit = r.findIndex(q => q.blocked); assert.ok(hit > 0, 'the car reached the wall'); assert.ok(r.every(q => q.x <= wall.x0 - 2.0 + 0.05), 'never inside the building'); const sh = Math.max(...r.map(q => q.shake)); assert.ok(sh > 0.05, 'camera shake on impact: ' + sh.toFixed(2)); const vbefore = Math.max(...r.slice(0, hit).map(q => q.v)), vafter = r[Math.min(r.length - 1, hit + 2)].v; assert.ok(vafter < vbefore * 0.6, `speed lost at the wall: ${vbefore.toFixed(1)} -> ${vafter.toFixed(1)}`);
  ok(`wall: hit at ${vbefore.toFixed(1)} m/s, speed after ${vafter.toFixed(1)}, camera shake ${sh.toFixed(2)}, never inside the box`);
  await g(page, () => window.__game.ctrl.keys.clear()); await shot(page, 'physics-wall');
  // 4. knock-back slide on foot (server still decides hits: this calls the client animation directly)
  await tp(page, open.x, open.z); await sleep(700); await g(page, () => { const G = window.__game; if (G.ctrl.mode !== 'walk') G.toggleCar(); }); await sleep(500); await flush(); const b1 = susp(); await rec();
  await g(page, () => { window.__game.ctrl.knock(1, 0); window.__game.ctrl.stun = 0.9; }); await sleep(1600); r = await rec(); const k0 = r[0]; const kend = r.at(-1); const slid = Math.hypot(kend.x - k0.x, kend.z - k0.z); assert.ok(slid > 2.2 && slid < 3.4, 'slid about 3 m: ' + slid.toFixed(2)); let maxJump = 0; for (let i = 1; i < r.length; i++) maxJump = Math.max(maxJump, Math.hypot(r[i].x - r[i - 1].x, r[i].z - r[i - 1].z)); assert.ok(maxJump < 2.0, 'a slide over several frames, not a teleport: biggest step ' + maxJump.toFixed(2) + ' m');
  ok(`knock-back: slid ${slid.toFixed(2)} m, biggest single-frame step ${maxJump.toFixed(2)} m`);
  // 5. nothing was trimmed by the server
  await flush(); assert.equal(susp(), b1, 'the server trimmed nothing during the knock-back'); assert.equal(susp() - base0 >= 0, true); console.log(`  server suspicious counter: baseline ${base0}, now ${susp()} (teleports from the test itself are the only things that may count)`);
  assert.equal(checkInvariants(s.db).ok, true); ok('ledger balanced');
  const real = errors.filter(e => !/GPU|status of 40[0-9]/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('PHYSICS SMOKE PASSED');
} catch (e) { failed = true; console.error('PHYSICS SMOKE FAILED:', e.stack || e.message); try { await snap(await (await browser.pages()).at(-1), 'fail-physics'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
