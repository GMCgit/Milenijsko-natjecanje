//important constants for the game
let lastRenderTime = 0;
let gameState = "map";
const FPS = 100;
let tiles = [];
let width = Math.min(
  (window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    0) - 20,
  800
);
let height = Math.min(
  (window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight ||
    0) - 20,
  400
);
const tileSize = 50;
let countW, countH;
let currentFrameMove = 0;

let encCooldown = [];
let lastX, lastY;

let mainChar = new Player();
main();

//recursive function to run the game on limited fps
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FPS) return;
  lastRenderTime = currentTime;
  width = Math.min(
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      0) - 20,
    800
  );
  height = Math.min(
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0) - 20,
    400
  );
  update();
}

//Movement register
addEventListener("keydown", (e) => {
  e.preventDefault();
  keyMap[e.key] = true;
});
addEventListener("keyup", (e) => {
  e.preventDefault();
  keyMap[e.key] = false;
});

//mobile support
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);

let touchPosition0 = {
  x: 0,
  y: 0,
};
let touchPosition1 = {
  x: 0,
  y: 0,
};

function handleTouchStart(e) {
  touchPosition0.x = e.changedTouches[0].pageX;
  touchPosition0.y = e.changedTouches[0].pageY;
  var canvasPosition = canvas.getBoundingClientRect();
}

function handleTouchMove(e) {
  touchPosition1.x = e.changedTouches[0].pageX;
  touchPosition1.y = e.changedTouches[0].pageY;
  let xDiff = touchPosition1.x - touchPosition0.x;
  let yDiff = touchPosition1.y - touchPosition0.y;
  if (xDiff > 10) {
    keyMap["d"] = true;
    keyMap["a"] = false;
  }
  if (xDiff < -10) {
    keyMap["a"] = true;
    keyMap["d"] = false;
  }
  if (yDiff < -10) {
    keyMap["w"] = true;
    keyMap["s"] = false;
  }
  if (yDiff > 10) {
    keyMap["s"] = true;
    keyMap["w"] = false;
  }
  if (Math.abs(xDiff) < 10) {
    keyMap["a"] = false;
    keyMap["d"] = false;
  }
  if (Math.abs(yDiff) < 10) {
    keyMap["w"] = false;
    keyMap["s"] = false;
  }
}

function handleTouchEnd(e) {
  e.preventDefault();
  keyMap["a"] = false;
  keyMap["s"] = false;
  keyMap["d"] = false;
  keyMap["w"] = false;
}

function update() {
  lastX = Math.floor(mainChar.x);
  lastY = Math.floor(mainChar.y);
  mainChar.move();

  if (Math.floor(mainChar.x) != lastX || Math.floor(mainChar.y) != lastY) {
    tryEncounter();
  }
}

function setup() {
  createCanvas(
    Math.min(
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        0) - 20,
      800
    ),
    Math.min(
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        0) - 20,
      400
    )
  );

  for (let i = 0; i < 107; i++) {
    let arr = [];
    for (let j = 0; j < 107; j++) {
      arr.push(0);
    }
    encCooldown.push(arr);
  }
}
function windowResized() {
  createCanvas(width, height);
}
function preload() {
  let k = "..";
  k = "https://gmcgit.github.io/Milenijsko-natjecanje";
  tiles["w"] = loadImage(`${k}/tiles/water.png`);
  tiles["g"] = loadImage(`${k}/tiles/grass.png`);
  tiles["s"] = loadImage(`${k}/tiles/sacred.png`);
  tiles["p"] = loadImage(`${k}/tiles/path.png`);
  tiles["f1"] = loadImage(`${k}/tiles/forest1.png`);
  tiles["f2"] = loadImage(`${k}/tiles/forest2.png`);
  tiles["f3"] = loadImage(`${k}/tiles/forest3.png`);
  mainChar.idle = loadImage(`${k}/CharDesign/playerIdle.png`);
  mainChar.moving = [
    loadImage(`${k}/CharDesign/playerMove0000.png`),
    loadImage(`${k}/CharDesign/playerMove0001.png`),
    loadImage(`${k}/CharDesign/playerMove0002.png`),
  ];
}
function draw() {
  background(220);
  let posX = 0;
  let posY = 0;

  countW = (Math.ceil(width / 100) * 100) / tileSize + 1;
  countH = (Math.ceil(height / 100) * 100) / tileSize + 1;

  for (let i = 0; i < countH + 10; i += 1) {
    posX = 0;
    for (let j = 0; j < countW + 10; j += 1) {
      let yValue = mainChar.y - Math.ceil(countH / 2) + i;
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = mainChar.x - Math.ceil(countW / 2) + j;
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      image(
        tiles[map[Math.floor(yValue)][Math.floor(xValue)]],
        posX * tileSize - (mainChar.x - Math.floor(mainChar.x)) * tileSize,
        posY * tileSize - (mainChar.y - Math.floor(mainChar.y)) * tileSize
      );
      posX++;
    }
    posY++;
  }
  if (keyMap["d"] || keyMap["s"] || keyMap["a"] || keyMap["w"]) {
    if (keyMap["a"]) {
      push();
      scale(-1, 1);
      image(
        mainChar.moving[Math.floor(currentFrameMove / 30) % 3],
        (countW / 2) * tileSize * -1 - tileSize,
        (countH / 2) * tileSize - 15
      );
      pop();
    } else {
      image(
        mainChar.moving[Math.floor(currentFrameMove / 30) % 3],
        (countW / 2) * tileSize,
        (countH / 2) * tileSize - 15
      );
    }
  } else {
    image(mainChar.idle, (countW / 2) * tileSize, (countH / 2) * tileSize - 15);
  }
  currentFrameMove++;
}

function tryEncounter() {
  //moguca dodatna optimizacija ako pamtim je li player bio na tileu prije x s

  //treba jos dodati da se encounter nemoze dogoditi dok drugi traje
  const encRadius = 3;
  const encProb = 0.025;
  const encCooldownReset = 5000; //ms

  for (let i = -encRadius; i <= encRadius; i++) {
    for (let j = -encRadius; j <= encRadius; j++) {
      if (Math.abs(i) + Math.abs(j) > encRadius) continue; //diamond shaped radius

      let yValue = i + Math.floor(mainChar.y);
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = j + Math.floor(mainChar.x);
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      if (
        map[yValue][xValue] == "f" &&
        encCooldown[yValue][xValue] < lastRenderTime
      ) {
        let randomEncounter = Math.random();
        if (randomEncounter < encProb) {
          console.log("boo!");
          map[yValue][xValue] = "p"; //temporary
        }
        encCooldown[yValue][xValue] = lastRenderTime + encCooldownReset;
      }
    }
  }
}
