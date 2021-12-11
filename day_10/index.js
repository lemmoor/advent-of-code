const fs = require('fs')

const data = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n/)
    .map(x => x.split(""))

const brackets = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
    ["<", ">"]
]);

const bracketPoints = new Map([
    [")", 3],
    ["}", 1197],
    ["]", 57],
    [">", 25137]
])

const scores = [];

let points = 0;

for (let i = 0; i < data.length; i++) {
    let expected = [];
    let corrupted = false;
    for (let j = 0; j < data[i].length; j++) {
        if (brackets.has(data[i][j])) {
            expected.push(brackets.get(data[i][j]))
        }
        else {
            if (data[i][j] != expected[expected.length - 1]) {
                points += bracketPoints.get(data[i][j])
                corrupted = true;
                break;
            }
            else {
                expected.pop()
            }
        }
    }
    if (!corrupted) {
        scores.push(countScore(expected))
    }
}

scores.sort((a, b) => a - b)

console.log("PART 1: ", points);
console.log("PRAT 2: ", scores[(scores.length - 1) / 2])

function countScore(brackets) {
    const points = new Map([
        [")", 1],
        ["]", 2],
        ["}", 3],
        [">", 4]
    ])
    let score = 0;
    for (let i = brackets.length - 1; i >= 0; i--) {
        score = score * 5 + points.get(brackets[i]);
    }

    return score;
}