import * as THREE from 'three';
import * as K from '../client/src/props.js';
const items = [
  ['chair', () => K.chair()], ['stool', () => K.stool()], ['sofa', () => K.sofa(2.2, 0.95)], ['armchair', () => K.armchair()], ['bench', () => K.bench()], ['dining set', () => K.diningSet()],
  ['coffee table', () => K.coffeeTable()], ['table', () => K.table()], ['desk', () => K.desk()], ['bed', () => K.bed(2.0, 2.1)], ['king bed', () => K.bed(2.6, 2.4, { king: true, blanket: 0x7b2cbf })], ['wardrobe', () => K.wardrobe()],
  ['bookshelf', () => K.bookshelf()], ['tv unit', () => K.tvUnit()], ['fridge', () => K.fridge()], ['cooker', () => K.cooker()], ['counter', () => K.counter()], ['water', () => K.waterDispenser()],
  ['generator', () => K.generator()], ['plant', () => K.plant()], ['snake plant', () => K.plant({ kind: 'snake' })], ['floor lamp', () => K.floorLamp()], ['rug', () => K.rug(2.6, 2.0)], ['curtain', () => K.curtain()],
  ['art', () => K.wallArt()], ['flag', () => K.flag()], ['mirror', () => K.mirror(0.8, 1.2, { bulbs: true })], ['louvre', () => K.louvre()], ['speaker', () => K.speaker(1.6)], ['dj booth', () => K.djBooth()],
  ['bar', () => K.barCounter(3)], ['back bar', () => K.backBar(3)], ['bar stool', () => K.barStool()], ['salon chair', () => K.salonChair()], ['wash basin', () => K.washBasin()], ['hair dryer', () => K.hairDryer()],
  ['tool wall', () => K.toolWall()], ['workbench', () => K.workbench()], ['tyres', () => K.tyreStack()], ['oil drum', () => K.oilDrum()], ['tool cart', () => K.toolCart()], ['pillar', () => K.pillar(2)], ['stairs', () => K.stairs()], ['chandelier', () => K.chandelier()],
];
window.render = (from, to) => {
  const r = (window.__r ||= new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true, preserveDrawingBuffer: true })); r.setSize(1280, 720, false); const sc = new THREE.Scene(); sc.background = new THREE.Color(0x3b342b);
  sc.add(new THREE.HemisphereLight(0xffffff, 0x887766, 1.1)); const sun = new THREE.DirectionalLight(0xfff0d0, 1.2); sun.position.set(4, 8, 6); sc.add(sun);
  const sub = items.slice(from, to); const cols = 5; sub.forEach(([n, fn], i) => { const g = fn(); const x = (i % cols) * 4 - (cols - 1) * 2, z = Math.floor(i / cols) * 4 - 4; g.position.set(x, 0, z); sc.add(g); const f = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.05, 3.4), new THREE.MeshLambertMaterial({ color: 0xb59a74 })); f.position.set(x, -0.03, z); sc.add(f); if (n === 'flag' || n === 'art' || n === 'mirror' || n === 'louvre' || n === 'curtain') g.position.y = 0.6; });
  const cam = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 100); cam.position.set(0, 15, 19); cam.lookAt(0, 0.2, 2); r.render(sc, cam); return sub.map(x => x[0]);
};
