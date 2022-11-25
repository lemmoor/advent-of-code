const fs = require('fs')

const data = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n/)
    .map(x => x.split("").map(Number))


const GRID_WIDTH = data[0].length - 1;
const GRID_HEIGHT = data.length - 1;

function lowPoints(data) {
    let risk = 0;
    for (let i = 1; i < GRID_HEIGHT; i++) {

        if (data[i][0] < data[i][1] &&
            data[i][0] < data[i - 1][0] &&
            data[i][0] < data[i + 1][0]) {
            risk += data[i][0] + 1
        }

        if (data[i][GRID_WIDTH] < data[i][data[i].length - 2] &&
            data[i][GRID_WIDTH] < data[i + 1][GRID_WIDTH] &&
            data[i][GRID_WIDTH] < data[i - 1][GRID_WIDTH]) {
            risk += data[i][GRID_WIDTH] + 1
        }

        for (let j = 1; j < GRID_WIDTH; j++) {
            if (data[i][j] < data[i][j + 1] &&
                data[i][j] < data[i][j - 1] &&
                data[i][j] < data[i - 1][j] &&
                data[i][j] < data[i + 1][j]) {
                risk += data[i][j] + 1
            }
        }
    }

    for (let j = 1; j < GRID_WIDTH; j++) {
        if (data[0][j] < data[1][j] &&
            data[0][j] < data[0][j + 1] &&
            data[0][j] < data[0][j - 1]) {
            risk += data[0][j] + 1
        }

        if (data[GRID_HEIGHT][j] < data[GRID_HEIGHT - 1][j] &&
            data[GRID_HEIGHT][j] < data[GRID_HEIGHT][j + 1] &&
            data[GRID_HEIGHT][j] < data[GRID_HEIGHT][j - 1]) {
            risk += data[GRID_HEIGHT][j] + 1
        }
    }

    if (data[0][0] < data[0][1] && data[0][0] < data[1][0]) {
        risk += data[0][0] + 1;
    }
    if (data[GRID_HEIGHT][0] < data[GRID_HEIGHT][1] && data[GRID_HEIGHT][0] < data[GRID_HEIGHT - 1][0]) {
        risk += data[GRID_HEIGHT][0] + 1;
    }
    if (data[0][GRID_WIDTH] < data[0][GRID_WIDTH - 1] && data[0][GRID_WIDTH] < data[1][GRID_WIDTH]) {
        risk += data[0][GRID_WIDTH] + 1;
    }
    if (data[GRID_HEIGHT][GRID_WIDTH] < data[GRID_HEIGHT - 1][GRID_WIDTH] && data[GRID_HEIGHT][GRID_WIDTH] < data[GRID_HEIGHT - 1][GRID_WIDTH - 1]) {
        risk += data[GRID_HEIGHT][GRID_WIDTH] + 1;
    }

    return risk;
}

console.log(lowPoints(data))