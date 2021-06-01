'use strict';

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// store dom cards
const cardsEl = [];

// store card data
const cardsData = [
  {
    question: 'What is your nick name?',
    answer: 'Dumbi',
  },
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data',
  },
  {
    question: 'Example of Case Sensitive Variable',
    answer: 'thisIsAVariable',
  },
];

// create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// to create a single card in the dom
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  // add active class to the first card
  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  // EVENT LISTENERS
  // to flip the card
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // add to dom cards
  cardsEl.push(card);

  // add it into the main container
  cardsContainer.appendChild(card);

  // to display page number
  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.textContent = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// to browse next cards
nextBtn.addEventListener('click', () => {
  // hide card to the left
  cardsEl[currentActiveCard].className = 'card left';

  // setting new index of next card
  // if we are in card index 1, next one is on index 2
  currentActiveCard = currentActiveCard + 1;

  // subtracting 1 since array is 0 based
  if (currentActiveCard > cardsEl.length - 1) {
    // setting current card to be the last item so that we stop there
    currentActiveCard = cardsEl.length - 1;
  }

  // set next card to - active
  cardsEl[currentActiveCard].className = 'card active';

  // update display numbers
  updateCurrentText();
});

// to browse previous cards
prevBtn.addEventListener('click', () => {
  // hide card to the left
  cardsEl[currentActiveCard].className = 'card right';

  // setting new index of next card
  // if we are in card index 2, prev one is 1 - going backwards
  currentActiveCard = currentActiveCard - 1;

  // if we are at the first card, we want to stop there
  if (currentActiveCard < 0) {
    // set it to 0, don't do anything
    currentActiveCard = 0;
  }

  // set next card to - active
  cardsEl[currentActiveCard].className = 'card active';

  // update display numbers
  updateCurrentText();
});

// invoking the func
createCards();
