let keyMap = [];
let currentState = "map";
let mul;
//Border is non walkable areas
let Border = ["w","s","f1", "f2", "f3"];

class Player {
  constructor() {
    this.idle = new Image();
    this.x = 12;
    this.y = 19;
    this.idle = "";
    this.moving = [];
  }
  move() {
    //used for smooth moving, Math.floor keeps true this.x, this.y
    mul = 5/FPS;
    if (currentState !== "map") return;
    if (keyMap["d"] == true) {
      this.x += mul;
      if (this.x > 99) this.x = 99;
      if (Border.indexOf(map[Math.floor(this.y)][Math.floor(this.x)]) >= 0) {
        this.x -= mul;
      }
    }
    if (keyMap["a"] == true) {
      this.x -= mul;
      if (this.x < 0) this.x = 0;
      if (Border.indexOf(map[Math.floor(this.y)][Math.floor(this.x)]) >=0) {
        this.x += mul;
      }
    }
    if (keyMap["s"] == true) {
      this.y += mul;
      if (this.y > 99) this.y = 99;
      if (Border.indexOf(map[Math.floor(this.y)][Math.floor(this.x)]) >= 0) {
        this.y -= mul;
      }
    }
    if (keyMap["w"] == true) {
      this.y -= mul;
      if (this.y < 0) this.y = 0;
      if (Border.indexOf(map[Math.floor(this.y)][Math.floor(this.x)]) >= 0) {
        this.y += mul;
      }
    }
  }
}
