const mainGame = document.querySelector('#main')
const gridContainer = document.querySelector('#grid-container');
const chance = document.querySelector('.chance');
const finish = document.querySelector('.finish')
const playAgain = document.querySelector('.play-again')
const start = document.querySelector('.start')
const userInput = document.querySelector('.user-input');
const intro = document.querySelector('#intro');
const mistake = document.querySelector('.mistake-counter');

//! create a deck of cards from 1-n
const cardsArray = [];
const createCardsArray = (n) => {
    for (let i = 1; i < n + 1; i++) {
        cardsArray.push(i.toString(), i.toString());        
    }
}
//! Start the game with the user's input
start.addEventListener('click',(e)=> {
    createCardsArray(parseInt(userInput.value));
    shuffleArray(cardsArray);
    addCards();
    intro.style.display = 'none';
    mainGame.style.display = 'flex';
})

//! shuffle the cards
const shuffleArray = (array) => {
    let newPos,temp;
    for (let i = array.length - 1 ; i > 0 ; i--) {
        newPos = Math.floor((Math.random()) * (i + 1));
        temp = array[i];
        array[i] = array[newPos];
        array[newPos] = temp;
    }
    return array;
}

//! insert the divs to the grid container
const addCards = () => {
    cardsArray.forEach(e => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute(`data-card-type`,e);
        gridContainer.appendChild(card)
    })
}

//!flip a card
let counterFlipped = 0;
let mistakeCounter = 0;
const flipCard = (e) => {
	if (e.target.className === 'card') {
		if (!curr1) {
			curr1 = e.target;
			cache.push(curr1);
			curr1.classList.remove('card');
		} else {
			curr2 = e.target;
			cache.push(curr2);
			curr2.classList.remove('card');
		}
	}
	if (cache.length > 1 && curr1.dataset.cardType === curr2.dataset.cardType) {
		curr1 = '';
		curr2 = '';
        counterFlipped++;
		cache.splice(0);
        if (counterFlipped === cardsArray.length / 2) {
            finish.style.display = 'flex';
        }
	}
	if (cache.length > 1 && curr1.dataset.cardType !== curr2.dataset.cardType) {

        gridContainer.removeEventListener('click', flipCard);
		setTimeout(() => {
			curr1.classList.add('card');
			curr2.classList.add('card');
			cache.splice(0);
			curr1 = '';
			curr2 = '';
            gridContainer.addEventListener('click', flipCard);
		}, 1000);
        mistakeCounter++;
		mistake.textContent = mistakeCounter.toString();
	}
};

const cache = [];
let curr1;
let curr2;

gridContainer.addEventListener('click', flipCard);
playAgain.addEventListener('click',() => location.reload())