// End-to-end smoke test: real server (in-memory DB) + headless Chrome (software GL). Screenshots land in ./shots.
// Usage: npm run build && node scripts/roads-smoke.mjs   (set CHROME=/path/to/chrome if not at /usr/bin/google-chrome)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import assert from 'node:assert/strict';
import { buildServer } from '../server/createServer.js';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2); }
fs.mkdirSync('screenshots', { recursive: true });
const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'smoke-admin', dev: true }); s.startTimers(); s.app.balance.shops.enforceHours = false; s.app.balance.casual.minAccountAgeMs = 0; // venues have opening hours; the smoke test must pass at any time of day
await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--window-size=1280,760'], defaultViewport: { width: 1280, height: 760 } });
const errors = []; let step = 0; const ok = (m) => console.log(`  ✓ ${m}`);
const shot = async (page, name) => { await page.screenshot({ path: `screenshots/${String(++step).padStart(2, '0')}-${name}.png` }); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function newPage(w = 1280, h = 760, touch = false, fresh = false) { const p = await (fresh ? (await browser.createBrowserContext()).newPage() : browser.newPage()); await p.setViewport({ width: w, height: h, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 }); p.on('pageerror', e => errors.push(String(e))); p.on('response', r => { if (r.status() >= 400 && ![404, 401].includes(r.status())) console.log('  ! HTTP', r.status(), r.request().method(), r.url().replace(/^https?:\/\/[^/]+/, '')); }); p.on('console', m => { if (m.type() === 'error' && !/favicon|404|401 \(Unauthorized\)/.test(m.text())) errors.push(m.text()); }); return p; }
const g = (page, fn, ...a) => page.evaluate(fn, ...a);
const tp = async (page, x, z) => { await page.evaluate((x, z) => fetch('/api/dev/teleport', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ x, z }) }).then(() => window.__game.net.nudge()), x, z); await page.waitForFunction((x, z) => Math.hypot(window.__game.ctrl.x - x, window.__game.ctrl.z - z) < 4, { timeout: 15000 }, x, z); };



// National Stadium shots (23 Oct 2026): the Mainland stadium from the gate, from above, and on the full map. Usage: npm run build && node scripts/national-stadium-shot.mjs [outDir]
const OUT = process.argv[2] || 'screenshots'; fs.mkdirSync(OUT, { recursive: true }); let failed = false;
try {
  const page = await newPage(); await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#auth:not(.hidden)', { timeout: 60000 }); await page.click('[data-t="signup"]'); await page.type('input[name="username"]', 'stadium_fan'); await page.type('input[name="password"]', 'secret-pass-1'); await page.type('input[name="email"]', 'fan@example.com'); await page.click('#age18'); await page.click('#authGo');
  await page.waitForSelector('#setup [data-step="1"]', { timeout: 30000 }); await page.click('#setup [data-city="lagos"]'); await page.click('#setup [data-next]'); await page.waitForSelector('#setup [data-step="2"]');
  await page.click('#setup [data-city="kano"]'); await page.click('#setup [data-next]'); await page.waitForSelector('#setup [data-step="3"]'); await page.click('#setup [data-int="music"]'); await page.click('#setup [data-next]');
  await page.waitForSelector('#hud:not(.hidden)', { timeout: 30000 }); await sleep(3000);
  const v = s.app.cities['lagos-mainland'].venueById.ml_venue_national_stadium; const b = s.app.cities['lagos-mainland'].buildingById[v.buildingId];
  const look = (cam, pitch) => g(page, ([bx, bz, cam, pitch]) => { const c = window.__game.ctrl; c.cam = cam; c.camPitch = pitch; c.ry = Math.atan2(-(bz - c.z), bx - c.x); }, [b.x, b.z, cam, pitch]);
  const RY = process.env.RY ? process.env.RY.split(',').map(Number) : [-Math.PI / 2];
  for (const ry of RY) { await tp(page, v.x, v.z - 22); await sleep(1500); await g(page, ([ry]) => { const c = window.__game.ctrl; c.cam = 14; c.camPitch = 0.3; c.ry = ry; c.camYaw = ry; c.dragT = performance.now() + 1e9; }, [ry]); await sleep(1500); await page.screenshot({ path: `${OUT}/national_stadium_gate${RY.length > 1 ? '_' + ry.toFixed(2) : ''}.png` }); }
  for (const ry of RY) { await tp(page, v.x, v.z - 16); await sleep(1200); await g(page, ([ry]) => { const c = window.__game.ctrl; c.cam = 60; c.camPitch = 0.85; c.ry = ry; c.camYaw = ry; c.dragT = performance.now() + 1e9; }, [ry]); await sleep(1800); await page.screenshot({ path: `${OUT}/national_stadium_aerial${RY.length > 1 ? '_' + ry.toFixed(2) : ''}.png` }); }
  await g(page, () => window.__game.ui.openMap()); await sleep(1500); await page.screenshot({ path: `${OUT}/national_stadium_map.png` });
  const real = errors.filter(e => !/GPU/i.test(e)); if (real.length) console.log('page errors (texture/CSP noise from the software renderer):', real.length); console.log('NATIONAL STADIUM SHOTS DONE');
} catch (e) { failed = true; console.error('FAILED:', e.message); }
await browser.close(); await s.close(); process.exit(failed ? 1 : 0);
