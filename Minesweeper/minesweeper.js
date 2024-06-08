document.addEventListener("DOMContentLoaded", () => {
    const difficultySelected = document.getElementById('difficulty-selected');
    const gameBoard = document.getElementById('game-board');
    const timerValue = document.getElementById('timer-value');
    const mineCountValue = document.getElementById('mine-count-value');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('Start-btn');

    let boardSize = 10;
    let mineCount = 10;
    let timer = 0;
    let timerInterval;

    const difficultySettings = {
        Easy: { boardSize: 10, mineCount: 10 },
        Medium: { boardSize: 16, mineCount: 40 },
        Hard: { boardSize: 22, mineCount: 99 },
        Expert: { boardSize: 30, mineCount: 150 },
    };

    function setDifficulty(level) {
        const settings = difficultySettings[level];
        boardSize = settings.boardSize;
        mineCount = settings.mineCount;
        difficultySelected.textContent = level;
        mineCountValue.textContent = mineCount;
    }

    // Initialize the game
    function initGame() {
        timer = 0;
        timerValue.textContent = timer;
        mineCountValue.textContent = mineCount;

        // Clear the game board
        gameBoard.innerHTML = '';

        // Set the game board grid template
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

        // Generate the grid cells
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }

        // Start the timer
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(() => {
            timer++;
            timerValue.textContent = timer;
        }, 1000);
    }

    // Set difficulty on button click
    document.getElementById('Easy-btn').addEventListener('click', () => setDifficulty('Easy'));
    document.getElementById('Medium-btn').addEventListener('click', () => setDifficulty('Medium'));
    document.getElementById('Hard-btn').addEventListener('click', () => setDifficulty('Hard'));
    document.getElementById('Expert-btn').addEventListener('click', () => setDifficulty('Expert'));

    // Initialize game on start button click
    startBtn.addEventListener('click', initGame);

    // Restart game when the restart button is clicked
    restartBtn.addEventListener('click', initGame);
});