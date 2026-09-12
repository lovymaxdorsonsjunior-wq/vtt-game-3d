import * as THREE from 'three';
import { NPC } from './npc';

export class NPCManager {
  constructor(scene) {
    this.scene = scene;
    this.npcs = [];
  }
  
  spawn(count) {
    for (let i = 0; i < count; i++) {
      const npc = new NPC(this.scene, {
        x: Math.random() * 200 - 100,
        y: 0,
        z: Math.random() * 200 - 100
      });
      this.npcs.push(npc);
    }
  }
  
  update() {
    this.npcs.forEach(npc => npc.update());
  }
}
