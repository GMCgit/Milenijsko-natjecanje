//important constants for the game
let lastRenderTime = 0;
let gameState = "map";
const FPS = 100;

const tileSize = 50;
let countW, countH;
let currentFrameMove = 0;

let encCooldown = [];
let lastX, lastY;

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
  if (currentState != "map") return;
  e.preventDefault();
  keyMap[e.key] = true;
  //initiate mini boss battle
  if (
    e.key == "f" &&
    map[Math.floor(mainChar.y)][Math.floor(mainChar.x)] == "c"
  ) {
    keyMap["a"] = false;
    keyMap["s"] = false;
    keyMap["d"] = false;
    keyMap["w"] = false;
    startCombat(10, "mid");
  } else if (
    e.key == "f" &&
    map[Math.floor(mainChar.y)][Math.floor(mainChar.x)] == "s"
  ) {
    keyMap["a"] = false;
    keyMap["s"] = false;
    keyMap["d"] = false;
    keyMap["w"] = false;
    currentSacredTree = sacredTreeStart(
      Math.floor(mainChar.x),
      Math.floor(mainChar.y)
    );
  }
});

addEventListener("keyup", (e) => {
  if (currentState != "map") return;
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
let moved = false;
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
  if (currentState == "dictionary" && moved == false) {
    if (-xDiff > 50) {
      currentPage = (currentPage + 1) % 14;
      moved = true;
    } else if (-xDiff < -50) {
      if (currentPage == 0) currentPage = 14;
      currentPage = (currentPage - 1) % 14;
      moved = true;
    }
  }
}

function handleTouchEnd(e) {
  keyMap["a"] = false;
  keyMap["s"] = false;
  keyMap["d"] = false;
  keyMap["w"] = false;
  moved = false;
}

function update() {
  lastX = Math.floor(mainChar.x);
  lastY = Math.floor(mainChar.y);
  mainChar.move();

  if (Math.floor(mainChar.x) != lastX || Math.floor(mainChar.y) != lastY) {
    tryEncounter();
  }
  let divs = document.getElementsByTagName("div");
  if (currentState == "map") {
    for (let i = 0; i < divs.length; i++) {
      divs[i].remove();
    }
  }
  if (currentState != "loadScreen") {
    saveState();
  }
  try {
    openBookButton.position(window.innerWidth / 2 + width / 2 - 55, 10);
  } catch {}
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
  for (let j = 0; j < 3; j++) {
    let buttons = document.getElementsByClassName("homeScreenButton");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }
  }
  createCanvas(width, height);
}

function draw() {
  background(220);
  let posX = 0;
  let posY = 0;

  let mainCharX, mainCharY;
  if (typeof mainChar.x == "undefined") {
    mainCharX = 26;
    mainCharY = 70;
  } else {
    mainCharX = mainChar.x;
    mainCharY = mainChar.y;
  }

  countW = (Math.ceil(width / 100) * 100) / tileSize + 1;
  countH = (Math.ceil(height / 100) * 100) / tileSize + 1;

  for (let i = 0; i < countH + 10; i += 1) {
    posX = 0;
    for (let j = 0; j < countW + 10; j += 1) {
      let yValue = mainCharY - Math.ceil(countH / 2) + i;
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = mainCharX - Math.ceil(countW / 2) + j;
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      if (mapC[Math.floor(yValue)][Math.floor(xValue)] != ".") {
        image(
          tiles[mapC[Math.floor(yValue)][Math.floor(xValue)]],
          posX * tileSize - (mainCharX - Math.floor(mainCharX)) * tileSize,
          posY * tileSize - (mainCharY - Math.floor(mainCharY)) * tileSize
        );
      } else {
        image(
          tiles[map[Math.floor(yValue)][Math.floor(xValue)]],
          posX * tileSize - (mainCharX - Math.floor(mainCharX)) * tileSize,
          posY * tileSize - (mainCharY - Math.floor(mainCharY)) * tileSize
        );
      }
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
  drawCombat();
  drawDict();
  try {
    currentSacredTree.draw();
  } catch {}

  //Load screen;
  if (currentState == "loadScreen") {
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }

    filter(BLUR, 4);
    let newGame = createElement("button", "Nova igra");
    newGame.addClass("homeScreenButton");
    let loadGame = createElement("button", "Nastavi igru");
    loadGame.addClass("homeScreenButton");
    let instructions = createElement("button", "Upute");
    instructions.addClass("homeScreenButton");

    newGame.position(window.innerWidth / 2 - 100, height / 2);
    newGame.mousePressed(startNewGame);

    loadGame.position(window.innerWidth / 2 - 100, (height * 6) / 10);
    loadGame.mousePressed(loadOldGame);

    instructions.position(window.innerWidth / 2 - 100, (height * 7) / 10);
    push();
    scale(1.5);
    image(tiles["title"], width / 3 - 100, 20);
    pop();
  }
}

function startNewGame() {
  currentState = "map";
  for (let j = 0; j < 3; j++) {
    let buttons = document.getElementsByClassName("homeScreenButton");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }
  }
  localStorage.clear();
  mainChar.x = 26;
  mainChar.y = 70;
  cursedTreesCleared = [];
  backgroundMusic.play();
  backgroundMusicInterval = setInterval(() => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  }, 175000);

  createBookButton();
}

