import { RedBird,BlackBird, BlueBird } from "./bird.js";
import { Bomb } from "./bomb.js";
// const windowUrl = window.location.search;
const userName = sessionStorage.getItem('UserNameIndexPage')
// windowUrl
//   .split("=")[1]
//   .split("&")[0]
//   .toLowerCase()
//   .replace("+", "");
const welcomeDiv = document.querySelector(".startgame");
const startBtn = document.querySelector(".startgamebtn");
const birdDiv = document.getElementById("bird");
const bombDiv = document.querySelector("#bomb");
const timer = document.getElementsByTagName("td")[2];
const scoreTextField = document.getElementsByTagName("td")[1];
const birdsKilledTextField = document.getElementsByTagName("td")[3];
const userNameTextField = document.getElementsByTagName("td")[0];
let lastDate = new Date();
localStorage.lastDate = lastDate;
lastDate = new Date(localStorage.lastDate).toLocaleString("en-US");
let isDarkBackGround =false;
let currentGame; // 7shel game object
const birdsArray = [RedBird, BlackBird, BlueBird];
let tryname=sessionStorage.getItem('UserNameIndexPage') ;
// UserNameIndexPage
class Game {
  constructor() {
   console.log("tryysername",tryname);
    this.score = 0;
    this.timer = 0;
    this.birdKilled = 0;
    currentGame = this;
    this.startGame();
    userNameTextField.innerHTML = "Welcome: " + userName;
    scoreTextField.innerHTML = "Score: 0";
    birdsKilledTextField.innerHTML = "BirdsKilled: 0";
    timer.innerText = "Time: 60";
  }
  displayBirdOnScreen = function (birdReference, top) {
    const bird = new birdReference();
    bird.element.style.top = top + "px";
    birdDiv.append(bird.element);
    bird.flyToRight();
  };
  startGame = function () {
    userNameTextField.innerHTML = "Welcome: " + userName;
    welcomeDiv.classList.toggle("invisible");
    this.generatesRandomBirds();
    this.generateRandomBombs();
    this.gameTimer();
  };

  generatesRandomBirds = function () {
    // this.displayBirdOnScreen(RedBird);
    const game = this;
    const screenHeight = window.availHeight;
    game.birdInterval = setInterval(function () {
      const birdClassRandom = game.getRandomBirdClass();
      // const top=this.innerHeight-400;
      const top =
        this.innerHeight == 0
          ? this.innerHeight + 100
          : Math.floor(Math.random() * (this.innerHeight - 200));
      game.displayBirdOnScreen(birdClassRandom, top);
    }, 1000);

    // birdDiv.appendChild(bird);
  };

  getRandomBirdClass = function () {
    const randomIndex = Math.floor(Math.random() * birdsArray.length);
    const randomBirdClass = birdsArray[randomIndex];
    return randomBirdClass;
  };

  // Bomb functions
  randombombSpeed = function () {
    const bombSpeed = Math.random() * 10 + 1.5;
    // Bomb.speed = bombSpeed;
    return bombSpeed;
  };

