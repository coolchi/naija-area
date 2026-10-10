// Payments smoke (TEST MODE): a real browser buys a pack of ₦ through the wallet using the stand-in gateway, then a signed webhook is delivered over real HTTP.
// Usage: npm run build && node scripts/payments-smoke.mjs   (screenshots go to ./screenshots/payments-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { checkInvariants } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers();
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1000,800'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); let failed = false;
try {
  console.log('Naija Area payments smoke (TEST MODE)');
  const page = await browser.newPage(); await page.setViewport({ width: 1000, height: 800 }); page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 });
  const su = await page.evaluate(() => fetch('/api/auth/signup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'payer_one', password: 'password123', age18: true }) }).then(r => r.status)); assert.equal(su, 200);
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden), #hud:not(.hidden)', { timeout: 60000 });
  if (await page.$('#auth:not(.hidden)')) { await page.click('#age18'); await page.click('#authGo'); } await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(2500);
  const me0 = (await page.evaluate(() => fetch('/api/me').then(r => r.json()))).user; assert.equal(me0.username, 'payer_one'); const cash0 = me0.cash;
  await page.evaluate(() => window.__game.ui.phone('wallet')); await sleep(1500);
  await page.waitForFunction(() => [...document.querySelectorAll('b')].some(b => /Buy ₦ \(TEST MODE\)/.test(b.textContent)), { timeout: 10000 }); ok('wallet shows the Buy ₦ card, marked TEST MODE');
  await page.type('input[type=email]', 'player@example.com');
  const chips = await page.$$eval('.chips .chip', (els) => els.map(e => e.textContent)); assert.ok(chips.some(c => /1,000 for ₦1,075/.test(c) && /VAT ₦75/.test(c)), 'VAT line visible: ' + chips.join(' | ')); ok('pack buttons show the price with the VAT line: ' + chips.find(c => /1,000 for/.test(c)));
  await page.screenshot({ path: 'screenshots/payments-wallet.png' });
  await page.evaluate(() => [...document.querySelectorAll('.chips .chip')].find(e => /1,000 for/.test(e.textContent)).click()); await sleep(2500);
  const me1 = (await page.evaluate(() => fetch('/api/me').then(r => r.json()))).user; assert.equal(me1.cash - cash0, 1000); ok(`cash went ${cash0} -> ${me1.cash} after one test payment`);
  await page.screenshot({ path: 'screenshots/payments-paid.png' });
  const rows = s.db.prepare('SELECT status, total_kobo, credit FROM payment_intents').all(); assert.deepEqual(rows.map(r => [r.status, r.total_kobo, r.credit]), [['paid', 107500, 1000]]); assert.equal(checkInvariants(s.db).ok, true); ok('one paid payment, ledger invariants hold');
  // the webhook path over real HTTP, as the provider would call it
  const pr = s.app.payments.provider; const p2 = await page.evaluate(() => fetch('/api/payments/topup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pack: 'p1000', email: 'player@example.com' }) }).then(r => r.json()));
  pr.complete(p2.payment.ref); const wh = pr.webhook(p2.payment.ref); const bad = await fetch(base + '/api/payments/webhook', { method: 'POST', body: wh.body, headers: { 'x-monipay-signature': 'deadbeef' } }); assert.equal(bad.status, 401);
  const good = await fetch(base + '/api/payments/webhook', { method: 'POST', body: wh.body, headers: wh.headers }); assert.equal(good.status, 200); const again = await fetch(base + '/api/payments/webhook', { method: 'POST', body: wh.body, headers: wh.headers }); assert.equal((await again.json()).duplicate, true);
  assert.equal((await page.evaluate(() => fetch('/api/me').then(r => r.json()))).user.cash, cash0 + 2000); ok('bad signature 401, good signature credits once, replay is a no-op');
  const rec = await (await fetch(base + '/api/admin/payments/reconcile', { headers: { cookie: await adminCookie() } })).json(); assert.equal(rec.ok, true); ok(`reconciliation ok (gross ${rec.totals.grossKobo / 100} NGN, VAT ${rec.totals.vatKobo / 100}, ${rec.totals.paid} paid)`);
  const real = errors.filter(e => !/GPU|401|409/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || '));
} catch (e) { failed = true; console.error('PAYMENTS SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await (await browser.pages()).at(-1).screenshot({ path: 'screenshots/payments-fail.png' }); } catch { /* ignore */ } }
async function adminCookie() { const r = await fetch(base + '/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: 'smoke-admin' }) }); return r.headers.get('set-cookie').split(';')[0]; }
await browser.close(); await s.close(); console.log(failed ? 'PAYMENTS SMOKE FAILED' : 'PAYMENTS SMOKE PASSED'); process.exit(failed ? 1 : 0);
