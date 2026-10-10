// Wearables smoke (10 Oct 2026): the jewelry store and cap store from the normal Enter flow, buying through the UI, the avatar wearing it, another player seeing it.
// Usage: npm run build && node scripts/wear-smoke.mjs   (screenshots go to ./screenshots/wear-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, SYS } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/wear-${name}.png` }); };
async function newPage(w = 1280, h = 760, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false, keep = false) => { await g(page, (from, to, hud, keep) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = !!keep; }, from, to, hud, keep); await sleep(1600); };
let failed = false;
try {
  console.log('Naija Area wearables smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id; move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(uid), amount: 200000000, reason: 'test_topup', userId: uid });
  setClock(14 * 60); const J = s.app.city.venueById.venue_jewelry, C = s.app.city.venueById.venue_caps;
  await tp(page, J.x, J.z); await g(page, (id) => window.__game.ui.place(id), J.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await page.waitForFunction(() => window.__game.venue?.open, { timeout: 20000 }); await sleep(2500);
  await snap(page, 'jewelry-interior'); ok('jewelry store opens from the normal Enter flow');
  await page.evaluate(() => document.querySelector('[data-station="cases"]').click()); await page.waitForSelector('[data-buy]', { timeout: 10000 }); await sleep(500); await snap(page, 'jewelry-sheet');
  const n = await g(page, () => document.querySelectorAll('[data-item]').length); assert.ok(n >= 24, 'all jewelry listed: ' + n);
  const buyUi = async (id) => { await page.evaluate((id) => document.querySelector(`[data-buy="${id}"]`).click(), id); await page.waitForSelector(`[data-wear="${id}"]`, { timeout: 10000 }); await sleep(250); };
  for (const id of ['neck_boss', 'wrist_watch_dia', 'ears_bighoop', 'ring_knuckle', 'ankle_gold']) await buyUi(id);
  const worn = await g(page, () => window.__game.ctrl.avatar.userData.wearKey); assert.equal(worn.split(',').length, 5); ok('five pieces bought through the sheet and worn: ' + worn); await snap(page, 'jewelry-bought');
  const cash = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.cash; assert.ok(cash < 200000000 - 3500000 * 3);
  await page.evaluate(() => document.querySelector('#sheetClose, .sheet .close, [data-close]')?.click()); await g(page, () => window.__game.ui.closeSheet()); await sleep(300);
  await g(page, () => window.__game.venue.leave()); await sleep(900);
  await tp(page, C.x, C.z); await g(page, (id) => window.__game.ui.place(id), C.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 10000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await page.waitForFunction((id) => window.__game.venue?.open && window.__game.venue.id === id, { timeout: 20000 }, C.id); await sleep(2500);
  await snap(page, 'caps-interior');
  await page.evaluate(() => document.querySelector('[data-station="crowns"]').click()); await page.waitForSelector('[data-buy]', { timeout: 10000 }); await sleep(500); await snap(page, 'caps-sheet');
  const first = await g(page, () => document.querySelector('[data-item]')?.dataset.item); assert.match(first, /^crown_/, 'the crowns station opens on the crowns first');
  await buyUi('crown_king'); const w2 = await g(page, () => window.__game.ctrl.avatar.userData.wearKey); assert.match(w2, /crown_king/); ok('crown bought and worn: ' + w2);
  await g(page, () => window.__game.ui.closeSheet()); await g(page, () => window.__game.venue.leave()); await sleep(1200);
  // a second player standing nearby sees the dressed avatar (the ghost carries the pieces)
  const page2 = await newPage(1280, 760, true); await page2.goto(base, { waitUntil: 'domcontentloaded' }); await page2.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page2.click('#age18'); await page2.click('#authGo'); await page2.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2000);
  await tp(page2, 3, -6); await tp(page, 4, -6); await g(page, () => { window.__game.ctrl.ry = Math.PI; }); await sleep(5000);
  const seen = await g(page2, () => [...window.__game.ghosts.map.values()].map(x => ({ n: x.name, w: x.obj?.userData?.wearKey || '', mesh: !!x.obj?.userData?.wearMesh }))); console.log('  second player sees:', JSON.stringify(seen)); assert.ok(seen.some(x => x.mesh && /crown_king/.test(x.w)), 'the other player sees the crown'); ok('another player sees the jewelry and the crown');
  await g(page, () => { window.__game.ctrl.ry = 0; }); await cam(page, [10.2, 3.3, -6], [3.2, 1.9, -6], false, true); console.log('  cam', JSON.stringify(await g(page, () => { const G = window.__game; return { cam: G.camera.position.toArray().map(v => +v.toFixed(1)), ctrl: [G.ctrl.x, G.ctrl.z].map(v => +v.toFixed(1)), vis: G.ctrl.avatar.visible, mode: G.ctrl.mode, frozen: G.ctrl.frozen, busy: G.busy, commute: !!G.commute }; }))); await snap(page, 'avatar-front'); await cam(page, [-2.4, 3.6, -6], [3.5, 2.0, -6], false, true); await snap(page, 'avatar-back'); await cam(page, [-1.5, 6.0, -3.2], [3.5, 1.2, -6], false, true); await snap(page, 'avatar-side');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401 GET \/api\/me/.test(e) && !/status of 401/.test(e) && !/HTTP 409 POST/.test(e) && !/status of 409/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' | '));
  console.log('WEAR SMOKE PASSED');
} catch (e) { failed = true; console.error('WEAR SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
