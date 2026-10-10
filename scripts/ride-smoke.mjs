// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/ride-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
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
  console.log('Naija Area ride-hailing smoke (phone app, request, driver car drives in, get in, paid trip)');
  Object.assign(s.app.balance.ride, { driverMinM: 70, driverMaxM: 90, driverSpeed: 14 });
  s.app.clock.advance(5 * 60000); const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id;
  await tp(page, -12, -10); await sleep(800); await g(page, () => { const c = window.__game.ctrl; c.camYaw = 0; c.camPitch = 0.5; c.cam = 16; });
  await g(page, () => window.__game.ui.phone()); await page.waitForSelector('.papp[data-app=ride]', { timeout: 8000 }); await snap(page, 'ride-phone-home'); await g(page, () => document.querySelector('.papp[data-app=ride]').click());
  await page.waitForSelector('.ride-dest', { timeout: 8000 }); ok('Oya Ride app is on the phone home screen and lists places'); await g(page, () => document.querySelector('.ride-dest[data-place=venue_motors]').click()); await page.waitForSelector('#rideGo', { timeout: 8000 });
  const label = await g(page, () => document.querySelector('#rideGo').textContent); ok('quote shown: ' + label); await snap(page, 'ride-phone-quote');
  const cash0 = balanceOf(s.app.db, cashId(uid)); await g(page, () => document.querySelector('#rideGo').click()); await page.waitForFunction(() => window.__game.rideSvc.ride, { timeout: 8000 }); assert.equal(balanceOf(s.app.db, cashId(uid)), cash0, 'nothing charged at request'); ok('ride requested, nothing charged yet');
  await sleep(1500); await snap(page, 'ride-driver-coming'); const d0 = await g(page, () => { const r = window.__game.rideSvc; return Math.hypot(r.car.position.x - window.__game.ctrl.x, r.car.position.z - window.__game.ctrl.z); }); await sleep(2500);
  const d1 = await g(page, () => { const r = window.__game.rideSvc; return Math.hypot(r.car.position.x - window.__game.ctrl.x, r.car.position.z - window.__game.ctrl.z); }); assert.ok(d1 < d0 - 3, `driver car approaches: ${d0.toFixed(1)} -> ${d1.toFixed(1)}`); ok(`driver car drives in: ${d0.toFixed(0)} m -> ${d1.toFixed(0)} m`);
  await page.waitForFunction(() => window.__game.rideSvc.ride?.state === 'arrived', { timeout: 60000 }); await sleep(600); const dEnd = await g(page, () => { const r = window.__game.rideSvc; return Math.hypot(r.car.position.x - window.__game.ctrl.x, r.car.position.z - window.__game.ctrl.z); }); assert.ok(dEnd > 2 && dEnd < 8, 'pulled up beside the player: ' + dEnd); await snap(page, 'ride-driver-arrived'); ok(`driver arrived, car pulled up ${dEnd.toFixed(1)} m from the player; chip: ` + await g(page, () => document.querySelector('#rideBtn').textContent));
  await g(page, () => document.querySelector('#rideBtn').click()); await page.waitForSelector('#commute:not(.hidden)', { timeout: 8000 }); const cash1 = balanceOf(s.app.db, cashId(uid)); assert.ok(cash1 < cash0, 'fare charged at get-in'); await sleep(900); await snap(page, 'ride-trip');
  const title = await g(page, () => document.querySelector('#commuteTitle').textContent); assert.ok(/Oya Ride/.test(title), title); assert.equal(await g(page, () => window.__game.ctrl.avatar.visible), false); ok(`trip started: "${title}", fare N${cash0 - cash1} through the ledger, avatar inside the car`);
  await page.waitForSelector('#commute', { hidden: true, timeout: 30000 }); await sleep(600); const pl = s.app.city.placeById.venue_motors; const near = await g(page, (x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z), pl.x, pl.z); assert.ok(near < 4, 'arrived ' + near); assert.ok(await g(page, () => window.__game.ctrl.avatar.visible)); assert.equal(await g(page, () => window.__game.rideSvc.riding), null); ok('arrived at the destination, car gone, avatar back');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('RIDE SMOKE PASSED');
} catch (e) { failed = true; console.error('RIDE SMOKE FAILED:', e.message); try { await snap((await browser.pages()).at(-1), 'fail-ride'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
