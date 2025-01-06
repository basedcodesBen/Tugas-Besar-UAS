import { addFloor } from './floor.js';
import { addCeiling } from './ceiling.js';
import { addWalls } from './walls.js';

export function createRoom(scene, position, width, depth, height, textures) {
  const { floorTexture, ceilingTexture, wallTexture } = textures;

  // Floor
  addFloor(scene, position, width, depth, floorTexture);

  // Ceiling
  const ceilingPosition = position.clone();
  ceilingPosition.y += height;
  addCeiling(scene, ceilingPosition, width, depth, ceilingTexture);

  // Walls
  addWalls(scene, position, width, depth, height, wallTexture);
}
