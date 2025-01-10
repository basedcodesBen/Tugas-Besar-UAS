import * as THREE from 'three';

function addCeiling(scene) {
  const textureLoader = new THREE.TextureLoader();
  const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
  
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/ceiling_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/ceiling_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/ceiling_texture/Roughness.jpg'),
    aoMap: textureLoader.load('/assets/ceiling_texture/AmbientOcclusion.jpg'),
  });

  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, 10, 0);
  scene.add(ceiling);
}

export { addCeiling };
