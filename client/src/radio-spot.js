// Sponsored radio spots on the in-game (synthesised) stations (item 8). Every `everyMs` of server time one rotation window is a spot: while you are in a car, tuned to a synth station
// with the sound up, a card shows the brand, headline and image under the radio chip and a chime plays once. The client only MEASURES how long the card was up; the server decides (spot window,
// player in a car, 5 s minimum, one spot per window) - see ads.js. Real stations are never interrupted.
import { h } from './api.js';

/** where server time sits against the spot timeline: pure, shared with the tests */
export function spotClock(serverMs, rotationMs, everyMs) { const win = Math.floor(serverMs / rotationMs); return { win, inSpot: (win * rotationMs) % everyMs === 0, msIn: serverMs - win * rotationMs }; }

export class RadioSpots {
  constructor(game) {
    this.g = game; this.win = -1; this.listened = 0; this.slot = null; this.cur = null; this.chimed = -1; this.img = null; this.imgId = null;
    this.card = h('div', { id: 'radioSpot', class: 'pill hidden', title: 'Sponsored spot on this in-game station' }, h('img', { id: 'radioSpotImg', alt: '' }), h('span', { id: 'radioSpotTxt' }, ''));
    document.body.append(this.card);
  }
  get cfg() { return this.g.cfg?.adFormats?.radio; }
  /** every frame, dtMs in ms */
  tick(dtMs) {
    const c = this.cfg, r = this.g.radio, st = r?.state; if (!c || !st) return; const t = this.g.serverNow(); const rot = this.g.ads?.rot || 10000; const k = spotClock(t, rot, c.everyMs);
    if (k.win !== this.win) { this.flush(); this.win = k.win; this.listened = 0; this.cur = null; }
    const cur = st.current; const live = st.inCar && st.wantOn && !st.muted && st.volume > 0 && cur && cur.kind === 'synth' && !document.hidden && !this.g.air?.flying;
    this.slot = live ? `radio:${this.g.city.id}:${cur.id}` : null; const ad = k.inSpot && this.slot ? this.g.ads.currentFor(this.slot, k.win) : null;
    if (!ad) { this.card.classList.add('hidden'); this.cur = null; return; }
    if (!this.cur || this.cur.c !== ad.c) { this.cur = ad; this.load(ad); } this.curSlot = this.slot;
    this.card.classList.remove('hidden'); const txt = document.getElementById('radioSpotTxt'); const s = `Sponsored · ${ad.b}${ad.h ? ' · ' + ad.h : ''}`; if (txt.textContent !== s) txt.textContent = s;
    if (this.chimed !== k.win) { this.chimed = k.win; this.g.ui?.sfx?.('ok'); }
    if (this.img && this.img.complete && this.img.naturalWidth) this.listened += dtMs; // counts once the sponsor's image has really loaded
  }
  load(ad) { if (this.imgId === ad.i) return; this.imgId = ad.i; this.img = new Image(); this.img.src = window.__naMedia ? window.__naMedia(ad.i) : `/media/creative/${ad.i}`; const el = document.getElementById('radioSpotImg'); if (el) el.src = this.img.src; }
  flush() {
    if (!this.cur || !this.curSlot || this.listened < 300) return; const ev = this.g.ads?.evidence; if (ev && ev.length < 120) ev.push({ slot: this.curSlot, win: this.win, c: this.cur.c, pct: 100, ms: Math.round(Math.min(this.listened, this.g.ads.rot)), vis: true });
    this.cur = null; this.listened = 0;
  }
}
