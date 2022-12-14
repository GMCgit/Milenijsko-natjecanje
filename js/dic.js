let dictPage = [];
let currentPage = 0;

addEventListener("keydown", (e) => {
  if (currentState == "map" && e.key == "e") {
    currentState = "dictionary";
    currentPage = 0;
  } else if (currentState == "dictionary" && e.key == "e") {
    currentPage = (currentPage + 1) % 14;
  } else if (currentState == "dictionary" && e.key == "ArrowRight") {
    currentPage = (currentPage + 1) % 14;
  } else if (currentState == "dictionary" && e.key == "ArrowLeft") {
    if (currentPage == 0) currentPage = 14;
    currentPage = (currentPage - 1) % 14;
  } else if (currentState == "dictionary") {
    currentState = "map";
    keyMap["a"] = false;
    keyMap["s"] = false;
    keyMap["d"] = false;
    keyMap["w"] = false;
  }
});

function drawDict() {
  combatFieldSize = {
    x: width / 20,
    y: height / 20,
    w: (width * 9) / 10,
    h: (height * 9) / 10,
  };

  if (currentState != "dictionary") return;
  //backgrounds

  image(
    dictPage[currentPage],
    combatFieldSize.x,
    combatFieldSize.y,
    combatFieldSize.w,
    combatFieldSize.h
  );

  let index1 = currentPage * 2;
  let index2 = currentPage * 2 + 1;
  if (!letters[index1].known)
    image(
      dictPage[14],
      combatFieldSize.x,
      combatFieldSize.y,
      combatFieldSize.w,
      combatFieldSize.h
    );
  if (index2 < 27 && !letters[index2].known)
    image(
      dictPage[15],
      combatFieldSize.x,
      combatFieldSize.y,
      combatFieldSize.w,
      combatFieldSize.h
    );
}

function loadDick() {
  dictPage[0] = loadImage(`${loadPrefix}/dictionary/Dict1.png`);
  dictPage[1] = loadImage(`${loadPrefix}/dictionary/Dict2.png`);
  dictPage[2] = loadImage(`${loadPrefix}/dictionary/Dict3.png`);
  dictPage[3] = loadImage(`${loadPrefix}/dictionary/Dict4.png`);
  dictPage[4] = loadImage(`${loadPrefix}/dictionary/Dict5.png`);
  dictPage[5] = loadImage(`${loadPrefix}/dictionary/Dict6.png`);
  dictPage[6] = loadImage(`${loadPrefix}/dictionary/Dict7.png`);
  dictPage[7] = loadImage(`${loadPrefix}/dictionary/Dict8.png`);
  dictPage[8] = loadImage(`${loadPrefix}/dictionary/Dict9.png`);
  dictPage[9] = loadImage(`${loadPrefix}/dictionary/Dict10.png`);
  dictPage[10] = loadImage(`${loadPrefix}/dictionary/Dict11.png`);
  dictPage[11] = loadImage(`${loadPrefix}/dictionary/Dict12.png`);
  dictPage[12] = loadImage(`${loadPrefix}/dictionary/Dict13.png`);
  dictPage[13] = loadImage(`${loadPrefix}/dictionary/Dict14.png`);
  dictPage[14] = loadImage(`${loadPrefix}/dictionary/Mist1.png`);
  dictPage[15] = loadImage(`${loadPrefix}/dictionary/Mist2.png`);
}
