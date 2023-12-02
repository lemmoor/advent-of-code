const fs = require('fs');
const path = require('node:path');

let input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.split(/\r?\n/)
.map(row => 
    row.split("").map(Number))

// console.log(input);
let MaxScore = 0;
for (let i = 1; i < input.length-1; i++) {
    const row = input[i];
    for (let j = 1; j < row.length -1; j++) {
        const tree = row[j];
        let CurrentScore = checkUp(tree, i , j, input) * checkRight(tree, i, j, input) * checkDown(tree, i, j, input) * checkLeft(tree, i, j, input)
        // console.log(tree, up);
        if(CurrentScore > MaxScore){
            MaxScore = CurrentScore;
        }
    }
}

console.log(MaxScore);

function checkUp(tree, treeI, treeJ, map){
    let visible = 0;
    for (let i = treeI-1; i >= 0; i--) {
        if(tree <= map[i][treeJ]){
            visible++
            break;
        }
        else{
            visible++;
        }
        
    }
    return visible;
}

function checkDown(tree, treeI, treeJ, map){
    let visible = 0;
    for (let i = treeI+1; i < map.length; i++) {
        if(tree <= map[i][treeJ]){
            visible++
            break;
        }
        else{
            visible++;
        }
        
    }
    return visible;
}

function checkRight(tree, treeI, treeJ, map){
    let visible = 0;
    for (let j = treeJ + 1; j < map[treeI].length; j++) {
        if(tree <= map[treeI][j]){
            visible++
            break;
        }
        else{
            visible++;
        }
        
    }
    return visible;
}

function checkLeft(tree, treeI, treeJ, map){
    let visible = 0;
    for (let j = treeJ - 1; j >= 0; j--) {
        if(tree <= map[treeI][j]){
            visible++
            break;
        }
        else{
            visible++;
        }
        
    }
    return visible;
}