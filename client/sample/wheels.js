// Spin separate wheel parts. Merged cars have no loose tires, so this only affects the rigs that marked them.
import * as THREE from 'three';

const axis = new THREE.Vector3();
const right = new THREE.Vector3(0, 0, 1);
const quat = new THREE.Quaternion();

/** Call once, at rest. The axle is the car's right, stored in this part's local space. */
export function tagWheel(obj, radius) {
  obj.updateWorldMatrix(true, true);
  obj.getWorldQuaternion(quat);
  const axle = right.clone().applyQuaternion(quat.invert());
  if (axle.lengthSq() < 1e-8) axle.set(0, 0, 1);
  axle.normalize();
  obj.userData.wheel = 1;
  obj.userData.axle = [axle.x, axle.y, axle.z];
  obj.userData.wheelR = radius > 0.15 ? radius : 0.45;
}

/** meters along the nose. Positive rolls the tires forward. */
export function spinWheels(root, meters) {
  if (!root || !meters) return;
  root.traverse((o) => {
    const a = o.userData && o.userData.axle;
    if (!o.userData || !o.userData.wheel || !a) return;
    axis.set(a[0], a[1], a[2]);
    o.rotateOnAxis(axis, -meters / (o.userData.wheelR || 0.45));
  });
}
