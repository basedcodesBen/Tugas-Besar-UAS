import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-30, 5, 0);

const keys = {};
let yaw = -1, pitch = 0;

// Create a raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);

function setupControls(camera, canvas, roomBuilder) {
  canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
  });

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement !== canvas) {
      console.log('Pointer unlocked');
    }
  });

  window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
  window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

  window.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas) {
      yaw -= e.movementX * 0.003;
      pitch -= e.movementY * 0.003;
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      camera.rotation.order = 'YXZ';
      camera.rotation.y = yaw;
      camera.rotation.x = pitch;
    }
  });

  function checkCollisions(newPosition) {
    return roomBuilder.detectCollisions(newPosition);
  }

  function updatePlayer() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const fixedY = camera.position.y;
    const speed = 0.3;

    const movement = new THREE.Vector3();

    if (keys['w']) movement.addScaledVector(direction, speed);
    if (keys['s']) movement.addScaledVector(direction, -speed);
    if (keys['a']) movement.addScaledVector(new THREE.Vector3(direction.z, 0, -direction.x), speed);
    if (keys['d']) movement.addScaledVector(new THREE.Vector3(-direction.z, 0, direction.x), speed);

    const newPosition = camera.position.clone().add(movement);

    // Check for collisions before updating the position
    if (!checkCollisions(newPosition)) {
      camera.position.copy(newPosition);
    }

    camera.position.y = fixedY;
  }

  function animate() {
    updatePlayer();
    requestAnimationFrame(animate);
  }
  animate();
}

// Raycasting utility to detect objects in front of the camera
function detectObjectInFront(objects) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects, true); // Check recursively
  return intersects.length > 0 ? intersects[0].object : null;
}

export { camera, setupControls, detectObjectInFront, keys };
