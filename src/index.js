import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './utils/scene.js';
import { addLighting } from './components/lighting.js';
import { addArtworks } from './components/artwork.js';
import { RoomBuilder } from './roomBuilder.js';

function main() {
  addLighting(scene);

  const roomBuilder = new RoomBuilder(scene);
  roomBuilder.addRoomsWithHallway();
  addArtworks(scene);

  setupControls(camera, renderer.domElement);

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
