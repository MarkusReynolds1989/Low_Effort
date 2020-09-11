// eslint-disable-next-line no-undef
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let process;
let gameOver = false;
let lives = 3;
let score = 0;
let timer = 0;
let seconds = 0;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
const smiley = {
  x: 300,
  y: 400,
  dx: 100,
  dy: 100,
};

const bullets = [];

// eslint-disable-next-line no-undef
const smiley1 = new Image();
smiley1.src = 'Assets/smiley.png';

function Init() {
  bullets.push({
    x: Math.floor(Math.random() * 700 + 1),
    y: 0,
    dx: 20,
    dy: 100,
  });
}

function Score() {
  ctx.font = '22px serif';
  ctx.fillText(`Score: ${Math.round(score)}`, 650, 50);
}

function Timer() {
  ctx.font = '22px serif';
  ctx.fillText(`Timer: ${seconds}`, 10, 50);
}

function Lives() {
  ctx.font = '22px serif';
  ctx.fillText(`Lives: ${lives}`, 300, 50);
}

const IsRecTouching = (item1, item2) => item1.x < (item2.x + item2.dx)
&& (item1.x + item1.dx) > item2.x
&& item1.y < (item2.y + item2.dy)
&& (item1.y + item1.dy) > item2.y;

function IncTime() {
  if (timer > 150) {
    seconds += 1;
    timer = 0;
  }
}

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(smiley1, smiley.x, smiley.y);
  Score();
  Timer();
  Lives();
  for (let i = 0; i < bullets.length; i += 1) {
    ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].dx, bullets[i].dy);
  }
}

function GameOver() {
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.fillText('You lose', 300, 400);
  ctx.fillText(`Final Score ${Math.round(score + seconds)}`, 300, 450);
}

function Update() {
  Draw();
  timer += 1;
  IncTime();
  if (rightPressed
        && smiley.x < 700
        && timer > 50) {
    smiley.x += 3;
  }
  if (leftPressed
        && smiley.x > 100) {
    smiley.x -= 3;
  }
  if (upPressed
        && smiley.y > 100
        && timer > 20) {
    smiley.y -= 3;
  }
  if (downPressed
        && smiley.y < 700
        && timer > 99) {
    smiley.y += 3;
  }
  for (let i = 0; i < bullets.length; i += 1) {
    bullets[i].y += 5;
    if (bullets[i].y + 100 > 790) {
      bullets.pop(bullets[i]);
      score += 0.25;
    }
    if (IsRecTouching(smiley, bullets[i])) {
      lives -= 1;
      bullets.pop(bullets[i]);
    }
  }
  if (bullets.length < 1) {
    for (let i = 0; i < score; i += 1) {
      bullets.push({
        x: Math.floor(Math.random() * 700 + 1),
        y: 0,
        dx: 20,
        dy: 100,
      });
    }
  }
  if (lives < 0) {
    gameOver = true;
  }
  if (gameOver) {
    clearInterval(process);
    GameOver();
  }
}

// eslint-disable-next-line no-use-before-define, no-undef
document.addEventListener('keydown', keyDownHandler, false);
// eslint-disable-next-line no-use-before-define, no-undef
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right'
        || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left'
        || e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === 'Up'
        || e.key === 'ArrowUp') {
    upPressed = true;
  } else if (e.key === 'Down'
        || e.key === 'ArrowDown') {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === 'Up'
        || e.key === 'ArrowUp') {
    upPressed = false;
  } else if (e.key === 'Down'
        || e.key === 'ArrowDown') {
    downPressed = false;
  }
}

process = setInterval(Update, 10);
Init();
