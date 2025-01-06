import {renderer} from './renderer.js';
import {camera, setupControls} from './camera.js';
import {scene} from './scene.js';
import {addLighting} from './lighting.js';
import {addFloor} from './floor.js';
import {addCeiling} from './ceiling.js';
import {addWalls} from './walls.js';
import {addArtworks} from './artwork.js';

function main() {
  // Add objects to the scene
  addLighting(scene);
  addFloor(scene);
  addCeiling(scene);
  addWalls(scene);
  addArtworks(scene);

  // Setup player controls
  setupControls(camera, renderer.domElement);

  // Render loop
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

main();
