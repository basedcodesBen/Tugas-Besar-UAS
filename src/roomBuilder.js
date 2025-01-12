import * as THREE from 'three';
import { createFloorMaterial } from './components/floor';
import { createWallMaterial } from './components/walls';
import { createCeilingMaterial } from './components/ceiling';

class RoomBuilder {
  constructor(scene) {
    this.scene = scene;
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
    }

    if (!hasOpenings.front) {
      const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
      frontWall.rotation.y = Math.PI;
      frontWall.position.set(x, 5, z + height / 2);
      this.scene.add(frontWall);
    }

    const sideWallGeometry = new THREE.PlaneGeometry(height, 10);

    if (!hasOpenings.left) {
      const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(x - width / 2, 5, z);
      this.scene.add(leftWall);
    }

    if (!hasOpenings.right) {
      const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(x + width / 2, 5, z);
      this.scene.add(rightWall);
    }
  }

  // New method for hallways
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
    const wallGeometry = new THREE.PlaneGeometry(width, 10);

    if (orientation === 'longitudinal') {
      const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(x - length / 2, 5, z);
      this.scene.add(leftWall);

      const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(x + length / 2, 5, z);
      this.scene.add(rightWall);
    } else {
      const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
      backWall.position.set(x, 5, z - width / 2);
      this.scene.add(backWall);

      const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
      frontWall.rotation.y = Math.PI;
      frontWall.position.set(x, 5, z + width / 2);
      this.scene.add(frontWall);
    }
  }

  addRoomsWithHallway() {
    // First room
    this.addRoom(-30, 0, 20, 20, { right: true });

    // Hallway
    this.addHallway(0, 0, 40, 5, 'horizontal'); // Narrower hallway

    // Second room
    this.addRoom(30, 0, 20, 20, { left: true });
  }
}

export { RoomBuilder };
