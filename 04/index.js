const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/).map(line => {
    let numbers = line.replace(/Card \d+: /g, '').split(' | ');

    return { winning: numbers[0], your: numbers[1] }
})

// console.log(input)

let sum = 0;
for (const card of input) {
    // console.log(card);
    let winRegex = new RegExp('(?<!\\d)(' + card.winning.trim().replaceAll(/\s+/g, '|') + ')(?!\\d)', 'g');
    let score = 0;
    let match;
    while ((match = winRegex.exec(card.your)) !== null) {
        // console.log(`Found ${match[0]}. at ${match.index}.`);
        score = score ? score * 2 : 1;
        // console.log('score ', score);
    }

    sum += score;
    score = 0;
}

console.log(sum);