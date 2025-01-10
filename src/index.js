import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './utils/scene.js';
import { addLighting } from './components/lighting.js';
import { addFloor } from './components/floor.js';
import { addCeiling } from './components/ceiling.js';
import { addWalls } from './components/walls.js';
import { addArtworks } from './components/artwork.js';
import { RoomBuilder } from './roomBuilder.js';

function main() {
  addLighting(scene);

  const roomBuilder = new RoomBuilder(scene);
  roomBuilder.addRoom(0, 0, 30, 10); // Example room
  addArtworks(scene);

  setupControls(camera, renderer.domElement);

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
