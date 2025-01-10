import * as THREE from 'three';

// Import textures directly
import floorColor from '../assets/floor_texture/Color.jpg';
import floorNormal from '../assets/floor_texture/NormalGL.jpg';
import floorRoughness from '../assets/floor_texture/Roughness.jpg';
import floorDisplacement from '../assets/floor_texture/Displacement.jpg';
import floorAO from '../assets/floor_texture/AmbientOcclusion.jpg';

import wallColor from '../assets/wall_texture/Color.jpg';
import wallNormal from '../assets/wall_texture/NormalGL.jpg';
import wallRoughness from '../assets/wall_texture/Roughness.jpg';
import wallAO from '../assets/wall_texture/AmbientOcclusion.jpg';

import ceilingColor from '../assets/ceiling_texture/Color.jpg';
import ceilingNormal from '../assets/ceiling_texture/NormalGL.jpg';
import ceilingRoughness from '../assets/ceiling_texture/Roughness.jpg';
import ceilingAO from '../assets/ceiling_texture/AmbientOcclusion.jpg';

class RoomBuilder {
  constructor(scene) {
    this.scene = scene;
    this.defaultTextures = {
      floor: {
        color: floorColor,
        normal: floorNormal,
        roughness: floorRoughness,
        displacement: floorDisplacement,
        ao: floorAO,
      },
      wall: {
        color: wallColor,
        normal: wallNormal,
        roughness: wallRoughness,
        ao: wallAO,
      },
      ceiling: {
        color: ceilingColor,
        normal: ceilingNormal,
        roughness: ceilingRoughness,
        ao: ceilingAO,
      },
    };
  }

  createMaterial(textureSet, isPlane = false) {
    const materialConfig = {
      map: new THREE.TextureLoader().load(textureSet.color),
      normalMap: new THREE.TextureLoader().load(textureSet.normal),
      roughnessMap: new THREE.TextureLoader().load(textureSet.roughness),
      aoMap: new THREE.TextureLoader().load(textureSet.ao),
    };

    if (isPlane && textureSet.displacement) {
      materialConfig.displacementMap = new THREE.TextureLoader().load(textureSet.displacement);
      materialConfig.displacementScale = 0.1;
    }

    return new THREE.MeshStandardMaterial(materialConfig);
  }

  createRoom({
    floorTexture = this.defaultTextures.floor,
    wallTexture = this.defaultTextures.wall,
    ceilingTexture = this.defaultTextures.ceiling,
    position = { x: 0, y: 0, z: 0 },
    size = { width: 30, depth: 30, height: 10 },
  }) {
    const { width, depth, height } = size;

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const floorMaterial = this.createMaterial(floorTexture, true);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(position.x, position.y, position.z);
    this.scene.add(floor);

    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingMaterial = this.createMaterial(ceilingTexture, false);
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(position.x, position.y + height, position.z);
    this.scene.add(ceiling);

    // Walls
    const wallMaterial = this.createMaterial(wallTexture, false);

    const wallGeometry = new THREE.PlaneGeometry(width, height);

    // Back Wall
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(position.x, position.y + height / 2, position.z - depth / 2);
    this.scene.add(backWall);

    // Front Wall
    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(position.x, position.y + height / 2, position.z + depth / 2);
    frontWall.rotation.y = Math.PI;
    this.scene.add(frontWall);

    const sideWallGeometry = new THREE.PlaneGeometry(depth, height);

    // Left Wall
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.set(position.x - width / 2, position.y + height / 2, position.z);
    leftWall.rotation.y = Math.PI / 2;
    this.scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.set(position.x + width / 2, position.y + height / 2, position.z);
    rightWall.rotation.y = -Math.PI / 2;
    this.scene.add(rightWall);
  }
}

export { RoomBuilder };
