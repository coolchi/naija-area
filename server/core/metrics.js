// Metrics for monitoring (Prometheus text format, GET /metrics). No player names or other personal data: counts and timings only.
// Access: `Authorization: Bearer <NA_METRICS_TOKEN>` (for a monitor) or an admin session. Without either configured the endpoint answers 404.
import { checkInvariants } from './ledger.js';

const BUCKETS = [10, 25, 50, 100, 250, 500, 1000, 2500];
export function newMetrics() { return { startedAt: Date.now(), http: { '2xx': 0, '3xx': 0, '4xx': 0, '5xx': 0 }, api: { buckets: BUCKETS.map(() => 0), over: 0, sum: 0, count: 0 }, ledger: { at: 0, ok: 1, ms: 0 }, loop: null }; }
/** record one finished API request */
export function observe(app, status, ms) {
  const m = app.metrics; if (!m) return; const k = `${Math.floor(status / 100)}xx`; m.http[k] = (m.http[k] || 0) + 1; m.api.count++; m.api.sum += ms;
  const i = BUCKETS.findIndex(b => ms <= b); if (i >= 0) m.api.buckets[i]++; else m.api.over++;
}
const one = (db, sql) => { try { const r = db.prepare(sql).get(); return r ? Number(Object.values(r)[0]) || 0 : 0; } catch { return 0; } };
export function renderMetrics(app, { version = null, wsClients = 0 } = {}) {
  const m = app.metrics || newMetrics(); const now = Date.now(); const db = app.db; const L = []; const g = (name, help, val, labels = '') => { L.push(`# HELP ${name} ${help}`, `# TYPE ${name} gauge`, `${name}${labels} ${val}`); };
  let dbOk = 1; try { db.prepare('SELECT 1').get(); } catch { dbOk = 0; }
  if (now - m.ledger.at > 60000) { const t0 = performance.now(); try { m.ledger.ok = checkInvariants(db).ok ? 1 : 0; } catch { m.ledger.ok = 0; } m.ledger.ms = Math.round(performance.now() - t0); m.ledger.at = now; } // cached one minute: it scans the ledger
  g('na_up', '1 while the process answers', 1); g('na_build_info', 'version label', 1, `{version="${String(version || 'unknown').replace(/[^\w.\-]/g, '')}"}`); g('na_uptime_seconds', 'seconds since start', Math.round((now - m.startedAt) / 1000));
  g('na_db_ok', '1 when the database answers', dbOk); g('na_ledger_balanced', '1 when the money ledger invariants hold (cached 60 s). ALERT when 0', m.ledger.ok); g('na_ledger_check_ms', 'time of the last ledger check', m.ledger.ms);
  L.push('# HELP na_http_requests_total API requests by status class', '# TYPE na_http_requests_total counter'); for (const [k, v] of Object.entries(m.http)) L.push(`na_http_requests_total{class="${k}"} ${v}`);
  L.push('# HELP na_api_duration_ms API handler time', '# TYPE na_api_duration_ms histogram'); let cum = 0; BUCKETS.forEach((b, i) => { cum += m.api.buckets[i]; L.push(`na_api_duration_ms_bucket{le="${b}"} ${cum}`); }); L.push(`na_api_duration_ms_bucket{le="+Inf"} ${m.api.count}`, `na_api_duration_ms_sum ${Math.round(m.api.sum)}`, `na_api_duration_ms_count ${m.api.count}`);
  g('na_players_online', 'players seen by the heartbeat now', app.world?.players?.size ?? 0); g('na_ws_clients', 'open WebSocket connections', wsClients);
  g('na_users_total', 'accounts (including guests, bots and closed accounts)', one(db, 'SELECT COUNT(*) FROM users')); g('na_users_closed_total', 'closed accounts', one(db, 'SELECT COUNT(*) FROM account_deletions'));
  g('na_applications_open', 'apply-to-join applications waiting for an answer', one(db, "SELECT COUNT(*) FROM applications WHERE status IN ('new','review','shortlisted')")); g('na_ideas_new', 'office ideas not yet triaged', one(db, "SELECT COUNT(*) FROM office_ideas WHERE status='new'"));
  g('na_reports_open', 'player reports waiting for moderation', one(db, "SELECT COUNT(*) FROM reports WHERE status='open'")); g('na_ad_campaigns_in_review', 'ad campaigns waiting for a human', one(db, "SELECT COUNT(*) FROM ad_campaigns WHERE status='human_review'"));
  g('na_payments_pending', 'payment intents not yet settled', one(db, "SELECT COUNT(*) FROM payment_intents WHERE status IN ('pending','created','initiated')"));
  const mem = process.memoryUsage(); g('na_process_rss_bytes', 'resident memory', mem.rss); g('na_process_heap_used_bytes', 'JS heap in use', mem.heapUsed); if (m.loop) g('na_event_loop_lag_p99_ms', 'event loop delay p99 over the last window', Math.round(m.loop.percentile(99) / 1e4) / 100);
  return L.join('\n') + '\n';
}
/** true when the request may read metrics: bearer token, or an admin session */
export function metricsAllowed(app, { authHeader, isAdmin, token }) { if (isAdmin) return true; if (!token) return false; const m = /^Bearer (.+)$/.exec(String(authHeader || '')); return !!m && app.platform.safeEqual(m[1], token); }
