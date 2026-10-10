// TOTP (RFC 6238, HMAC-SHA1, 6 digits, 30 s) for the admin login. PURE: the HMAC is injected, so it runs in Node (platform.hmacSha1) and is tested against the RFC vectors.
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export function base32Encode(bytes) { let bits = 0, v = 0, out = ''; for (const b of bytes) { v = (v << 8) | b; bits += 8; while (bits >= 5) { out += B32[(v >>> (bits - 5)) & 31]; bits -= 5; } } if (bits > 0) out += B32[(v << (5 - bits)) & 31]; return out; }
export function base32Decode(s) { const clean = String(s || '').toUpperCase().replace(/[\s=-]/g, ''); let bits = 0, v = 0; const out = []; for (const ch of clean) { const i = B32.indexOf(ch); if (i < 0) throw new Error('not base32'); v = (v << 5) | i; bits += 5; if (bits >= 8) { out.push((v >>> (bits - 8)) & 255); bits -= 8; } } return Uint8Array.from(out); }
export const newSecret = (randomBytesHex) => base32Encode(Uint8Array.from(randomBytesHex.match(/../g).map(h => parseInt(h, 16)))); // pass 20 random bytes as hex (40 chars)
/** the code for a 30 s step number */
export function codeAt(secretB32, step, hmacSha1, digits = 6) {
  const key = base32Decode(secretB32); const msg = new Uint8Array(8); let s = BigInt(step); for (let i = 7; i >= 0; i--) { msg[i] = Number(s & 255n); s >>= 8n; }
  const h = hmacSha1(key, msg); const o = h[h.length - 1] & 15; const n = ((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(n % 10 ** digits).padStart(digits, '0');
}
export const stepOf = (ms, period = 30) => Math.floor(ms / 1000 / period);
/** @returns the matching step number (so the caller can refuse a replay), or null. Accepts the previous and next step for clock drift. */
export function verify(secretB32, code, nowMs, hmacSha1, { window = 1, lastStep = -1 } = {}) {
  const c = String(code || '').replace(/\s/g, ''); if (!/^\d{6}$/.test(c)) return null; const now = stepOf(nowMs); let hit = null;
  for (let d = -window; d <= window; d++) { const st = now + d; const ok = codeAt(secretB32, st, hmacSha1) === c; if (ok && st > lastStep && (hit === null || st > hit)) hit = st; } // no early exit: constant work
  return hit;
}
export const otpauthUri = (secretB32, account, issuer = 'Naija Area') => `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secretB32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
