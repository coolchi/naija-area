// Pure quality logic (unit-tested) plus the small apply() that touches the renderer. See quality-config.js for the numbers.
import { QUALITY_KEY, LEVELS, PROFILES, AUTO, GOVERNOR } from './quality-config.js';

/** env: { deviceMemory, cores, saveData, coarse, width, height, dpr } -> 'low' | 'medium' | 'high' */
export function autoLevel(env = {}) {
  const mem = env.deviceMemory, cores = env.cores, short = Math.min(env.width || 9999, env.height || 9999);
  if (AUTO.saveDataIsLow && env.saveData) return 'low';
  if ((mem != null && mem <= AUTO.lowMemoryGb) || (cores != null && cores <= AUTO.lowCores)) return 'low';
  if (env.coarse && short <= AUTO.smallScreenPx && (env.dpr || 1) >= 2.5) return 'low';
  if (env.coarse || (mem != null && mem < AUTO.midMemoryGb)) return 'medium';
  return 'high';
}
export const readEnv = () => ({ deviceMemory: navigator.deviceMemory, cores: navigator.hardwareConcurrency, saveData: !!navigator.connection?.saveData, coarse: matchMedia('(pointer: coarse)').matches, width: innerWidth, height: innerHeight, dpr: devicePixelRatio || 1 });
export const readChoice = (store) => { try { const v = store.getItem(QUALITY_KEY); return v === 'auto' || LEVELS.includes(v) ? v : 'auto'; } catch { return 'auto'; } };
export const saveChoice = (store, v) => { try { store.setItem(QUALITY_KEY, v === 'auto' || LEVELS.includes(v) ? v : 'auto'); } catch { /* private mode */ } };
/** choice 'auto' or a level, plus how many steps the governor already took down */
export function resolve(choice, env, stepsDown = 0) { const base = choice === 'auto' || !LEVELS.includes(choice) ? autoLevel(env) : choice; return LEVELS[Math.max(0, LEVELS.indexOf(base) - (choice === 'auto' ? stepsDown : 0))]; }
export const profileFor = (level) => PROFILES[level] || PROFILES.medium;

/** feeds on frame times; says when to step down. Only used while the choice is Auto. */
export class Governor {
  constructor(cfg = GOVERNOR) { this.cfg = cfg; this.t = 0; this.win = 0; this.frames = 0; this.steps = 0; }
  /** dtMs = time since the last frame. Returns true when the quality should drop one level. */
  feed(dtMs) {
    const c = this.cfg; if (this.steps >= c.maxSteps) return false; this.t += dtMs; if (this.t < c.warmupMs) return false;
    this.win += dtMs; this.frames++; if (this.win < c.windowMs) return false;
    const fps = (this.frames * 1000) / this.win; this.win = 0; this.frames = 0;
    if (fps < c.degradeBelowFps) { this.steps++; this.t = c.warmupMs - c.windowMs; return true; } return false;
  }
}
/** frame limiter: true when this frame should be drawn */
export const shouldRender = (nowMs, lastMs, maxFps) => !maxFps || maxFps >= 60 || nowMs - lastMs >= 1000 / maxFps - 2;

/** apply a level to the live game (renderer, fog, camera). Antialias and the walker count only change at the next start. */
export function apply(game, level) {
  const p = profileFor(level); game.qualityLevel = level; game.quality = p;
  if (game.renderer) { game.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, p.pixelRatio)); game.resize?.(); }
  if (game.scene?.fog) { game.scene.fog.near = p.fogNear; game.scene.fog.far = p.fogFar; }
  if (game.camera) { game.camera.far = p.far; game.camera.updateProjectionMatrix(); }
  document.body.dataset.quality = level; return p;
}
