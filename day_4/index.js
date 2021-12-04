const fs = require('fs');

const numberPile = [72, 99, 88, 8, 59, 61, 96, 92, 2, 70, 1, 32, 18, 10, 95, 33, 20, 31, 66, 43, 26, 24, 91, 44, 11, 15, 48, 90, 27, 29, 14, 68, 3, 50, 69, 74, 54, 4, 16, 55, 64, 12, 73, 80, 58, 83, 6, 87, 30, 41, 25, 39, 93, 60, 9, 81, 63, 75, 46, 19, 78, 51, 21, 28, 94, 7, 17, 42, 53, 13, 97, 98, 34, 76, 89, 23, 86, 52, 79, 85, 67, 84, 47, 22, 37, 65, 71, 49, 82, 40, 77, 36, 62, 0, 56, 45, 57, 38, 35, 5]
const marked = "X";

fs.readFile('boards.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }

    data = data.split(/\r?\n/);

    //im sure there's a better way to do it but idk
    let boards = [];
    for (let i = 0; i < data.length - 4; i++) {
        let board = [];
        board.push(data[i].trim().split(/\s+/).map(n => parseInt(n, 10)));
        board.push(data[i + 1].trim().split(/\s+/).map(n => parseInt(n, 10)));
        board.push(data[i + 2].trim().split(/\s+/).map(n => parseInt(n, 10)));
        board.push(data[i + 3].trim().split(/\s+/).map(n => parseInt(n, 10)));
        board.push(data[i + 4].trim().split(/\s+/).map(n => parseInt(n, 10)));
        boards.push(board);
    }

    let win = false;
    let drawnNum = 0;
    while (drawnNum < 18 && !win) {
        boards.forEach(board => {
            checkNum(board, numberPile[drawnNum])
            if (drawnNum > 4) win = checkWin(board);
            if (win) {
                console.log(win)
                countScore(board, numberPile[drawnNum])
            }
        });

        drawnNum++;
    }
});

function checkNum(board, n) {
    board.forEach(row => {
        row.forEach((num, i) => { if (num == n) row[i] = marked })
    });
}

function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].every(x => x == marked)) return true;
        if (board[0][i] == marked && board[1][i] == marked && board[2][i] == marked && board[3][i] == marked && board[4][i] == marked) return true;
    }
    return false;
}

function countScore(board, n) {
    let sum = 0;
    board.forEach(row => {
        row.forEach(num => { if (!isNaN(num)) sum += num; })
    })

    console.log(sum * n);
    return sum * n;
}