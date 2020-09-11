var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gameOver = false;
var score = 0;

let smiley1 = new Image();
smiley1.src = "Assets/smiley.png";

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right"
        || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left"
        || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == "Up"
        || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == "Down"
        || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "Up"
        || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "Down"
        || e.key == "ArrowDown") {
        downPressed = false;
    }
}

var smiley = {
    'x': 300 
    , 'y': 400 
};

var bullet = {
    'x': 0
    , 'y': 0
    , 'dx': 15
    , 'dy': 15
};

// Gameover and set clock.
if (!gameOver) {
    setInterval(Update, 10);
}

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(smiley1, smiley.x, smiley.y);
    Score();
}

function Update() {
    Draw();
    if (rightPressed
        && smiley.x < 700) {
        smiley.x += 3;
    }
    if (leftPressed
        && smiley.x > 100) {
        smiley.x -= 3;
    }
    if (upPressed
        && smiley.y > 100) {
        smiley.y -= 3;
    }
    if (downPressed 
        && smiley.y < 700) {
        smiley.y += 3;
    }
}

function Score() {
    ctx.font = '22px serif';
    ctx.fillText("Score: " + score, 650, 50);
}
