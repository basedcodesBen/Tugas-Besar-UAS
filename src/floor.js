import * as THREE from 'three';

function createFloor(width, depth, texturePath) {
  const textureLoader = new THREE.TextureLoader();

  const floorGeometry = new THREE.PlaneGeometry(width, depth);
  floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(`${texturePath}/Color.jpg`),
    normalMap: textureLoader.load(`${texturePath}/NormalGL.jpg`),
    roughnessMap: textureLoader.load(`${texturePath}/Roughness.jpg`),
    displacementMap: textureLoader.load(`${texturePath}/Displacement.jpg`),
    displacementScale: 0.1,
    aoMap: textureLoader.load(`${texturePath}/AmbientOcclusion.jpg`),
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;

  return floor;
}

export { createFloor };
