// GRAPHICS QUALITY (queue batch 1 item 2). Every number here is an ESTIMATE that nobody has measured on a real low-end phone: tune it.
// Levels: low = "Lite", medium = "Normal", high = "High". The player can pick one in More > Graphics, or leave it on Auto.
export const QUALITY_KEY = 'na_quality_v1';
export const LEVELS = ['low', 'medium', 'high'];
export const PROFILES = {
  low:    { label: 'Lite',   pixelRatio: 1.0,  antialias: false, fogNear: 70,  fogFar: 300, far: 330, maxFps: 30, walkers: 14, hudEveryMs: 500 },
  medium: { label: 'Normal', pixelRatio: 1.25, antialias: false, fogNear: 110, fogFar: 430, far: 480, maxFps: 60, walkers: 26, hudEveryMs: 250 },
  high:   { label: 'High',   pixelRatio: 1.75, antialias: true,  fogNear: 140, fogFar: 520, far: 900, maxFps: 60, walkers: 36, hudEveryMs: 250 }
};
// Auto pick at start: the first rule that matches wins. A phone with little memory, few cores, "data saver" on, or a small high-density screen starts on Lite.
export const AUTO = { lowMemoryGb: 4, lowCores: 4, midMemoryGb: 8, smallScreenPx: 760, saveDataIsLow: true };
// Auto-downgrade: after `warmupMs`, average the frame rate over `windowMs`; below `degradeBelowFps` drop one level (never below Lite, at most `maxSteps` times a session).
export const GOVERNOR = { warmupMs: 5000, windowMs: 3000, degradeBelowFps: 24, maxSteps: 2 };
