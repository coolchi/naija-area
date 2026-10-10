// Track G smoke (10 Oct 2026): the City life phone app, one section per feature (businesses, marketplace, clubs, weather and events, pass and skins...), driven through the real UI against the real server.
// Usage: npm run build && node scripts/life-smoke.mjs   (screenshots go to ./screenshots/life-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, SYS } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; { const { BUSINESS } = await import('../server/config/business.js'); s.app.balance.business = { ...BUSINESS, guestsMay: true, minAccountAgeMs: 0 }; }
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/life-${name}.png` }); };
async function newPage(w = 1280, h = 760, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false, keep = false) => { await g(page, (from, to, hud, keep) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = !!keep; }, from, to, hud, keep); await sleep(1600); };
let failed = false;
try {
  console.log('Naija Area Track G smoke (City life)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500);
  const me = async () => (await g(page, () => fetch('/api/me').then(r => r.json()))).user; const uid = (await me()).id; move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(uid), amount: 5000000, reason: 'test_topup', userId: uid });
  const openLife = async (tab) => { await page.click('#phoneBtn'); await page.waitForSelector('.pgrid .papp[data-app="life"]', { timeout: 8000 }); await page.evaluate(() => document.querySelector('.papp[data-app="life"]').click()); await page.waitForSelector('#lifeTabs', { timeout: 8000 }); if (tab) { await page.evaluate((t) => document.querySelector(`[data-life="${t}"]`).click(), tab); await sleep(500); } };
  const clickSel = async (sel) => { await page.waitForSelector(sel, { timeout: 8000 }); await page.evaluate((sel) => document.querySelector(sel).click(), sel); await sleep(600); };
  // ---- 1. businesses
  await openLife('business'); await clickSel('[data-buy-biz="barber"]'); await page.waitForSelector('[data-biz]', { timeout: 8000 }); ok('bought a Barbing Salon through the phone');
  await clickSel('[data-hire]'); assert.match(await g(page, () => document.querySelector('[data-biz]').textContent), /Staff 1\//); ok('hired a worker');
  s.app.db.prepare('UPDATE businesses SET settled_at=settled_at-?').run(8 * 3600000);
  await page.evaluate(() => document.querySelector('[data-life="business"]').click()); await sleep(700); const cash0 = (await me()).cash;
  const waiting = await g(page, () => document.querySelector('[data-collect]').disabled); assert.equal(waiting, false, 'something is waiting after 8 hours away'); await snap(page, 'business'); await clickSel('[data-collect]'); await sleep(500);
  const cash1 = (await me()).cash; assert.ok(cash1 > cash0, `collected: ${cash0} -> ${cash1}`); ok(`collected the income through the phone (+${cash1 - cash0})`);
  const { checkInvariants } = await import('../server/core/ledger.js'); assert.equal(checkInvariants(s.app.db).ok, true);
  //@@NEXT@@
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401 GET \/api\/me/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('TRACK G SMOKE PASSED');
} catch (e) { failed = true; console.error('TRACK G SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await snap((await browser.pages()).at(-1), 'fail'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
