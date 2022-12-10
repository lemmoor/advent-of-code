//there's definitely a better way but i just want to get it solved
const fs = require('fs');
const path = require('node:path');

class Tree {
    constructor (height){
        this.height = height;
        //terrible, terrible variable names, also having it in an object was a bad decision
        this.seen = {
            //topAmount = how many trees can you see
            //topTallest = the tallest tree you can see
            topAmount: 0,
            topTallest: null,
            rightAmount: 0,
            rightTallest: null,
            bottomAmount: 0,
            bottomTallest: null,
            leftAmount: 0,
            leftTallest: null
        }

    }
    setTopAmount(neighbour){
        let tallest = neighbour
        this.seen.topAmount = 1;
        while(this.height > tallest.height && tallest.seen.topAmount !== 0){
            this.seen.topAmount += tallest.seen.topAmount;
            tallest = tallest.seen.topTallest;
        }
    }
    setRightAmount(neighbour){
        let tallest = neighbour
        this.seen.rightAmount = 1;
        while(this.height > tallest.height && tallest.seen.rightAmount != 0){
            this.seen.rightAmount += tallest.seen.rightAmount;
            tallest = tallest.seen.rightTallest;
        }
    }
    setBottomAmount(neighbour){
        let tallest = neighbour
        this.seen.bottomAmount = 1;
        while(this.height > tallest.height && tallest.seen.bottomAmount != 0){
            this.seen.bottomAmount += tallest.seen.bottomAmount;
            tallest = tallest.seen.bottomTallest;
        }
    }
    setLeftAmount(neighbour){
        let tallest = neighbour
        this.seen.leftAmount = 1;
        while(this.height > tallest.height && tallest.seen.leftAmount != 0){
            this.seen.leftAmount += tallest.seen.leftAmount;
            tallest = tallest.seen.leftTallest;
        }
    }
}

let input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.split(/\r?\n/)
.map(row => 
    row.split("").map(tree => {
        return new Tree(parseInt(tree))
    }))

    // console.log(input);

for (let i = 0; i < input.length; i++) {

    input[i][0].seen.leftAmount = 0;
    input[i][0].seen.leftTallest = new Tree(-1);
    input[i][input[i].length-1].seen.rightAmount = 0;
    input[i][input[i].length-1].seen.rightTallest = new Tree(-1);

    const row = input[i];
    if(i == 0){
        row.forEach(tree => {
            tree.seen.topAmount = 0;
            tree.seen.topTallest = new Tree(-1);
        })
        // console.log(input[i]);
        continue;
    }

    if(i == input.length-1){
        row.forEach(tree => {
            tree.seen.bottomAmount = 0;
            tree.seen.bottomTallest = new Tree(-1);
        })
        // console.log(input[i]);
        continue;
    }

    for (let j = 1; j < row.length-1; j++) {
        const tree = row[j];

        //top neighbour
        if(input[i-1][j].height > input[i-1][j].seen.topTallest.height){
            tree.seen.topTallest = input[i-1][j];
        }
        else {
            tree.seen.topTallest = input[i-1][j].seen.topTallest;
        }
        //left neighbour
        if(input[i][j-1].height > input[i][j-1].seen.leftTallest.height){
            tree.seen.leftTallest = input[i][j-1];
        }
        else {
            tree.seen.leftTallest = input[i][j-1].seen.leftTallest;
        }

        tree.setTopAmount(input[i-1][j])
        tree.setLeftAmount(input[i][j-1])
    }
}

for (let i = input.length - 2; i > 0; i--) {
    const row = input[i];
    for (let j = row.length-2; j > 0; j--) {  
        const tree = row[j];

        // right neighbour
        if(input[i][j+1].height > input[i][j+1].seen.rightTallest.height){
            tree.seen.rightTallest = input[i][j+1];
        }
        else {
            tree.seen.rightTallest = input[i][j+1].seen.rightTallest;
        }
        // bottom neighbour
        if(input[i+1][j].height > input[i+1][j].seen.bottomTallest.height){
            tree.seen.bottomTallest = input[i+1][j];
        }
        else {
            tree.seen.bottomTallest = input[i+1][j].seen.bottomTallest;
        }

        tree.setRightAmount(input[i][j+1])
        tree.setBottomAmount(input[i+1][j])
    }
}

let visible = 0;
let highestScore = 0;

for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
        const tree = row[j];
        if(tree.height > tree.seen.topTallest?.height || 
            tree.height > tree.seen.rightTallest?.height || 
            tree.height > tree.seen.bottomTallest?.height || 
            tree.height > tree.seen.leftTallest?.height){
            visible++;
        }
        let score = tree.seen.topAmount * tree.seen.rightAmount * tree.seen.bottomAmount * tree.seen.leftAmount;
            if(score > highestScore){
                highestScore = score;
            }
    }
    
}

console.log(visible);
console.log(highestScore);

//debug part 2
for (let i = 0; i < input.length; i++) {
    const row = input[i];
    let scores = []
    for (let j = 0; j < row.length; j++) {
        const tree = row[j];
        let score = tree.seen.topAmount * tree.seen.rightAmount * tree.seen.bottomAmount * tree.seen.leftAmount;
        scores.push(score)
    }
    console.log(scores);
}

// 120 too low
// 75680 too low