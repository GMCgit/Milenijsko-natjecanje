addEventListener("keydown", (e) => {
    if (currentState == "map" && e.key == "e") {
        currentState = "dictionary";
      }
    else if (currentState == "dictionary" && e.key == "e") {
        currentState = "map";
        keyMap["a"] = false;
        keyMap["s"] = false;
        keyMap["d"] = false;
        keyMap["w"] = false;
    }
});  

function drawDict(){
    combatFieldSize = {
      x: width / 20,
      y: height / 20,
      w: (width*9) / 10,
      h: (height * 9) / 10,
    };

    if (currentState != "dictionary") return;
    //backgrounds

   image(
    tiles["dict"],
    combatFieldSize.x,
    combatFieldSize.y,
    combatFieldSize.w,
    combatFieldSize.h
  );
}