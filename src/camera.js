import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);

const keys = {};
let yaw = 0, pitch = 0;

function setupControls(camera, canvas) {
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
      yaw -= e.movementX * 0.002;
      pitch -= e.movementY * 0.002;
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      camera.rotation.order = 'YXZ';
      camera.rotation.y = yaw;
      camera.rotation.x = pitch;
    }
  });

  function updatePlayer() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const fixedY = camera.position.y;
    const speed = 0.1;

    if (keys['w']) camera.position.addScaledVector(direction, speed);
    if (keys['s']) camera.position.addScaledVector(direction, -speed);
    if (keys['a']) camera.position.addScaledVector(new THREE.Vector3(direction.z, 0, -direction.x), speed);
    if (keys['d']) camera.position.addScaledVector(new THREE.Vector3(-direction.z, 0, direction.x), speed);

    camera.position.y = fixedY;
  }

  function animate() {
    updatePlayer();
    requestAnimationFrame(animate);
  }
  animate();
}

export { camera, setupControls };