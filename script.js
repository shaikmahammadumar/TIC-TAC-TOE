document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const currentPlayerDisplay = document.getElementById('current-player');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '') return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            alert(`${currentPlayer} wins! 🏆`);
            resetBoard();
        } else if (board.every(cell => cell !== '')) {
            alert('It\'s a draw! 🤝');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = currentPlayer;
        }
    }
    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }
    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetBoard);
});
