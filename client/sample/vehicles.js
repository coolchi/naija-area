// COPIED from ../sample/src/vehicles.js (geometry functions only; traffic/pedestrian logic is rewritten for the live game)
// Procedural vehicle + pedestrian models (all from primitives) and the simple waypoint traffic system.
import * as THREE from 'three';
import { Builder, mulberry32 } from './builder.js';

const BLACK = 0x17181b, GLASS = 0x28343f, YEL = 0xFFC20E;

function wheels(b, xs, zs, r = 0.4, w = 0.3) {
  for (const x of xs) for (const z of zs) { b.wheel(r, w, x, r, z, 0x1a1a1c); b.wheel(r * 0.5, w + 0.04, x, r, z, 0x9aa0a6); }
}
// local frame: front of vehicle = +x, up = +y, wheels sit on y=0
export function danfoGeo(rnd) {
  const b = new Builder(11 + (rnd ? (rnd() * 99) | 0 : 0), 0.02);
  const L = 4.9;
  wheels(b, [1.55, -1.55], [0.98, -0.98], 0.42, 0.32);
  b.box(L, 0.85, 2.0, 0, 0.32, 0, 0xe9a900);                // lower body (slightly deeper yellow)
  b.box(L, 1.2, 1.96, 0, 1.15, 0, YEL);                     // upper body
  b.box(L + 0.02, 0.26, 2.04, 0, 0.98, 0, BLACK);           // the danfo black stripe
  b.box(L - 0.4, 0.1, 1.94, 0, 2.35, 0, 0xd99a00);          // roof
  for (const z of [1, -1]) {                                // side windows
    for (let i = 0; i < 4; i++) b.plane(1.0, 0.62, -1.7 + i * 1.15, 1.72, z * 1.0, GLASS, { ry: z > 0 ? 0 : Math.PI, noAO: true });
    b.box(0.08, 0.5, 0.03, 0.2, 1.45, z * 0.99, 0x222222);   // sliding door seam
  }
  b.quad([2.46, 1.35, 0.9], [2.46, 1.35, -0.9], [2.46, 2.25, -0.8], [2.46, 2.25, 0.8], GLASS, { noAO: true }); // windscreen
  b.quad([-2.46, 1.35, -0.9], [-2.46, 1.35, 0.9], [-2.46, 2.25, 0.8], [-2.46, 2.25, -0.8], GLASS, { noAO: true });
  b.box(0.18, 0.28, 2.1, 2.45, 0.28, 0, 0x222428); b.box(0.18, 0.28, 2.1, -2.45, 0.28, 0, 0x222428); // bumpers
  for (const z of [0.7, -0.7]) { b.box(0.06, 0.2, 0.32, 2.46, 0.78, z, 0xfff4cc, { noAO: true }); b.box(0.06, 0.2, 0.3, -2.46, 0.78, z * 1.1, 0xe53935, { noAO: true }); }
  // roof rack + luggage
  b.box(3.4, 0.05, 1.7, -0.2, 2.46, 0, 0x333333);
  b.box(1.1, 0.5, 0.8, -0.9, 2.5, 0.2, 0x8d6e63); b.box(0.9, 0.4, 0.7, 0.5, 2.5, -0.3, 0x3f6fb5); b.box(0.5, 0.35, 0.5, 1.2, 2.5, 0.35, 0xc62828);
  b.box(0.1, 0.12, 0.9, 2.2, 2.36, 0, 0x111111);            // destination board
  return b.build();
}
export function kekeGeo(c1 = YEL, c2 = 0x17181b) {
  const b = new Builder(21, 0.02);
  b.wheel(0.3, 0.2, 1.2, 0.3, 0, 0x1a1a1c);
  for (const z of [0.68, -0.68]) b.wheel(0.3, 0.22, -0.65, 0.3, z, 0x1a1a1c);
  b.box(2.1, 0.7, 1.2, -0.3, 0.3, 0, c1);
  b.box(0.9, 0.8, 0.62, 1.05, 0.3, 0, c1);                 // nose
  b.quad([1.52, 1.1, 0.3], [1.52, 1.1, -0.3], [1.0, 1.75, -0.3], [1.0, 1.75, 0.3], GLASS, { noAO: true }); // windscreen
  for (const z of [0.58, -0.58]) b.box(0.08, 0.95, 0.08, -0.3 + 0.5, 1.0, z, c2);
  for (const z of [0.58, -0.58]) b.box(0.08, 0.95, 0.08, -1.2, 1.0, z, c2);
  b.box(2.3, 0.1, 1.45, -0.25, 1.95, 0, c2);               // canopy
  b.box(0.7, 0.35, 1.0, -0.8, 0.9, 0, 0x4e342e);           // seat
  b.box(0.06, 0.16, 0.2, 1.52, 0.7, 0, 0xfff4cc, { noAO: true });
  return b.build();
}
export function okadaGeo(rnd) {
  const b = new Builder(31 + ((rnd() * 99) | 0), 0.03);
  b.wheel(0.34, 0.12, 0.7, 0.34, 0, 0x1a1a1c);
  b.wheel(0.34, 0.14, -0.7, 0.34, 0, 0x1a1a1c);
  b.box(1.5, 0.12, 0.14, 0, 0.45, 0, 0x2b2b2b); b.box(0.45, 0.28, 0.3, 0.22, 0.6, 0, [0xc62828, 0x1565c0, 0xFFC20E][(rnd() * 3) | 0]);
  b.box(0.8, 0.1, 0.3, -0.3, 0.68, 0, 0x222222); b.box(0.08, 0.5, 0.08, 0.6, 0.5, 0, 0x888888); b.box(0.1, 0.07, 0.7, 0.62, 1.0, 0, 0x222222);
  const jersey = [0x008751, 0xFFC20E, 0xe65100, 0x1565c0, 0xffffff, 0x6a1b9a][(rnd() * 6) | 0];
  b.capsule(0.17, 0.35, -0.2, 0.78, 0, jersey, { rz: -0.25 }); b.sphere(0.15, -0.07, 1.62, 0, 0xc68642, { noAO: true });
  b.sphere(0.17, -0.07, 1.68, 0, [0x111111, 0xFFC20E, 0xc62828][(rnd() * 3) | 0], { sy: 0.85, noAO: true });
  b.box(0.45, 0.14, 0.24, 0.08, 0.8, 0, 0x37474f);
  if (rnd() > 0.45) { b.capsule(0.17, 0.32, -0.65, 0.75, 0, [0xe91e63, 0x3f51b5, 0x009688][(rnd() * 3) | 0], { rz: 0.1 }); b.sphere(0.14, -0.62, 1.55, 0, 0x8d5524, { noAO: true }); }
  return b.build();
}
export function carGeo(kind, color) {
  const b = new Builder(41 + (color & 255), 0.02);
  const suv = kind === 'suv', hatch = kind === 'hatch';
  const L = suv ? 4.6 : hatch ? 3.8 : 4.5, H = suv ? 0.95 : 0.7;
  wheels(b, [L * 0.32, -L * 0.32], [0.82, -0.82], suv ? 0.45 : 0.37, 0.26);
  b.box(L, H, 1.84, 0, 0.3, 0, color);
  const cl = suv ? L * 0.68 : hatch ? L * 0.62 : L * 0.5, cx = suv ? -0.2 : hatch ? -0.25 : -0.3, ch = suv ? 0.8 : 0.62;
  b.box(cl, ch, 1.66, cx, 0.3 + H, 0, color);
  for (const z of [0.84, -0.84]) {
    b.plane(cl * 0.46, ch * 0.7, cx + cl * 0.22, 0.3 + H + ch * 0.5, z, GLASS, { ry: z > 0 ? 0 : Math.PI, noAO: true });
    b.plane(cl * 0.4, ch * 0.7, cx - cl * 0.24, 0.3 + H + ch * 0.5, z, GLASS, { ry: z > 0 ? 0 : Math.PI, noAO: true });
  }
  b.quad([cx + cl / 2 + 0.01, 0.3 + H + 0.05, 0.75], [cx + cl / 2 + 0.01, 0.3 + H + 0.05, -0.75], [cx + cl / 2 - 0.35, 0.3 + H + ch - 0.05, -0.72], [cx + cl / 2 - 0.35, 0.3 + H + ch - 0.05, 0.72], GLASS, { noAO: true });
  b.quad([cx - cl / 2 - 0.01, 0.3 + H + 0.05, -0.75], [cx - cl / 2 - 0.01, 0.3 + H + 0.05, 0.75], [cx - cl / 2 + 0.3, 0.3 + H + ch - 0.05, 0.72], [cx - cl / 2 + 0.3, 0.3 + H + ch - 0.05, -0.72], GLASS, { noAO: true });
  b.box(0.15, 0.25, 1.86, L / 2, 0.22, 0, 0x2b2b2b); b.box(0.15, 0.25, 1.86, -L / 2, 0.22, 0, 0x2b2b2b);
  // polish: wheel arches, side skirts, mirrors, grille and number plates (about ten small boxes)
  for (const wx of [L * 0.32, -L * 0.32]) for (const z of [0.93, -0.93]) b.box(0.95, 0.5, 0.04, wx, 0.28, z, 0x1b1b1f, { noAO: true, jit: 0 });
  for (const z of [0.93, -0.93]) b.box(L * 0.55, 0.1, 0.05, 0, 0.3, z, 0x24242a, { noAO: true, jit: 0 });
  for (const z of [0.96, -0.96]) b.box(0.12, 0.12, 0.18, cx + cl / 2 - 0.15, 0.3 + H + 0.12, z, color, { jit: 0 });
  b.box(0.04, 0.18, 0.9, L / 2 + 0.07, 0.48, 0, 0x16161a, { noAO: true, jit: 0 }); b.box(0.04, 0.12, 0.42, L / 2 + 0.09, 0.28, 0, 0xf2f2ee, { noAO: true, jit: 0 }); b.box(0.04, 0.12, 0.42, -L / 2 - 0.09, 0.28, 0, 0xf2f2ee, { noAO: true, jit: 0 });
  for (const z of [0.65, -0.65]) { b.box(0.05, 0.16, 0.36, L / 2 + 0.02, 0.7, z, 0xfff4cc, { noAO: true }); b.box(0.05, 0.16, 0.34, -L / 2 - 0.02, 0.7, z, 0xe53935, { noAO: true }); }
  return b.build();
}

