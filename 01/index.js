const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n\r?\n/).map(e => e.split(/\r?\n/).map(Number));

//console.log(input)

let most = []

for(elf of input){
    let sum = 0;
    for(cal of elf){
        sum+=cal
    }
    most.push(sum) 
}

most = most.sort((a, b) => b - a)
console.log("part 1 ", most[0], "part 2: ", most[0] + most[1] + most[2]);