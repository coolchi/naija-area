// Simple exhaust/engine smoke for damaged / wrecked cars (client VFX only).
import * as THREE from 'three';

export class CarSmoke {
  constructor(parent) {
    this.root = new THREE.Group(); this.root.name = 'carSmoke';
    this.parts = []; this.t = 0; this.on = false;
    const geo = new THREE.SphereGeometry(0.18, 6, 6);
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.35, depthWrite: false }));
      m.visible = false; this.root.add(m); this.parts.push({ m, life: 0, vx: 0, vy: 0, vz: 0 });
    }
    parent.add(this.root); this.root.position.set(0, 0.9, -0.6);
  }

  set(active, heavy = false) {
    this.on = !!active; this.heavy = !!heavy;
    if (!active) for (const p of this.parts) { p.m.visible = false; p.life = 0; }
  }

  tick(dt) {
    if (!this.on) return; this.t += dt;
    const spawn = this.heavy ? 0.05 : 0.1;
    if (this.t > spawn) {
      this.t = 0;
      const p = this.parts.find((x) => x.life <= 0) || this.parts[0];
      p.life = this.heavy ? 1.4 : 0.9;
      p.m.position.set((Math.random() - 0.5) * 0.25, 0, (Math.random() - 0.5) * 0.2);
      p.vx = (Math.random() - 0.5) * 0.3; p.vy = 0.6 + Math.random() * 0.5; p.vz = (Math.random() - 0.5) * 0.3;
      p.m.material.color.setHex(this.heavy ? 0x333333 : 0x777777);
      p.m.material.opacity = this.heavy ? 0.55 : 0.35; p.m.visible = true; p.m.scale.setScalar(0.7);
    }
    for (const p of this.parts) {
      if (p.life <= 0) continue; p.life -= dt;
      p.m.position.x += p.vx * dt; p.m.position.y += p.vy * dt; p.m.position.z += p.vz * dt;
      p.m.scale.multiplyScalar(1 + 0.8 * dt);
      p.m.material.opacity = Math.max(0, p.life * (this.heavy ? 0.4 : 0.3));
      if (p.life <= 0) p.m.visible = false;
    }
  }

  dispose() { this.root.parent?.remove(this.root); }
}
