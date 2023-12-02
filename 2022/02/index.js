const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/).map(e => e.split(" "));

// console.log(input)

const win = {
    "A": "Y",
    "B": "Z",
    "C": "X"
}

const lose = {
    "A": "Z",
    "B": "X", 
    "C": "Y"
}

const draw = {
    "A": "X",
    "B": "Y",
    "C": "Z"
}

const points = {
    "X": 1,
    "Y": 2,
    "Z": 3
}
score = 0;

input.forEach(([opp, you]) => {
    score += points[you]
    if(win[opp] === you) score += 6;
    else if(draw[opp] === you) score +=3;
})

console.log("1: ", score);

score = 0
input.forEach(([opp, you]) => {
    let shape = '';
    if(you == "Y"){
        shape = draw[opp]
    }
    else if (you == "Z"){
        shape = win[opp]
    }
    else {
        shape = lose[opp]
    }
    score += points[shape]
    if(win[opp] === shape) score += 6;
    else if(draw[opp] === shape) score +=3;
})

console.log("2: ", score);