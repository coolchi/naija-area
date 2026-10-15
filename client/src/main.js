import { PHYS, applyServerLimits } from './physics-config.js';
import { gate as ageGate } from './age-ui.js';
import * as THREE from 'three';
import { get, post, $, $$, h, ApiError } from './api.js';
import { buildWorld } from './world.js';
import { Controller } from './player.js';
import { Nav } from './nav.js';
import { ParkingClient } from './parking-client.js';
import { OwnCar } from './own-car.js';
import { BusStops } from './bus-client.js';
import { RideClient } from './ride-client.js';
import { Tour } from './tour.js';
import { setupFlow } from './setup-ui.js';
import { TutorialCard } from './tutorial-ui.js';
import * as Q from './quality.js';
import { GameAudio } from './audio.js';
import { readyCount } from './missions-ui.js';
import { GuardianWatch, showBreak } from './guardian-ui.js';
import { EmoteSystem, emoteSheet } from './emotes.js';
import { PhotoMode } from './photo.js';
import { AirportClient } from './airport-client.js';
import { LinkClient } from './link-client.js';
import { BoatClient } from './boat-client.js';
import { RadioClient } from './radio-client.js';
import { CarpoolClient } from './carpool-client.js';
import { TowClient } from './tow-client.js';
import { CarSmoke } from './car-smoke.js';
import { RadioSpots } from './radio-spot.js';
import { lampsOn } from './lamps.js';
import { Weather } from './weather.js';
import { propIndex } from './solids.js';
import { Pushables } from './pushables.js';
import { ThrowClient } from './throw-client.js';
import { findRoute } from './route.js';
import { poseOnRoute } from './ride.js';
import { PHYSX } from '../../server/config/physx.js';
import { pushSpots } from '../../server/core/physx.js';
import { setPlayerHeadlamps } from './headlamps.js';
import { CrashClient } from './crash.js';
import { FaintSys } from './faint.js';
import { Traffic, Walkers, Ghosts, makeNameSprite, makePlayerCar, blobShadow } from './entities.js';
import { policeRig } from '../sample/police-rig.js';
import { applyWear, indexCatalogue } from './wear-models.js';
import { AdsClient } from './ads-client.js';
import { UI, say } from './ui.js';
import { Net } from './net.js';
import { Interior } from './interior.js';
import { Venue } from './venue.js';
import { GarageView } from './garage-view.js';
import { roadAt } from './roadgeom.js';
import { PhoneSys } from './phone-v2/phone2.js';
import { BodyguardClient } from './bodyguard-client.js';
import { glowTexture } from './textures.js';

