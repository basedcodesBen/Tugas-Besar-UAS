import * as THREE from 'three';

function addLighting(scene) {
  // Tambahkan ambient light untuk pencahayaan umum
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  function addWallSpotlight(scene, position, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, 10);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.3;
    spotlight.decay = 2;
    spotlight.distance = 15;
    spotlight.position.copy(position);

    const target = new THREE.Object3D();
    target.position.copy(targetPosition);
    scene.add(target);

    spotlight.target = target;
    scene.add(spotlight);
  }
  // tembok depan
  addWallSpotlight(scene, new THREE.Vector3(-4,8,-9.5), new THREE.Vector3(-4,5,-10));
  addWallSpotlight(scene, new THREE.Vector3(4,8,-9.5), new THREE.Vector3(4,5,-10));

  // tembok belakang
  addWallSpotlight(scene, new THREE.Vector3(0, 5, 9.5), new THREE.Vector3(0, 2, 10));

  // tembok kiri
  addWallSpotlight(scene, new THREE.Vector3(-9, 8, 0), new THREE.Vector3(-8.5, 5, 0));

  // tembok kanan
//   addWallSpotlight(scene, new THREE.Vector3(9.5, 5, 0), new THREE.Vector3(10, 5, 0));
}

export { addLighting };
