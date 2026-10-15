// Adds Iron Gate Armoury (gun shop + bodyguard desk) to Lagos Mainland south promenade.
// GENERIC name. Idempotent. Usage: node tools/add-gun-shop.mjs
import fs from 'node:fs';
const F = new URL('../server/config/cities/lagos-mainland.json', import.meta.url);

export function addGunShop(city) {
  if (city.venues.some(v => v.id === 'venue_armoury')) return city;
  const x = 100;
  const clash = city.buildings.some(b => Math.abs(b.x - x) < (b.w + 14) / 2 + 2 && Math.abs(b.z - 158.8) < (b.d + 10) / 2 + 2);
  if (clash) throw new Error('armoury kiosk clash at x=' + x);
  const b = { kind: 'kiosk', x, z: 158.8, w: 14, d: 10, h: 4.5, floors: 1, color: '#1a1f28', face: [0, 1], id: `b${String(city.buildings.length + 1).padStart(3, '0')}`, tag: 'armoury', sign: '#c0392b', label: 'Iron Gate Armoury' };
  city.buildings.push(b);
  const door = { buildingId: b.id, x: +b.x.toFixed(1), z: +(b.z - b.d / 2 - 3).toFixed(1) };
  const checker = (a, c) => ({ style: 'checker', a, b: c });
  city.venues.push({
    id: 'venue_armoury',
    name: 'Iron Gate Armoury',
    blurb: 'Buy a gun (₦100 million to ₦2 billion) and keep it. Hire a bodyguard for ₦20 million a week or ₦1 billion a year. Placeholder prices (ESTIMATE). Game money only.',
    ...door,
    hours: [9, 21],
    sign: '#c0392b',
    kind: 'armoury',
    gunShop: true,
    bodyguardDesk: true,
    stations: [
      { id: 'rack', type: 'gun', label: 'Gun rack', x: -1.2, z: -0.8, color: '#c0392b' },
      { id: 'guarddesk', type: 'bodyguard', label: 'Bodyguard hire desk', x: 2.8, z: -2.2, color: '#2c3e50' },
      { id: 'poster', type: 'poster', label: 'Price board', x: -4.2, z: 2.6, color: '#f0c419', text: 'Guns ₦100M to ₦2B. Bodyguard ₦20M/week or ₦1B/year. Placeholder prices (ESTIMATE). Game money only. Open 9:00 to 21:00.' }
    ],
    room: {
      w: 11, d: 9, wall: '#1e2430', trim: '#c0392b', floor: checker('#2a3140', '#1a1f28'),
      windows: [{ wall: 'left', at: 0, w: 2.4, big: true }], mood: 'cool',
      decor: [
        { k: 'glassCase', x: -3.2, z: -3.5, w: 1.8, seed: 7 },
        { k: 'glassCase', x: -0.8, z: -3.5, w: 1.8, seed: 9 },
        { k: 'guard', x: 4.2, z: 2.8, yaw: Math.PI },
        { k: 'desk', x: 2.6, z: -2.4 },
        { k: 'art', x: -4.6, z: -1.2, w: 1.1, h: 0.7, kind: 'bars', y: 1.8 },
        { k: 'clock', x: 0, z: -4.2, y: 2.5 },
        { k: 'plant', x: -4.6, z: 3.4 },
        { k: 'plant', x: 4.6, z: -3.4 },
        { k: 'bench', x: -2.2, z: 3.2, w: 2.2 },
        { k: 'crowd', x: 0.4, z: 1.4, n: 2, r: 0.9, yaw: -Math.PI / 2, seed: 21 }
      ],
      detailV2: true
    }
  });
  return city;
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  const c = JSON.parse(fs.readFileSync(F));
  addGunShop(c);
  fs.writeFileSync(F, JSON.stringify(c, null, 1));
  console.log('gun shop added');
}
