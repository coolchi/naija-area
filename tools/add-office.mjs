// Adds the visible Naija Area OFFICE to Lagos Mainland (a building on the central block, a venue with reception, idea box and notice board). Idempotent.
// Usage: node tools/add-office.mjs   (rewrites server/config/cities/lagos-mainland.json)
import fs from 'node:fs';
const F = new URL('../server/config/cities/lagos-mainland.json', import.meta.url);
export function addOffice(city) {
  if (city.venues.some(v => v.id === 'venue_office')) return city;
  const w = 24, d = 16, x = -70, z = 64; const clash = city.buildings.some(b => Math.abs(b.x - x) < (b.w + w) / 2 + 4 && Math.abs(b.z - z) < (b.d + d) / 2 + 4); if (clash) throw new Error('office clash');
  const b = { kind: 'office', x, z, w, d, h: 7, floors: 2, color: '#f4f1e8', sign: '#00a859', label: 'Naija Area Office', face: [0, -1], id: `b${String(city.buildings.length + 1).padStart(3, '0')}`, tag: 'office' }; city.buildings.push(b);
  const checker = (a, c) => ({ style: 'checker', a, b: c });
  city.venues.push({ id: 'venue_office', name: 'Naija Area Office', blurb: 'Apply to join the contributor team, or drop an idea in the idea box. Everyone is welcome.', buildingId: b.id, x, z: +(z - d / 2 - 3.5).toFixed(1), hours: [8, 20], sign: '#00a859', kind: 'office', stations: [
    { id: 'reception', type: 'office', label: 'Reception', x: -2.4, z: -2.4, color: '#00a859', focus: 'apply' },
    { id: 'ideabox', type: 'office', label: 'Idea box', x: 2.6, z: -2.4, color: '#ffc20e', focus: 'ideas' },
    { id: 'poster', type: 'poster', label: 'Notice board', x: -4.2, z: 2.4, color: '#f0c419', text: 'Naija Area is built with help from its players. Apply at reception to join the contributor team (testers, designers, developers, artists, local knowledge, community helpers). Have an idea? Put it in the idea box: we read every one. You need an account (not a guest) so we can find you again. Personal details stay private and you can ask us to delete them.' }],
    room: { w: 10, d: 8, wall: '#f2efe6', trim: '#00a859', floor: checker('#e8e3d3', '#c9d8cf'), windows: [{ wall: 'left', at: 0, w: 2.6, big: true }], mood: 'bright', decor: [
      { k: 'ideaBoard', x: 0.2, z: -3.9 }, { k: 'flag', x: -3.6, z: -3.9, y: 2.2 }, { k: 'clock', x: 3.9, z: -3.9, y: 2.5 }, { k: 'art', x: -4.4, z: -0.6, w: 1.2, h: 0.8, kind: 'bars', y: 1.8 }, { k: 'plant', x: -4.4, z: -3.4 }, { k: 'plant', x: 4.4, z: 3.4 },
      { k: 'desk', x: 3.2, z: 2.2 }, { k: 'table', x: 0.6, z: 1.4, c: '#ffffff' }, { k: 'chair', x: -0.6, z: 1.4, ry: 1.2, c: '#2a9d8f' }, { k: 'chair', x: 1.8, z: 1.4, ry: -1.2, c: '#2a9d8f' }, { k: 'sofa', x: -3.4, z: 3.0, c: '#2a9d8f', rot: 1 }, { k: 'coffeeTable', x: -2.0, z: 3.0 },
      { k: 'waterDispenser', x: 4.4, z: -1.0 }, { k: 'floorLamp', x: 1.8, z: 3.5 }, { k: 'shelf', x: -1.6, z: -3.6, c: '#8a5a2b' }, { k: 'crowd', x: 0.4, z: 0.4, n: 2, r: 0.9, yaw: Math.PI / 2, seed: 9 }], detailV2: true } });
  return city;
}
if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) { const c = JSON.parse(fs.readFileSync(F)); addOffice(c); fs.writeFileSync(F, JSON.stringify(c, null, 1)); console.log('office added'); }
