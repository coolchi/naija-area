export class GameError extends Error {
  constructor(code, message, status = 400, extra = {}) { super(message || code); this.code = code; this.status = status; this.extra = extra; }
}
export const bad = (code, msg, status = 400, extra) => { throw new GameError(code, msg, status, extra); };
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const isInt = (v) => Number.isInteger(v);
export function cleanText(s, max = 140) {
  if (typeof s !== 'string') return '';
  return s.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}
export { hasBadWord } from './filter.js';
export const dayKey = (ms) => new Date(ms).toISOString().slice(0, 10);
// simple token bucket by key: returns true if allowed
export class Limiter {
  constructor() { this.m = new Map(); }
  hit(key, limit, windowMs, now) {
    let e = this.m.get(key);
    if (!e || now - e.start >= windowMs) { e = { start: now, n: 0 }; this.m.set(key, e); }
    e.n++; if (this.m.size > 50000) this.gc(now);
    return e.n <= limit;
  }
  gc(now) { for (const [k, e] of this.m) if (now - e.start > 3600000) this.m.delete(k); }
}
