const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

// score to begin with
let score = 0;

// bricks rows & columns
const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; //delay to reset the game

// canvas
// getContext is to do actual drawing using the CanvasRenderingContext2D interface
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// create ball props
const ball = {
  // centering a ball to start with
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, // radius

  // animation
  speed: 4,
  dx: 4, // x axis move over 4px
  dy: -4, // to move up
};

// create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// draw ball on canvas
// A path is a list of points, connected by segments of lines that can be of different shapes,
// curved or not, of different width and of different color
function drawBall() {
  // Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up
  ctx.beginPath();

  // Outer circle
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);

  // fill color
  ctx.fillStyle = '#0095dd';
  ctx.fill(); // to fill it

  // close path
  ctx.closePath();
}

// draw paddle - base
function drawPaddle() {
  ctx.beginPath();

  // draw rectangle
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);

  // fill color
  ctx.fillStyle = '#0095dd';
  ctx.fill(); // to fill it

  ctx.closePath();
}

// draw everything
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}

// draw score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

draw();

// event handlers
// display slider
rulesBtn.addEventListener('click', () => rules.classList.add('show'));

// remove slider
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
