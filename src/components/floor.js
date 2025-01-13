import * as THREE from 'three';

function createFloorMaterial() {
  const textureLoader = new THREE.TextureLoader();

  return new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/floor_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/floor_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/floor_texture/Roughness.jpg'),
    aoMap: textureLoader.load('/assets/floor_texture/AmbientOcclusion.jpg'),
  });
}

export { createFloorMaterial };