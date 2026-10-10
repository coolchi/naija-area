import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs'; import * as THREE from 'three';
import * as K from '../client/src/props.js'; import { PERF } from '../server/config/perf-budget.js';
const tris = (o) => { let n = 0; o.traverse(m => { if (m.geometry) n += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3; }); return n; };
const bad = (o) => { let b = 0; o.traverse(m => { if (m.geometry) { m.geometry.computeBoundingSphere(); if (!isFinite(m.geometry.boundingSphere.radius)) b++; } }); return b; };
const ALL = { chair: () => K.chair(), stool: () => K.stool(), sofa: () => K.sofa(2.2, 0.95), armchair: () => K.armchair(), bench: () => K.bench(), dining: () => K.diningSet(), ctable: () => K.coffeeTable(), table: () => K.table(), desk: () => K.desk(), bed: () => K.bed(2, 2.1), kingbed: () => K.bed(2.7, 3.9, { king: true }), ward: () => K.wardrobe(), shelf: () => K.bookshelf(), pots: () => K.bookshelf(2.2, 0.4, 1.9, { stuff: 'pots' }), tvu: () => K.tvUnit(), fridge: () => K.fridge(), cooker: () => K.cooker(), counter: () => K.counter(), water: () => K.waterDispenser(), gen: () => K.generator(), plant: () => K.plant(), snake: () => K.plant({ kind: 'snake' }), flamp: () => K.floorLamp(), tlamp: () => K.tableLamp(), rug: () => K.rug(2.6, 2), curtain: () => K.curtain(), art: () => K.wallArt(), flag: () => K.flag(), clock: () => K.clock(), mirror: () => K.mirror(0.8, 1.2, { bulbs: true }), fan: () => K.ceilingFan(), louvre: () => K.louvre(), ac: () => K.acUnit(), speaker: () => K.speaker(1.6), dj: () => K.djBooth(), bar: () => K.barCounter(3), backbar: () => K.backBar(3), barstool: () => K.barStool(), schair: () => K.salonChair(), basin: () => K.washBasin(), dryer: () => K.hairDryer(), toolwall: () => K.toolWall(), wbench: () => K.workbench(), tyres: () => K.tyreStack(), drum: () => K.oilDrum(), cart: () => K.toolCart(), pillar: () => K.pillar(), stairs: () => K.stairs(), chand: () => K.chandelier(), partition: () => K.partition(), bath: () => K.bathroom(), food: () => K.foodCounter(), gtable: () => K.gameTable(), wlight: () => K.wallLight() };
test('every prop builds, has finite vertices and vertex colours, and stays under the per-prop triangle budget', () => {
  let total = 0; for (const [n, f] of Object.entries(ALL)) { const o = f(); assert.equal(bad(o), 0, n + ' has NaN vertices'); const t = tris(o); assert.ok(t > 12, n + ' has geometry'); assert.ok(t <= PERF.interior.propTriangles, `${n}: ${t} triangles over ${PERF.interior.propTriangles}`); o.traverse(m => { if (m.geometry) assert.ok(m.geometry.attributes.color, n + ' has baked vertex colours'); }); total += t; }
  assert.ok(total <= PERF.interior.propCatalogueTriangles, `catalogue ${total} triangles`); console.log(`  props: ${Object.keys(ALL).length} kinds, ${Math.round(total)} triangles for one of each (budget ${PERF.interior.propCatalogueTriangles})`);
});
test('geometry is cached and shared, materials are shared (few draw states for a whole room)', () => {
  const a = K.chair({ c: 0xaa0000 }), b = K.chair({ c: 0xaa0000 }), c = K.chair({ c: 0x00aa00 }); assert.strictEqual(a.children[0].geometry, b.children[0].geometry); assert.notStrictEqual(a.children[0].geometry, c.children[0].geometry); assert.strictEqual(a.children[0].material, c.children[0].material);
  const before = K.propCacheSize(); for (let i = 0; i < 10; i++) K.sofa(2.2, 0.95); K.sofa(2.2, 0.95); assert.ok(K.propCacheSize() - before <= 1, 'ten identical sofas add at most one cached geometry');
});
test('props are sized like real furniture (metres)', () => {
  const box = (o) => new THREE.Box3().setFromObject(o); const sz = (o) => box(o).getSize(new THREE.Vector3());
  const s = sz(K.sofa(2.2, 0.95)); assert.ok(s.x > 2 && s.x < 2.5 && s.y > 0.7 && s.y < 1.1, 'sofa ' + s.toArray()); const f = sz(K.fridge(0.75, 0.7, 1.85)); assert.ok(f.y > 1.8 && f.y < 2.0); const bd = sz(K.bed(2, 2.1)); assert.ok(bd.y > 0.9 && bd.y < 1.3, 'bed with headboard'); const ch = sz(K.chair()); assert.ok(ch.y > 0.85 && ch.y < 1.1);
  const w = sz(K.wardrobe(1.6, 0.65, 2.3)); assert.ok(Math.abs(w.y - 2.3) < 0.1);
});
test('every decor kind used in city config and every house fixture kind has a drawing function', () => {
  const src = fs.readFileSync(new URL('../client/src/rooms.js', import.meta.url), 'utf8'); const keys = new Set(); const grab = (a, b) => { const seg = src.slice(a, b); for (const m of seg.matchAll(/^  (\w+)\(/gm)) keys.add(m[1]); };
  const d0 = src.indexOf('const D = {'), d1 = src.indexOf('\n};', d0); grab(d0, d1); const o0 = src.indexOf('Object.assign(D, {'), o1 = src.indexOf('\n});', o0); grab(o0, o1); const f0 = src.indexOf('const FX = {'), f1 = src.indexOf('\n};', f0); const fx = new Set([...src.slice(f0, f1).matchAll(/^  (\w+)\(/gm)].map(m => m[1]));
  const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))); const bal = fs.readFileSync(new URL('../server/config/balance.js', import.meta.url), 'utf8');
  for (const v of city.venues) for (const o of v.room.decor || []) assert.ok(keys.has(o.k), `${v.id}: decor kind ${o.k} has no drawing function`);
  for (const m of bal.matchAll(/kind: '(\w+)'/g)) assert.ok(fx.has(m[1]), `house fixture kind ${m[1]} has no drawing function`);
});
test('venue wall decor does not sit on top of other wall items (config check) and every venue room got the detail pass', async () => {
  const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))); const { addRoomDetail } = await import('../tools/add-room-detail.mjs');
  for (const v of city.venues) { assert.ok(v.room.detailV2, v.id + ' has the detail pass'); const wall = v.room.decor.filter(o => ['flag', 'clock', 'art', 'mirror', 'shelf', 'toolwall', 'menu'].includes(o.k) && o.z != null && Math.abs(o.z + v.room.d / 2) < 1.4); for (let i = 0; i < wall.length; i++) for (let j = i + 1; j < wall.length; j++) { const a = wall[i], b = wall[j]; if (a.k === 'menu' || b.k === 'menu') continue; assert.ok(Math.abs(a.x - b.x) > 0.5, `${v.id}: ${a.k} and ${b.k} overlap at x=${a.x}`); } }
  const again = JSON.parse(JSON.stringify(city)); addRoomDetail(again); assert.deepEqual(again, city, 'idempotent');
});
test('clubs have a dancing crowd and the same human shape as street walkers', () => {
  const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))); for (const v of city.venues.filter(v => /club/.test(v.id))) { const c = v.room.decor.find(o => o.k === 'crowd'); assert.ok(c && c.dance && c.n >= 6, v.id); }
  assert.ok(PERF.walkers.drawCalls === 7);
});
