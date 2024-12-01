const fs = require('fs');
const path = require('node:path');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((line) => {
    let numbers = line.replace(/Card *\d+: */g, '').split(' | ');

    return { winning: numbers[0], your: numbers[1] };
  });

// console.log(input)

let sum = 0;
let cardsAvailable = new Array(input.length).fill(1);
for (let i = 0; i < input.length; i++) {
  const card = input[i];
  let winRegex = new RegExp('(?<!\\d)(' + card.winning.trim().replaceAll(/\s+/g, '|') + ')(?!\\d)', 'g');
  let score = 0;
  let numbersMatched = 0;
  let match;
  while ((match = winRegex.exec(card.your)) !== null) {
    score = score ? score * 2 : 1;
    numbersMatched++;
  }

  for (let j = 1; j <= numbersMatched; j++) {
    cardsAvailable[i + j] += 1 * cardsAvailable[i];
  }

  sum += score;
}

console.log('part 1: ', sum);
console.log(
  'part 2: ',
  cardsAvailable.reduce((s, v) => v + s)
);
