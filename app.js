// Create a list that holds all of your cards
let cardList = ["fa-bicycle","fa-bicycle","fa-leaf","fa-leaf","fa-cube","fa-cube","fa-anchor","fa-anchor","fa-paper-plane-o","fa-paper-plane-o","fa-bolt","fa-bolt","fa-bomb","fa-bomb","fa-diamond","fa-diamond"];

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

//Initialize shuffling function
shuffle(cardList);

//Stored all global variables
const stars = document.querySelector('.stars');
const oneStar = stars.getElementsByTagName("li");
const movesNumber = document.querySelector('.moves');
let timer = document.querySelector('.timer');
let moves = 0;
let minutes = 0;
let seconds = 0;
let hours = 0;
let restartButton = document.querySelector('.restart');
let board = document.querySelector(".deck");

//Creating dynamic list
function createDeck () {
 for (let i = 0; i < cardList.length; i++) {
     let createList = document.createElement("li");
     createList.classList.add("card");
     createList.innerHTML = '<i class="fa ' + cardList[i] + '"></i>';
     moves = 0;
     board.appendChild(createList);
     }
 }

//Initializing the game
createDeck();
let allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];

//Function opening and closing all the cards after one sec delay
allCards.forEach(function (card) {
    card.addEventListener('click', function (event) {
        if (card.classList.contains('open') != true && card.classList.contains('show') != true) {
            openCards.push(card);
            card.classList.add('open', 'show');
compareCards();
        }
    });
});

function compareCards () {
  if (openCards.length == 2) {
      //Compare innerHTML and if they match flip them over
      if (openCards[0].innerHTML == openCards[1].innerHTML) {
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          matchedCards.push(openCards);
          openCards = [];
          congrats();
          close();
      } else {
          //hide if cards do not match
          setTimeout(function() {
              openCards.forEach(function(card) {
                  card.classList.remove('open', 'show');
                  openCards = [];
              });
          }, 1000);
      }
countingMoves();
  }
}


function countingMoves () {
  //Counting moves
  moves++;
  movesNumber.innerHTML = moves;
  //Removing stars
  if (movesNumber.innerHTML == 12 ) {
    var last = oneStar[oneStar.length-1];
    stars.removeChild(last);
  }
  if (movesNumber.innerHTML == 18 ) {
    var last = oneStar[oneStar.length-1];
    stars.removeChild(last);
  }
}

//Set timer
var setTimer = setInterval (function (){
  seconds++;
  timer.innerHTML = hours + ' hrs ' + minutes + ' mins ' + seconds + ' secs';
  if (seconds == 60) {
    minutes++
    seconds = 0;
  }
  if (minutes == 60) {
    hours++;
    minutes = 0;
  }
}, 1000);

//Stop timer
function stopTimer () {
  clearInterval(setTimer);
}

//Reset button

restartButton.addEventListener('click', function () {

//Reset and stop time
  timer.innerHTML = 0 + ' hrs ' + 0  + ' mins ' + 0  + ' secs';
stopTimer();
//Reset moves
movesNumber.innerHTML = 0;
moves=0;
setTimer;
//Flipping cards over
allCards.forEach(function(card) {
card.classList.remove('open', 'show');
card.classList.remove('match');
card.classList.add('card');
openCards=[];

//Creating newboard
board.innerHTML = "";
shuffle(cardList);
createDeck();
//Call the matching function again
});
});

var modal = document.querySelector('#myModal');
const closing = document.querySelector(".close");
let popuptext = document.querySelector('.popuptext')

//Creating popup function
function congrats () {
  if (matchedCards.length == 8) {

stopTimer();
finalTime = timer.innerHTML;
  popuptext.innerHTML = '<b>Congratulations !!</b> <br/> <br/>You did this in ' + moves +' moves! </br> <br/> It took you '+ finalTime + ' !<br/> <br/>' + stars.innerHTML + '<b>stars</b>';
  modal.style.display = 'block';
  }
}

//function closing popup screen
function close () {
  closing.addEventListener('click', function () {
    modal.style.display = "none";
  })
}