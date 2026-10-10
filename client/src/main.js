import { PHYS, applyServerLimits } from './physics-config.js';
import { gate as ageGate } from './age-ui.js';
import * as THREE from 'three';
import { get, post, $, $$, h, ApiError } from './api.js';
import { buildWorld } from './world.js';
import { Controller } from './player.js';
import { Nav } from './nav.js';
import { ParkingClient } from './parking-client.js';
import { BusStops } from './bus-client.js';
import { RideClient } from './ride-client.js';
import { Tour } from './tour.js';
import { setupFlow } from './setup-ui.js';
import { AirportClient } from './airport-client.js';
import { LinkClient } from './link-client.js';
import { BoatClient } from './boat-client.js';
import { RadioClient } from './radio-client.js';
import { lampsOn } from './lamps.js';
import { Weather } from './weather.js';
import { propIndex } from './solids.js';
import { Pushables } from './pushables.js';
import { ThrowClient } from './throw-client.js';
import { PHYSX } from '../../server/config/physx.js';
import { pushSpots } from '../../server/core/physx.js';
import { setPlayerHeadlamps } from './headlamps.js';
import { CrashClient } from './crash.js';
import { Traffic, Walkers, Ghosts, makeNameSprite } from './entities.js';
import { applyWear, indexCatalogue } from './wear-models.js';
import { AdsClient } from './ads-client.js';
import { UI, say } from './ui.js';
import { Net } from './net.js';
import { Interior } from './interior.js';
import { Venue } from './venue.js';
import { GarageView } from './garage-view.js';
import { roadAt } from './roadgeom.js';
import { PhoneSys } from './phone-v2/phone2.js';
import { glowTexture } from './textures.js';

