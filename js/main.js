let lastRenderTime = 0;
let gameState = "map";
const FPS = 100;
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

let encCooldown = [];
let lastX, lastY;

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
  lastX = Math.floor(mainChar.x); 
  lastY = Math.floor(mainChar.y);
  mainChar.move();  

  if(Math.floor(mainChar.x) != lastX || Math.floor(mainChar.y) != lastY){
     tryEncounter()
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

  for(let i = 0;i<107;i++){
    let arr = [];
    for(let j = 0;j<107;j++){
      arr.push(0);
    }
    encCooldown.push(arr);
  }
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

  for (let i = 0; i < countH+10; i += 1) {
    posX = 0;
    for (let j = 0; j < countW+10; j += 1) {
      let yValue = mainChar.y - Math.ceil(countH / 2) + i;
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = mainChar.x - Math.ceil(countW / 2) + j;
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      image(
        tiles[map[Math.floor(yValue)][Math.floor(xValue)]],
        posX * tileSize - (mainChar.x-Math.floor(mainChar.x))*tileSize,
        posY * tileSize - (mainChar.y-Math.floor(mainChar.y))*tileSize
      );
      posX++;
    }
    posY++;
  }
  image(mainChar.idle, (countW / 2) * tileSize, (countH / 2) * tileSize-15);
}  

function tryEncounter(){
  //moguca dodatna optimizacija ako pamtim je li player bio na tileu prije x s

  //treba jos dodati da se encounter nemoze dogoditi dok drugi traje
  let encRadius = 3;
  let encProb = 0.025;
  let encCooldownReset = 5000; //ms

  for(let i = -encRadius; i<=encRadius; i++){
    for(let j = -encRadius;j<=encRadius;j++){
        if(Math.abs(i)+Math.abs(j)>encRadius) continue; //circle shaped radius

        if (map[i+Math.floor(mainChar.y)][j+Math.floor(mainChar.x)] == "f" && 
            encCooldown[i+Math.floor(mainChar.y)][j+Math.floor(mainChar.x)] < lastRenderTime) {

              let randomEncounter = Math.random();
              if (randomEncounter < encProb) {
                console.log("boo!");
                map[i+Math.floor(mainChar.y)][j+Math.floor(mainChar.x)] = "p"; //temporary
              }
              encCooldown[i+Math.floor(mainChar.y)][j+Math.floor(mainChar.x)] = lastRenderTime+encCooldownReset;
      }
    }
  }
}