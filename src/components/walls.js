import * as THREE from 'three';

function createWallMaterial() {
  const textureLoader = new THREE.TextureLoader();

  return new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/wall_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/wall_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/wall_texture/Roughness.jpg'),
  });
}

export { createWallMaterial };
