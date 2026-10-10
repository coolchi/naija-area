// In-car radio logic (10 Oct 2026). PURE: no DOM, no audio, so tests can check it. Four FICTIONAL stations; the "playlist clock" is a function of the server time,
// so every player in the same car sound hears the same track at the same moment. Audio is generated in the browser (see radio-audio.js); nothing is streamed or downloaded.
// Track and station names are invented. See docs/RADIO.md.
export const STATIONS = [
  { id: 'eko', name: 'Eko FM', freq: '98.5', mood: 'Afrobeats hits', bpm: 104, root: 55, scale: 'minor', sound: 'afro', color: '#e0a020', ident: 'Eko FM, the sound of the city',
    tracks: [['Lagos Lights', 170], ['Danfo Dreams', 185], ['Third Mainland Vibes', 160], ['Jollof Season', 175], ['Sunday Hustle', 190]] },
  { id: 'highlife', name: 'Highlife 102', freq: '102.0', mood: 'Highlife and fuji classics', bpm: 118, root: 49, scale: 'major', sound: 'highlife', color: '#2a9d8f', ident: 'Highlife one-oh-two, old school, good time',
    tracks: [['Palm Wine Morning', 200], ['Old Town Dance', 180], ['Egusi Boogie', 165], ['Market Day Swing', 190]] },
  { id: 'gospel', name: 'Grace Gospel', freq: '88.1', mood: 'Gospel and worship', bpm: 76, root: 58, scale: 'major', sound: 'gospel', color: '#6a8fd8', ident: 'Grace Gospel, lifting the day',
    tracks: [['Morning Praise', 210], ['Light of the Land', 195], ['Grateful Heart', 180], ['Sing Again', 205]] },
  { id: 'night', name: 'Night Owl', freq: '107.3', mood: 'Late-night slow jams', bpm: 68, root: 52, scale: 'minor', sound: 'slow', color: '#8a5ad8', ident: 'Night Owl one-oh-seven, stay up with us',
    tracks: [['After Midnight Rain', 220], ['Marina Moon', 200], ['Slow Lane', 190], ['Quiet Streets', 215]] },
];
export const IDENT_SEC = 8; export const STATIC_MS = 350;
/** one station's schedule: ident, track, track, ident, track ... as a repeating cycle (seconds). */
export function schedule(st) { const segs = []; st.tracks.forEach((t, i) => { if (i % 2 === 0) segs.push({ kind: 'ident', name: st.ident, sec: IDENT_SEC, seed: hash(`${st.id}:i:${i}`) }); segs.push({ kind: 'track', name: t[0], sec: t[1], seed: hash(`${st.id}:${t[0]}`) }); }); let at = 0; for (const s of segs) { s.start = at; at += s.sec; } return { segs, cycle: at }; }
export function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
export const cycleSec = (st) => schedule(st).cycle;
/** what a station is playing at a server time (ms): the segment, how far into it, and when it ends. Same answer for every player. */
export function nowPlaying(st, serverMs) {
  const { segs, cycle } = schedule(st); const sec = ((serverMs / 1000) % cycle + cycle) % cycle; const i = segs.findIndex(s => sec >= s.start && sec < s.start + s.sec); const s = segs[i];
  const t = sec - s.start; return { station: st.id, kind: s.kind, name: s.name, seed: s.seed, index: i, t, left: s.sec - t, sec: s.sec, bpm: st.bpm, nextName: segs[(i + 1) % segs.length].name, nextKind: segs[(i + 1) % segs.length].kind };
}
/** the label on the dashboard */
export const labelOf = (st, np) => `${st.name} ${st.freq} · ${np.kind === 'ident' ? 'Station ident' : np.name}`;
/** the radio's state: what the driver asked for, and when sound is allowed. It never plays outside a car and never before a tap or key press. */
export class RadioState {
  constructor({ saveData = false } = {}) { this.station = 0; this.volume = 0.6; this.muted = false; this.inCar = false; this.wantOn = false; this.gesture = false; this.saveData = saveData; this.switchedAt = -1e9; this.log = []; }
  /** a tap or key press happened: browsers now allow audio */
  userGesture() { this.gesture = true; }
  enterCar() { this.inCar = true; this.log.push('enter'); if (this.saveData && !this.gesture) this.wantOn = false; }
  /** leaving the car stops the radio and forgets nothing else (station, volume) */
  leaveCar() { this.inCar = false; this.log.push('leave'); }
  /** the power key / button: this is a user gesture, so it also unlocks audio */
  power(now = 0) { this.userGesture(); if (!this.inCar) return false; this.wantOn = !this.wantOn; if (this.wantOn) this.muted = false; this.switchedAt = now; return this.wantOn; }
  next(now = 0) { return this.tune(1, now); } prev(now = 0) { return this.tune(-1, now); }
  tune(d, now = 0) { this.userGesture(); if (!this.inCar) return this.station; this.station = (this.station + d + STATIONS.length) % STATIONS.length; if (!this.wantOn) this.wantOn = true; this.muted = false; this.switchedAt = now; return this.station; }
  setVolume(v) { this.volume = Math.max(0, Math.min(1, Number(v) || 0)); if (this.volume > 0) this.muted = false; }
  toggleMute() { this.userGesture(); this.muted = !this.muted; return this.muted; }
  /** sound is on only when: in a car, asked for, a gesture happened, not muted, volume above zero */
  get playing() { return this.inCar && this.wantOn && this.gesture && !this.muted && this.volume > 0; }
  get gain() { return this.playing ? this.volume : 0; }
  /** the static burst after a switch lasts STATIC_MS */
  staticLeft(now) { return Math.max(0, this.switchedAt + STATIC_MS - now); }
  get current() { return STATIONS[this.station]; }
}
/** low-data or battery-saver hints the browser may give (not all browsers do): true means the radio stays off until the driver asks */
export function lowDataHint(nav) { try { const c = nav?.connection; return !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))); } catch { return false; } }
