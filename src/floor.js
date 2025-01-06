import * as THREE from 'three';

function addFloor(scene) {
  const textureLoader = new THREE.TextureLoader();
  const floorGeometry = new THREE.PlaneGeometry(30, 30);
  floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../assets/floor_texture/Color.jpg'),
    normalMap: textureLoader.load('../assets/floor_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('../assets/floor_texture/Roughness.jpg'),
    displacementMap: textureLoader.load('../assets/floor_texture/Displacement.jpg'),
    displacementScale: 0.1,
    aoMap: textureLoader.load('../assets/floor_texture/AmbientOcclusion.jpg'),
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
}

export { addFloor };