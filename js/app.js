// Create a list that holds all of your cards
let cardList = ["fa-bicycle", "fa-bicycle", "fa-leaf", "fa-leaf", "fa-cube", "fa-cube", "fa-anchor", "fa-anchor", "fa-paper-plane-o", "fa-paper-plane-o", "fa-bolt", "fa-bolt", "fa-bomb", "fa-bomb", "fa-diamond", "fa-diamond"];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
let movesNumber = document.querySelector('.moves');
let timer = document.querySelector('.timer');
let moves = 0;
let minutes = 0;
let seconds = 0;
let hours = 0;
let restartButton = document.querySelector('.restart');
let board = document.querySelector(".deck");
const popup = document.querySelector('.popuptext');

//Creating dynamic list
function createDeck() {
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
theGame();
let openCards = [];
let matchedCards = [];

function theGame() {

    let allCards = document.querySelectorAll('.card');

    //Function opening and closing all the cards after one sec delay
    allCards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            if (card.classList.contains('open') != true && card.classList.contains('show') != true) {
                openCards.push(card);
                card.classList.add('open', 'show');
                compareCards();
            }
        });
    });
}

//Fuction comparing two cards
function compareCards() {
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

//Function which countes moves
function countingMoves() {
    //Counting moves
    moves++;
    movesNumber.innerHTML = moves;
    //Removing stars
    if (movesNumber.innerHTML == 12) {
        var last = oneStar[oneStar.length - 1];
        stars.removeChild(last);
    }
    if (movesNumber.innerHTML == 18) {
        var last = oneStar[oneStar.length - 1];
        stars.removeChild(last);
    }
    //Start timer upon moves
    if (moves == 1) {
        seconds,
        minutes,
        hours = 0;
        setTime();
    }
}

//Set timer
var setTimer
function setTime() {
    setTimer = setInterval(function() {
        timer.innerHTML = hours + ' hrs ' + minutes + ' mins ' + seconds + ' secs';
        seconds++;
        if (seconds == 60) {
            minutes++
            seconds = 0;
        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}
//Stop timer
function stopTimer() {
    clearInterval(setTimer);
}

//Reset button

restartButton.addEventListener('click', function() {

    //Reset and stop time
    hours,
    minutes,
    seconds = 0;
    timer.innerHTML = hours + ' hrs ' + minutes + ' mins ' + seconds + ' secs';
    stopTimer();

    //Reset moves
    movesNumber.innerHTML = 0;
    moves = 0;
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>';

    //Flipping cards over
    let allCards = document.querySelectorAll('.card');
    allCards.forEach(function(card) {
        card.classList.remove('open', 'show');
        card.classList.remove('match');
        card.classList.add('card');
        openCards = [];

        //Creating newboard
        board.innerHTML = "";
        shuffle(cardList);
        createDeck();
        //Call the matching function again
        matchedCards = [];
        theGame();
    })
});

var modal = document.querySelector('#myModal');
const closing = document.querySelector(".close");
let popuptext = document.querySelector('.popuptext')

//Creating popup function
function congrats() {
    if (matchedCards.length == 8) {
        stopTimer();
        finalTime = timer.innerHTML;
        popuptext.innerHTML = '<b>Congratulations !!</b> <br/> <br/>You did this in ' + moves + ' moves! </br> <br/> It took you ' + finalTime + ' !<br/> <br/>';
        modal.style.display = 'block';
    }
}

//function closing popup screen
function close() {
    closing.addEventListener('click', function() {
        modal.style.display = "none";
    })
}
