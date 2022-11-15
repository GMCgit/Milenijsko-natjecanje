let currentSacredTree;

class spirit {
  /**
   * @param {Number} x x coord
   * @param {Number} y y coord
   * @param {String} name name of npc
   * @param {String} dialogue dialogue text
   * @param {String} src src of image
   */
  constructor(x, y, name, dialogue, src) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.dialogue = dialogue;
    this.src = src;
  }
  draw() {
    currentState = "talking";
    try {
      let divs = document.getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        divs[i].remove();
      }
    } catch {}
    let talkingDiv = createElement(
      "div",
      `<h2>${this.name}</h2><hr><p>${this.dialogue}</p>`
    );
    talkingDiv.position((window.innerWidth - width) / 2 + 20, (height * 3) / 5);
    talkingDiv.size(width - 40, (height * 2) / 5);
    push();
    scale(2, 2);
    image(
      this.src,
      ((window.innerWidth - width) / 2 + width - 150) / 2,
      (height * 3) / 10 - 53
    );
    pop();
  }
}

addEventListener("click", (e) => {
  if (currentState == "talking") {
    currentSacredTree = "your mom";
    try {
      let divs = document.getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        divs[i].remove();
      }
    } catch {}
    currentState = "map";
  }
});
addEventListener("keydown", (e) => {
  if (currentState == "talking") {
    currentSacredTree = "your mom";
    try {
      let divs = document.getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        divs[i].remove();
      }
    } catch {}
    currentState = "map";
  }
});

let sacredTrees = [
  new spirit(
    12,
    20,
    "Petar Zrinski",
    "Ja sam Petar Zrinski. Nastavio sam borbu za prava Hrvatske koju je započeo moj brat, a kada je Vašvarskim mirom Beč Osmanlijama dao osvojena područja Hrvatske pokušao sam učiniti sve da bi smanjio centralizam cara. 1671. išao sam u Bečko novo na poziv cara, gdje smo Fran Krsto Frankopan i ja bili pogubljeni, čime su na neko vrijeme propale dvije najvažnije hrvatske loze.",
    `${loadPrefix}/CharDesign/petarZrinski.png`
  ),
];

function sacredTreeStart(x, y) {
  for (let i = 0; i < sacredTrees.length; i++) {
    if (sacredTrees[i].x == x && sacredTrees[i].y == y) {
      return sacredTrees[i];
    }
  }
}

function preload() {
  tiles["w"] = loadImage(`${loadPrefix}/tiles/water.png`);
  tiles["g"] = loadImage(`${loadPrefix}/tiles/grass.png`);
  tiles["s"] = loadImage(`${loadPrefix}/tiles/sacred.png`);
  tiles["p"] = loadImage(`${loadPrefix}/tiles/path.png`);
  tiles["f1"] = loadImage(`${loadPrefix}/tiles/forest1.png`);
  tiles["f2"] = loadImage(`${loadPrefix}/tiles/forest2.png`);
  tiles["f3"] = loadImage(`${loadPrefix}/tiles/forest3.png`);
  tiles["c"] = loadImage(`${loadPrefix}/tiles/cursed.png`);
  mainChar.idle = loadImage(`${loadPrefix}/CharDesign/playerIdle.png`);
  mainChar.moving = [
    loadImage(`${loadPrefix}/CharDesign/playerMove0000.png`),
    loadImage(`${loadPrefix}/CharDesign/playerMove0001.png`),
    loadImage(`${loadPrefix}/CharDesign/playerMove0002.png`),
  ];
  tiles["bg"] = loadImage(`${loadPrefix}/tiles/background.png`);
  tiles["enemy"] = loadImage(`${loadPrefix}/CharDesign/enemy.png`);
  tiles["heart"] = loadImage(`${loadPrefix}/tiles/heart.png`);
  for (let i = 0; i < letters.length; i++) {
    letters[i].src = loadImage(letters[i].src);
  }
  for (let i = 0; i < sacredTrees.length; i++) {
    sacredTrees[i].src = loadImage(sacredTrees[i].src);
  }
}
