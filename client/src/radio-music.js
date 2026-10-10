// Radio music patterns (10 Oct 2026). PURE and deterministic: for a station sound, a track seed and a 16th-note step number, it says which voices play.
// Same inputs give the same notes for every player, so the playlist clock (radio.js) keeps everyone in the same song. No audio here, so tests can check it.
// The music is SYNTHESISED in the browser (radio-audio.js plays these events); it is not a recording of anything.
const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
export const SCALES = { minor: [0, 2, 3, 5, 7, 8, 10], major: [0, 2, 4, 5, 7, 9, 11] };
export const PROGRESSIONS = { minor: [0, 5, 2, 6], major: [0, 4, 5, 3] }; // scale degrees, one chord per bar: i VI III VII / I V vi IV
export const STEPS_PER_BAR = 16;
/** frequency of scale degree `deg` (can exceed the scale: it climbs octaves) above `root` Hz */
export function degreeHz(root, scale, deg) { const sc = SCALES[scale]; const oct = Math.floor(deg / sc.length); const d = ((deg % sc.length) + sc.length) % sc.length; return root * Math.pow(2, (sc[d] + 12 * oct) / 12); }
const chordDegrees = (scale, bar) => { const r = PROGRESSIONS[scale][((bar % 4) + 4) % 4]; return [r, r + 2, r + 4]; };
const PAT = { // which steps (0..15) each drum plays
  afro: { kick: [0, 7, 10], snare: [4, 12], hat: [0, 2, 4, 6, 8, 10, 12, 14], extra: [3, 11] },
  highlife: { kick: [0, 8], snare: [], hat: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], extra: [2, 6, 10, 14] },
  gospel: { kick: [0, 8], snare: [4, 12], hat: [], extra: [] },
  slow: { kick: [0], snare: [], hat: [], extra: [12] },
};
/** the events for one 16th-note step: [{ voice, hz?, dur (in steps), vel (0..1) }]. Voices: kick snare hat rim bass chord pluck lead bell. */
export function stepEvents(st, seed, k) {
  const step = ((k % STEPS_PER_BAR) + STEPS_PER_BAR) % STEPS_PER_BAR; const bar = Math.floor(k / STEPS_PER_BAR); const rnd = mulberry((seed ^ Math.imul(k + 1, 2654435761)) >>> 0); const p = PAT[st.sound]; const ev = []; const chord = chordDegrees(st.scale, bar); const root = st.root;
  if (p.kick.includes(step)) ev.push({ voice: 'kick', dur: 1, vel: st.sound === 'slow' ? 0.5 : 0.9 }); if (p.snare.includes(step)) ev.push({ voice: 'snare', dur: 1, vel: 0.6 }); if (p.hat.includes(step)) ev.push({ voice: 'hat', dur: 0.5, vel: st.sound === 'highlife' ? (step % 2 ? 0.12 : 0.22) : 0.25 + (rnd() * 0.1) });
  if (p.extra.includes(step)) ev.push({ voice: 'rim', dur: 0.5, vel: 0.35 });
  const r0 = chord[0];
  if (st.sound === 'afro') { if ([0, 3, 6, 10, 12].includes(step) && rnd() < 0.9) ev.push({ voice: 'bass', hz: degreeHz(root, st.scale, r0), dur: 2, vel: 0.8 }); if (step % 4 === 2 && rnd() < 0.6) ev.push({ voice: 'pluck', hz: degreeHz(root * 4, st.scale, chord[Math.floor(rnd() * 3)] + (rnd() < 0.3 ? 2 : 0)), dur: 1.5, vel: 0.35 }); if (step === 0) ev.push({ voice: 'chord', hz: chord.map(d => degreeHz(root * 4, st.scale, d)), dur: 14, vel: 0.14 }); }
  else if (st.sound === 'highlife') { if (step % 4 === 0) ev.push({ voice: 'bass', hz: degreeHz(root, st.scale, step % 8 === 0 ? r0 : r0 + 4), dur: 3, vel: 0.8 }); if (step % 2 === 0) ev.push({ voice: 'pluck', hz: degreeHz(root * 4, st.scale, chord[(step / 2) % 3] + (step >= 8 ? 7 : 0)), dur: 1.4, vel: 0.4 }); }
  else if (st.sound === 'gospel') { if (step === 0) { ev.push({ voice: 'chord', hz: chord.map(d => degreeHz(root * 2, st.scale, d)), dur: 15, vel: 0.2 }); ev.push({ voice: 'bass', hz: degreeHz(root, st.scale, r0), dur: 15, vel: 0.6 }); } if ([4, 10, 14].includes(step) && rnd() < 0.7) ev.push({ voice: 'lead', hz: degreeHz(root * 4, st.scale, chord[Math.floor(rnd() * 3)] + Math.floor(rnd() * 3)), dur: 3, vel: 0.3 }); }
  else { if (step === 0) { ev.push({ voice: 'chord', hz: [chord[0], chord[1], chord[2], chord[0] + 7].map(d => degreeHz(root * 2, st.scale, d)), dur: 15, vel: 0.2 }); ev.push({ voice: 'bass', hz: degreeHz(root / 2, st.scale, r0), dur: 15, vel: 0.7 }); } if ([2, 8, 13].includes(step) && rnd() < 0.5) ev.push({ voice: 'bell', hz: degreeHz(root * 8, st.scale, chord[Math.floor(rnd() * 3)] + (rnd() < 0.4 ? 1 : 0)), dur: 4, vel: 0.22 }); }
  return ev;
}
/** the station jingle: a rising arpeggio of the station's chord, then a held note. Returns [{ at (seconds), hz, dur, vel }] over IDENT_SEC. */
export function identEvents(st, seed) { const rnd = mulberry(seed >>> 0); const ch = chordDegrees(st.scale, 0); const out = []; const notes = [ch[0], ch[1], ch[2], ch[0] + 7, ch[2] + 7]; notes.forEach((d, i) => out.push({ at: 0.4 + i * 0.28, hz: degreeHz(st.root * 4, st.scale, d), dur: 0.5, vel: 0.5 + rnd() * 0.1 })); out.push({ at: 2.2, hz: degreeHz(st.root * 4, st.scale, ch[0] + 7), dur: 2.4, vel: 0.45 }, { at: 2.2, hz: degreeHz(st.root * 2, st.scale, ch[0]), dur: 2.4, vel: 0.45 }); return out; }
export const stepSeconds = (bpm) => 60 / bpm / 4;
