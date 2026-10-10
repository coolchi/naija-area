// Sign-up and office smoke (10 Oct 2026): the three set-up screens, the Naija Area office (apply and idea through the UI), the admin backend view.
// Usage: npm run build && node scripts/signup-smoke.mjs   (screenshots go to .//tmp/rooms/*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, SYS } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `/tmp/rooms/${name}.png` }); };
async function newPage(w = 1280, h = 760, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false, keep = false) => { await g(page, (from, to, hud, keep) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = !!keep; }, from, to, hud, keep); await sleep(1600); };
fs.mkdirSync('/tmp/rooms', { recursive: true }); let failed = false;
try {
  const page = await newPage(1100, 680); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2500);
  setClock(12 * 60);
  for (const v of s.app.city.venues) {
    try { await tp(page, v.x, v.z); await g(page, (id) => window.__game.ui.place(id), v.id); await page.waitForSelector('#venueEnter:not([disabled])', { timeout: 6000 }); await page.evaluate(() => document.querySelector('#venueEnter').click()); await page.waitForFunction(() => window.__game.venue?.open, { timeout: 15000 }); await sleep(1200); await snap(page, v.id); await page.evaluate(() => document.querySelector('#venueLeave')?.click()); await sleep(500); console.log('shot', v.id); }
    catch (e) { console.log('skip', v.id, e.message.slice(0, 60)); await g(page, () => { try { window.__game.venue?.leave(); } catch {} document.getElementById('sheetWrap')?.classList.add('hidden'); }); }
  }
} catch (e) { failed = true; console.error('FAIL', e.message); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
