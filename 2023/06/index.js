const fs = require('fs');
const path = require('node:path');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((line) =>
    line
      .replace(/\w+:\s*/, '')
      .split(/\s+/)
      .map(Number)
  );

const races = [];

for (let i = 0; i < input[0].length; i++) {
  races.push({ time: input[0][i], distance: input[1][i] });
}

let result = 1;
for (const { time, distance } of races) {
  result *= waysToWin(time, distance);
}
console.log('part 1: ', result);

function waysToWin(time, distance) {
  let delta = Math.sqrt(time * time - 4 * distance);
  let x1 = Math.floor((-time + delta) / -2);
  let x2 = Math.floor((-time - delta) / -2);
  return x2 - x1;
}

//got lazy with parsing input
const time = 38947970;
const distance = 241154910741091;

console.log('part 2: ', waysToWin(time, distance));
