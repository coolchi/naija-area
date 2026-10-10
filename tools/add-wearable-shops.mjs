// Adds the jewelry store ("Naija Bling") and the cap store ("Cap Shop") to Lagos Mainland: two kiosks on the south promenade and two venues with interiors.
// GENERIC names (no real brands). Idempotent. Usage: node tools/add-wearable-shops.mjs   (rewrites server/config/cities/lagos-mainland.json)
import fs from 'node:fs';
const F = new URL('../server/config/cities/lagos-mainland.json', import.meta.url);
export function addWearableShops(city) {
  if (city.venues.some(v => v.id === 'venue_jewelry')) return city;
  const kiosk = (x, tag, color) => {
    const clash = city.buildings.some(b => Math.abs(b.x - x) < (b.w + 12) / 2 + 2 && Math.abs(b.z - 158.8) < (b.d + 9) / 2 + 2); if (clash) throw new Error('kiosk clash for ' + tag);
    const b = { kind: 'kiosk', x, z: 158.8, w: 12, d: 9, h: 4, floors: 1, color, face: [0, 1], id: `b${String(city.buildings.length + 1).padStart(3, '0')}`, tag }; city.buildings.push(b); return b;
  };
  const kd = (b) => ({ buildingId: b.id, x: +b.x.toFixed(1), z: +(b.z - b.d / 2 - 3).toFixed(1) });
  const bj = kiosk(180, 'jewelry', '#1d1d24'), bc = kiosk(20, 'caps', '#7a1f2b');
  const checker = (a, b) => ({ style: 'checker', a, b });
  city.venues.push(
    { id: 'venue_jewelry', name: 'Naija Bling Jewellers', blurb: 'Chains, rings, earrings, bracelets, watches and anklets. Very expensive: the bigger the piece, the more it costs. Placeholder prices (ESTIMATE). Game money only.', ...kd(bj), hours: [10, 20], sign: '#d4af37', kind: 'jewelry', wearShop: 'jewelry', stations: [
      { id: 'cases', type: 'wear', label: 'Display cases (jewelry)', x: 0, z: -0.6, color: '#d4af37' },
      { id: 'counter', type: 'wear', label: 'Counter: rings and watches', x: 3.2, z: -2.4, color: '#d4af37', focus: 'wrist' },
      { id: 'poster', type: 'poster', label: 'Price board', x: -4.2, z: 2.6, color: '#f0c419', text: 'Jewelry: very expensive, placeholder prices (ESTIMATE). The bigger the piece, the more it costs, so everyone can see who is doing well. Game money only. Open 10:00 to 20:00.' }],
      room: { w: 10, d: 8, wall: '#2b2a33', trim: '#d4af37', floor: checker('#f4f1ea', '#1d1d24'), windows: [{ wall: 'left', at: 0, w: 2.6, big: true }], mood: 'warm', decor: [
        { k: 'glassCase', x: -3.4, z: -3.3, w: 1.9, seed: 0 }, { k: 'glassCase', x: -1.1, z: -3.3, w: 1.9, seed: 2 }, { k: 'glassCase', x: 1.2, z: -3.3, w: 1.9, seed: 4 }, { k: 'glassCase', x: -3.6, z: 0.2, w: 1.6, seed: 1, ry: Math.PI / 2 },
        { k: 'mirror', x: 3.6, z: -3.9 }, { k: 'guard', x: 4.1, z: 2.6, yaw: Math.PI }, { k: 'art', x: -4.4, z: -1.2, w: 1.2, h: 0.8, kind: 'bars', y: 1.8 }, { k: 'clock', x: 0, z: -3.9, y: 2.5 }, { k: 'flag', x: 3.0, z: -3.9, y: 2.2 },
        { k: 'plant', x: -4.4, z: 3.2 }, { k: 'plant', x: 4.4, z: -3.2 }, { k: 'sofa', x: -3.2, z: 3.0, c: '#7a1f2b', rot: 1 }, { k: 'coffeeTable', x: -1.8, z: 3.0 }, { k: 'floorLamp', x: 1.5, z: 3.4 }, { k: 'crowd', x: 1.2, z: 1.6, n: 2, r: 0.9, yaw: -Math.PI / 2, seed: 11 }], detailV2: true } },
    { id: 'venue_caps', name: 'Cap Shop (caps and crowns)', blurb: 'Snapbacks, fila, bucket hats, agbada caps, fedoras and, for the very rich, crowns. Placeholder prices (ESTIMATE). Game money only.', ...kd(bc), hours: [9, 20], sign: '#b3202a', kind: 'caps', wearShop: 'caps', stations: [
      { id: 'rack', type: 'wear', label: 'Caps and hats', x: 0, z: -0.4, color: '#b3202a' },
      { id: 'crowns', type: 'wear', label: 'Crowns (the dearest in the game)', x: 3.4, z: -2.2, color: '#d4af37', focus: 'crown' },
      { id: 'poster', type: 'poster', label: 'Price board', x: -4.2, z: 2.6, color: '#f0c419', text: 'Caps from N50,000, crowns from N20,000,000: placeholder prices (ESTIMATE). Bigger and bolder costs more. Game money only. Open 9:00 to 20:00.' }],
      room: { w: 10, d: 8, wall: '#efe3d0', trim: '#b3202a', floor: checker('#f1e7d3', '#d9c7a6'), windows: [{ wall: 'left', at: 0, w: 2.6, big: true }], mood: 'bright', decor: [
        { k: 'capWall', x: -2.6, z: -3.85, w: 3.4 }, { k: 'capWall', x: 1.0, z: -3.85, w: 3.0 }, { k: 'mirror', x: -4.0, z: 0.4, ry: Math.PI / 2 },
        { k: 'guard', x: 4.1, z: 2.8, yaw: Math.PI }, { k: 'glassCase', x: -1.8, z: 1.8, w: 1.6, seed: 3 }, { k: 'clock', x: 3.4, z: -3.9, y: 2.5 }, { k: 'art', x: -4.4, z: -1.6, w: 1.0, h: 0.7, kind: 'bars', y: 1.8 },
        { k: 'plant', x: -4.4, z: 3.2 }, { k: 'plant', x: 4.4, z: -3.4 }, { k: 'bench', x: 1.6, z: 3.2, w: 2.2 }, { k: 'floorLamp', x: -4.3, z: -3.3 }, { k: 'crowd', x: 1.4, z: 1.2, n: 2, r: 0.8, yaw: Math.PI / 2, seed: 5 }], detailV2: true } }
  );
  return city;
}
if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) { const c = JSON.parse(fs.readFileSync(F)); addWearableShops(c); fs.writeFileSync(F, JSON.stringify(c, null, 1)); console.log('wearable shops added'); }
