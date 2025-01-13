import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './utils/scene.js';
import { addLighting } from './components/lighting.js';
import { addArtworks } from './components/artwork.js';
import { RoomBuilder } from './roomBuilder.js';
import { logPlayerCoordinates } from './player_coordinates.js';
import { ModelInserter } from './utils/3d_model.js';

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
  roomBuilder.addHallway(-30, -30, 7, 40, 'longitudinal');
  roomBuilder.addWall(-23.25, 5, -10, 6.5, 10, Math.PI*2);
  roomBuilder.addWall(-36.75, 5, -10, 6.5, 10, Math.PI*2);
  roomBuilder.addRoom(-30, -60, 20, 20, { front: true });
  roomBuilder.addWall(-23.25, 5, -50, 6.5, 10, Math.PI);
  roomBuilder.addWall(-36.75, 5, -50, 6.5, 10, Math.PI);


  addArtworks(scene);

  // Create an instance of ModelInserter
  const modelInserter = new ModelInserter(scene);

  // Patung
  modelInserter.addModel(
    './models/graveyard_angel_statue.glb',        // Path to your GLTF model
    { x: 30, y: 0, z: 0 },        // Position of the model
    { x: 0.4, y: 0.4, z: 0.4 },        // Scale of the model
    { x: 0, y: Math.PI * 1.75, z: 0 } // Rotation of the model
  );

  // artwork 3
  modelInserter.addModel(
    './models/painting_patched_up.glb',        
    { x: -39.9, y: 5, z: 4 },        
    { x: 4.5, y: 4, z: 4 },        
    { x: 0, y: Math.PI / 2, z: 0 } 
  );

  // artwork 2
  modelInserter.addModel(
    './models/painting_patched_up.glb',        
    { x: -30, y: 5, z: 9.9 },        
    { x: 4.5, y: 4, z: 4 }, 
    { x: 0, y: Math.PI, z: 0 }
  );

  // artwork 1
  modelInserter.addModel(
    './models/painting_patched_up.glb',        
    { x: -39.9, y: 5, z: -5 },        
    { x: 4.5, y: 4, z: 4 }, 
    { x: 0, y: Math.PI / 2, z: 0 }
  );

  setupControls(camera, renderer.domElement, roomBuilder);

  logPlayerCoordinates();

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
