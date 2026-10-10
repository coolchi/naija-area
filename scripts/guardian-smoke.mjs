// Safety settings smoke (queue batch 1 item 7): real server (in-memory DB) + headless Chrome. Screenshots land in ./screenshots (ach-*.png names are shared with the template).
// Usage: npm run build && node scripts/guardian-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { dayKey } from '../server/core/rewards.js'; import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/gd-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
const enter = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500); await g(page, () => fetch('/api/tutorial/skip', { method: 'POST' }).then(() => window.__game.tutorial.refresh())); };

try {
  console.log('Naija Area safety settings smoke');
  const A = await newPage(1100, 700); await enter(A); const uid = [...s.app.world.players.keys()][0];
  await g(A, () => window.__game.ui.phone('safe')); await A.waitForSelector('[data-gd="chat:friends"]', { timeout: 10000 }); await shot(A, 'safety'); ok('Phone > Safety opens with the settings');
  const click = async (sel) => { await A.click(sel); await sleep(500); };
  await click('[data-gd="chat:friends"]'); await A.waitForSelector('[data-gd="chat:friends"]:not(.ghost)', { timeout: 8000 }); assert.equal(s.db.prepare('SELECT chat_mode m FROM guardian_settings WHERE user_id=?').get(uid).m, 'friends'); ok('choosing "Friends only" is saved by the server and shown as selected');
  await g(A, () => fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: 'hello' }) }).then(r => r.json())).then(r => assert.equal(r.error, 'CHAT_FRIENDS')); ok('the server now refuses public chat');
  await click('[data-gd="maxStake:0"]'); await click('[data-gd="breakEveryMin:20"]'); await click('[data-gd="playLimitMin:30"]'); await A.waitForSelector('[data-gd="playLimitMin:30"]:not(.ghost)'); const row = s.db.prepare('SELECT max_stake, play_limit_min, break_every_min FROM guardian_settings WHERE user_id=?').get(uid); assert.deepEqual([row.max_stake, row.play_limit_min, row.break_every_min], [0, 30, 20]); ok('no stakes, a 30 minute limit and a 20 minute break reminder are saved');
  await g(A, () => window.__game.ui.phone('safe')); await A.waitForSelector('[data-gd-today]'); assert.match(await g(A, () => document.querySelector('[data-gd-today]').textContent), /30 min left/); ok('"30 min left" is shown');
  await g(A, () => window.__game.ui.closeSheet()); await sleep(100);
  // use up the day on the server, then the next heartbeat is refused and the full-screen notice appears
  s.db.prepare('INSERT INTO guardian_play(user_id,day,ms) VALUES (?,?,?) ON CONFLICT(user_id,day) DO UPDATE SET ms=excluded.ms').run(uid, dayKey(s.app.clock.now()), 31 * 60000); s.app._gd.clear();
  await A.waitForSelector('#breaktime', { timeout: 30000 }); await shot(A, 'breaktime'); assert.match(await g(A, () => document.querySelector('[data-break-text]').textContent), /30 minutes for today/); ok('when the time is used up the heartbeat is refused and the "time is up" screen shows');
  assert.equal(await g(A, () => fetch('/api/jobs').then(r => r.status)), 403); assert.equal(await g(A, () => fetch('/api/account/export').then(r => r.status)), 200); ok('game calls are refused (403) while the data download still works');
  await g(A, () => document.querySelector('[data-break="Change my safety settings"]').click()); await A.waitForSelector('[data-gd="playLimitMin:120"]', { timeout: 10000 }); ok('"Change my safety settings" opens Safety even though the day is used up');
  await click('[data-gd="playLimitMin:120"]'); await A.waitForFunction(() => !document.getElementById('breaktime'), { timeout: 30000 }); ok('raising the limit lets the player back in and the screen goes away'); await g(A, () => window.__game.ui.closeSheet());
  // PIN: once set, changes without it are refused
  await g(A, () => window.__game.ui.phone('safe')); await A.waitForSelector('[data-gd-pin="new"]'); await A.type('[data-gd-pin="new"]', '4821'); await click('[data-gd="pin:set"]'); await A.waitForSelector('[data-gd-pin="current"]', { timeout: 8000 }); assert.equal(s.db.prepare('SELECT pin_hash h FROM guardian_settings WHERE user_id=?').get(uid).h.startsWith('$2'), true); ok('a PIN can be set (stored hashed)');
  await click('[data-gd="chat:all"]'); assert.equal(s.db.prepare('SELECT chat_mode m FROM guardian_settings WHERE user_id=?').get(uid).m, 'friends'); ok('without the PIN a change is refused');
  await A.type('[data-gd-pin="current"]', '4821'); await click('[data-gd="chat:all"]'); assert.equal(s.db.prepare('SELECT chat_mode m FROM guardian_settings WHERE user_id=?').get(uid).m, 'all'); ok('with the PIN it works'); await shot(A, 'pin');
  // a small phone screen
  const M = await newPage(390, 760, true, true); await enter(M); await g(M, () => window.__game.ui.phone('safe')); await M.waitForSelector('[data-gd="chat:off"]'); await shot(M, 'mobile'); const wide = await g(M, () => { const b = document.querySelector('#sheetBody'); return b.scrollWidth - b.clientWidth; }); assert.ok(wide <= 2, 'sheet overflows sideways by ' + wide); ok('the Safety sheet fits a 390 px wide phone');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e) && !/status of 403/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
