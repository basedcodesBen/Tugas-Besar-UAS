import * as THREE from 'three';

function addLighting(scene) {
  // Tambahkan ambient light untuk pencahayaan umum
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Tambahkan pencahayaan pada setiap tembok menggunakan spotlight

  // Cahaya di tembok depan
  const frontWallLight = new THREE.SpotLight(0xffffff, 1);
  frontWallLight.position.set(0, 5, -9.5);
  frontWallLight.angle = Math.PI / 6;
  frontWallLight.penumbra = 0.3;
  scene.add(frontWallLight);

  // Cahaya di tembok belakang
  const backWallLight = new THREE.SpotLight(0xffffff, 1);
  backWallLight.position.set(0, 5, 9.5);
  backWallLight.angle = Math.PI / 6;
  backWallLight.penumbra = 0.3;
  scene.add(backWallLight);

  // Cahaya di tembok kiri
  const leftWallLight = new THREE.SpotLight(0xffffff, 1);
  leftWallLight.position.set(-9.5, 5, 0);
  leftWallLight.angle = Math.PI / 6;
  leftWallLight.penumbra = 0.3;
  scene.add(leftWallLight);

  // Cahaya di tembok kanan
  const rightWallLight = new THREE.SpotLight(0xffffff, 1);
  rightWallLight.position.set(9.5, 5, 0);
  rightWallLight.angle = Math.PI / 6;
  rightWallLight.penumbra = 0.3;
  scene.add(rightWallLight);
}

export { addLighting };
