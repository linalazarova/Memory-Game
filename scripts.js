const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

shuffleDeck();

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {

  if(lockBoard) return;

  if(this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {

    //First click
    hasFlippedCard = true;
    firstCard = this;

    return; 
  } 

    //Second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch(){

  if (firstCard.dataset.card === secondCard.dataset.card) {

    //Found a match
    disableCards();

  } else {

    //Not a match
    unflipCards();

  }
}

function disableCards(){

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards(){

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {

  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffleDeck() {
  cards.forEach(card => {
    let position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
};