function loadOldGame() {
  mainChar.x = Math.floor(localStorage.getItem("x"));
  mainChar.y = Math.floor(localStorage.getItem("y"));
  cursedTreesCleared = JSON.parse(localStorage.getItem("cursed"));

  for (let i = 0; i < cursedTreesCleared.length; i++) {
    map[cursedTreesCleared[i][0]][cursedTreesCleared[i][1]] = "g";
  }
  cursedTreesLeft -= cursedTreesCleared.length;

  convertBackToLetterArray();

  currentState = "map";
  for (let j = 0; j < 3; j++) {
    let buttons = document.getElementsByClassName("homeScreenButton");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }
  }
  backgroundMusic.play();
  backgroundMusicInterval = setInterval(() => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  }, 175000);

  createBookButton();
}

function createBookButton() {
  openBookButton = createElement(
    "button",
    `<image src="${loadPrefix}/tiles/book.png"></image>`
  );
  openBookButton.addClass("bookButton");
  openBookButton.mousePressed(() => {
    if (currentState == "map") {
      currentState = "dictionary";
    } else if (currentState == "dictionary") {
      currentState = "map";
      keyMap["a"] = false;
      keyMap["s"] = false;
      keyMap["d"] = false;
      keyMap["w"] = false;
    }
  });
}

function saveState() {
  localStorage.setItem("x", mainChar.x);
  localStorage.setItem("y", mainChar.y);
  localStorage.setItem("letters", JSON.stringify(convertLetterArray()));
  localStorage.setItem("cursed", JSON.stringify(cursedTreesCleared));
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

      let mainCharX, mainCharY;
      if (typeof mainChar.x == "undefined") {
        mainCharX = 26;
        mainCharY = 70;
      } else {
        mainCharX = mainChar.x;
        mainCharY = mainChar.y;
      }

      let yValue = i + Math.floor(mainCharY);
      if (yValue < 0) yValue = 0;
      if (yValue > 99) yValue = 99;

      let xValue = j + Math.floor(mainCharX);
      if (xValue < 0) xValue = 0;
      if (xValue > 99) xValue = 99;

      if (
        map[yValue][xValue].includes("f") &&
        encCooldown[yValue][xValue] < lastRenderTime
      ) {
        let randomEncounter = Math.random();
        if (randomEncounter < encProb) {
          keyMap["a"] = false;
          keyMap["s"] = false;
          keyMap["d"] = false;
          keyMap["w"] = false;
          startCombat(5, "doraSized");
        }
        encCooldown[yValue][xValue] = lastRenderTime + encCooldownReset;
      }
    }
  }
}
