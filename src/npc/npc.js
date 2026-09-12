import * as THREE from 'three';

export class NPC {
  constructor(scene, position) {
    this.scene = scene;
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.health = 50;
    this.speed = Math.random() * 0.15 + 0.05;
    this.direction = Math.random() * Math.PI * 2;
    this.changeDirectionTimer = Math.random() * 300 + 100;
    
    this.createModel();
  }
  
  createModel() {
    // Groupe du PNJ
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    
    // Vélo du PNJ (simplifié)
    const frameGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 8);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x0066ff });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    this.group.add(frame);
    
    // Roues avant et arrière
    this.createNPCWheel(-1.2, 0);
    this.createNPCWheel(1.2, 0);
    
    // Arme aléatoire du PNJ
    const weaponType = ['Pistol', 'Shotgun', 'Rifle'][Math.floor(Math.random() * 3)];
    this.weapon = weaponType;
    this.ammo = 50;
    
    this.scene.add(this.group);
  }
  
  createNPCWheel(x, z) {
    const wheelGeometry = new THREE.TorusGeometry(0.8, 0.15, 8, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.4, z);
    wheel.castShadow = true;
    this.group.add(wheel);
  }
  
  update() {
    // Mouvement aléatoire
    this.changeDirectionTimer--;
    
    if (this.changeDirectionTimer <= 0) {
      this.direction = Math.random() * Math.PI * 2;
      this.changeDirectionTimer = Math.random() * 300 + 100;
    }
    
    // Appliquer la vélocité
    this.velocity.x = Math.cos(this.direction) * this.speed;
    this.velocity.z = Math.sin(this.direction) * this.speed;
    
    this.position.add(this.velocity);
    this.group.position.copy(this.position);
    
    // Rotation du PNJ vers sa direction de mouvement
    this.group.rotation.y = this.direction;
  }
  
  shoot() {
    if (this.ammo > 0) {
      this.ammo--;
      console.log(`PNJ tire avec ${this.weapon}`);
    }
  }
  
  takeDamage(damage) {
    this.health -= damage;
    console.log(`PNJ endommagé: ${this.health} HP restants`);
  }
}
