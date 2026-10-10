// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/onboarding-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { move, SYS } from '../server/core/ledger.js'; import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/ach-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
const enter = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500); await g(page, () => fetch('/api/tutorial/skip', { method: 'POST' }).then(() => window.__game.tutorial.refresh())); };
try {
  console.log('Naija Area achievements smoke');
  const A = await newPage(1100, 700); await enter(A); const B = await newPage(1100, 700, false, true); await enter(B);
  const ids = [...s.app.world.players.keys()]; const [a] = ids; const pa = s.app.world.players.get(a);
  for (const id of ids) await tp(id === a ? A : B, pa.x + (id === a ? 0 : 3), pa.z);
  for (let i = 0; i < 10; i++) move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(a), amount: 10, reason: 'job_wage', ref: 'x', userId: a, idemKey: 'ach' + i });
  await g(A, () => window.__game.ui.phone('me')); await A.waitForSelector('[data-ach="hustler"].earned', { timeout: 10000 }); await shot(A, 'me'); ok('Phone > Me shows the Hustler achievement as earned');
  assert.match(await g(A, () => document.querySelector('#sheetBody').textContent), /Showing: “Hustler”/); ok('and shows the title you are showing'); await A.waitForSelector('[data-title="hustler"]');
  await g(A, () => window.__game.ui.closeSheet()); await g(A, () => fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: 'hello from the hustler' }) })); await sleep(300);
  await B.waitForFunction(() => document.querySelector('#chatlog')?.textContent.includes('[Hustler]: hello from the hustler'), { timeout: 15000 }); ok('the other player sees "[Hustler]" on the chat line');
  await B.waitForFunction((id) => window.__game.ghosts.map.get(id)?.title === 'Hustler', { timeout: 15000 }, a); await shot(B, 'tag'); ok('and the ghost name tag carries the title');
  await g(A, () => fetch('/api/achievements/title', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: '' }) })); await B.waitForFunction((id) => !window.__game.ghosts.map.get(id)?.title, { timeout: 15000 }, a); ok('hiding the title removes it from the tag');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
