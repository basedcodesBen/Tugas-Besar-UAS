import * as THREE from 'three';

function addLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  function addArtworkSpotlights(scene, targetPosition) {
    const spotlights = [];

    // Spotlight from the front
    const spotlightFront = new THREE.SpotLight(0xffffff, 10);
    spotlightFront.angle = Math.PI / 6;
    spotlightFront.penumbra = 0.3;
    spotlightFront.decay = 2;
    spotlightFront.distance = 15;
    spotlightFront.position.set(targetPosition.x, targetPosition.y + 2, targetPosition.z + 5);
    spotlights.push(spotlightFront);

    // Spotlight from the left
    const spotlightLeft = new THREE.SpotLight(0xffffff, 10);
    spotlightLeft.angle = Math.PI / 6;
    spotlightLeft.penumbra = 0.3;
    spotlightLeft.decay = 2;
    spotlightLeft.distance = 15;
    spotlightLeft.position.set(targetPosition.x - 5, targetPosition.y + 2, targetPosition.z);
    spotlights.push(spotlightLeft);

    // Spotlight from the right
    const spotlightRight = new THREE.SpotLight(0xffffff, 10);
    spotlightRight.angle = Math.PI / 6;
    spotlightRight.penumbra = 0.3;
    spotlightRight.decay = 2;
    spotlightRight.distance = 15;
    spotlightRight.position.set(targetPosition.x + 5, targetPosition.y + 2, targetPosition.z);
    spotlights.push(spotlightRight);

    // Attach all spotlights to their target
    const target = new THREE.Object3D();
    target.position.copy(targetPosition);
    scene.add(target);

    spotlights.forEach((spotlight) => {
      spotlight.target = target;
      scene.add(spotlight);
    });
  }

  // Add spotlights for each artwork
  addArtworkSpotlights(scene, new THREE.Vector3(-4, 5.5, -9.9));
  addArtworkSpotlights(scene, new THREE.Vector3(4, 5.5, -9.9));
  addArtworkSpotlights(scene, new THREE.Vector3(-4, 5, -9.9)); // For artwork3
}

export { addLighting };
