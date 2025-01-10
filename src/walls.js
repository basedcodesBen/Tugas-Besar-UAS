import * as THREE from 'three';

function createWalls(width, depth, height, texturePath) {
  const textureLoader = new THREE.TextureLoader();
  const wallGeometry = new THREE.PlaneGeometry(width, height);

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(`${texturePath}/Color.jpg`),
    normalMap: textureLoader.load(`${texturePath}/NormalGL.jpg`),
    roughnessMap: textureLoader.load(`${texturePath}/Roughness.jpg`),
    aoMap: textureLoader.load(`${texturePath}/AmbientOcclusion.jpg`),
  });

  const walls = [];

  // Back Wall
  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.set(0, height / 2, -depth / 2);
  walls.push(backWall);

  // Left Wall
  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-width / 2, height / 2, 0);
  leftWall.rotation.y = Math.PI / 2;
  walls.push(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(width / 2, height / 2, 0);
  rightWall.rotation.y = -Math.PI / 2;
  walls.push(rightWall);

  // Front Wall
  const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
  frontWall.position.set(0, height / 2, depth / 2);
  frontWall.rotation.y = Math.PI;
  walls.push(frontWall);

  return walls;
}

export { createWalls };
