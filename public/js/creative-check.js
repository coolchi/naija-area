// Client-side checks for the advertiser's image, shown BEFORE the upload so mistakes are caught early with clear words.
// The SERVER stays the authority (server/core/ads.js: file contents, size, dimensions, and the shape at submit time); these mirror it. Pure functions: tested in tests/ad-creative-ui.test.js.
export const TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const ASPECT_TOL = 0.2; // same 20% the server allows (ads.js BAD_ASPECT)
export const parseSize = (str) => { const m = /(\d+)\s*x\s*(\d+)/i.exec(String(str || '')); return m ? { w: +m[1], h: +m[2] } : null; };
export const fmtBytes = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + ' MB' : Math.max(1, Math.round(n / 1000)) + ' KB');
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
/** "2:1", "1:1", or "1.78:1" for odd shapes */
export function ratioText(w, h) { if (!w || !h) return '?'; const g = gcd(w, h), a = w / g, b = h / g; return a <= 32 && b <= 32 ? `${a}:${b}` : `${(w / h).toFixed(2)}:1`; }
/** type and size, before the picture is even decoded. -> { ok, message } */
export function checkFile(file, limits) {
  if (!file) return { ok: false, message: 'No file chosen.' };
  if (!TYPES.includes(file.type)) return { ok: false, message: `This file is ${file.type ? file.type.replace('image/', '').toUpperCase() : 'an unknown type'}. Use a PNG, JPEG or WebP image.` };
  if (file.size > limits.maxBytes) return { ok: false, message: `This file is ${fmtBytes(file.size)} but the limit is ${fmtBytes(limits.maxBytes)}. Export it smaller (JPEG or WebP are lighter) or reduce the dimensions.` };
  return { ok: true, message: '' };
}
/** once the picture is decoded: the size limits (blocking) and the shape for the chosen surface (a strong warning: the server decides at submit). -> { blocking, errors[], warnings[], notes[], shapeOk } */
export function checkDims(w, h, spec, limits) {
  const out = { blocking: false, errors: [], warnings: [], notes: [], shapeOk: true }; const want = parseSize(spec?.size);
  if (!w || !h) { out.blocking = true; out.errors.push('This picture could not be read. It may be damaged or not a real image.'); return out; }
  if (w < limits.minPx || h < limits.minPx || w > limits.maxPx || h > limits.maxPx) { out.blocking = true; out.errors.push(`Each side must be between ${limits.minPx} and ${limits.maxPx} px. Yours is ${w}x${h}.`); return out; }
  if (spec?.aspect) {
    const ar = w / h; const off = Math.abs(ar - spec.aspect) / spec.aspect > ASPECT_TOL;
    if (off) { out.shapeOk = false; out.warnings.push(`Wrong shape for this surface: yours is ${w}x${h} (${ratioText(w, h)}) but it needs about ${want ? `${want.w}x${want.h}` : spec.size} (${want ? ratioText(want.w, want.h) : spec.aspect + ':1'}). It will be refused when you submit. Crop or re-export it.`); }
    else if (want && (w !== want.w || h !== want.h)) out.notes.push(`Best at exactly ${want.w}x${want.h}. Yours is ${w}x${h}, so it will be stretched slightly to fit.`);
  }
  return out;
}
