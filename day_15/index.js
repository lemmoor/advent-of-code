const fs = require("fs")

const grid = fs.readFileSync('input.txt', { encoding: "utf-8" }).split(/\r?\n/).map(x => x.split("").map(Number))

const width = grid[0].length;
const height = grid.length;
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
            this.neighbours.push(grid[this.i + 1][this.j])
        }
        if (this.i > 0) {
            this.neighbours.push(grid[this.i - 1][this.j])
        }
        if (this.j > 0) {
            this.neighbours.push(grid[this.i][this.j - 1])
        }
        if (this.j < grid[0].length - 1) {
            this.neighbours.push(grid[this.i][this.j + 1])
        }
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        grid[i][j] = new Spot(i, j, grid[i][j])
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        grid[i][j].addNeighbours(grid)
    }
}

let start = grid[0][0];
let end = grid[height - 1][width - 1]
let openSet = [start];
let closedSet = []

while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
            lowestIndex = i;
        }
    }
    let current = openSet[lowestIndex]

    if (current == end) {
        console.log(current.g)
    }


    closedSet.push(current)
    openSet.splice(lowestIndex, 1);

    for (const neighbour of current.neighbours) {
        if (!closedSet.includes(neighbour)) {
            let tempG = current.g + neighbour.value

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


function heuristic(a, b) {
    return (a.i - b.i) + (a.j - b.j);
}