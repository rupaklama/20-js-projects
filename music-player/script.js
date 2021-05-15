'use strict';

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles - all the titles should match with songs & images
const songs = ['hey', 'summer', 'ukulele'];

// track of song to start with in an array
let songIndex = 2; // ukulele

// initially load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// play song
function playSong() {
  musicContainer.classList.add('play');

  // removing play icon
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  // adding pause icon
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  // audio api play() method
  audio.play();
}

// pause song
function pauseSong() {
  musicContainer.classList.remove('play');

  // removing play icon
  playBtn.querySelector('i.fas').classList.add('fa-play');
  // adding pause icon
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  // audio api pause() method
  audio.pause();
}

// previous song
function prevSong() {
  songIndex = songIndex - 1;

  // if it's first song & click on back button,
  // we want to go to the Last song at index of 2
  if (songIndex < 0) {
    // .length gives us 3 songs in an array
    // -1 to go to to index 2 which is the last song 'ukulele' since array is 0 based
    songIndex = songs.length - 1; // set it to last song in array
  }

  // load current index song
  loadSong(songs[songIndex]);

  playSong();
}

// next song
function nextSong() {
  songIndex = songIndex + 1;

  // if current song index is greater than last song
  // switch back to first song
  if (songIndex > songs.length - 1) {
    // 3 - 1 = 2
    // set song index to 0 which is a first song
    songIndex = 0;
  }

  // load current index song
  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  // getting the duration & current time of the song from the srcElement
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime);

  // playtime percentage
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);

  // set width of progress bar
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
  // if playing pause it or reverse
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    // console.log(isPlaying);
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);
