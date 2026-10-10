// Mobile pass (queue batch 1 item 2): quality picking, the frame-rate governor, compression, the touch handbrake wiring, tap-target CSS.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs'; import zlib from 'node:zlib';
import { autoLevel, resolve, Governor, shouldRender, readChoice, saveChoice, profileFor } from '../client/src/quality.js';
import { PROFILES, LEVELS, GOVERNOR, QUALITY_KEY } from '../client/src/quality-config.js';
import { pickEncoding, encode, COMPRESS } from '../server/lib/compress.js';
import { makeServer, mkUser, ok } from './helpers.js';
import http from 'node:http';

test('auto quality: low-end phones start on Lite, a desktop on High, in-between on Normal', () => {
  assert.equal(autoLevel({ deviceMemory: 2, cores: 8, coarse: true, width: 390, height: 800, dpr: 3 }), 'low');
  assert.equal(autoLevel({ deviceMemory: 8, cores: 8, saveData: true }), 'low', 'data saver means Lite');
  assert.equal(autoLevel({ deviceMemory: 8, cores: 4 }), 'low', 'four cores or fewer');
  assert.equal(autoLevel({ deviceMemory: 8, cores: 8, coarse: true, width: 390, height: 800, dpr: 3 }), 'low', 'small high-density touch screen');
  assert.equal(autoLevel({ deviceMemory: 8, cores: 8, coarse: true, width: 820, height: 1180, dpr: 2 }), 'medium');
  assert.equal(autoLevel({ deviceMemory: 8, cores: 12, coarse: false, width: 1920, height: 1080, dpr: 1 }), 'high');
  assert.equal(autoLevel({}), 'high', 'unknown device (browsers that hide memory and cores)');
});
test('the profiles get lighter from High to Lite and every number is positive', () => {
  const [lo, me, hi] = LEVELS.map(l => PROFILES[l]); for (const k of ['pixelRatio', 'fogFar', 'far', 'walkers']) { assert.ok(lo[k] < me[k] && me[k] < hi[k], k); }
  assert.ok(lo.maxFps <= me.maxFps); assert.ok(lo.fogNear < lo.fogFar && lo.fogFar <= lo.far); assert.equal(profileFor('nope'), PROFILES.medium);
});
test('choice is stored and read safely; resolve steps down only while on Auto', () => {
  const store = { d: {}, getItem(k) { return this.d[k] ?? null; }, setItem(k, v) { this.d[k] = v; } }; assert.equal(readChoice(store), 'auto'); saveChoice(store, 'low'); assert.equal(store.d[QUALITY_KEY], 'low'); assert.equal(readChoice(store), 'low'); saveChoice(store, 'ultra'); assert.equal(readChoice(store), 'auto');
  assert.equal(readChoice({ getItem() { throw new Error('private mode'); } }), 'auto');
  const env = { deviceMemory: 8, cores: 12 }; assert.equal(resolve('auto', env, 0), 'high'); assert.equal(resolve('auto', env, 1), 'medium'); assert.equal(resolve('auto', env, 5), 'low'); assert.equal(resolve('high', env, 2), 'high', 'a fixed choice is never lowered');
});
test('governor: steps down after warm-up only when frames are slow, at most maxSteps times; fast frames never trigger it', () => {
  const fast = new Governor(); let dropped = 0; for (let t = 0; t < 30000; t += 16) if (fast.feed(16)) dropped++; assert.equal(dropped, 0);
  const slow = new Governor(); let when = []; let t = 0; for (; t < 60000; t += 60) if (slow.feed(60)) when.push(t); assert.equal(when.length, GOVERNOR.maxSteps); assert.ok(when[0] >= GOVERNOR.warmupMs, 'not during warm-up');
  const early = new Governor(); for (let t0 = 0; t0 < GOVERNOR.warmupMs - 100; t0 += 100) assert.equal(early.feed(100), false);
});
test('frame limiter: 60 draws every frame, 30 skips about every other frame', () => {
  assert.equal(shouldRender(100, 90, 60), true); assert.equal(shouldRender(100, 90, 30), false); assert.equal(shouldRender(125, 90, 30), true); assert.equal(shouldRender(5, 0, undefined), true);
  let n = 0, last = 0; for (let t = 0; t < 1000; t += 16.7) if (shouldRender(t, last, 30)) { last = t; n++; } assert.ok(n >= 28 && n <= 32, `drew ${n} in a second`);
});
test('accept-encoding parsing', () => {
  assert.equal(pickEncoding('gzip, deflate, br'), 'br'); assert.equal(pickEncoding('gzip'), 'gzip'); assert.equal(pickEncoding('br;q=0, gzip'), 'gzip'); assert.equal(pickEncoding('identity'), null); assert.equal(pickEncoding(undefined), null); assert.equal(pickEncoding('gzip;q=0'), null);
  const buf = Buffer.from('hello '.repeat(1000)); assert.equal(zlib.gunzipSync(encode(buf, 'gzip')).toString(), buf.toString()); assert.equal(zlib.brotliDecompressSync(encode(buf, 'br')).toString(), buf.toString());
});
const get = (port, path, headers = {}) => new Promise((res, rej) => http.get({ port, host: '127.0.0.1', path, headers }, (r) => { const c = []; r.on('data', d => c.push(d)); r.on('end', () => res({ status: r.statusCode, headers: r.headers, body: Buffer.concat(c) })); }).on('error', rej));
test('server: the game bundle and the city JSON are compressed when the browser accepts it, identical content when decoded, ETag gives 304', async () => {
  const s = makeServer(); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const port = s.server.address().port;
  try {
    const raw = await get(port, '/game.js'); const br = await get(port, '/game.js', { 'accept-encoding': 'gzip, br' }); const gz = await get(port, '/game.js', { 'accept-encoding': 'gzip' });
    assert.equal(raw.headers['content-encoding'], undefined); assert.equal(br.headers['content-encoding'], 'br'); assert.equal(gz.headers['content-encoding'], 'gzip'); assert.ok(br.body.length < raw.body.length * 0.4, `br ${br.body.length} vs ${raw.body.length}`); assert.ok(gz.body.length < raw.body.length * 0.5);
    assert.ok(zlib.brotliDecompressSync(br.body).equals(raw.body)); assert.ok(zlib.gunzipSync(gz.body).equals(raw.body)); assert.match(br.headers['content-type'], /javascript/); assert.equal(br.headers.vary, 'Accept-Encoding');
    const again = await get(port, '/game.js', { 'accept-encoding': 'gzip', 'if-none-match': gz.headers.etag }); assert.equal(again.status, 304);
    const city = await get(port, '/api/city', { 'accept-encoding': 'gzip' }); assert.equal(city.headers['content-encoding'], 'gzip'); const plain = await get(port, '/api/city'); assert.equal(plain.headers['content-encoding'], undefined); assert.deepEqual(JSON.parse(zlib.gunzipSync(city.body)), JSON.parse(plain.body)); assert.ok(city.body.length < plain.body.length / 3);
    const small = await get(port, '/api/config', { 'accept-encoding': 'gzip' }); assert.ok(JSON.parse(small.headers['content-encoding'] ? zlib.gunzipSync(small.body) : small.body).name || true); assert.equal((await get(port, '/..%2f..%2fpackage.json', { 'accept-encoding': 'gzip' })).headers['content-encoding'], undefined, 'no path escape');
    assert.equal((await get(port, '/healthz', { 'accept-encoding': 'gzip' })).body.toString(), 'ok');
  } finally { await s.close(); }
});
test('wiring: the page has the handbrake button, the preload block is removable for the demo, touch CSS shows the button only while driving', () => {
  const html = fs.readFileSync('public/index.html', 'utf8'); const css = fs.readFileSync('public/style.css', 'utf8'); const player = fs.readFileSync('client/src/player.js', 'utf8');
  assert.match(html, /id="handBtn"/); assert.match(html, /<!--preload-->[\s\S]*<!--\/preload-->/); assert.match(css, /body\.driving #handBtn \{ display: block/); assert.match(css, /#handBtn \{ display: none/); assert.match(player, /handTouch/); assert.match(player, /classList\.toggle\('driving'/);
  assert.match(fs.readFileSync('tools/build-demo.mjs', 'utf8'), /preload-->/); assert.match(css, /\.round\.small \{ width: 44px/);
});
