const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/)

// console.log(input)

let sum = 0;
input.forEach(line => {
    let numbers = [...line.matchAll(/\d/g)];
    sum += Number(numbers[0][0] + numbers[numbers.length - 1][0]);
})

console.log('part 1: ', sum)

let sum2 = 0;
let regex = /.*?(\d|two|one|three|four|five|six|seven|eight|nine)(?:.*(\d|two|one|three|four|five|six|seven|eight|nine))?/g;

input.forEach(line => {
    let numbers = [...line.matchAll(regex)];
    let n1 = numbers[0][1];
    let n2 = numbers[0][2];
    if (!n2) {
        n2 = n1;
    }
    sum2 += convertToNum(n1) * 10 + convertToNum(n2);
})

console.log('part 2:', sum2);

function convertToNum(str) {
    const converter = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    }

    if (isNaN(str)) return converter[str];
    return Number(str);
}