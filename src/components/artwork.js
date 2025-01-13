import * as THREE from 'three';
import { detectObjectInFront, keys } from '../camera.js';

function addArtworks(scene) {
  const textureLoader = new THREE.TextureLoader();

  const artworkTexture1 = textureLoader.load('/assets/paintings/art1.jpg');
  const artworkTexture2 = textureLoader.load('/assets/paintings/art2.jpg');
  const artworkTexture3 = textureLoader.load('/assets/paintings/art3.jpg');

  const artworkMaterial1 = new THREE.MeshStandardMaterial({ map: artworkTexture1 });
  const artworkMaterial2 = new THREE.MeshStandardMaterial({ map: artworkTexture2 });
  const artworkMaterial3 = new THREE.MeshStandardMaterial({ map: artworkTexture3 });

  const artworkGeometry = new THREE.PlaneGeometry(3, 4);

  const artwork1 = new THREE.Mesh(artworkGeometry, artworkMaterial1);
  artwork1.position.set(-39.7, 5.6, -4.85);
  artwork1.rotation.y = Math.PI / 2;
  artwork1.description = "This is Artwork 1. It represents the beauty of simplicity.";
  scene.add(artwork1);

  const artwork2 = new THREE.Mesh(artworkGeometry, artworkMaterial2);
  artwork2.position.set(-29.9, 5.6, 9.7);
  artwork2.rotation.y = Math.PI;
  artwork2.description = "This is Artwork 2. A vivid portrayal of abstract art.";
  scene.add(artwork2);

  const artwork3 = new THREE.Mesh(artworkGeometry, artworkMaterial3);
  artwork3.position.set(-39.7, 5.6, 4.15);
  artwork3.rotation.y = Math.PI / 2;
  artwork3.description = "This is Artwork 3. A depiction of serene landscapes.";
  scene.add(artwork3);

  const artworks = [artwork1, artwork2, artwork3];

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.position = 'absolute';
  overlay.style.bottom = '20px';
  overlay.style.left = '50%';
  overlay.style.transform = 'translateX(-50%)';
  overlay.style.padding = '10px 20px';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.color = 'white';
  overlay.style.fontSize = '16px';
  overlay.style.display = 'none';
  overlay.style.zIndex = '1000';
  document.body.appendChild(overlay);

  function handleInteraction() {
    const object = detectObjectInFront(artworks);
    if (object && keys['e']) {
      overlay.textContent = object.description || 'No description available.';
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
    requestAnimationFrame(handleInteraction);
  }

  handleInteraction();
}

export { addArtworks };
