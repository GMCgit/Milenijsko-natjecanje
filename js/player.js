let keyMap = []

class Player {
  constructor() {
    this.idle = new Image();
    this.idle.src = "../CharDesign/player.png";
    this.x = 12;
    this.y = 19;
  }
  move() {
    if (keyMap["d"] == true) {
      this.x += 1;
    } if (keyMap["a"] == true) {
      this.x -= 1;
    } if (keyMap["s"] == true) {
      this.y += 1;
    } if (keyMap["w"] == true) {
      this.y -= 1;
    }
  }
}
