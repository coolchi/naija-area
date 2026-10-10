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
try {
  console.log('Naija Area map navigation smoke (route, autopilot, my house, ETA, stop)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const openMap = async () => { await page.evaluate(() => document.querySelector('#minimap').click()); await page.waitForSelector('#bigmap .bm-canvas', { timeout: 8000 }); await sleep(500); };
  const closeMap = async () => { await page.evaluate(() => document.querySelector('#bmClose')?.click()); await sleep(300); };
  // 1. no home yet: the home button explains instead of failing
  await openMap(); await page.evaluate(() => document.querySelector('#bmHome').click()); await sleep(300); assert.ok(await page.$('#bigmap'), 'map still open'); ok('home button with no home does not break the map'); await closeMap();
  // 2. give the player a home (door from the city config) and see it on the map: marker, search, button
  const myId = await g(page, () => window.__game.user.id); const prop = s.app.city.properties.find(p => p.style === 'selfcon'); s.app.db.prepare('INSERT INTO property_owner(property_id,user_id,mode,custom_name,next_rent_due,missed,since,paid_price) VALUES (?,?,?,?,?,0,?,?)').run(prop.id, myId, 'rent', null, Date.now() + 864e5, Date.now(), 0);
  await g(page, () => window.__game.refreshMe()); await sleep(600); const home = await g(page, () => window.__game.user.home); assert.ok(home && home.door, 'profile has a home with a door');
  await tp(page, 20, 20); await sleep(800); await openMap(); await page.evaluate(() => document.querySelector('#bmHome').click()); await sleep(700); await snap(page, 'nav-map-my-house');
  assert.match(await g(page, () => document.querySelector('.bm-card')?.textContent || ''), /My house/); ok('home button centres the map on My house and opens its card');
  await g(page, () => { const i = document.querySelector('.bm-search'); i.value = 'my house'; i.dispatchEvent(new Event('input')); }); await sleep(300); assert.ok(await g(page, () => [...document.querySelectorAll('.bm-item')].some(b => /My house/.test(b.textContent))), 'search finds my house'); ok('search finds "My house"'); await g(page, () => { document.querySelector('.bm-search').value = ''; document.querySelector('.bm-search').blur(); document.querySelector('.bm-list').classList.add('hidden'); });
  // 3. the card shows an ETA estimate and the three ways to go
  await page.waitForFunction(() => /Route about/.test(document.querySelector('#bmEta')?.textContent || ''), { timeout: 8000 }); const eta = await g(page, () => document.querySelector('#bmEta').textContent); assert.match(eta, /🚶 ~\d+ (s|min)/); assert.match(eta, /estimates/); ok('card shows route length and walking/driving ETA: ' + eta);
  for (const id of ['bmWalk', 'bmDriveMe', 'bmGuide']) assert.ok(await page.$('#' + id), id + ' button'); await snap(page, 'nav-map-card-routes');
  // 4. take me there on foot: the avatar walks by itself and arrives
  const before = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z, cash: window.__game.user.cash ?? null }));
  await page.evaluate(() => document.querySelector('#bmWalk').click()); await sleep(900); assert.equal(await page.$('#bigmap'), null, 'map closed'); assert.ok(await g(page, () => !!window.__game.nav.active && !!window.__game.ctrl.auto), 'autopilot running'); assert.ok(await g(page, () => !document.querySelector('#navChip').classList.contains('hidden')), 'nav chip visible');
  await sleep(2500); const mid = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z, t: document.querySelector('#navText').textContent })); assert.ok(Math.hypot(mid.x - before.x, mid.z - before.z) > 5, 'moved by itself: ' + JSON.stringify(mid)); ok('autopilot walks: ' + mid.t); await snap(page, 'nav-route-3d-walking');
  // 5. user input takes over
  await page.keyboard.down('w'); await sleep(400); await page.keyboard.up('w'); await sleep(300); assert.ok(await g(page, () => !window.__game.nav.active), 'manual input cancels the route'); ok('pressing a key takes over and cancels the route');
  // 6. drive me: the car drives itself part-way, then Stop
  await tp(page, 20, 20); await sleep(600); await openMap(); await page.evaluate(() => document.querySelector('#bmHome').click()); await sleep(500); await page.waitForFunction(() => /Route about/.test(document.querySelector('#bmEta')?.textContent || ''), { timeout: 8000 });
  await page.evaluate(() => document.querySelector('#bmDriveMe').click()); await sleep(1200); assert.equal(await g(page, () => window.__game.ctrl.mode), 'drive'); const d0 = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z })); await sleep(4000); const d1 = await g(page, () => ({ x: window.__game.ctrl.x, z: window.__game.ctrl.z, v: window.__game.ctrl.v, on: !!window.__game.onRoad(window.__game.ctrl.x, window.__game.ctrl.z, 3) }));
  assert.ok(Math.hypot(d1.x - d0.x, d1.z - d0.z) > 15, 'car drove itself'); await snap(page, 'nav-route-3d-driving'); await openMap(); await sleep(500); await snap(page, 'nav-map-route-live'); assert.ok(await g(page, () => !!window.__game.nav.active)); ok('car autopilot drives the route and the map shows it live');
  await closeMap(); await page.evaluate(() => document.querySelector('#navStop').click()); await sleep(400); assert.ok(await g(page, () => !window.__game.nav.active && !window.__game.ctrl.auto), 'Stop cancels'); ok('Stop button gives the controls back');
  // 7. arrival: teleport next to the home door and navigate: must finish and announce arrival, no money moved
  const cash0 = await g(page, () => window.__game.user.cash); await tp(page, home.door.x + 40, home.door.z + 40); await sleep(500); await g(page, (d) => window.__game.nav.start({ x: d.x, z: d.z, name: 'My house' }, { mode: 'walk', auto: true }), home.door); await page.waitForFunction(() => !window.__game.nav.active, { timeout: 40000 });
  const dEnd = await g(page, (d) => Math.hypot(window.__game.ctrl.x - d.x, window.__game.ctrl.z - d.z), home.door); assert.ok(dEnd < 12, 'arrived near the door: ' + dEnd); await g(page, () => window.__game.refreshMe()); await sleep(300); assert.equal(await g(page, () => window.__game.user.cash), cash0, 'navigation costs nothing'); ok(`arrived ${dEnd.toFixed(1)} m from the door, cash unchanged`);
  // 8. other place types: a venue card also offers the routes, and the paid travel option is still there
  await openMap(); await g(page, () => { const i = document.querySelector('.bm-search'); i.value = 'Corner'; i.dispatchEvent(new Event('input')); }); await sleep(300); await page.evaluate(() => document.querySelector('.bm-item').click()); await sleep(500); assert.ok(await page.$('#bmWalk') && await page.$('#bmOpen'), 'venue card has routes and paid travel'); await snap(page, 'nav-map-venue-card'); ok('venue card offers routes and the paid travel option'); await closeMap();
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('NAV SMOKE PASSED');
} catch (e) { failed = true; console.error('NAV SMOKE FAILED:', e.message); try { await snap(await (await browser.pages()).at(-1), 'fail-nav'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
