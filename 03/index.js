const { log } = require('console');
const fs = require('fs');
const path = require('node:path');
const { start } = require('repl');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((l) => l.split(''));

// console.log(input);

let specialCharacter = /[*#+\/=\-%@&$]/;

let sum = 0;
for (let i = 0; i < input.length; i++) {
  let isPart = false;
  let number = '';
  for (let j = 0; j < input[i].length; j++) {
    const character = input[i][j];
    //current character is a number
    if (!isNaN(Number(character))) {
      number += character;
      //checks if number is near a special characher. Order: top right bottom left
      if (!isPart) {
        isPart =
          (i > 0 && j > 0 && specialCharacter.test(input[i - 1][j - 1])) ||
          (i > 0 && specialCharacter.test(input[i - 1][j])) ||
          (i > 0 && j < input[i].length - 1 && specialCharacter.test(input[i - 1][j + 1])) ||
          (j > 0 && specialCharacter.test(input[i][j - 1])) ||
          (j < input[i].length - 1 && specialCharacter.test(input[i][j + 1])) ||
          (i < input.length - 1 && j > 0 && specialCharacter.test(input[i + 1][j - 1])) ||
          (i < input.length - 1 && specialCharacter.test(input[i + 1][j])) ||
          (i < input.length - 1 && j < input[i].length - 1 && specialCharacter.test(input[i + 1][j + 1]));
      }
      if (j == input[i].length - 1 && isPart) {
        sum += +number;
      }
    } else {
      if (number) {
        if (isPart) {
          sum += +number;
        }
        number = '';
        isPart = false;
      }
    }
  }
}

console.log(sum);

//part 2

let numbers = [];

for (let i = 0; i < input.length; i++) {
  let row = [];
  let number = '';
  let startIndex = -1;
  for (j = 0; j < input[i].length; j++) {
    const character = input[i][j];

    if (!isNaN(Number(character))) {
      number += character;
      if (startIndex < 0) startIndex = j;

      if (j == input[i].length - 1) {
        row.push({
          value: +number,
          startIndex: startIndex,
          lastIndex: j,
        });
        number = '';
        startIndex = -1;
      }
    } else {
      if (number) {
        row.push({
          value: +number,
          startIndex: startIndex,
          lastIndex: j - 1,
        });
        number = '';
        startIndex = -1;
      }
    }
  }

  numbers.push(row);
}

// console.log(numbers);

let match;
let regex = new RegExp(/\*/, 'g');
let sum2 = 0;
for (let i = 0; i < input.length; i++) {
  let parts = [];
  while ((match = regex.exec(input[i].join(''))) !== null) {
    let gearIndex = match.index;
    if (i > 0) {
      numbers[i - 1].forEach((n) => {
        if (Math.abs(gearIndex - n.startIndex) <= 1 || Math.abs(gearIndex - n.lastIndex) <= 1) {
          parts.push(n.value);
        }
      });
    }

    numbers[i].forEach((n) => {
      if (Math.abs(gearIndex - n.startIndex) <= 1 || Math.abs(gearIndex - n.lastIndex) <= 1) {
        parts.push(n.value);
      }
    });

    if (i < input[i].length - 1) {
      numbers[i + 1].forEach((n) => {
        if (Math.abs(gearIndex - n.startIndex) <= 1 || Math.abs(gearIndex - n.lastIndex) <= 1) {
          parts.push(n.value);
        }
      });
    }
  }
  if (parts.length == 2) {
    sum2 += parts[0] * parts[1];
  }
  parts = [];
}

console.log(sum2);
