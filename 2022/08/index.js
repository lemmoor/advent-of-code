const fs = require('fs');
const path = require('node:path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.split(/\r?\n/)
.map(row => 
    row.split("").map((tree) => {
        //top - tallest tree from the top so far, right - tallest tree from the right etc.
        //xSeen - number of trees in that direction you can see.
        return {height: +tree, top: null, topSeen: null, right: null, rightSeen:null, bottom: null, bottomSeen:null, left: null, leftSeen:null}
    }))

//visibility for top and left and edge trees
for (let i = 0; i < input.length; i++) {
    input[i][0].left = -1;
    input[i][0].leftSeen = 0;
    input[i][input[i].length-1].right = -1;
    input[i][input[i].length-1].rightSeen = 0;

    const row = input[i];
    if(i == 0){
        input[i] = row.map(tree => {return {...tree, top: -1, topSeen:0}})
        // console.log(input[i]);
        continue;
    }
    if(i == input.length - 1){
        input[i] = row.map(tree => {return {...tree, bottom: -1, bottomSeen:0}})
        // console.log(input[i]);
        continue;
    }
    for (let j = 1; j < row.length-1; j++) {  
        const tree = row[j];

        //top neighbour
        if(input[i-1][j].height > input[i-1][j].top){
            tree.top = input[i-1][j].height;
        }
        else {
            tree.top = input[i-1][j].top;
        }
        //left neighbour
        if(input[i][j-1].height > input[i][j-1].left){
            tree.left = input[i][j-1].height;
        }
        else {
            tree.left = input[i][j-1].left;
        }

        tree.topSeen = tree.height > input[i-1][j].height ? input[i-1][j].topSeen + 1 : 1;
        tree.leftSeen = tree.height > input[i][j-1].height ? input[i][j-1].leftSeen + 1 : 1;
    }
}

//visibility for right and bottom
for (let i = input.length - 2; i > 0; i--) {
    const row = input[i];
    for (let j = row.length-2; j > 0; j--) {  
        const tree = row[j];

        // right neighbour
        if(input[i][j+1].height > input[i][j+1].right){
            tree.right = input[i][j+1].height;
        }
        else {
            tree.right = input[i][j+1].right;
        }
        // bottom neighbour
        if(input[i+1][j].height > input[i+1][j].bottom){
            tree.bottom = input[i+1][j].height;
        }
        else {
            tree.bottom = input[i+1][j].bottom;
        }
                                                            //this part is wrong. [65332] 5 can see 3 trees, not 1.
        tree.rightSeen = tree.height > input[i][j+1].height ? input[i][j+1].rightSeen + 1 : 1;
        tree.bottomSeen = tree.height > input[i+1][j].height ? input[i+1][j].bottomSeen + 1 : 1;
    }
}

let visible = 0;
let highestScore = 0;

for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
        const tree = row[j];
        if(tree.height > tree.top || tree.height > tree.right || tree.height > tree.bottom || tree.height > tree.left){
            visible++;
        }
        let score = tree.topSeen * tree.rightSeen * tree.bottomSeen * tree.leftSeen;
            if(score > highestScore){
                highestScore = score;
            }
    }
    
}


//debug part 2
// for (let i = 0; i < input.length; i++) {
//     const row = input[i];
//     let scores = []
//     for (let j = 0; j < row.length; j++) {
//         const tree = row[j];
//         let score = tree.topSeen * tree.rightSeen * tree.bottomSeen * tree.leftSeen;
//         scores.push(score)
//     }
//     console.log(scores);
// }


console.log(visible)
console.log(highestScore);

// console.log(input);

// 120 too low