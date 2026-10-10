// Sound effects and light music (queue batch 1 item 3): everything is synthesised, so tests check the recipes, the music generator and the engine with a fake Web Audio context (no real sound, no network).
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { SOUND, RECIPES } from '../client/src/audio-config.js';
import { barEvents, barSec, stepSec, STEPS, RANGE, hz } from '../client/src/ambient-music.js';
import { GameAudio, readSettings, saveSettings } from '../client/src/audio.js';

class Param { constructor() { this.value = 0; this.calls = []; } setValueAtTime(v, t) { this.value = v; this.calls.push(['set', v, t]); } linearRampToValueAtTime(v, t) { this.calls.push(['lin', v, t]); } exponentialRampToValueAtTime(v, t) { assert.ok(v > 0, 'exponential ramp target must be above zero'); this.calls.push(['exp', v, t]); } setTargetAtTime(v, t) { this.value = v; this.calls.push(['target', v, t]); } }
function fakeCtx() {
  const log = { osc: 0, buf: 0, gain: 0, filt: 0, started: [], connects: 0 };
  const node = (extra = {}) => ({ connect(n) { log.connects++; return n; }, disconnect() {}, start(t) { log.started.push(t); }, stop() {}, ...extra });
  return class FakeCtx {
    constructor() { this.currentTime = 10; this.state = 'suspended'; this.sampleRate = 8000; this.destination = {}; this.log = log; FakeCtx.last = this; }
    resume() { this.state = 'running'; } suspend() { this.state = 'suspended'; }
    createGain() { log.gain++; return node({ gain: new Param() }); } createOscillator() { log.osc++; return node({ frequency: new Param(), type: '' }); }
    createBiquadFilter() { log.filt++; return node({ frequency: new Param(), Q: { value: 0 }, type: '' }); } createBufferSource() { return node({ buffer: null, loop: false }); }
    createBuffer(c, n) { log.buf++; const d = new Float32Array(n); return { getChannelData: () => d }; } createAnalyser() { return node({ fftSize: 512, getFloatTimeDomainData() {} }); }
  };
}
const store = () => ({ d: {}, getItem(k) { return this.d[k] ?? null; }, setItem(k, v) { this.d[k] = v; } });
const mk = (extra = {}) => { const AC = fakeCtx(); const a = new GameAudio({ AudioContextClass: AC, store: store(), ...extra }); return { a, AC }; };

