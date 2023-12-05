const { log } = require('console');
const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' }).split(/\r?\n\r?\n/);

const seeds = input[0].split(' ').map(Number);
seeds.shift();
input.shift();

const maps = input.map((conversionMap) => {
  let lines = conversionMap.split(/\r?\n/);
  let map = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    let numbers = line.split(' ').map(Number);
    map.push({ destination: numbers[0], source: numbers[1], range: numbers[2] });
  }
  return map;
});

// console.log(seeds, maps);

//part 1
let seedsToLocation = [];
for (const seed of seeds) {
  let sourceNumber = seedToLocation(seed);
  seedsToLocation.push(sourceNumber);
}

function seedToLocation(seed) {
  let sourceNumber = seed;
  for (const map of maps) {
    for (let i = 0; i < map.length; i++) {
      if (sourceNumber <= map[i].source + map[i].range && sourceNumber >= map[i].source) {
        let difference = map[i].destination - map[i].source;
        sourceNumber = sourceNumber + difference;
        break;
      }
    }
  }
  return sourceNumber;
}

console.log('part 1: ', Math.min(...seedsToLocation));

//part 2
let min = Infinity;
for (let j = 6; j < seeds.length; j += 2) {
  console.log('range id:', j);
  for (let i = seeds[j]; i <= seeds[j] + seeds[j + 1]; i++) {
    let location = seedToLocation(i);
    if (min > location) {
      min = location;
    }
  }
  //console logs to see that the progress because it's that slow
  console.log('min: ', min);
}

console.log('part 2:', min);
