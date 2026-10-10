// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/onboarding-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { SEASONS } from '../server/config/progress.js'; import { weekOfMs } from '../server/core/seasons.js'; import { cfgOf } from '../server/core/wearables.js'; import { move, SYS } from '../server/core/ledger.js'; import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); { const d = new Date(s.app.clock.now()); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); s.app.seasonsCfg = { ...SEASONS, startsAt: d.toISOString().slice(0, 10), weeks: 1 }; } s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/seasons-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
const enter = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500); await g(page, () => fetch('/api/tutorial/skip', { method: 'POST' }).then(() => window.__game.tutorial.refresh())); };
try {
  console.log('Naija Area seasons smoke');
  const A = await newPage(1100, 700); await enter(A); const B = await newPage(1100, 700, false, true); await enter(B);
  const ids = [...s.app.world.players.keys()]; const [a, b] = ids; const pa = s.app.world.players.get(a);
  for (const id of ids) await tp(id === a ? A : B, pa.x + (id === a ? 0 : 3), pa.z);
  for (const u of [a, b]) s.db.prepare('UPDATE users SET is_guest=0 WHERE id=?').run(u);   // the smoke enters as guests; guests are not ranked, so make them registered players
  const wage = (u, n, tag) => move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(u), amount: n, reason: 'job_wage', ref: 'x', userId: u, idemKey: tag });
  wage(a, 12000, 'sea-a'); wage(b, 7000, 'sea-b');
  const it = cfgOf(s.app).WEARABLES.find(w => w.id === 'neck_thin'); s.app.db.prepare('INSERT INTO wearables_equipped(user_id,slot,item_id) VALUES (?,?,?)').run(a, it.slot, it.id);
  await g(A, () => window.__game.ui.phone('me')); await A.waitForSelector('[data-season="1"]', { timeout: 15000 }); await A.waitForSelector('[data-mine="money"]'); await sleep(300); await shot(A, 'me');
  assert.match(await g(A, () => document.querySelector('[data-mine="money"]').textContent), /You are #1 with ₦12,000/); ok('Phone > Me shows Season 1, with you #1 on the money board (₦12,000)');
  assert.match(await g(A, () => document.querySelector('[data-mine="dressed"]').textContent), /You are #1/); ok('and #1 on best dressed for the one piece you are wearing');
  assert.match(await g(A, () => document.querySelector('[data-mine="games"]').textContent), /not on this board yet|not in the top/); ok('and not on the games board (no wins yet)');
  assert.match(await g(A, () => document.querySelector('[data-season="1"]').textContent), /ends in/); ok('the card says how long is left');
  await g(B, () => window.__game.ui.phone('me')); await B.waitForSelector('[data-mine="money"]'); assert.match(await g(B, () => document.querySelector('[data-mine="money"]').textContent), /You are #2 with ₦7,000/); ok('the other player sees themselves #2');
  // the season ends: the server settles it, the winner gets a badge and the title
  s.app.clock.advance(8 * 86400000); s.app._seasonTickAt = 0; (await import('../server/core/seasons.js')).tickSeasons(s.app);
  const row = s.db.prepare("SELECT place, prize FROM season_awards WHERE user_id=? AND board='money'").get(a); assert.deepEqual([row.place, row.prize], [1, 20000]); ok('the server settled the season: first place and ₦20,000 paid');
  await g(A, () => window.__game.ui.closeSheet()); await g(A, () => window.__game.ui.phone('me')); await A.waitForSelector('[data-badge="1:money"]', { timeout: 15000 }); await sleep(300); await shot(A, 'badge');
  const sb = await g(A, () => document.querySelector('#sheetBody').textContent); assert.match(sb, /Showing: “S1 Money Maker”/, sb.slice(sb.indexOf('Showing') - 40, sb.indexOf('Showing') + 80)); ok('Phone > Me shows the crown badge and the title “S1 Money Maker”');
  await B.waitForFunction((id) => window.__game.ghosts.map.get(id)?.title === 'S1 Money Maker', { timeout: 20000 }, a); await shot(B, 'tag'); ok('the other player sees the title on the winner\'s name tag');
  const C = await newPage(390, 800, true, true); await enter(C); const cid = [...s.app.world.players.keys()].find(u => u !== a && u !== b); s.db.prepare('UPDATE users SET is_guest=0 WHERE id=?').run(cid); await g(C, () => window.__game.ui.phone('me')); await C.waitForSelector('[data-season]', { timeout: 15000 }); await sleep(400);
  const fit = await g(C, () => { const c = document.querySelector('.season'); const r = c.getBoundingClientRect(); return { right: r.right, vw: window.innerWidth, sw: c.scrollWidth, cw: c.clientWidth }; }); assert.ok(fit.right <= fit.vw + 1 && fit.sw <= fit.cw + 1, 'the season card fits a 390 px phone: ' + JSON.stringify(fit)); await shot(C, 'mobile'); ok('the season card fits a 390 px wide phone');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
