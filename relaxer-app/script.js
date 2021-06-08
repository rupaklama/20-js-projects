'use strict';

const container = document.getElementById('container');
const text = document.getElementById('text');

// total time to go around - 7.5s
const totalTime = 7500;

// breathe time 3000 - 3s
const breatheTime = (totalTime / 5) * 2;

// hold time 1500 - 1.5s
const holdTime = totalTime / 5;

function breathAnimation() {
  text.textContent = 'Breathe In!';

  container.className = 'container grow';

  setTimeout(() => {
    text.textContent = 'Hold';

    setTimeout(() => {
      text.textContent = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

// to keep above running
setInterval(breathAnimation, totalTime);

breathAnimation();
