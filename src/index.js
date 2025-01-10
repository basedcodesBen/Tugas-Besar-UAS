import { renderer } from './renderer.js';
import { camera, setupControls } from './camera.js';
import { scene } from './scene.js';
import { addLighting } from './lighting.js';
import { addArtworks } from './artwork.js';
import { RoomBuilder } from './roomBuilder.js'; // Import RoomBuilder

function main() {
  // Add lighting and artworks
  addLighting(scene);
  addArtworks(scene);

  // Build the rooms and hallways using RoomBuilder
  const roomBuilder = new RoomBuilder(scene);
  
  // Example: Creating a main room
  roomBuilder.createRoom({
    floorTexture: '../assets/floor_texture/',
    wallTexture: '../assets/wall_texture/',
    ceilingTexture: '../assets/ceiling_texture/',
    position: { x: 0, y: 0, z: 0 },
    size: { width: 30, depth: 30, height: 10 },
  });

  // Example: Adding a connected hallway
  roomBuilder.createRoom({
    floorTexture: '../assets/floor_texture/',
    wallTexture: '../assets/wall_texture/',
    ceilingTexture: '../assets/ceiling_texture/',
    position: { x: 30, y: 0, z: 0 },
    size: { width: 15, depth: 10, height: 10 },
  });

  // Example: Adding another room connected to the hallway
  roomBuilder.createRoom({
    floorTexture: '../assets/floor_texture/',
    wallTexture: '../assets/wall_texture/',
    ceilingTexture: '../assets/ceiling_texture/',
    position: { x: 45, y: 0, z: 0 },
    size: { width: 30, depth: 30, height: 10 },
  });

  // Set up camera controls
  setupControls(camera, renderer.domElement);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

// Start the application
main();
