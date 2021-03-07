const gridContainer = document.querySelector('#grid-container');
const chance = document.querySelector('.chance');
const finish = document.querySelector('.finish')
const playAgain = document.querySelector('.play-again')

//! create a deck of cards from 1-n
const cardsArray = [];

const createCardsArray = (n) => {
    for (let i = 1; i < n + 1; i++) {
        cardsArray.push(i.toString(), i.toString());        
    }
}
createCardsArray(3);

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
shuffleArray(cardsArray);

//! insert the divs to the grid container
const addCards = () => {
    cardsArray.forEach(e => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute(`data-card-type`,e);
        gridContainer.appendChild(card)
    })
}
addCards();

counterFlipped = 0;

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
		cache.splice(0);
        counterFlipped++;
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
	}
};

const cache = [];
let curr1;
let curr2;

gridContainer.addEventListener('click', flipCard);
playAgain.addEventListener('click',() => location.reload())