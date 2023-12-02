const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).trim()

// console.log(input)

let start = 0;
for(let i = 0; i < input.length; i++){
    let marker = input.substring(i, 4 + i);
    if(marker.length == new Set(marker.split("")).size){
        start = i + 4;
        break;
    }
}

console.log("part 1: ", start);

let msg = 0;
for(let i = 0; i < input.length; i++){
    let marker = input.substring(i, 14 + i);
    if(marker.length == new Set(marker.split("")).size){
        msg = i + 14;
        break;
    }
}

console.log("part 2: ", msg);