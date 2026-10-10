// In-car radio, on the client (10 Oct 2026): a dashboard chip while you drive (station, previous / next, power, mute, volume), keys R (on/off), N and B (next/previous station).
// The car's stations: four REAL Lagos stations streamed straight from the station into a plain audio element (radio-stream.js; no proxy), then the four synthesised stations as fallback
// (radio-audio.js). The radio starts when you get into a car, once the page has had a tap or key press (browsers insist), or shows "Tap to play". See docs/RADIO.md.
import { h, $ } from './api.js';
import { nowPlaying, labelOf, lowDataHint } from './radio.js';
import { RadioAudio } from './radio-audio.js';
import { StreamPlayer } from './radio-stream.js';
import { RadioController } from './radio-control.js';

export class RadioClient {
  constructor(game) {
    this.g = game; this.audio = new RadioAudio(); this.streamer = new StreamPlayer(() => new Audio());
    this.ctl = new RadioController({ cfg: game.cfg, saveData: lowDataHint(typeof navigator !== 'undefined' ? navigator : null), streamer: this.streamer, synth: this.audio, now: () => performance.now() }); this.state = this.ctl.state; this.t = 0; this.wasCar = false;
    const b = (id, txt, fn, title) => h('button', { id, class: 'park-btn', title, onclick: (e) => { e.stopPropagation(); fn(); } }, txt);
    this.chip = h('div', { id: 'radioChip', class: 'pill hidden' }, b('radioPrev', '◀', () => this.tune(-1), 'Previous station (B)'), h('span', { id: 'radioLabel', class: 'radio-label' }, ''), b('radioNext', '▶', () => this.tune(1), 'Next station (N)'), b('radioPower', '📻', () => this.power(), 'Radio on/off (R)'), b('radioMute', '🔊', () => this.mute(), 'Mute'),
      h('input', { id: 'radioVol', type: 'range', min: 0, max: 100, value: 60, title: 'Volume', oninput: (e) => { this.ctl.volume(e.target.value / 100); this.render(); } }));
    document.body.append(this.chip);
    const gesture = () => { this.ctl.gesture(() => this.audio.unlock()); this.render(); }; addEventListener('pointerdown', gesture, { capture: true, passive: true }); addEventListener('keydown', (e) => { if (e.key !== 'Escape') gesture(); }, { capture: true, passive: true });
    addEventListener('keydown', (e) => { if (e.target.closest?.('input,textarea') || e.ctrlKey || e.metaKey || e.altKey) return; const k = e.key.toLowerCase(); if (!game.playing || game.ui?.sheetOpen) return; if (k === 'r') this.power(); else if (k === 'n') this.tune(1); else if (k === 'b') this.tune(-1); });
  }
  power() { if (!this.state.inCar) return; this.ctl.gesture(() => this.audio.unlock()); this.ctl.power(); this.render(); this.g.ui?.toast?.(this.state.wantOn ? `📻 ${this.state.current.name}` : '📻 Radio off'); }
  tune(d) { if (!this.state.inCar) return; this.ctl.gesture(() => this.audio.unlock()); this.ctl.tune(d); this.render(); }
  mute() { if (!this.state.inCar) return; this.ctl.gesture(() => this.audio.unlock()); this.ctl.mute(); this.render(); }
  /** called every frame with dt in ms */
  tick(dt) {
    const car = this.g.ctrl?.mode === 'drive' && !this.g.air?.flying && !this.g.boats?.aboard;
    if (car !== this.wasCar) { this.wasCar = car; if (car) this.ctl.enterCar(); else { this.ctl.leaveCar(); this.audio.stop(); } this.render(); }
    this.t += dt; if (this.t < 100) return; this.t = 0;
    if (car) { const np = this.ctl.tick(this.g.serverNow(), performance.now()); this.label(np); }
  }
  label(np) {
    const el = $('#radioLabel'); if (!el) return; const st = this.state.current; let txt = this.ctl.label();
    if (txt === null) { np ||= nowPlaying(st, this.g.serverNow()); txt = this.state.staticLeft(performance.now()) > 0 ? `${st.name} …` : labelOf(st, np); }
    if (st.unconfirmed && txt && !/Tap to play/.test(txt)) txt += ' (unverified)'; if (el.textContent !== txt) el.textContent = txt; el.title = st.unconfirmed || (st.kind === 'real' ? 'Live from the station' : 'Generated in your browser');
  }
  render() { const s = this.state; this.chip.classList.toggle('hidden', !s.inCar); this.chip.style.setProperty('--rc', s.current.color); $('#radioMute').textContent = s.muted || s.volume === 0 ? '🔇' : '🔊'; $('#radioPower').classList.toggle('on', s.wantOn); this.label(); }
}
