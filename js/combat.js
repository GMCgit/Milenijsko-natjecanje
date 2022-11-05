class enemy {
  constructor() {
    this.xRel = -100;
    this.yRel = -105;
    this.hp = 5;
  }
}

let combatFieldSize = {
  x: width / 8,
  y: height / 8,
  w: (width * 6) / 8,
  h: (height * 6) / 8,
};
let enemyObj;
function startCombat() {
  currentState = "combat";

  let battleEnded = false;
  enemyObj = new enemy();

  setTimeout((m) => {currentState = "map"}, 2000)
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
      (enemyObj.hp > 5 ? 5 : enemyObj.hp) * 5 +
      5;
    let y = charH;
    let yDiff = Math.floor(i / 5);
    image(tiles["heart"], (x0 + 20 * i) / 2 - yDiff * 50, y / 2 - yDiff * 10);
  }
  pop();
}
