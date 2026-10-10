// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/parking-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, balanceOf, SYS } from '../server/core/ledger.js';
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
const post = (page, path, body = {}) => page.evaluate((p, b) => fetch(p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }).then(r => r.json()), path, body);
try {
  console.log('Naija Area car park smoke (lots drawn, ambient cars, park with fee, drive lock, take back, map)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; s.app.clock.advance(5 * 60000); move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(uid), amount: 3000000, reason: 'test_topup', userId: uid });
  // buy a car at the showroom (server rules) so parking is possible
  const motors = s.app.city.venues.find(v => v.id === 'venue_motors'); await tp(page, motors.x, motors.z); await sleep(600); await post(page, '/api/venue/enter', { venueId: 'venue_motors' }); const b = await post(page, '/api/garage/buy', { model: 'kekere' }); assert.ok(b.carId, JSON.stringify(b)); await post(page, '/api/venue/leave'); ok('bought a car (server)');
  const lot = s.app.city.carParks.find(l => l.id === 'cp_club1'); await tp(page, lot.x - 30, lot.z + 3); await sleep(500);
  // the lot is drawn and ambient cars stand in it
  const info = await g(page, () => { const P = window.__game.parking.cp; return { lots: P.lots.length, amb: P.amb.size, tris: [...P.amb.values()].reduce((a, m) => a + m.geometry.attributes.position.count / 3, 0) }; }); assert.ok(info.lots >= 4 && info.amb >= 3 && info.tris > 3000, JSON.stringify(info)); ok(`${info.lots} lots drawn, ${info.amb} with ambient parked cars (${Math.round(info.tris)} triangles, one mesh each)`);
  await g(page, () => { const c = window.__game.ctrl; c.camYaw = -Math.PI / 2 + 0.3; c.camPitch = 0.5; c.cam = 20; }); await g(page, () => window.__game.toggleCar()); await sleep(600);
  await tp(page, lot.x - 8, lot.z); await g(page, () => { const c = window.__game.ctrl; c.ry = 0; c.camYaw = 0; c.camPitch = 0.55; c.cam = 17; }); await sleep(2200); await snap(page, 'carpark-lot-ambient');
  // chip offers parking, fee is shown
  await page.waitForFunction(() => { const c = document.querySelector('#parkChip'); return c && !c.classList.contains('hidden') && /Park here/.test(c.textContent); }, { timeout: 8000 }); const label = await g(page, () => document.querySelector('#parkBtn').textContent); assert.ok(/150/.test(label), label); ok('chip: ' + label);
  const cash0 = balanceOf(s.app.db, cashId(uid));
  await g(page, () => document.querySelector('#parkBtn').click()); await page.waitForFunction(() => window.__game.parking.mine, { timeout: 8000 });
  const row = s.app.db.prepare('SELECT * FROM car_parking WHERE user_id=?').get(uid); assert.ok(row && row.lot_id === 'cp_club1', JSON.stringify(row)); assert.equal(s.app.world.players.get(uid).mode, 'walk'); assert.equal(balanceOf(s.app.db, cashId(uid)), cash0 - 150); ok(`parked in bay ${row.bay}, fee ${row.fee} taken through the ledger, player stepped out`);
  await sleep(800); await g(page, () => { const c = window.__game.ctrl; c.camPitch = 0.6; c.cam = 12; }); await sleep(900); await snap(page, 'carpark-parked');
  const drawn = await g(page, () => window.__game.parking.cp.cars.length); assert.equal(drawn, 1); ok('my parked car is drawn with a name tag');
  // drive lock: far away the car button refuses
  await tp(page, lot.x - 60, lot.z + 3); await sleep(500); await g(page, () => window.__game.toggleCar()); await sleep(400); assert.equal(await g(page, () => window.__game.ctrl.mode), 'walk'); const toast = await g(page, () => document.querySelector('#toasts')?.textContent || ''); assert.ok(/parked/i.test(toast), toast); ok('car button refuses while the car is parked elsewhere');
  // take it back
  const mine = await g(page, () => window.__game.parking.mine); await tp(page, mine.x, mine.z + (mine.ry < 0 ? 4 : -4)); await page.waitForFunction(() => { const c = document.querySelector('#parkChip'); return c && !c.classList.contains('hidden') && /Take my car/.test(c.textContent); }, { timeout: 8000 }); await g(page, () => document.querySelector('#parkBtn').click());
  await page.waitForFunction(() => !window.__game.parking.mine && window.__game.ctrl.mode === 'drive', { timeout: 8000 }); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM car_parking').get().n, 0); ok('took the car back: driving again, bay freed');
  // map shows the lots
  await g(page, () => document.querySelector('#minimap').click()); await page.waitForSelector('#bigmap .bm-canvas'); await sleep(600); await snap(page, 'carpark-map'); const found = await g(page, () => [...document.querySelectorAll('#bigmap *')].some(e => /Car Park/.test(e.textContent || ''))); ok('map open' + (found ? ', car parks listed' : ''));
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('CAR PARK SMOKE PASSED');
} catch (e) { failed = true; console.error('CAR PARK SMOKE FAILED:', e.message); try { await snap((await browser.pages()).at(-1), 'fail-carpark'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
