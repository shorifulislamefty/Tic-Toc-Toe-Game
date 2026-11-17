// Select HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("h2");
const resultText = document.querySelector(".result");
const restartButton = document.querySelector("button");

// Game variables
let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
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
function handleClick(event) {

    const index = Array.from(cells).indexOf(event.target);

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
}

// Check winner
function checkWinner() {

    let roundWon = false;

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultText.textContent =
            "🎉 Player " + currentPlayer + " Wins!";

        statusText.textContent = "Game Over!";
        gameActive = false;
        return;
    }

    // Check draw
    if (!board.includes("")) {

        resultText.textContent = "🤝 It's a Draw!";
        statusText.textContent = "Game Over!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";
}

// Restart game
function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's Turn";
    resultText.textContent = "";
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartButton.addEventListener("click", restartGame);