import * as THREE from 'three';

function createCeiling(width, depth, texturePath) {
  const textureLoader = new THREE.TextureLoader();

  const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
  ceilingGeometry.attributes.uv2 = ceilingGeometry.attributes.uv; // Enable AO map support

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(`${texturePath}/Color.jpg`),
    normalMap: textureLoader.load(`${texturePath}/NormalGL.jpg`),
    roughnessMap: textureLoader.load(`${texturePath}/Roughness.jpg`),
    aoMap: textureLoader.load(`${texturePath}/AmbientOcclusion.jpg`),
  });

  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2; // Flip to be horizontal

  return ceiling;
}

export { createCeiling };
