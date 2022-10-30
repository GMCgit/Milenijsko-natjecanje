let keyMap = [];
let currentState = "map";

class Player {
  constructor() {
    this.idle = new Image();
    this.idle.src = "../CharDesign/player.png";
    this.x = 12;
    this.y = 19;
  }
  move() {
    if (currentState !== "map") return;
    if (keyMap["d"] == true) {
      this.x += 1;
      if (this.x > 99) this.x = 99;
      if (map[this.y][this.x] == "w") {
        this.x -= 1;
      }
    }
    if (keyMap["a"] == true) {
      this.x -= 1;
      if (this.x < 0) this.x = 0;
      if (map[this.y][this.x] == "w") {
        this.x += 1;
      }
    }
    if (keyMap["s"] == true) {
      this.y += 1;
      if (this.y > 99) this.y = 99;
      if (map[this.y][this.x] == "w") {
        this.y -= 1;
      }
    }
    if (keyMap["w"] == true) {
      this.y -= 1;
      if (this.y < 0) this.y = 0;
      if (map[this.y][this.x] == "w") {
        this.y += 1;
      }
    }
  }
}
