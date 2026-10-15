// Ensure every mosque building has an enterable prayer-hall venue (shared interior template).
// Door sits on the building face so enterRadius works for large mosques. Sacred clear-zone
// tests must allow kind==='mosque' venues (they ARE the house of worship).

export const MOSQUE_STATIONS = [
  { id: 'mihrab', type: 'pray', style: 'mihrab', label: 'Prayer hall', x: 0, z: -3.2, color: '#2a9d8f' },
  { id: 'mats', type: 'rest', style: 'mats', label: 'Prayer mats', x: 0, z: 1.0, color: '#008751' },
  {
    id: 'poster', type: 'poster', label: 'Notice', x: 3.8, z: -1.2, color: '#e9c46a',
    text: 'Assalamu alaikum. Pray in peace. Remove your shoes. No fighting inside the mosque.',
  },
];

export const MOSQUE_ROOM = {
  w: 11, d: 11,
  wall: '#e8f5e9', trim: '#2a9d8f',
  floor: { style: 'tile', a: '#cfe8d4', b: '#b8dcc0' },
  mood: 'warm', door: 'Enter',
  windows: [{ wall: 'back', at: -2.2, w: 1.6 }, { wall: 'back', at: 2.2, w: 1.6 }],
  decor: [
    { k: 'mihrab', x: 0, z: -4.8 },
    { k: 'rug', x: 0, z: 0.2, w: 6.5, d: 5.2, c: '#008751' },
    { k: 'rug', x: -2.2, z: 1.6, w: 1.4, d: 2.2, c: '#1b6e3a' },
    { k: 'rug', x: 2.2, z: 1.6, w: 1.4, d: 2.2, c: '#1b6e3a' },
    { k: 'shoes', x: -4.4, z: 4.2 },
    { k: 'lanterns', x: 0, z: 0, c: ['#f2c230', '#2a9d8f', '#e9c46a', '#008751', '#f2c230', '#2a9d8f', '#e9c46a'] },
    { k: 'crowd', x: 0, z: 1.2, n: 10, r: 2.4, seed: 11, yaw: Math.PI },
    { k: 'plant', x: -4.2, z: -3.6 },
    { k: 'plant', x: 4.2, z: -3.6 },
  ],
  detailV2: true,
};

function doorOf(b) {
  const fx = Array.isArray(b.face) ? (b.face[0] || 0) : 0;
  const fz = Array.isArray(b.face) ? (b.face[1] ?? -1) : -1;
  return { x: b.x + fx * (b.w / 2 + 1.5), z: b.z + fz * (b.d / 2 + 1.5) };
}

function covered(venues, b) {
  return (venues || []).some((v) => {
    if (v.kind !== 'mosque') return false;
    if (v.buildingId === b.id) return true;
    return Math.hypot((v.x || 0) - b.x, (v.z || 0) - b.z) < Math.max(b.w, b.d) * 0.6 + 4;
  });
}

/** Attach / create a prayer-hall venue for every mosque building in the city. */
export function injectMosqueVenues(c) {
  if (!c) return c;
  c.venues = c.venues || [];
  const mosques = (c.buildings || []).filter((b) => b.model === 'mosque');
  for (const b of mosques) {
    const door = doorOf(b);
    const existing = c.venues.find((v) => v.kind === 'mosque' && (v.buildingId === b.id || Math.hypot((v.x || 0) - b.x, (v.z || 0) - b.z) < Math.max(b.w, b.d) * 0.6 + 4));
    if (existing) {
      existing.buildingId = b.id;
      existing.x = door.x; existing.z = door.z;
      existing.name = existing.name || b.label || 'Mosque';
      existing.blurb = existing.blurb || 'A place of prayer. Remove your shoes; be respectful.';
      existing.hours = existing.hours || [5, 22];
      existing.sign = existing.sign || '#2a9d8f';
      existing.kind = 'mosque';
      existing.stations = MOSQUE_STATIONS.map((s) => ({ ...s }));
      existing.room = JSON.parse(JSON.stringify(MOSQUE_ROOM));
      continue;
    }
    if (covered(c.venues, b)) continue;
    const id = b.id === 'mn_0001' ? 'venue_mosque' : `venue_mosque_${b.id}`;
    if (c.venues.some((v) => v.id === id)) continue;
    c.venues.push({
      id,
      name: b.label || 'Mosque',
      blurb: 'A place of prayer. Remove your shoes; be respectful.',
      buildingId: b.id,
      x: door.x, z: door.z,
      hours: [5, 22],
      sign: '#2a9d8f',
      kind: 'mosque',
      stations: MOSQUE_STATIONS.map((s) => ({ ...s })),
      room: JSON.parse(JSON.stringify(MOSQUE_ROOM)),
    });
  }
  return c;
}
