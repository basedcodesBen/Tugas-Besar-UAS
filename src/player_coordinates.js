import { camera } from './camera.js';
import * as THREE from 'three';

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.color = 'white';
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '5px';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.fontSize = '12px';
  overlay.style.zIndex = '1000';
  overlay.id = 'player-coordinates-overlay';
  document.body.appendChild(overlay);
  return overlay;
}

function updateOverlay(overlay) {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const position = camera.position;

  overlay.innerHTML = `
    <strong>Player Position:</strong><br>
    x: ${position.x.toFixed(2)}<br>
    y: ${position.y.toFixed(2)}<br>
    z: ${position.z.toFixed(2)}<br><br>
    <strong>Player Direction:</strong><br>
    x: ${direction.x.toFixed(2)}<br>
    y: ${direction.y.toFixed(2)}<br>
    z: ${direction.z.toFixed(2)}
  `;
}

function logPlayerCoordinates() {
  const overlay = createOverlay();

  function update() {
    updateOverlay(overlay);
  }

  // Update overlay at a regular interval
  setInterval(update, 100); // Updates every 100ms
}

export { logPlayerCoordinates };
