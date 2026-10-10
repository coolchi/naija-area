// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/cities-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { enterCity } from '../server/core/cities.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true, cityJson: JSON.parse(fs.readFileSync('server/config/cities/lagos-mainland.json')), extraCities: [JSON.parse(fs.readFileSync(process.env.EXTRA_CITY || 'tests/fixtures/test-town.json'))] }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
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
  console.log('Naija Area multi-city smoke (move a player to the second city; the client loads only that city)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; assert.equal(await g(page, () => window.__game.city.id), 'lagos-mainland'); const nLagos = await g(page, () => window.__game.world.colliders.length); ok(`in Lagos: ${nLagos} colliders`);
  await snap(page, 'city-lagos'); const second = s.app.cities[Object.keys(s.app.cities).find(k => k !== 'lagos-mainland')]; const t0 = Date.now(); enterCity(s.app, uid, second.id);
  await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 40000 }, second.id); await sleep(2500); const tLoad = Date.now() - t0;
  const info = await g(page, () => ({ id: window.__game.city.id, cars: window.__game.traffic.cars.length, colliders: window.__game.world.colliders.length, x: window.__game.ctrl.x, z: window.__game.ctrl.z, loc: document.querySelector('#loc').textContent, boards: Object.keys(window.__game.world.boards).length, props: window.__game.world.colliders.length }));
  assert.equal(info.id, second.id); assert.ok(info.colliders < nLagos, 'smaller city, fewer colliders'); const sp = second.spawns[0]; assert.ok(Math.hypot(info.x - sp.x, info.z - sp.z) < 15, `at the spawn: ${info.x},${info.z}`); ok(`client reloaded into ${second.id} in about ${(tLoad / 1000).toFixed(1)} s: ${info.colliders} colliders, ${info.cars} ambient cars, ${info.boards} boards, location chip "${info.loc}"`);
  await snap(page, 'city-second'); await g(page, () => window.__game.ui.phone()); await sleep(500); await snap(page, 'city-second-phone'); await g(page, () => window.__game.ui.closeSheet?.());
  const places = await g(page, () => fetch('/api/shops').then(r => r.json())); assert.ok(places.shops.every(x => x.id.startsWith(second.id === 'test-town' ? 'tt_' : second.shops[0].id.slice(0, 3)))); ok('shops list is the second city only');
  enterCity(s.app, uid, 'lagos-mainland'); await page.waitForFunction(() => window.__game?.city?.id === 'lagos-mainland' && window.__game.playing, { timeout: 40000 }); ok('and back to Lagos');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('CITIES SMOKE PASSED');
} catch (e) { failed = true; console.error('CITIES SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail-cities'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
