import * as THREE from 'three';

export class Scene {
  static createScene() {
    return new THREE.Scene();
  }
}

export class World {
  constructor() {
    this.cars = [];
    this.obstacles = [];
  }
  
  addCar(car) {
    this.cars.push(car);
  }
  
  addObstacle(obstacle) {
    this.obstacles.push(obstacle);
  }
}
