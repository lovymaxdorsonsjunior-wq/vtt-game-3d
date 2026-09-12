import * as THREE from 'three';
import { BikeTypes } from './bikeTypes';

export class Player {
  constructor(scene, startPosition) {
    this.scene = scene;
    this.position = new THREE.Vector3(startPosition.x, startPosition.y, startPosition.z);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.rotation = 0;
    
    // Argent illimité
    this.money = Infinity;
    
    // Vélos disponibles (Bikes Républic)
    this.bikes = {
      'Mountain': { speed: 30, acceleration: 2, handling: 0.8 },
      'Road': { speed: 45, acceleration: 1.5, handling: 0.6 },
      'BMX': { speed: 25, acceleration: 3, handling: 0.95 },
      'E-Bike': { speed: 50, acceleration: 2.5, handling: 0.7 },
      'Downhill': { speed: 35, acceleration: 2, handling: 0.85 }
    };
    
    this.currentBike = 'Mountain';
    this.bikeStats = this.bikes[this.currentBike];
    
    // Armes
    this.weapons = {
      'Pistol': { damage: 25, fireRate: 1, range: 100 },
      'Shotgun': { damage: 60, fireRate: 0.5, range: 50 },
      'Rifle': { damage: 50, fireRate: 1.5, range: 300 },
      'Rocket Launcher': { damage: 150, fireRate: 0.2, range: 200 }
    };
    
    this.currentWeapon = 'Pistol';
    this.ammo = { Pistol: 999, Shotgun: 999, Rifle: 999, 'Rocket Launcher': 999 };
    
    // État du joueur
    this.health = 100;
    this.stamina = 100;
    this.isJumping = false;
    this.isPedaling = false;
    this.isDraining = false; // Boost d'agilité
    
    // Créer le modèle du vélo
    this.createBike();
    
    // Contrôles actifs
    this.controls = {
      accelerate: false,
      brake: false,
      jump: false,
      drain: false,
      shoot: false
    };
  }
  
  createBike() {
    // Groupe principal du vélo
    this.bikeGroup = new THREE.Group();
    this.bikeGroup.position.copy(this.position);
    
    // Cadre du vélo
    const frameGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xff4400, metalness: 0.8 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    frame.receiveShadow = true;
    this.bikeGroup.add(frame);
    
    // Roues
    this.createWheel(-1.5, 0);
    this.createWheel(1.5, 0);
    
    // Guidon
    const handlebarGeometry = new THREE.BoxGeometry(1.5, 0.3, 0.3);
    const handlebar = new THREE.Mesh(handlebarGeometry, frameMaterial);
    handlebar.position.y = 1.2;
    handlebar.castShadow = true;
    this.bikeGroup.add(handlebar);
    
    // Selle
    const saddleGeometry = new THREE.BoxGeometry(0.4, 0.2, 1);
    const saddleMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const saddle = new THREE.Mesh(saddleGeometry, saddleMaterial);
    saddle.position.y = 0.8;
    saddle.castShadow = true;
    this.bikeGroup.add(saddle);
    
    this.scene.add(this.bikeGroup);
  }
  
  createWheel(x, z) {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, 0.5, z);
    
    // Jante
    const rimGeometry = new THREE.TorusGeometry(1, 0.2, 8, 32);
    const rimMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9 });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.y = Math.PI / 2;
    rim.castShadow = true;
    wheelGroup.add(rim);
    
    // Pneu
    const tireGeometry = new THREE.TorusGeometry(1.1, 0.3, 16, 100);
    const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const tire = new THREE.Mesh(tireGeometry, tireMaterial);
    tire.rotation.y = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);
    
    this.bikeGroup.add(wheelGroup);
  }
  
  update(inputManager) {
    // Récupérer les entrées
    this.controls.accelerate = inputManager.isKeyPressed('KeyA'); // A pour pédaler
    this.controls.brake = inputManager.isKeyPressed('KeyB');       // B pour freiner
    this.controls.jump = inputManager.isKeyPressed('KeyX');        // X pour sauter
    this.controls.drain = inputManager.isKeyPressed('KeyD');       // D pour drain (boost)
    this.controls.shoot = inputManager.isMousePressed();           // Souris pour tirer
    
    // Mise à jour de la vélocité
    this.updateVelocity();
    
    // Mise à jour de la position
    this.position.add(this.velocity);
    this.bikeGroup.position.copy(this.position);
    
    // Mise à jour des statistiques
    this.updateStamina();
    this.updateHealth();
    
    // Rotation du vélo selon la direction
    this.updateRotation(inputManager);
    
    // Gestion du saut
    if (this.controls.jump && !this.isJumping) {
      this.performJump();
    }
    
    // Gestion des armes
    if (this.controls.shoot) {
      this.shoot();
    }
  }
  
  updateVelocity() {
    const maxSpeed = this.bikeStats.speed / 100;
    const acceleration = this.bikeStats.acceleration / 100;
    
    if (this.controls.accelerate) {
      this.velocity.z = Math.min(this.velocity.z + acceleration, maxSpeed);
    } else if (this.controls.brake) {
      this.velocity.z *= 0.95;
    } else {
      this.velocity.z *= 0.98;
    }
    
    // Boost de drain (rapidité)
    if (this.controls.drain && this.stamina > 20) {
      this.velocity.z *= 1.2;
      this.stamina -= 0.5;
    }
  }
  
  updateRotation(inputManager) {
    if (inputManager.isKeyPressed('KeyD')) { // Tourner à droite
      this.rotation += 0.02;
    }
    if (inputManager.isKeyPressed('KeyQ')) { // Tourner à gauche
      this.rotation -= 0.02;
    }
    
    this.bikeGroup.rotation.y = this.rotation;
  }
  
  performJump() {
    this.isJumping = true;
    this.velocity.y = 0.5;
    
    setTimeout(() => {
      this.isJumping = false;
    }, 600);
  }
  
  shoot() {
    const weapon = this.weapons[this.currentWeapon];
    
    if (this.ammo[this.currentWeapon] > 0) {
      this.ammo[this.currentWeapon]--;
      
      // Créer un projectile
      const projectile = this.createProjectile();
      
      console.log(`Tir: ${this.currentWeapon} | Dégâts: ${weapon.damage}`);
    }
  }
  
  createProjectile() {
    const geometry = new THREE.SphereGeometry(0.2, 8, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
    const projectile = new THREE.Mesh(geometry, material);
    
    projectile.position.copy(this.bikeGroup.position);
    projectile.velocity = new THREE.Vector3(0, 0, 1).multiplyScalar(
      this.weapons[this.currentWeapon].range / 10
    );
    
    this.scene.add(projectile);
    
    return projectile;
  }
  
  updateStamina() {
    if (this.controls.accelerate) {
      this.stamina -= 0.2;
    } else {
      this.stamina = Math.min(this.stamina + 0.1, 100);
    }
  }
  
  updateHealth() {
    if (this.health < 0) {
      this.health = 0;
    }
  }
  
  switchBike(bikeName) {
    if (this.bikes[bikeName]) {
      this.currentBike = bikeName;
      this.bikeStats = this.bikes[bikeName];
      console.log(`Vélo changé: ${bikeName}`);
    }
  }
  
  switchWeapon(weaponName) {
    if (this.weapons[weaponName]) {
      this.currentWeapon = weaponName;
      console.log(`Arme changée: ${weaponName}`);
    }
  }
}
