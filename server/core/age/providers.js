// Age-check providers behind ONE interface. NO VENDOR IS CHOSEN; only a stand-in exists.
//   start({ userRef, returnUrl })  -> { sessionRef, url, expiresAt }      (userRef is an opaque value, NEVER the username, so the vendor learns nothing from it)
//   result(sessionRef)             -> { state: 'pending'|'completed'|'failed'|'expired', over18?: boolean }
//   verifyWebhook(raw, headers)    -> boolean ;  parseWebhook(raw) -> { sessionRef } | null      (optional trigger; the answer is always fetched with result())
// The interface can only ever return an over-18 yes/no. Anything else a vendor sends (date of birth, name, ID number, photos) is dropped by sanitize() and never stored.
import { GameError } from '../util.js';

/** The ONLY shape that may leave a provider. Extra keys are dropped here, so personal data cannot leak into the game by accident. */
export function sanitize(r) {
  const state = ['pending', 'completed', 'failed', 'expired'].includes(r?.state) ? r.state : 'failed';
  return state === 'completed' && typeof r.over18 === 'boolean' ? { state, over18: r.over18 } : { state: state === 'completed' ? 'failed' : state };
}
export function checkSig(platform, algo, secret, raw, header) {
  if (!secret || !header || raw == null) return false;
  const want = platform.hmacHex(algo, secret, Buffer.isBuffer(raw) ? raw : Buffer.from(String(raw))); const got = String(header).trim().toLowerCase();
  return got.length === want.length && platform.safeEqual(got, want);
}

/** Stand-in: behaves like a hosted ID/face-age vendor with no network. Tests and play-testing decide the outcome. */
export function mockAgeProvider({ platform, secret = 'mock-age-secret', now = () => Date.now(), ttlMs = 30 * 60000 } = {}) {
  const sessions = new Map(); let n = 0;
  return {
    id: 'mock', sessions, secret,
    async start({ userRef }) { const sessionRef = `mockage_${++n}_${platform.randomHex(4)}`; sessions.set(sessionRef, { userRef, state: 'pending', over18: undefined, expiresAt: now() + ttlMs }); return { sessionRef, url: `/age/mock?session=${sessionRef}`, expiresAt: now() + ttlMs }; },
    async result(sessionRef) {
      const s = sessions.get(sessionRef); if (!s) throw new GameError('AGE_PROVIDER', 'The age-check service does not know that session.', 502);
      if (s.state === 'pending' && now() > s.expiresAt) return { state: 'expired' };
      // a real vendor may include much more; the mock does on purpose so tests prove it is dropped
      return { state: s.state, over18: s.over18, dateOfBirth: '1990-01-01', fullName: 'Ada Example', idNumber: '12345678901', selfie: 'base64...' };
    },
    verifyWebhook: (raw, headers) => checkSig(platform, 'sha256', secret, raw, Object.entries(headers || {}).find(([k]) => k.toLowerCase() === 'x-age-signature')?.[1]),
    parseWebhook(raw) { try { const j = JSON.parse(Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw)); return typeof j.sessionRef === 'string' ? { sessionRef: j.sessionRef } : null; } catch { return null; } },
    // ---- test controls (a real vendor has none)
    decide(sessionRef, outcome) { const s = sessions.get(sessionRef); if (!s) throw new Error('unknown session'); if (outcome === 'over18') { s.state = 'completed'; s.over18 = true; } else if (outcome === 'under18') { s.state = 'completed'; s.over18 = false; } else if (outcome === 'unreadable') { s.state = 'failed'; } else throw new Error('outcome'); },
    webhook(sessionRef) { const body = Buffer.from(JSON.stringify({ sessionRef })); return { body, headers: { 'x-age-signature': platform.hmacHex('sha256', secret, body) } }; }
  };
}
