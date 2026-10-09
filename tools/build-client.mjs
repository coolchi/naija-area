// Bundles client/src/main.js (+ three.js) into public/game.js (single file, no CDN, CSP-friendly).
import { build } from 'esbuild';
const prod = process.env.NODE_ENV === 'production';
await build({ entryPoints: ['client/src/main.js'], bundle: true, format: 'iife', outfile: 'public/game.js', minify: true, sourcemap: !prod, target: ['es2020'], logLevel: 'info', legalComments: 'none' });
