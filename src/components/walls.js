import * as THREE from 'three';

function addWalls(scene) {
  const textureLoader = new THREE.TextureLoader();
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('/assets/wall_texture/Color.jpg'),
    normalMap: textureLoader.load('/assets/wall_texture/NormalGL.jpg'),
    roughnessMap: textureLoader.load('/assets/wall_texture/Roughness.jpg'),
    aoMap: textureLoader.load('/assets/wall_texture/AmbientOcclusion.jpg'),
  });

  const wallGeometry = new THREE.PlaneGeometry(30, 10);

  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.set(0, 5, -15);
  scene.add(backWall);

  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-15, 5, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(15, 5, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);
}

export { addWalls };
