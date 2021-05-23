const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// init difficulty
// set it from local storage if available else to default
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus input
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

// update score
function updateScore() {
  score++;

  // display score
  scoreEl.innerHTML = score;
}

// update time
function updateTime() {
  time--;

  // display time
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    // stop interval
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score} </p>

  
  <button onClick='window.location.reload()'>Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

// Event listeners

// typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    // generate another word
    addWordToDOM();

    updateScore();

    // clear
    text.value = '';

    if (difficulty === 'hard') {
      // add time
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    // display time
    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// difficulty select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;

  // save in local storage
  localStorage.setItem('difficulty', difficulty);
});
