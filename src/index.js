import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './utils/scene.js';
import { addLighting } from './components/lighting.js';
import { addArtworks } from './components/artwork.js';
import { RoomBuilder } from './roomBuilder.js';
import { logPlayerCoordinates } from './player_coordinates.js';
import { ModelInserter } from './utils/3d_model.js';

function main() {
  // Add lighting to the scene
  addLighting(scene);

  // Build the room structure
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
  roomBuilder.addHallway(-30, -30, 7, 40, 'longitudinal');
  roomBuilder.addWall(-23.25, 5, -10, 6.5, 10, Math.PI * 2);
  roomBuilder.addWall(-36.75, 5, -10, 6.5, 10, Math.PI * 2);
  roomBuilder.addRoom(-30, -60, 20, 20, { front: true });
  roomBuilder.addWall(-23.25, 5, -50, 6.5, 10, Math.PI);
  roomBuilder.addWall(-36.75, 5, -50, 6.5, 10, Math.PI);

  // Add artworks to the scene
  addArtworks(scene);

  // Add 3D models to the scene
  const modelInserter = new ModelInserter(scene);

  // Statue
  modelInserter.addModel(
    './models/graveyard_angel_statue.glb',
    { x: 30, y: 0, z: 0 },
    { x: 0.4, y: 0.4, z: 0.4 },
    { x: 0, y: Math.PI * 1.75, z: 0 }
  );

  // Artwork models
  modelInserter.addModel(
    './models/painting_patched_up.glb',
    { x: -39.9, y: 5, z: 4 },
    { x: 4.5, y: 4, z: 4 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  modelInserter.addModel(
    './models/painting_patched_up.glb',
    { x: -30, y: 5, z: 9.9 },
    { x: 4.5, y: 4, z: 4 },
    { x: 0, y: Math.PI, z: 0 }
  );

  modelInserter.addModel(
    './models/painting_patched_up.glb',
    { x: -39.9, y: 5, z: -5 },
    { x: 4.5, y: 4, z: 4 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  modelInserter.addModel(
    './models/rectangle.glb',
    { x: -23, y: 0, z: -60 },
    { x: 1, y: 0.95, z: 1 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  modelInserter.addModel(
    './models/statue.glb',
    { x: -20.5, y: 4.2, z: -61.7 },
    { x: 1.5, y: 1.5, z: 1.5 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  modelInserter.addModel(
    './models/rectangle.glb',
    { x: -39, y: 0, z: -60 },
    { x: 1, y: 0.95, z: 1 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  modelInserter.addModel(
    './models/head_statue.glb',
    { x: -38.5, y: 6.25, z: -60.75 },
    { x: 110, y: 110, z: 110 },
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  // Set up controls and start the animation loop
  setupControls(camera, renderer.domElement, roomBuilder);

  // Log player coordinates for debugging
  logPlayerCoordinates();

  // Main render loop
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
