class Bird {
  createBird = function (classType) {
    const birdElement = document.createElement("img");
    birdElement.src = this.image;
    birdElement.style.position = "absolute";
    birdElement.style.zIndex = -10;
    birdElement.classList.add(classType);
    birdElement.classList.add("bird");
    birdElement.bird = this;
    // console.log("birdElem",birdElement);
    return birdElement;
  };
  flyToRight = function () {
    let left = 0;
    const speed = this.speed;
    const image = this.element;
    const destroyElement = this.destroyElement;
    const screenWidth = screen.availWidth;
    const flyControl = setInterval(function () {
      left += speed;

      if (left < screenWidth +image.width) {
        // innerWidth-this.image.width
    
            image.style.left = left + "px";
           
        // console.log(image);
      } else {
        destroyElement(flyControl, image);
      }
    }, 50);
  };
  constructor({ image, speed, points, classType }) {
    this.image = image;
    this.speed = speed;
    this.points = points;
    this.element = this.createBird(classType);
    this.flyControl;
  }
  destroyElement = function (flyControl, element) {
    // const birdElementTest=document.getElementById(1);
    //    console.log("i read brains",birdElementTest.variableName);
    clearInterval(flyControl);
    element.remove();
  };
}

export class RedBird extends Bird {
  constructor() {
    super({
      image: "images/gif/redbird.gif",
      points: 10,
      speed: 10,
      classType: "redbird",
    });
  }
}
export class BlueBird extends Bird {
  constructor() {
    super({
      image: "images/gif/bluebird.gif",
      points: 5,
      speed: 8,
      classType: "bluebird",
    });
  }
}
export class BlackBird extends Bird {
  constructor() {
    super({
      image: "images/gif/BlackBird2.gif ",
      points: -10,
      speed: 5,
      classType: "whitebird",
    });
  }
}

// classlist.addclass()
// html bird related bl obj of class ?
