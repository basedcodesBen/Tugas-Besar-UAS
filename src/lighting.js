import * as THREE from 'three';

function addLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  function addArtworkSpotlight(scene, targetPosition) {
    const spotlightFront = new THREE.SpotLight(0xffffff, 10); 
    spotlightFront.angle = Math.PI / 6; 
    spotlightFront.penumbra = 0.3; 
    spotlightFront.decay = 2; 
    spotlightFront.distance = 15; 
  
    spotlightFront.position.set(targetPosition.x, targetPosition.y + 2, targetPosition.z + 2);

    const target = new THREE.Object3D();
    target.position.copy(targetPosition);
    scene.add(target);
  
    spotlightFront.target = target; 
    scene.add(spotlightFront);

    const spotlightLeft = new THREE.SpotLight(0xffffff, 10);
    spotlightFront.angle = Math.PI / 6; 
    spotlightFront.penumbra = 0.3; 
    spotlightFront.decay = 2; 
    spotlightFront.distance = 15; 

    spotlightFront.position.set(targetPosition.x, targetPosition.y + 2, targetPosition.z + 2);
  }  

    addArtworkSpotlight(scene, new THREE.Vector3(-4, 5.5, -9.9)); 
    addArtworkSpotlight(scene, new THREE.Vector3(4, 5.5, -9.9));  
    addArtworkSpotlight(scene, new THREE.Vector3(-4, 5, -9.9));  // For artwork3
}

export { addLighting };