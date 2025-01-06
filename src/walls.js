import * as THREE from 'three';

function addWalls(scene) {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const wallGeometry = new THREE.PlaneGeometry(30, 10);

  // Back Wall
  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.set(0, 5, -10);
  scene.add(backWall);

  // Left Wall
  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-15, 5, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(15, 5, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  const hall1Wall = new THREE.Mesh(wallGeometry, wallMaterial);
  hall1Wall.position.set()
}

export { addWalls };