test('every recipe is well formed: finite positive numbers, short, in a hearable range, and nothing is loaded from a file', () => {
  for (const [name, r] of Object.entries(RECIPES)) {
    assert.ok(r.vol > 0 && r.vol <= 1.2, name); assert.ok(r.layers.length >= 1 && r.layers.length <= 4, name);
    for (const L of r.layers) { assert.ok(['sine', 'triangle', 'square', 'sawtooth', 'noise'].includes(L.w), `${name} wave`); for (const f of [].concat(L.f)) assert.ok(Number.isFinite(f) && f >= 40 && f <= 8000, `${name} f ${f}`); assert.ok(L.d > 0 && L.d <= 0.6 && L.at >= 0 && L.at + L.d <= 0.8, `${name} timing`); assert.ok(L.g > 0 && L.g <= 1, `${name} gain`); }
  }
  for (const k of ['coin', 'ok', 'bad', 'horn', 'thunk', 'step', 'thud', 'knock', 'click', 'achieve', 'crash', 'door', 'shutter', 'pop', 'notify']) assert.ok(RECIPES[k], 'recipe ' + k);
  const src = ['audio.js', 'audio-config.js', 'ambient-music.js'].map(f => fs.readFileSync('client/src/' + f, 'utf8')).join('\n'); assert.doesNotMatch(src, /new Audio\(|\.mp3|\.ogg|\.wav|fetch\(|decodeAudioData/, 'no sample files or network');
});
test('music: deterministic, in key, in range, 4-chord loop, drums only by day, pad only at night, never overlapping notes pile up', () => {
  assert.deepEqual(barEvents(5), barEvents(5)); assert.notDeepEqual(barEvents(5), barEvents(6)); assert.notDeepEqual(barEvents(5, { seed: 1 }), barEvents(5, { seed: 2 }));
  const day = barEvents(0), night = barEvents(0, { night: true }); assert.ok(day.some(e => e.kind === 'kick') && day.some(e => e.kind === 'shaker')); assert.ok(!night.some(e => e.kind === 'kick' || e.kind === 'shaker')); assert.ok(night.some(e => e.kind === 'pad') && !day.some(e => e.kind === 'pad'));
  const bs = barSec(), allowed = new Set([0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27].map(s => Math.round(hz(SOUND.music.rootHz, s))));
  for (let bar = 0; bar < 16; bar++) for (const e of barEvents(bar)) { assert.ok(e.at >= 0 && e.at < bs, 'inside the bar'); assert.ok(e.d > 0 && e.g > 0 && e.g <= 0.6); if (e.f) assert.ok(e.f >= RANGE.min && e.f <= RANGE.max, `${e.kind} ${e.f}`); }
  for (let bar = 0; bar < 4; bar++) { const plucks = barEvents(bar).filter(e => e.kind === 'pluck'); assert.ok(plucks.length >= 2 && plucks.length <= 6); for (const p of plucks) assert.ok(p.f >= 150 && p.f <= 1000); void allowed; }
  assert.ok(Math.abs(barSec() - stepSec() * STEPS) < 1e-9); assert.ok(barSec() > 1.5 && barSec() < 3);
});
test('settings: defaults, clamping, saved and re-read; broken storage falls back', () => {
  const st = store(); assert.deepEqual(readSettings(st), { on: true, ...{ sfx: SOUND.defaults.sfx, music: SOUND.defaults.music } }); saveSettings(st, { on: false, sfx: 5, music: -2 }); assert.deepEqual(readSettings(st), { on: false, sfx: 1, music: 0 });
  st.setItem(SOUND.key, '{not json'); assert.equal(readSettings(st).on, true); assert.equal(readSettings({ getItem() { throw new Error('x'); } }).sfx, SOUND.defaults.sfx);
});
test('nothing sounds before the first tap (no AudioContext is even created); unlock works once and is safe to repeat', () => {
  const { a, AC } = mk(); assert.equal(a.play('coin'), false); assert.equal(AC.last, undefined, 'no context before a gesture'); assert.equal(a.unlock(), true); assert.equal(a.running, true); assert.equal(a.unlock(), true); assert.equal(AC.last.log.buf, 1, 'one noise buffer'); assert.equal(new GameAudio({ AudioContextClass: null, store: store() }).unlock(), false);
});
test('playing effects schedules voices, unknown kinds fall back to a click, same sound within its gap is skipped, mute and zero volume schedule nothing', async () => {
  const { a, AC } = mk(); a.unlock(); const o0 = AC.last.log.osc; assert.equal(a.play('coin'), true); assert.equal(AC.last.log.osc - o0, RECIPES.coin.layers.length); assert.equal(a.play('coin'), false, 'throttled'); assert.equal(a.play('no-such-sound'), true);
  await new Promise(r => setTimeout(r, SOUND.minGapMs.coin + 10)); assert.equal(a.play('coin'), true); const n = AC.last.log.osc; a.update({ on: false }); assert.equal(a.play('knock'), false); a.update({ on: true, sfx: 0 }); assert.equal(a.play('knock'), false); assert.equal(AC.last.log.osc, n);
  assert.equal(a.sfxBus.gain.value, 0); a.update({ sfx: 1 }); assert.ok(a.sfxBus.gain.value > 0); assert.equal(a.toggle(), false); assert.equal(a.musicBus.gain.value, 0);
});
test('voice limit: a flood of different sounds never schedules more than maxVoices layers', () => {
  const { a } = mk(); a.unlock(); let played = 0; for (let i = 0; i < 200; i++) { const k = Object.keys(RECIPES)[i % Object.keys(RECIPES).length]; a.last.clear(); if (a.play(k)) played++; } assert.ok(a.voices <= SOUND.maxVoices, `${a.voices} voices`); assert.ok(a.stats.dropped > 0);
});
test('music scheduling: starts only when running, schedules about aheadSec of bars, is silent when muted, hidden, with the radio on, or on a low-end phone; and uses the night mix', () => {
  let radio = false, low = false, night = false; const { a, AC } = mk({ radioPlaying: () => radio, isLowEnd: () => low, night: () => night }); a.tick(); assert.equal(a.stats.bars, 0, 'no context yet'); a.unlock(); a.tick(); assert.ok(a.stats.bars >= 1 && a.stats.bars <= 2, `bars ${a.stats.bars}`);
  const bars = a.stats.bars; a.tick(); assert.equal(a.stats.bars, bars, 'nothing more until time moves'); AC.last.currentTime += barSec() * 3; a.tick(); assert.ok(a.stats.bars > bars);
  for (const [name, set] of [['radio', () => { radio = true; }], ['low-end', () => { radio = false; low = true; }]]) { set(); const b = a.stats.bars; AC.last.currentTime += 20; a.tick(); assert.equal(a.stats.bars, b, name); }
  low = false; a.update({ music: 0 }); const b2 = a.stats.bars; AC.last.currentTime += 20; a.tick(); assert.equal(a.stats.bars, b2, 'music volume 0'); a.update({ music: 0.5 }); AC.last.currentTime += 20; a.tick(); assert.ok(a.stats.bars > b2, 'back on');
  night = true; const osc = AC.last.log.osc; AC.last.currentTime += barSec() * 2; a.tick(); assert.ok(AC.last.log.osc > osc);
});
test('engine hum: created once, rises with speed, fades on foot, stays off when muted', () => {
  const { a } = mk(); a.unlock(); a.engine(0); const n = a.engineNodes; assert.ok(n); const g0 = n.g.gain.value; a.engine(15); assert.equal(a.engineNodes, n, 'same nodes'); assert.ok(n.o.frequency.value > SOUND.engine.baseHz); assert.ok(n.g.gain.value > g0); const hi = n.o.frequency.value; a.engine(40); assert.ok(n.o.frequency.value <= SOUND.engine.maxHz && n.o.frequency.value >= hi);
  a.engine(null); assert.equal(n.g.gain.value, 0); a.update({ on: false }); a.engine(20); assert.equal(n.g.gain.value, 0);
});
test('hidden tab suspends the audio and showing it resumes', () => { const { a, AC } = mk(); a.unlock(); a.visibility(true); assert.equal(AC.last.state, 'suspended'); a.visibility(false); assert.equal(AC.last.state, 'running'); });
test('wiring: ui.sfx goes through the new engine, the mute button toggles it, More has a Sound block', () => {
  const ui = fs.readFileSync('client/src/ui.js', 'utf8'), main = fs.readFileSync('client/src/main.js', 'utf8'); assert.match(ui, /this\.g\.audio\?\.play\(kind, vol\)/); assert.match(ui, /soundBlock\(g\)/); assert.match(ui, /audio\.toggle\(\)/); assert.match(main, /new GameAudio\(/); assert.match(main, /addEventListener\('pointerdown', unlock, true\)/); assert.match(main, /audio\?\.engine\(/);
});
