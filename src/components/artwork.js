import * as THREE from 'three';

function addArtworks(scene) {
  const textureLoader = new THREE.TextureLoader();

  const artworkTexture1 = textureLoader.load('/assets/paintings/art1.jpg');
  const artworkTexture2 = textureLoader.load('/assets/paintings/art2.jpg');
  const artworkTexture3 = textureLoader.load('/assets/paintings/art3.jpg');

  const artworkMaterial1 = new THREE.MeshStandardMaterial({ map: artworkTexture1 });
  const artworkMaterial2 = new THREE.MeshStandardMaterial({ map: artworkTexture2 });
  const artworkMaterial3 = new THREE.MeshStandardMaterial({ map: artworkTexture3 });

  const artworkGeometry = new THREE.PlaneGeometry(2, 3);

  const artwork1 = new THREE.Mesh(artworkGeometry, artworkMaterial1);
  artwork1.position.set(-39.9, 5, -5);
  artwork1.rotation.y = Math.PI / 2;
  scene.add(artwork1);

  const artwork2 = new THREE.Mesh(artworkGeometry, artworkMaterial2);
  artwork2.position.set(4, 5, -9.9);
  scene.add(artwork2);

  const artwork3 = new THREE.Mesh(artworkGeometry, artworkMaterial3);
  artwork3.position.set(-39.9, 5, 5);
  artwork3.rotation.y = Math.PI / 2;
  scene.add(artwork3);
}

export { addArtworks };
