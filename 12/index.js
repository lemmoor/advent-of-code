const fs = require('fs');
const path = require('node:path');
let start = [];
let end = [];
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/).map((line, i) => {
    line = [...line].map((char, j) => {
        char = char.charCodeAt();
        if(char == 69){ //69 is E
            end = [i, j]
            return 122;
        }
        if(char == 83){ //83 is S
            start = [i, j]
            return 97;
        }
        return char
    })
    return line;
})

class Spot {
    constructor(i, j, value) {
        this.i = i;
        this.j = j;
        this.value = value;
        this.f = 0;
        this.h = 0;
        this.g = 0;
        this.neighbours = [];
    }

    addNeighbours = (grid) => {
        if (this.i < grid.length - 1) {
            if(grid[this.i + 1][this.j].value-this.value <= 1){
                this.neighbours.push(grid[this.i + 1][this.j])
            }
        }
        if (this.i > 0) {
            if(grid[this.i - 1][this.j].value - this.value <= 1){
                this.neighbours.push(grid[this.i - 1][this.j])
            }
        }
        if (this.j > 0) {
            if(grid[this.i][this.j - 1].value - this.value <= 1){
                this.neighbours.push(grid[this.i][this.j - 1])
            }
        }
        if (this.j < grid[0].length - 1) {
            if(grid[this.i][this.j + 1].value - this.value <= 1){
                this.neighbours.push(grid[this.i][this.j + 1])
            }
        }
    }
}

// console.log(input)

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = new Spot(i, j, input[i][j])
    }
}

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        input[i][j].addNeighbours(input)
    }
}

console.log( findPath(input[start[0]][start[1]], input[end[0]][end[1]]))

function findPath(start, end) {
    let openSet = [start];
    let closedSet = []

    let iter = 0;
    while (openSet.length > 0) {
        let lowestIndex = 0;
        iter++;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = openSet[lowestIndex]

        if (current == end) {
            return iter;
        }

        closedSet.push(current)
        openSet.splice(lowestIndex, 1);

        for (const neighbour of current.neighbours) {
            if (!closedSet.includes(neighbour)) {
                let tempG = current.g + neighbour.value;

                if (openSet.includes(neighbour)) {
                    if (neighbour.g > tempG) {
                        neighbour.g = tempG;
                    }
                } else {
                    neighbour.g = tempG;
                    openSet.push(neighbour)
                }

                neighbour.h = heuristic(neighbour, end)
                neighbour.f = neighbour.g + neighbour.h
                neighbour.prev = current;
            }
        }
    }
}

function heuristic(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
}

let path2 = [];
let node = input[end[0]][end[1]];
while(node.prev){
    path2.push(String.fromCharCode(node.value));
    node = node.prev;
}
// console.log(path2.reverse());
console.log(path2.length);