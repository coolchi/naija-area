// The game's sound engine: synthesised effects + light music + a car engine hum, with sliders and a mute. Web Audio only; nothing is loaded from the network.
// The AudioContext is created ONLY after the first tap or key press (browsers block it before that), and sounds asked for earlier are simply skipped.
import { SOUND, RECIPES } from './audio-config.js';
import { barEvents, barSec } from './ambient-music.js';

const clamp01 = (v, d) => { const n = Number(v); return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : d; };
export function readSettings(store) { try { const j = JSON.parse(store.getItem(SOUND.key) || 'null') || {}; return { on: j.on !== false, sfx: clamp01(j.sfx, SOUND.defaults.sfx), music: clamp01(j.music, SOUND.defaults.music) }; } catch { return { ...SOUND.defaults }; } }
export function saveSettings(store, s) { try { store.setItem(SOUND.key, JSON.stringify({ on: !!s.on, sfx: clamp01(s.sfx, SOUND.defaults.sfx), music: clamp01(s.music, SOUND.defaults.music) })); } catch { /* private mode */ } }

export class GameAudio {
  /** opts: { store, AudioContextClass, isLowEnd(), radioPlaying() , night() } (all optional; injected so tests need no browser) */
  constructor(opts = {}) {
    this.opts = opts; this.store = opts.store || (typeof localStorage !== 'undefined' ? localStorage : { getItem: () => null, setItem() {} }); this.set = readSettings(this.store);
    this.ctx = null; this.last = new Map(); this.voices = 0; this.nextBar = 0; this.bar = 0; this.engineNodes = null; this.stats = { played: 0, dropped: 0, bars: 0 };
    this.adhanOn = false; this.adhanTimer = null; this.adhanPhrase = 0; this.adhanGain = null;
  }
  get AC() { return this.opts.AudioContextClass || (typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null); }
  /** call from a tap or key handler (safe to call many times) */
  unlock() {
    if (!this.ctx) { const AC = this.AC; if (!AC) return false; try { this.ctx = new AC(); } catch { return false; }
      const c = this.ctx; this.master = c.createGain(); this.master.gain.value = SOUND.buses.master; this.sfxBus = c.createGain(); this.musicBus = c.createGain(); this.sfxBus.connect(this.master); this.musicBus.connect(this.master);
      if (c.createAnalyser) { this.an = c.createAnalyser(); this.an.fftSize = 512; this.master.connect(this.an); } this.master.connect(c.destination); this.applyVolumes();
      const n = Math.floor(c.sampleRate * 0.4); this.noise = c.createBuffer(1, n, c.sampleRate); const d = this.noise.getChannelData(0); let s = 12345; for (let i = 0; i < n; i++) { s = (s * 1664525 + 1013904223) >>> 0; d[i] = (s / 4294967296) * 2 - 1; } }
    if (this.ctx.state === 'suspended') this.ctx.resume?.(); return true;
  }
  get running() { return !!this.ctx && this.ctx.state === 'running'; }
  level() { if (!this.an) return 0; const d = new Float32Array(this.an.fftSize); this.an.getFloatTimeDomainData(d); let s = 0; for (const x of d) s += x * x; return Math.sqrt(s / d.length); }
  applyVolumes() { if (!this.ctx) return; const on = this.set.on; this.sfxBus.gain.value = on ? SOUND.buses.sfx * this.set.sfx : 0; this.musicBus.gain.value = on ? SOUND.buses.music * this.set.music : 0; }
  update(patch) { this.set = { ...this.set, ...patch }; saveSettings(this.store, this.set); this.applyVolumes(); if (!this.set.on) this.engine(null); return this.set; }
  toggle() { return this.update({ on: !this.set.on }).on; }
  /** play a named effect; vol 0..1.5 scales it. Returns true if something was scheduled. */
  play(kind, vol = 1) {
    if (!this.ctx || !this.set.on || this.set.sfx <= 0 || this.ctx.state !== 'running') { this.stats.dropped++; return false; }
    const r = RECIPES[kind] || RECIPES.click, c = this.ctx, now = c.currentTime, gap = SOUND.minGapMs[kind]; const t = performance.now?.() ?? Date.now();
    if (gap && t - (this.last.get(kind) || -1e9) < gap) { this.stats.dropped++; return false; } this.last.set(kind, t);
    if (this.voices + r.layers.length > SOUND.maxVoices) { this.stats.dropped++; return false; }
    for (const L of r.layers) this.voice(L, now, (r.vol || 1) * vol); this.stats.played++; return true;
  }
  voice(L, now, vol) {
    const c = this.ctx, t0 = now + (L.at || 0), t1 = t0 + L.d, g = c.createGain(); const peak = Math.max(0.0002, (L.g || 0.5) * vol); const a = L.a ?? 0.006;
    g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(peak, t0 + Math.min(a, L.d / 2)); g.gain.exponentialRampToValueAtTime(0.0001, t1);
    let src, tail = g; if (L.w === 'noise') { src = c.createBufferSource(); src.buffer = this.noise; src.loop = true; const f = c.createBiquadFilter(); f.type = 'bandpass'; const [f0, f1] = Array.isArray(L.f) ? L.f : [L.f, L.f]; f.frequency.setValueAtTime(f0, t0); if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t1); f.Q.value = 0.8; src.connect(f); f.connect(g); }
    else { src = c.createOscillator(); src.type = L.w; const [f0, f1] = Array.isArray(L.f) ? L.f : [L.f, L.f]; src.frequency.setValueAtTime(f0, t0); if (f1 !== f0) src.frequency.exponentialRampToValueAtTime(f1, t1); if (L.lp) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = L.lp; src.connect(f); f.connect(g); } else src.connect(g); }
    tail.connect(this.sfxBus); this.voices++; src.onended = () => { this.voices = Math.max(0, this.voices - 1); }; src.start(t0); src.stop(t1 + 0.03);
  }
  /** car hum: call every frame with the speed in m/s while driving, or null on foot */
  engine(speed) {
    if (!this.ctx || this.ctx.state !== 'running') return; const c = this.ctx, E = SOUND.engine;
    if (speed == null || !this.set.on || this.set.sfx <= 0) { if (this.engineNodes) { this.engineNodes.g.gain.setTargetAtTime(0, c.currentTime, 0.1); } return; }
    if (!this.engineNodes) { const o = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(); o.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; g.gain.value = 0; o.connect(f); o2.connect(f); f.connect(g); g.connect(this.sfxBus); o.start(); o2.start(); this.engineNodes = { o, o2, f, g }; }
    const n = this.engineNodes, sp = Math.max(0, Math.abs(speed)); const hzv = Math.min(E.maxHz, E.baseHz + sp * E.perMs); n.o.frequency.setTargetAtTime(hzv, c.currentTime, 0.08); n.o2.frequency.setTargetAtTime(hzv * 0.5, c.currentTime, 0.08); n.f.frequency.setTargetAtTime(E.cutoff + sp * E.cutoffPerMs, c.currentTime, 0.08); n.g.gain.setTargetAtTime(E.gain * (E.idleFloor + Math.min(1, sp / 20) * (1 - E.idleFloor)) * 4, c.currentTime, 0.1);
  }
  /** call about every 100 ms: schedules the music a little ahead. Quiet while the radio plays, adhan, or on low-end phones when asked. */
  tick() {
    if (!this.ctx || this.ctx.state !== 'running') return; const M = SOUND.music; const hidden = typeof document !== 'undefined' && document.hidden;
    const quiet = !this.set.on || this.set.music <= 0 || hidden || this.adhanOn || (M.duckWhenRadio && this.opts.radioPlaying?.()) || (M.quietOnLowEnd && this.opts.isLowEnd?.()); const c = this.ctx;
    if (quiet) { this.nextBar = 0; return; } if (!this.nextBar || this.nextBar < c.currentTime - 0.5) this.nextBar = c.currentTime + 0.1;
    const night = !!this.opts.night?.(); while (this.nextBar < c.currentTime + M.aheadSec) { this.scheduleBar(this.nextBar, this.bar, night); this.nextBar += barSec(); this.bar++; this.stats.bars++; }
  }
  /** Start a looping stylised adhan while the player is inside a mosque. Uses the music bus / music volume. */
  startAdhan() {
    this.unlock(); if (!this.ctx || this.adhanOn) return; this.adhanOn = true; this.adhanPhrase = 0; this.nextBar = 0;
    if (!this.adhanGain) { this.adhanGain = this.ctx.createGain(); this.adhanGain.gain.value = 0; this.adhanGain.connect(this.musicBus); }
    const now = this.ctx.currentTime; this.adhanGain.gain.cancelScheduledValues(now); this.adhanGain.gain.setValueAtTime(this.adhanGain.gain.value || 0.0001, now); this.adhanGain.gain.linearRampToValueAtTime(SOUND.adhan.gain, now + 0.6);
    this._schedAdhan();
  }
  stopAdhan() {
    this.adhanOn = false; if (this.adhanTimer) { clearTimeout(this.adhanTimer); this.adhanTimer = null; }
    if (this.ctx && this.adhanGain) { const now = this.ctx.currentTime; this.adhanGain.gain.cancelScheduledValues(now); this.adhanGain.gain.setValueAtTime(Math.max(0.0001, this.adhanGain.gain.value), now); this.adhanGain.gain.linearRampToValueAtTime(0.0001, now + 0.4); }
  }
  _schedAdhan() {
    if (!this.adhanOn || !this.ctx || this.ctx.state !== 'running') return;
    if (!this.set.on || this.set.music <= 0) { this.adhanTimer = setTimeout(() => this._schedAdhan(), 800); return; }
    const A = SOUND.adhan; const phrase = A.phrases[this.adhanPhrase % A.phrases.length]; this.adhanPhrase++;
    const c = this.ctx; let t = c.currentTime + 0.05;
    for (const hz of phrase) {
      const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      o.type = 'sine'; f.type = 'lowpass'; f.frequency.value = 1800;
      o.frequency.setValueAtTime(hz, t); o.frequency.setValueAtTime(hz * 1.01, t + A.noteSec * 0.45); o.frequency.setValueAtTime(hz, t + A.noteSec);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.55, t + 0.08); g.gain.linearRampToValueAtTime(0.4, t + A.noteSec * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + A.noteSec);
      o.connect(f); f.connect(g); g.connect(this.adhanGain); o.start(t); o.stop(t + A.noteSec + 0.05);
      t += A.noteSec + A.gapSec;
    }
    const waitMs = Math.max(400, (t - c.currentTime + A.phraseGapSec) * 1000);
    this.adhanTimer = setTimeout(() => this._schedAdhan(), waitMs);
  }
  scheduleBar(t, bar, night) {
    const c = this.ctx, k = night ? SOUND.music.nightGain : 1;
    for (const e of barEvents(bar, { night })) {
      const t0 = t + e.at, g = c.createGain(), peak = Math.max(0.0002, e.g * k); let src;
      if (e.kind === 'shaker' || e.kind === 'kick') { src = c.createBufferSource(); src.buffer = this.noise; const f = c.createBiquadFilter(); f.type = e.kind === 'kick' ? 'lowpass' : 'highpass'; f.frequency.value = e.kind === 'kick' ? 140 : 6500; src.connect(f); f.connect(g); if (e.kind === 'kick') { const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(110, t0); o.frequency.exponentialRampToValueAtTime(45, t0 + 0.12); o.connect(g); o.start(t0); o.stop(t0 + e.d + 0.05); } }
      else { src = c.createOscillator(); src.type = e.kind === 'pad' ? 'sine' : e.kind === 'bass' ? 'triangle' : 'triangle'; src.frequency.value = e.f; if (e.kind === 'pluck') { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2600, t0); f.frequency.exponentialRampToValueAtTime(500, t0 + e.d); src.connect(f); f.connect(g); } else src.connect(g); }
      const att = e.kind === 'pad' ? 0.3 : 0.008; g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(peak, t0 + att); g.gain.exponentialRampToValueAtTime(0.0001, t0 + e.d); g.connect(this.musicBus); src.start(t0); src.stop(t0 + e.d + 0.05);
    }
  }
  /** pause everything when the tab is hidden, resume when it is back (saves battery) */
  visibility(hidden) { if (!this.ctx) return; if (hidden) { this.engine(null); this.ctx.suspend?.(); } else this.ctx.resume?.(); }
}
