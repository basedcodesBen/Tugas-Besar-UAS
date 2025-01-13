import * as THREE from 'three';
import { createFloorMaterial } from './components/floor.js';
import { createWallMaterial } from './components/walls.js';
import { createCeilingMaterial } from './components/ceiling.js';

class RoomBuilder {
  constructor(scene) {
    this.scene = scene;
    this.collidableMeshes = []; // Store walls for collision detection
  }

  addRoom(x, z, width, height, hasOpenings = {}) {
    const floorMaterial = createFloorMaterial();
    const wallMaterial = createWallMaterial();
    const ceilingMaterial = createCeilingMaterial();

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(width, height), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(x, 0, z);
    this.scene.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(width, height), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(x, 10, z);
    this.scene.add(ceiling);

    // Walls
    const wallGeometry = new THREE.PlaneGeometry(width, 10);

    if (!hasOpenings.back) {
      const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
      backWall.position.set(x, 5, z - height / 2);
      this.scene.add(backWall);
      this.collidableMeshes.push(backWall); // Add for collision detection
    }

    if (!hasOpenings.front) {
      const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
      frontWall.rotation.y = Math.PI;
      frontWall.position.set(x, 5, z + height / 2);
      this.scene.add(frontWall);
      this.collidableMeshes.push(frontWall);
    }

    const sideWallGeometry = new THREE.PlaneGeometry(height, 10);

    if (!hasOpenings.left) {
      const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(x - width / 2, 5, z);
      this.scene.add(leftWall);
      this.collidableMeshes.push(leftWall);
    }

    if (!hasOpenings.right) {
      const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(x + width / 2, 5, z);
      this.scene.add(rightWall);
      this.collidableMeshes.push(rightWall);
    }
  }

  addHallway(x, z, length, width, orientation = 'horizontal') {
    const floorMaterial = createFloorMaterial();
    const wallMaterial = createWallMaterial();
    const ceilingMaterial = createCeilingMaterial();

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(length, width), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(x, 0, z);
    this.scene.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(length, width), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(x, 10, z);
    this.scene.add(ceiling);

    // Walls
    if (orientation === 'horizontal') {
        // Horizontal walls
        const wallGeometry = new THREE.PlaneGeometry(length, 10); // Match length for front and back walls
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(x, 5, z - width / 2); // Positioned correctly for horizontal orientation
        this.scene.add(backWall);
        this.collidableMeshes.push(backWall);

        const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
        frontWall.rotation.y = Math.PI;
        frontWall.position.set(x, 5, z + width / 2); // Positioned correctly for horizontal orientation
        this.scene.add(frontWall);
        this.collidableMeshes.push(frontWall);
    } else if (orientation === 'longitudinal') {
        // Longitudinal walls
        const wallGeometry = new THREE.PlaneGeometry(width, 10); // Match width for left and right walls
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(x - length / 2, 5, z); // Positioned correctly for longitudinal orientation
        this.scene.add(leftWall);
        this.collidableMeshes.push(leftWall);

        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.set(x + length / 2, 5, z); // Positioned correctly for longitudinal orientation
        this.scene.add(rightWall);
        this.collidableMeshes.push(rightWall);
    }
  }

  addWall(x, y, z, width, height, rotationY = 0) {
    const wallMaterial = createWallMaterial();
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
    wall.position.set(x, y, z);
    wall.rotation.y = rotationY;
    this.scene.add(wall);
    this.collidableMeshes.push(wall);
    return wall;
  }

  detectCollisions(playerPosition) {
    const playerBox = new THREE.Box3().setFromCenterAndSize(playerPosition, new THREE.Vector3(1, 1, 1));
    for (const mesh of this.collidableMeshes) {
      const meshBox = new THREE.Box3().setFromObject(mesh);
      if (playerBox.intersectsBox(meshBox)) {
        return true;
      }
    }
    return false;
  }
}

export { RoomBuilder };
