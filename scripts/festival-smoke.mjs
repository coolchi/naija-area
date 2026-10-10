// Track G item 6 smoke: real server + headless Chrome with Christmas forced on. The festival badge shows, the Events tab lists the festival, a limited cap is bought and worn, the daily gift is paid once. Looks are NOT judged.
// Usage: npm run build && node scripts/festival-smoke.mjs
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { move, SYS, cashId } from '../server/core/ledger.js'; import { buildServer } from '../server/createServer.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.app.balance.events = { ...(await import('../server/config/events.js')).EVENTS, forced: ['christmas'] }; s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });

const errors = []; const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const ok = (m) => console.log(`  ✓ ${m}`); let failed = false;
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
try {
  console.log('Naija Area festival smoke, Track G item 6');
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 760 }); page.on('pageerror', e => errors.push(String(e)));
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 20000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 });
  await page.waitForFunction(() => { const b = document.getElementById('festBadge'); return b && !b.classList.contains('hidden') && /Christmas/.test(b.textContent); }, { timeout: 20000 }); ok('the Christmas badge is on the HUD');
  const uid = await g(page, () => window.__game.user.id); move(s.app, { from: SYS.FAUCET_START, to: cashId(uid), amount: 500000, reason: 'starting_cash', userId: uid, idemKey: 'smoke-grant' });
  const cash = (await g(page, async () => (await (await fetch('/api/events')).json()).cash)); const ev = await g(page, async () => (await (await fetch('/api/events')).json()).events.find(e => e.id === 'christmas')); assert.equal(ev.active, true); assert.ok(ev.shop.some(i => i.limited), 'a limited item is listed'); assert.equal(ev.claim.claimed, false); ok('the festival is listed as on with a limited item and an unclaimed gift');
  const buy = await g(page, async () => (await fetch('/api/events/buy', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ event: 'christmas', item: 'xm_cap' }) })).status); const claim = await g(page, async () => (await fetch('/api/events/claim', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ event: 'christmas' }) })).status); void cash;
  assert.equal(buy, 200, 'buy status ' + buy); assert.equal(claim, 200); const again = await g(page, async () => (await fetch('/api/events/claim', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ event: 'christmas' }) })).status); assert.equal(again, 409); ok('limited cap bought and the daily gift paid once (second claim refused)');
  await page.evaluate(() => window.__game.net.nudge()); await sleep(1500); const worn = await g(page, async () => (await (await fetch('/api/wearables/mine')).json()).worn.map(w => w.id)); assert.deepEqual(worn, ['fest_xmas_cap']); ok('the cap is worn: ' + worn.join(','));
  await page.screenshot({ path: 'screenshots/festival-badge.png' });
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'page errors: ' + real.join(' || ')); ok('no page errors'); console.log('FESTIVAL SMOKE PASSED');
} catch (e) { failed = true; console.error('FESTIVAL SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
