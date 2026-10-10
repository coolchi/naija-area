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
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/tutorial-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area tutorial smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2500);
  await page.waitForSelector('#tutCard:not(.hidden)', { timeout: 15000 }); assert.match(await g(page, () => document.querySelector('#tutCard').textContent), /1\/7 Walk around/); await shot(page, 'card'); ok('the tutorial card shows step 1 of 7');
  await page.click('#tutCard [data-tut-head]'); await page.waitForSelector('#tutCard .tut-list'); assert.equal(await g(page, () => document.querySelectorAll('#tutCard .tut-list li').length), 7); await shot(page, 'list'); ok('tapping it opens the whole checklist');
  await g(page, () => window.__game.ui.openMap()); await sleep(600); await g(page, () => window.__game.ui.openMap()); await sleep(500); const me0 = await g(page, () => fetch('/api/tutorial').then(r => r.json())); assert.equal(me0.steps.find(x => x.id === 'map').done, true); ok('opening the map is reported to the server');
  const p = s.app.world.players.values().next().value; await tp(page, p.x + 30, p.z); await sleep(500); await g(page, () => window.__game.tutorial.refresh()); await sleep(600);
  const v = await g(page, () => fetch('/api/tutorial').then(r => r.json())); assert.equal(v.steps.find(x => x.id === 'walk').done, true); assert.equal(v.current, 'job'); assert.match(await g(page, () => document.querySelector('#tutCard').textContent), /Do your first shift/); ok('walking 25 m ticks the walk step and moves on to the shift step');
  assert.equal(await g(page, () => document.querySelector('#hintChip')?.classList.contains('hidden')), true); ok('the old hint chip stays out of the way while the tutorial runs');
  await page.click('#tutCard [data-tut-skip]'); await sleep(500); assert.equal(await g(page, () => document.querySelector('#tutCard').classList.contains('hidden')), true); ok('skip hides it');
  await g(page, () => { window.__game.ui.phone('more'); }); await page.waitForSelector('[data-more="tutorial"]', { timeout: 10000 }); await page.click('[data-more="tutorial"]'); await page.waitForSelector('#tutCard:not(.hidden)', { timeout: 10000 }); ok('More > Replay the tutorial brings it back');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
