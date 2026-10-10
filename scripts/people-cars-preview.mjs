// Renders avatars and vehicles close up: node scripts/people-cars-preview.mjs -> screenshots/people-cars-{people,cars}.png (for the polish rounds)
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import { execSync } from 'node:child_process';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
execSync('npx esbuild scripts/people-cars-preview-entry.js --bundle --format=iife --outfile=/tmp/pc-preview.js --log-level=error'); fs.writeFileSync('/tmp/pc.html', '<html><body style="margin:0"><canvas id="c" width="1280" height="720"></canvas><script src="pc-preview.js"></script></body></html>');
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); p.on('pageerror', e => console.log('PAGE ERROR', e.message)); await p.goto('file:///tmp/pc.html');
for (const v of ['people', 'cars']) { const names = await p.evaluate((x) => window.render(x), v); await p.screenshot({ path: `screenshots/people-cars-${v}.png` }); console.log(v, names.join(', ')); }
await b.close();
