document.addEventListener("DOMContentLoaded", () => {
    // Connect to html
    const difficultySelected = document.getElementById('difficulty-selected');
    const gameBoard = document.getElementById('game-board');
    const timerValue = document.getElementById('timer-value');
    const mineCountValue = document.getElementById('mine-count-value');
    const startBtn = document.getElementById('start-btn');

    // Declare Variables
    let numRows = 9;
    let numCols = 9;
    let mineCount = 10;
    let timer = 0;
    let timerInterval;
    let firstClick = true;
    let mines = [];
    let cells = [];

    // Difficulty functions

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

    document.getElementById('Easy-btn').addEventListener('click', () => setDifficulty('Easy'));
    document.getElementById('Medium-btn').addEventListener('click', () => setDifficulty('Medium'));
    document.getElementById('Hard-btn').addEventListener('click', () => setDifficulty('Hard'));
    
        
    // Initialize game on start button click
    startBtn.addEventListener('click', initGame);

    // Initialize the game
    function initGame() {
        const settings = difficultySettings[selectedDifficulty];
        numRows = settings.numRows;
        numCols = settings.numCols;
        mineCount = settings.mineCount;
        timer = 0;
        timerValue.textContent = timer;
        mineCountValue.textContent = mineCount;
        firstClick = true;
        mines = [];
        cells = [];

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

                cell.addEventListener('click', handleCellClick);
                cell.addEventListener('contextmenu', handleFlagClick);
                gameBoard.appendChild(cell);
                cells.push(cell);
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

    // Flag grid cells on click
    function handleFlagClick(event) {
        event.preventDefault(); // Prevent the context menu from appearing
        const cell = event.target;
        if (!cell.classList.contains('revealed')) {
            cell.classList.toggle('flagged');
        }
    }

    // Clear grid cells on click
    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (firstClick) {
            firstClick = false;
            initCells(row, col); // Initialize mines avoiding the first clicked cell
        }

        if (!cell.classList.contains('flagged')) {
            cell.classList.add('revealed');
            // Logic to check if the cell is a mine or how many mines are around it
            if (mines.some(mine => mine.row === row && mine.col === col)) {
                cell.classList.add('mine');
                alert("Game Over!");
            } else {
                // Add logic to reveal surrounding cells if no mines are nearby
            }
        }
    }

    function initCells(excludeRow, excludeCol) {
        let availableCells = cells.filter(cell => {
            return !(parseInt(cell.dataset.row) === excludeRow && parseInt(cell.dataset.col) === excludeCol);
        });

        while (mines.length < mineCount) {
            let randomIndex = Math.floor(Math.random() * availableCells.length);
            let mineCell = availableCells.splice(randomIndex, 1)[0];
            mines.push({ row: parseInt(mineCell.dataset.row), col: parseInt(mineCell.dataset.col) });
        }

        console.log("Mines generated:", mines);
    }

    function countNearbyMines(row, col) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        let count = 0;
        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                if (mines.some(mine => mine.row === newRow && mine.col === newCol)) {
                    count++;
                }
            }
        });
        return count;
    }

    function revealCell(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (cell.classList.contains('revealed') || cell.classList.contains('flagged')) {
            return;
        }

        cell.classList.add('revealed');

        if (mines.some(mine => mine.row === row && mine.col === col)) {
            cell.classList.add('mine');
            cell.style.backgroundImage = `url('../images/Minesweeper Mine (Correct).png')`;
            alert("Game Over!");
        } else {
            const mineCount = countNearbyMines(row, col);
            cell.textContent = mineCount > 0 ? mineCount : '';
            cell.style.backgroundImage = mineCount > 0 ? `url('../images/Minesweeper ${mineCount}.png')` : '';
            if (mineCount === 0) {
                // Reveal surrounding cells if there are no nearby mines
                const directions = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1],         [0, 1],
                    [1, -1], [1, 0], [1, 1]
                ];
                directions.forEach(([dx, dy]) => {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                        const adjacentCell = gameBoard.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);
                        revealCell(adjacentCell);
                    }
                });
            }
        }
    }
});