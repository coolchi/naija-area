// Response compression without a new dependency (node:zlib). The game bundle is about 980 KB raw and about 300 KB gzipped, so on mobile data this is the single biggest
// loading win. Static files are compressed once and kept in memory (keyed by file time); JSON replies over a size threshold are gzipped on the fly.
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib';

export const COMPRESS = { minJsonBytes: 1024, brotliQuality: 5, gzipLevel: 6, staticExt: new Set(['.js', '.css', '.html', '.json', '.svg', '.txt']), maxCacheEntries: 64 }; // brotli 5 is a speed/size compromise (ESTIMATE)
/** best encoding the client accepts: 'br', 'gzip' or null */
export function pickEncoding(header = '') {
  const h = String(header).toLowerCase(); const q = (name) => { const m = new RegExp(`(?:^|[,\\s])${name}(?:;\\s*q=([0-9.]+))?(?:,|$)`).exec(h); return m ? (m[1] === undefined ? 1 : parseFloat(m[1])) : 0; };
  const br = q('br'), gz = Math.max(q('gzip'), q('x-gzip')); if (br > 0 && br >= gz) return 'br'; if (gz > 0) return 'gzip'; return null;
}
export const encode = (buf, enc) => enc === 'br' ? zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: COMPRESS.brotliQuality, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length } }) : zlib.gzipSync(buf, { level: COMPRESS.gzipLevel });
const MIME = { '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8' };

export function staticCompress(dir, { maxAge = 300 } = {}) {
  const cache = new Map(); const root = path.resolve(dir);
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next(); const enc = pickEncoding(req.headers['accept-encoding']); if (!enc) return next();
    let p; try { p = decodeURIComponent(req.path); } catch { return next(); } if (p.endsWith('/')) p += 'index.html'; let ext = path.extname(p); if (!ext) { p += '.html'; ext = '.html'; }
    if (!COMPRESS.staticExt.has(ext)) return next(); const file = path.resolve(root, '.' + p); if (!file.startsWith(root + path.sep)) return next();
    let st; try { st = fs.statSync(file); if (!st.isFile()) return next(); } catch { return next(); }
    const key = `${file}:${st.mtimeMs}:${st.size}:${enc}`; let body = cache.get(key);
    if (!body) { try { body = encode(fs.readFileSync(file), enc); } catch { return next(); } if (cache.size >= COMPRESS.maxCacheEntries) cache.delete(cache.keys().next().value); cache.set(key, body); }
    const etag = `W/"${st.size.toString(16)}-${Math.floor(st.mtimeMs).toString(16)}-${enc}"`; res.setHeader('ETag', etag); res.setHeader('Vary', 'Accept-Encoding'); if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', `public, max-age=${maxAge}`); // keep a stricter header set earlier (admin pages are no-store)
    if (req.headers['if-none-match'] === etag) { res.statusCode = 304; return res.end(); }
    res.setHeader('Content-Encoding', enc); res.setHeader('Content-Type', MIME[ext]); res.setHeader('Content-Length', body.length); res.statusCode = 200; if (req.method === 'HEAD') return res.end(); res.end(body);
  };
}
/** send JSON, gzipped when it is big enough and the client accepts it */
export function sendJson(req, res, status, obj) {
  const raw = Buffer.from(JSON.stringify(obj)); res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Vary', 'Accept-Encoding');
  const enc = raw.length >= COMPRESS.minJsonBytes ? pickEncoding(req.headers['accept-encoding']) : null; if (enc) { const b = encode(raw, enc); res.setHeader('Content-Encoding', enc); res.setHeader('Content-Length', b.length); return res.end(b); }
  res.setHeader('Content-Length', raw.length); res.end(raw);
}
