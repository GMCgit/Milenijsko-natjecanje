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
    talkingDiv.addClass("dialogue");
    push();
    scale(2, 2);
    image(this.src, (width * 2) / 5, (height * 3) / 10 - 53);
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
  } else if (
    currentState == "map" &&
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
    42,
    67,
    "Petar Zrinski",
    "Ja sam Petar Zrinski. Nastavio sam borbu za prava Hrvatske koju je započeo moj brat, a kada je Vašvarskim mirom Beč Osmanlijama dao osvojena područja Hrvatske pokušao sam učiniti sve da bi smanjio centralizam cara. 1671. išao sam u Bečko novo na poziv cara, gdje smo Fran Krsto Frankopan i ja bili pogubljeni, čime su na neko vrijeme propale dvije najvažnije hrvatske loze.",
    `${loadPrefix}/CharDesign/petarZrinski.png`
  ),

  new spirit(
    81,
    75,
    "Ćiril",
    "Ja sam Ćiril, rođen sam u Solunu gdje sam i odrastao. Mene i mog brata je poslao knez Rastislav da propovijedamo kršćansku vjeru na slavenskom jeziku. Ja sam sastavio glagoljicu, prvo slavensko pismo i preveo sam najvažnije crkvene knjige na jezik makedonskih Slavena.",
    `${loadPrefix}/CharDesign/ciril.png`
  ),

  new spirit(
    69,
    17,
    "Grgur Ninski",
    "Ja sam Grgur Ninski. Vodio sam Ninsku biskupiju i sa kraljem Tomislavom borio sam se za crkvu na slavenskom jeziku i pismu. Nažalost, brzo je svećenicima bilo zabranjeno voditi mise na slavenskom jeziku.",
    `${loadPrefix}/CharDesign/grgurNinski.png`
  ),

  new spirit(
    25,
    49,
    "Kralj Zvonimir",
    "Ja sam Zvonimir, kralj Hrvata. Za vrijeme moje vladavine Hrvatska je bila u miru i blagostanju, ali moja smrt je izazvala krvoproliće. Gradio sam crkve i samostane, u jednom od njih našli su i  Bašćansku ploču, izuzetno bitan izvor za povijest hrvatskog naroda i pisma.",
    `${loadPrefix}/CharDesign/kraljZvonimir.png`
  ),

  new spirit(
    39,
    26,
    "Nikola Šubić Zrinski",
    "Ja sam grof Nikola IV. Zrinski, zvan Nikola Šubić Zrinski. Branio sam Siget od Osmanlija, gdje sam na kraju i izgubio život.",
    `${loadPrefix}/CharDesign/nikolaSubicZrinski.png`
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
  tiles["ws1"] = loadImage(`${loadPrefix}/tiles/waterSE1.png`);
  tiles["ws2"] = loadImage(`${loadPrefix}/tiles/waterSE2.png`);
  tiles["ws3"] = loadImage(`${loadPrefix}/tiles/waterSE3.png`);
  tiles["ws4"] = loadImage(`${loadPrefix}/tiles/waterSE4.png`);
  tiles["wd1"] = loadImage(`${loadPrefix}/tiles/waterDE1.png`);
  tiles["wd2"] = loadImage(`${loadPrefix}/tiles/waterDE2.png`);
  tiles["wd3"] = loadImage(`${loadPrefix}/tiles/waterDE3.png`);
  tiles["wd4"] = loadImage(`${loadPrefix}/tiles/waterDE4.png`);
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
  tiles["title"] = loadImage(`${loadPrefix}/tiles/title.png`);

  loadDick();
}
