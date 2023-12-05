const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' }).split(/\r?\n\r?\n/);

const seeds = input[0].split(' ').map(Number);
seeds.shift();
input.shift();

const maps = input.map((conversionMap) => {
  let lines = conversionMap.split(/\r?\n/);
  console.log(lines);
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
let count = 0;
let seedsToLocation = [];
for (const seed of seeds) {
  count = 0;
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

// let seedRangesToLocation = [];
// for (let i = 0; i < seeds.length; i += 2) {
//   for (let j = seeds[i]; j <= seeds[i] + seeds[i + 1]; j++) {
//     let sourceNumber = seedToLocation(j);
//     seedRangesToLocation.push(sourceNumber);
//   }
//   console.log(seedToLocation(seeds[i]), seedToLocation(seeds[i] + seeds[i + 1]));
// }

// console.log(Math.min(...seedRangesToLocation));
seedRangesToLocation(seeds);
function seedRangesToLocation(seedRanges) {
  let maxRanges = [];
  //location on each end the ranges
  for (let i = 0; i < seedRanges.length; i += 2) {
    maxRanges.push(seedToLocation(seedRanges[i]));
    maxRanges.push(seedToLocation(seedRanges[i] + seedRanges[i + 1]));
  }

  //find the smallest range
  let smallestStart = 0;
  let smallest = [maxRanges[0], maxRanges[1]];
  for (let i = 2; i < maxRanges.length; i += 2) {
    if (smallest[0] + smallest[i] < maxRanges[i] + maxRanges[i + 1]) {
      smallestStart = i;
      smallest = [maxRanges[i], maxRanges[i + 1]];
    }
  }

  console.log(maxRanges);
  console.log(smallest, smallestStart);

  let min = Infinity;
  for (let i = seedRanges[smallestStart]; i <= seedRanges[smallestStart] + seedRanges[smallestStart + 1]; i++) {
    let location = seedToLocation(i);
    if (min > location) {
      min = location;
    }
  }

  console.log(min);
}

//316960384 too high
