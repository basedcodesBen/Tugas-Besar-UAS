import * as THREE from 'three';

function createWallMaterial() {
  const textureLoader = new THREE.TextureLoader();

  return new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/wall_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/wall_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/wall_texture/Roughness.jpg'),
  });
}

function createWallWithCollider(width, height, position, rotationY = 0) {
  const material = createWallMaterial();
  const geometry = new THREE.PlaneGeometry(width, height);

  const wall = new THREE.Mesh(geometry, material);
  wall.position.copy(position);
  wall.rotation.y = rotationY;

  // Create collider
  const collider = new THREE.Box3().setFromObject(wall);

  return { wall, collider };
}

export { createWallMaterial, createWallWithCollider };
