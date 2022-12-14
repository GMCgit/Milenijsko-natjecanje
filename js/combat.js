class enemy {
  /**
   * @param {number} hp
   * @param {string} type doraSized for regular (letters), mid for mini boss (words) and bigPPBoy for big boss (quote)
   */
  constructor(hp, type) {
    this.xRel = -100;
    this.yRel = -105;
    this.hp = hp;
    this.type = type;
  }
}

let backgroundMusicInterval;
let enemyMusicInterval;

let wonMatch = false;
let displayResults = false;

let openBookButton;
let currentWordInQuote = 0;

let cursedTreesCleared;
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
  lastLearned = "",
  introduced = false,
  introductionText;

function startCombat(hp, type) {
  currentState = "combat";

  backgroundMusic.pause();
  clearInterval(backgroundMusicInterval);
  enemyMusic.currentTime = 0;
  enemyMusic.play();
  enemyMusicInterval = setInterval(() => {
    enemyMusic.currentTime = 0;
    enemyMusic.play();
  }, 100000);

  enemyObj = new enemy(hp, type);
  inputField = createInput("");
  if (enemyObj.type == "doraSized") {
    dropLetter();
    inputField.input(enterLetter);
  } else if (enemyObj.type == "mid" || enemyObj.type == "bigPPBoy") {
    dropWord();
  }
}

//new letter submtion code so it supports words
addEventListener("keydown", (e) => {
  if (currentState !== "combat") return;
  if (e.key == "Enter") {
    enterLetter();
  }
});
addEventListener("click", (e) => {
  if (currentState !== "combat") return;
  if (inputField !== e.target && inputField.value() !== "") {
    enterLetter();
  }
});

function dropLetter() {
  let currentLetterPos = letters.filter((a) => a.known);
  if (currentLetterPos.length == 0) {
    b = letters.filter((a) => !a.known);
    lastLearned = b[Math.floor(Math.random() * b.length)];
    lastLearned.known = true;
    localStorage.setItem("lastLearned", JSON.stringify(lastLearned.meaning));
  }
  currentLetterPos = letters.filter((a) => a.known);
  currentLetter =
    currentLetterPos[Math.floor(Math.random() * currentLetterPos.length)];
  if (!introduced) {
    currentLetter = lastLearned;
  }
  introductionText = createElement(
    "div",
    `Ovo slovo je ${lastLearned.meaning.toUpperCase()}`
  );
  introductionText.addClass("introductionText");
}
function dropWord() {
  let wordChosenStr, wordChosen;
  if (enemyObj.type == "mid") {
    wordChosenStr = words[Math.floor(Math.random() * words.length)];
  } else {
    wordChosenStr = solution[currentWordInQuote];
  }

  try {
    wordChosen = wordChosenStr.split("");
  } catch {}
  for (let i = 0; i < wordChosen.length; i++) {
    wordChosen[i] = letters.filter((a) => a.meaning == wordChosen[i])[0];
  }
  currentLetter = new word(wordChosen, wordChosenStr);
}

function enterLetter() {
  if (inputField.value().toLowerCase() == currentLetter.meaning) {
    enemyObj.hp -= currentLetter.meaning.length;
    if (enemyObj.type == "bigPPBoy") {
      currentWordInQuote++;
    }
    if (enemyObj.type == "doraSized") {
      if (currentLetter.meaning == lastLearned.meaning) {
        correctStreak++;
        introduced = true;
      }
      if (correctStreak == 4) {
        correctStreak = 0;
        b = letters.filter((a) => !a.known);
        lastLearned = b[Math.floor(Math.random() * b.length)];
        lastLearned.known = true;
        localStorage.setItem(
          "lastLearned",
          JSON.stringify(lastLearned.meaning)
        );
        introduced = false;
      }
    }
  } else {
    mainChar.hp--;
    try {
      if (currentLetter.meaning == lastLearned.meaning) {
        correctStreak = 0;
      }
    } catch {}
  }
  if (enemyObj.hp <= 0 || mainChar.hp <= 0) {
    enemyMusic.pause();
    backgroundMusicInterval = setInterval(() => {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();
    }, 175000);
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    clearInterval(enemyMusicInterval);
    currentState = "map";
    inputField.remove();
    try {
      if (currentLetter.meaning != lastLearned.meaning) {
        divs.remove();
      }
    } catch {}
    if (enemyObj.hp <= 0 && enemyObj.type == "mid") {
      map[Math.floor(mainChar.y)][Math.floor(mainChar.x)] = "g";
      cursedTreesLeft--;
      cursedTreesCleared.push([Math.floor(mainChar.y), Math.floor(mainChar.x)]);

      if (cursedTreesLeft == 0) {
        startBossFight();
      }
    }
    if (enemyObj.type == "bigPPBoy" && mainChar.hp <= 0) {
      currentWordInQuote = 0;
      map[cursedTreesCleared[cursedTreesCleared.length - 1][0]][
        cursedTreesCleared[cursedTreesCleared.length - 1][1]
      ] = "c";
      cursedTreesLeft = 1;
    }
    mainChar.hp = 5;

    if (enemyObj.hp <= 0) {
      wonMatch = true;
    } else {
      wonMatch = false;
    }
    displayResults = true;
    setTimeout(() => {
      displayResults = false;
    }, 1000);
  }
  if (enemyObj.type == "doraSized") {
    dropLetter();
  } else if (enemyObj.type == "mid" || enemyObj.type == "bigPPBoy") {
    dropWord();
  }
  inputField.value("");
}

function drawCombat() {
  combatFieldSize = {
    x: width / 8,
    y: height / 8,
    w: (width * 6) / 8,
    h: (height * 6) / 8,
  };

  if (displayResults) {
    if (wonMatch) {
      image(tiles["won"], width / 2 - 50, height / 2 - 25);
    } else {
      image(tiles["lost"], width / 2 - 50, height / 2 - 25);
    }
  }

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
    combatFieldSize.h > 250
      ? combatFieldSize.y + combatFieldSize.h + enemyObj.yRel
      : combatFieldSize.y + combatFieldSize.h + enemyObj.yRel + 50;
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
      (enemyObj.hp > 7 ? 7 : enemyObj.hp) * 5 +
      5;
    let y = charH;
    let yDiff = Math.floor(i / 7);
    image(tiles["heart"], (x0 + 20 * i) / 2 - yDiff * 70, y / 2 - yDiff * 10);
  }
  pop();
  if (currentLetter instanceof letter) {
    image(
      currentLetter.src,
      combatFieldSize.x + combatFieldSize.w * 0.5,
      charH - 30
    );
  } else if (currentLetter instanceof word) {
    currentLetter.draw(combatFieldSize);
  }

  //input
  inputField.position(
    enemyObj.type == "doraSized"
      ? window.innerWidth / 2 + 10
      : window.innerWidth / 2 + -10,
    charH + 30
  );
  inputField.size(enemyObj.type == "doraSized" ? 20 : 60);
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
  try {
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

    introductionText.position(
      window.innerWidth / 2 - 100,
      combatFieldSize.y + 10
    );
  } catch {}
}

const solution = [
  "narod",
  "koji",
  "ne",
  "pamti",
  "svoje",
  "ju??er",
  "ne",
  "mo??e",
  "projektirati",
  "svoje",
  "sutra",
];

function startBossFight() {
  startCombat(54, "bigPPBoy");
}
