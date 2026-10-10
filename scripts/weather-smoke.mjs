// Weather smoke (rain white-out fix, 10 Oct 2026): real server + headless Chrome at midday. Screenshots of the SAME spot in clear weather and after ~36 s of storm (the old code had shrunk the fog to ~60 m by then and
// to nothing after ~80 s). Asserts: fog never below the floors in weather-config.js, the storm picture is not a flat colour (the luminance spread of the scene stays above a floor) and is not much brighter than clear.
// Usage: npm run build && node scripts/weather-smoke.mjs [state]  -> screenshots/weather-<state>-clear.png, weather-<state>.png. Looks are NOT judged beyond those numbers.
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js'; import * as W from '../server/core/weather.js'; import { WEATHER_VIEW as V } from '../client/src/weather-config.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true }); const state = process.argv[2] || 'storm'; const night = process.argv[3] === 'night';
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false;
{ const c = s.app.balance.worldClock; c.startRealMs = s.app.clock.now() - ((night ? 1 : 13) * 60 / c.gameMinutesPerRealMinute) * 60000; }
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1100,700'], defaultViewport: { width: 1100, height: 700 } });
const sleep = (ms) => new Promise(r => setTimeout(r, ms)); const ok = (m) => console.log(`  ✓ ${m}`); let failed = false; const errors = [];
const join = async () => { const ctx = await browser.createBrowserContext(); const page = await ctx.newPage(); page.on('pageerror', e => errors.push(String(e))); await page.setViewport({ width: 1100, height: 700 }); await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#auth:not(.hidden)', { timeout: 30000 }); await page.click('#age18'); await page.click('#authGo'); await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); return page; };
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await sleep(2500); };
const fogOf = (page) => page.evaluate(() => { const G = window.__game, f = G.scene.fog; return { state: G.weather.state, near: f.near, far: f.far }; });
/** luminance mean and spread of the middle band of a screenshot (the scene, not the HUD corners) */
const stats = async (png) => { const p = await browser.newPage(); const r = await p.evaluate(async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(Math.floor(img.width * 0.2), Math.floor(img.height * 0.25), Math.floor(img.width * 0.6), Math.floor(img.height * 0.7)).data; let m = 0, n = 0; const L = []; for (let i = 0; i < d.length; i += 16) { const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; L.push(l); m += l; n++; } m /= n; let v = 0; for (const l of L) v += (l - m) ** 2; return { mean: m, sd: Math.sqrt(v / n) }; }, png.toString('base64')); await p.close(); return r; };
try {
  console.log(`Naija Area weather smoke: ${state}${night ? ' at night' : ' at midday'}`);
  const a = await join(), b = await join(); await tp(a, 60, 8); await tp(b, 60, 24); await a.evaluate(() => { window.__game.ctrl.camYaw = 0; });
  W.force(s.app, 'clear'); await sleep(6000); const clearPng = await a.screenshot({ path: `screenshots/weather-${state}${night ? '-night' : ''}-clear.png` }); const c0 = await stats(clearPng);
  W.force(s.app, state); let worst = { near: 1e9, far: 1e9 }; for (let i = 0; i < 6; i++) { await sleep(6000); const f = await fogOf(a); worst = { near: Math.min(worst.near, f.near), far: Math.min(worst.far, f.far) }; }
  const stormPng = await a.screenshot({ path: `screenshots/weather-${state}${night ? '-night' : ''}.png` }); const c1 = await stats(stormPng); const f = await fogOf(a);
  console.log('  · fog', JSON.stringify(f), 'worst', JSON.stringify(worst), 'clear', JSON.stringify(c0), state, JSON.stringify(c1));
  assert.equal(f.state, state); assert.ok(worst.near >= V.minNear && worst.far >= V.minFar, 'fog floors held'); ok(`fog stayed at or beyond the floors (near ${worst.near.toFixed(0)} m, far ${worst.far.toFixed(0)} m)`);
  assert.ok(c1.sd >= Math.min(12, c0.sd * 0.4), `the ${state} scene is not a flat colour (spread ${c1.sd.toFixed(1)} vs clear ${c0.sd.toFixed(1)})`); ok('the picture still has detail (not a flat colour)');
  assert.ok(c1.mean <= Math.max(c0.mean + 25, 200), `not washed out (mean ${c1.mean.toFixed(0)} vs clear ${c0.mean.toFixed(0)})`); ok('not brighter than clear weather by much');
  const real = errors.filter(e => !/GPU/i.test(e)); assert.equal(real.length, 0, 'page errors: ' + real.join(' || ')); ok('no page errors'); console.log('WEATHER SMOKE PASSED');
} catch (e) { failed = true; console.error('WEATHER SMOKE FAILED:', e.stack || e.message); console.error(errors.slice(0, 5)); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
