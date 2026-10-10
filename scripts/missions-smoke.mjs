// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/onboarding-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { MISSIONS } from '../server/config/progress.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
MISSIONS.dailyCount = MISSIONS.daily.length; MISSIONS.weeklyCount = MISSIONS.weekly.length; const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/missions-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area missions smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2000);
  await g(page, () => fetch('/api/tutorial/skip', { method: 'POST' }).then(() => window.__game.tutorial.refresh()));
  await g(page, () => window.__game.ui.phone('missions')); await page.waitForSelector('[data-mission]', { timeout: 10000 }); const n = await g(page, () => document.querySelectorAll('[data-mission]').length); assert.equal(n, MISSIONS.daily.length + MISSIONS.weekly.length); ok(`the Missions tab lists ${n} missions`);
  await page.waitForSelector('[data-streak]'); await shot(page, 'sheet'); const cash0 = await g(page, () => fetch('/api/me').then(r => r.json()).then(r => r.user.cash)); await page.click('[data-streak]'); await sleep(800); const cash1 = await g(page, () => fetch('/api/me').then(r => r.json()).then(r => r.user.cash)); assert.ok(cash1 > cash0, `${cash0} -> ${cash1}`); assert.equal(await g(page, () => !!document.querySelector('[data-streak]')), false); ok(`collecting the day-1 streak bonus pays (${cash1 - cash0})`);
  const uid = [...s.app.world.players.keys()][0]; const jp = s.app.city.jobLoc.job_shop; for (let i = 0; i < 2; i++) { s.app.db.prepare('UPDATE player_state SET energy=95, hunger=90, mood=80, needs_at=? WHERE user_id=?').run(s.app.clock.now(), uid); await g(page, async (x, z) => { await fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }); const a = await fetch('/api/jobs/start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jobId: 'shop' }) }); if (!a.ok) throw new Error('start ' + a.status); }, jp.x, jp.z); s.app.clock.advance(61000); await g(page, () => fetch('/api/jobs/claim', { method: 'POST' }).then(r => { if (!r.ok) throw new Error('claim ' + r.status); })); s.app.clock.advance(15 * 60000); }
  await g(page, () => window.__game.ui.phone('missions')); await page.waitForSelector('[data-mission="d_shifts"].ready [data-collect]', { timeout: 10000 }); await shot(page, 'ready'); ok('two shifts later the "Work 2 shifts" mission is ready');
  await page.click('[data-mission="d_shifts"] [data-collect]'); await sleep(900); assert.equal(await g(page, () => document.querySelector('[data-mission="d_shifts"]').classList.contains('claimed')), true); ok('Collect marks it collected');
  const t = await g(page, () => document.querySelector('#toasts').textContent); assert.match(t, /\+/); ok('and shows what you were paid');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
