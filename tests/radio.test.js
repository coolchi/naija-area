// In-car radio (10 Oct 2026): four stations, a playlist clock shared by every player, and the rules for when sound may play.
import test from 'node:test'; import assert from 'node:assert/strict';
import { STATIONS, schedule, nowPlaying, cycleSec, RadioState, labelOf, lowDataHint, IDENT_SEC, STATIC_MS, hash } from '../client/src/radio.js';

test('four fictional stations with different moods, a name, a frequency and at least four tracks', () => {
  assert.equal(STATIONS.length, 4); assert.equal(new Set(STATIONS.map(s => s.id)).size, 4); assert.equal(new Set(STATIONS.map(s => s.sound)).size, 4, 'each station sounds different'); assert.equal(new Set(STATIONS.map(s => s.bpm)).size, 4);
  for (const s of STATIONS) { assert.ok(s.name && s.freq && s.mood && s.ident && s.tracks.length >= 4, s.id); for (const [n, sec] of s.tracks) assert.ok(n && sec >= 150 && sec <= 230); }
  assert.ok(!/real|fm radio lagos|cool fm|wazobia|beat 99|nigeria info/i.test(STATIONS.map(s => s.name).join(' ')), 'no real station names');
});
test('the playlist clock: a pure function of server time, the same for everyone, wraps at the cycle, and an ident comes before every second track', () => {
  for (const st of STATIONS) {
    const { segs, cycle } = schedule(st); assert.equal(cycle, segs.reduce((a, s) => a + s.sec, 0)); assert.equal(cycleSec(st), cycle); assert.equal(segs[0].kind, 'ident'); assert.equal(segs.filter(s => s.kind === 'ident').length, Math.ceil(st.tracks.length / 2)); assert.equal(segs.filter(s => s.kind === 'track').length, st.tracks.length);
    const t0 = 1_800_000_000_000; const a = nowPlaying(st, t0), b = nowPlaying(st, t0); assert.deepEqual(a, b, 'two players, same moment, same sound'); assert.deepEqual(nowPlaying(st, t0 + cycle * 1000 * 7), a, 'wraps exactly at the cycle');
    const a2 = nowPlaying(st, t0 + 3000); if (a2.index === a.index) assert.ok(Math.abs(a2.t - a.t - 3) < 1e-6); assert.ok(a.left > 0 && a.left <= a.sec && a.t >= 0 && a.t < a.sec);
    for (let ms = 0; ms < cycle * 1000; ms += 7300) { const n = nowPlaying(st, ms); assert.ok(n.t >= 0 && n.t < n.sec); assert.ok(n.kind === 'ident' ? n.sec === IDENT_SEC : n.sec >= 150); }
  }
  const st = STATIONS[0]; const seg = schedule(st).segs; const end = (seg[1].start + seg[1].sec) * 1000; const before = nowPlaying(st, end - 1), after = nowPlaying(st, end + 1); assert.notEqual(before.index, after.index); assert.equal(before.nextName, after.name);
  assert.equal(nowPlaying(st, -5000).t >= 0, true, 'negative times still work'); assert.notEqual(hash('a'), hash('b'));
});
test('stations are out of step with each other, so switching changes what you hear', () => {
  const now = 1_800_000_123_000; const names = STATIONS.map(s => nowPlaying(s, now).name); assert.equal(new Set(names).size, 4); assert.match(labelOf(STATIONS[1], nowPlaying(STATIONS[1], now)), /^Highlife 102 102.0 · /);
  assert.match(labelOf(STATIONS[0], { kind: 'ident' }), /Station ident/);
});
test('sound is allowed only in a car, after a tap or key press, when switched on, not muted, with volume above zero', () => {
  const r = new RadioState(); assert.equal(r.playing, false); r.enterCar(); assert.equal(r.wantOn, true, 'the radio starts on entering a car'); assert.equal(r.playing, false, 'but nothing plays until a tap or key press');
  r.userGesture(); assert.equal(r.playing, true); assert.equal(r.power(10), false); assert.equal(r.power(11), true); assert.equal(r.playing, true); assert.equal(r.gain, 0.6); r.toggleMute(); assert.equal(r.playing, false); assert.equal(r.gain, 0); r.toggleMute(); assert.equal(r.playing, true); r.setVolume(0); assert.equal(r.playing, false); r.setVolume(0.3); assert.equal(r.playing, true); assert.equal(r.gain, 0.3);
  r.setVolume(7); assert.equal(r.volume, 1); r.setVolume(-3); assert.equal(r.volume, 0); r.setVolume('x'); assert.equal(r.volume, 0);
  const q = new RadioState(); q.power(0); assert.equal(q.wantOn, false, 'the power key does nothing outside a car'); assert.equal(q.playing, false);
});
test('station switching: next and previous wrap around, switching turns the radio on, plays a short static burst, and works only in a car', () => {
  const r = new RadioState(); r.enterCar(); assert.equal(r.next(100), 1); assert.equal(r.playing, true); assert.equal(r.staticLeft(100), STATIC_MS); assert.equal(r.staticLeft(100 + STATIC_MS / 2), STATIC_MS / 2); assert.equal(r.staticLeft(100 + STATIC_MS + 1), 0);
  r.next(); r.next(); assert.equal(r.station, 3); assert.equal(r.next(), 0, 'wraps forward'); assert.equal(r.prev(), 3, 'wraps back'); assert.equal(r.current.id, 'night');
  const s = new RadioState(); assert.equal(s.next(), 0, 'no car, no change'); assert.equal(s.wantOn, false);
});
test('leaving the car stops the radio at once; the station and volume are remembered and the radio resumes when you drive again', () => {
  const r = new RadioState(); r.enterCar(); r.setVolume(0.4); r.next(); r.next(); assert.equal(r.playing, true); r.leaveCar(); assert.equal(r.playing, false); assert.equal(r.gain, 0); assert.equal(r.inCar, false);
  r.enterCar(); assert.equal(r.station, 2); assert.equal(r.volume, 0.4); assert.equal(r.playing, true, 'it was on, and sound is already unlocked'); r.power(); assert.equal(r.playing, false); r.leaveCar(); r.enterCar(); assert.equal(r.playing, false, 'switched off stays off');
  assert.deepEqual(r.log, ['enter', 'leave', 'enter', 'leave', 'enter']);
});
test('low-data or battery-saver hint keeps the radio off until the driver asks; ordinary connections do not', () => {
  assert.equal(lowDataHint({ connection: { saveData: true } }), true); assert.equal(lowDataHint({ connection: { effectiveType: '2g' } }), true); assert.equal(lowDataHint({ connection: { effectiveType: 'slow-2g' } }), true); assert.equal(lowDataHint({ connection: { effectiveType: '4g' } }), false); assert.equal(lowDataHint({}), false); assert.equal(lowDataHint(undefined), false);
  const r = new RadioState({ saveData: true }); r.enterCar(); assert.equal(r.playing, false); r.power(); assert.equal(r.playing, true, 'the driver can still switch it on');
});
import { stepEvents, identEvents, degreeHz, stepSeconds, SCALES, STEPS_PER_BAR } from '../client/src/radio-music.js';
test('music patterns: deterministic for a seed and step, every station sounds different, notes are in range and in the scale', () => {
  const sig = {}; for (const st of STATIONS) { const track = schedule(st).segs.find(s => s.kind === 'track'); const voices = new Set(); let n = 0;
    for (let k = 0; k < STEPS_PER_BAR * 8; k++) { const a = stepEvents(st, track.seed, k), b = stepEvents(st, track.seed, k); assert.deepEqual(a, b, `${st.id} step ${k}`); n += a.length; for (const e of a) { voices.add(e.voice); assert.ok(e.vel > 0 && e.vel <= 1 && e.dur > 0); for (const hz of [].concat(e.hz || [])) assert.ok(hz >= 20 && hz <= 6000, `${hz}`); } }
    assert.ok(voices.has('kick') && n > 40, st.id); sig[st.id] = [...voices].sort().join(','); }
  assert.equal(new Set(Object.values(sig)).size, 4, 'four different instrument mixes: ' + JSON.stringify(sig));
  const st = STATIONS[0]; assert.notDeepEqual(Array.from({ length: 64 }, (_, k) => stepEvents(st, 1, k)), Array.from({ length: 64 }, (_, k) => stepEvents(st, 2, k)), 'a different track has different notes');
  const e = stepEvents(STATIONS[2], 5, 0).find(x => x.voice === 'chord'); assert.equal(e.hz.length, 3, 'a three-note chord on the first beat');
});
test('music maths: degrees climb octaves, scales are 7 notes, a step lasts a sixteenth of a beat, idents are shorter than their slot and in order', () => {
  assert.equal(SCALES.minor.length, 7); assert.ok(Math.abs(degreeHz(110, 'major', 7) - 220) < 1e-9, 'a full scale up is one octave'); assert.ok(Math.abs(degreeHz(110, 'major', 0) - 110) < 1e-9); assert.ok(Math.abs(degreeHz(110, 'major', -7) - 55) < 1e-9);
  assert.ok(Math.abs(stepSeconds(120) - 0.125) < 1e-9);
  for (const st of STATIONS) { const ev = identEvents(st, 123); assert.ok(ev.length >= 6); let prev = -1; for (const x of ev) { assert.ok(x.at >= 0 && x.at + x.dur < IDENT_SEC, 'fits in the ident'); } for (const x of ev.slice(0, 5)) { assert.ok(x.at > prev); prev = x.at; } assert.deepEqual(identEvents(st, 123), ev); }
});
