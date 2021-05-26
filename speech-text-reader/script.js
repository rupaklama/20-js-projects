'use strict';

const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

// to loop above data
// createBox is a func which gets call on each objects
data.forEach(createBox);

// create speech boxes
// takes same params as in forEach above
function createBox(item) {
  const box = document.createElement('div');

  // object's props
  const { image, text } = item;

  // add a class in above div
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // @todo - speak event
  box.addEventListener('click', () => {
    // set text to announce
    setTextMessage(text);

    // announce text
    speakText();

    // add active effect
    box.classList.add('active');

    // quickly remove above class
    setTimeout(() => box.classList.remove('active'), 800);
  });

  // add it into the main tag to display
  main.appendChild(box);
}

// init speech synth - to announce custom text which gets store in it
let message = new SpeechSynthesisUtterance();

// store voices objects
let voices = [];

// getVoices() method of the SpeechSynthesis interface returns a list of SpeechSynthesisVoice objects
// representing all the available voices on the current device

function getVoices() {
  // speechSynthesisInstance.getVoices() - returns A list (array) of SpeechSynthesisVoice objects.
  voices = speechSynthesis.getVoices();

  // looping through each Voices Objects
  voices.forEach(voice => {
    // assigning each object into Option element to display it
    const option = document.createElement('option');

    // option property to be of Voice object's properties
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;

    // select element
    voicesSelect.appendChild(option);
  });
}

// set text to announce
function setTextMessage(text) {
  // setting text for message
  message.text = text;
}

// announce text
function speakText() {
  // announcing above set text here
  speechSynthesis.speak(message);
}

// on new voices - changed event, run the func again
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// set voice based on select element option's value
voicesSelect.addEventListener('change', e => {
  // value attrib in 'option' element
  message.voice = voices.find(voice => voice.name === e.target.value);
});

// read text button to announce text in text area
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// calling func
getVoices();
