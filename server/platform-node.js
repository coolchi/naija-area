import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';

export function nodePlatform({ dataDir, secret } = {}) {
  let key = secret || process.env.SESSION_SECRET;
  if (!key && dataDir) {
    const f = path.join(dataDir, 'session.secret'); fs.mkdirSync(dataDir, { recursive: true });
    if (fs.existsSync(f)) key = fs.readFileSync(f, 'utf8').trim(); else { key = crypto.randomBytes(32).toString('hex'); fs.writeFileSync(f, key, { mode: 0o600 }); }
  }
  key = key || crypto.randomBytes(32).toString('hex');
  const cost = Number(process.env.NA_BCRYPT_COST || 10);
  const dummyHash = bcrypt.hashSync('dummy-password-for-timing', cost);
  const hmac = (s) => crypto.createHmac('sha256', key).update(s).digest('base64url');
  return {
    hash: (pw) => bcrypt.hash(pw, cost), verify: (pw, h) => bcrypt.compare(pw, h), dummyHash,
    sha256: (buf) => crypto.createHash('sha256').update(buf).digest('hex'),
    randomHex: (n) => crypto.randomBytes(n).toString('hex'),
    hmac, b64url: (s) => Buffer.from(s).toString('base64url'), fromB64url: (s) => Buffer.from(s, 'base64url').toString(),
    safeEqual: (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); },
    hmacHex: (algo, k, data) => crypto.createHmac(algo, k).update(data).digest('hex'), // for webhook signatures (Monipay: HMAC-SHA512 of the raw body)
    secret: key
  };
}
