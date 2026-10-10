// Adds the City Sports Hall to Lekki (idempotent): a building next to the City Stadium (across Coastal Road, beside Beach Canteen) and the venue 'lk_venue_sports' with
// two ping pong tables, a tennis court, a games lounge (existing table games) and four "coming soon" slots (chess, word duel, Lagos property game, Suwe) that light up by themselves
// once those games are registered in server/core/games.js GAMES (a slot's `game` or one of its `alts` must be a registered game id).
// The JSON is the source of truth. If you regenerate Lekki with tools/gen-lagos-districts.mjs, run this tool again afterwards.   Usage: node tools/add-sports-hall.mjs
import fs from 'node:fs';
export const BUILDING = { kind: 'office', x: 222, z: -30, w: 34, d: 24, h: 9, floors: 2, color: '#2f6f8f', face: [0, 1], label: 'City Sports Hall', id: 'lk_b_sports' };
const RULES = 'Game money only. 18+. Ping pong and tennis are turn-based rallies: pick a shot and aim, then stop the timing meter. Friendly games or a stake held safely until the match ends; the winner takes the pot. Beat a bot for a small daily-capped prize. Be respectful: you can be reported, muted or blocked.';
const lounge = (id, game, label, x, z, color, extra = {}) => ({ id, type: 'game', game, label, x, z, color, compact: true, ...extra });
export const VENUE = {
  id: 'lk_venue_sports', name: 'City Sports Hall', blurb: 'Ping pong room, a tennis court and a games lounge: Whot, Ludo, Dominoes, Draughts, Ayo and table football. More games are coming.',
  buildingId: 'lk_b_sports', x: 222, z: -15, hours: [7, 23], sign: '#1f6fb5', kind: 'sports',
  stations: [
    { id: 'pp1', type: 'game', game: 'pingpong', label: 'Ping pong table 1', x: -9.5, z: -6.9, color: '#1f5fa8', sport: 'pingpong' },
    { id: 'pp2', type: 'game', game: 'pingpong', label: 'Ping pong table 2', x: -9.5, z: -3.0, color: '#1f5fa8', sport: 'pingpong' },
    { id: 'tennis1', type: 'game', game: 'tennis', label: 'Tennis court', x: 3.5, z: -6.3, color: '#2e7d4a', sport: 'tennis' },
    lounge('whot1', 'whot', 'Whot', -10.5, 2.6, '#8a5a2b'), lounge('ludo1', 'ludo', 'Ludo', -5.25, 2.6, '#7a4ea0'), lounge('domino1', 'dominoes', 'Dominoes', 0, 2.6, '#2a5f9e'),
    lounge('draughts1', 'draughts', 'Draughts', 5.25, 2.6, '#6b4226'), lounge('ayo1', 'ayo', 'Ayo', 10.5, 2.6, '#6b4226'),
    lounge('football1', 'football', 'Table football', -10.5, 7, '#2e7d32'),
    lounge('chess1', 'chess', 'Chess', -5.25, 7, '#3a3a40'), lounge('wordduel1', 'wordduel', 'Word duel', 0, 7, '#c8a23d'),
    lounge('property1', 'property', 'Lagos property game', 5.25, 7, '#b8322a', { alts: ['lagosproperty', 'propertygame', 'landlord', 'lagosland'] }), lounge('suwe1', 'suwe', 'Suwe (hopscotch)', 10.5, 7, '#e0a020', { soon: 'suwe' }),
    { id: 'board', type: 'board', label: 'Weekly scoreboard', x: 12.4, z: -6, color: '#1f6f4a' },
    { id: 'rules', type: 'poster', label: 'House rules', x: -12.8, z: -0.4, color: '#f0c419', text: RULES }],
  room: { w: 28, d: 20, wall: '#e9eef2', trim: '#1f6fb5', floor: { style: 'checker', a: '#d3d9de', b: '#c2c9cf' }, windows: [{ wall: 'back', at: -6, w: 2.4 }, { wall: 'back', at: 9.5, w: 2.4 }, { wall: 'left', at: 3, w: 2 }], mood: 'bright', door: 'Enter',
    decor: [{ k: 'flag', x: -1.5, z: -9.85, y: 2.2 }, { k: 'clock', x: 12.4, z: -9.85, y: 2.5 }, { k: 'art', x: -13.85, z: -6, w: 1.6, h: 1.0, kind: 'bars' }, { k: 'plant', x: 13, z: 9, h: 1.5 }, { k: 'plant', x: -13, z: 9, h: 1.5 }, { k: 'bench', x: 3.5, z: -1.2, w: 3.2 }, { k: 'waterDispenser', x: 12.6, z: 0.4 }, { k: 'crowd', x: 3.5, z: -0.1, n: 3, r: 1.8, seed: 9 }], detailV2: true } };
export function addSportsHall(c) {
  if (c.id !== 'lagos-lekki') throw new Error('this tool edits lagos-lekki.json');
  const bi = c.buildings.findIndex(b => b.id === BUILDING.id); if (bi >= 0) c.buildings[bi] = { ...BUILDING }; else c.buildings.push({ ...BUILDING });
  const vi = c.venues.findIndex(v => v.id === VENUE.id); const v = JSON.parse(JSON.stringify(VENUE)); if (vi >= 0) c.venues[vi] = v; else c.venues.push(v); return c;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const f = 'server/config/cities/lagos-lekki.json'; const c = JSON.parse(fs.readFileSync(f, 'utf8')); addSportsHall(c); fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('sports hall added:', c.venues.find(v => v.id === VENUE.id).stations.length, 'stations');
}
