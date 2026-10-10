// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/airport-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { enterCity } from '../server/core/cities.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true, cityJson: JSON.parse(fs.readFileSync('server/config/cities/lagos-mainland.json')), extraCities: [JSON.parse(fs.readFileSync('server/config/cities/preview-town.json'))] }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
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
  console.log('Naija Area airport smoke (departure board, ticket, take-off, flight, landing in the other city)');
  Object.assign(s.app.balance.flight, { departEveryMs: 8000, minLeadMs: 3000, flightMs: 42000, cooldownMs: 0 });
  s.app.clock.advance(5 * 60000); // before the client logs in, so its clock offset is right
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2000);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; const AP = s.app.cities['lagos-mainland'].airport;
  // give cash so the ticket is affordable, then walk to the terminal
  const { move, cashId, SYS } = await import('../server/core/ledger.js'); move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(uid), amount: 20000, reason: 'smoke', ref: 'smoke' }); await sleep(300);
  await tp(page, AP.door.x - 25, AP.door.z + 14); await g(page, (x, z) => { const c = window.__game.ctrl; c.camYaw = 0.5; c.camPitch = 0.45; c.cam = 38; }); await sleep(2500);
  await g(page, (x, z) => { const c = window.__game.ctrl; c.x = x; c.z = z; c.ry = 0; c.camYaw = 0; c.camPitch = 0.3; c.cam = 20; c.root.position.set(x, 0, z); }, AP.apron.x - 30, AP.apron.z + 4); await sleep(1500); await snap(page, 'airport-apron-parked-plane');
  await tp(page, AP.door.x, AP.door.z + 3); await sleep(1500); await page.waitForFunction(() => !document.querySelector('#airChip').classList.contains('hidden'), { timeout: 10000 }); ok('chip near the terminal: ' + await g(page, () => document.querySelector('#airBtn').textContent));
  await g(page, () => document.querySelector('#airBtn').click()); await page.waitForSelector('.air-dest', { timeout: 8000 }); await snap(page, 'airport-board'); const fare = await g(page, () => document.querySelector('.air-dest .mut').textContent); ok('board: ' + fare);
  const c0 = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.cash; await g(page, () => document.querySelector('.air-dest [data-slot="0"]').click()); await page.waitForFunction(() => window.__game.air.ticket?.state === 'ticketed', { timeout: 8000 });
  const c1 = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.cash; assert.equal(c0 - c1, s.app.balance.flight.fares.otherState); ok(`ticket bought, N${c0 - c1} through the ledger; chip: ` + await g(page, () => document.querySelector('#airBtn').textContent)); await sleep(600); await snap(page, 'airport-ticket-chip');
  await page.waitForFunction(() => window.__game.air.flying, { timeout: 40000 }); ok('departure time reached with the player at the gate: flight scene started');
  await g(page, () => { const a = window.__game.air; a.flight = { ...a.flight, departsAt: window.__game.serverNow() - 600 }; }); // screenshots only: replay the take-off from the start in the client (the server's landing time is untouched)
  const poses = []; for (const [label, wait] of [['taxi', 2200], ['roll', 5200], ['climb', 6500], ['cruise', 6000]]) { await sleep(wait); const p = await g(page, () => ({ x: window.__game.air.plane.position.x, y: window.__game.air.plane.position.y, z: window.__game.air.plane.position.z, vis: window.__game.air.plane.visible, avatar: window.__game.ctrl.avatar.visible, banner: document.querySelector('#airBanner').textContent })); poses.push(p); await snap(page, 'airport-flight-' + label); }
  assert.ok(poses.every(p => p.vis && !p.avatar), 'plane visible, avatar hidden'); assert.ok(poses[0].y < 1 && poses[1].y < 1, 'on the ground while taxiing and rolling'); assert.ok(poses[2].y > 5, 'climbing ' + poses[2].y); assert.ok(poses[3].y > 40, 'cruise altitude ' + poses[3].y); ok(`flight: altitudes ${poses.map(p => Math.round(p.y)).join(' -> ')} m, banner "${poses[3].banner}"`);
  await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, 'preview-town'); await sleep(2500); const dest = s.app.cities['preview-town'].airport.arrive; const at = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z, flying: window.__game.air.flying, cityName: window.__game.city.cityName }));
  assert.ok(Math.hypot(at.x - dest.x, at.z - dest.z) < 10, JSON.stringify(at)); assert.equal(at.flying, false); ok(`landed: now in ${at.cityName} at the airport arrival point`); await snap(page, 'airport-arrived');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('AIRPORT SMOKE PASSED');
} catch (e) { failed = true; console.error('AIRPORT SMOKE FAILED:', e.message, errors.slice(0, 4)); try { await snap((await browser.pages()).at(-1), 'fail-airport'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