const TIPS = ['Tap any building or sign to see it on the map and travel there.', 'Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.', 'Knock at a house when its owner is home. They can let you in.', 'Land plots grow in value, but omo-onile may come for a levy.', 'Delivery costs more but works from anywhere.', 'Walk up to your own car and tap it to get in. Press T to chat.'];
/** Firefox on some Macs rejects powerPreference:"high-performance"; fall back so boot does not die with the generic WebGL tip. */
function makeGameRenderer(canvas, antialias) {
  const tries = [
    { antialias, powerPreference: 'high-performance' },
    { antialias, powerPreference: 'default' },
    { antialias: false, powerPreference: 'default' },
    { antialias: false },
  ];
  let last;
  for (const attrs of tries) {
    try { return new THREE.WebGLRenderer({ canvas, ...attrs }); }
    catch (e) { last = e; }
  }
  throw last || new Error('Could not create a WebGL context.');
}
const MOTOKA_W = 1440, MOTOKA_H = 400, MOTOKA_ASPECT = MOTOKA_W / MOTOKA_H;
const MOTOKA_MARK = "M13.8111 30.5819C21.4388 30.5819 27.6222 24.4721 27.6222 16.9352C27.6222 9.39835 21.4388 3.28851 13.8111 3.28851C6.18345 3.28851 0 9.39835 0 16.9352C0 24.4721 6.18345 30.5819 13.8111 30.5819ZM8.65245 6.87979C11.8428 5.18238 15.6827 5.18238 18.873 6.87979C21.4256 8.23788 23.4013 10.4546 24.442 13.1283L24.6178 13.5799C25.2951 15.32 23.6179 17.0543 21.8279 16.4647L16.8503 14.8253C14.8461 14.1652 12.6793 14.1652 10.6752 14.8253L5.6976 16.4647C3.90755 17.0543 2.23036 15.32 2.90771 13.5799L3.0835 13.1283C4.12421 10.4546 6.09989 8.23788 8.65245 6.87979ZM6.40542 20.6317H8.04084C9.96929 20.6317 11.6073 22.0263 11.8923 23.9109L12.1152 25.385C12.3235 26.7621 10.8961 27.8139 9.61966 27.224C7.80262 26.3842 6.20197 25.0972 4.98958 23.5181C4.08861 22.3446 4.91468 20.6317 6.40542 20.6317ZM20.2224 20.6317H21.5088C23.0286 20.6317 23.8922 22.3501 22.9736 23.5465L22.8445 23.7147C21.7183 25.1815 20.2611 26.3683 18.5888 27.1805C17.3512 27.7815 15.9397 26.7622 16.1435 25.4146L16.3709 23.9109C16.6559 22.0263 18.2939 20.6317 20.2224 20.6317Z";
function motokaMark(g, x, y, size) {
  const vbH = 30.9111, vbW = 27.6222, s = size / vbH;
  g.save();
  g.translate(x + (size - vbW * s) / 2, y);
  g.scale(s, s);
  g.fillStyle = '#2389E3';
  g.fill(new Path2D(MOTOKA_MARK), 'evenodd');
  const card = g.createLinearGradient(0, 0, 0, 18.086);
  card.addColorStop(0, '#D9D9D9'); card.addColorStop(1, '#A3B0D4');
  g.fillStyle = card;
  g.beginPath(); g.roundRect(3.617, 0, 20.388, 18.086, 1.026); g.fill();
  g.strokeStyle = '#05243F'; g.lineWidth = 1.45; g.lineCap = 'round';
  g.beginPath();
  g.moveTo(7.56, 4.54); g.lineTo(20.39, 4.54);
  g.moveTo(7.56, 7.83); g.lineTo(20.39, 7.83);
  g.moveTo(7.56, 11.12); g.lineTo(20.39, 11.12);
  g.stroke();
  g.restore();
}
function motokaBoard() {
  const c = document.createElement('canvas'); c.width = MOTOKA_W; c.height = MOTOKA_H; const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, MOTOKA_W, MOTOKA_H);
  g.fillStyle = '#2389E3'; g.fillRect(0, 0, 22, MOTOKA_H); g.fillRect(0, 312, MOTOKA_W, MOTOKA_H - 312);
  motokaMark(g, 48, 28, 270);
  g.fillStyle = '#05243F'; g.font = '800 92px Nunito, system-ui, sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle';
  g.fillText('Motoka', 380, 128);
  g.fillStyle = '#21B993'; g.font = '700 40px Nunito, system-ui, sans-serif';
  g.fillText('AutoMart Showroom', 384, 210);
  g.fillStyle = '#ffffff'; g.font = '700 34px Nunito, system-ui, sans-serif'; g.textAlign = 'center';
  g.fillText('LICENCE    ·    INSURANCE    ·    ROADWORTHINESS', MOTOKA_W / 2, 356);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function motokaPad() {
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.clearRect(0, 0, 256, 256);
  g.fillStyle = '#f7fbff'; g.beginPath(); g.arc(128, 128, 120, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#2389E3'; g.lineWidth = 16; g.beginPath(); g.arc(128, 128, 108, 0, Math.PI * 2); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

class Game {
  constructor() {
    this.playing = false; this.busy = false; this.user = null; this.clockOffset = 0; this.cfg = {}; this.lastKnocks = null; this.waypoint = null; this.commute = null; this.worldTime = null; this.plots = []; this.props = []; this.shops = []; this.fpsAcc = 0; this.activity = '';
  }
  /** people that ambient traffic yields to: the player and other players' ghosts (client-side only; never touches the server) */
  yieldTargets() {
    const out = []; if (this.ctrl && !this.busy) out.push({ x: this.ctrl.x, z: this.ctrl.z, r: this.ctrl.mode === 'drive' ? 1.8 : 0.6, local: true });
    if (this.ghosts) for (const g of this.ghosts.map.values()) if (g.root) out.push({ x: g.root.position.x, z: g.root.position.z, r: 0.6 }); return out;
  }
  horn(c, car) {
    const now = performance.now(); if (now - (this.lastHorn || 0) < 3000 || !this.ctrl || Math.hypot(car.x - this.ctrl.x, car.z - this.ctrl.z) > 30) return; this.lastHorn = now;
    if (this.audio?.running) { this.audio.play('horn', 0.35 * (1 - Math.hypot(car.x - this.ctrl.x, car.z - this.ctrl.z) / 34)); return; }
    try { const A = (this.hornCtx ||= new (window.AudioContext || window.webkitAudioContext)()); const o = A.createOscillator(), gn = A.createGain(); o.type = 'square'; o.frequency.value = c.type === 'danfo' ? 330 : 440; gn.gain.value = 0.015; o.connect(gn).connect(A.destination); o.start(); o.stop(A.currentTime + 0.18); } catch {}
  }
  serverNow() { return Date.now() + this.clockOffset; }
  clockSync(serverMs, rtt) { const est = serverMs + rtt / 2 - Date.now(); this.clockOffset = this.clockOffset ? this.clockOffset * 0.7 + est * 0.3 : est; }
  pos() { return { x: this.ctrl.x, z: this.ctrl.z, ry: this.ctrl.ry }; }
  progress(p, tip) { $('#loadBar').style.width = p + '%'; if (tip) $('#loadTip').textContent = tip; }

  async boot() {
    try {
      this.progress(8, 'Reaching the server…'); const [cfg, city] = await Promise.all([get('/api/config'), get('/api/city')]); this.cfg = cfg; this.city = city; get('/api/wearables/catalogue').then(c => { this.wearCat = indexCatalogue(c); if (this.ghosts) this.ghosts.cat = this.wearCat; this.syncWear(this.user?.wear); }).catch(() => {}); const legacy = (x, z) => (z > 125 ? 'Lagoon Front' : x < 0 && z < 0 ? 'Yaba' : x >= 0 && z < 0 ? 'Ikeja' : x < 0 ? 'Surulere' : 'Lekki Phase 1'); city.area = (x, z) => city.districts?.find(d => x >= d.x0 && x < d.x1 && z >= d.z0 && z < d.z1)?.name || (city.id === 'lagos-mainland' ? legacy(x, z) : city.cityName); $('#tagline').textContent = cfg.tagline || ''; document.title = cfg.name;
      this.progress(30, 'Building the district…'); await new Promise(r => setTimeout(r, 30));
      this.qualityChoice = Q.readChoice(localStorage); this.governor = new Q.Governor(); const q0 = Q.profileFor(Q.resolve(this.qualityChoice, Q.readEnv()));
      const canvas = $('#game'); if (canvas && (!canvas.width || !canvas.height)) { canvas.width = Math.max(1, innerWidth|0); canvas.height = Math.max(1, innerHeight|0); }
      this.renderer = makeGameRenderer(canvas, !!(q0.antialias && devicePixelRatio < 2)); this.renderer.setPixelRatio(Math.min(devicePixelRatio, q0.pixelRatio));
      this.camera = new THREE.PerspectiveCamera(58, 1, 0.5, 900); this.camera.position.set(0, 14, 20);
      this.world = buildWorld(city); this.scene = this.world.scene; this.decorate(); this.weather = new Weather(this.scene, this.world);
      this.progress(60, 'Putting traffic on the road…'); await new Promise(r => setTimeout(r, 30));
      this.traffic = new Traffic(this.scene, city.trafficLoops, city.busStops || [], city.roundabouts || []); this.traffic.onHorn = (c, car) => this.horn(c, car); this.walkers = new Walkers(this.scene, city.zones, q0.walkers); this.ghosts = new Ghosts(this.scene); this.ghosts.cat = this.wearCat; this.ghosts.skinLook = (sk, want) => this.skinLookOf(want === 'car' ? sk?.c : sk?.a); this.bodyguard = new BodyguardClient(this);
      this.audio = new GameAudio({ isLowEnd: () => this.qualityLevel === 'low', radioPlaying: () => !!this.radio?.state?.playing, night: () => lampsOn(this.world.night) > 0.5 }); const unlock = () => this.audio.unlock(); addEventListener('pointerdown', unlock, true); addEventListener('keydown', unlock, true); document.addEventListener('visibilitychange', () => this.audio.visibility(document.hidden)); document.addEventListener('click', (e) => { if (e.target.closest?.('button, .btn, .round')) this.audio.play('click'); }, true);
      this.ads = new AdsClient(this.world, city, () => this.serverNow()); this.ui = new UI(this); this.guardian = new GuardianWatch(this); window.addEventListener('na-break', (ev) => showBreak(this, ev.detail)); if (this.audio.set.on === false) { $('#muteBtn').textContent = '🔇'; this.ui.sfxOn = false; } this.net = new Net(this); this.interior = new Interior(this); this.venue = new Venue(this); this.garage = new GarageView(this);
      this.ctrl = new Controller($('#game'), city, this.world.colliders, '#00a859', 'You'); this.scene.add(this.ctrl.root); this.setupPhysx(city); applyServerLimits(this.cfg.movement); this.ctrl.hazardAt = (x, z) => this.world.hazardAt?.(x, z) || null; this.ctrl.onStep = (k) => this.ui.sfx('step', PHYS.audio.footstepVol * (0.6 + 0.4 * k)); this.ctrl.onBump = (imp) => { this.ui.sfx('thud', PHYS.audio.thudVol * Math.min(1.4, 0.4 + imp / 12)); this.reportCollide?.(imp); }; this.ctrl.obstacles = (x, z, r) => this.traffic.obstaclesNear(x, z, r); this.nav = new Nav(this); this.parking = new ParkingClient(this); this.ownCar = new OwnCar(this); this.ctrl.ownSolid = () => this.ownCar.circles(); this.bus = new BusStops(this); this.rideSvc = new RideClient(this); this.links = new LinkClient(this); this.boats = new BoatClient(this); this.radio = new RadioClient(this); this.carpool = new CarpoolClient(this); this.tow = new TowClient(this); this.radioSpots = new RadioSpots(this); this.air = new AirportClient(this); this.crash = new CrashClient(this); this.faint = new FaintSys(this); this.traffic.crash = this.crash; this.emotes = new EmoteSystem(this); this.photo = new PhotoMode(this); this.ghosts.emotes = this.emotes.view; $('#emoteBtn').onclick = () => emoteSheet(this); $('#photoBtn').onclick = () => this.photo.open();
      addEventListener('resize', () => this.resize()); this.resize(); Q.apply(this, Q.resolve(this.qualityChoice, Q.readEnv())); this.bindAuth(); this.progress(85, TIPS[Math.floor(Math.random() * TIPS.length)]);
      const me = await get('/api/me').catch(() => null); this.progress(100, 'Ready!');
      // Place the player (and restore drive mode) before the first frame so reload does not flash a walk spawn.
      if (me) await this.enter(me.user); else $('#auth').classList.remove('hidden');
      $('#loading').classList.add('hidden'); this.loop(performance.now());
      addEventListener('pagehide', () => this.flushPresence?.());
      addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') this.flushPresence?.(); });
    } catch (e) {
      console.error(e);
      const tip = e instanceof ApiError ? e.message
        : (e && e.message) ? String(e.message).slice(0, 180)
        : 'Could not start the game. Is WebGL enabled? Refresh to retry.';
      $('#loadTip').textContent = tip;
      $('#loadBar').style.background = '#d6402f';
    }
  }
  // ---- extra scene dressing: land plots + "for sale" flags + market stall
  decorate() {
    const sc = this.scene; this.plotMeshes = {}; const glow = glowTexture();
    for (const p of this.city.plots || []) {
      const g = new THREE.Group(); const sq = new THREE.Mesh(new THREE.PlaneGeometry(p.size, p.size).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xe9e2c8, transparent: true, opacity: 0.9 })); sq.position.set(p.x, 0.12, p.z); g.add(sq);
      const border = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(p.size, 0.2, p.size)), new THREE.LineBasicMaterial({ color: 0xffc20e })); border.position.set(p.x, 0.2, p.z); g.add(border);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4), new THREE.MeshLambertMaterial({ color: 0x6b5f4a })); pole.position.set(p.x, 2, p.z + p.size / 2 - 1); g.add(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshBasicMaterial({ color: 0x35c46b, side: THREE.DoubleSide })); flag.position.set(p.x + 1.3, 3.2, p.z + p.size / 2 - 1); g.add(flag); this.plotMeshes[p.id] = { sq, flag }; sc.add(g);
    }
    const m = this.city.shops.find(s => s.id === 'shop_market'); if (m) { const awn = new THREE.Mesh(new THREE.BoxGeometry(7, 0.25, 4), new THREE.MeshLambertMaterial({ color: 0xd64a2f })); awn.position.set(m.x, 3, m.z); const tb = new THREE.Mesh(new THREE.BoxGeometry(6, 1.1, 2), new THREE.MeshLambertMaterial({ color: 0x8b6b3d })); tb.position.set(m.x, 0.55, m.z + 0.5); const crates = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 1.2), new THREE.MeshLambertMaterial({ color: 0xe7b84a })); crates.position.set(m.x, 1.25, m.z + 0.5); sc.add(awn, tb, crates); for (const dx of [-3.2, 3.2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), new THREE.MeshLambertMaterial({ color: 0x555555 })); p.position.set(m.x + dx, 1.5, m.z - 1.5); sc.add(p); } }
    for (const v of this.city.venues || []) {
      // Facade-signed shops already show their name on the wall — skip the floating billboard so other venues do not poke through (e.g. Compound Yard over Iron Gate Armoury).
      const bld = v.buildingId && (this.city.buildings || []).find(b => b.id === v.buildingId);
      if (!bld?.label) {
        const sp = makeNameSprite(v.name, v.sign || '#333', { depthTest: true }); sp.scale.set(8, 2, 1); sp.position.set(v.x, 8.5, v.z); sc.add(sp);
      }
      const mk = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.9, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: v.id === 'venue_motors' ? 0x2389e3 : v.id === 'venue_armoury' ? 0xc0392b : 0xffc20e, side: THREE.DoubleSide })); mk.position.set(v.x, 0.15, v.z); sc.add(mk);
    }
    this.showroomYard();
    this.policePark();
    this.dest = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.7, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xb44cff, side: THREE.DoubleSide })); this.dest.visible = false; sc.add(this.dest);
  }

  /** Park NPF chargers on the open apron south of the Nigeria Police Station (clear of the building). */
  policePark() {
    const bld = (this.city.buildings || []).find(x => x.id === 'b_police');
    if (!bld) return;
    this.propCars = this.propCars || [];
    // South of the front face, either side of the entrance marker — not through the west wall.
    const apronZ = bld.z - bld.d / 2 - 4.2;
    const spots = [
      { x: bld.x - 10, z: apronZ },
      { x: bld.x - 5.5, z: apronZ },
      { x: bld.x + 5.5, z: apronZ },
      { x: bld.x + 10, z: apronZ },
    ];
    for (const s of spots) {
      const g = new THREE.Group();
      const car = policeRig();
      car.position.y = 0.12;
      // Nose toward the station (north). Model front = +x → yaw −π/2.
      car.rotation.y = -Math.PI / 2;
      g.add(car);
      g.add(blobShadow(6.2, 2.8));
      const tag = makeNameSprite('NPF', '#006b36');
      tag.scale.set(1.8, 0.45, 1);
      tag.position.set(0, 2.35, 0);
      g.add(tag);
      g.position.set(s.x, 0, s.z);
      g.userData.propCar = true;
      this.scene.add(g);
      this.propCars.push(g);
    }
  }

  /** Motoka AutoMart. The board keeps the artwork's own shape. The roof sign stands on the front of the roof. Road signs sit by Lagoon Drive, held at the edges so the pole does not cut the design. Display cars come from /api/motoka/stock so every parked unit is buyable and supercars respect the daily pool. */
  showroomYard() {
    const v = (this.city.venues || []).find(x => x.id === 'venue_motors'); if (!v) return;
    const bld = (this.city.buildings || []).find(x => x.id === v.buildingId);
    const bx = bld?.x ?? v.x, bz = bld?.z ?? v.z + 7, bw = bld?.w ?? 10, bd = bld?.d ?? 8, bh = bld?.h ?? 4;
    const dx = v.x - bx, dz = v.z - bz, len = Math.hypot(dx, dz) || 1, fx = dx / len, fz = dz / len;
    const yaw = Math.atan2(fx, fz), rx = -fz, rz = fx;
    const tex = motokaBoard();
    const faceMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    const navy = new THREE.MeshLambertMaterial({ color: 0x05243f });
    const signGroup = (w) => {
      const h = w / MOTOKA_ASPECT, g = new THREE.Group();
      const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h), faceMat); face.position.y = h / 2; g.add(face);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, h + 0.16, 0.08), navy); frame.position.set(0, h / 2, -0.07); g.add(frame);
      return { g, h, w };
    };
    const RW = Math.min(bw - 1.4, 12);
    const roof = signGroup(RW);
    const roofTop = bh + 0.34;
    for (const s of [-1, 1]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.14), navy); leg.position.set(s * (RW / 2 - 0.35), -0.08, -0.08); roof.g.add(leg); }
    roof.g.rotation.y = yaw;
    roof.g.position.set(bx + fx * (bd / 2 - 0.45), roofTop, bz + fz * (bd / 2 - 0.45));
    this.scene.add(roof.g);
    // Glass panes live on the Motoka building in world.js only — a second transparent layer here z-fought and blinked.
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.4, 0.12, 2.6), new THREE.MeshLambertMaterial({ color: 0x2389e3 }));
    canopy.position.set(bx + fx * (bd / 2 + 1.2), Math.min(bh - 0.05, 4.1), bz + fz * (bd / 2 + 1.2)); canopy.rotation.y = yaw; this.scene.add(canopy);
    const road = (this.city.roads || []).find(r => r.z1 === r.z2 && Math.abs((r.z1 ?? 999) - 120) < 1);
    const curb = road ? road.z1 + (road.width || 14) / 2 + 2.2 : bz + fz * 28;
    const roadside = (side) => {
      const W = 5.4, h = W / MOTOKA_ASPECT, lift = 1.85, g = new THREE.Group();
      const face = new THREE.Mesh(new THREE.PlaneGeometry(W, h), faceMat); face.position.y = lift + h / 2; g.add(face);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.18, h + 0.18, 0.1), navy); frame.position.set(0, lift + h / 2, -0.08); g.add(frame);
      for (const s of [-1, 1]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, lift, 10), navy);
        pole.position.set(s * (W / 2 + 0.06), lift / 2, -0.28); g.add(pole);
      }
      g.rotation.y = yaw;
      g.position.set(bx + rx * side, 0, curb);
      this.scene.add(g);
    };
    roadside(-Math.min(bw / 2 + 2, 12)); roadside(Math.min(bw / 2 + 2, 12));
    this.showCars = []; this.showCarRoots = [];
    this.refreshMotokaStock();
  }
  clearMotokaCars() {
    for (const g of this.showCarRoots || []) this.scene.remove(g);
    this.showCars = []; this.showCarRoots = [];
  }
  async refreshMotokaStock() {
    const d = await get('/api/motoka/stock').catch(() => null); if (!d?.cars) return;
    this.clearMotokaCars();
    const padMat = new THREE.MeshBasicMaterial({ map: motokaPad(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    for (const s of d.cars) {
      const g = new THREE.Group(); const car = makePlayerCar(s.color, s.body || 'hatch'); car.rotation.y = s.ry ?? Math.PI / 2; car.userData.buyModel = s.model; g.add(car);
      const tagY = s.body === 'cyber' ? 2.95 : s.body === 'gwagon' || s.body === 'g63' ? 2.55 : s.body === 'mclaren' ? 2.45 : 2.15;
      const tag = makeNameSprite(s.name, s.exclusive ? '#2389E3' : '#0b6b3a'); tag.scale.set(2.2, 0.55, 1); tag.position.set(0, tagY, 0); g.add(tag);
      if (s.place === 'yard') {
        const pad = new THREE.Mesh(new THREE.CircleGeometry(s.body === 'cyber' ? 4.3 : s.body === 'mclaren' ? 3.6 : 3.15, 48).rotateX(-Math.PI / 2), padMat); pad.position.y = 0.04; pad.renderOrder = 0; g.add(pad);
      }
      g.position.set(s.x, 0, s.z); this.scene.add(g); this.showCars.push(car); this.showCarRoots.push(g);
    }
    this.motokaStock = { supercarsLeft: d.supercarsLeft, supercarsDaily: d.supercarsDaily };
  }

  resize() { const w = innerWidth, hh = innerHeight; this.renderer.setSize(w, hh, false); this.camera.aspect = w / hh; this.camera.updateProjectionMatrix(); this.size = { w, h: hh }; }

  // ---- auth
  bindAuth() {
    let tab = 'signup'; const form = $('#authForm');
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get('ref') || params.get('referral') || '';
    if (fromUrl) try { localStorage.setItem('na_ref', fromUrl); } catch { /* private mode */ }
    const storedRef = () => { try { return localStorage.getItem('na_ref') || ''; } catch { return ''; } };
    const showRef = async () => {
      const el = $('#authRef'); if (!el) return;
      const ref = storedRef();
      if (!ref || tab !== 'signup') { el.classList.add('hidden'); el.textContent = ''; return; }
      try {
        const p = await get('/api/referrals/preview?ref=' + encodeURIComponent(ref));
        if (p?.ok) { el.classList.remove('hidden'); el.textContent = `Invited by @${p.username} — they earn a bonus when you join.`; return; }
      } catch { /* ignore */ }
      el.classList.add('hidden');
    };
    const set = (t) => {
      tab = t;
      $$('#authTabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
      $('#authGo').textContent = { signup: 'Create account', login: 'Log in' }[t];
      $('#authErr').textContent = '';
      $('#fEmail')?.classList.toggle('hidden', t !== 'signup');
      $('#fGender')?.classList.toggle('hidden', t !== 'signup');
      $('#fAge')?.classList.toggle('hidden', t !== 'signup');
      const pass = form.querySelector('input[name=password]');
      if (pass) pass.autocomplete = t === 'login' ? 'current-password' : 'new-password';
      showRef();
    };
    set('signup');
    $$('#authTabs button').forEach(b => b.onclick = () => set(b.dataset.t));
    form.onsubmit = async (e) => {
      e.preventDefault(); const f = new FormData(form); const age18 = $('#age18').checked;
      $('#authErr').textContent = '';
      if (tab !== 'login' && !age18) { $('#authErr').textContent = 'You must confirm you are 18 or older to play.'; return; }
      const gender = String(f.get('gender') || 'male');
      const email = String(f.get('email') || '').trim();
      if (tab === 'signup' && !email) { $('#authErr').textContent = 'Enter your email address.'; return; }
      if (tab === 'signup' && gender !== 'male' && gender !== 'female') { $('#authErr').textContent = 'Choose Man or Woman.'; return; }
      const btn = $('#authGo'); btn.disabled = true;
      try {
        const body = { username: f.get('username'), password: f.get('password'), age18 };
        if (tab === 'signup') {
          body.gender = gender; body.email = email;
          const ref = storedRef(); if (ref) body.ref = ref;
        }
        const r = await post(`/api/auth/${tab}`, body);
        if (tab === 'signup') try { localStorage.removeItem('na_ref'); } catch { /* ignore */ }
        $('#auth').classList.add('hidden');
        await this.enter(r.user);
      } catch (er) { $('#authErr').textContent = er.message; } finally { btn.disabled = false; }
    };
  }
  async enter(user) {
    if (!(await ageGate(this))) return; // age mode 'play': nobody enters the world before the server records a pass
    if (user.cityId && this.city?.id && user.cityId !== this.city.id) { this.progress?.(10, 'Loading your city…'); location.reload(); return; } // the world is built from the player's own city only
    this.playing = true; this.user = user; setTimeout(() => this.ui.checkPayReturn?.(), 1500); $('#hud').classList.remove('hidden'); get('/api/weather').then(w => this.weather?.setZones(w.zones.map(q => ({ ...q })), w.speedByLevel)).catch(() => {}); this.cfg.jobs = (await get('/api/jobs').catch(() => ({ jobs: [] }))).jobs;
    const spawns = this.city.spawns; const s = spawns[(user.id || 0) % spawns.length] || spawns[0] || { x: 0, z: 0, ry: 0 };
    const px = Number(user.pos?.x), pz = Number(user.pos?.z), pry = Number(user.pos?.ry);
    const x = Number.isFinite(px) ? px : s.x, z = Number.isFinite(pz) ? pz : s.z, ry = Number.isFinite(pry) ? pry : (s.ry || 0);
    this.ctrl.teleport(x, z); this.ctrl.ry = ry; this.ctrl.camYaw = ry;
    // Restore drive mode when the server still has you in a car (and it is not wrecked / fainted).
    const wantDrive = user.mode === 'drive' && !user.fainted && !user.car?.wrecked;
    this.ctrl.mode = wantDrive ? 'drive' : 'walk';
    this.ctrl.setLook(user.color, user.username); await this.syncSkins(); this.ctrl.setRide(user.car); this.ctrl.applyMode(); this.ownCar?.sync();
    if (wantDrive) {
      const back = 11; this.camera.position.set(x - Math.sin(ry) * back, 5.8, z - Math.cos(ry) * back); this.camera.lookAt(x, 1.2, z);
    } else this.camera.position.set(x - 6, 7, z + 7);
    this.ctrl.root.visible = true;
    this.update(user); await this.syncSkins();
    if (user.signup?.needed && (await setupFlow(this)) === 'moved') return;
    await this.parking.load();
    if (this.ctrl.mode === 'drive' && this.parking?.mine) { this.ctrl.mode = 'walk'; this.ctrl.applyMode(); this.ownCar?.sync(); }
    this.rideSvc.load(); this.tour ||= new Tour(this); this.tour.maybeStart(); this.tutorial ||= new TutorialCard(this); this.tutorial.start(); readyCount(this).then(n => { if (n > 0) this.ui.toast(`🎯 ${n} mission reward${n === 1 ? '' : 's'} waiting: phone > Missions`, 'money'); }); this.net.start(); this.phone2 = new PhoneSys(this); this.phone2.start(); this.refreshProps(); get('/api/plots').then(d => { this.plots = d.plots; this.refreshPlots(); }).catch(() => {});
    this.ui.toast(`Welcome, ${user.username}!`); if (!localStorage.getItem('na_tip') && !matchMedia('(pointer: coarse)').matches) { localStorage.setItem('na_tip', '1'); setTimeout(() => { if (!this.ui.sheetOpen) this.ui.toast('Tip: tap a building or the ground near a sign to open its sheet.'); }, 1800); }
  }
  /** Flush mode + position on tab hide / reload so the next load restores the car. */
  flushPresence() {
    if (!this.playing || !this.ctrl || !this.city) return;
    const c = this.ctrl;
    if (!Number.isFinite(c.x) || !Number.isFinite(c.z)) return;
    const body = JSON.stringify({ city: this.city.id, trail: [{ a: 0, x: c.x, z: c.z, ry: c.ry }], mode: c.mode });
    try { fetch('/api/heartbeat', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body, keepalive: true }); } catch { /* unload */ }
  }
  async refreshProps() { const d = await get('/api/properties').catch(() => null); if (d) { this.props = d.properties; this.world.setMarkers(d.properties); } }
  refreshPlots() { for (const p of this.plots) { const m = this.plotMeshes[p.id]; if (m) m.flag.material.color.setHex(p.status === 'available' ? 0x35c46b : p.status === 'yours' ? 0xffc20e : 0x8a8f98); } }
  async refreshMe() { const r = await get('/api/me').catch(() => null); if (r?.user) this.update(r.user); }
  update(u) { if (!u) return; this.user = u; this.ui.hud(u); this.ctrl?.setBody?.(u.gender); this.syncWear(u.wear); this.ctrl?.setRide(u.car); this.faint?.sync(u); this.syncBodyguard(u.bodyguard); }
  syncBodyguard(view) { this.bodyguard?.sync(view || this.user?.bodyguard); }
  /** dress your own avatar in what the server says you wear (jewelry store and cap store) */
  /** skins (item 9): the look catalogue is public; your own worn skins come from /api/skins */
  skinLookOf(id) { return id ? this.skinCat?.get(id) || null : null; }
  async syncSkins() {
    try {
      const c = await get('/api/skins/catalogue'); this.skinCat = new Map(c.skins.map(s => [s.id, s]));
      const v = await get('/api/skins');
      // Prefer the shop row (includes body:'hd') so a stale catalogue cannot drop the HD mesh flag.
      const worn = (k) => {
        const it = v.items.find(i => i.kind === k && i.worn); if (!it) return null;
        const cat = this.skinLookOf(it.id) || {};
        return { ...cat, id: it.id, color: it.color || cat.color, glow: it.glow || cat.glow, body: it.body || cat.body || '' };
      };
      const changed = this.ctrl.setSkins({ avatar: worn('avatar'), car: worn('car') });
      if (changed) this.syncWear(this.user?.wear);
    } catch { /* skins are cosmetic: never block play */ }
  }
  syncWear(w) { if (this.wearCat && this.ctrl?.avatar && !this.ctrl.avatar.userData?.hd) applyWear(this.ctrl.avatar, (w?.worn || []).map(x => x.id), this.wearCat); }
  sessionLost() { if (!this.playing) return; this.playing = false; this.net.stop(); $('#hud').classList.add('hidden'); this.ui.closeSheet(); $('#auth').classList.remove('hidden'); $('#authErr').textContent = 'Your session ended. Please sign in again.'; }
  async logout() { await post('/api/auth/logout').catch(() => {}); this.playing = false; this.net.stop(); location.reload(); }
  setConn(ok) { $('#conn').classList.toggle('hidden', ok); }
  markRead() { this.ui.badge(0); this.unread = 0; }
  toggleCar(opts = {}) {
    if (!this.playing || this.busy || this.carpool?.riding) return;
    if (this.user?.car?.wrecked || this.carBody?.wrecked) { this.ui.toast('Car don wreck. Call a tow truck to Motoka Meko.'); return; }
    if (this.ctrl.mode === 'walk' && this.parking?.blocksDriving()) return;
    const owned = !!this.user?.car;
    if (owned && this.ctrl.mode === 'walk' && !opts.summon && !this.ownCar?.nearEnough()) { this.ui.toast('Walk up to your car and press Enter to get in.'); return; }
    if (owned && this.ctrl.mode === 'drive') this.ownCar?.dropHere();
    const m = this.ctrl.toggleCar(); this.ui.sfx(m === 'drive' ? 'horn' : 'ok'); this.net.nudge(); this.ownCar?.sync();
  }
  enterOwnCar() { this.toggleCar(); }
  async reportCollide(impact) {
    if (!this.playing || this.ctrl?.mode !== 'drive' || !this.user?.car) return;
    const min = this.cfg?.crash?.collideMin ?? 5; if (!(impact > min)) return;
    const now = performance.now(); if (now - (this._collideAt || 0) < 450) return; this._collideAt = now;
    try {
      const r = await post('/api/crash/collide', { impact, pos: this.pos() });
      if (r.damage > 0) {
        this.carBody = { damage: 100 - (r.carHealth ?? r.health ?? 0), health: r.carHealth ?? r.health, smoke: r.smoke, wrecked: r.wrecked, repairFee: r.repairFee };
        if (this.user?.car) Object.assign(this.user.car, this.carBody);
        this.syncDriveSmoke();
        if (r.text) this.ui.toast(r.text, r.justWrecked || r.wrecked ? 'bad' : undefined);
        if (r.justWrecked || r.wrecked) { this.ctrl.mode = 'walk'; this.ctrl.applyMode(); this.ownCar?.dropHere?.(); this.net?.nudge?.(); this.refreshMe?.(); }
      } else if (r.smoke) this.syncDriveSmoke();
    } catch { /* soft: never block driving on a failed collide report */ }
  }
  syncDriveSmoke() {
    const body = this.carBody || this.user?.car; const smoke = !!(body?.smoke || body?.wrecked);
    if (smoke && this.ctrl?.carObj) {
      if (!this.driveSmoke || this.driveSmoke.root.parent !== this.ctrl.carObj) {
        this.driveSmoke?.dispose?.(); this.driveSmoke = new CarSmoke(this.ctrl.carObj);
      }
      this.driveSmoke.set(true, !!body?.wrecked);
    } else if (this.driveSmoke) this.driveSmoke.set(false);
    this.ownCar?.setSmoke?.(smoke, !!body?.wrecked);
  }
  async offerBuy(modelId) {
    const gar = await this.ui.guard(() => get('/api/garage')); if (!gar) return;
    const m = (gar.catalogue || []).find(c => c.id === modelId); if (!m) { this.ui.toast('That car is not for sale.'); return; }
    const owned = gar.cars.some(c => c.model === m.id); const full = gar.cars.length >= gar.slots;
    const soldOut = !!m.exclusive && (gar.supercarsLeft ?? 0) <= 0;
    this.ui.openSheet(m.name, [
      h('p', {}, m.exclusive ? `Exclusive supercar · ${gar.supercarsLeft ?? 0} of ${gar.supercarsDaily ?? 20} left today.` : 'Showroom price, paid with your game money.'),
      h('p', {}, this.fmt(m.price)),
      h('button', { class: 'btn big alt', disabled: full || soldOut, onclick: async () => { const r = await this.ui.guard(() => post('/api/garage/buy', { model: m.id, idemKey: crypto.randomUUID?.() })); if (r) { this.ui.closeSheet(); this.ui.toast(`${m.name} is in your garage`, 'money'); this.refreshMe?.(); this.refreshMotokaStock(); } } }, soldOut ? 'Sold out today' : owned ? 'Buy another' : `Buy · ${this.fmt(m.price)}`),
      soldOut ? h('p', { class: 'mut' }, 'Motoka only shows 20 supercars a day. Come back tomorrow.') : full ? h('p', { class: 'mut' }, 'Garage full. Sell a car in Phone → Garage.') : '']);
  }

  // ---- heartbeat results
  onHeartbeat(r) {
    this.guardian?.onBeat(r.gd);
    this.air?.setTicket(r.flight); this.air?.setPlanes(r.pl); this.boats?.setTrip(r.boat);
    if (r.city && this.city?.id && r.city !== this.city.id && !this.cityChanging) { this.cityChanging = true; this.ui.toast('Arriving in a new city…'); setTimeout(() => location.reload(), 700); return; }
    this.update(r.me); if (r.carBody) this.carBody = r.carBody; this.worldTime = r.world; this.ui.clock(r.world); this.world.setTime(r.world.minutesOfDay); this.weather?.apply(r.wx); this.weather?.afterTime(); this.festBadge(r.fest); this.throws?.ingest(r.th); if (r.bonk) this.throws?.onBonk(r.bonk); this.ghosts.ingest(r.players, this.serverNow()); this.carpool?.onHeartbeat(r.carpool); this.tow?.onHeartbeat(r.tow); this.ads.setSnapshot(r.ads); this.noteTreasures(r.tr);
    if (r.me?.mode === 'walk' && this.ctrl?.mode === 'drive' && (r.carBody?.wrecked || r.me?.car?.wrecked)) { this.ctrl.mode = 'walk'; this.ctrl.applyMode(); this.ownCar?.dropHere?.(); this.ui.toast('💥 Car don wreck! Call a tow to Motoka Meko.'); }
    this.syncDriveSmoke();
    for (const c of r.chat || []) this.showChat(c); for (const n of r.notifs || []) { if (!['knock', 'dm', 'knock_in', 'knock_no'].includes(n.kind) || true) { this.unread = (this.unread || 0) + 1; this.ui.toast(n.text, ['omo_onile'].includes(n.kind) ? 'bad' : n.kind === 'dm' ? '' : 'money'); if (n.kind === 'dm') this.audio?.play('notify'); if (n.kind === 'achievement') this.audio?.play('achieve'); } } this.ui.badge(this.unread || 0);
    this.lastKnocks = r.knocks; for (const k of r.knocks?.incoming || []) this.ui.hostKnock(k);
    if (r.teleport && !r.teleport.travelMs && !this.commute) { this.ctrl.teleport(r.teleport.x, r.teleport.z); }
    if (r.me.shift && r.me.shift.endsAt <= this.serverNow() && this.lastShiftDone !== r.me.shift.id) { this.lastShiftDone = r.me.shift.id; this.ui.toast('Shift done! Open the job sheet to collect your pay.', 'money'); }
  }
  onPush(m) { if (m.kind === 'knock') this.ui.sfx('knock'); if (m.type?.startsWith?.('needs.') || m.kind === 'needs') this.faint?.onPush(m); }
  showChat(c) { this.seenChat ||= new Set(); if (c.id != null && this.seenChat.has(c.id)) return; if (c.id != null) { this.seenChat.add(c.id); if (this.seenChat.size > 200) this.seenChat.delete(this.seenChat.values().next().value); } this.ui.addChat(c.u, c.t, c.id, c.tt); }

  // ---- places, tapping, actions
  nearest(maxD = 18) {
    let best = null, bd = maxD; const px = this.ctrl.x, pz = this.ctrl.z; for (const p of this.city.places) { const d = Math.hypot(p.x - px, p.z - pz); if (d < bd) { bd = d; best = p; } } return best ? { place: best, d: bd } : null;
  }
  nearestTreasure(maxD = 12) {
    let best = null, bd = maxD; const px = this.ctrl.x, pz = this.ctrl.z;
    for (const t of this.city.treasures || []) { if (t.taken) continue; const d = Math.hypot(t.x - px, t.z - pz); if (d < bd) { bd = d; best = t; } }
    return best ? { t: best, d: bd } : null;
  }
  noteTreasures(ids) {
    if (!ids?.length) return; const set = new Set(ids); let hit = false;
    for (const t of this.city.treasures || []) if (set.has(t.id) && !t.taken) { t.taken = true; hit = true; }
    if (hit) this.world?.hideTreasures(ids);
    const bm = this.ui?.bigmap; if (hit && bm?.model) { const keep = (i) => !(i.type === 'treasure' && set.has(i.id)); bm.model.items = bm.model.items.filter(keep); bm.model.catalogue = bm.model.catalogue.filter(keep); }
  }
  async takeTreasure(t) {
    if (this.busy) return; this.busy = true; this.ui.action(null);
    try {
      const r = await post('/api/treasures/claim', { id: t.id, pos: this.pos() });
      this.noteTreasures([t.id]); if (r.user) this.update(r.user); this.ui.toast(r.text || 'Treasure taken.', 'money'); this.ui.sfx('ok');
    } catch (e) { if (e.code === 'TAKEN') this.noteTreasures([t.id]); this.ui.error(e); }
    finally { this.busy = false; }
  }
  tapPlace(clientX, clientY) {
    const v = new THREE.Vector2((clientX / this.size.w) * 2 - 1, -(clientY / this.size.h) * 2 + 1); const rc = new THREE.Raycaster(); rc.setFromCamera(v, this.camera);
    const cars = []; if (this.ownCar?.mesh?.visible) cars.push(this.ownCar.mesh); for (const c of this.showCars || []) cars.push(c); for (const c of this.parking?.cp?.cars || []) cars.push(c);
    const carHit = cars.length ? rc.intersectObjects(cars, true)[0] : null;
    if (carHit) {
      let o = carHit.object; while (o && !o.userData?.own && !o.userData?.mine && !o.userData?.buyModel) o = o.parent;
      const close = Math.hypot(this.ctrl.x - carHit.point.x, this.ctrl.z - carHit.point.z) < 14;
      if (o?.userData?.own) { if (this.ownCar.nearEnough()) this.enterOwnCar(); else this.ui.toast('Walk closer, then tap your car.'); return; }
      if (!close) { this.ui.toast('Walk up to that car.'); return; }
      if (o?.userData?.mine) { this.ui.toast('That one is yours. Tap Take my car.'); return; }
      if (o?.userData?.buyModel) { this.offerBuy(o.userData.buyModel); return; }
    }
    // billboard panels first
    const panels = Object.values(this.world.boards).map(b => b.panel); const hit = rc.intersectObjects(panels, false)[0]; if (hit) { const id = Object.keys(this.world.boards).find(k => this.world.boards[k].panel === hit.object); if (id) return this.ui.board(id); }
    const t = -rc.ray.origin.y / rc.ray.direction.y; if (!(t > 0)) return; const pt = rc.ray.origin.clone().addScaledVector(rc.ray.direction, t); let best = null, bd = 20; for (const p of this.city.places) { const d = Math.hypot(p.x - pt.x, p.z - pt.z); if (d < bd) { bd = d; best = p; } }
    // house doors: also match building footprints so tapping a building opens its card
    for (const pr of this.city.properties) { const b = this.city.buildings.find(x => x.id === pr.buildingId); if (b && Math.abs(pt.x - b.x) < b.w / 2 + 2 && Math.abs(pt.z - b.z) < b.d / 2 + 2) { best = this.city.places.find(p => p.id === pr.id); break; } }
    if (best) { this.ui.sfx('ok'); this.ui.place(best.id); } else { this.setWaypoint(pt.x, pt.z, 'Tapped spot'); }
  }
  doAction() {
    if (!this.playing || this.busy) return; if (this.ui.sheetOpen) return; const nt = this.nearestTreasure(12); if (nt && nt.d <= 10) { this.takeTreasure(nt.t); return; } const n = this.nearBoard || null; const np = this.nearest(this.actionRange || 18); if (np) this.ui.place(np.place.id); else if (n) this.ui.board(n);
  }
  setWaypoint(x, z, label) { this.waypoint = { x, z, label }; this.dest.visible = true; this.dest.position.set(x, 0.3, z); }
  /** festivals on right now (heartbeat field fest): a small badge, and one toast per festival per page load */
  festBadge(list) { const el = document.getElementById('festBadge'); if (!el) return; const key = (list || []).map(f => f.id).join(','); if (key === this._fest) return; this._fest = key; el.classList.toggle('hidden', !key); el.textContent = (list || []).map(f => `${f.icon} ${f.name}`).join(' · '); el.dataset.fest = key; this._festSeen ||= new Set(); for (const f of list || []) if (!this._festSeen.has(f.id)) { this._festSeen.add(f.id); this.ui.toast(`${f.icon} ${f.name} is on! See the Events tab on your phone.`); } }
  /** Track G item 5: props and pedestrians as solids, pushable crates, ball throwing, jump buttons. Numbers: server/config/physx.js */
  setupPhysx(city) {
    const X = this.physx = { ...PHYSX, ...(this.cfg.physx || {}) }; this.propSolids = propIndex(this.world.lamps, this.world.palmSpots, X.solids); const props = [], peds = [], none = { props, peds };
    this.ctrl.solids = (x, z, range, y) => {
      props.length = 0; peds.length = 0; this.propSolids.near(x, z, range, props, y);
      if (Number.isFinite(x) && Number.isFinite(z)) {
        if (X.ped.enabled) this.walkers.circlesNear(x, z, range, peds);
        if (this.ctrl.mode !== 'drive') this.ghosts?.circlesNear(x, z, range, peds);
        // Cars are solid on foot and while driving — do not drive through Motoka stock or parked cars
        if (this.ctrl.mode !== 'drive' && this.traffic) for (const o of this.traffic.obstaclesNear(x, z, range + 4)) if (Number.isFinite(o.x) && Number.isFinite(o.z)) peds.push(o);
      }
      // Motoka: car mesh is a child of a placed group (local 0,0) — use the root world XZ + the car's yaw
      const blockAt = (px, pz, ry, skip) => {
        if (skip) return;
        if (Math.abs(px - x) > range + 4 || Math.abs(pz - z) > range + 4) return;
        const off = 1.7, fx = Math.cos(ry) * off, fz = -Math.sin(ry) * off;
        // props (not peds): always collide, including Drive-me autopilot
        props.push({ x: px + fx, z: pz + fz, r: 1.25, h: 1.7 }, { x: px - fx, z: pz - fz, r: 1.25, h: 1.7 }, { x: px, z: pz, r: 1.45, h: 1.7 });
      };
      for (const g of this.showCarRoots || []) {
        if (!g || g.visible === false) continue;
        const car = g.children?.find?.(c => c.userData?.buyModel) || g.children?.[0];
        blockAt(g.position.x, g.position.z, car?.rotation?.y ?? g.rotation.y, false);
      }
      for (const g of this.propCars || []) {
        if (!g || g.visible === false) continue;
        const car = g.children?.[0];
        blockAt(g.position.x, g.position.z, car?.rotation?.y ?? g.rotation.y, false);
      }
      for (const c of this.parking?.cp?.cars || []) {
        if (!c || c.visible === false) continue;
        blockAt(c.position.x, c.position.z, c.rotation.y, this.ctrl.mode === 'drive' && c.userData?.mine);
      }
      return none;
    };
    this.pushables = new Pushables(this.scene, city.spawns, this.world.colliders, X, city); this.throws = new ThrowClient(this);
    const jb = document.getElementById('jumpBtn'); if (jb) { jb.classList.toggle('hidden', !X.jump.enabled); jb.addEventListener('pointerdown', (e) => { this.ctrl.jumpBtn = true; e.preventDefault(); }); const off = () => { this.ctrl.jumpBtn = false; }; jb.addEventListener('pointerup', off); jb.addEventListener('pointercancel', off); jb.addEventListener('pointerleave', off); }
    document.getElementById('throwBtn')?.classList.toggle('hidden', !X.throw.enabled);
  }
  enterHome() { post('/api/property/enter').then(() => this.interior.show(this.user.home.id)).catch(e => this.ui.error(e)); }
  async enterAsVisitor(propertyId) { this.ui.sfx('ok'); await this.interior.show(propertyId, true); }

  // ---- commute: server already charged + moved us; we animate the trip
  runCommute(r, pl, q) {
    this.nav?.cancel('stopped', true);
    this.busy = true; this.ctrl.frozen = true; let pts = null; if (r.mode === 'ride' && this.nav) { const rt = findRoute(this.nav.ensureGrid(), [r.from.x, r.from.z], [r.to.x, r.to.z], 'drive'); if (rt && rt.pts.length >= 2) pts = rt.pts; } this.commute = { t0: performance.now(), dur: r.seconds * 1000, from: r.from, to: r.to, mode: r.mode, pts, faintRescue: !!r.faintRescue, place: pl }; $('#commute').classList.remove('hidden');
    $('#commuteTitle').textContent = `${{ keke: '🛺 Keke', danfo: '🚌 Danfo', car: '🚗 Your car', ride: '🚕 Oya Ride' }[r.mode]} to ${pl.name}`; $('#commuteSub').textContent = `${q.traffic}${r.fare ? ' · ' + this.fmt(r.fare) : ''}`; this.ui.sfx('horn'); this.ui.toast(say('travel', r.fare)); this.ctrl.mode = r.mode === 'car' ? 'drive' : 'walk'; this.ctrl.applyMode();
    const dx = r.to.x - r.from.x, dz = r.to.z - r.from.z; this.ctrl.ry = Math.atan2(-dz, dx); this.ctrl.camYaw = this.ctrl.ry; this.net.trail.length = 0;
  }
  fmt(n) { return '₦' + Math.round(n).toLocaleString('en-NG'); }
  stepCommute(now) {
    const c = this.commute; if (!c) return false; const k = Math.min(1, (now - c.t0) / c.dur); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; if (c.pts) { const p = poseOnRoute(c.pts, e); this.ctrl.x = p.x; this.ctrl.z = p.z; this.ctrl.ry = p.yaw; this.ctrl.camYaw = p.yaw; } else { this.ctrl.x = c.from.x + (c.to.x - c.from.x) * e; this.ctrl.z = c.from.z + (c.to.z - c.from.z) * e; } this.ctrl.v = 0;
    this.ctrl.root.position.set(this.ctrl.x, 0, this.ctrl.z); this.ctrl.root.rotation.y = this.ctrl.ry; $('#commuteBar').style.width = (k * 100) + '%';
    if (k >= 1) {
      const foodTrip = c.faintRescue; const place = c.place;
      this.commute = null; this.busy = false; this.ctrl.frozen = false; this.ctrl.mode = 'walk'; this.ctrl.applyMode(); $('#commute').classList.add('hidden'); this.ctrl.teleport(c.to.x, c.to.z); this.ui.sfx('ok'); this.ui.toast(foodTrip ? 'You reached the canteen. Eat to regain strength.' : 'You have arrived.'); this.net.nudge(); this.waypoint = null; this.dest.visible = false;
      if (foodTrip) this.faint?.afterArrive({ placeId: place?.id, shopId: place?.type === 'shop' ? place.id : place?.shopId });
    } return true;
  }

  // ---- main loop
  loop(t0) {
    let last = t0; this.lastSample = 0; const frame = (now) => {
      requestAnimationFrame(frame); const dt = Math.min(0.1, (now - last) / 1000); if (this.qualityChoice === 'auto' && this.playing && this.governor.feed(now - last)) { const lv = Q.resolve('auto', Q.readEnv(), this.governor.steps); if (lv !== this.qualityLevel) { Q.apply(this, lv); this.ui?.toast?.(`Switched to ${this.quality.label} graphics to keep it smooth. Change it in More > Graphics.`); } } last = now;
      if (!this.playing) { this.idleCam(now); this.renderer.render(this.scene, this.camera); return; }
      if (this.interior.open || this.venue.open || this.garage.open) return;
      const sec = this.serverNow() / 1000; this.lightLevel = lampsOn(this.world.night); this.traffic.lightLevel = this.lightLevel; setPlayerHeadlamps(this.ctrl.carObj, this.lightLevel, this.ctrl.mode === 'drive'); for (const c of this.showCars || []) setPlayerHeadlamps(c, Math.max(this.lightLevel || 0, 0.95), true); this.traffic.update(sec, this.yieldTargets(), dt); this.walkers.update(sec, this.ctrl, this.ghosts); this.ghosts.update(this.serverNow() - 1100, this.ctrl); this.bodyguard?.update(dt); this.world.animate(dt * 1000);
      this.boats?.step(now, dt);
      if (this.air?.flying) this.air.step(now, dt);
      else if (this.boats?.aboard) { /* the boat's chase camera is set in boats.step */ }
      else if (!this.stepCommute(now)) this.ctrl.update(dt); else this.ctrl.placeCamera(this.camera, dt);
      if (!this.commute && !this.air?.flying && !this.boats?.aboard) { this.ctrl.placeCamera(this.camera, dt); if (now - this.lastSample > 250) { this.lastSample = now; this.net.sample({ t: this.serverNow(), x: this.ctrl.x, z: this.ctrl.z, ry: this.ctrl.ry }); } }
      if (this.ctrl.lastTap && !this.ui.sheetOpen && !this.busy) { const tp = this.ctrl.lastTap; this.ctrl.lastTap = null; if (now - tp.t < 400) this.tapPlace(tp.x, tp.y); }
      this.ads.update(this.camera, this.size, this.ctrl, dt * 1000);
      this.nav?.tick(dt); this.parking?.tick(dt * 1000); this.ownCar?.sync(); this.bus?.tick(dt * 1000, now); this.rideSvc?.tick(dt * 1000); this.air?.tick(dt * 1000); this.links?.tick(dt * 1000); this.boats?.tick(dt * 1000); this.radio?.tick(dt * 1000); this.carpool?.tick(); this.tow?.tick(dt * 1000); this.radioSpots?.tick(dt * 1000); this.driveSmoke?.tick(dt); this.audio?.engine(this.ctrl.mode === 'drive' && !this.air?.flying ? this.ctrl.groundSpeed() : null); if (now - (this.lastAudioTick || 0) > 100) { this.lastAudioTick = now; this.audio?.tick(); }
      this.emotes?.frame(); this.hudStep(now); this.weather?.update(dt, this.camera); this.throws?.update(); this.pushables?.update(dt, this.ctrl); this.ctrl.envScale = this.weather?.speedAt(this.ctrl.x, this.ctrl.z); if (Q.shouldRender(now, this.lastDraw || 0, this.quality?.maxFps)) { this.lastDraw = now; this.renderer.render(this.scene, this.camera); }
    }; requestAnimationFrame(frame);
  }
  idleCam(now) { const a = now / 9000; this.camera.position.set(Math.cos(a) * 70, 38, Math.sin(a) * 70 - 20); this.camera.lookAt(0, 4, -20); this.camera.updateMatrixWorld(); }
  hudStep(now) {
    if (now - (this.hudT || 0) < 200) return; this.hudT = now; const c = this.ctrl; const nt = this.nearestTreasure(12); const np = this.nearest(this.actionRange || 18); const nb = this.ads.nearest(c.x, c.z, 30); this.nearBoard = nb;
    const area = this.city.area(c.x, c.z); const road = this.roadName(c.x, c.z); this.ui.loc(`📍 ${np ? np.place.name : road ? road : area}${np || road ? ' · ' + area : ''}`);
    const bn = (n) => '₦' + (n / 1e9).toFixed(1) + 'bn';
    let label = null; if (nt && nt.d <= 10 && !this.ui.sheetOpen) label = `💰 Take ${bn(nt.t.worth)}`; else if (np && !this.ui.sheetOpen) { const p = np.place; label = { shop: `🛒 ${p.name}`, job: `💼 Work here`, house: `🏠 ${p.name}`, plot: `🌍 ${p.name}`, landmark: `📍 ${p.name}` }[p.type]; if (p.type === 'shop') { const s = this.shops.find(x => x.id === p.id); if (s && !s.status.open) label = `🔒 ${p.name}: ${s.status.text}`; } } else if (nb && !this.ui.sheetOpen) label = '📢 Billboard';
    this.ui.action(this.busy ? null : label); if (this.waypoint) { const d = Math.hypot(this.waypoint.x - c.x, this.waypoint.z - c.z); if (d < 5) { this.waypoint = null; this.dest.visible = false; this.ui.toast('You have arrived.'); } this.ui.waypoint(this.waypoint, d); } else this.ui.waypoint(null);
    if (this.dest.visible) this.dest.scale.setScalar(1 + Math.sin(now / 200) * 0.15); this.ui.minimap(c, this.city, this.ghosts, this.waypoint); if (this.user?.shift) this.ui.hud(this.user);
    this.activity = c.mode;
  }
  onRoad(x, z, slack = 0) { return roadAt(this.city, x, z, slack); }
  roadName(x, z) { const r = roadAt(this.city, x, z); return r ? (r.name || 'On the road') : null; }
}
const game = new Game(); window.__game = game; game.boot();
