import * as THREE from 'three';

export class Car {
  constructor(scene, position) {
    this.scene = scene;
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.velocity = new THREE.Vector3(0.3, 0, 0);
    this.health = 100;
    this.speed = 0.3;
    
    this.createModel();
  }
  
  createModel() {
    // Carrosserie
    const bodyGeometry = new THREE.BoxGeometry(2, 1.5, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.body.position.copy(this.position);
    this.body.castShadow = true;
    this.scene.add(this.body);
    
    // Roues
    this.createCarWheel(-1, -0.8, -1);
    this.createCarWheel(1, -0.8, -1);
    this.createCarWheel(-1, -0.8, 1);
    this.createCarWheel(1, -0.8, 1);
  }
  
  createCarWheel(x, y, z) {
    const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(
      this.body.position.x + x,
      this.body.position.y + y,
      this.body.position.z + z
    );
    wheel.castShadow = true;
    this.scene.add(wheel);
  }
  
  update() {
    this.position.add(this.velocity);
    this.body.position.copy(this.position);
  }
}
