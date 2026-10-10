// Track G item 5 smoke: real server + headless Chrome. Jump, lamp and pedestrian collisions, pushable objects, ball throwing seen by a second player. Feel is NOT judged here: only that the rules hold.
// Usage: npm run build && node scripts/physx-smoke.mjs
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

import { PHYSX } from '../server/config/physx.js'; import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js'; import { BALANCE } from '../server/config/balance.js';
let failed = false; const snap = shot;
const signIn = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 20000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(1500); };
try {
  console.log('Naija Area physics smoke, Track G item 5 (jump, props, pedestrians, pushables, throwing)');
  const page = await newPage(); await signIn(page); const myId = await g(page, () => window.__game.user.id); const susp = () => s.app.world.players.get(myId)?.suspicious || 0;
  const open = await g(page, () => { const G = window.__game; for (const r of G.city.roads) for (const p of (r.pts || r.points || [])) { const [x, z] = Array.isArray(p) ? p : [p.x, p.z]; if (G.world.colliders.every(c => x < c.x0 - 40 || x > c.x1 + 40 || z < c.z0 - 40 || z > c.z1 + 40) && Math.abs(x) < 200) return { x, z }; } return null; });
  assert.ok(open, 'found open ground'); await tp(page, open.x, open.z); await sleep(800); const s0 = susp();
  // 1. jump: a Space tap is one hop of about the configured apex; x and z do not move; the server sees nothing odd
  await g(page, () => { window.__j = []; const G = window.__game; clearInterval(window.__jt); window.__jt = setInterval(() => window.__j.push({ t: performance.now(), y: G.ctrl.jump.y, x: G.ctrl.x, z: G.ctrl.z, ay: G.ctrl.avatar.position.y }), 16); G.ctrl.keys.add('j'); setTimeout(() => G.ctrl.keys.delete('j'), 250); }); await sleep(1600); const jr = await g(page, () => { clearInterval(window.__jt); return window.__j; });
  const peak = Math.max(...jr.map(q => q.y)); const up = jr.find(q => q.y > 0.01), down = jr.findLast(q => q.y > 0.01); const air = (down.t - up.t) / 1000; const apex = PHYSX.jump.v0 ** 2 / (2 * PHYSX.jump.gravity);
  assert.ok(peak > apex * 0.75 && peak < apex * 1.1, `apex ${peak} vs ${apex}`); assert.ok(air > 0.45 && air < 1.0, 'airtime ' + air); // headless Chrome runs at about 15 fps, so the measured airtime is coarse
  assert.ok(Math.max(...jr.map(q => q.ay)) > 0.5, 'the avatar is drawn above the ground'); assert.ok(Math.hypot(jr.at(-1).x - jr[0].x, jr.at(-1).z - jr[0].z) < 0.05, 'a jump on the spot goes nowhere'); assert.equal(await g(page, () => window.__game.ctrl.jump.y), 0);
  ok(`jump: apex ${peak.toFixed(2)} m (config ${apex.toFixed(2)}), airtime ${air.toFixed(2)} s`);
  // 2. a lamp post is solid on foot (and cannot be hopped over)
  const lamp = await g(page, () => { const G = window.__game; return G.world.lamps.find(l => G.world.colliders.every(c => l.x < c.x0 - 8 || l.x > c.x1 + 8 || l.z < c.z0 - 8 || l.z > c.z1 + 8) && Math.abs(l.x) < 220); }); assert.ok(lamp, 'a lamp with clear ground around it');
  await tp(page, lamp.x - 4, lamp.z); await sleep(700);
  await g(page, (lamp) => { const G = window.__game, c = G.ctrl; window.__d = []; clearInterval(window.__dt); window.__dt = setInterval(() => window.__d.push({ d: Math.hypot(c.x - lamp.x, c.z - lamp.z), blocked: c.blocked }), 16); c.camYaw = 0; c.keys.add('w'); c.run = true; setTimeout(() => c.keys.add('j'), 700); }, lamp); await sleep(2200);
  const ld = await g(page, () => { clearInterval(window.__dt); const c = window.__game.ctrl; c.keys.clear(); c.run = false; return window.__d; }); const minD = Math.min(...ld.map(q => q.d)); const need = PHYSX.solids.lamp.r + PHYSX.walkerRadius;
  assert.ok(minD > need - 0.08, `walked into the post: closest ${minD.toFixed(2)} (need ${need.toFixed(2)})`); assert.ok(minD < need + 0.35, 'and did reach it (' + minD.toFixed(2) + ')'); ok(`lamp post: closest approach ${minD.toFixed(2)} m, solid radius ${need.toFixed(2)} m, jumping did not carry me through`);
  // 3. a street walker is solid too
  const wk = await g(page, () => { const G = window.__game; const it = G.walkers.items.find(i => i.x !== undefined && Math.abs(i.x) < 200); return it ? { x: it.x, z: it.z } : null; }); assert.ok(wk, 'a walker is out');
  await tp(page, wk.x - 6, wk.z); await sleep(900);
  await g(page, () => { const G = window.__game, c = G.ctrl; const it = G.walkers.items.find(i => Math.hypot(i.x - c.x, i.z - c.z) < 12) || G.walkers.items[0]; window.__d = []; clearInterval(window.__dt); window.__dt = setInterval(() => { const dx = it.x - c.x, dz = it.z - c.z; c.camYaw = Math.atan2(-dz, dx); window.__d.push({ d: Math.hypot(dx, dz) }); }, 16); c.keys.add('w'); c.run = true; }); await sleep(3200);
  const pd = await g(page, () => { clearInterval(window.__dt); const c = window.__game.ctrl; c.keys.clear(); c.run = false; return window.__d; }); const minP = Math.min(...pd.map(q => q.d)); const needP = PHYSX.solids.ped.r + PHYSX.walkerRadius; assert.ok(minP > needP - 0.25, /* a walker moves up to ~0.1 m between two frames at 15 fps */ `ran through a pedestrian: ${minP.toFixed(2)} (need ${needP.toFixed(2)})`); ok(`pedestrian: closest ${minP.toFixed(2)} m (solid ${needP.toFixed(2)} m), ${pd.length} frames sampled`);
  // 4. pushing: run into a crate, barrel or ball: it moves, slows, stops, never ends in a building
  const po = await g(page, () => { const G = window.__game; return G.pushables.items.map((o, i) => ({ i, x: o.home.x, z: o.home.z, kind: o.kind })).find(o => Math.abs(o.x) < 220 && G.world.colliders.every(c => o.x < c.x0 - 14 || o.x > c.x1 + 14 || o.z < c.z0 - 14 || o.z > c.z1 + 14)); }); assert.ok(po, 'a pushable with clear ground'); 
  await tp(page, po.x - 4, po.z); await sleep(800); await g(page, (i) => { const c = window.__game.ctrl; c.camYaw = 0; c.keys.add('w'); c.run = true; window.__pi = i; }, po.i); await sleep(1100); await g(page, () => { const c = window.__game.ctrl; c.keys.clear(); c.run = false; }); await sleep(7000);
  const pu = await g(page, () => { const o = window.__game.pushables.items[window.__pi]; const G = window.__game; return { x: o.x, z: o.z, vx: o.vx, vz: o.vz, home: o.home, inside: G.world.colliders.some(c => o.x > c.x0 && o.x < c.x1 && o.z > c.z0 && o.z < c.z1) }; }); const moved = Math.hypot(pu.x - po.x, pu.z - po.z);
  assert.ok(moved > 0.7 && moved < 14, `${po.kind} moved ${moved.toFixed(2)} m`); assert.equal(pu.vx, 0); assert.equal(pu.inside, false); ok(`pushable ${po.kind}: shoved ${moved.toFixed(1)} m, came to rest, outside every building`);
  // 5. throwing: hold G, let go; the server accepts it, I see the ball, a second player nearby sees it too
  const page2 = await newPage(1000, 600, false, true); await signIn(page2); await tp(page, open.x, open.z); await sleep(600); const p2 = await g(page2, () => window.__game.user.id); await tp(page2, open.x + 8, open.z); await sleep(1500);
  await g(page, () => { const c = window.__game.ctrl; c.ry = 0; c.stun = 0; }); await page.keyboard.down('g'); await sleep(500); await page.keyboard.up('g'); await sleep(500);
  const mine = await g(page, () => ({ n: window.__game.throws.balls.size, y: [...window.__game.throws.balls.values()][0]?.mesh.position.y })); assert.equal(mine.n, 1, 'my ball is in the air'); assert.equal(s.app.throws.live.length, 1, 'the server kept the throw');
  await page2.evaluate(() => window.__game.net.nudge()); await page2.waitForFunction(() => window.__game.throws.balls.size >= 1, { timeout: 15000 }); ok('throw: accepted by the server, drawn for me, and drawn for a second player nearby');
  await sleep(500); const again = await g(page, () => window.__game.ui.toast ? 1 : 0); await shot(page, 'physx-throw'); await shot(page2, 'physx-throw-viewer');
  // too fast: two throws back to back, the second is refused by the server (cooldown), nothing breaks
  await sleep(1400); const live0 = s.app.throws.live.length; await g(page, async () => { await window.__game.throws.fire(0.5); await window.__game.throws.fire(0.5); }); await sleep(300); assert.equal(s.app.throws.live.length, live0 + 1, 'cooldown refused the second of two quick throws'); ok('cooldown: a second throw right after the first is refused by the server');
  // 6. buttons exist for touch users
  for (const id of ['jumpBtn', 'throwBtn']) assert.equal(await g(page, (id) => !!document.getElementById(id) && !document.getElementById(id).classList.contains('hidden'), id), true, id); ok('jump and throw buttons are on screen');
  assert.ok(susp() - s0 < 12, 'the server did not trim the run: ' + (susp() - s0)); assert.equal(checkInvariants(s.db).ok, true); ok('ledger balanced (nothing here touches money)');
  const real = errors.filter(e => !/GPU|status of (40[0-9]|429)/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('PHYSX SMOKE PASSED');
} catch (e) { failed = true; console.error('PHYSX SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); try { await shot(await (await browser.pages()).at(-1), 'fail-physx'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
