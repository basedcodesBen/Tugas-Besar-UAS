import * as THREE from 'three';

function addLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function addArtworkSpotlight(scene, targetPosition) {
    // Spotlight
    const spotlight = new THREE.SpotLight(0xffffff, 10); 
    spotlight.angle = Math.PI / 6; 
    spotlight.penumbra = 0.3; 
    spotlight.decay = 2; 
    spotlight.distance = 15; 
  
    // Position the spotlight in front of the artwork
    spotlight.position.set(targetPosition.x, targetPosition.y + 2, targetPosition.z + 2);
  
    // Target the artwork
    const target = new THREE.Object3D();
    target.position.copy(targetPosition);
    scene.add(target);
  
    spotlight.target = target; 
    scene.add(spotlight);
  
    // Optional: Enable shadows for the spotlight
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024; 
    spotlight.shadow.mapSize.height = 1024;
  }  

    // Add spotlights for each painting
    addArtworkSpotlight(scene, new THREE.Vector3(-4, 5, -9.9)); 
    addArtworkSpotlight(scene, new THREE.Vector3(4, 5, -9.9));  
    addArtworkSpotlight(scene, new THREE.Vector3(-9.9, 5, 0));  // For artwork3
}

export { addLighting };