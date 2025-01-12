import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './utils/scene.js';
import { addLighting } from './components/lighting.js';
import { addArtworks } from './components/artwork.js';
import { RoomBuilder } from './roomBuilder.js';
import { logPlayerCoordinates } from './player_coordinates.js';

function main() {
  addLighting(scene);

  const roomBuilder = new RoomBuilder(scene);

  // First section
  roomBuilder.addRoom(-30, 0, 20, 20, { right: true, back: true });
  roomBuilder.addWall(-20, 5, -6.75, 6.5, 10, Math.PI * 1.5);
  roomBuilder.addHallway(0, 0, 40, 7, 'horizontal');
  roomBuilder.addWall(-20, 5, 6.75, 6.5, 10, Math.PI * 1.5);
  roomBuilder.addRoom(30, 0, 20, 20, { left: true });
  roomBuilder.addWall(20, 5, -6.75, 6.5, 10, Math.PI / 2);
  roomBuilder.addWall(20, 5, 6.75, 6.5, 10, Math.PI / 2);

  // Second section
  roomBuilder.addHallway(-25, 20, 7, 40, 'longitudinal');

  addArtworks(scene);

  setupControls(camera, renderer.domElement, roomBuilder);

  logPlayerCoordinates();

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
