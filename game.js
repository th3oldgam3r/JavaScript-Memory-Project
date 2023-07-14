var tileImages = [];
var tileArray = [];
var tileFlippedOver = [];
var cardFlipped = -1;
var timer = '';
var playLockout = false;
var gamePlay = false;
var score = 0;


var startButton = document.getElementById('start');
var gameBoard = document.getElementById('gameboard');
var message = document.getElementById('message');
var score = document.getElementById(".score");

startButton.addEventListener("click", startGame);

function startGame() {
  cardFlipped = -1;
  playLockout = false;
  startButton.style.display = "none";
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
    message.innerHTML = "Klicke eine Karte";
  }
  console.log("started");
}

function buildBoard() {
  var html = "";
  for (var x = 0; x <= tileArray.length - 1; x++) {
    html += '<div class="gameTile"><div class="gameTile">';
    html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
  }
  gameBoard.innerHTML = html;
}

function isinArray(v,array){
  return array.indexOf(v) > -1;
}

function cardFlip(t,ti) {
  t.src = "images/"+tileArray[ti];
  tileFlippedOver.push(t.id);
}

function hideCard() {
  for(var x=0; x<2; x++) {
    var vid = tileFlippedOver.pop();
    document.getElementById(vid).src = "images/back.jpg";
  }
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "Klicke eine Karte";
}

function gameover(){
  startButton.style.display = 'block';
  message.innerHTML = "Klicke Start für ein neues Spiel";
  gamePlay = false;
  tileImages = [];
  tileFlippedOver = [];
}

function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}

function pickCard(tileIndex, t) {
  if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
    if (cardFlipped >= 0) {
      cardFlip(t,tileIndex);
      playLockout = true;
      if(checkSrc(tileFlippedOver[tileFlippedOver.length-1]) == checkSrc(tileFlippedOver[tileFlippedOver.length-2])) {
        message.innerHTML = "RICHTIG... Weiter so";
        playLockout = false;
        cardFlipped = -1;
    
        if(tileFlippedOver.length == tileArray.length) {
          gameover();
        }
      } else {
        message.innerHTML = "Oops, noch mal";
        timer = setInterval(hideCard,1000);
      }
    } else {
      cardFlipped = tileIndex;
      cardFlip(t,tileIndex);
    }
  } else {
    message.innerHTML = "Nicht klickbar";
  }
}

function buildArray() {
  for (var x = 1; x < 7; x++) {
    tileImages.push(x+'.jpg');
  }
}

function shuffleArray(array) {
  for (var x = array.length - 1; x > 0; x--) {
    var holder = Math.floor(Math.random() * (x + 1));
    var itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
  }
  return array;
}