const TIPS = ['Tap any building or sign to see it on the map and travel there.', 'Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.', 'Knock at a house when its owner is home. They can let you in.', 'Land plots grow in value, but omo-onile may come for a levy.', 'Delivery costs more but works from anywhere.', 'Press C to hop in your car. Press T to chat.'];
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
      this.renderer = new THREE.WebGLRenderer({ canvas: $('#game'), antialias: devicePixelRatio < 2, powerPreference: 'high-performance' }); this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      this.camera = new THREE.PerspectiveCamera(58, 1, 0.5, 900); this.camera.position.set(0, 14, 20);
      this.world = buildWorld(city); this.scene = this.world.scene; this.decorate(); this.weather = new Weather(this.scene, this.world);
      this.progress(60, 'Putting traffic on the road…'); await new Promise(r => setTimeout(r, 30));
      this.traffic = new Traffic(this.scene, city.trafficLoops, city.busStops || []); this.traffic.onHorn = (c, car) => this.horn(c, car); this.walkers = new Walkers(this.scene, city.zones); this.ghosts = new Ghosts(this.scene); this.ghosts.cat = this.wearCat;
      this.ads = new AdsClient(this.world, city, () => this.serverNow()); this.ui = new UI(this); this.net = new Net(this); this.interior = new Interior(this); this.venue = new Venue(this); this.garage = new GarageView(this);
      this.ctrl = new Controller($('#game'), city, this.world.colliders, '#00a859', 'You'); this.scene.add(this.ctrl.root); this.setupPhysx(city); applyServerLimits(this.cfg.movement); this.ctrl.onStep = (k) => this.ui.sfx('step', PHYS.audio.footstepVol * (0.6 + 0.4 * k)); this.ctrl.onBump = (imp) => this.ui.sfx('thud', PHYS.audio.thudVol * Math.min(1.4, 0.4 + imp / 12)); this.ctrl.obstacles = (x, z, r) => this.traffic.obstaclesNear(x, z, r); this.nav = new Nav(this); this.parking = new ParkingClient(this); this.bus = new BusStops(this); this.rideSvc = new RideClient(this); this.links = new LinkClient(this); this.boats = new BoatClient(this); this.radio = new RadioClient(this); this.air = new AirportClient(this); this.crash = new CrashClient(this); this.traffic.crash = this.crash;
      addEventListener('resize', () => this.resize()); this.resize(); this.bindAuth(); this.progress(85, TIPS[Math.floor(Math.random() * TIPS.length)]);
      const me = await get('/api/me').catch(() => null); this.progress(100, 'Ready!'); await new Promise(r => setTimeout(r, 250));
      this.loop(performance.now()); $('#loading').classList.add('hidden');
      if (me) await this.enter(me.user); else $('#auth').classList.remove('hidden');
    } catch (e) { console.error(e); $('#loadTip').textContent = e instanceof ApiError ? e.message : 'Could not start the game. Is WebGL enabled? Refresh to retry.'; $('#loadBar').style.background = '#d6402f'; }
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
    for (const v of this.city.venues || []) { const sp = makeNameSprite(v.name, v.sign || '#333'); sp.scale.set(8, 2, 1); sp.position.set(v.x, 8.5, v.z); sc.add(sp); const mk = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.9, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffc20e, side: THREE.DoubleSide })); mk.position.set(v.x, 0.15, v.z); sc.add(mk); }
    this.dest = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.7, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xb44cff, side: THREE.DoubleSide })); this.dest.visible = false; sc.add(this.dest);
  }
  resize() { const w = innerWidth, hh = innerHeight; this.renderer.setSize(w, hh, false); this.camera.aspect = w / hh; this.camera.updateProjectionMatrix(); this.size = { w, h: hh }; }

  // ---- auth
  bindAuth() {
    let tab = 'guest'; const form = $('#authForm'); const set = (t) => { tab = t; $$('#authTabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t)); $('#fUser').classList.toggle('hidden', t === 'guest'); $('#fPass').classList.toggle('hidden', t === 'guest'); $('#authGo').textContent = { guest: 'Play as guest', signup: 'Create account', login: 'Log in' }[t]; $('#authErr').textContent = ''; }; set('guest');
    $$('#authTabs button').forEach(b => b.onclick = () => set(b.dataset.t));
    form.onsubmit = async (e) => { e.preventDefault(); const f = new FormData(form); const age18 = $('#age18').checked; $('#authErr').textContent = ''; if (tab !== 'login' && !age18) { $('#authErr').textContent = 'You must confirm you are 18 or older to play.'; return; }
      const btn = $('#authGo'); btn.disabled = true;
      try { const r = await post(`/api/auth/${tab}`, { username: f.get('username'), password: f.get('password'), age18 }); $('#auth').classList.add('hidden'); await this.enter(r.user); } catch (er) { $('#authErr').textContent = er.message; } finally { btn.disabled = false; } };
  }
  async enter(user) {
    if (!(await ageGate(this))) return; // age mode 'play': nobody enters the world before the server records a pass
    if (user.cityId && this.city?.id && user.cityId !== this.city.id) { this.progress?.(10, 'Loading your city…'); location.reload(); return; } // the world is built from the player's own city only
    this.playing = true; this.user = user; setTimeout(() => this.ui.checkPayReturn?.(), 1500); $('#hud').classList.remove('hidden'); get('/api/weather').then(w => this.weather?.setZones(w.zones.map(q => ({ ...q })), w.speedByLevel)).catch(() => {}); this.cfg.jobs = (await get('/api/jobs').catch(() => ({ jobs: [] }))).jobs; this.ctrl.setLook(user.color, user.username);
    const spawns = this.city.spawns; const s = spawns[user.id % spawns.length]; const p = user.pos && (user.pos.x || user.pos.z) ? user.pos : null; this.ctrl.teleport(p?.x ?? s.x, p?.z ?? s.z); this.ctrl.ry = s.ry || 0; this.ctrl.camYaw = this.ctrl.ry; this.camera.position.set(this.ctrl.x - 10, 12, this.ctrl.z + 12);
    this.update(user); if (user.signup?.needed && (await setupFlow(this)) === 'moved') return; this.parking.load(); this.rideSvc.load(); this.tour ||= new Tour(this); this.tour.maybeStart(); this.net.start(); this.phone2 = new PhoneSys(this); this.phone2.start(); this.refreshProps(); get('/api/plots').then(d => { this.plots = d.plots; this.refreshPlots(); }).catch(() => {});
    this.ui.toast(user.guest ? `Welcome, ${user.username}! You are playing as a guest.` : `Welcome back, ${user.username}!`); if (!localStorage.getItem('na_tip') && !matchMedia('(pointer: coarse)').matches) { localStorage.setItem('na_tip', '1'); setTimeout(() => { if (!this.ui.sheetOpen) this.ui.toast('Tip: tap a building or the ground near a sign to open its sheet.'); }, 1800); }
  }
  async refreshProps() { const d = await get('/api/properties').catch(() => null); if (d) { this.props = d.properties; this.world.setMarkers(d.properties); } }
  refreshPlots() { for (const p of this.plots) { const m = this.plotMeshes[p.id]; if (m) m.flag.material.color.setHex(p.status === 'available' ? 0x35c46b : p.status === 'yours' ? 0xffc20e : 0x8a8f98); } }
  async refreshMe() { const r = await get('/api/me').catch(() => null); if (r?.user) this.update(r.user); }
  update(u) { if (!u) return; this.user = u; this.ui.hud(u); this.syncWear(u.wear); }
  /** dress your own avatar in what the server says you wear (jewelry store and cap store) */
  syncWear(w) { if (this.wearCat && this.ctrl?.avatar) applyWear(this.ctrl.avatar, (w?.worn || []).map(x => x.id), this.wearCat); }
  sessionLost() { if (!this.playing) return; this.playing = false; this.net.stop(); $('#hud').classList.add('hidden'); this.ui.closeSheet(); $('#auth').classList.remove('hidden'); $('#authErr').textContent = 'Your session ended. Please sign in again.'; }
  async logout() { await post('/api/auth/logout').catch(() => {}); this.playing = false; this.net.stop(); location.reload(); }
  setConn(ok) { $('#conn').classList.toggle('hidden', ok); }
  markRead() { this.ui.badge(0); this.unread = 0; }
  toggleCar() { if (!this.playing || this.busy) return; if (this.parking?.blocksDriving()) return; const m = this.ctrl.toggleCar(); this.ui.sfx(m === 'drive' ? 'horn' : 'ok'); this.net.nudge(); }

  // ---- heartbeat results
  onHeartbeat(r) {
    this.air?.setTicket(r.flight); this.air?.setPlanes(r.pl); this.boats?.setTrip(r.boat);
    if (r.city && this.city?.id && r.city !== this.city.id && !this.cityChanging) { this.cityChanging = true; this.ui.toast('Arriving in a new city…'); setTimeout(() => location.reload(), 700); return; }
    this.update(r.me); this.worldTime = r.world; this.ui.clock(r.world); this.world.setTime(r.world.minutesOfDay); this.weather?.apply(r.wx); this.weather?.afterTime(); this.festBadge(r.fest); this.throws?.ingest(r.th); if (r.bonk) this.throws?.onBonk(r.bonk); this.ghosts.ingest(r.players, this.serverNow()); this.ads.setSnapshot(r.ads);
    for (const c of r.chat || []) this.ui.addChat(c.u, c.t, c.id); for (const n of r.notifs || []) { if (!['knock', 'dm', 'knock_in', 'knock_no'].includes(n.kind) || true) { this.unread = (this.unread || 0) + 1; this.ui.toast(n.text, ['omo_onile'].includes(n.kind) ? 'bad' : n.kind === 'dm' ? '' : 'money'); } } this.ui.badge(this.unread || 0);
    this.lastKnocks = r.knocks; for (const k of r.knocks?.incoming || []) this.ui.hostKnock(k);
    if (r.teleport && !r.teleport.travelMs && !this.commute) { this.ctrl.teleport(r.teleport.x, r.teleport.z); }
    if (r.me.shift && r.me.shift.endsAt <= this.serverNow() && this.lastShiftDone !== r.me.shift.id) { this.lastShiftDone = r.me.shift.id; this.ui.toast('Shift done! Open the job sheet to collect your pay.', 'money'); }
  }
  onPush(m) { if (m.kind === 'knock') this.ui.sfx('knock'); }

  // ---- places, tapping, actions
  nearest(maxD = 18) {
    let best = null, bd = maxD; const px = this.ctrl.x, pz = this.ctrl.z; for (const p of this.city.places) { const d = Math.hypot(p.x - px, p.z - pz); if (d < bd) { bd = d; best = p; } } return best ? { place: best, d: bd } : null;
  }
  tapPlace(clientX, clientY) {
    const v = new THREE.Vector2((clientX / this.size.w) * 2 - 1, -(clientY / this.size.h) * 2 + 1); const rc = new THREE.Raycaster(); rc.setFromCamera(v, this.camera);
    // billboard panels first
    const panels = Object.values(this.world.boards).map(b => b.panel); const hit = rc.intersectObjects(panels, false)[0]; if (hit) { const id = Object.keys(this.world.boards).find(k => this.world.boards[k].panel === hit.object); if (id) return this.ui.board(id); }
    const t = -rc.ray.origin.y / rc.ray.direction.y; if (!(t > 0)) return; const pt = rc.ray.origin.clone().addScaledVector(rc.ray.direction, t); let best = null, bd = 20; for (const p of this.city.places) { const d = Math.hypot(p.x - pt.x, p.z - pt.z); if (d < bd) { bd = d; best = p; } }
    // house doors: also match building footprints so tapping a building opens its card
    for (const pr of this.city.properties) { const b = this.city.buildings.find(x => x.id === pr.buildingId); if (b && Math.abs(pt.x - b.x) < b.w / 2 + 2 && Math.abs(pt.z - b.z) < b.d / 2 + 2) { best = this.city.places.find(p => p.id === pr.id); break; } }
    if (best) { this.ui.sfx('ok'); this.ui.place(best.id); } else { this.setWaypoint(pt.x, pt.z, 'Tapped spot'); }
  }
  doAction() {
    if (!this.playing || this.busy) return; if (this.ui.sheetOpen) return; const n = this.nearBoard || null; const np = this.nearest(this.actionRange || 18); if (np) this.ui.place(np.place.id); else if (n) this.ui.board(n);
  }
  setWaypoint(x, z, label) { this.waypoint = { x, z, label }; this.dest.visible = true; this.dest.position.set(x, 0.3, z); }
  /** festivals on right now (heartbeat field fest): a small badge, and one toast per festival per page load */
  festBadge(list) { const el = document.getElementById('festBadge'); if (!el) return; const key = (list || []).map(f => f.id).join(','); if (key === this._fest) return; this._fest = key; el.classList.toggle('hidden', !key); el.textContent = (list || []).map(f => `${f.icon} ${f.name}`).join(' · '); el.dataset.fest = key; this._festSeen ||= new Set(); for (const f of list || []) if (!this._festSeen.has(f.id)) { this._festSeen.add(f.id); this.ui.toast(`${f.icon} ${f.name} is on! See the Events tab on your phone.`); } }
  /** Track G item 5: props and pedestrians as solids, pushable crates, ball throwing, jump buttons. Numbers: server/config/physx.js */
  setupPhysx(city) {
    const X = this.physx = { ...PHYSX, ...(this.cfg.physx || {}) }; this.propSolids = propIndex(this.world.lamps, this.world.palmSpots, X.solids); const props = [], peds = [], none = { props, peds };
    this.ctrl.solids = (x, z, range, y) => { props.length = 0; peds.length = 0; this.propSolids.near(x, z, range, props, y); if (X.ped.enabled) this.walkers.circlesNear(x, z, range, peds); return none; };
    this.pushables = new Pushables(this.scene, city.spawns, this.world.colliders, X); this.throws = new ThrowClient(this);
    const jb = document.getElementById('jumpBtn'); if (jb) { jb.classList.toggle('hidden', !X.jump.enabled); jb.addEventListener('pointerdown', (e) => { this.ctrl.jumpBtn = true; e.preventDefault(); }); const off = () => { this.ctrl.jumpBtn = false; }; jb.addEventListener('pointerup', off); jb.addEventListener('pointercancel', off); jb.addEventListener('pointerleave', off); }
    document.getElementById('throwBtn')?.classList.toggle('hidden', !X.throw.enabled);
  }
  enterHome() { post('/api/property/enter').then(() => this.interior.show(this.user.home.id)).catch(e => this.ui.error(e)); }
  async enterAsVisitor(propertyId) { this.ui.sfx('ok'); await this.interior.show(propertyId, true); }

  // ---- commute: server already charged + moved us; we animate the trip
  runCommute(r, pl, q) {
    this.nav?.cancel('stopped', true);
    this.busy = true; this.ctrl.frozen = true; this.commute = { t0: performance.now(), dur: r.seconds * 1000, from: r.from, to: r.to, mode: r.mode }; $('#commute').classList.remove('hidden');
    $('#commuteTitle').textContent = `${{ keke: '🛺 Keke', danfo: '🚌 Danfo', car: '🚗 Your car', ride: '🚕 Oya Ride' }[r.mode]} to ${pl.name}`; $('#commuteSub').textContent = `${q.traffic}${r.fare ? ' · ' + this.fmt(r.fare) : ''}`; this.ui.sfx('horn'); this.ui.toast(say('travel', r.fare)); this.ctrl.mode = r.mode === 'car' ? 'drive' : 'walk'; this.ctrl.applyMode();
    const dx = r.to.x - r.from.x, dz = r.to.z - r.from.z; this.ctrl.ry = Math.atan2(-dz, dx); this.ctrl.camYaw = this.ctrl.ry; this.net.trail.length = 0;
  }
  fmt(n) { return '₦' + Math.round(n).toLocaleString('en-NG'); }
  stepCommute(now) {
    const c = this.commute; if (!c) return false; const k = Math.min(1, (now - c.t0) / c.dur); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; this.ctrl.x = c.from.x + (c.to.x - c.from.x) * e; this.ctrl.z = c.from.z + (c.to.z - c.from.z) * e; this.ctrl.v = 0;
    this.ctrl.root.position.set(this.ctrl.x, 0, this.ctrl.z); this.ctrl.root.rotation.y = this.ctrl.ry; $('#commuteBar').style.width = (k * 100) + '%';
    if (k >= 1) { this.commute = null; this.busy = false; this.ctrl.frozen = false; this.ctrl.mode = 'walk'; this.ctrl.applyMode(); $('#commute').classList.add('hidden'); this.ctrl.teleport(c.to.x, c.to.z); this.ui.sfx('ok'); this.ui.toast('You have arrived.'); this.net.nudge(); this.waypoint = null; this.dest.visible = false; } return true;
  }

  // ---- main loop
  loop(t0) {
    let last = t0; this.lastSample = 0; const frame = (now) => {
      requestAnimationFrame(frame); const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!this.playing) { this.idleCam(now); this.renderer.render(this.scene, this.camera); return; }
      if (this.interior.open || this.venue.open || this.garage.open) return;
      const sec = this.serverNow() / 1000; this.lightLevel = lampsOn(this.world.night); this.traffic.lightLevel = this.lightLevel; setPlayerHeadlamps(this.ctrl.carObj, this.lightLevel, this.ctrl.mode === 'drive'); this.traffic.update(sec, this.yieldTargets(), dt); this.walkers.update(sec, this.ctrl); this.ghosts.update(this.serverNow() - 1100, this.ctrl); this.world.animate(dt * 1000);
      this.boats?.step(now, dt);
      if (this.air?.flying) this.air.step(now, dt);
      else if (this.boats?.aboard) { /* the boat's chase camera is set in boats.step */ }
      else if (!this.stepCommute(now)) this.ctrl.update(dt); else this.ctrl.placeCamera(this.camera, dt);
      if (!this.commute && !this.air?.flying && !this.boats?.aboard) { this.ctrl.placeCamera(this.camera, dt); if (now - this.lastSample > 250) { this.lastSample = now; this.net.sample({ t: this.serverNow(), x: this.ctrl.x, z: this.ctrl.z, ry: this.ctrl.ry }); } }
      if (this.ctrl.lastTap && !this.ui.sheetOpen && !this.busy) { const tp = this.ctrl.lastTap; this.ctrl.lastTap = null; if (now - tp.t < 400) this.tapPlace(tp.x, tp.y); }
      this.ads.update(this.camera, this.size, this.ctrl, dt * 1000);
      this.nav?.tick(dt); this.parking?.tick(dt * 1000); this.bus?.tick(dt * 1000, now); this.rideSvc?.tick(dt * 1000); this.air?.tick(dt * 1000); this.links?.tick(dt * 1000); this.boats?.tick(dt * 1000); this.radio?.tick(dt * 1000); this.hudStep(now); this.weather?.update(dt, this.camera); this.throws?.update(); this.pushables?.update(dt, this.ctrl); this.ctrl.envScale = this.weather?.speedAt(this.ctrl.x, this.ctrl.z); this.renderer.render(this.scene, this.camera);
    }; requestAnimationFrame(frame);
  }
  idleCam(now) { const a = now / 9000; this.camera.position.set(Math.cos(a) * 70, 38, Math.sin(a) * 70 - 20); this.camera.lookAt(0, 4, -20); this.camera.updateMatrixWorld(); }
  hudStep(now) {
    if (now - (this.hudT || 0) < 200) return; this.hudT = now; const c = this.ctrl; const np = this.nearest(this.actionRange || 18); const nb = this.ads.nearest(c.x, c.z, 30); this.nearBoard = nb;
    const area = this.city.area(c.x, c.z); const road = this.roadName(c.x, c.z); this.ui.loc(`📍 ${np ? np.place.name : road ? road : area}${np || road ? ' · ' + area : ''}`);
    let label = null; if (np && !this.ui.sheetOpen) { const p = np.place; label = { shop: `🛒 ${p.name}`, job: `💼 Work here`, house: `🏠 ${p.name}`, plot: `🌍 ${p.name}`, landmark: `📍 ${p.name}` }[p.type]; if (p.type === 'shop') { const s = this.shops.find(x => x.id === p.id); if (s && !s.status.open) label = `🔒 ${p.name}: ${s.status.text}`; } } else if (nb && !this.ui.sheetOpen) label = '📢 Billboard';
    this.ui.action(this.busy ? null : label); if (this.waypoint) { const d = Math.hypot(this.waypoint.x - c.x, this.waypoint.z - c.z); if (d < 5) { this.waypoint = null; this.dest.visible = false; this.ui.toast('You have arrived.'); } this.ui.waypoint(this.waypoint, d); } else this.ui.waypoint(null);
    if (this.dest.visible) this.dest.scale.setScalar(1 + Math.sin(now / 200) * 0.15); this.ui.minimap(c, this.city, this.ghosts, this.waypoint); if (this.user?.shift) this.ui.hud(this.user);
    this.activity = c.mode;
  }
  onRoad(x, z, slack = 0) { return roadAt(this.city, x, z, slack); }
  roadName(x, z) { const r = roadAt(this.city, x, z); return r ? (r.name || 'On the road') : null; }
}
const game = new Game(); window.__game = game; game.boot();
