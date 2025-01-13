import * as THREE from 'three';

function createCeilingMaterial() {
  const textureLoader = new THREE.TextureLoader();

  return new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/ceiling_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/ceiling_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/ceiling_texture/Roughness.jpg'),
    aoMap: textureLoader.load('/assets/ceiling_texture/AmbientOcclusion.jpg'),
  });
}

export { createCeilingMaterial };
