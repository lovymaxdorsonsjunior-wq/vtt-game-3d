import * as THREE from 'three';
import { Scene, World } from './game/gameManager';
import { InputManager } from './input/inputManager';
import { Player } from './player/player';
import { NPCManager } from './npc/npcManager';
import { WeatherSystem } from './environment/weather';

class VTTGame {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 500, 1000);
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    document.body.appendChild(this.renderer.domElement);
    
    this.inputManager = new InputManager();
    this.weatherSystem = new WeatherSystem(this.scene);
    
    this.initializeGame();
    this.animate();
  }
  
  initializeGame() {
    // Créer la ville
    this.createCity();
    
    // Créer les routes
    this.createRoads();
    
    // Créer le joueur
    this.player = new Player(this.scene, { x: 0, y: 0, z: 0 });
    
    // Créer les PNJ
    this.npcManager = new NPCManager(this.scene);
    this.npcManager.spawn(5);
    
    // Configuration caméra
    this.updateCamera();
  }
  
  createCity() {
    // Bâtiments
    const buildingGeometry = new THREE.BoxGeometry(20, 40, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    
    for (let i = 0; i < 15; i++) {
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(
        Math.random() * 200 - 100,
        20,
        Math.random() * 200 - 100
      );
      building.castShadow = true;
      building.receiveShadow = true;
      this.scene.add(building);
    }
    
    // Sol de la ville
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }
  
  createRoads() {
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    
    // Route principale (horizontal)
    const mainRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 30),
      roadMaterial
    );
    mainRoad.rotation.x = -Math.PI / 2;
    mainRoad.position.y = 0.1;
    mainRoad.receiveShadow = true;
    this.scene.add(mainRoad);
    
    // Route secondaire (vertical)
    const secondaryRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 500),
      roadMaterial
    );
    secondaryRoad.rotation.x = -Math.PI / 2;
    secondaryRoad.position.y = 0.1;
    secondaryRoad.receiveShadow = true;
    this.scene.add(secondaryRoad);
    
    // Créer des marquages de route
    this.createRoadMarkings();
  }
  
  createRoadMarkings() {
    const lineGeometry = new THREE.BufferGeometry();
    const points = [];
    
    for (let i = -250; i < 250; i += 10) {
      points.push(
        new THREE.Vector3(i, 0.15, 0),
        new THREE.Vector3(i + 5, 0.15, 0)
      );
    }
    
    lineGeometry.setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.scene.add(lines);
  }
  
  updateCamera() {
    const distance = 20;
    const height = 15;
    
    const playerPos = this.player.position;
    this.camera.position.set(
      playerPos.x - distance,
      playerPos.y + height,
      playerPos.z + distance
    );
    this.camera.lookAt(playerPos);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Mise à jour du joueur
    this.player.update(this.inputManager);
    
    // Mise à jour des PNJ
    this.npcManager.update();
    
    // Mise à jour de la caméra
    this.updateCamera();
    
    // Système météo
    this.weatherSystem.update();
    
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('load', () => {
  new VTTGame();
});

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height);
});
