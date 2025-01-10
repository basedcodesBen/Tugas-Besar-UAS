import * as THREE from 'three';

class RoomBuilder {
  constructor(scene) {
    this.scene = scene;
    this.textureLoader = new THREE.TextureLoader();
  }

  addRoom(x, z, width, height) {
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load('/assets/floor_texture/Color.jpg'),
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load('/assets/wall_texture/Color.jpg'),
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load('/assets/ceiling_texture/Color.jpg'),
    });

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

    // Walls (back, front, left, right)
    const wallGeometry = new THREE.PlaneGeometry(width, 10);

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(x, 5, z - height / 2);
    this.scene.add(backWall);
  }
}

export { RoomBuilder };
