import * as THREE from 'three';

function addLighting(scene) {
  // Tambahkan ambient light untuk pencahayaan umum
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  function addWallSpotlight(scene, position, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, 20);
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
  addWallSpotlight(scene, new THREE.Vector3(-4,8,-12), new THREE.Vector3(-4,5,-15));
  addWallSpotlight(scene, new THREE.Vector3(4,8,-12), new THREE.Vector3(4,5,-15));

  // tembok belakang
  addWallSpotlight(scene, new THREE.Vector3(-10, 5, 10), new THREE.Vector3(-10, 5, 9.9));

  // tembok kiri
  addWallSpotlight(scene, new THREE.Vector3(-9, 8, 0), new THREE.Vector3(-8.5, 5, 0));

  // tembok kanan
//   addWallSpotlight(scene, new THREE.Vector3(9.5, 5, 0), new THREE.Vector3(10, 5, 0));
}

export { addLighting };
