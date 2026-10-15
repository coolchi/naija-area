// SOUND EFFECTS AND LIGHT MUSIC (queue batch 1 item 3). Everything is SYNTHESISED in the browser with Web Audio: no audio files, no samples, no streaming, nothing unlicensed.
// Every number here is an ESTIMATE chosen by ear-less reasoning (nobody has listened on a phone speaker): tune freely. The in-car radio (radio-*.js) is separate.
export const SOUND = {
  key: 'na_sound_v1',
  defaults: { on: true, sfx: 0.8, music: 0.3 },       // music is quiet on purpose; players can switch it off in More > Sound
  buses: { master: 0.9, sfx: 0.55, music: 0.32 },
  maxVoices: 28,                                       // sound effect layers playing at once (older ones are left to finish, new ones are dropped)
  minGapMs: { step: 120, click: 45, thud: 90, coin: 60, notify: 250, bad: 150, ok: 60 }, // same sound twice within this many ms is skipped
  engine: { baseHz: 52, perMs: 5.2, maxHz: 210, gain: 0.025, cutoff: 520, cutoffPerMs: 24, idleFloor: 0.04 }, // car hum follows speed (m/s); half the old gain
  music: { bpm: 98, aheadSec: 0.8, barsPerSong: 8, duckWhenRadio: true, rootHz: 220, nightGain: 0.8, quietOnLowEnd: true },
  // Stylised placeholder call-to-prayer (synthesised; not a recording). Soft modal melody on the music bus while inside a mosque.
  adhan: {
    gain: 0.22, phraseGapSec: 2.8,
    // approximate rising phrases (Hz), held with gentle vibrato — ESTIMATE
    phrases: [
      [220, 247, 262, 294, 330, 294, 262],
      [262, 294, 330, 349, 392, 349, 330, 294],
      [196, 220, 247, 262, 294, 330, 349, 330, 294, 262],
      [247, 262, 294, 330, 294, 262, 247, 220],
    ],
    noteSec: 0.55, gapSec: 0.08,
  },
};
// Effect recipes: layers of { w: wave | 'noise', f: Hz or [from, to] (for noise: filter Hz), at: start seconds, d: length seconds, g: peak gain, lp: low-pass cutoff (optional), a: attack seconds }.
export const RECIPES = {
  click:   { vol: 0.35, layers: [{ w: 'triangle', f: [1200, 900], at: 0, d: 0.035, g: 0.5 }] },
  coin:    { vol: 0.8,  layers: [{ w: 'square', f: 988, at: 0, d: 0.07, g: 0.22, lp: 3200 }, { w: 'square', f: 1319, at: 0.07, d: 0.18, g: 0.22, lp: 3200 }] },
  ok:      { vol: 0.7,  layers: [{ w: 'triangle', f: 523, at: 0, d: 0.09, g: 0.5 }, { w: 'triangle', f: 784, at: 0.08, d: 0.14, g: 0.5 }] },
  bad:     { vol: 0.8,  layers: [{ w: 'sawtooth', f: [220, 150], at: 0, d: 0.22, g: 0.3, lp: 900 }] },
  notify:  { vol: 0.6,  layers: [{ w: 'sine', f: 880, at: 0, d: 0.12, g: 0.5 }, { w: 'sine', f: 1175, at: 0.13, d: 0.2, g: 0.45 }] },
  achieve: { vol: 0.8,  layers: [{ w: 'triangle', f: 523, at: 0, d: 0.12, g: 0.5 }, { w: 'triangle', f: 659, at: 0.1, d: 0.12, g: 0.5 }, { w: 'triangle', f: 784, at: 0.2, d: 0.12, g: 0.5 }, { w: 'triangle', f: 1047, at: 0.3, d: 0.4, g: 0.55 }] },
  horn:    { vol: 0.7,  layers: [{ w: 'sawtooth', f: 330, at: 0, d: 0.24, g: 0.3, lp: 1400 }, { w: 'sawtooth', f: 415, at: 0, d: 0.24, g: 0.25, lp: 1400 }] },
  knock:   { vol: 0.8,  layers: [{ w: 'sine', f: [160, 110], at: 0, d: 0.06, g: 0.8 }, { w: 'sine', f: [160, 110], at: 0.16, d: 0.06, g: 0.8 }, { w: 'sine', f: [160, 110], at: 0.32, d: 0.06, g: 0.8 }] },
  thunk:   { vol: 0.7,  layers: [{ w: 'sine', f: [140, 80], at: 0, d: 0.1, g: 0.8 }] },
  thud:    { vol: 0.9,  layers: [{ w: 'sine', f: [90, 45], at: 0, d: 0.16, g: 0.9 }, { w: 'noise', f: 400, at: 0, d: 0.08, g: 0.3 }] },
  step:    { vol: 0.5,  layers: [{ w: 'noise', f: 700, at: 0, d: 0.04, g: 0.5 }, { w: 'sine', f: [110, 70], at: 0, d: 0.05, g: 0.4 }] },
  door:    { vol: 0.7,  layers: [{ w: 'noise', f: 500, at: 0, d: 0.07, g: 0.4 }, { w: 'sine', f: [200, 120], at: 0.02, d: 0.12, g: 0.5 }] },
  crash:   { vol: 1.0,  layers: [{ w: 'noise', f: 1800, at: 0, d: 0.35, g: 0.7 }, { w: 'sine', f: [120, 40], at: 0, d: 0.3, g: 0.9 }, { w: 'sawtooth', f: [260, 90], at: 0, d: 0.2, g: 0.2, lp: 700 }] },
  shutter: { vol: 0.8,  layers: [{ w: 'noise', f: 3000, at: 0, d: 0.03, g: 0.7 }, { w: 'noise', f: 2200, at: 0.07, d: 0.04, g: 0.6 }] },
  pop:     { vol: 0.6,  layers: [{ w: 'sine', f: [500, 900], at: 0, d: 0.08, g: 0.6 }] },
  whoosh:  { vol: 0.6,  layers: [{ w: 'noise', f: [400, 2400], at: 0, d: 0.35, g: 0.4, a: 0.12 }] },
  ding:    { vol: 0.7,  layers: [{ w: 'sine', f: 1568, at: 0, d: 0.5, g: 0.5 }, { w: 'sine', f: 2349, at: 0, d: 0.35, g: 0.2 }] }
};
