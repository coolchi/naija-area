// Track G item 7 smoke: real server + headless Chrome. A player flies Lagos to Abuja; a second player near the Lagos airport sees the plane take off; a third player in Abuja sees it land. Looks are NOT judged.
// Usage: npm run build && node scripts/planes-smoke.mjs
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { move, SYS, cashId } from '../server/core/ledger.js'; import { enterCity } from '../server/core/cities.js'; import { buildServer } from '../server/createServer.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); Object.assign(s.app.balance.flight, { departEveryMs: 8000, minLeadMs: 3000, flightMs: 42000, cooldownMs: 0 }); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });

const errors = []; const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const ok = (m) => console.log(`  ✓ ${m}`); let failed = false; let step = 0;
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const newPage = async () => { const p = await (await browser.createBrowserContext()).newPage(); await p.setViewport({ width: 1100, height: 680 }); p.on('pageerror', e => errors.push(String(e))); return p; };
const signIn = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 30000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500); };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 20000 }, x, z); };
try {
  console.log('Naija Area planes smoke, Track G item 7');
  s.app.clock.advance(5 * 60000); const LA = s.app.cities['lagos-mainland'].airport; const AA = s.app.cities.abuja.airport;
  const A = await newPage(); await signIn(A); const uidA = await g(A, () => window.__game.user.id); move(s.app, { from: SYS.FAUCET_START, to: cashId(uidA), amount: 100000, reason: 'starting_cash', userId: uidA, idemKey: 'smoke-a' });
  const B = await newPage(); await signIn(B); await tp(B, LA.door.x - 25, LA.door.z + 14); await g(B, () => { const c = window.__game.ctrl; c.camYaw = 1.2; c.camPitch = 0.35; c.cam = 30; });
  const C = await newPage(); await signIn(C); const uidC = await g(C, () => window.__game.user.id); enterCity(s.app, uidC, 'abuja', { x: AA.apron.x - 50, z: AA.apron.z - 10, ry: 0 }); await C.waitForFunction(() => window.__game.city.id === 'abuja' && window.__game.playing, { timeout: 40000 }); await sleep(2500);
  await tp(A, LA.door.x, LA.door.z + 3); await sleep(1500);
  const board = await g(A, () => fetch('/api/flights').then(r => r.json())); const ab = board.destinations.find(d => d.id === 'abuja'); assert.ok(ab, 'Abuja is on the board'); assert.equal(ab.fare, s.app.balance.flight.routes.abuja.fare); assert.ok(board.destinations.some(d => d.id === 'port-harcourt')); ok(`the board lists Abuja (N${ab.fare}, ${Math.round(ab.flightMs / 1000)} s) and Port Harcourt`);
  const res = await g(A, (to, at) => fetch('/api/flights/buy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ to, departAt: at, idem: 'x' + Math.random() }) }).then(r => r.status), 'abuja', ab.slots[0]); assert.equal(res, 200); ok('ticket bought');
  await A.waitForFunction(() => window.__game.air.flying, { timeout: 40000 }); ok('the passenger is flying');
  await B.waitForFunction(() => window.__game.air.others.size >= 1, { timeout: 30000 }); const bp = await g(B, () => { const m = [...window.__game.air.others.values()][0]; return { y: m.position.y, vis: m.visible }; }); ok('a bystander near the Lagos airport sees the departing plane (y ' + bp.y.toFixed(1) + ')'); await B.screenshot({ path: 'screenshots/planes-departure-bystander.png' });
  await B.waitForFunction(() => window.__game.air.others.size === 0, { timeout: 60000 }); ok('the plane leaves the bystander\'s sky after the climb-out');
  await C.waitForFunction(() => window.__game.air.others.size >= 1 && [...window.__game.air.pl].some(p => p.kind === 'arr'), { timeout: 70000 }); ok('a player in Abuja sees the plane coming in to land'); await C.screenshot({ path: 'screenshots/planes-landing-abuja.png' });
  await A.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 90000 }, 'abuja'); ok('the passenger landed in Abuja');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'page errors: ' + real.join(' || ')); ok('no page errors'); console.log('PLANES SMOKE PASSED');
} catch (e) { failed = true; console.error('PLANES SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
