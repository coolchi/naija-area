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
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/${String(++step).padStart(2, '0')}-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area onboarding smoke (first-run tour, help button, next-step hint)');
  const page = await newPage(1280, 760, false, true); await page.evaluateOnNewDocument(() => localStorage.setItem('na_tour_force', '1')); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 });
  await page.waitForSelector('#tour', { timeout: 8000 }); ok('tour opens by itself for a new player'); await snap(page, 'onboarding-tour-1');
  for (let i = 0; i < 5; i++) { await page.click('#tourNext'); await sleep(150); } assert.match(await g(page, () => document.querySelector('.tour-card h3').textContent), /Cars/); await snap(page, 'onboarding-tour-6'); assert.equal(await g(page, () => document.querySelector('#tourNext').textContent), "Let's go"); ok('six steps, last step says Let\'s go');
  await page.click('#tourNext'); await sleep(200); assert.equal(await g(page, () => !!document.querySelector('#tour')), false); ok('tour closes');
  await page.waitForFunction(() => !document.querySelector('#hintChip').classList.contains('hidden'), { timeout: 8000 }); const hint = await g(page, () => document.querySelector('#hintChip').textContent); assert.match(hint, /first job/i); ok('hint shown: ' + hint); await snap(page, 'onboarding-hint');
  await page.click('#hintChip'); await sleep(200); assert.ok(await g(page, () => document.querySelector('#hintChip').classList.contains('hidden'))); ok('hint can be dismissed by tapping it');
  await page.click('#helpBtn'); await page.waitForSelector('#tour', { timeout: 3000 }); await page.click('#tourSkip'); ok('? button reopens the tour');
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }).catch(async () => { await page.waitForSelector('#auth:not(.hidden)'); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)'); }); await sleep(2500); assert.equal(await g(page, () => !!document.querySelector('#tour')), false); ok('tour does not come back after it was seen');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || ')); ok('no console/page errors'); console.log('ONBOARDING SMOKE PASSED');
} catch (e) { failed = true; console.error('ONBOARDING SMOKE FAILED:', e.message); try { await snap((await browser.pages()).at(-1), 'fail-onboarding'); } catch { /* ignore */ } }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
