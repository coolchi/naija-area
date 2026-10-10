// Creates a fresh admin TOTP secret and prints it with the otpauth link for an authenticator app (Google Authenticator, Aegis, 1Password...).
// Put the SECRET into the server's environment as ADMIN_TOTP_SECRET (never in git). Usage: node tools/admin-totp.mjs [account-label]
import crypto from 'node:crypto';
import { newSecret, otpauthUri, codeAt, stepOf } from '../server/lib/totp.js';
const secret = newSecret(crypto.randomBytes(20).toString('hex')); const label = process.argv[2] || 'admin';
const hmac = (k, m) => crypto.createHmac('sha1', Buffer.from(k)).update(Buffer.from(m)).digest();
console.log(`ADMIN_TOTP_SECRET=${secret}\n\nAdd this account to your authenticator app by typing the secret, or open this link on the phone:\n${otpauthUri(secret, label)}\n\nCheck: the app should now show a 6-digit code; right now the code is ${codeAt(secret, stepOf(Date.now()), hmac)} (valid for under 30 s).\nStore the secret in the password manager and the server environment only.`);
