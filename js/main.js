let lastRenderTime = 0;
let gameState = "map";
const FPS = 10;
let tiles = [];
let width = Math.min(
  (window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    0) - 50,
  800
);
const tileSize = 50;

let tileCountW = width / tileSize + 1;
let tileCountH = 400 / tileSize + 1;

let mainChar = new Player();
main();

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FPS) return;
  lastRenderTime = currentTime;
  width = Math.min(
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      0) - 50,
    800
  );
  update()
}
addEventListener("keydown", (e) => {
  e.preventDefault()
  keyMap[e.key] = true;
})
addEventListener("keyup", (e) => {
  e.preventDefault()
  keyMap[e.key] = false;
})
function update() {
  mainChar.move()
}
function setup() {
  createCanvas(
    Math.min(
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        0) - 50,
      800
    ),
    400
  );
}
function windowResized() {
  createCanvas(width, 400);
}
function preload() {
  tiles["w"] = loadImage("./tiles/water.png");
  tiles["g"] = loadImage("./tiles/grass.png");
  tiles["s"] = loadImage("./tiles/sacred.png");
  tiles["p"] = loadImage("./tiles/path.png");
  tiles["f"] = loadImage("./tiles/forest.png");
  mainChar.idle = loadImage("../CharDesign/player.png");
}
function draw() {
  background(220);
  let posX = 0;
  let posY = 0
  for (
    let j = max(mainChar.y - tileCountH / 2, 0);
    j < max(mainChar.y + tileCountH / 2, map.length);
    j += 1
  ) {
    for (
      let i = max(mainChar.x - tileCountW / 2, 0);
      i < max(mainChar.x + tileCountW / 2, map[0].length);
      i += 1
    ) {
      image(
        tiles[map[Math.floor(j)][Math.floor(i)]],
        posX * tileSize - tileSize / 2,
        posY * tileSize - tileSize / 2
      );
      posX++;
    }
    posY++;
    posX = 0;
  }
  image(
    mainChar.idle,
    Math.floor(tileCountW/2) * tileSize - tileSize / 2,
    Math.floor(tileCountH/2) * tileSize - tileSize / 2
  );
}
