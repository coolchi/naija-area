// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/onboarding-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/mobile-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: touch ? 3 : 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area mobile pass smoke (390x800 touch phone, 3x)');
  const page = await newPage(390, 800, true); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2500);
  const q = await g(page, () => ({ lvl: window.__game.qualityLevel, pr: window.__game.renderer.getPixelRatio(), body: document.body.dataset.quality, far: window.__game.camera.far, fogFar: window.__game.scene.fog.far }));
  assert.equal(q.lvl, 'low'); assert.equal(q.pr, 1); assert.equal(q.body, 'low'); assert.ok(q.far <= 330); ok(`a small high-density touch screen starts on Lite (pixel ratio ${q.pr}, view distance ${q.far})`);
  const res = await g(page, () => { const e = performance.getEntriesByType('resource').find(r => r.name.endsWith('/game.js')); return e ? { enc: e.encodedBodySize, dec: e.decodedBodySize } : null; }); assert.ok(res && res.enc < res.dec * 0.5, JSON.stringify(res)); ok(`game.js travelled compressed: ${Math.round(res.enc / 1024)} KB of ${Math.round(res.dec / 1024)} KB`);
  const pre = await g(page, () => typeof window.__pre); assert.equal(pre, 'object'); ok('city and config were requested before the bundle finished loading');
  await g(page, () => fetch('/api/tutorial/skip', { method: 'POST' }).then(() => window.__game.tutorial.refresh())); await sleep(300);
  assert.equal(await g(page, () => getComputedStyle(document.querySelector('#handBtn')).display), 'none'); ok('handbrake button is hidden while walking');
  await page.tap('#carBtn'); await sleep(600); assert.equal(await g(page, () => window.__game.ctrl.mode), 'drive'); assert.notEqual(await g(page, () => getComputedStyle(document.querySelector('#handBtn')).display), 'none'); await shot(page, 'driving'); ok('the HAND button appears when you get in a car');
  const box = await (await page.$('#handBtn')).boundingBox(); assert.ok(box.width >= 44 && box.height >= 44, 'tap target size'); ok(`hand button is ${Math.round(box.width)}x${Math.round(box.height)} px (44 is the minimum)`);
  await g(page, () => { const b = document.querySelector('#handBtn'); b.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 7, bubbles: true, cancelable: true })); }); assert.equal(await g(page, () => window.__game.ctrl.handTouch), true); ok('holding the button sets the handbrake');
  await g(page, () => { const c = window.__game.ctrl; c.car.v = 12; c.keys.add('w'); }); await sleep(300); const v1 = await g(page, () => window.__game.ctrl.car.v); await g(page, () => document.querySelector('#handBtn').dispatchEvent(new PointerEvent('pointerup', { pointerId: 7, bubbles: true }))); assert.equal(await g(page, () => window.__game.ctrl.handTouch), false); ok(`releasing it lets go (speed while held ${v1.toFixed(1)} m/s)`);
  await g(page, () => window.__game.ctrl.keys.clear()); await page.tap('#carBtn'); await sleep(400); assert.equal(await g(page, () => getComputedStyle(document.querySelector('#handBtn')).display), 'none'); ok('and it hides again on foot');
  const cam0 = await g(page, () => window.__game.ctrl.cam); await g(page, () => { const c = document.querySelector('#game'); const ev = (t, id, x, y) => c.dispatchEvent(new PointerEvent(t, { pointerId: id, clientX: x, clientY: y, bubbles: true })); ev('pointerdown', 1, 150, 300); ev('pointerdown', 2, 250, 300); ev('pointermove', 2, 330, 300); ev('pointermove', 1, 70, 300); ev('pointerup', 1, 70, 300); ev('pointerup', 2, 330, 300); });
  const cam1 = await g(page, () => window.__game.ctrl.cam); assert.ok(cam1 < cam0 - 1, `${cam0} -> ${cam1}`); ok(`pinching out zooms the camera in (${cam0.toFixed(1)} -> ${cam1.toFixed(1)})`);
  await g(page, () => window.__game.ui.phone('more')); await page.waitForSelector('[data-quality="high"]', { timeout: 10000 }); await g(page, () => document.querySelector('[data-quality="high"]').scrollIntoView({ block: 'center' })); await sleep(200); await page.tap('[data-quality="high"]'); await sleep(300); const q2 = await g(page, () => ({ lvl: window.__game.qualityLevel, far: window.__game.camera.far, saved: localStorage.getItem('na_quality_v1') })); assert.equal(q2.lvl, 'high'); assert.equal(q2.far, 900); assert.equal(q2.saved, 'high'); ok('More > Graphics > High applies at once and is remembered');
  const small = await g(page, () => [...document.querySelectorAll('#right .round, #carBtn')].map(b => [b.id || b.className, b.getBoundingClientRect().width]).filter(x => x[1] > 0 && x[1] < 44)); assert.deepEqual(small, [], 'tap targets under 44px: ' + JSON.stringify(small)); ok('all round HUD buttons are at least 44 px');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
