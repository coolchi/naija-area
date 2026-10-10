// Streaming one real station through a plain audio element (10 Oct 2026). No proxy, no Web Audio, no CORS needs. Pure logic around an Audio-like object
// (`makeAudio()` returns something with src, volume, muted, play(), pause(), load(), removeAttribute(), addEventListener()), so tests use a mock and never touch the network.
import { STREAM_STALL_MS } from './radio-stations.js';

const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='; // 0 samples: used once, inside the first tap, so iOS lets this element play later
export class StreamPlayer {
  constructor(makeAudio, { setTimer = (f, ms) => setTimeout(f, ms), clearTimer = (t) => clearTimeout(t), stallMs = STREAM_STALL_MS } = {}) {
    this.makeAudio = makeAudio; this.a = null; this.url = null; this.gen = 0; this.timer = null; this.setTimer = setTimer; this.clearTimer = clearTimer; this.stallMs = stallMs; this.state = 'idle'; // idle | loading | playing
    this.onPlaying = () => {}; this.onError = () => {}; this.onBlocked = () => {};
  }
  el() { if (this.a) return this.a; const a = this.a = this.makeAudio(); a.preload = 'none'; for (const t of ['playing', 'error', 'stalled', 'ended', 'abort']) a.addEventListener(t, () => this.handle(t, this.gen)); return a; }
  handle(type, gen) {
    if (gen !== this.gen || this.state === 'idle') return; // a late event from a stream we already left
    if (type === 'playing') { this.clear(); this.state = 'playing'; this.onPlaying(this.url); }
    else if (type === 'error' || type === 'ended') this.fail(type); // a live stream that ends is a dead stream
    else if (type === 'stalled' && this.state === 'loading') { /* the stall timer decides */ }
  }
  clear() { if (this.timer != null) { this.clearTimer(this.timer); this.timer = null; } }
  fail(reason) { const url = this.url; this.stop(); this.onError(reason, url); }
  /** call inside the first tap or key press so the element is allowed to play later (needed on iOS; harmless elsewhere) */
  prime() { const a = this.el(); try { a.muted = true; a.src = SILENT; const p = a.play(); const done = () => { try { a.pause(); a.removeAttribute('src'); a.muted = false; } catch { /* ignore */ } }; if (p && p.then) p.then(done, done); else done(); } catch { /* ignore */ } }
  play(url, volume) {
    const a = this.el(); this.gen++; const gen = this.gen; this.clear(); this.url = url; this.state = 'loading'; a.muted = false; a.volume = volume; a.src = url;
    this.timer = this.setTimer(() => { if (gen === this.gen && this.state === 'loading') this.fail('no_sound'); }, this.stallMs);
    let p; try { p = a.play(); } catch (e) { return this.rejected(e, gen); }
    if (p && p.catch) p.catch((e) => this.rejected(e, gen));
  }
  rejected(e, gen) { if (gen !== this.gen) return; if (e && (e.name === 'NotAllowedError' || /not allowed|user gesture/i.test(e.message || ''))) { const url = this.url; this.stop(); this.onBlocked(url); } else if (e && e.name === 'AbortError') { /* we changed station: ignore */ } else this.fail(e?.name || 'play_rejected'); }
  setVolume(v) { if (this.a) this.a.volume = Math.max(0, Math.min(1, v)); }
  /** stop and let go of the connection (an audio element keeps downloading a live stream until its src is removed) */
  stop() { this.gen++; this.clear(); this.state = 'idle'; this.url = null; const a = this.a; if (a) { try { a.pause(); a.removeAttribute('src'); a.load(); } catch { /* ignore */ } } }
  get isPlaying() { return this.state === 'playing'; }
}
