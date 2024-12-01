const fs = require('fs');
const path = require('node:path');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((sequence) => sequence.split(' ').map(Number));

// console.log(input);

let sumLast = 0;
let sumFirst = 0;
for (const sequence of input) {
  let [first, last] = predictNumber(sequence);
  sumFirst += first;
  sumLast += last;
}

console.log('part 1:', sumLast, 'Part 2: ', sumFirst);

function predictNumber(sequence) {
  if (sequence.every((n) => n == 0)) {
    return [0, 0];
  }

  let newSequence = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    newSequence.push(sequence[i + 1] - sequence[i]);
  }

  let [prevFirstNumber, prevLastNumber] = predictNumber(newSequence);
  let lastNumber = sequence.at(-1) + prevLastNumber;
  let firstNumber = sequence.at(0) - prevFirstNumber;
  return [firstNumber, lastNumber];
}
