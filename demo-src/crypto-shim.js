// Browser stand-in for node:crypto, only what the server core needs (crash rolls): sha256 digest + random bytes.
import { sha256hex } from './sha.js';
export const createHash = () => { let data = ''; const o = { update(s) { data += s; return o; }, digest() { const hex = sha256hex(new TextEncoder().encode(data)); const b = Uint8Array.from(hex.match(/../g).map(h => parseInt(h, 16))); const buf = b; buf.readUIntBE = (off, n) => { let v = 0; for (let i = 0; i < n; i++) v = v * 256 + b[off + i]; return v; }; return buf; } }; return o; };
export const randomBytes = (n) => { const b = crypto.getRandomValues(new Uint8Array(n)); b.toString = (enc) => [...b].map(x => x.toString(16).padStart(2, '0')).join(''); return b; };
