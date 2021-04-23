// elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Helper functions
// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// update progress & timestamp
function updateProgress() {
  // to run in percentage duration, starting at 0%
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);

  if (mins < 10) {
    mins = '0' + mins; // 01
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);

  if (secs < 10) {
    secs = '0' + secs; // 01
  }

  timestamp.innerHTML = `${mins}:${secs}`;
  // console.log(typeof timestamp.innerHTML);
}

// play/pause video
function toggleVideoStatus() {
  // Since video element is connected to Video tag, we can use its API's properties & methods
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // video.paused ? video.play() : video.pause();
}

// stop video
function stopVideo() {
  // there's no stop method in the api, need to set the current time
  video.currentTime = 0; // resetting to the beginning
  video.pause();
}

// set video progress time
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
  // console.log(typeof video.currentTime);
}

// Event Listeners
// status - play or pause
video.addEventListener('click', toggleVideoStatus);

video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

// as video plays, it is going to continuously call - timeupdate
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
