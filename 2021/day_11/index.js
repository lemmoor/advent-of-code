const fs = require('fs')

let data = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n/)
    .map(x => x.split("").map(Number))

const WIDTH = data[0].length - 1;
const HEIGHT = data.length - 1;
let flashes = 0;

let flashed;
let step = 0;
//for (let step = 0; step < 100; step++) {  loop for part 1
while (flashed != (WIDTH + 1) * (HEIGHT + 1)) {
    flashed = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] == 0) flashed++;
            data[i][j]++;
        }
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] > 9) data = flash(data, j, i);
        }
    }
    step++;
}
console.log(step - 1)
//console.log(flashes)

function flash(arr, x, y) {
    arr[y][x] = 0;
    flashes++;
    if (x - 1 >= 0) {
        if (arr[y][x - 1] != 0) arr[y][x - 1]++;
        if (arr[y][x - 1] > 9) flash(arr, x - 1, y);

        if (y - 1 >= 0) {
            if (arr[y - 1][x - 1] != 0) arr[y - 1][x - 1]++;
            if (arr[y - 1][x - 1] > 9) flash(arr, x - 1, y - 1);
        }
        if (y + 1 <= HEIGHT) {
            if (arr[y + 1][x - 1] != 0) arr[y + 1][x - 1]++;
            if (arr[y + 1][x - 1] > 9) flash(arr, x - 1, y + 1);
        }
    }
    if (x + 1 <= WIDTH) {
        if (arr[y][x + 1] != 0) arr[y][x + 1]++;
        if (arr[y][x + 1] > 9) flash(arr, x + 1, y);

        if (y - 1 >= 0) {
            if (arr[y - 1][x + 1] != 0) arr[y - 1][x + 1]++;
            if (arr[y - 1][x + 1] > 9) flash(arr, x + 1, y - 1);
        }
        if (y + 1 <= HEIGHT) {
            if (arr[y + 1][x + 1] != 0) arr[y + 1][x + 1]++;
            if (arr[y + 1][x + 1] > 9) flash(arr, x + 1, y + 1);
        }
    }
    if (y - 1 >= 0) {
        if (arr[y - 1][x] != 0) arr[y - 1][x]++;
        if (arr[y - 1][x] > 9) flash(arr, x, y - 1);
    }
    if (y + 1 <= HEIGHT) {
        if (arr[y + 1][x] != 0) arr[y + 1][x]++;
        if (arr[y + 1][x] > 9) flash(arr, x, y + 1);
    }
    return arr;
}