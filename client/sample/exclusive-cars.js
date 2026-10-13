// Exclusive showroom cars. Front is +x, wheels sit on y = 0. Built from many panels so the shape reads up close.
import { Builder } from './builder.js';

const BLACK = 0x121316, GLASS = 0x1a2732, CHROME = 0xd7dbe0, RUBBER = 0x1a1a1c, RED = 0xc62828, AMBER = 0xffb300, LAMP = 0xfff6d2;

function wheelHi(b, r, width, x, y, z, rim) {
  b.cyl(r, r, width, 28, x, y - width / 2, z, RUBBER, { rx: Math.PI / 2, noAO: true, jit: 0 });
  const rw = width * 0.62;
  b.cyl(r * 0.62, r * 0.62, rw, 20, x, y - rw / 2, z, rim, { rx: Math.PI / 2, noAO: true, jit: 0 });
  b.cyl(r * 0.16, r * 0.16, width + 0.05, 12, x, y - (width + 0.05) / 2, z, 0x2a2a2e, { rx: Math.PI / 2, noAO: true, jit: 0 });
}

/** Boxy full-size luxury SUV: flat sides, upright glass, round lamps, spare wheel on the back door. */
export function gwagonGeo(color) {
  const b = new Builder(501, 0.006);
  for (const x of [1.52, -1.45]) for (const z of [0.98, -0.98]) wheelHi(b, 0.48, 0.34, x, 0.48, z, CHROME);
  for (const z of [1.04, -1.04]) b.box(2.7, 0.1, 0.14, 0.05, 0.36, z, BLACK, { jit: 0, noAO: true });
  b.box(4.4, 0.62, 1.9, 0.02, 0.4, 0, color, { jit: 0 });
  b.box(4.2, 0.95, 1.82, -0.02, 1.0, 0, color, { jit: 0 });
  b.box(2.5, 0.08, 1.68, -0.35, 1.94, 0, color, { jit: 0 });
  for (const z of [0.7, -0.7]) b.box(2.2, 0.05, 0.06, -0.3, 2.04, z, BLACK, { jit: 0, noAO: true });
  for (const x of [1.52, -1.45]) for (const z of [1.02, -1.02]) b.box(1.08, 0.38, 0.1, x, 0.46, z, color, { jit: 0 });
  b.box(0.22, 0.38, 2.0, 2.26, 0.34, 0, color, { jit: 0 });
  b.box(0.12, 0.14, 1.55, 2.34, 0.3, 0, BLACK, { jit: 0, noAO: true });
  b.box(0.08, 0.58, 0.92, 2.32, 0.7, 0, BLACK, { jit: 0, noAO: true });
  for (let i = 0; i < 7; i++) b.box(0.035, 0.52, 0.035, 2.36, 0.72, -0.33 + i * 0.11, CHROME, { jit: 0, noAO: true });
  for (const z of [0.72, -0.72]) {
    b.sphere(0.15, 2.28, 0.98, z, 0xf7f4ea, { ws: 18, hs: 14, noAO: true, jit: 0 });
    b.sphere(0.06, 2.4, 0.98, z, LAMP, { ws: 12, hs: 10, noAO: true, jit: 0 });
    b.box(0.05, 0.08, 0.14, 2.36, 0.72, z, AMBER, { jit: 0, noAO: true });
    b.box(0.05, 0.14, 0.32, -2.18, 1.0, z, RED, { jit: 0, noAO: true });
  }
  b.quad([1.52, 1.12, 0.8], [1.52, 1.12, -0.8], [1.12, 1.92, -0.74], [1.12, 1.92, 0.74], GLASS, { noAO: true, jit: 0 });
  b.quad([-2.08, 1.15, -0.78], [-2.08, 1.15, 0.78], [-1.82, 1.9, 0.72], [-1.82, 1.9, -0.72], GLASS, { noAO: true, jit: 0 });
  for (const z of [0.93, -0.93]) {
    const ry = z > 0 ? 0 : Math.PI;
    b.plane(0.78, 0.46, 0.55, 1.52, z, GLASS, { ry, noAO: true, jit: 0 });
    b.plane(0.78, 0.46, -0.5, 1.52, z, GLASS, { ry, noAO: true, jit: 0 });
    b.box(3.5, 0.035, 0.03, -0.1, 1.22, z, CHROME, { jit: 0, noAO: true });
    b.box(3.4, 0.03, 0.025, -0.15, 1.78, z, CHROME, { jit: 0, noAO: true });
    for (const x of [0.12, -0.9]) b.box(0.025, 0.82, 0.025, x, 1.15, z, 0x0c0c0e, { jit: 0, noAO: true });
    b.box(0.16, 0.035, 0.04, 0.42, 1.2, z * 1.02, CHROME, { jit: 0, noAO: true });
    b.box(0.2, 0.08, 0.12, 1.2, 1.5, z * 1.12, color, { jit: 0 });
  }
  b.cyl(0.38, 0.38, 0.16, 24, -2.32, 1.02, 0, RUBBER, { rz: Math.PI / 2, noAO: true, jit: 0 });
  b.cyl(0.18, 0.18, 0.18, 16, -2.34, 1.1, 0, CHROME, { rz: Math.PI / 2, noAO: true, jit: 0 });
  b.box(0.03, 0.14, 0.36, 2.42, 0.42, 0, 0xf4f4f0, { jit: 0, noAO: true });
  b.box(0.03, 0.14, 0.36, -2.16, 0.52, 0, 0xf4f4f0, { jit: 0, noAO: true });
  return b.build();
}

