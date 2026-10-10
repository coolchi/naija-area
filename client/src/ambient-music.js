// Light background music, PURE and deterministic (no audio here, so tests can check it): a slow highlife-flavoured loop in A minor pentatonic with a soft guitar-like pluck,
// a walking bass, a shaker and a quiet kick. At night the drums drop out and a pad fades in. Composed by the code below from scales and a seed: nothing is copied from any recording.
import { SOUND } from './audio-config.js';

const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
export const PENTA = [0, 3, 5, 7, 10];                    // A minor pentatonic, semitones above the root
export const CHORD_ROOTS = [0, -4, 3, -2];                // Am, F, C, G (semitones from A): one chord per bar, repeating
export const STEPS = 8;                                   // eighth notes per bar (4/4)
export const hz = (root, semis) => root * Math.pow(2, semis / 12);
export const stepSec = (bpm = SOUND.music.bpm) => 60 / bpm / 2;
export const barSec = (bpm = SOUND.music.bpm) => stepSec(bpm) * STEPS;
/** events of one bar: { at (seconds from the bar start), kind: 'pluck'|'bass'|'kick'|'shaker'|'pad', f (Hz, 0 for noise), d, g } */
export function barEvents(bar, { night = false, seed = 7, root = SOUND.music.rootHz, bpm = SOUND.music.bpm } = {}) {
  const song = Math.floor(bar / SOUND.music.barsPerSong), b = ((bar % 4) + 4) % 4, rnd = mulberry(seed * 977 + song * 131 + bar * 17); const st = stepSec(bpm), ev = []; const cr = CHORD_ROOTS[b];
  // bass: root on 1, fifth or octave on the "and" of 2 (syncopated), root again on 3
  ev.push({ at: 0, kind: 'bass', f: hz(root / 2, cr), d: st * 1.8, g: 0.5 }, { at: st * 3, kind: 'bass', f: hz(root / 2, cr + 7), d: st * 0.9, g: 0.35 }, { at: st * 4, kind: 'bass', f: hz(root / 2, cr), d: st * 1.4, g: 0.45 });
  if (!night) { ev.push({ at: 0, kind: 'kick', f: 0, d: 0.12, g: 0.4 }, { at: st * 4, kind: 'kick', f: 0, d: 0.12, g: 0.34 }); for (let i = 0; i < STEPS; i++) ev.push({ at: i * st, kind: 'shaker', f: 0, d: 0.05, g: i % 2 ? 0.1 : 0.16 }); }
  // pluck melody: a few notes from the pentatonic scale around the chord, answered phrase every second bar
  const picks = (b % 2 === 0) ? [0, 2, 3, 5, 6] : [1, 3, 4, 7]; let deg = Math.floor(rnd() * PENTA.length) + 5;
  for (const [i, s] of picks.entries()) { if (i >= 2 && rnd() < 0.2) continue; deg = Math.max(3, Math.min(9, deg + (rnd() < 0.5 ? -1 : 1) * (1 + (rnd() < 0.3 ? 1 : 0)))); const semis = PENTA[deg % PENTA.length] + 12 * Math.floor(deg / PENTA.length); ev.push({ at: s * st, kind: 'pluck', f: hz(root, semis), d: st * (rnd() < 0.3 ? 1.6 : 0.9), g: 0.3 }); }
  if (night) ev.push({ at: 0, kind: 'pad', f: hz(root, cr), d: barSec(bpm) * 1.05, g: 0.18 }, { at: 0, kind: 'pad', f: hz(root, cr + 7), d: barSec(bpm) * 1.05, g: 0.12 });
  return ev.sort((a, c) => a.at - c.at);
}
/** every note of every event stays inside a pleasant range */
export const RANGE = { min: 40, max: 1500 };
