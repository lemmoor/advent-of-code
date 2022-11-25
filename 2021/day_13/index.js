const fs = require('fs')

let data = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n\r?\n/)
    .filter(Boolean)


let dots = data[0].split(/\r?\n/).map(x => x.split(",").map(Number));
let folds = data[1].split(/\r?\n/).map(x => x.replace("fold along ", "").split("="))

// part 1
// let arr = fold(dots, folds[0][0], +folds[0][1])
//console.log(arr.length)

for (const f of folds) {
    dots = fold(dots, f[0], +f[1])
}

displayArr(dots);

function fold(dots, dir, n) {
    let folded = [];
    if (dir == 'y') {
        for (const dot of dots) {
            let x = dot[0];
            let y = dot[1];
            if (y > n) {
                let reflection = y - n;
                if (!arrayHasArray(dots, [x, n - reflection]))
                    folded.push([x, n - reflection])
            }
            else {
                folded.push(dot)
            }
        }
    }
    if (dir == 'x') {
        for (const dot of dots) {
            let x = dot[0];
            let y = dot[1];
            if (x > n) {
                let reflection = x - n;
                if (!arrayHasArray(dots, [n - reflection, y])) {
                    folded.push([n - reflection, y])
                }
            }
            else {
                folded.push(dot)
            }
        }
    }
    return folded;
}

function arrayHasArray(arr, arr2) {
    for (const value of arr) {
        if (value[0] == arr2[0] && value[1] == arr2[1]) return true;
    }
    return false;
}

function displayArr(arr) {
    let maxX = 0;
    let maxY = 0;
    arr.forEach(e => {
        maxX = maxX < e[0] ? e[0] : maxX;
        maxY = maxY < e[1] ? e[1] : maxY;
    });

    let a = new Array()
    for (let i = 0; i <= maxY + 1; i++) {
        a.push(new Array(maxX + 1).fill("."))
    }

    for (const el of arr) {
        a[el[1]][el[0]] = "#";
    }

    a.map(x => {
        x = x.join("")
        console.log(x);
    })
}