/** Sharp stainless wedge: sloped nose, light bar, flat bed, triangular side glass. */
export function cyberGeo(color) {
  const b = new Builder(701, 0.004);
  const steel = color, shade = 0x9aa1ab;
  for (const x of [1.58, -1.55]) for (const z of [0.98, -0.98]) wheelHi(b, 0.5, 0.36, x, 0.5, z, 0x2a2e33);
  b.box(5.05, 0.5, 2.02, 0.02, 0.38, 0, steel, { jit: 0 });
  b.box(1.85, 0.42, 1.96, -1.4, 0.88, 0, steel, { jit: 0 });
  b.box(1.35, 0.62, 1.9, 0.05, 1.02, 0, steel, { jit: 0 });
  b.box(1.2, 0.07, 1.78, -0.2, 1.64, 0, steel, { jit: 0 });
  // hood, rising from the nose to the glass
  b.quad([2.62, 0.7, 0.98], [2.62, 0.7, -0.98], [1.15, 1.12, -0.94], [1.15, 1.12, 0.94], steel, { noAO: true, jit: 0 });
  b.quad([2.62, 0.48, 0.98], [1.15, 0.9, 0.94], [1.15, 1.12, 0.94], [2.62, 0.7, 0.98], shade, { noAO: true, jit: 0 });
  b.quad([2.62, 0.48, -0.98], [2.62, 0.7, -0.98], [1.15, 1.12, -0.94], [1.15, 0.9, -0.94], shade, { noAO: true, jit: 0 });
  // windscreen
  b.quad([1.12, 1.1, 0.88], [1.12, 1.1, -0.88], [0.42, 1.66, -0.8], [0.42, 1.66, 0.8], GLASS, { noAO: true, jit: 0 });
  // sail from the roof down onto the bed
  b.quad([-0.72, 1.66, 0.86], [-0.72, 1.66, -0.86], [-1.15, 1.28, -0.94], [-1.15, 1.28, 0.94], steel, { noAO: true, jit: 0 });
  for (const z of [0.97, -0.97]) {
    b.quad([0.95, 1.18, z], [0.48, 1.58, z], [-0.55, 1.55, z], [-0.72, 1.16, z], GLASS, { noAO: true, jit: 0 });
    b.box(4.4, 0.035, 0.03, 0.05, 0.95, z, 0x6e757e, { jit: 0, noAO: true });
  }
  b.box(0.05, 0.07, 1.65, 2.52, 0.92, 0, LAMP, { jit: 0, noAO: true });
  b.box(0.05, 0.07, 1.7, -2.52, 0.98, 0, RED, { jit: 0, noAO: true });
  for (const x of [1.58, -1.55]) for (const z of [1.02, -1.02]) b.box(1.2, 0.1, 0.08, x, 0.98, z, steel, { jit: 0, noAO: true });
  b.box(1.5, 0.025, 1.9, -1.45, 1.3, 0, shade, { jit: 0, noAO: true });
  b.box(0.04, 0.12, 0.42, 2.58, 0.48, 0, 0x111111, { jit: 0, noAO: true });
  b.box(0.04, 0.12, 0.42, -2.55, 0.55, 0, 0x111111, { jit: 0, noAO: true });
  // extra panels so the wedge reads up close: creases, cameras, bed ribs, lamp segments
  for (let i = 0; i < 6; i++) b.box(0.7, 0.02, 1.96, 1.9 - i * 0.72, 1.05 + (i < 2 ? 0.02 : 0), 0, i % 2 ? shade : steel, { jit: 0, noAO: true });
  for (const z of [1.0, -1.0]) {
    b.box(0.22, 0.1, 0.16, 0.85, 1.45, z * 1.08, steel, { jit: 0 });
    b.box(0.1, 0.08, 0.1, 0.95, 1.48, z * 1.16, 0x111111, { jit: 0, noAO: true });
    for (const x of [0.35, -0.15, -0.7]) b.box(0.03, 0.55, 0.03, x, 1.2, z, 0x5c636c, { jit: 0, noAO: true });
    b.box(0.9, 0.08, 0.06, 1.58, 0.72, z, 0x3a3e44, { jit: 0, noAO: true });
    b.box(0.9, 0.08, 0.06, -1.55, 0.72, z, 0x3a3e44, { jit: 0, noAO: true });
  }
  for (let i = 0; i < 8; i++) b.box(0.08, 0.06, 0.16, 2.5, 0.9, -0.7 + i * 0.2, LAMP, { jit: 0, noAO: true });
  for (let i = 0; i < 5; i++) b.box(0.35, 0.04, 1.7, -1.15 - i * 0.28, 1.32, 0, shade, { jit: 0, noAO: true });
  b.box(0.9, 0.12, 1.7, 2.15, 0.4, 0, 0x2c3036, { jit: 0, noAO: true });
  b.box(0.7, 0.1, 1.5, -2.2, 0.4, 0, 0x2c3036, { jit: 0, noAO: true });
  for (const z of [0.55, -0.55]) b.sphere(0.08, 2.48, 0.95, z, LAMP, { ws: 16, hs: 12, noAO: true, jit: 0 });
  return b.build();
}
