// Renders the prop catalogue (contact sheets) with headless Chrome: node scripts/props-preview.mjs  -> screenshots/props-sheet-N.png
import puppeteer from 'puppeteer-core'; import fs from 'node:fs'; import { execSync } from 'node:child_process';
const CHROME = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => fs.existsSync(p));
execSync('npx esbuild scripts/props-preview-entry.js --bundle --format=iife --outfile=/tmp/props-preview.js --log-level=error'); fs.writeFileSync('/tmp/props.html', '<html><body style="margin:0;background:#222"><canvas id="c" width="1280" height="720"></canvas><script src="props-preview.js"></script></body></html>');
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); p.on('pageerror', e => console.log('PAGE ERROR', e.message)); p.on('console', m => m.type() === 'error' && console.log('console:', m.text()));
await p.goto('file:///tmp/props.html'); const n = 20; let k = 0;
for (let i = 0; i < 44; i += n) { const names = await p.evaluate((a, z) => window.render(a, z), i, i + n); await p.screenshot({ path: `screenshots/props-sheet-${++k}.png` }); console.log(`sheet ${k}:`, names.join(', ')); }
await b.close();
