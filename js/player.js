let keyMap = [];
let currentState = "map";
let mul;

class Player {
  constructor() {
    this.idle = new Image();
    this.idle.src = "../CharDesign/player.png";
    this.x = 12;
    this.y = 19;
  }
  move() {
    mul = 5/FPS;
    if (currentState !== "map") return;
    if (keyMap["d"] == true) {
      this.x += mul;
      if (this.x > 99) this.x = 99;
      if (map[Math.floor(this.y)][Math.floor(this.x)] == "w") {
        this.x -= mul;
      }
    }
    if (keyMap["a"] == true) {
      this.x -= mul;
      if (this.x < 0) this.x = 0;
      if (map[Math.floor(this.y)][Math.floor(this.x)] == "w") {
        this.x += mul;
      }
    }
    if (keyMap["s"] == true) {
      this.y += mul;
      if (this.y > 99) this.y = 99;
      if (map[Math.floor(this.y)][Math.floor(this.x)] == "w") {
        this.y -= mul;
      }
    }
    if (keyMap["w"] == true) {
      this.y -= mul;
      if (this.y < 0) this.y = 0;
      if (map[Math.floor(this.y)][Math.floor(this.x)] == "w") {
        this.y += mul;
      }
    }
  }
}
