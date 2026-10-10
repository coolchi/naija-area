// Real radio defaults (10 Oct 2026): ON in the static demo and on the server unless NA_REAL_RADIO=0 or an admin turns it off.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { makeServer, ok } from './helpers.js';
const read = (f) => fs.readFileSync(new URL(f, import.meta.url), 'utf8');
test('demo default: the static demo switches real radio ON (and nothing in the demo turns it off); the demo README says so honestly', () => {
  const e = read('../demo-src/entry.js'); assert.match(e, /realRadio: true/); assert.doesNotMatch(e, /realRadio: false/);
  const b = read('../tools/build-demo.mjs'); assert.match(b, /real Lagos stations/); assert.match(b, /NOT verified by ear/); assert.match(b, /written permission/); assert.doesNotMatch(b, /No server, no internet needed/);
  const r = read('../docs/RADIO.md'); assert.match(r, /demo.*real radio.*ON/is); assert.match(r, /no written permission/i);
});
test('server default: /api/config says realRadio true with NA_REAL_RADIO unset, false with NA_REAL_RADIO=0, and the admin switch overrides at runtime', async () => {
  const old = process.env.NA_REAL_RADIO; try {
    delete process.env.NA_REAL_RADIO; const a = makeServer(); assert.equal((await ok(a, 'GET', '/api/config')).realRadio, true);
    const off = await ok(a, 'POST', '/api/admin/radio', { admin: true, body: { enabled: false } }); assert.equal(off.realRadio, false); assert.equal((await ok(a, 'GET', '/api/config')).realRadio, false);
    process.env.NA_REAL_RADIO = '0'; const b = makeServer(); assert.equal((await ok(b, 'GET', '/api/config')).realRadio, false);
    process.env.NA_REAL_RADIO = '1'; const c = makeServer(); assert.equal((await ok(c, 'GET', '/api/config')).realRadio, true);
  } finally { if (old === undefined) delete process.env.NA_REAL_RADIO; else process.env.NA_REAL_RADIO = old; }
});
