// Weather look: ALL tuning numbers (ESTIMATES, not tuned by a human eye; change them, rebuild, look). The fix of 10 Oct 2026: rain used to shrink the fog every heartbeat until the whole screen was fog colour.
// Rules that hold whatever these numbers are (enforced by the clamps below and tests/weather-look.test.js): the fog never starts nearer than `minNear` or ends nearer than `minFar` metres, the lightning
// flash adds at most `flashMax` of the light, and players up to `visibleM` metres away stay clearly visible in every weather.
/** how wet / dark each state looks: rain strength 0..1, sky grey mix 0..1, fog scale (1 = normal), light dimming (1 = normal) */
export const LOOK = {
  clear: { rain: 0, grey: 0, fog: 1, dim: 1 },
  cloudy: { rain: 0, grey: 0.3, fog: 0.9, dim: 0.9 },
  rain: { rain: 0.6, grey: 0.45, fog: 0.85, dim: 0.8 },
  storm: { rain: 1, grey: 0.6, fog: 0.7, dim: 0.7 }
};
export const WEATHER_VIEW = {
  rainOpacity: 0.35,       // rain streak opacity
  flashMax: 0.5,           // lightning adds at most +50 % light for an instant (it was +180 %, which blew the screen out)
  minNear: 60,             // fog never starts nearer than this (m)
  minFar: 240,             // ... or ends nearer than this (m)
  farBase: 0.4, farSlope: 0.6, // far = base.far * (farBase + farSlope * fogScale)
  visibleM: 40,            // players this close stay clearly visible in any weather
  minVisiblePct: 0.35      // ... at least this share of their own colour must survive the fog at visibleM
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/** fog start/end for a fog scale, from the day's own base distances (never from the already-weathered ones) */
export function fogDistances(baseNear, baseFar, fogScale, V = WEATHER_VIEW) {
  const far = Math.max(V.minFar, baseFar * (V.farBase + V.farSlope * fogScale)), near = clamp(baseNear * fogScale, V.minNear, far * 0.6);
  return { near, far };
}
/** light multiplier: dimming plus the lightning flash (0..1), the flash capped */
export const lightScale = (dim, flash, V = WEATHER_VIEW) => dim * (1 + clamp(flash, 0, 1) * V.flashMax);
/** share of a player's own colour left at `distM` metres under three.js linear fog (1 = untouched) */
export const visibleShare = (distM, near, far) => clamp(1 - (distM - near) / Math.max(1, far - near), 0, 1);
