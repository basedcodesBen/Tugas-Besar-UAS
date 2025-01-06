import * as THREE from 'three';

function addLighting(scene) {
  // Tambahkan ambient light untuk pencahayaan umum
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Tambahkan pencahayaan pada setiap tembok

  // Cahaya di tembok depan
  const frontWallLight = new THREE.PointLight(0xffffff, 1, 20);
  frontWallLight.position.set(0, 5, -9.5);
  scene.add(frontWallLight);

  // Cahaya di tembok belakang
  const backWallLight = new THREE.PointLight(0xffffff, 1, 20);
  backWallLight.position.set(0, 5, 9.5);
  scene.add(backWallLight);

  // Cahaya di tembok kiri
  const leftWallLight = new THREE.PointLight(0xffffff, 1, 20);
  leftWallLight.position.set(-9.5, 5, 0);
  scene.add(leftWallLight);

  // Cahaya di tembok kanan
  const rightWallLight = new THREE.PointLight(0xffffff, 1, 20);
  rightWallLight.position.set(9.5, 5, 0);
  scene.add(rightWallLight);
}

export { addLighting };
