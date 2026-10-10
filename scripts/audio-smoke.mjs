// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/onboarding-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import { balanceOf, cashId } from '../server/core/ledger.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/audio-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };

const SHOTS = "screenshots"; const snap = async (page, name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); };

let failed = false;
const peak = async (page, ms = 700) => g(page, (ms) => new Promise(res => { let m = 0; const t0 = performance.now(); const tick = () => { m = Math.max(m, window.__game.audio.level()); if (performance.now() - t0 < ms) setTimeout(tick, 15); else res(m); }; tick(); }), ms);
try {
  console.log('Naija Area audio smoke (real Web Audio in headless Chrome)');
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(1500);
  assert.equal(await g(page, () => !!window.__game.audio.ctx), true, 'the first tap (#authGo click) unlocked the audio'); assert.equal(await g(page, () => window.__game.audio.running), true); ok('the first tap unlocks audio');
  await g(page, () => { window.__game.audio.update({ music: 0, sfx: 1, on: true }); window.__game.radio?.state && (window.__game.radio.state.playing = false); });
  await sleep(800); assert.ok((await peak(page, 300)) < 0.002, 'silent with music off and nothing playing'); ok('silent when nothing is playing');
  const coin = await g(page, () => new Promise(res => { window.__game.audio.last.clear(); window.__game.audio.play('coin', 1.2); window.__game.audio.play('ok', 1.2); let m = 0; const t0 = performance.now(); const tick = () => { m = Math.max(m, window.__game.audio.level()); if (performance.now() - t0 < 400) setTimeout(tick, 10); else res(m); }; tick(); })); assert.ok(coin > 0.002, 'coin level ' + coin); ok(`the coin and ok sounds are really produced (peak level ${coin.toFixed(3)})`);
  await g(page, () => window.__game.audio.update({ music: 1, sfx: 0 })); await sleep(300); const music = await peak(page, 3500); assert.ok(music > 0.002, 'music level ' + music); ok(`light music is really produced (peak level ${music.toFixed(3)})`);
  await g(page, () => window.__game.audio.update({ music: 0 })); await sleep(1800); const after = await peak(page, 500); assert.ok(after < music * 0.2 + 0.002, `after music off ${after}`); ok('music volume 0 silences it');
  await g(page, () => window.__game.audio.update({ music: 1, sfx: 1, on: true })); await page.click('#muteBtn'); await sleep(1500); assert.equal(await g(page, () => window.__game.audio.set.on), false); const muted = await peak(page, 500); assert.ok(muted < 0.002, 'muted ' + muted); assert.equal(await g(page, () => document.querySelector('#muteBtn').textContent), '🔇'); ok('the 🔊 button mutes everything');
  await page.click('#muteBtn'); await g(page, () => { window.__game.audio.update({ music: 0, sfx: 1, on: true }); window.__game.ctrl.mode = 'drive'; window.__game.ctrl.applyMode(); window.__game.ctrl.car.v = 14; }); await sleep(600); const eng = await peak(page, 600); assert.ok(eng > 0.0015, 'engine ' + eng); ok(`the car engine hum follows driving (peak level ${eng.toFixed(3)})`);
  await g(page, () => { window.__game.ctrl.mode = 'walk'; window.__game.ctrl.applyMode(); }); await sleep(1200); assert.ok((await peak(page, 300)) < eng * 0.4, 'engine fades on foot'); ok('and fades when you get out');
  await g(page, () => window.__game.ui.phone('more')); await page.waitForSelector('[data-sound="music"]', { timeout: 10000 }); ok('More > Sound has the music and effects sliders');
  const real = errors.filter(e => !/GPU/i.test(e) && !/HTTP 401/.test(e) && !/status of 401/.test(e)); assert.equal(real.length, 0, 'console errors: ' + real.slice(0, 3).join(' || '));
} catch (e) { failed = true; console.error('FAIL', e.message); console.error(e.stack?.split('\n').slice(1, 3).join('\n')); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
