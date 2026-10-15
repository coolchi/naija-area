// Spin separate wheel parts. Merged cars have no loose tires, so this only affects the rigs that marked them.
import * as THREE from 'three';

const axis = new THREE.Vector3();
const right = new THREE.Vector3(0, 0, 1);
const quat = new THREE.Quaternion();
const _box = new THREE.Box3();
const _size = new THREE.Vector3();
const _center = new THREE.Vector3();
const _local = new THREE.Vector3();
const _delta = new THREE.Vector3();

/**
 * Move an object's local origin to its world AABB center without shifting the mesh.
 * Sketchfab wheels often pivot far from the hub — without this, spin tumbles instead of rolling.
 */
export function centerPivot(obj) {
  if (!obj?.parent) return;
  obj.updateWorldMatrix(true, true);
  _box.setFromObject(obj);
  _box.getCenter(_center);
  obj.parent.worldToLocal(_local.copy(_center));
  _delta.copy(_local).sub(obj.position);
  // Express the parent-space shift in this object's local space for children
  const invQ = quat.copy(obj.quaternion).invert();
  const localDelta = _delta.clone().applyQuaternion(invQ);
  const sx = obj.scale.x || 1, sy = obj.scale.y || 1, sz = obj.scale.z || 1;
  localDelta.x /= sx; localDelta.y /= sy; localDelta.z /= sz;
  for (const ch of obj.children) ch.position.sub(localDelta);
  obj.position.copy(_local);
  obj.updateMatrixWorld(true);
}

/** Radius from a world AABB: ignore the long axle span (dual L+R tire meshes). */
export function radiusFromBounds(size) {
  const dims = [Math.abs(size.x), Math.abs(size.y), Math.abs(size.z)].sort((a, b) => a - b);
  // two smallest sides ≈ diameter × diameter (or diameter × width); average / 2
  const r = (dims[0] + dims[1]) * 0.25;
  return r > 0.15 ? r : 0.45;
}

/** Call once, at rest. The axle is the car's right (+z), stored in this part's local space. */
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

/** Center the hub, measure radius from the AABB, then tag for smooth rolling. */
export function prepareWheel(obj) {
  centerPivot(obj);
  _box.setFromObject(obj);
  _box.getSize(_size);
  tagWheel(obj, radiusFromBounds(_size));
  return obj;
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
