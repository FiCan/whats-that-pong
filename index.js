const gameArea = document.getElementById("gameArea");
const paddleLeft = document.getElementById("left");
const paddleRight = document.getElementById("right");
const ball = document.getElementById("ball");

const movementDistance = 50;
let paddleLeftTop = 0;
const paddleLeftLeft = 15;
let paddleRightTop = 0;
const paddleWidth = 10;

// const ballBaseSpeed = 3;
let ballTop = 0;
let ballLeft = 0;
const ballWidth = 10;
let ballSpeedX = 0;
let ballSpeedY = 0;
let leftScore = 0;
let rightScore = 0;

function handleKeyPress(event) {
  switch (event.key) {
    case "a": {
      paddleLeftTop = Math.min(
        gameArea.clientHeight - paddleLeft.offsetHeight,
        paddleLeftTop + movementDistance
      );
      break;
    }
    case "q": {
      paddleLeftTop = Math.max(0, paddleLeftTop - movementDistance);
      break;
    }
    case "l": {
      paddleRightTop = Math.min(
        gameArea.clientHeight - paddleRight.offsetHeight,
        paddleRightTop + movementDistance
      );
      break;
    }
    case "p": {
      paddleRightTop = Math.max(0, paddleRightTop - movementDistance);
      break;
    }
  }

  paddleLeft.style.top = paddleLeftTop + "px";
  paddleRight.style.top = paddleRightTop + "px";
}

// TODO: Come back to this
// function getRandomBallSpeed() {
//   const speed = ballBaseSpeed;
//   const quandrant = randomRange(0, 3);
//   const angle = randomRange(10, 80) + 90 * quandrant;
//   const x = Math.cos(angle) * speed;
//   const y = Math.cos(angle) * speed;
//   return {
//     x,
//     y,
//   };
// }

function resetBall() {
  ballLeft = gameArea.clientWidth / 2 - ball.clientWidth / 2;
  ballTop = gameArea.clientHeight / 2 - ball.clientHeight / 2;
  setBallPosition();
  // const newSpeed = getRandomBallSpeed();
  // ballSpeedX = newSpeed.x;
  // ballSpeedY = newSpeed.y;
  ballSpeedX = randomRange(3, 20);
  ballSpeedX = Math.random() > 0.5 ? ballSpeedX : -ballSpeedX;
  ballSpeedY = randomRange(3, 20);
  ballSpeedY = Math.random() > 0.5 ? ballSpeedY : -ballSpeedY;
}

function randomRange(min, max) {
  let rangeDifference = max - min;
  return min + rangeDifference * Math.random();
}

function moveBall() {
  if (ballSpeedX === 0 && ballSpeedY === 0) {
    return;
  }
  ballTop += ballSpeedY;
  ballLeft += ballSpeedX;
  setBallPosition();
  checkPaddleCollision();
  if (ballTop < 0) {
    ballSpeedY *= -1;
  }
  if (ballTop > gameArea.clientHeight) {
    ballSpeedY *= -1;
  }
  if (ballLeft < 0) {
    leftScore++;
    goalScored();
  }
  if (ballLeft > gameArea.clientWidth - ball.clientWidth) {
    rightScore++;
    goalScored();
  }
}

function checkPaddleCollision() {
  const paddleLeftBottom = paddleLeftTop + paddleLeft.clientHeight;
  if (ballTop >= paddleLeftTop && ballTop <= paddleLeftBottom) {
    if (ballLeft <= paddleLeftLeft + paddleWidth) {
      ballLeft = paddleLeftLeft + paddleWidth + 1;
      ballSpeedX *= -1;
    }
  }
  const paddleRightBottom = paddleRightTop + paddleRight.clientHeight;
  const paddleRightRight = gameArea.clientWidth - 15;
  if (ballTop >= paddleRightTop && ballTop <= paddleRightBottom) {
    if (ballLeft + ballWidth >= paddleRightRight - paddleWidth) {
      ballLeft = paddleRightRight - paddleWidth - 1 - ballWidth;
      ballSpeedX *= -1;
    }
  }
}

function goalScored() {
  ballSpeedX = 0;
  ballSpeedY = 0;
  setTimeout(resetBall, 2000);
  document.getElementById("leftScore").innerText = leftScore;
  document.getElementById("rightScore").innerText = rightScore;
}

function setBallPosition() {
  ball.style.top = ballTop + "px";
  ball.style.left = ballLeft + "px";
}

function startGame() {
  document.getElementById("welcomeArea").style.display = "none";
  document.getElementById("gameArea").style.display = "flex";
  resetBall();
  console.log("ballPosition", ballLeft, ballTop);
  setTimeout(function () {
    setInterval(moveBall, 1000 / 30);
  }, 2000);
}

window.addEventListener("keypress", handleKeyPress);
document.getElementById("startButton").addEventListener("click", startGame);
resetBall();
// setTimeout(startGame, 500);
