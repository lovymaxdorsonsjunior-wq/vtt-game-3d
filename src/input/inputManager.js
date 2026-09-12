export class InputManager {
  constructor() {
    this.keysPressed = {};
    this.mousePressed = false;
    
    this.setupListeners();
  }
  
  setupListeners() {
    document.addEventListener('keydown', (e) => {
      this.keysPressed[e.code] = true;
      console.log(`Touche pressée: ${e.code}`);
    });
    
    document.addEventListener('keyup', (e) => {
      this.keysPressed[e.code] = false;
    });
    
    document.addEventListener('mousedown', () => {
      this.mousePressed = true;
    });
    
    document.addEventListener('mouseup', () => {
      this.mousePressed = false;
    });
  }
  
  isKeyPressed(key) {
    return this.keysPressed[key] || false;
  }
  
  isMousePressed() {
    return this.mousePressed;
  }
}
