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
let countW, countH;

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
  update();
}
addEventListener("keydown", (e) => {
  e.preventDefault();
  keyMap[e.key] = true;
});
addEventListener("keyup", (e) => {
  e.preventDefault();
  keyMap[e.key] = false;
});
function update() {
  mainChar.move();
  if (map[mainChar.y][mainChar.x] == "f") {
    let randomEncounter = Math.random();
    if (randomEncounter < 0.03) {
      console.log("boo!");
    }
  }
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
  tiles["w"] = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/tiles/water.png"
  );
  tiles["g"] = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/tiles/grass.png"
  );
  tiles["s"] = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/tiles/sacred.png"
  );
  tiles["p"] = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/tiles/path.png"
  );
  tiles["f"] = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/tiles/forest.png"
  );
  mainChar.idle = loadImage(
    "https://gmcgit.github.io/Milenijsko-natjecanje/CharDesign/player.png"
  );
}
function draw() {
  background(220);
  let posX = 0;
  let posY = 0;

  countW = (Math.ceil(width / 100) * 100) / tileSize + 1;
  countH = (Math.ceil(height / 100) * 100) / tileSize + 1;

  for (let i = 0; i < countH; i += 1) {
    posX = 0;
    for (let j = 0; j < countW; j += 1) {
      let yValue = mainChar.y - Math.ceil(countH / 2) + i;
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = mainChar.x - Math.ceil(countW / 2) + j;
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      image(
        tiles[map[yValue][xValue]],
        posX * tileSize - tileSize / 2,
        posY * tileSize - tileSize / 2
      );
      posX++;
    }
    posY++;
  }
  image(mainChar.idle, (posX / 2) * tileSize, (posY / 2) * tileSize);
}
