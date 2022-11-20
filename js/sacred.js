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
    "Ja sam Petar Zrinski. Nastavio sam borbu za prava Hrvatske koju je započeo moj brat, a kada je Varšavskim mirom Beč Osmanlijama dao osvojena područja Hrvatske pokušao sam učiniti sve da bih smanjio centralizam cara. 1671. išao sam u Bečko Novo Mjesto na poziv cara, gdje smo Fran Krsto Frankopan i ja bili pogubljeni, čime su na neko vrijeme propale dvije najvažnije hrvatske loze.",
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

  new spirit(
    29,
    79,
    "Plomisnki natpis",
    "Plominski je natpis spomenik s reljefno uklesanim likom ilirsko-rimskoga božanstva Silvana, zaštitnika šuma i životinja. Natpis na kamenu uklesan je oblom glagoljicom iz 11. stoljeća",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    61,
    3,
    "Petrisov zbornik",
    "Petrisov je zbornik najbogatije vrelo hrvatskih srednjovjekovnih tekstova. Sadrži 162 članka u rukopisu koji su vezani za opće znanje, kanonske propise, duhovne pripovijesti, romane itd.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    11,
    19,
    "Bašćanska ploča",
    "Nekada je bila dijelom pluteja, pregradne ploče u benediktinskoj crkvi sv. Lucije u Jurandvoru. Govori o darivanju zemlje koju je hrvatski kralj Zvonimir dao redovnicima, koji su zatim sagradili crkvu. Danas je jedan od najvrjednijih spomenika hrvatske pismenosti koji se čuva u prostorima HAZU-a.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    63,
    34,
    "Bečki listići",
    "Bečki listići najstariji su spomenik hrvatske liturgijske književnosti na hrvatskostaroslavenskom jeziku i najstariji svjedok češko-hrvatskih kulturnih veza.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    6,
    45,
    "Misal po zakonu rimskoga dvora",
    "Misal po zakonu rimskoga dvora hrvatski je prvotisak na glagoljici i hrvatskom crkvenoslavenskom jeziku. Govori o društvenoj, gospodarskoj i kulturnoj snazi Hrvata u drugoj polovici 15.st. Tiskan je na papiru i pergameni. Danas je sačuvano 12 nepotpunih primjeraka, od toga se dva nalaze u Nacionalnoj i sveučilišnoj knjižnici u Zagrebu, jedan u Dominikanskom samostanu na otoku Braču.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    56,
    66,
    "Inkunabula",
    "Knjige tiskane prije 1500., kada je tiskarstvo bilo u povojima. Važne su za europsku kulturu jer su predlošci za kasnije tiskane knjige.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    47,
    93,
    "Inicijal",
    "Početno je veliko slovo. Vidimo ga istaknuta na početku knjige, poglavlja. Mogu biti rukopisni i tiskani. Obično ima pojačano tijelo i često je ukrašeno dodatnim crtežom i bojama.",
    `${loadPrefix}/CharDesign/npis.png`
  ),
  new spirit(
    65,
    95,
    "Paleografija",
    "Pomoćna je povijesna znanost koja se bavi proučavanjem podrijetla, razvoja i širenja antičkih i srednjovjekovnih pisama u knjigama, na kamenim natpisima i na drugim materijalima.",
    `${loadPrefix}/CharDesign/npis.png`
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
  tiles["n"] = loadImage(`${loadPrefix}/tiles/napis.png`);
  tiles["b"] = loadImage(`${loadPrefix}/tiles/bush.png`)
  mainChar.idle = loadImage(`${loadPrefix}/CharDesign/playerIdle.png`);
  mainChar.moving = [
    loadImage(`${loadPrefix}/CharDesign/playerMove0000.png`),
    loadImage(`${loadPrefix}/CharDesign/playerMove0001.png`),
    loadImage(`${loadPrefix}/CharDesign/playerMove0002.png`),
  ];
  tiles["bg"] = loadImage(`${loadPrefix}/tiles/background.png`);
  tiles["enemy"] = loadImage(`${loadPrefix}/CharDesign/enemy.png`);
  tiles["heart"] = loadImage(`${loadPrefix}/tiles/heart.png`);
  tiles["controls"] = loadImage(`${loadPrefix}/CharDesign/Controls.png`);
  for (let i = 0; i < letters.length; i++) {
    letters[i].src = loadImage(letters[i].src);
  }
  for (let i = 0; i < sacredTrees.length; i++) {
    sacredTrees[i].src = loadImage(sacredTrees[i].src);
  }
  tiles["title"] = loadImage(`${loadPrefix}/tiles/title.png`);
  tiles["won"] = loadImage(`${loadPrefix}/tiles/win.png`);
  tiles["lost"] = loadImage(`${loadPrefix}/tiles/lost.png`);

  tiles["ps1"] = loadImage(`${loadPrefix}/tiles/pathSE1.png`);
  tiles["ps2"] = loadImage(`${loadPrefix}/tiles/pathSE2.png`);
  tiles["ps3"] = loadImage(`${loadPrefix}/tiles/pathSE3.png`);
  tiles["ps4"] = loadImage(`${loadPrefix}/tiles/pathSE4.png`);

  tiles["pel1"] = loadImage(`${loadPrefix}/tiles/pathEL1.png`);
  tiles["pel2"] = loadImage(`${loadPrefix}/tiles/pathEL2.png`);
  tiles["pel3"] = loadImage(`${loadPrefix}/tiles/pathEL3.png`);
  tiles["pel4"] = loadImage(`${loadPrefix}/tiles/pathEL4.png`);

  tiles["per1"] = loadImage(`${loadPrefix}/tiles/pathER1.png`);
  tiles["per2"] = loadImage(`${loadPrefix}/tiles/pathER2.png`);
  tiles["per3"] = loadImage(`${loadPrefix}/tiles/pathER3.png`);
  tiles["per4"] = loadImage(`${loadPrefix}/tiles/pathER4.png`);

  loadDick();
}
