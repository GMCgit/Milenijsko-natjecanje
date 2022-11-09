class enemy {
  /**
   * @param {number} hp 
   * @param {string} type doraSized for regular (letters), mid for mini boss (words) and bigPPBoy for big boss (quote)
   */
  constructor(hp, type) {
    this.xRel = -100;
    this.yRel = -105;
    this.hp = hp;
    this.type = type
  }
}
let correctStreak = 0;
let combatFieldSize = {
  x: width / 8,
  y: height / 8,
  w: (width * 6) / 8,
  h: (height * 6) / 8,
};
let enemyObj,
  inputField,
  currentLetter,
  lastLearned = letters[0],
  introduced = false,
  introductionText;

function startCombat() {
  currentState = "combat";

  enemyObj = new enemy(5, "doraSized");
  inputField = createInput("");
  inputField.input(enterLetter);
  if (enemyObj.type == "doraSized") {
    dropLetter();
  }
}

function dropLetter() {
  let currentLetterPos = letters.filter((a) => a.known);
  currentLetter =
    currentLetterPos[Math.floor(Math.random() * currentLetterPos.length)];

  introductionText = createElement(
    "div",
    `Ovo slovo je ${lastLearned.meaning.toUpperCase()}`
  );
  introductionText.style("font-size", "20px");
  introductionText.style("width", "200px");
  introductionText.style("text-align", "center");
  introductionText.position(
    window.innerWidth / 2 - 100,
    combatFieldSize.y + 10
  );
}

function enterLetter() {
  if (this.value().toLowerCase() == currentLetter.meaning) {
    enemyObj.hp--;
    if (currentLetter.meaning == lastLearned.meaning) {
      correctStreak++;
      introduced = true;
    }
    if (correctStreak == 3) {
      correctStreak = 0;
      b = letters.filter((a) => !a.known);
      lastLearned = b[Math.floor(Math.random() * b.length)];
      lastLearned.known = true;
      introduced = false;
    }
  } else {
    if (currentLetter.meaning == lastLearned.meaning) {
      mainChar.hp--;
    }
    correctStreak = 0;
  }
  if (enemyObj.hp == 0 || mainChar.hp == 0) {
    currentState = "map";
    inputField.remove();
    if (currentLetter.meaning != lastLearned.meaning) {
      try {
        divs.remove();
      } catch {}
    }
    mainChar.hp = 5;
  }
  dropLetter();
  inputField.value("");
}

function drawCombat() {
  combatFieldSize = {
    x: width / 8,
    y: height / 8,
    w: (width * 6) / 8,
    h: (height * 6) / 8,
  };
  if (currentState != "combat") return;
  //backgrounds
  rect(
    combatFieldSize.x,
    combatFieldSize.y,
    combatFieldSize.w,
    combatFieldSize.h
  );
  image(
    tiles["bg"],
    combatFieldSize.x + 1,
    combatFieldSize.y + 1,
    combatFieldSize.w - 2,
    combatFieldSize.h - 2,
    0,
    combatFieldSize.h > 250 ? 300 - combatFieldSize.h : 250 - combatFieldSize.h, //Ako je field height premalen tlo koje je visoko oko 60px pomaknemo prema dole da characters imaju sto vise prostora
    combatFieldSize.w - 2,
    combatFieldSize.h - 2
  );
  //characters
  let charH =
    combatFieldSize.h > 250 ?
    combatFieldSize.y + combatFieldSize.h + enemyObj.yRel :
    combatFieldSize.y + combatFieldSize.h + enemyObj.yRel + 50;
  image(tiles["enemy"], combatFieldSize.x + (combatFieldSize.w * 2) / 3, charH);
  push();
  scale(2, 2);
  image(
    mainChar.idle,
    (combatFieldSize.x + (1 / 3) * combatFieldSize.w) / 2 - 25,
    (charH - 40) / 2
  );
  //health
  for (let i = 0; i < mainChar.hp; i++) {
    let x0 =
      combatFieldSize.x +
      (1 / 3) * combatFieldSize.w -
      (mainChar.hp > 5 ? 5 : mainChar.hp) * 10 +
      5;
    let y = charH - 50;
    let yDiff = Math.floor(i / 5);
    image(tiles["heart"], (x0 + 20 * i) / 2 - yDiff * 50, y / 2 - yDiff * 10);
  }
  for (let i = 0; i < enemyObj.hp; i++) {
    let x0 =
      combatFieldSize.x +
      (combatFieldSize.w * 2) / 3 -
      (enemyObj.hp > 5 ? 5 : enemyObj.hp) * 5 +
      5;
    let y = charH;
    let yDiff = Math.floor(i / 5);
    image(tiles["heart"], (x0 + 20 * i) / 2 - yDiff * 50, y / 2 - yDiff * 10);
  }
  pop();
  image(
    currentLetter.src,
    combatFieldSize.x + combatFieldSize.w * 0.5,
    charH - 30
  );
  //input
  inputField.position(window.innerWidth / 2 + 10, charH + 30);
  inputField.size(20);
  extraInputs = document.getElementsByTagName("input");
  for (let i = 0; i < extraInputs.length; i++) {
    if (
      extraInputs[i].getAttribute("style") == null ||
      extraInputs[i].getAttribute("style") == ""
    ) {
      extraInputs[i].remove();
    }
  }

  let divs = document.getElementsByTagName("div");
  if (
    introduced ||
    currentLetter.meaning != lastLearned.meaning ||
    currentState == "map"
  ) {
    for (let i = 0; i < divs.length; i++) {
      try {
        divs[i].remove();
      } catch {}
    }
  }
  try {
    introductionText.position(
      window.innerWidth / 2 - 100,
      combatFieldSize.y + 10
    );
  } catch {}
}