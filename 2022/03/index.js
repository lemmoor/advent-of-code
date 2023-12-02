const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/);

// console.log(input)

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let bagPoints = input.map(bag => {
    let [p1, p2] = splitBag(bag)
    for(const item of p1){
        if(p2.includes(item)){
            return priorities.indexOf(item) + 1;
        }
    }
})

function splitBag (bag){
    let p1 = bag.substring(0, bag.length/2);
    let p2 = bag.substring(bag.length/2)
    return [p1, p2]
}

console.log("part 1: ", bagPoints.reduce((a, b) => a + b));

let badgePoints = 0;
for(let i = 0; i < input.length; i+=3){
    let bagGroup = [input[i], input[i+1], input[i+2]];
    for(const item of bagGroup[0]){
        if(bagGroup[1].includes(item) && bagGroup[2].includes(item)){
            badgePoints += priorities.indexOf(item) + 1;
            break;
        }
    }
}

console.log("part 2: ", badgePoints);
