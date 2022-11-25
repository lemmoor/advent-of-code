const fs = require('fs');

const numberPile = [72, 99, 88, 8, 59, 61, 96, 92, 2, 70, 1, 32, 18, 10, 95, 33, 20, 31, 66, 43, 26, 24, 91, 44, 11, 15, 48, 90, 27, 29, 14, 68, 3, 50, 69, 74, 54, 4, 16, 55, 64, 12, 73, 80, 58, 83, 6, 87, 30, 41, 25, 39, 93, 60, 9, 81, 63, 75, 46, 19, 78, 51, 21, 28, 94, 7, 17, 42, 53, 13, 97, 98, 34, 76, 89, 23, 86, 52, 79, 85, 67, 84, 47, 22, 37, 65, 71, 49, 82, 40, 77, 36, 62, 0, 56, 45, 57, 38, 35, 5]
const marked = "X";

class Board {
    constructor(n) {
        this.numbers = n
        this.hasWon = false;
    }

    checkNum(n) {
        this.numbers.forEach(row => {
            row.forEach((num, i) => { if (num == n) row[i] = marked })
        });
    }

    checkWin() {
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i].every(x => x == marked)) this.hasWon = true;
            if (this.numbers.map(row => row[i]).every(x => x === marked)) this.hasWon = true;
        }
    }

    countScore(n) {
        let sum = 0;
        this.numbers.forEach(row => {
            row.forEach(num => { if (num != marked) sum += num; })
        })

        return sum * n;
    }
}

const lines = fs
    .readFileSync("boards.txt", { encoding: "utf-8" })
    .split(/\r?\n/)
    .map((x) =>
        x
            .replace(/[\n ,]+/g, " ")
            .trim()
            .split(" ")
            .map(Number)
    );

const boards = [];

for (let i = 0; i < lines.length - 1; i += 5) {
    boards.push(new Board([lines[i], lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]]))
}

let boardScores = []
let drawnNum = 0;
while (drawnNum < numberPile.length) {
    for (const board of boards) {
        if (!board.hasWon) {
            board.checkNum(numberPile[drawnNum])
            if (drawnNum > 4) board.checkWin();
            if (board.hasWon) {
                boardScores.push(board.countScore(numberPile[drawnNum]))
            }
        }

    }
    drawnNum++;
}

console.log("PART 1: ", boardScores[0])
console.log("PART 2: ", boardScores[boardScores.length - 1])