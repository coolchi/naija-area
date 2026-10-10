// In-car radio, on the client (10 Oct 2026): a dashboard chip while you drive (station, song, previous / next, power, mute, volume), keys R (on/off), N and B (next/previous station), and the sound.
// Everything is local: music is synthesised in the browser (radio-audio.js), the song schedule comes from the server clock (radio.js). Audio starts only after a tap or key press.
import { h, $ } from './api.js';
import { RadioState, STATIONS, nowPlaying, labelOf, lowDataHint } from './radio.js';
import { RadioAudio } from './radio-audio.js';

export class RadioClient {
  constructor(game) {
    this.g = game; this.state = new RadioState({ saveData: lowDataHint(typeof navigator !== 'undefined' ? navigator : null) }); this.audio = new RadioAudio(); this.t = 0; this.wasCar = false;
    const b = (id, txt, fn, title) => h('button', { id, class: 'park-btn', title, onclick: (e) => { e.stopPropagation(); fn(); } }, txt);
    this.chip = h('div', { id: 'radioChip', class: 'pill hidden' }, b('radioPrev', '◀', () => this.tune(-1), 'Previous station (B)'), h('span', { id: 'radioLabel', class: 'radio-label' }, ''), b('radioNext', '▶', () => this.tune(1), 'Next station (N)'), b('radioPower', '📻', () => this.power(), 'Radio on/off (R)'), b('radioMute', '🔊', () => this.mute(), 'Mute'),
      h('input', { id: 'radioVol', type: 'range', min: 0, max: 100, value: 60, title: 'Volume', oninput: (e) => { this.state.setVolume(e.target.value / 100); this.audio.unlock(); this.render(); } }));
    document.body.append(this.chip);
    addEventListener('keydown', (e) => { if (e.target.closest?.('input,textarea') || e.ctrlKey || e.metaKey || e.altKey) return; const k = e.key.toLowerCase(); if (!game.playing || game.ui?.sheetOpen) return; if (k === 'r') this.power(); else if (k === 'n') this.tune(1); else if (k === 'b') this.tune(-1); });
  }
  now() { return performance.now(); }
  power() { if (!this.state.inCar) return; this.audio.unlock(); this.state.power(this.now()); this.render(); this.g.ui?.toast?.(this.state.wantOn && this.state.inCar ? `📻 ${this.state.current.name}` : '📻 Radio off'); }
  tune(d) { if (!this.state.inCar) return; this.audio.unlock(); this.state.tune(d, this.now()); this.render(); }
  mute() { if (!this.state.inCar) return; this.audio.unlock(); this.state.toggleMute(); this.render(); }
  /** called every frame with dt in ms */
  tick(dt) {
    const car = this.g.ctrl?.mode === 'drive' && !this.g.air?.flying && !this.g.boats?.aboard;
    if (car !== this.wasCar) { this.wasCar = car; if (car) this.state.enterCar(); else { this.state.leaveCar(); this.audio.stop(); } this.render(); }
    this.t += dt; if (this.t < 100) return; this.t = 0;
    if (car) { const np = this.audio.tick(this.state, this.g.serverNow(), this.now()); this.label(np); }
  }
  label(np) { const el = $('#radioLabel'); if (!el) return; const st = this.state.current; np ||= nowPlaying(st, this.g.serverNow()); const txt = this.state.wantOn ? (this.state.staticLeft(this.now()) > 0 ? `${st.name} …` : labelOf(st, np)) : 'Radio off · press R'; if (el.textContent !== txt) el.textContent = txt; }
  render() {
    const s = this.state; this.chip.classList.toggle('hidden', !s.inCar); this.chip.style.setProperty('--rc', s.current.color); $('#radioMute').textContent = s.muted || s.volume === 0 ? '🔇' : '🔊'; $('#radioPower').classList.toggle('on', s.wantOn); this.label();
  }
}
