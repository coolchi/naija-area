// Real Lagos stations in the car (10 Oct 2026): station config, switching, the fall-through chain, the global off switch. A MOCK audio element: no real network, nothing is ever played.
import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs';
import { REAL_STATIONS, carStations } from '../client/src/radio-stations.js';
import { STATIONS, lowDataHint } from '../client/src/radio.js';
import { StreamPlayer } from '../client/src/radio-stream.js';
import { RadioController, realRadioOn } from '../client/src/radio-control.js';
import { makeServer, ok } from './helpers.js';

/** an Audio-like mock: records what it was asked, and the test fires its events by hand */
function mockAudio({ rejectWith = null } = {}) {
  const a = { src: '', volume: 1, muted: false, plays: [], pauses: 0, loads: 0, removed: [], handlers: {}, preload: '',
    play() { this.plays.push(this.src); return rejectWith ? Promise.reject(Object.assign(new Error('blocked'), { name: rejectWith })) : Promise.resolve(); },
    pause() { this.pauses++; }, load() { this.loads++; }, removeAttribute(n) { this.removed.push(n); if (n === 'src') this.src = ''; },
    addEventListener(t, f) { (this.handlers[t] ||= []).push(f); }, emit(t) { for (const f of this.handlers[t] || []) f({ type: t }); } };
  return a;
}
function timers() { const q = []; return { q, set: (f, ms) => { q.push({ f, ms }); return q.length; }, clear: (id) => { if (q[id - 1]) q[id - 1].dead = true; }, fire() { for (const t of q.slice()) if (!t.dead) { t.dead = true; t.f(); } } }; }
const synth = () => ({ ticks: 0, stops: 0, unlocked: 0, tick() { this.ticks++; return null; }, stop() { this.stops++; }, unlock() { this.unlocked++; } });
function rig({ cfg = {}, saveData = false, rejectWith = null } = {}) {
  const audio = mockAudio({ rejectWith }), tm = timers(); const streamer = new StreamPlayer(() => audio, { setTimer: tm.set, clearTimer: tm.clear, stallMs: 12000 }); const sy = synth(); let t = 0;
  const ctl = new RadioController({ cfg, saveData, streamer, synth: sy, now: () => (t += 10) }); return { audio, tm, streamer, sy, ctl, s: ctl.state };
}
const settle = () => new Promise(r => setImmediate(r));

