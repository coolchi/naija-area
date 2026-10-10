// Pure text helpers for the stadium score board (10 Oct 2026). No DOM, so tests can run them.
export const stateLabel = (f) => (f.state === 'live' ? (f.status === 'HT' ? 'Half time' : `${f.minute ?? '?'}'`) : f.state === 'finished' ? 'Full time' : 'Not started');
export const scoreText = (f) => (f.state === 'upcoming' ? 'vs' : `${f.homeGoals ?? 0} - ${f.awayGoals ?? 0}`);
export const kickoffText = (f, tzOffsetMin = 60) => { if (!f.kickoff) return ''; const d = new Date(f.kickoff + tzOffsetMin * 60000); return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`; }; // Lagos is UTC+1
export function ago(ms) { const m = Math.max(0, Math.round(ms / 60000)); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`; }
export function sourceLine(v, now) {
  const base = `${v.label}${v.updatedAt ? ` · updated ${ago(now - v.updatedAt)}` : ''}`;
  if (v.source === 'fictional') return `${base} · reason: ${({ no_key: 'no API key yet', cap_reached: 'daily call limit reached', plan_blocked: 'free plan does not cover this', api_error: 'feed problem', key_or_quota: 'key or quota problem', disabled: 'switched off', too_old: 'last result too old', no_data_yet: 'no data fetched yet' })[v.fallbackReason] || v.fallbackReason || 'fallback'}`;
  return v.stale ? `${base} · may be out of date` : base;
}
export function groupByLeague(list) { const m = new Map(); for (const f of list) { const k = `${f.league}${f.country && f.country !== 'Fictional' ? ' · ' + f.country : ''}`; if (!m.has(k)) m.set(k, []); m.get(k).push(f); } return [...m].map(([league, fixtures]) => ({ league, fixtures })); }
