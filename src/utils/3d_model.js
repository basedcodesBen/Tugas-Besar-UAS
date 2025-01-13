import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ModelInserter {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
  }

  addModel(modelPath, position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }, rotation = { x: 0, y: 0, z: 0 }) {
    this.loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Set position
        model.position.set(position.x, position.y, position.z);

        // Set scale
        model.scale.set(scale.x, scale.y, scale.z);

        // Set rotation
        model.rotation.set(rotation.x, rotation.y, rotation.z);

        // Add the model to the scene
        this.scene.add(model);

        console.log(`Model loaded successfully from ${modelPath}`);
      },
      (xhr) => {
        console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error(`Error loading model from ${modelPath}:`, error);
      }
    );
  }
}

export { ModelInserter };
