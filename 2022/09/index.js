const { timeEnd } = require('console');
const fs = require('fs');
const path = require('node:path');
const moves = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.split(/\r?\n/)
.map(move => {
    move = move.split(" ");
    return [move[0], +move[1]]
})

// console.log(moves)

//string x-y
let visited = new Set(["0-0"]);
let currentHeadPos = {x:0, y:0}
let currentTailPos = {x:0, y:0}

for(const [direction, amount] of moves){
    for(let i = 0; i < amount; i++){

        switch (direction) {
            case "R":
                currentHeadPos.x++;
                break;
            case "L":
                currentHeadPos.x--;
                break;
            case "U":
                currentHeadPos.y++;
                break;
            case "D":
                currentHeadPos.y--;
                break;
            default:
                throw new Error("unknown direction ", direction)
                break;
        }
        let movedTail = moveTail(currentHeadPos, currentTailPos);
        currentTailPos = movedTail;
        visited.add(Object.values(currentTailPos).join("-"))
    }
    
}

function moveTail(head, tail){
    if(Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1){  //tail has to move
        if(head.x > tail.x){
            tail.x++;
        }
        if(head.x < tail.x){
            tail.x--;
        }
        if(head.y > tail.y){
            tail.y++;
        }
        if(head.y < tail.y){
            tail.y--;
        }
    }
    return tail;
}

console.log("part 1: ", visited.size);

//part 2
visited = new Set(["0-0"]);
currentHeadPos = {x:0, y:0}

let tails = new Array(9).fill(null).map(() => ({x:0, y:0}))

for(const [direction, amount] of moves){
    for(let i = 0; i < amount; i++){

        switch (direction) {
            case "R":
                currentHeadPos.x++;
                break;
            case "L":
                currentHeadPos.x--;
                break;
            case "U":
                currentHeadPos.y++;
                break;
            case "D":
                currentHeadPos.y--;
                break;
            default:
                throw new Error("unknown direction ", direction)
                break;
        }
        tails[0] = moveTail(currentHeadPos, tails[0])
        for(let j = 1; j < tails.length; j++){
            let movedTail = moveTail(tails[j-1], tails[j]);
            currentTailPos = movedTail;
        }
        
        visited.add(Object.values(tails[tails.length - 1]).join("-"))
    }
    
}

console.log("part 2: ", visited.size);