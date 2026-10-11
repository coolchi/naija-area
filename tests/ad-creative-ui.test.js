// Advertiser step 3 (drop zone, local checks, mock card): the pure checks, the page markup, and that the page is allowed by the CSP. The browser behaviour is in scripts/ad-ui-smoke.mjs (npm run smoke:adui).
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { checkFile, checkDims, parseSize, fmtBytes, ratioText, TYPES, ASPECT_TOL } from '../public/js/creative-check.js';
import { RATE_CARD } from '../server/config/ratecard.js'; import { makeServer } from './helpers.js';

const L = { maxBytes: RATE_CARD.maxImageBytes, minPx: RATE_CARD.minImagePx, maxPx: RATE_CARD.maxImagePx };
test('the limits the page shows are the server\'s own (they come from the rate card, not copies)', () => { assert.equal(L.maxBytes, 1_000_000); assert.ok(L.minPx >= 1 && L.maxPx > L.minPx); assert.equal(ASPECT_TOL, 0.2); const src = fs.readFileSync('server/core/ads.js', 'utf8'); assert.match(src, /\/ spec\.aspect > 0\.2\)/, 'the server tolerance is still 20%'); });
test('parseSize, ratioText and fmtBytes', () => {
  assert.deepEqual(parseSize('1024x512 (2:1)'), { w: 1024, h: 512 }); assert.deepEqual(parseSize('768x768 (square)'), { w: 768, h: 768 }); assert.equal(parseSize('nonsense'), null); assert.equal(parseSize(undefined), null);
  assert.equal(ratioText(1024, 512), '2:1'); assert.equal(ratioText(800, 800), '1:1'); assert.equal(ratioText(1920, 1080), '16:9'); assert.equal(ratioText(1001, 337), '2.97:1'); assert.equal(ratioText(0, 5), '?');
  assert.equal(fmtBytes(1_000_000), '1 MB'); assert.equal(fmtBytes(1_400_000), '1.4 MB'); assert.equal(fmtBytes(121_000), '121 KB'); assert.equal(fmtBytes(10), '1 KB');
});
test('checkFile: only PNG, JPEG and WebP, and under the size limit, with plain messages', () => {
  for (const t of TYPES) assert.equal(checkFile({ type: t, size: 5000 }, L).ok, true);
  const gif = checkFile({ type: 'image/gif', size: 5000 }, L); assert.equal(gif.ok, false); assert.match(gif.message, /GIF.*PNG, JPEG or WebP/);
  assert.match(checkFile({ type: '', size: 5 }, L).message, /unknown type/); assert.match(checkFile({ type: 'application/pdf', size: 5 }, L).message, /PDF/i); assert.equal(checkFile(null, L).ok, false);
  assert.equal(checkFile({ type: 'image/png', size: 1_000_000 }, L).ok, true, 'exactly the limit is fine (server: > limit is refused)'); const big = checkFile({ type: 'image/png', size: 1_400_000 }, L); assert.equal(big.ok, false); assert.match(big.message, /1\.4 MB.*limit is 1 MB/);
});
test('checkDims: size limits block; a wrong shape is a strong warning that names the expected size; near-misses are notes', () => {
  const bb = { size: '1024x512 (2:1)', aspect: 2 }, sq = { size: '768x768 (square)', aspect: 1 };
  let r = checkDims(1024, 512, bb, L); assert.deepEqual([r.blocking, r.errors, r.warnings, r.notes, r.shapeOk], [false, [], [], [], true]);
  r = checkDims(0, 0, bb, L); assert.equal(r.blocking, true); assert.match(r.errors[0], /could not be read/);
  r = checkDims(64, 64, sq, L); assert.equal(r.blocking, true); assert.match(r.errors[0], /between 128 and 4096.*64x64/); r = checkDims(5000, 2500, bb, L); assert.equal(r.blocking, true);
  r = checkDims(800, 800, bb, L); assert.equal(r.blocking, false); assert.equal(r.shapeOk, false); assert.match(r.warnings[0], /800x800 \(1:1\).*1024x512 \(2:1\).*refused when you submit/);
  r = checkDims(1000, 520, bb, L); assert.equal(r.shapeOk, true); assert.deepEqual(r.warnings, []); assert.match(r.notes[0], /exactly 1024x512.*1000x520/);
  r = checkDims(1229, 512, bb, L); assert.equal(r.shapeOk, false, '2.4:1 is more than 20% off 2:1'); r = checkDims(1228, 512, bb, L); assert.equal(r.shapeOk, true, '2.398 is within 20%');
  assert.equal(checkDims(768, 768, sq, L).notes.length, 0); assert.equal(checkDims(1024, 512, sq, L).shapeOk, false);
  for (const [k, v] of Object.entries(RATE_CARD.surfaces)) { const sz = parseSize(v.size); assert.ok(sz, k); assert.equal(checkDims(sz.w, sz.h, v, L).shapeOk, true, k + ' its own size always passes'); }
});
test('the advertise page: drop zone markup, accessible controls, module script, no bare file input styling left behind', async () => {
  const html = fs.readFileSync('public/advertise.html', 'utf8');
  for (const id of ['drop', 'file', 'dropImg', 'fileMeta', 'replaceBtn', 'removeBtn', 'mock', 'mockImg', 'mockBadge', 'mcHead', 'mcBrand', 'mcLink', 'hcount', 'headline', 'link', 'e3', 'w3', 'spec']) assert.match(html, new RegExp(`id="${id}"`), id);
  assert.match(html, /id="drop"[^>]*tabindex="0"[^>]*role="button"/); assert.match(html, /<button type="button" class="ghost" id="replaceBtn">Replace<\/button>/); assert.match(html, /<button type="button" class="red" id="removeBtn">Remove<\/button>/);
  assert.match(html, /<input type="file" id="file"[^>]*accept="image\/png,image\/jpeg,image\/webp"/); assert.match(html, /role="alert"/); assert.match(html, /<label for="headline">/); assert.match(html, /maxlength="60"/);
  assert.match(html, /<script type="module" src="\/js\/advertise\.js">/); assert.ok(!/<script>[^<]/.test(html), 'no inline script (the CSP forbids it)');
  const js = fs.readFileSync('public/js/advertise.js', 'utf8'); assert.match(js, /from '\/js\/creative-check\.js'/); assert.match(js, /URL\.revokeObjectURL/); assert.match(js, /URL\.createObjectURL/); assert.ok(!/innerHTML = `[^`]*\$\{\$\('#headline'\)/.test(js), 'headline is never put in via innerHTML');
  assert.match(js, /'\/api\/ads\/upload'/, 'the upload call is unchanged');
  const s = makeServer(); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try { const pg = await fetch(base + '/advertise'); assert.equal(pg.status, 200); assert.match(pg.headers.get('content-security-policy'), /img-src[^;]*blob:/, 'blob: previews are allowed'); assert.doesNotMatch(pg.headers.get('content-security-policy'), /script-src[^;]*unsafe-inline/);
    for (const f of ['/js/creative-check.js', '/js/advertise.js']) { const r = await fetch(base + f); assert.equal(r.status, 200, f); assert.match(r.headers.get('content-type'), /javascript/, f); }
    const css = await (await fetch(base + '/pages.css')).text(); assert.match(css, /\.drop\b/); assert.match(css, /\.mock-card/); assert.match(css, /:focus-visible/);
  } finally { await s.close(); }
});
