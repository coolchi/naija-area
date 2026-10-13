// Admin and account smoke (10 Oct 2026): the admin page with password + authenticator code showing the backend cards, and a player downloading their data and closing their account from More.
// Usage: npm run build && node scripts/admin-smoke.mjs   (screenshots go to ./screenshots/admin-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, SYS } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
import crypto from 'node:crypto'; import * as totp from '../server/lib/totp.js'; import { adminApplications } from '../server/core/office.js';
const SECRET = totp.newSecret(crypto.randomBytes(20).toString('hex')); const hmac = (k, m) => crypto.createHmac('sha1', Buffer.from(k)).update(Buffer.from(m)).digest();
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin-password', dev: true, adminEnv: { ADMIN_TOTP_SECRET: SECRET } }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const snap = async (page, name) => { await page.screenshot({ path: `screenshots/admin-${name}.png` }); };
async function newPage(w = 1280, h = 760, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h }); p.on('pageerror', e => errors.push('pageerror: ' + e.message + ' ' + String(e.stack || '').split('\n').slice(0, 4).join(' | '))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); p.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.request().method()} ${r.url().replace(base, '')}`); }); await p.evaluateOnNewDocument(() => { localStorage.setItem('na_tour_done', '1'); document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body.shot > *:not(canvas) { visibility: hidden !important; }'; document.head.append(st); }); }); return p; }
const settle = async (page, id) => { await page.waitForFunction((id) => window.__game?.city?.id === id && window.__game.playing, { timeout: 60000 }, id); await sleep(2200); };
const setClock = (minutes) => { const c = s.app.balance.worldClock; c.startRealMs = Date.now() - (minutes / c.gameMinutesPerRealMinute) * 60000; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
/** free camera for scenic shots: camera at `from`, looking at `to`; the HUD is hidden unless hud is true. Also moves the avatar next to the target so streaming and presence follow. */
const cam = async (page, from, to, hud = false, keep = false) => { await g(page, (from, to, hud, keep) => { const G = window.__game; document.body.classList.toggle('shot', !hud); G.ctrl.placeCamera = (camera) => { camera.position.set(from[0], from[1], from[2]); camera.lookAt(to[0], to[1], to[2]); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert(); }; const c = G.ctrl; c.x = to[0]; c.z = to[2]; c.root.position.set(to[0], 0, to[2]); c.avatar.visible = !!keep; }, from, to, hud, keep); await sleep(1600); };
let failed = false;
try {
  console.log('Naija Area admin and account smoke');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('[data-t="signup"]'); await page.type('input[name="username"]', 'tola_close'); await page.type('input[name="password"]', 'secret-pass-1'); await page.click('#age18'); await page.click('#authGo');
  await page.waitForSelector('#setup [data-skip]', { timeout: 30000 }); await page.click('#setup [data-skip]'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2000);
  const uid = (await g(page, () => fetch('/api/me').then(r => r.json()))).user.id;
  // an application and an idea so the admin has something to see
  await page.evaluate(() => fetch('/api/office/apply', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ role: 'tester', message: 'I would like to test the new districts every week.' }) })); assert.equal(adminApplications(s.app).length, 1);
  // ---- admin page with password + code
  const adm = await newPage(1200, 900, true); await adm.goto(base + '/admin', { waitUntil: 'domcontentloaded' }); await adm.waitForSelector('#pw', { timeout: 20000 });
  await adm.type('#pw', 'smoke-admin-password'); await adm.click('#go'); await sleep(800); assert.equal(await g(adm, () => document.querySelector('#out').style.display !== 'block'), true, 'password alone does not open the admin page'); ok('password alone is refused');
  await g(adm, () => { document.querySelector('#code').value = ''; }); await adm.type('#code', totp.codeAt(SECRET, totp.stepOf(Date.now()), hmac)); await adm.click('#go');   await adm.waitForFunction(() => document.querySelector('#out').style.display === 'block', { timeout: 15000 }); ok('password + authenticator code opens the admin page');
  await adm.click('[data-page="applications"]');
  await adm.waitForFunction(() => document.querySelector('#aq')?.textContent.includes('tola_close'), { timeout: 15000 }); await adm.waitForFunction(() => document.querySelector('#su')?.textContent.includes('made choices'), { timeout: 15000 }); await adm.screenshot({ path: 'screenshots/admin-backend.png' }); ok('applications and sign-up cards fill in');
  await adm.click('#aq [data-a="shortlisted"]'); await adm.waitForFunction(() => document.querySelector('#aq')?.textContent.includes('shortlisted'), { timeout: 10000 }); assert.equal(adminApplications(s.app)[0].status, 'shortlisted'); ok('shortlisting from the admin page works');
  // ---- the player: More > Your data
  await g(page, () => window.__game.ui.phone('more')); await page.waitForSelector('[data-more="close"]', { timeout: 15000 }); await sleep(500);
  const dl = await g(page, async () => { const r = await fetch('/api/account/export'); const d = await r.json(); return { ok: r.ok, user: d.account?.username, apps: d.office?.applications?.length }; }); assert.deepEqual(dl, { ok: true, user: 'tola_close', apps: 1 }); ok('download endpoint returns this player\'s data');
  await page.click('[data-more="close"]'); await page.waitForSelector('[data-f="confirm"]', { timeout: 10000 }); await page.type('[data-f="password"]', 'secret-pass-1'); await page.type('[data-f="confirm"]', 'DELETE'); await snap(page, 'close-sheet');
  await Promise.all([page.waitForNavigation({ timeout: 20000 }).catch(() => {}), page.click('[data-act="close-account"]')]); await page.waitForSelector('#auth:not(.hidden)', { timeout: 30000 }); ok('closing the account returns to the start screen');
  const row = s.app.db.prepare('SELECT username, pass_hash FROM users WHERE id=?').get(uid); assert.equal(row.username, `deleted_${uid}`); assert.equal(row.pass_hash, null); assert.equal(adminApplications(s.app).length, 0); ok('the account is anonymised and its application erased');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message, errors.slice(0, 3)); console.error(e.stack?.split('\n').slice(1, 4).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
