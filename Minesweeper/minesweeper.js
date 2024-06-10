document.addEventListener("DOMContentLoaded", () => {
    const difficultySelected = document.getElementById('difficulty-selected');
    const gameBoard = document.getElementById('game-board');
    const timerValue = document.getElementById('timer-value');
    const mineCountValue = document.getElementById('mine-count-value');
    const startBtn = document.getElementById('Start-btn');

    let numRows = 9;
    let numCols = 9;
    let mineCount = 10;
    let timer = 0;
    let timerInterval;

    const difficultySettings = {
        Easy: { numRows: 9, numCols: 9, mineCount: 10 },
        Medium: { numRows: 16, numCols: 16, mineCount: 40 },
        Hard: { numRows: 16, numCols: 30, mineCount: 99 },
    };

    let selectedDifficulty = 'Easy'; // Default difficulty

    function setDifficulty(level) {
        selectedDifficulty = level;
        difficultySelected.textContent = level;
    }

    // Initialize the game
    function initGame() {
        const settings = difficultySettings[selectedDifficulty];
        numRows = settings.numRows;
        numCols = settings.numCols;
        mineCount = settings.mineCount;
        timer = 0;
        timerValue.textContent = timer;
        mineCountValue.textContent = mineCount;

        // Clear the game board
        gameBoard.innerHTML = '';

        // Set the game board grid template
        gameBoard.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        // Generate the grid cells
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
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

    // Initialize game on start button click
    startBtn.addEventListener('click', initGame);


    // Flag grid cells on click
    
    function handleFlagtClick(event) {
        event.preventDefault(); // Prevent the context menu from appearing
        const cell = event.target;
        if (!cell.classList.contains('revealed')) {
            cell.classList.toggle('flagged');
        }
    }

    // Clear grid cells on click
    function handleCellClick(event) {
        const cell = event.target;
        // Add logic to reveal the cell
        if (!cell.classList.contains('flagged')) {
            cell.classList.add('revealed');
            // Logic to check if the cell is a mine or how many mines are around it
        }
    }


});