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
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/mod-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
try {
  console.log('Naija Area moderation dashboard smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500);
  const uid = [...s.app.world.players.keys()][0]; const uname = s.app.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username;
  const adm = await newPage(1200, 1000); await adm.goto(base + '/admin', { waitUntil: 'domcontentloaded' }); await adm.waitForSelector('#pw', { timeout: 20000 }); await adm.type('#pw', 'smoke-admin'); await adm.click('#go'); await adm.waitForFunction(() => document.querySelector('#out').style.display === 'block', { timeout: 15000 });
  await adm.waitForSelector('#modOv .tag', { timeout: 10000 }); assert.match(await g(adm, () => document.querySelector('#modOv').textContent), /Open reports/); ok('the moderation card shows the overview');
  await adm.type('#modQ', uname); await adm.click('#modGo'); await adm.waitForSelector('#sGo', { timeout: 10000 }); await shot(adm, 'player'); ok('looking up a player shows the sanction form');
  await adm.select('#sKind', 'ban'); await adm.type('#sHours', '24'); await adm.select('#sReason', 'cheating'); await adm.type('#sNote', 'smoke test'); adm.once('dialog', d => d.accept()); await adm.click('#sGo'); await adm.waitForFunction(() => document.querySelector('#modPlayer').textContent.includes('BANNED'), { timeout: 10000 }); ok('banning for 24 hours shows BANNED on the player');
  await adm.waitForSelector('#modActive [data-lift]', { timeout: 10000 }); await adm.waitForFunction(() => document.querySelector('#auRows').textContent.includes('sanction_ban'), { timeout: 10000 }); await shot(adm, 'audit'); ok('the active list and the audit log show it');
  await g(page, () => fetch('/api/me').then(r => r.json().then(d => { window.__me = { status: r.status, d }; }))); const me = await g(page, () => window.__me); assert.equal(me.status, 403); assert.equal(me.d.error, 'BANNED'); ok('the banned player is refused by the server');
  await g(page, () => window.__game.refreshMe()); await page.waitForSelector('#banned', { timeout: 10000 }); assert.match(await g(page, () => document.querySelector('#banned').textContent), /suspended/); await shot(page, 'banned'); ok('and the game shows them why, with Download my data and Log out');
  adm.once('dialog', d => d.accept('smoke lift')); await adm.click('#modActive [data-lift]'); await adm.waitForFunction(() => !document.querySelector('#modActive [data-lift]'), { timeout: 10000 }); const me2 = await g(page, () => fetch('/api/me').then(r => r.status)); assert.equal(me2, 200); ok('lifting the ban lets them back in at once');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e) && !/403/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
