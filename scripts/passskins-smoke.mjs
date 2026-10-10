// Track G item 9 smoke: real server + headless Chrome. A player buys and wears a glowing avatar skin and a car skin through the phone's Skins tab, checks in, earns pass XP and collects tiers on the Pass tab;
// a second player standing nearby sees the first one's skin (colour and glow). GAME MONEY ONLY. Looks are NOT judged.
// Usage: npm run build && node scripts/passskins-smoke.mjs   (screenshots go to ./screenshots/passskins-*.png)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { move, cashId, SYS, checkInvariants } from '../server/core/ledger.js'; import { PASS } from '../server/config/pass.js'; import { skinById } from '../server/config/skins.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0;
s.app.balance.pass = { ...PASS, seasons: [{ id: 'smoke', name: 'Smoke Season', from: '2020-01-01', to: '2099-12-31' }] }; // a season is always on, whatever day the smoke runs
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'] });
const errors = []; const ok = (m) => console.log(`  ✓ ${m}`); const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const g = (page, fn, ...a) => page.evaluate(fn, ...a);
async function newPage(fresh) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: 1280, height: 760 }); p.on('pageerror', e => errors.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/GPU|WebGL|401/i.test(m.text())) errors.push(m.text()); }); return p; }
const enter = async (page) => { await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 20000 }); await sleep(2500); };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(900); };
let failed = false;
try {
  console.log('Naija Area battle pass and skins smoke, Track G item 9');
  const A = await newPage(false); await enter(A); const uid = await g(A, () => window.__game.user.id); move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(uid), amount: 400000, reason: 'test_topup', userId: uid });
  const openLife = async (tab) => { if (!(await A.$('#lifeTabs'))) { await A.click('#phoneBtn'); await A.waitForSelector('.pgrid .papp[data-app="life"]', { timeout: 8000 }); await A.evaluate(() => document.querySelector('.papp[data-app="life"]').click()); await A.waitForSelector('#lifeTabs', { timeout: 8000 }); } await A.evaluate((t) => document.querySelector(`[data-life="${t}"]`).click(), tab); await sleep(600); };
  const clickSel = async (sel) => { await A.waitForSelector(sel, { timeout: 8000 }); await A.evaluate((sel) => document.querySelector(sel).click(), sel); await sleep(900); };
  // ---- 1. the Skins tab: buy and wear a glowing avatar skin and a car skin
  await openLife('skins'); const av = skinById.av_adire_indigo, car = skinById.car_midnight_neon; await clickSel(`[data-buy-skin="${av.id}"]`); await clickSel(`[data-equip="${av.id}"]`); ok('bought and put on ' + av.name + ' through the phone');
  await clickSel('[data-skin-kind="car"]'); await clickSel(`[data-buy-skin="${car.id}"]`); await clickSel(`[data-equip="${car.id}"]`); ok('bought and put on ' + car.name);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM skins_owned WHERE user_id=?').get(uid).n, 2); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason='skin_buy'").get(uid).n, 2); ok('two ledger entries for the two purchases');
  await A.waitForFunction((c) => { const G = window.__game; return G.ctrl.skinLooks?.avatar?.color === c && !!G.ctrl.avatar.userData.skinGlow; }, { timeout: 10000 }, av.color); ok('your own avatar is drawn in the skin colour with its glow ring');
  await A.waitForFunction((c) => window.__game.ctrl.skinLooks?.car?.color === c, { timeout: 10000 }, car.color); ok('your car is in the car skin colour');
  await A.screenshot({ path: 'screenshots/passskins-skins-tab.png' });
  // ---- 2. someone nearby sees it
  const B = await newPage(true); await enter(B); const bid = await g(B, () => window.__game.user.id); await tp(A, 0, 0); await tp(B, 4, 4); await A.evaluate(() => window.__game.net.nudge()); await B.evaluate(() => window.__game.net.nudge());
  await B.waitForFunction((id, col) => { const gh = window.__game.ghosts.map.get(id); return gh && gh.sk && gh.sk.a === col && gh.obj?.userData?.skinGlow; }, { timeout: 25000, polling: 500 }, uid, av.id); ok('a second player sees the first one wearing the skin (id, colour and glow ring)');
  await B.screenshot({ path: 'screenshots/passskins-seen-by-other.png' }); void bid;
  // ---- 3. the Pass tab: check in, earn XP for real, collect
  await openLife('pass'); await clickSel('[data-pass-login]'); const lg = s.db.prepare('SELECT xp FROM pass_progress WHERE user_id=?').get(uid).xp; assert.equal(lg, PASS.loginXp + PASS.sources.skin_buy.xp, 'check-in plus the dressing-up XP from the purchases'); ok('checked in: +' + PASS.loginXp + ' XP (and ' + PASS.sources.skin_buy.xp + ' for dressing up)');
  move(s.app, { from: SYS.FAUCET_JOBS, to: cashId(uid), amount: 1800, reason: 'job_wage', ref: 'smoke', userId: uid, idemKey: 'smoke-shift-' + Date.now() }); const xp = s.db.prepare('SELECT xp FROM pass_progress WHERE user_id=?').get(uid).xp; assert.equal(xp, lg + PASS.sources.job_wage.xp); ok('a paid shift added XP (' + xp + ')');
  s.db.prepare('UPDATE pass_progress SET xp=? WHERE user_id=?').run(PASS.tierXp * 5 + 3, uid); await openLife('skins'); await openLife('pass'); await A.waitForSelector('[data-pass-tier="5"]', { timeout: 8000 }); ok('the Pass tab shows tier 5');
  const c0 = (await g(A, () => fetch('/api/me').then(r => r.json()))).user.cash; await clickSel('[data-claim="1:free"]'); const c1 = (await g(A, () => fetch('/api/me').then(r => r.json()))).user.cash; assert.equal(c1 - c0, PASS.free.cash(1)); ok('tier 1 free reward collected through the UI (+' + (c1 - c0) + ')');
  await clickSel('[data-claim="5:free"]'); assert.equal(s.db.prepare("SELECT how FROM skins_owned WHERE user_id=? AND skin_id='av_pass_sunrise'").get(uid)?.how, 'pass'); ok('tier 5 gave the Sunrise Kaftan skin');
  assert.equal(await g(A, () => !!document.querySelector('[data-claim="2:premium"]').disabled), true); await clickSel('[data-pass-premium]'); assert.equal(s.db.prepare('SELECT premium FROM pass_progress WHERE user_id=?').get(uid).premium, 1); await clickSel('[data-claim="2:premium"]'); ok('premium unlocked with game money; a premium tier collected');
  await A.screenshot({ path: 'screenshots/passskins-pass-tab.png' }); assert.equal(checkInvariants(s.db).ok, true); ok('ledger invariants hold');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'page errors: ' + real.join(' || ')); ok('no page errors'); console.log('PASS+SKINS SMOKE PASSED');
} catch (e) { failed = true; console.error('PASS+SKINS SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
