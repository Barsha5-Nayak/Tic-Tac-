const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X'; // Player is 'X'
let gameActive = true; // Game status flag
const computerPlayer = 'O'; // Computer is 'O'
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleClick(e) {
  const cell = e.target;

  if (!cell.textContent && gameActive) {
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      winnerMessage.textContent = 'You Win!';
      gameActive = false;
    } else if (isDraw()) {
      winnerMessage.textContent = 'It\'s a Draw!';
      gameActive = false;
    } else {
      // Let the computer make its move
      currentPlayer = computerPlayer;
      computerMove();
    }
  }
}

// Computer makes a move
function computerMove() {
  const availableCells = [...cells].filter(cell => !cell.textContent);

  if (availableCells.length > 0) {
    // Choose a random available cell
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const chosenCell = availableCells[randomIndex];

    chosenCell.textContent = computerPlayer;

    if (checkWin(computerPlayer)) {
      winnerMessage.textContent = 'Computer Wins!';
      gameActive = false;
    } else if (isDraw()) {
      winnerMessage.textContent = 'It\'s a Draw!';
      gameActive = false;
    } else {
      currentPlayer = 'X'; // Switch back to the player
    }
  }
}

// Check if the current player has won
function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

// Check if the game is a draw
function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

// Restart the game
function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

// Attach event listeners to cells and restart button
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);