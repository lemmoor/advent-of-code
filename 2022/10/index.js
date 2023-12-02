const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.split(/\r?\n/)
.map(line => {
    line = line.split(" ");
    if(line[1]){
        line[1] = parseInt(line[1]);
    }
    return line;
})

// console.log(input)

let X = 1;
let cycle = 1;
let strengths = [];
let i = 0;
let addxCycle = 0;
let drawing = new Array(40).fill(" ")
while(cycle <= 240){
    if(cycle % 40 == 20){
        strengths.push(cycle * X)
    }
    if(cycle % 40 == 0){
        console.log(drawing.join(""));
        drawing = new Array(40).fill(" ")
    }

    if(X == cycle % 40 -1 || (X-1) == (cycle % 40 -1) || (X+1) == (cycle % 40 -1)){
        drawing[cycle % 40 -1] = "█";
    }
    if(input[i][0] == 'addx'){
        addxCycle++;
        if(addxCycle == 2){
            X += input[i][1];
            addxCycle = 0;
            i++;
        }
    }
    else {
        i++;
    }
    cycle++;
}
console.log("part 1:", strengths.reduce((a, b) => a+b, 0));