import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 5, 5);
scene.add(spotLight);

const textureLoader = new THREE.TextureLoader();

const floorGeometry = new THREE.PlaneGeometry(20, 20);
floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

const floorMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load('../assets/floor_texture/Color.jpg'), // Albedo/Base Color
  normalMap: textureLoader.load('../assets/floor_texture/NormalGL.jpg'), // Normal Map (GL version)
  roughnessMap: textureLoader.load('../assets/floor_texture/Roughness.jpg'), // Roughness Map
  displacementMap: textureLoader.load('../assets/floor_texture/Displacement.jpg'), // Displacement Map
  displacementScale: 0.1, // Adjust as needed
  aoMap: textureLoader.load('../assets/floor_texture/AmbientOcclusion.jpg'), // AO Map
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 5, -10);
scene.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Load artwork textures
const artworkTexture1 = new THREE.TextureLoader().load('../assets/paintings/art1.jpg');
const artworkTexture2 = new THREE.TextureLoader().load('../assets/paintings/art2.jpg');
const artworkTexture3 = new THREE.TextureLoader().load('../assets/paintings/art3.jpg');

// Create materials for each artwork
const artworkMaterial1 = new THREE.MeshStandardMaterial({ map: artworkTexture1 });
const artworkMaterial2 = new THREE.MeshStandardMaterial({ map: artworkTexture2 });
const artworkMaterial3 = new THREE.MeshStandardMaterial({ map: artworkTexture3 });

// Geometry (all artworks will share the same geometry)
const artworkGeometry = new THREE.PlaneGeometry(2, 3);

// Artwork meshes
const artwork1 = new THREE.Mesh(artworkGeometry, artworkMaterial1);
artwork1.position.set(-4, 5, -9.9); // Left side of the back wall
scene.add(artwork1);

const artwork2 = new THREE.Mesh(artworkGeometry, artworkMaterial2);
artwork2.position.set(4, 5, -9.9); // Right side of the back wall
scene.add(artwork2);

const artwork3 = new THREE.Mesh(artworkGeometry, artworkMaterial3);
artwork3.position.set(-9.9, 5, 0); // On the left wall
artwork3.rotation.y = Math.PI / 2;
scene.add(artwork3);

const playerSpeed = 0.1;
const keys = {};
let yaw = 0, pitch = 0;

// Lock the pointer to the center of the screen
const canvas = renderer.domElement;
canvas.addEventListener('click', () => {
  canvas.requestPointerLock();
});

// Listen for pointer lock changes
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === canvas) {
    console.log('Pointer locked');
  } else {
    console.log('Pointer unlocked');
  }
});

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

window.addEventListener('mousemove', (e) => {
  // Only update the camera rotation if the pointer is locked
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

  // Save the current Y position (vertical height)
  const fixedY = camera.position.y;

  // Update position based on movement keys
  if (keys['w']) camera.position.addScaledVector(direction, playerSpeed);
  if (keys['s']) camera.position.addScaledVector(direction, -playerSpeed);
  if (keys['a']) camera.position.addScaledVector(new THREE.Vector3(direction.z, 0, -direction.x), playerSpeed);
  if (keys['d']) camera.position.addScaledVector(new THREE.Vector3(-direction.z, 0, direction.x), playerSpeed);

  // Lock the Y position to the fixed height
  camera.position.y = fixedY;
}

function animate() {
  updatePlayer();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