  displaybombOnScreen = function (leftBomb) {
    const bomb = new Bomb(this.boom);
    bomb.bombElement.style.left = leftBomb + "px";
    bombDiv.append(bomb.bombElement);
    bomb.fallFromTop(this.randombombSpeed);
  };
  generateRandomBombs = function () {
    const game = this;
    const screenWidth = window.availWidth;
    game.bombInterval = setInterval(function () {
      const left =
        this.innerWidth == 0
          ? this.innerWidth + 100
          : Math.floor(Math.random() * (this.innerWidth - 200));
      game.displaybombOnScreen(left);
    }, 2500);
  };
  gameTimer = function () {
    const game = this;
    let time = 60;
    // console.log("b4",time);
    let playTime = setInterval(function () {
      timer.innerText = "Time: " + time;
      if (time > 0) {
        time--;
        // console.log("if",time);
      } else {
        clearInterval(playTime);
        time = 0;
        game.endGame();
        displayWinAndLoseDiv();
        // console.log("else",time);
      }
    }, 1000);
  };
  boom = function () {
    const shootBird = document.querySelector(".shootbird");
    shootBird.volume = 0.4;
    shootBird.play();
    this.bomb.clearIntervalElementBomb(this.bomb);
    console.log("yamoshel");
    let birds = document.querySelectorAll(".bird");
    // bombElement hena howa this
    let bombLeft = this.offsetLeft - 50;
    let bombRight = this.offsetLeft + this.width + 50;
    let bombTop = this.offsetTop - 50;
    let bombBottom = this.offsetTop + this.height + 50;

    birds.forEach(function (birdElement) {
      if (
        birdElement.offsetLeft + birdElement.width > bombLeft &&
        birdElement.offsetLeft < bombRight &&
        birdElement.offsetTop + birdElement.height > bombTop &&
        birdElement.offsetTop < bombBottom
      ) {
        currentGame.score += birdElement.bird.points;
        if(currentGame.score<0){
          currentGame.score=0;
          scoreTextField.innerHTML="Score: 0";
        }else{
     
        // console.log("score",currentGame.score);
        scoreTextField.innerHTML = "Score: " + currentGame.score;}
        birdsKilledTextField.innerHTML =
          "BirdsKilled: " + ++currentGame.birdKilled;
        birdElement.src = "./images/gif/birdboom.gif";
        setTimeout(function () {
          birdElement.remove();
        }, 1000);
      }
    });
    // remove Bomb
    this.src = "images/gif/bombboom.gif";
    const destroyElement = this.bomb.destroyElementbomb;
    const bombBoom = this.bomb;

    setTimeout(function () {
      destroyElement(bombBoom);
    }, 1000);
  };
  endGame = function () {
    clearInterval(this.birdInterval); // this.birdInterval
    clearInterval(this.bombInterval);
    birdDiv.innerHTML = "";
    bombDiv.innerHTML = "";
    
    localStorage.setItem(userName, currentGame.score.toLocaleString());
    console.log("endGame");
    console.log(userName, currentGame.score, lastDate);
  };
}
const displayWinAndLoseDiv = function () {
  const winLoseDiv = document.querySelector(".winlosediv");
  const imageDiv = document.querySelector(".imgwinlose");
  const winLoseWord = document.querySelector(".winlose");
  console.log("winlose", winLoseWord);
  const scoreWL = document.querySelector(".score");
  const playAgainBtn = document.querySelector(".playagain");
  if (currentGame.score > 50) {
    winLoseDiv.classList.toggle("invisible");
    imageDiv.src = "/images/gif/win2.gif";
    winLoseWord.innerHTML = "You Win !!!!";
    winLoseWord.classList.add("win");
    winLoseWord.classList.remove("lose");
    scoreWL.innerHTML = "Score: " + currentGame.score;
    playAgainBtn.onclick = function () {
      winLoseDiv.classList.toggle("invisible");
      randomBackground();
      showStartDiv();
    };
  } else {
    winLoseDiv.classList.toggle("invisible");
    imageDiv.src = "/images/gif/lose.gif";
    winLoseWord.innerHTML = "You Lose !!!!";
    winLoseWord.classList.add("lose");
    winLoseWord.classList.remove("win");
    scoreWL.innerHTML = "Score: " + currentGame.score;
    playAgainBtn.onclick = function () {
      winLoseDiv.classList.toggle("invisible");
      randomBackground();
      showStartDiv();
    };
  }
};
const randomBackground = function () {
  const bg = document.querySelector(".bg");
  const img = document.querySelector(".moto");
  console.log(bg);
  if(isDarkBackGround){ 
    bg.style.backgroundImage = `url('/images/night.jpg')`;
    img.src = "images/gif/sleepyowl.gif";
  }else{
    bg.style.backgroundImage = `url('/images/morning.jpg')`;
    img.src = "images/gif/motivator.gif";
  }
   isDarkBackGround=!isDarkBackGround;
};
const showStartDiv = function () {
  userNameTextField.innerHTML = "Welcome: " + userName;
  document.querySelector(".playername").innerHTML = "Hello " + userName;
  const lastScore = localStorage.getItem(userName);
  const lastPlayedDate = lastDate;
  console.log("date", lastPlayedDate);
  if (lastScore != null) {
    document.querySelector(".lastscore").innerHTML = lastScore;
    document.querySelector(".date").innerHTML = `Date: ${lastDate}`;
    // console.log( document.querySelector(".date").innerHTML) ;
  } else {
    document.querySelector(".lastscore").innerHTML = `0`;
    // lastPlayedDate.classList.add("invisible");
  }
  welcomeDiv.classList.toggle("invisible");
  startBtn.onclick = function () {
    const game = new Game();
  };
};

window.addEventListener("load", function () {
  // const game = new Game();
  showStartDiv();

  // const randomSpeed = game.randombombSpeed();
  // console.log(game);
});
// testing
// fadel eh
// oncick image of bomb ttchange
// onclick bomb destroy surrounding birds
