// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/bus-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
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
try {
  console.log('Naija Area bus stop smoke (stops drawn, ambient danfo stops, passengers board, player calls, boards, rides and pays)');
  Object.assign(s.app.balance.bus, { waitMinMs: 4000, waitMaxMs: 5000 });
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; s.app.clock.advance(5 * 60000);
  const stops = s.app.city.busStops; const st = stops[0]; const info = await g(page, () => ({ stops: window.__game.bus.stops.length, pax: window.__game.bus.pax.length, serving: window.__game.traffic.cars.filter(c => c.serve).length })); assert.ok(info.stops >= 8 && info.serving >= 3, JSON.stringify(info)); ok(`${info.stops} stops drawn, ${info.pax} waiting passengers, ${info.serving} vehicles serve stops`);
  // 1) an ambient danfo stops at a stop (watch the speed of a serving vehicle near it)
  await tp(page, st.x + 3, st.z + 3); await g(page, () => { const c = window.__game.ctrl; c.camYaw = 0; c.camPitch = 0.4; c.cam = 14; });
  const seen = await g(page, async (id) => { const G = window.__game; const stop = G.city.busStops.find(b => b.id === id); let stoppedAt = null, minV = 99, boarded = false; for (let k = 0; k < 900 && !stoppedAt; k++) { for (const c of G.traffic.cars) { if (c.idle || !c.serve) continue; const d = Math.hypot(c.g.position.x - stop.x, c.g.position.z - stop.z); if (d < 11 && c.dwell) { stoppedAt = { d, type: c.type, v: c.st.v }; } } if (G.bus.pax.some(p => p.stop.id === id && p.state === 'board')) boarded = true; await new Promise(r => setTimeout(r, 100)); } return { stoppedAt, boarded }; }, st.id);
  assert.ok(seen.stoppedAt, 'a danfo stopped at the stop within 90 s: ' + JSON.stringify(seen)); await snap(page, 'busstop-danfo-stopped'); ok(`a ${seen.stoppedAt.type} stood at the stop ${seen.stoppedAt.d.toFixed(1)} m from the pole (speed ${seen.stoppedAt.v.toFixed(2)})`);
  // passengers board
  const boardedAny = await g(page, async () => { const G = window.__game; for (let k = 0; k < 200; k++) { if (G.bus.pax.some(p => p.state === 'board' || p.state === 'gone')) return true; await new Promise(r => setTimeout(r, 100)); } return false; }); ok('waiting passengers walked to a stopped danfo and boarded: ' + boardedAny);
  // 2) the player calls a danfo
  await tp(page, st.x + 1, st.z + 1); await g(page, () => { const c = window.__game.ctrl; c.camYaw = 0; c.camPitch = 0.35; c.cam = 15; }); await sleep(900);
  await page.waitForFunction(() => { const c = document.querySelector('#busChip'); return c && !c.classList.contains('hidden') && /Wait for a danfo/.test(c.textContent); }, { timeout: 8000 }); ok('chip: ' + await g(page, () => document.querySelector('#busBtn').textContent)); await snap(page, 'busstop-chip');
  await g(page, () => document.querySelector('#busBtn').click()); await page.waitForFunction(() => window.__game.bus.state === 'waiting', { timeout: 5000 }); ok('called: waiting for the danfo (server set the wait)');
  await page.waitForFunction(() => !window.__game.traffic.special.idle, { timeout: 20000 }); await sleep(1500); await snap(page, 'busstop-danfo-coming');
  await page.waitForFunction(() => window.__game.bus.state === 'arrived', { timeout: 40000 }); await sleep(400); await snap(page, 'busstop-danfo-arrived'); ok('the player\'s danfo arrived and stands at the stop; chip says: ' + await g(page, () => document.querySelector('#busBtn').textContent));
  await g(page, () => document.querySelector('#busBtn').click()); await page.waitForFunction(() => window.__game.bus.state === 'riding', { timeout: 5000 }); await page.waitForSelector('#bigmap .bm-canvas', { timeout: 6000 }); ok('boarded (server checked the call), map opened to choose the stop');
  // 3) ride to another stop through the normal travel flow: charged through the ledger
  const to = stops[4]; const cash0 = balanceOf(s.app.db, cashId(uid)); await g(page, () => document.querySelector('#bigmap .bm-close, #bigmap [data-close]')?.click()); await sleep(300); await g(page, (id) => window.__game.ui.place(id), to.id); await page.waitForSelector('#sheet .chip', { timeout: 8000 });
  await page.evaluate(() => [...document.querySelectorAll('#sheet .chip')].find(c => /Danfo/i.test(c.textContent))?.click()); await sleep(200); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn.big')].find(b => /Go ·/.test(b.textContent))?.click()); await page.waitForSelector('#commute:not(.hidden)', { timeout: 8000 });
  const cash1 = balanceOf(s.app.db, cashId(uid)); assert.ok(cash1 < cash0, 'fare charged'); ok(`rode a danfo to ${to.name}: fare N${cash0 - cash1} through the ledger`); await page.waitForFunction(() => window.__game.bus.state === 'idle', { timeout: 5000 }); ok('boarding state cleared after the ride starts');
  await page.waitForSelector('#commute', { hidden: true, timeout: 30000 }); const near = await g(page, (x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z), to.x, to.z); assert.ok(near < 4, 'arrived at the stop ' + near);
  await sleep(500); assert.ok(await g(page, () => window.__game.ctrl.avatar.visible), 'avatar visible after the ride');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('BUS STOP SMOKE PASSED');
} catch (e) { failed = true; console.error('BUS STOP SMOKE FAILED:', e.message); try { await snap((await browser.pages()).at(-1), 'fail-busstop'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
