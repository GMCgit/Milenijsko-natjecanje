class letter {
  /**
   * @param {string} meaning
   * @param {string} pronounciation
   * @param {string} src
   */
  constructor(meaning, pronounciation, src) {
    this.meaning = meaning;
    this.pronounciation = pronounciation;
    this.src = src;
    this.known = false;
  }
}

class word {
  /**
   * @param {Array} chars
   * @param {String} meaning
   */
  constructor(chars, meaning) {
    this.chars = chars;
    this.meaning = meaning;
  }
  draw(combatFieldSize) {
    let charH =
      combatFieldSize.h > 250
        ? combatFieldSize.y + combatFieldSize.h + enemyObj.yRel
        : combatFieldSize.y + combatFieldSize.h + enemyObj.yRel + 50;

    let xBase =
      combatFieldSize.x +
      combatFieldSize.w * 0.5 -
      (this.chars.length * 25) / 2 +
      25;
    let yBase = charH - 30;
    push();
    scale(0.5, 0.5);
    for (let i = 0; i < this.chars.length; i++) {
      image(this.chars[i].src, xBase * 2 + i * 50, yBase * 2);
    }
    pop();
  }
}

let loadPrefix = "..";
//loadPrefix = "https://gmcgit.github.io/Milenijsko-natjecanje";
let letters = [
  new letter("a", "az", `${loadPrefix}/letters/a.png`),
  new letter("b", "buki", `${loadPrefix}/letters/b.png`),
  new letter("c", "ci", `${loadPrefix}/letters/c.png`),
  new letter("ć", "šta", `${loadPrefix}/letters/ć.png`),
  new letter("č", "črv", `${loadPrefix}/letters/č.png`),
  new letter("d", "dobro", `${loadPrefix}/letters/d.png`),
  new letter("đ", "đerv", `${loadPrefix}/letters/đ.png`),
  new letter("e", "jest", `${loadPrefix}/letters/e.png`),
  new letter("f", "frt", `${loadPrefix}/letters/f.png`),
  new letter("g", "glagolju", `${loadPrefix}/letters/g.png`),
  new letter("h", "hjer", `${loadPrefix}/letters/h.png`),
  new letter("i", "iže", `${loadPrefix}/letters/i.png`),
  new letter("j", "je", `${loadPrefix}/letters/j.png`),
  new letter("k", "kako", `${loadPrefix}/letters/k.png`),
  new letter("l", "ljudije", `${loadPrefix}/letters/l.png`),
  new letter("m", "mislite", `${loadPrefix}/letters/m.png`),
  new letter("n", "naš", `${loadPrefix}/letters/n.png`),
  new letter("o", "on", `${loadPrefix}/letters/o.png`),
  new letter("p", "pokoj", `${loadPrefix}/letters/p.png`),
  new letter("r", "rci", `${loadPrefix}/letters/r.png`),
  new letter("s", "slovo", `${loadPrefix}/letters/s.png`),
  new letter("š", "ša", `${loadPrefix}/letters/š.png`),
  new letter("t", "tvrdo", `${loadPrefix}/letters/t.png`),
  new letter("u", "uk", `${loadPrefix}/letters/u.png`),
  new letter("v", "vjedje", `${loadPrefix}/letters/v.png`),
  new letter("z", "zemlja", `${loadPrefix}/letters/z.png`),
  new letter("ž", "živjet", `${loadPrefix}/letters/ž.png`),
  /*new letter("dz", "dzjelo", `${loadPrefix}/letters/dz.png`),*/
];

function convertLetterArray() {
  let converted = [];
  let needToConvert = letters.filter((el) => el.known);
  for (let i = 0; i < needToConvert.length; i++) {
    converted.push({
      m: needToConvert[i].meaning,
      k: needToConvert[i].known,
    });
  }
  return converted;
}

function convertBackToLetterArray() {
  let converted = JSON.parse(localStorage.getItem("letters"));
  for (let i = 0; i < converted.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      if (converted[i].m == letters[j].meaning) {
        letters[j].known = converted[i].k;
      }
    }
  }
}

let backgroundMusic = new Audio(`${loadPrefix}/audio/background.mp3`);
backgroundMusic.volume = 0.05;

let enemyMusic = new Audio(`${loadPrefix}/audio/combat.mp3`);
enemyMusic.volume = 0.1;
