'use strict';

//------------------- Random number generator
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//--------------------- Reset the max range
function setMaxRange() {
  const message = document.querySelector('.message').textContent;

  const newRangeMax = document.getElementById('range').value;
  secretNumber = randomInteger(1, newRangeMax);
  score = newRangeMax;

  if (message !== winMessage && message !== loseMessage)
    displayScore(newRangeMax);
}

const winMessage = '🎯 Nailed it!';
const loseMessage = '❌ You lose!';
let newRangeMax;
let highScore = 0;
let rangeMax = document.getElementById('range').value;
let secretNumber = randomInteger(1, rangeMax);
let score = rangeMax;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displaySecret = function (number) {
  document.querySelector('.number').textContent = number;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayHighScore = function (score) {
  document.querySelector('.highscore').textContent = score;
};

const toggleUserInputDisplay = function (visibility) {
  document.querySelector('.check').style.display = visibility;
  document.querySelector('.guess').style.display = visibility;
};

const resetGuess = function () {
  document.querySelector('.guess').value = '';
};

const setBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const setSecretWidth = function (width) {
  document.querySelector('.number').style.width = width;
};

//---------------------------- Check
document.querySelector('.check').addEventListener('click', function () {
  // User input
  const guess = Number(document.querySelector('.guess').value);
  newRangeMax = document.getElementById('range').value;

  document.querySelector('.between').style.display = 'none';

  console.log(secretNumber); // DELETE ME

  // No input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // Player wins
  } else if (guess === secretNumber) {
    displayMessage(winMessage);
    displaySecret(secretNumber);
    toggleUserInputDisplay('none');
    document.querySelector('.again').style.display = 'block';
    document.querySelector('.again').style.animationPlayState = 'running';
    document.querySelector('.between').style.display = 'block';

    setBackgroundColor('#4faf44');
    setSecretWidth('30rem');

    // High score
    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }

    // Guess is incorrect
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? '👆 Guess is too high!' : '👇 Guess is too low!'
      );

      displayScore(--score);
    } else {
      displayMessage(loseMessage);
      displayScore(0);
      displaySecret(secretNumber);
      toggleUserInputDisplay('none');
      document.querySelector('.again').style.display = 'block';
      document.querySelector('.again').style.animationPlayState = 'running';
      document.querySelector('.between').style.display = 'block';

      setBackgroundColor('#B40D0D');
      setSecretWidth('30rem');
    }
  }
});

//---------------------------- New Game
document.querySelector('.again').addEventListener('click', function () {
  score = document.getElementById('range').value;
  secretNumber = randomInteger(1, rangeMax);

  document.querySelector('.again').style.display = 'none';

  if (rangeMax !== newRangeMax) displayHighScore(0);

  displayMessage('Start guessing...');
  displayScore(score);
  displaySecret('?');
  resetGuess();
  toggleUserInputDisplay('block');

  setSecretWidth('20rem');
  setBackgroundColor('#222');
});
