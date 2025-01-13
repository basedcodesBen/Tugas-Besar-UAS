import * as THREE from 'three';

function addLighting(scene) {
  // Add ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  function addSpotlight(scene, position, targetPosition, color = 0xffffff, intensity = 50, distance = 50) {
    const spotlight = new THREE.SpotLight(color, intensity);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.3;
    spotlight.decay = 2;
    spotlight.distance = distance;
    spotlight.position.copy(position);

    const target = new THREE.Object3D();
    target.position.copy(targetPosition);
    scene.add(target);

    spotlight.target = target;
    scene.add(spotlight);
  }

  // Add spotlights for objects
  addSpotlight(scene, new THREE.Vector3(30, 11, 0), new THREE.Vector3(30, 0, 0)); // Statue
  addSpotlight(scene, new THREE.Vector3(-37, 11, 4), new THREE.Vector3(-39.9, 5, 4)); // Painting 1
  addSpotlight(scene, new THREE.Vector3(-30, 11, 7), new THREE.Vector3(-30, 5, 9.9)); // Painting 2
  addSpotlight(scene, new THREE.Vector3(-37, 11, -5), new THREE.Vector3(-39.9, 5, -5)); // Painting 3
  addSpotlight(scene, new THREE.Vector3(-25.5, 8, -61), new THREE.Vector3(-20.5, 3, -61)); // Statue 2
  addSpotlight(scene, new THREE.Vector3(-37, 8, -60.75), new THREE.Vector3(-38.5, 4.2, -60.75)); // Statue 2
}

export { addLighting };