test('config: exactly the four approved stations, https only, one stream host each, The Beat marked unconfirmed by ear, no Jet Radio', () => {
  assert.deepEqual(REAL_STATIONS.map(s => s.name), ['Cool FM', 'Wazobia FM', 'Nigeria Info', 'The Beat']); assert.deepEqual(REAL_STATIONS.map(s => s.freq), ['96.9', '95.1', '99.3', '99.9']);
  for (const s of REAL_STATIONS) { assert.match(s.url, /^https:\/\/[a-z0-9]+-atunwadigital\.streamguys1\.com\/[a-z0-9]+$/, s.id); assert.ok(s.color && s.mood); }
  assert.equal(new Set(REAL_STATIONS.map(s => s.id)).size, 4); assert.deepEqual(REAL_STATIONS.filter(s => s.unconfirmed).map(s => s.id), ['beat']);
  const src = fs.readFileSync(new URL('../client/src/radio-stations.js', import.meta.url), 'utf8'); assert.match(src, /UNCONFIRMED BY EAR/); assert.match(src, /NO station has given written permission/); assert.ok(!/jet\s*radio/i.test(src.replace(/Jet Radio was removed/, '')), 'Jet Radio is gone');
  const cs = carStations(true, STATIONS); assert.equal(cs.length, 8); assert.deepEqual(cs.map(s => s.kind), ['real', 'real', 'real', 'real', 'synth', 'synth', 'synth', 'synth'], 'real first, the synthesised ones kept as the fallback');
});
test('global off switch: cfg.realRadio === false leaves only the synthesised stations; anything else means on; the car never streams then', () => {
  assert.equal(realRadioOn({}), true); assert.equal(realRadioOn(null), true); assert.equal(realRadioOn({ realRadio: true }), true); assert.equal(realRadioOn({ realRadio: false }), false);
  const { ctl, s, audio, streamer } = rig({ cfg: { realRadio: false } }); assert.equal(s.stations.length, 4); assert.ok(s.stations.every(x => x.kind === 'synth')); ctl.gesture(); ctl.enterCar();
  for (let i = 0; i < 8; i++) { ctl.tune(1); ctl.tick(0, 0); } assert.equal(audio.plays.filter(u => !u.startsWith('data:')).length, 0, 'no stream was ever requested'); assert.equal(streamer.state, 'idle');
  const on = rig({ cfg: { realRadio: true } }); assert.equal(on.s.stations.length, 8);
});
test('start on entering a car after the first tap; before any tap it waits; leaving the car stops and lets go of the stream', async () => {
  const { ctl, s, audio, streamer, sy } = rig(); ctl.enterCar(); assert.equal(s.wantOn, true); assert.equal(audio.plays.length, 0, 'no sound before a tap or key press');
  ctl.gesture(() => sy.unlock()); await settle(); const first = audio.plays.filter(u => !u.startsWith('data:')); assert.deepEqual(first, [REAL_STATIONS[0].url], 'Cool FM first'); assert.equal(sy.unlocked, 1, 'the same first tap unlocks the synthesiser too');
  assert.equal(audio.plays[0].startsWith('data:'), true, 'the element was primed with a silent clip inside the tap'); audio.emit('playing'); assert.equal(streamer.isPlaying, true); assert.match(ctl.label(), /^Cool FM 96\.9 · live/);
  ctl.leaveCar(); assert.equal(streamer.state, 'idle'); assert.ok(audio.removed.includes('src') && audio.loads > 0, 'the connection is released'); assert.equal(audio.src, '');
  ctl.enterCar(); await settle(); assert.equal(audio.plays.at(-1), REAL_STATIONS[0].url, 'it resumes when you get back in');
});
test('station switching: next and previous move across real then synthesised stations and wrap; each real switch loads that station once, a synthesised one stops the stream', async () => {
  const { ctl, s, audio, streamer, sy } = rig(); ctl.gesture(); ctl.enterCar(); const urls = () => audio.plays.filter(u => !u.startsWith('data:'));
  ctl.tune(1); assert.equal(s.current.id, 'wazobia'); ctl.tune(1); ctl.tune(1); assert.equal(s.current.id, 'beat'); assert.deepEqual(urls(), REAL_STATIONS.map(r => r.url).slice(0, 4).filter((_, i) => true));
  ctl.sync(); ctl.sync(); assert.equal(urls().length, 4, 'syncing again does not reload the same stream');
  ctl.tune(1); assert.equal(s.current.kind, 'synth'); assert.equal(streamer.state, 'idle', 'the stream is dropped for a synthesised station'); assert.equal(ctl.tick(0, 0), null); assert.equal(sy.ticks, 1, 'the synthesiser runs now');
  ctl.tune(-1); assert.equal(s.current.id, 'beat'); assert.equal(urls().length, 5); for (let i = 0; i < 8; i++) ctl.tune(1); assert.equal(s.current.id, 'beat', 'wraps around 8 stations'); ctl.tune(-1); ctl.tune(-1); ctl.tune(-1); assert.equal(s.current.id, 'cool', 'wraps back');
});
test('fall-through chain: a stream error moves to the next real station, then the next, and after all four real ones the synthesised stations play', async () => {
  const { ctl, s, audio, sy, streamer } = rig(); ctl.gesture(); ctl.enterCar(); await settle(); const urls = () => audio.plays.filter(u => !u.startsWith('data:'));
  audio.emit('error'); assert.equal(s.current.id, 'wazobia'); assert.equal(urls().at(-1), REAL_STATIONS[1].url); audio.emit('error'); assert.equal(s.current.id, 'nigeriainfo'); audio.emit('playing'); assert.equal(streamer.isPlaying, true, 'a working one stays');
  audio.emit('error'); assert.equal(s.current.id, 'beat'); audio.emit('error'); assert.equal(s.current.kind, 'synth', 'all four real ones failed: the first synthesised station'); assert.equal(s.current.id, 'eko'); assert.equal(streamer.state, 'idle');
  assert.equal(ctl.tick(0, 0), null); assert.ok(sy.ticks >= 1, 'the synthesiser is making the sound'); assert.equal(urls().length, 4, 'each real stream was tried exactly once'); assert.deepEqual(ctl.events.filter(e => e.includes('>')), ['cool>wazobia', 'wazobia>nigeriainfo', 'nigeriainfo>beat', 'beat>eko']);
});
test('a station that failed is skipped by the automatic chain for a while, but the driver can still tune to it by hand', async () => {
  const { ctl, s, audio } = rig(); ctl.gesture(); ctl.enterCar(); audio.emit('error'); assert.equal(s.current.id, 'wazobia'); ctl.tune(-1); assert.equal(s.current.id, 'cool', 'tuned by hand: it is tried again'); audio.emit('error'); assert.equal(s.current.id, 'wazobia');
  audio.emit('error'); assert.equal(s.current.id, 'nigeriainfo'); audio.emit('error'); assert.equal(s.current.id, 'beat', 'cool is skipped on the way round while it is recently failed');
  assert.equal(s.recentlyFailed(0, 1000), true); assert.equal(s.recentlyFailed(0, 1e9), false, 'after the retry window it is eligible again');
});
test('a stream that never starts (no sound within the stall time) or that ends counts as an error; a late event from an old stream is ignored', async () => {
  const { ctl, s, audio, tm } = rig(); ctl.gesture(); ctl.enterCar(); assert.equal(tm.q.at(-1).ms, 12000); tm.fire(); assert.equal(s.current.id, 'wazobia', 'stalled for 12 s: next station');
  audio.emit('playing'); audio.emit('ended'); assert.equal(s.current.id, 'nigeriainfo', 'a live stream that ends is dead'); audio.emit('playing'); tm.fire(); assert.equal(s.current.id, 'nigeriainfo', 'once sound starts the stall timer is cleared and does nothing');
  ctl.tune(1); const st = s.current.id; audio.emit('abort'); audio.emit('error'); assert.notEqual(s.current.id, st, 'a real error on the current stream falls through');
});
test("'Tap to play': a refused play() shows the prompt, stays quiet, and the next tap starts it", async () => {
  const r = rig({ rejectWith: 'NotAllowedError' }); r.ctl.gesture(); r.ctl.enterCar(); await settle(); await settle(); assert.equal(r.s.blocked, true); assert.equal(r.streamer.state, 'idle'); assert.equal(r.s.current.id, 'cool', 'it does not skip stations when it is only blocked'); assert.match(r.ctl.label(), /Cool FM 96\.9: Tap to play/);
  r.audio.rejectWith = null; const tries = r.audio.plays.length; r.audio.play = function () { this.plays.push(this.src); return Promise.resolve(); }; r.ctl.gesture(); await settle(); assert.equal(r.s.blocked, false); assert.equal(r.audio.plays.at(-1), REAL_STATIONS[0].url); assert.ok(r.audio.plays.length > tries);
  const e = rig({ rejectWith: 'NetworkError' }); e.ctl.gesture(); e.ctl.enterCar(); await settle(); await settle(); assert.equal(e.s.current.id, 'eko', 'a different rejection is a stream error: every real station is tried once, then the synthesised ones'); assert.equal(e.audio.plays.filter(u => !u.startsWith('data:')).length, 4);
});
test('the driver can switch the radio off (it stays off next time) and mute; volume reaches the element; saveData / mobile data keeps it off until asked', async () => {
  const { ctl, s, audio, streamer } = rig(); ctl.gesture(); ctl.enterCar(); ctl.volume(0.3); assert.equal(audio.volume, 0.3); ctl.mute(); assert.equal(streamer.state, 'idle', 'muted: no stream is downloaded'); ctl.mute(); assert.equal(streamer.state, 'loading');
  ctl.power(); assert.equal(streamer.state, 'idle'); assert.match(ctl.label(), /Radio off/); ctl.leaveCar(); ctl.enterCar(); assert.equal(s.wantOn, false, 'switched off by the driver: stays off'); ctl.power(); assert.equal(streamer.state, 'loading');
  assert.equal(lowDataHint({ connection: { type: 'cellular' } }), true); assert.equal(lowDataHint({ connection: { type: 'wifi', effectiveType: '4g' } }), false);
  const m = rig({ saveData: true }); m.ctl.gesture(); m.ctl.enterCar(); assert.equal(m.audio.plays.filter(u => !u.startsWith('data:')).length, 0, 'mobile data: off by default'); m.ctl.power(); assert.equal(m.audio.plays.filter(u => !u.startsWith('data:')).length, 1, 'the driver can still turn it on');
});
test('server: /api/config carries the global switch; NA_REAL_RADIO=0 turns it off; an admin can flip it; players cannot', async () => {
  const s = makeServer(); assert.equal((await ok(s, 'GET', '/api/config')).realRadio, true);
  const r = await ok(s, 'POST', '/api/admin/radio', { admin: true, body: { enabled: false } }); assert.equal(r.realRadio, false); assert.equal((await ok(s, 'GET', '/api/config')).realRadio, false); assert.equal((await ok(s, 'GET', '/api/admin/radio', { admin: true })).realRadio, false);
  assert.equal((await ok(s, 'POST', '/api/admin/radio', { admin: true, body: { enabled: true } })).realRadio, true);
  const { call } = await import('./helpers.js'); assert.equal((await call(s, 'POST', '/api/admin/radio', { body: { enabled: false } })).status, 401);
  process.env.NA_REAL_RADIO = '0'; try { const t = makeServer(); assert.equal((await ok(t, 'GET', '/api/config')).realRadio, false, 'the env var is the default'); } finally { delete process.env.NA_REAL_RADIO; }
});
test('the page may load audio from the stream hosts and nowhere else', () => {
  const src = fs.readFileSync(new URL('../server/createServer.js', import.meta.url), 'utf8'); const m = src.match(/media-src ([^;]+);/); assert.ok(m, 'a media-src rule'); assert.match(m[1], /https:\/\/\*\.streamguys1\.com/); assert.ok(!/ \*[ ;]|https:\s*$|http:/.test(m[1]));
  for (const s of REAL_STATIONS) assert.ok(new URL(s.url).hostname.endsWith('.streamguys1.com'), s.id);
});
