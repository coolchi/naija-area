// On-demand asset loading (10 Oct 2026): a small generic cache that fetches things (today: ad creative images) only when they are wanted,
// nearest first, a couple at a time, retries failures with back-off, and evicts the farthest ones when over a byte budget.
// Pure scheduling logic (no DOM): the loader function is injected, so it is unit-tested in Node. Numbers are ESTIMATES to tune with real phone tests.
export const ASSET_CFG = {
  loadRadius: 150,        // m: start loading a board's creative when the player is this close (the ad evidence radius is 90 m + 30)
  keepRadius: 260,        // m: only things farther than this may be evicted
  maxConcurrent: 2,       // simultaneous downloads, so movement is never starved on slow data
  budgetBytes: 24 * 1024 * 1024, // decoded size budget (ESTIMATE; about 6 creatives)
  retryMs: [3000, 10000, 30000], // back-off after a failed load, then give up until the player leaves and returns
  textureBytes: 2.8 * 1024 * 1024, // extra GPU cost of one 1024x512 board texture with mipmaps (ESTIMATE)
  ...(globalThis.__naAssetCfg || {}) // test hook: the smoke test shrinks the radii because the current district is only about 220 m across
};
export class AssetCache {
  /** loader(key, ok(value, bytes), fail()) starts one load; onEvict(key, value) frees it */
  constructor(loader, onEvict = () => {}, cfg = ASSET_CFG, now = () => Date.now()) { this.loader = loader; this.onEvict = onEvict; this.cfg = cfg; this.now = now; this.e = new Map(); }
  /** ask for a key; dist = metres from the player (smaller = more urgent). Safe to call every frame. */
  request(key, dist) {
    let r = this.e.get(key); if (!r) { r = { state: 'idle', dist, tries: 0, bytes: 0, value: undefined, retryAt: 0, used: 0 }; this.e.set(key, r); }
    r.dist = dist; r.used = this.now(); if (r.state === 'idle' && r.tries === 0) r.state = 'queued'; return r.state === 'ready' ? r.value : undefined;
  }
  get(key) { const r = this.e.get(key); return r && r.state === 'ready' ? r.value : undefined; }
  state(key) { return this.e.get(key)?.state || 'none'; }
  stats() { let ready = 0, loading = 0, queued = 0, failed = 0, bytes = 0; for (const r of this.e.values()) { if (r.state === 'ready') { ready++; bytes += r.bytes; } else if (r.state === 'loading') loading++; else if (r.state === 'queued') queued++; else if (r.state === 'failed') failed++; } return { ready, loading, queued, failed, bytes, entries: this.e.size }; }
  /** call a few times a second. `distOf(key)` = current distance of the nearest user of that key (Infinity if nobody uses it). */
  tick(distOf = () => 0) {
    const C = this.cfg, t = this.now();
    for (const [k, r] of this.e) { if (r.state !== 'idle' && r.state !== 'queued') { const d = distOf(k); if (Number.isFinite(d)) r.dist = d; else if (r.state === 'ready') r.dist = Infinity; } }
    // 1) evict: farthest first, only things beyond keepRadius, while over budget
    let total = 0; for (const r of this.e.values()) if (r.state === 'ready') total += r.bytes;
    if (total > C.budgetBytes) { const cand = [...this.e].filter(([, r]) => r.state === 'ready' && r.dist > C.keepRadius).sort((a, b) => b[1].dist - a[1].dist); for (const [k, r] of cand) { if (total <= C.budgetBytes) break; total -= r.bytes; this.onEvict(k, r.value); this.e.delete(k); } }
    // 2) failed loads come back after their back-off while still wanted
    for (const r of this.e.values()) if (r.state === 'failed' && r.tries <= C.retryMs.length && t >= r.retryAt && r.dist <= C.loadRadius) r.state = 'queued';
    // 3) start loads, nearest first, up to the concurrency limit
    let active = 0; for (const r of this.e.values()) if (r.state === 'loading') active++;
    if (active >= C.maxConcurrent) return;
    const q = [...this.e].filter(([, r]) => r.state === 'queued' && r.dist <= C.loadRadius).sort((a, b) => a[1].dist - b[1].dist);
    for (const [k, r] of q) {
      if (active >= C.maxConcurrent) break; r.state = 'loading'; r.tries++; active++;
      let done = false; const ok = (value, bytes = 0) => { if (done) return; done = true; if (this.e.get(k) !== r) { this.onEvict(k, value); return; } r.state = 'ready'; r.value = value; r.bytes = bytes; this.onReady?.(k, value); };
      const fail = () => { if (done) return; done = true; if (this.e.get(k) !== r) return; r.state = 'failed'; r.retryAt = this.now() + (C.retryMs[Math.min(r.tries - 1, C.retryMs.length - 1)] || 30000); };
      try { this.loader(k, ok, fail); } catch { fail(); }
    }
  }
  /** player left and came back: failed items get a fresh set of tries */
  forgetFailures() { for (const r of this.e.values()) if (r.state === 'failed') { r.tries = 0; r.state = 'idle'; } }
}
