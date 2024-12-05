const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const scoreXText = document.getElementById("score-x");
const scoreOText = document.getElementById("score-o");

let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;

  if (cell.classList.contains("taken") || !gameActive) return;

  // Mark cell and update UI
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
    updateScore(currentPlayer);
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusText.textContent = "🤝 It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => cells[index].textContent === player)
  );
}

function checkDraw() {
  return [...cells].every(cell => cell.classList.contains("taken"));
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else if (player === "O") {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
