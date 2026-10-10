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

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
try {
  console.log('Naija Area night smoke (street lights on/off by the clock, flicker, broken lamps, car headlamps)');
  setClock(23 * 60); // 23:00, about 20 game minutes of margin at the game clock speed
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(3500);
  const st = await g(page, () => { const W = window.__game.world; const col = W.lampHeads.instanceColor?.array; const kinds = { steady: 0, flicker: 0, broken: 0 }; const lit = { steady: 0, flicker: 0, broken: 0 }; W.lamps.forEach(l => { kinds[l.kind]++; if (col && col[l.id * 3] > 0.8) lit[l.kind]++; }); return { n: W.lamps.length, level: W.lampLevel, kinds, lit, poolsVisible: W.lampPools.visible, time: window.__game.worldTime }; });
  assert.ok(st.level > 0.9, 'lamps on at night: ' + JSON.stringify(st)); assert.ok(st.poolsVisible); assert.ok(st.lit.steady > st.kinds.steady * 0.9, 'steady lamps lit ' + JSON.stringify(st)); assert.equal(st.lit.broken, 0, 'broken lamps stay dark'); ok(`night ${st.time.hour}:${String(st.time.minute).padStart(2, '0')}: ${st.n} lamps, ${st.lit.steady}/${st.kinds.steady} steady lit, ${st.kinds.broken} broken stay dark, ${st.kinds.flicker} flicker`);
  // flicker: a flickering lamp changes brightness over a few seconds
  const seen = await g(page, async () => { const W = window.__game.world; const f = W.lamps.filter(l => l.kind === 'flicker').slice(0, 6); const vals = f.map(() => new Set()); for (let k = 0; k < 120; k++) { const col = W.lampHeads.instanceColor.array; f.forEach((l, i) => vals[i].add(col[l.id * 3].toFixed(2))); await new Promise(r => setTimeout(r, 70)); } return vals.map(v => v.size); }); assert.ok(seen.some(n => n >= 2), 'a flickering lamp changed brightness: ' + seen); ok('flickering lamps change brightness (' + seen.join(',') + ' distinct levels over 8 s)');
  // view: stand in the street near a lamp, look along the road
  const lamp = await g(page, () => window.__game.world.lamps.find(l => l.kind === 'steady' && l.z < -5 && l.z > -110 && Math.abs(l.x) < 100)); await tp(page, lamp.x + lamp.fx * 8, lamp.z + lamp.fz * 8); await g(page, () => { const c = window.__game.ctrl; c.camYaw = 0; c.camPitch = 0.42; c.cam = 16; }); await sleep(1500); await snap(page, 'lamps-night-street');
  // driving at night: the car's lamps, beam and spot light
  await g(page, () => window.__game.toggleCar()); await sleep(1500); const hp = await g(page, () => { const p = window.__game.ctrl.carObj.userData.head; return { beam: p.beam.visible, glows: p.glows.every(x => x.visible), spot: p.spot.intensity, amb: window.__game.traffic.heads.beams.visible }; });
  assert.ok(hp.beam && hp.glows && hp.spot > 1 && hp.amb, 'player + ambient headlamps on: ' + JSON.stringify(hp)); await snap(page, 'headlamps-night-driving'); ok('night driving: player lamps, beam and spot light on (spot ' + hp.spot.toFixed(2) + '), ambient vehicles lit');
  const broken = await g(page, () => { const T = window.__game.traffic; const col = T.heads.glows.instanceColor.array; let dead = 0, total = T.cars.length; for (let i = 0; i < total; i++) { const a = col[i * 6], b = col[(i * 6 + 3)]; if ((a < 0.1) !== (b < 0.1) && T.cars[i].type !== 'keke' && T.cars[i].type !== 'okada') dead++; } return { dead, total }; }); ok(`${broken.dead} of ${broken.total} ambient vehicles have one dead headlamp (about 1 in 12 of two-lamp vehicles)`);
  await g(page, () => { const T = window.__game.traffic; const c = T.cars.find(c => c.type === 'car') || T.cars[0]; const y = c.g.rotation.y; const p = window.__game.ctrl; p.teleport(c.g.position.x - Math.cos(y) * 22, c.g.position.z + Math.sin(y) * 22); p.ry = y; p.camYaw = y; }); await sleep(1200); await snap(page, 'headlamps-night-traffic');
  // daylight: lamps and headlamps off
  setClock(12 * 60); await g(page, () => window.__game.net.nudge()); await sleep(4000); const dy = await g(page, () => { const W = window.__game.world; return { level: W.lampLevel, pools: W.lampPools.visible, amb: window.__game.traffic.heads.beams.visible, spot: window.__game.ctrl.carObj.userData.head.spot.intensity, t: window.__game.worldTime.hour }; });
  assert.equal(dy.level, 0, JSON.stringify(dy)); assert.equal(dy.pools, false); assert.equal(dy.amb, false); assert.equal(dy.spot, 0); await snap(page, 'lamps-day-street'); ok('daylight (' + dy.t + ':00): lamps, pools and headlamps all off');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('NIGHT SMOKE PASSED');
} catch (e) { failed = true; console.error('NIGHT SMOKE FAILED:', e.message); try { await snap(await (await browser.pages()).at(-1), 'fail-night'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
