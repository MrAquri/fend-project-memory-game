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

shuffle(cardList);

//Creating dynamic list

function createDeck () {
let board = document.querySelector(".deck");
 for (let i = 0; i < cardList.length; i++) {
     let createList = document.createElement("li");
     createList.classList.add("card");
     createList.innerHTML = '<i class="fa ' + cardList[i] + '"></i>';
     board.appendChild(createList);
     }
 }



//Initializing the game
createDeck();

const allCards = document.querySelectorAll('.card');
let openCards = [];
//Function opening and closing all the cards after one sec delay
allCards.forEach(function(card) {
    card.addEventListener('click', function(event) {
        if (card.classList.contains('open') != true && card.classList.contains('show') != true) {
            openCards.push(card);
            card.classList.add('open', 'show');
            if (openCards.length == 2) {
                if (openCards[0].innerHTML == openCards[1].innerHTML) {
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                }
                //hide if cards do not match
                setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                        openCards = [];
                    });
                }, 1000);
            }
        }
    });
});

//Storing values





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
