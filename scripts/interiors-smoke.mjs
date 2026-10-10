// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/interiors-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
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

let failed = false;
const SHOTS = 'screenshots';
const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };
try {
  console.log('Naija Area interiors smoke (houses by type, every venue, clubs, salons, garage)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(1500);
  const myId = await g(page, () => window.__game.user.id); const { balanceOf, cashId } = await import('../server/core/ledger.js');
  await fetch(base + '/api/topup/test', { method: 'POST', headers: { 'content-type': 'application/json', cookie: await page.evaluate(() => document.cookie) }, body: '{}' }).catch(() => {}); s.app.db.prepare("UPDATE accounts SET balance = balance + 9000000 WHERE id=?").run(cashId(myId)); s.app.db.prepare("UPDATE accounts SET balance = balance - 9000000 WHERE id='sys:faucet_test_topup'").run();
  // ---- houses: one of each type (own home, owner view)
  const types = ['faceyou', 'selfcon', 'flat2', 'bungalow', 'duplex', 'mansion'];
  for (const t of types) {
    const prop = s.app.city.properties.find(p => p.style === t); assert.ok(prop, 'a property of type ' + t);
    s.app.db.prepare('DELETE FROM property_owner WHERE user_id=?').run(myId); s.app.db.prepare('DELETE FROM property_owner WHERE property_id=?').run(prop.id);
    s.app.db.prepare('INSERT INTO property_owner(property_id,user_id,mode,custom_name,next_rent_due,missed,since,paid_price) VALUES (?,?,?,?,?,0,?,?)').run(prop.id, myId, 'rent', null, Date.now() + 864e5, Date.now(), 0);
    await g(page, (id) => window.__game.interior.show(id), prop.id); await page.waitForSelector('#interior:not(.hidden) canvas', { timeout: 15000 }); await sleep(900);
    const lay = await g(page, () => ({ type: window.__game.interior.data.room.type, w: window.__game.interior.data.room.w, d: window.__game.interior.data.room.d }));
    assert.equal(lay.type, t); const T = s.app.balance.housing.types[t]; assert.deepEqual([lay.w, lay.d], T.grid);
    await snap(page, `interior-${t}`); ok(`house type ${t}: ${lay.w}x${lay.d} opened (owner), screenshot interior-${t}.png`);
    await g(page, () => window.__game.interior.leave()); await sleep(500);
  }
  // ---- venues: walk to the door, enter, screenshot
  const names = { venue_mamaput: 'interior-venue-mamaput', venue_viewing: 'interior-venue-viewing', venue_joint: 'interior-venue-joint', venue_meco: 'interior-venue-meco', venue_motors: 'interior-venue-motors', venue_club1: 'club-club1', venue_club2: 'club-club2', venue_salon1: 'salon-salon1', venue_salon2: 'salon-salon2' };
  for (const v of s.app.city.venues) {
    await tp(page, v.x, v.z + 1); await g(page, (id) => window.__game.ui.place(id), v.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click());
    await page.waitForSelector('#venue:not(.hidden) canvas', { timeout: 15000 }); await sleep(1200); await snap(page, names[v.id]); ok(`${v.name}: entered, screenshot ${names[v.id]}.png`);
    if (v.kind === 'club') { await page.evaluate(() => document.querySelector('[data-station=dance]').click()); await sleep(700); await page.evaluate(() => document.querySelector('[data-station=songs]').click()); await page.waitForFunction(() => document.querySelector('#songSlots'), { timeout: 6000 }); await snap(page, `club-${v.id.slice(6)}-songs`); await g(page, () => window.__game.ui.closeSheet()); ok('club: dance + song board'); }
    if (v.kind === 'salon') { const first = v.id === 'venue_salon1'; const c0 = balanceOf(s.app.db, cashId(myId)); await page.evaluate(() => document.querySelector('[data-station=chair1]').click()); await page.waitForSelector('[data-style=trim]', { timeout: 6000 }); await snap(page, `salon-${v.id.slice(6)}-menu`); if (first) { await page.evaluate(() => document.querySelector('[data-style=trim]').click()); await sleep(900); assert.equal(c0 - balanceOf(s.app.db, cashId(myId)), s.app.balance.leisure.salon.styles[0].fee); ok('salon: haircut charged through the ledger'); } else await g(page, () => window.__game.ui.closeSheet()); }
    await page.evaluate(() => document.querySelector('#venueLeave').click()); await sleep(500);
  }
  // ---- garage: buy a car so a slot is filled, then open the garage room
  { const mv = s.app.city.venues.find(x => x.id === 'venue_motors'); await tp(page, mv.x, mv.z + 1); await g(page, () => window.__game.ui.place('venue_motors')); await page.waitForSelector('#venueEnter:not([disabled])'); await page.evaluate(() => document.querySelector('#venueEnter').click()); await page.waitForSelector('#venue:not(.hidden) canvas'); await sleep(600);
    for (const m of ['kekere', 'oga']) { const model = Object.keys(s.app.balance.cars.models)[m === 'kekere' ? 0 : 1]; const r = await g(page, async (model) => { const x = await fetch('/api/garage/buy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ model, idemKey: 'k' + model }) }); return x.status; }, model); assert.equal(r, 200); }
    await page.evaluate(() => document.querySelector('#venueLeave').click()); await sleep(400);
    await g(page, () => window.__game.garage.show()); await page.waitForSelector('#garageView canvas', { timeout: 10000 }); await sleep(1200); await snap(page, 'garage-own'); const n = await g(page, () => window.__game.garage.slotCars.length); assert.equal(n, 2); ok('own garage opened with 2 cars in their slots'); await g(page, () => window.__game.garage.close()); }
  const real = errors.filter(e => !/WebGL|GPU stall|swiftshader/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors');
  console.log('INTERIORS SMOKE PASSED');
} catch (e) { failed = true; console.error('INTERIORS SMOKE FAILED:', e.message); try { let i = 0; for (const pg of await browser.pages()) await pg.screenshot({ path: `${SHOTS}/fail-int-${i++}.png` }); } catch {} }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
