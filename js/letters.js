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
   */
  constructor(chars) {
    this.chars = chars;
  }
}

let loadPrefix = "..";
loadPrefix = "https://gmcgit.github.io/Milenijsko-natjecanje";
let letters = [
  new letter("a", "az", `${loadPrefix}/letters/a.png`),
  new letter("b", "buki", `${loadPrefix}/letters/b.png`),
  new letter("v", "vjedje", `${loadPrefix}/letters/v.png`),
  new letter("g", "glagolju", `${loadPrefix}/letters/g.png`),
  new letter("d", "dobro", `${loadPrefix}/letters/d.png`),
  new letter("e", "jest", `${loadPrefix}/letters/e.png`),
  new letter("ž", "živjet", `${loadPrefix}/letters/ž.png`),
  /*new letter("dz", "dzjelo", `${loadPrefix}/letters/dz.png`),*/
  new letter("z", "zemlja", `${loadPrefix}/letters/z.png`),
  new letter("i", "iže", `${loadPrefix}/letters/i.png`),
  new letter("đ", "đerv", `${loadPrefix}/letters/đ.png`),
  new letter("k", "kako", `${loadPrefix}/letters/k.png`),
  new letter("l", "ljudije", `${loadPrefix}/letters/l.png`),
  new letter("m", "mislite", `${loadPrefix}/letters/m.png`),
  new letter("n", "naš", `${loadPrefix}/letters/n.png`),
  new letter("o", "on", `${loadPrefix}/letters/o.png`),
  new letter("p", "pokoj", `${loadPrefix}/letters/p.png`),
  new letter("r", "rci", `${loadPrefix}/letters/r.png`),
  new letter("s", "slovo", `${loadPrefix}/letters/s.png`),
  new letter("t", "tvrdo", `${loadPrefix}/letters/t.png`),
  new letter("u", "uk", `${loadPrefix}/letters/u.png`),
  new letter("f", "frt", `${loadPrefix}/letters/f.png`),
  new letter("h", "hjer", `${loadPrefix}/letters/h.png`),
  new letter("ć", "šta", `${loadPrefix}/letters/ć.png`),
  new letter("c", "ci", `${loadPrefix}/letters/c.png`),
  new letter("č", "črv", `${loadPrefix}/letters/č.png`),
  new letter("š", "ša", `${loadPrefix}/letters/š.png`),
];
letters[0].known = true