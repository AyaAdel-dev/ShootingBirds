export class Bomb {
  createBomb = function () {
    const bombElement = document.createElement("img");
    // bombElement.classList.toggle("invisible");
    bombElement.src = "images/gif/bomb.gif";

    bombElement.style.position = "absolute";
    bombElement.style.top=0;
    bombElement.style.zIndex=5;
    bombElement.classList.add("bomb");
    bombElement.bomb = this;  
    console.log("bombElement",bombElement);
    // bombElement.onmousedown=this.boom;
    // element shayl el object w object shayl el element
    return bombElement;
  };
  fallFromTop =function (randombombSpeed) {
    let topBomb =0;
    const bombSpeed = randombombSpeed();
    const bombElement = this.bombElement;
    const destroyElementbomb = this.destroyElementbomb;
    const destroyInterval = this.clearIntervalElementBomb;
    const screenHeight = screen.availHeight;
    // bombElement.classList.toggle("invisible");
    // swa2 7tet bombFallControl fl bombElement or bomb (this) both sa7 l2nhom already shyfen b3d
    // 77oto fl bomb 3shan bomb howa mohtam more bl bombFallControl 
     this.bombFallControl = setInterval(function () {
      topBomb += bombSpeed;
      // console.log("top", topBomb, "bomb speed", bombSpeed);
      if (topBomb < screenHeight+bombElement.height) {
        bombElement.style.top = topBomb + "px";
      } else {
        destroyElementbomb(bombElement.bomb);
        destroyInterval(bombElement.bomb);
      }
    }, 50);
  };
  constructor(boom) {
    this.bombElement = this.createBomb();
    this.bombElement.onmousedown=boom;
    // another way
    // this.bombElement.boom=boom;
    // this.bombElement.onmousedown=this.bombElement.boom;
  }
  destroyElementbomb = function (bomb) {
    bomb.bombElement.remove();
  };
  clearIntervalElementBomb=function(bomb){
    clearInterval(bomb.bombFallControl);
  }
  // function takes object bomb because this refers to the element
 
}
window.addEventListener("load", function () {});
