import * as THREE from 'three';

function addCeiling(scene) {
  const textureLoader = new THREE.TextureLoader();
  const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
  ceilingGeometry.attributes.uv2 = ceilingGeometry.attributes.uv; // Enable AO map support

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../assets/ceiling_texture/Color.jpg'), // Albedo/Base Color
    normalMap: textureLoader.load('../assets/ceiling_texture/NormalGL.jpg'), // Normal Map
    roughnessMap: textureLoader.load('../assets/ceiling_texture/Roughness.jpg'), // Roughness Map
    aoMap: textureLoader.load('../assets/ceiling_texture/AmbientOcclusion.jpg'), // AO Map
  });

  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2; // Flip to be horizontal
  ceiling.position.set(0, 10, 0); // Position it above the scene
  scene.add(ceiling);
}

export { addCeiling };