// Age-check smoke: mode "play" with the stand-in provider. The world must stay closed until the server records a pass.
// Usage: npm run build && node scripts/age-smoke.mjs   (screenshots go to ./screenshots/age-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { AGE } from '../server/config/age.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true, ageConfig: { ...AGE, mode: 'play' } }); s.startTimers();
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=900,800'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); let failed = false;
const clickText = (page, re) => page.evaluate((src) => { const b = [...document.querySelectorAll('button')].find(e => new RegExp(src).test(e.textContent)); if (!b) throw new Error('no button ' + src); b.click(); }, re.source);
try {
  console.log('Naija Area age-check smoke (mode "play", stand-in provider)');
  const page = await browser.newPage(); await page.setViewport({ width: 900, height: 800 }); page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo');
  await page.waitForFunction(() => /Age check/.test(document.body.innerText), { timeout: 20000 }); await sleep(800);
  assert.ok(await page.evaluate(() => document.querySelector('#hud').classList.contains('hidden')), 'HUD stays hidden behind the gate'); await page.screenshot({ path: 'screenshots/age-gate.png' }); ok('the world is closed behind an age gate that says what is kept (pass/fail + date)');
  assert.match(await page.evaluate(() => document.body.innerText), /We keep only whether you passed and the date/);
  await clickText(page, /Check my age/); await sleep(600); assert.match(await page.evaluate(() => document.body.innerText), /Please agree to the age check/); ok('no consent, no check');
  await page.click('#ageConsent'); await clickText(page, /Check my age/); await page.waitForFunction(() => /pretend to be the age-check service/.test(document.body.innerText), { timeout: 10000 });
  await clickText(page, /Couldn't read my ID/); await sleep(800); assert.ok(await page.evaluate(() => document.querySelector('#hud').classList.contains('hidden'))); ok('an unreadable ID does not let you in (and records nothing against you)');
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM age_verifications').get().n, 0);
  await clickText(page, /Check my age/); await page.waitForFunction(() => [...document.querySelectorAll('button')].some(b => /18 or over/.test(b.textContent)), { timeout: 10000 }); await page.screenshot({ path: 'screenshots/age-mock-vendor.png' });
  await clickText(page, /I'm 18 or over/); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500); ok('after a pass the player enters the world');
  const v = s.db.prepare('SELECT * FROM age_verifications').all(); assert.equal(v.length, 1); assert.deepEqual(Object.keys(v[0]).sort(), ['provider', 'result', 'user_id', 'verified_at']); ok('the database holds only: pass, the date, the provider id');
  const real = errors.filter(e => !/GPU|400|401|403|409/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.join(' || '));
} catch (e) { failed = true; console.error('AGE SMOKE FAILED:', e.message, errors.slice(0, 5)); try { await (await browser.pages()).at(-1).screenshot({ path: 'screenshots/age-fail.png' }); } catch { /* ignore */ } }
await browser.close(); await s.close(); console.log(failed ? 'AGE SMOKE FAILED' : 'AGE SMOKE PASSED'); process.exit(failed ? 1 : 0);
