// In-car radio sound (10 Oct 2026): Web Audio synthesis of the radio-music.js events. No files, no streaming. The AudioContext is created only after a tap or key press.
// It schedules about half a second ahead from the playlist clock, so every player hears the same song at the same time, and stays silent when the radio should not play.
import { nowPlaying, STATIONS, STATIC_MS } from './radio.js';
import { stepEvents, identEvents, stepSeconds, STEPS_PER_BAR } from './radio-music.js';

const AHEAD = 0.6; // seconds scheduled in advance
export class RadioAudio {
  constructor() { this.ctx = null; this.master = null; this.lastKey = ''; this.lastStep = -1; this.identDone = ''; this.staticAt = -1e9; this.out = null; }
  /** call from a tap or key handler */
  unlock() {
    if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false; this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = 0; const comp = this.ctx.createDynamicsCompressor(); this.master.connect(comp); comp.connect(this.ctx.destination); this.an = this.ctx.createAnalyser(); this.an.fftSize = 512; comp.connect(this.an);
      const n = this.ctx.sampleRate * 0.5; this.noise = this.ctx.createBuffer(1, n, this.ctx.sampleRate); const d = this.noise.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; }
    if (this.ctx.state === 'suspended') this.ctx.resume(); return true;
  }
  /** loudness right now (0..1), used by the browser smoke test to prove sound is really produced */
  level() { if (!this.an) return 0; const d = new Float32Array(this.an.fftSize); this.an.getFloatTimeDomainData(d); let s = 0; for (const x of d) s += x * x; return Math.sqrt(s / d.length); }
  get running() { return !!this.ctx && this.ctx.state === 'running'; }
  /** every ~100 ms: `state` is a RadioState, `serverMs` the server clock, `now` performance.now() */
  tick(state, serverMs, now) {
    if (!this.ctx) return null; const c = this.ctx; const g = state.gain; this.master.gain.setTargetAtTime(g * 0.4, c.currentTime, 0.05); // 0.4: the synthesised mix is hot; the player's slider still goes 0 to 100
    if (!state.playing) { this.lastKey = ''; return null; }
    if (state.staticLeft(now) > 0 && this.staticAt !== state.switchedAt) { this.staticAt = state.switchedAt; this.burst(STATIC_MS / 1000); this.lastKey = ''; }
    if (state.staticLeft(now) > 0) return null; // the tuning noise covers the gap, the song starts when it ends
    const st = state.current; const np = nowPlaying(st, serverMs + AHEAD * 1000); const key = `${st.id}:${np.index}`;
    if (np.kind === 'ident') { if (this.identDone !== key) { this.identDone = key; const base = c.currentTime + Math.max(0, -np.t) + 0.02; for (const e of identEvents(st, np.seed)) if (e.at >= np.t - AHEAD) this.tone(base + e.at - np.t - AHEAD, e.hz, e.dur, e.vel * 0.5, 'triangle'); } return np; }
    const stepSec = stepSeconds(st.bpm); const fromStep = Math.ceil((np.t - AHEAD) / stepSec), toStep = Math.floor(np.t / stepSec);
    if (key !== this.lastKey) { this.lastKey = key; this.lastStep = fromStep - 1; }
    for (let k = Math.max(this.lastStep + 1, fromStep); k <= toStep; k++) { const when = c.currentTime + (k * stepSec - (np.t - AHEAD)); for (const e of stepEvents(st, np.seed, k)) this.voice(e, Math.max(c.currentTime, when), stepSec, st); this.lastStep = k; }
    return np;
  }
  // ---- voices (each is a few short-lived nodes) ----
  env(g, t, a, d, peak) { g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  osc(type, hz, t, dur, vel, a = 0.005, dest = this.master, detune = 0) { const c = this.ctx; const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = hz; o.detune.value = detune; this.env(g, t, a, dur, vel); o.connect(g); g.connect(dest); o.start(t); o.stop(t + a + dur + 0.05); return o; }
  tone(t, hz, dur, vel, type = 'sine') { this.osc(type, hz, Math.max(this.ctx.currentTime, t), dur, vel * 0.5, 0.01); }
  burst(sec) { const c = this.ctx; const s = c.createBufferSource(); s.buffer = this.noise; s.loop = true; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.setValueAtTime(900, c.currentTime); f.frequency.linearRampToValueAtTime(3200, c.currentTime + sec); f.Q.value = 0.8; const g = c.createGain(); g.gain.setValueAtTime(0.35, c.currentTime); g.gain.linearRampToValueAtTime(0.0001, c.currentTime + sec); s.connect(f); f.connect(g); g.connect(this.master); s.start(); s.stop(c.currentTime + sec + 0.05); }
  noiseHit(t, dur, freq, type, vel) { const c = this.ctx; const s = c.createBufferSource(); s.buffer = this.noise; const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; const g = c.createGain(); this.env(g, t, 0.002, dur, vel); s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + dur + 0.05); }
  voice(e, t, stepSec, st) {
    const c = this.ctx; const dur = e.dur * stepSec; const v = e.vel;
    switch (e.voice) {
      case 'kick': { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); this.env(g, t, 0.002, 0.22, v * 0.9); o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.3); break; }
      case 'snare': this.noiseHit(t, 0.16, 1800, 'bandpass', v * 0.5); this.osc('triangle', 190, t, 0.08, v * 0.25); break;
      case 'hat': this.noiseHit(t, 0.05 * Math.max(1, e.dur * 2), 7500, 'highpass', v * 0.35); break;
      case 'rim': this.osc('square', 820, t, 0.04, v * 0.12); this.noiseHit(t, 0.03, 3000, 'bandpass', v * 0.2); break;
      case 'bass': this.osc(st.sound === 'highlife' ? 'triangle' : 'sine', e.hz, t, Math.min(dur, 0.7), v * 0.55, 0.01); break;
      case 'pluck': { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.25); f.connect(this.master); this.osc(st.sound === 'highlife' ? 'sawtooth' : 'triangle', e.hz, t, Math.min(dur, 0.35), v * 0.3, 0.003, f); break; }
      case 'chord': { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = st.sound === 'slow' ? 900 : 1500; f.connect(this.master); for (const hz of e.hz) { this.osc('sawtooth', hz, t, dur, v * 0.12, 0.25, f, -6); this.osc('sawtooth', hz, t, dur, v * 0.12, 0.25, f, 6); } break; }
      case 'lead': this.osc('sine', e.hz, t, dur, v * 0.35, 0.05); this.osc('sine', e.hz * 2, t, dur * 0.6, v * 0.08, 0.05); break;
      case 'bell': this.osc('sine', e.hz, t, dur, v * 0.3, 0.004); this.osc('sine', e.hz * 2.76, t, dur * 0.4, v * 0.08, 0.004); break;
      default: break;
    }
  }
  stop() { if (this.master) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03); this.lastKey = ''; }
}
export { STATIONS, STEPS_PER_BAR };
