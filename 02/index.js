const fs = require('fs');
const path = require('node:path');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((game) => {
    let [_, cubes] = game.split(': ');
    let draws = cubes.split('; ').map((draws) => {
      let drawObj = { red: 0, green: 0, blue: 0 };
      let draw = draws.split(', ');
      for (let i = 0; i < draw.length; i++) {
        let [n, color] = draw[i].split(' ');
        drawObj[color] = Number(n);
      }
      return drawObj;
    });
    return draws;
  });

let maxCubes = { red: 12, green: 13, blue: 14 };

let sum = 0;
for (let i = 0; i < input.length; i++) {
  let gameId = i + 1;
  let isPossible = true;
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j].blue > maxCubes.blue || input[i][j].red > maxCubes.red || input[i][j].green > maxCubes.green) {
      isPossible = false;
      break;
    }
  }
  if (isPossible) sum += gameId;
}

console.log('part 1:', sum);

let powersum = 0;
for (let i = 0; i < input.length; i++) {
  let minCubeSet = { green: 0, red: 0, blue: 0 };

  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j].blue > minCubeSet.blue) {
      minCubeSet.blue = input[i][j].blue;
    }
    if (input[i][j].red > minCubeSet.red) {
      minCubeSet.red = input[i][j].red;
    }
    if (input[i][j].green > minCubeSet.green) {
      minCubeSet.green = input[i][j].green;
    }
  }

  powersum += minCubeSet.green * minCubeSet.red * minCubeSet.blue;
}

console.log('part 2:', powersum);
