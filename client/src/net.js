// Heartbeat loop (HTTP poll, load-adaptive interval from the server) + optional WebSocket push for notifications/knocks.
import { post, ApiError } from './api.js';
export class Net {
  constructor(game) { this.g = game; this.interval = 3000; this.fails = 0; this.timer = null; this.running = false; this.trail = []; this.notifSince = 0; this.chatSince = undefined; this.adsVersion = 0; this.since = 0; this.ws = null; this.inflight = false; }
  start() { if (this.running) return; this.running = true; this.tick(); this.openWs(); }
  stop() { this.running = false; clearTimeout(this.timer); try { this.ws?.close(); } catch { /* ignore */ } this.ws = null; }
  nudge() { if (!this.running) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.tick(), 50); }
  sample(sn) { this.trail.push(sn); if (this.trail.length > 60) this.trail.shift(); }
  async tick() {
    if (!this.running || this.inflight) return; this.inflight = true; const g = this.g; const now = g.serverNow(); let ok = false;
    const trail = this.trail.splice(0).map(s => ({ a: Math.max(0, Math.round(now - s.t)), x: +s.x.toFixed(2), z: +s.z.toFixed(2), ry: +s.ry.toFixed(3) }));
    try {
      const body = { city: g.city.id, trail, mode: g.ctrl.mode, since: this.since, notifSince: this.notifSince, adsVersion: this.adsVersion, evidence: g.ads.take(), activity: g.activity || '' }; if (this.chatSince !== undefined) body.chatSince = this.chatSince;
      const t0 = performance.now(); const r = await post('/api/heartbeat', body); const rtt = performance.now() - t0; g.clockSync(r.now, rtt); this.since = r.now; this.fails = 0; ok = true; g.setConn(true);
      this.interval = r.interval || 3000; this.adsVersion = r.adsVersion; this.chatSince = r.chatCursor; if (r.notifs?.length) this.notifSince = r.notifs[r.notifs.length - 1].id; g.onHeartbeat(r);
    } catch (e) {
      if (e instanceof ApiError && e.code === 'BREAK_TIME') { ok = true; this.fails = 0; this.interval = Math.max(this.interval || 0, 10000); } else { this.fails++; } if (e instanceof ApiError && e.status === 401) { this.stop(); g.sessionLost(); return; } if (this.fails >= 3) g.setConn(false);
    } finally { this.inflight = false; }
    if (this.running) this.timer = setTimeout(() => this.tick(), ok ? this.interval : Math.min(15000, 1500 * 2 ** Math.min(this.fails, 3)));
  }
  openWs() {
    if (window.__naDemo) return; // static demo: no server to push from
    try { const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`); this.ws = ws;
      ws.onmessage = (ev) => { try { const m = JSON.parse(ev.data); if (m.type === 'notification') { this.g.onPush(m); this.nudge(); } else if (typeof m.type === 'string' && m.type.startsWith('phone.')) this.g.phone2?.onPush(m); } catch { /* ignore */ } };
      ws.onclose = () => { if (this.running) setTimeout(() => this.running && this.openWs(), 5000); }; ws.onerror = () => {};
    } catch { /* heartbeat alone is enough */ }
  }
}
