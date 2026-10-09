// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && npm run smoke   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers();
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/${String(++step).padStart(2, '0')}-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };
let failed = false;
try {
  console.log('Naija Area e2e smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await shot(page, 'auth'); ok('loading screen -> auth screen');
  await page.click('#authGo'); await page.waitForFunction(() => document.querySelector('#authErr').textContent.includes('18')); ok('18+ confirmation is required');
  await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500); await shot(page, 'spawn'); ok('guest joined the world');
  const me = await g(page, () => window.__game.user); assert.ok(me.guest && me.cash > 0); ok(`guest "${me.username}" has ${me.cash} starting cash`);
  // walk with keyboard
  const p0 = await g(page, () => [window.__game.ctrl.x, window.__game.ctrl.z]); await page.keyboard.down('w'); await sleep(900); await page.keyboard.up('w'); const p1 = await g(page, () => [window.__game.ctrl.x, window.__game.ctrl.z]); assert.ok(Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) > 2); ok('WASD moves the player');
  // heartbeat reached the server
  const live = s.app.world.players.size; assert.ok(live >= 1); ok('server sees the player (heartbeat)');
  // tap-a-place sheet: open the mini-mart, check chips
  await g(page, () => window.__game.ui.place('shop_mart')); await page.waitForSelector('#sheet .chip', { timeout: 8000 }); await sleep(600); await shot(page, 'place-sheet'); const chips = await g(page, () => [...document.querySelectorAll('#sheet .chip')].map(c => c.textContent)); assert.ok(chips.some(c => /Keke/.test(c)) && chips.some(c => /Danfo/.test(c))); ok('place sheet shows fare chips: ' + chips.slice(0, 4).join(' | '));
  const cashBefore = await g(page, () => window.__game.user.cash); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn.big')].find(b => /Go ·/.test(b.textContent))?.click()); await page.waitForSelector('#commute:not(.hidden)'); await sleep(1500); await shot(page, 'commute'); await page.waitForSelector('#commute.hidden', { timeout: 15000 }); const cashAfter = await g(page, () => window.__game.user.cash); assert.ok(cashAfter < cashBefore); ok(`commute done, fare charged (₦${cashBefore - cashAfter})`);
  await sleep(500); const here = await g(page, () => { const g = window.__game; const p = g.city.placeById?.shop_mart || g.city.places.find(p => p.id === 'shop_mart'); return Math.hypot(g.ctrl.x - p.x, g.ctrl.z - p.z); }); assert.ok(here < 3); ok('arrived at the shop');
  // shop sheet with price channels, buy
  await g(page, () => window.__game.ui.place('shop_mart')); await page.waitForFunction(() => document.querySelectorAll('#sheet .list button').length > 0, { timeout: 8000 }); await sleep(300); await shot(page, 'shop-channels');
  const h0 = await g(page, () => window.__game.user.hunger); await page.evaluate(() => document.querySelector('#sheet .list button').click()); await sleep(800); const c2 = await g(page, () => window.__game.user.cash); assert.ok(c2 < cashAfter); ok('bought food at the shop'); await g(page, () => window.__game.ui.closeSheet());
  // work + mini-game
  { const j = s.app.city.jobLoc.job_shop; await tp(page, j.x, j.z); }
  await g(page, () => window.__game.ui.place('job_shop')); await page.waitForSelector('#sheet .card .btn', { timeout: 8000 }); await sleep(300); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /Start shift/.test(b.textContent))?.click()); await sleep(1200);
  await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /Quick task/.test(b.textContent))?.click()); await page.waitForSelector('.mgbar', { timeout: 5000 }); await sleep(700); await shot(page, 'work-minigame'); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /STOP/.test(b.textContent))?.click()); await sleep(800); ok('timed work task mini-game played');
  await g(page, () => window.__game.ui.closeSheet());
  // billboard sheet
  await g(page, () => window.__game.ui.board('bb01')); await sleep(300); await shot(page, 'billboard-sheet'); await g(page, () => window.__game.ui.closeSheet()); ok('billboard sheet opens');
  // house: rent, rename, interior buy mode
  const prop = s.app.city.properties.find(p => p.tier === 1); await tp(page, prop.door.x, prop.door.z);
  await g(page, (id) => window.__game.ui.place(id), prop.id); await page.waitForFunction(() => /Rent ·/.test(document.querySelector('#sheetBody').textContent), { timeout: 8000 }); await sleep(300); await shot(page, 'house-card-available');
  await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /^Rent ·/.test(b.textContent))?.click()); await sleep(400); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /^Pay/.test(b.textContent))?.click()); await sleep(1000);
  assert.ok((await g(page, () => window.__game.user.home))?.id === prop.id); ok('rented a room via Review -> Pay');
  await g(page, (id) => window.__game.ui.place(id), prop.id); await sleep(1200); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /Rename/.test(b.textContent))?.click()); await sleep(300); await page.type('#sheet input', ' Villa'); await sleep(100); await page.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /^Save/.test(b.textContent))?.click()); await sleep(900); const nm = await g(page, () => window.__game.user.home.name); assert.match(nm, /Villa/); await sleep(300); await shot(page, 'house-card-owner'); ok(`house renamed: "${nm}"`);
  await g(page, () => window.__game.ui.closeSheet()); await g(page, () => fetch('/api/topup/test', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: window.__game.cfg.topupOptions.at(-1), idem: 'smoke-topup' }) })); await g(page, () => window.__game.enterHome()); await page.waitForSelector('#interior:not(.hidden) canvas', { timeout: 8000 }); await sleep(800); await page.click('#buyToggle'); await sleep(300);
  await page.evaluate(() => [...document.querySelectorAll('.cat button')].find(b => /Sofa/.test(b.textContent))?.click()); await sleep(200); const pt = await g(page, () => { const I = window.__game.interior; const { w, d } = I.data.room; for (let z = 0; z < d; z++) for (let x = 0; x < w; x++) if (I.canPlace('sofa', x, z, 0)) { const v = new I.cam.position.constructor((x + 1.5) * 1.4, 0, (z + 0.5) * 1.4).project(I.cam); const r = I.canvas.getBoundingClientRect(); return { x: (v.x + 1) / 2 * r.width + r.left, y: (1 - v.y) / 2 * r.height + r.top }; } });
  await page.mouse.move(pt.x, pt.y); await sleep(300); await shot(page, 'interior-buy-mode');
  await page.mouse.click(pt.x, pt.y); await sleep(1200); const placed = s.app.db.prepare('SELECT COUNT(*) n FROM property_items').get().n; assert.equal(placed, 1); ok(`interior buy mode: ${placed} item(s) placed on the grid (server-validated)`); await shot(page, 'interior-placed');
  // two-player knock flow: host stays inside their room; a second browser (fresh session) knocks, host lets them in
  const v = await newPage(1280, 760, false, true); await v.goto(base, { waitUntil: 'domcontentloaded' }); await v.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await v.click('#age18'); await v.click('#authGo'); await v.waitForSelector('#hud:not(.hidden)'); await sleep(1500);
  await tp(v, prop.door.x + 3, prop.door.z + 3); await g(v, (id) => window.__game.ui.place(id), prop.id); await v.waitForFunction(() => /home right now/.test(document.querySelector('#sheetBody').textContent), { timeout: 10000 }); await sleep(300); await shot(v, 'visitor-house-card');
  await v.evaluate(() => [...document.querySelectorAll('#sheet .btn')].find(b => /Visit/.test(b.textContent))?.click()); await v.waitForFunction(() => /Knock knock/.test(document.querySelector('#sheetBody').textContent)); await shot(v, 'visitor-knocking'); ok('visitor knocks (host is home)');
  await page.waitForFunction(() => [...document.querySelectorAll('#toasts .btn')].some(b => /Let in/.test(b.textContent)), { timeout: 10000 }); await shot(page, 'host-sees-knock'); await page.evaluate(() => [...document.querySelectorAll('#toasts .btn')].find(b => /Let in/.test(b.textContent)).click());
  await v.waitForSelector('#interior:not(.hidden) canvas', { timeout: 15000 }); await sleep(800); await shot(v, 'visitor-inside'); const ro = await g(v, () => window.__game.interior.visitor); assert.equal(ro, true); ok('host accepted; visitor is inside in read-only mode');
  assert.equal(await g(v, async () => (await fetch('/api/property/furniture', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ itemId: 'tv' }) })).status), 404); ok('visitor cannot place furniture');
  await v.close(); await page.keyboard.press('Escape'); await sleep(500);
  // phone
  await page.click('#phoneBtn'); await sleep(700); await shot(page, 'phone-wallet'); await g(page, () => window.__game.ui.closeSheet());
  assert.deepEqual(s.app.db.prepare('SELECT COUNT(*) bad FROM (SELECT tx_id FROM ledger_entries GROUP BY tx_id HAVING SUM(amount)!=0)').get(), { bad: 0 }); ok('ledger balanced after the whole session');
  // mobile layout
  const m = await newPage(390, 780, true, true); await m.goto(base, { waitUntil: 'domcontentloaded' }); await m.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await m.click('#age18'); await m.click('#authGo'); await m.waitForSelector('#hud:not(.hidden)'); await sleep(2500); await shot(m, 'mobile-hud'); const joy = await g(m, () => getComputedStyle(document.querySelector('#joy')).display); assert.equal(joy, 'block'); ok('mobile layout: joystick visible');
  await g(m, () => window.__game.ui.place('shop_mart')); await sleep(1200); await shot(m, 'mobile-sheet'); ok('mobile bottom sheet');
  const real = errors.filter(e => !/WebGL|GPU stall|swiftshader/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors');
  console.log('SMOKE PASSED');
} catch (e) { failed = true; console.error('SMOKE FAILED:', e.message); if (errors.length) console.error('page errors:', errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
