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

import { safeReason, clinicPlace, healthOf } from '../server/core/crash.js'; import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
let failed = false;
try {
  console.log('Naija Area crash smoke (server decides hits, health bar, clinic, no charge for walking)');
  Object.assign(s.app.balance.crash, { seed: 'smoke-seed', hitChance: 1, graceMs: 0, rollMinMs: 800, cooldownMs: 2500 });
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const myId = await g(page, () => window.__game.user.id); assert.ok(await g(page, () => window.__game.cfg.crash.enabled), 'config says crash is on'); assert.ok(await page.$('#healthBar'), 'health bar exists');
  const hit = async (label) => {
    for (let attempt = 0; attempt < 6; attempt++) {
      const cands = await g(page, () => { const T = window.__game.traffic, G = window.__game; return T.cars.map((c, i) => { const y = c.g.rotation.y, p = { x: c.g.position.x + Math.cos(y) * 9, z: c.g.position.z - Math.sin(y) * 9 }; const r0 = G.onRoad(c.g.position.x, c.g.position.z, 0), r1 = G.onRoad(p.x, p.z, 0); return r0 && r1 && r0.kind === 'road' && r1.kind === 'road' && r0.id === r1.id && c.st && c.st.v > 5 ? { i, ...p } : null; }).filter(Boolean); });
      const c = cands.find(q => !safeReason(s.app, q.x, q.z)); if (!c) { await sleep(1500); continue; }
      await g(page, () => { window.__game.crash.lastResult = null; }); await g(page, () => { window.__game.crash.next = 0; });
      await tp(page, c.x, c.z); for (let k = 0; k < 16; k++) { await sleep(500); if (await g(page, () => !!window.__game.crash.lastResult)) return g(page, () => window.__game.crash.lastResult); }
    } throw new Error('no hit happened for ' + label + ' events=' + JSON.stringify(s.db.prepare('SELECT state, reason FROM crash_events').all()) + ' client=' + JSON.stringify(await g(page, () => ({ on: window.__game.crash.on, inflight: window.__game.crash.inflight, busy: window.__game.busy, mode: window.__game.ctrl.mode, tok: window.__game.traffic.cars.filter(c => c.crashTok).length }))));
  };
  // 1. a hit on foot: health drops, no money moves, the player is knocked back, a toast and the bar show it
  const cash0 = balanceOf(s.db, cashId(myId)); const r1 = await hit('on foot'); assert.ok(r1.hit && r1.damage >= 12 && r1.health < 100 && r1.fee === 0, JSON.stringify(r1)); await sleep(400); await snap(page, 'crash-hit-on-foot');
  const bar = await g(page, () => parseFloat(document.querySelector('#healthBar').style.width)); assert.ok(bar < 95 && bar > 50, 'health bar shows the loss: ' + bar); assert.equal(balanceOf(s.db, cashId(myId)), cash0, 'walking hit costs no money'); assert.ok(healthOf(s.app, myId).health < 100); ok(`hit on foot: -${r1.damage} health, bar ${Math.round(bar)} %, cash unchanged, server logged it`);
  const row = s.db.prepare("SELECT * FROM crash_events WHERE user_id=? AND state='confirmed'").get(myId); assert.ok(row && row.roll !== null, 'server logged the seeded roll'); ok('server crash log has the seeded roll');
  // 2. cooldown: the next encounters in the next 2.5 s cannot hit (checked on the server by a direct roll)
  const cd = await g(page, async () => (await (await fetch('/api/crash/roll', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ vtype: 'car', speed: 9 }) })).json()).reason); assert.ok(['cooldown', 'wait'].includes(cd), 'cooldown: ' + cd); ok('cooldown holds right after a hit (' + cd + ')');
  // 3. zero health: wake up at the clinic with a small fee, account kept
  await sleep(2800); s.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(4, s.app.clock.now(), myId); const cashK = balanceOf(s.db, cashId(myId)); const r2 = await hit('knock-out'); assert.equal(r2.ko, true); await sleep(1200);
  const cl = clinicPlace(s.app); const d = await g(page, (c) => Math.hypot(window.__game.ctrl.x - c.x, window.__game.ctrl.z - c.z), cl); assert.ok(d < 8, 'woke up at the clinic: ' + d); assert.equal(balanceOf(s.db, cashId(myId)), cashK - r2.clinicFee); await snap(page, 'crash-clinic-wakeup'); ok(`knocked out: woke up ${d.toFixed(1)} m from the clinic door, fee ${r2.clinicFee}, health ${r2.health}`);
  // 4. clinic sheet: treat me restores health through the ledger
  await g(page, () => window.__game.ui.place('clinic')); await page.waitForSelector('#clinicTreat', { timeout: 8000 }); await sleep(300); await snap(page, 'crash-clinic-sheet'); const dis = await g(page, () => document.querySelector('#clinicTreat').disabled); assert.equal(dis, false, 'treat button enabled at the door');
  const cashT = balanceOf(s.db, cashId(myId)); await page.evaluate(() => document.querySelector('#clinicTreat').click()); await sleep(1200); assert.ok(healthOf(s.app, myId).health >= 99.9, 'full health'); assert.ok(balanceOf(s.db, cashId(myId)) < cashT); ok('clinic treatment restored full health and charged a fee through the ledger');
  // 5. ambient traffic still yields normally when the server says miss (hit chance 0): a car stops near the player
  s.app.balance.crash.hitChance = 0; await sleep(1000);
  const car0 = await g(page, () => { const T = window.__game.traffic, G = window.__game; const c = T.cars.find(c => { const y = c.g.rotation.y, p = { x: c.g.position.x + Math.cos(y) * 9, z: c.g.position.z - Math.sin(y) * 9 }; const a = G.onRoad(c.g.position.x, c.g.position.z, 0), b = G.onRoad(p.x, p.z, 0); return a && b && a.kind === 'road' && b.kind === 'road' && a.id === b.id; }) || T.cars[0]; const y = c.g.rotation.y; return { x: c.g.position.x + Math.cos(y) * 9, z: c.g.position.z - Math.sin(y) * 9 }; });
  await g(page, () => { window.__game.crash.lastResult = null; }); await tp(page, car0.x, car0.z); let near = []; for (let k = 0; k < 8; k++) { await sleep(1000); near = await g(page, () => { const T = window.__game.traffic, p = window.__game.ctrl; return T.cars.map(c => ({ v: c.st?.v ?? 9, d: Math.hypot(c.g.position.x - p.x, c.g.position.z - p.z) })).filter(c => c.d < 10); }); if (near.some(c => c.v < 0.5)) break; }
  assert.ok(near.some(c => c.v < 0.5), 'a car yielded when the server said miss: ' + JSON.stringify(near)); assert.ok(near.every(c => c.d > 1.5)); assert.equal(await g(page, () => window.__game.crash.lastResult), null, 'no crash on a miss'); ok('server says miss: the car yields as before');
  assert.equal(checkInvariants(s.db).ok, true); ok('ledger balanced');
  const real = errors.filter(e => !/GPU|status of 40[0-9]/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('CRASH SMOKE PASSED');
} catch (e) { failed = true; console.error('CRASH SMOKE FAILED:', e.message); try { await snap(await (await browser.pages()).at(-1), 'fail-crash'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
