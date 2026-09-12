import * as THREE from 'three';

export class WeatherSystem {
  constructor(scene) {
    this.scene = scene;
    this.weatherType = 'clear';
    this.time = 0;
    
    // Lumière
    this.setupLighting();
  }
  
  setupLighting() {
    // Lumière du soleil
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
    this.sunLight.position.set(100, 100, 100);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.scene.add(this.sunLight);
    
    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
  }
  
  update() {
    this.time++;
    
    // Cycle jour/nuit simplifié
    const dayNightCycle = Math.sin(this.time / 1000) * 0.5 + 0.5;
    this.sunLight.intensity = dayNightCycle * 1.5 + 0.5;
  }
}
