import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 5, 5);
scene.add(spotLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
const wallGeometry = new THREE.PlaneGeometry(20, 10);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 5, -10);
scene.add(backWall);

const artworkTexture = new THREE.TextureLoader().load('../assets/textures/art1.jpg');
const artworkMaterial = new THREE.MeshStandardMaterial({ map: artworkTexture });
const artworkGeometry = new THREE.PlaneGeometry(2, 3);

const artwork = new THREE.Mesh(artworkGeometry, artworkMaterial);
artwork.position.set(0, 5, -9.9); 
scene.add(artwork);

const playerSpeed = 0.1;
const keys = {};
let yaw = 0, pitch = 0;

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
window.addEventListener('mousemove', (e) => {
  yaw -= e.movementX * 0.002;
  pitch -= e.movementY * 0.002;
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
});

function updatePlayer() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);

  if (keys['w']) camera.position.addScaledVector(direction, playerSpeed);
  if (keys['s']) camera.position.addScaledVector(direction, -playerSpeed);
  if (keys['a']) camera.position.addScaledVector(new THREE.Vector3(direction.z, 0, -direction.x), playerSpeed);
  if (keys['d']) camera.position.addScaledVector(new THREE.Vector3(-direction.z, 0, direction.x), playerSpeed);
}

function animate() {
  updatePlayer();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
