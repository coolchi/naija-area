import * as THREE from 'three';
import { makeAvatar } from '../client/src/entities.js';
import { danfoGeo, kekeGeo, okadaGeo, carGeo } from '../client/sample/vehicles.js';
import { mulberry32 } from '../client/sample/builder.js';
const vc = new THREE.MeshLambertMaterial({ vertexColors: true });
const car = (geo) => { const g = new THREE.Group(); const m = new THREE.Mesh(geo, vc); m.position.y = 0.12; g.add(m); return g; };
const items = [
  ['avatar green', () => makeAvatar('#2e9b5e')], ['avatar red', () => makeAvatar('#d62828')], ['avatar blue', () => makeAvatar('#1e88e5')], ['avatar purple', () => makeAvatar('#8e24aa')],
  ['sedan', () => car(carGeo('sedan', 0xb71c1c))], ['suv', () => car(carGeo('suv', 0x1e4f8c))], ['hatch', () => car(carGeo('hatch', 0xf5f5f5))], ['danfo', () => car(danfoGeo(mulberry32(3)))], ['keke', () => car(kekeGeo(0xFFC20E, 0x17181b))], ['okada', () => car(okadaGeo(mulberry32(5)))],
];
window.render = (view) => {
  const r = (window.__r ||= new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true, preserveDrawingBuffer: true })); r.setSize(1280, 720, false); const sc = new THREE.Scene(); sc.background = new THREE.Color(0x9fd0f0);
  sc.add(new THREE.HemisphereLight(0xffffff, 0x887766, 1.1)); const sun = new THREE.DirectionalLight(0xfff0d0, 1.2); sun.position.set(4, 8, 6); sc.add(sun);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshLambertMaterial({ color: 0x777b73 })); floor.rotation.x = -Math.PI / 2; sc.add(floor);
  const sub = view === 'people' ? items.slice(0, 4) : items.slice(4); const gap = view === 'people' ? 3 : 7.5; sub.forEach(([n, fn], i) => { const g = fn(); g.position.set((i % 3) * gap - (Math.min(3, sub.length) - 1) * gap / 2, 0, Math.floor(i / 3) * gap * 0.9); g.rotation.y = view === 'people' ? -0.6 : 0.6; sc.add(g); });
  const cam = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 200); if (view === 'people') { cam.position.set(0, 3.2, 11); cam.lookAt(0, 1.3, 0); } else { cam.position.set(2, 11, 24); cam.lookAt(0, 0.6, 3); } r.render(sc, cam); return sub.map(x => x[0]);
};
