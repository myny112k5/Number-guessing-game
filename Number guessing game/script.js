let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const restartGame = document.getElementById('restartGame');
const hint = document.getElementById('hint');
const attemptsDisplay = document.getElementById('attemptsLeft');
const resultImage = document.getElementById('resultImage');
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiPieces = [];

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiPieces.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 5 + 2,
      angle: Math.random() * 360
    });
  }
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    confettiCtx.fillStyle = p.color;
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    confettiCtx.fill();

    p.y += p.speed;
    p.x += Math.sin(p.angle) * 2;

    if (p.y > window.innerHeight) {
      p.y = 0;
      p.x = Math.random() * window.innerWidth;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

function endGame(message, emoji) {
  hint.textContent = message;
  resultImage.innerHTML = emoji;
  submitGuess.disabled = true;
  restartGame.style.display = "inline-block";
}

submitGuess.addEventListener('click', function() {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100) {
    hint.textContent = "🎯 Please guess between 1 and 100!";
    return;
  }

  if (userGuess === secretNumber) {
    createConfetti();
    animateConfetti();
    endGame(`🎉 Correct! The number was ${secretNumber}!`, "🎉");
    hint.style.color = "green";
  } else {
    if (userGuess > secretNumber) {
      hint.textContent = "📈 Too High!";
    } else {
      hint.textContent = "📉 Too Low!";
    }
    hint.style.color = "red";

    attemptsLeft--;
    attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;

    if (attemptsLeft === 0) {
      endGame(`👎 Game Over! The number was ${secretNumber}.`, "👎");
    }
  }

  guessInput.value = '';
});

restartGame.addEventListener('click', function() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  submitGuess.disabled = false;
  restartGame.style.display = "none";
  hint.textContent = '';
  attemptsDisplay.textContent = '';
  guessInput.value = '';
  resultImage.innerHTML = '';
  confettiPieces = [];
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
});

window.addEventListener('resize', function() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;



