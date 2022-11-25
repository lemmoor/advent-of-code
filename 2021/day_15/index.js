const fs = require("fs")

const data = fs.readFileSync('input.txt', { encoding: "utf-8" }).split(/\r?\n/).map(x => x.split("").map(Number))

const grid = [...data.map(x => [...x])]
const grid2 = [...data.map(x => [...x])]

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

makeBigGrid(grid2)

for (let i = 0; i < grid2.length; i++) {
    for (let j = 0; j < grid2[i].length; j++) {
        grid2[i][j] = new Spot(i, j, grid2[i][j])
    }
}

for (let i = 0; i < grid2.length; i++) {
    for (let j = 0; j < grid2[i].length; j++) {
        grid2[i][j].addNeighbours(grid2)
    }
}

console.log(findPath(grid2[0][0], grid2[grid2.length - 1][grid2[0].length - 1]))

function findPath(start, end) {
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
            return current.g;
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
}

function heuristic(a, b) {
    return (a.i - b.i) + (a.j - b.j);
}

function makeBigGrid(grid) {
    let tile = [...grid.map(x => [...x])];
    let tileCount = 1;

    while (tileCount < 5) {
        for (let i = 0; i < tile.length; i++) {
            for (let j = 0; j < tile[i].length; j++) {
                let newNum = grid[i][j] + tileCount > 9 ? (grid[i][j] + tileCount) % 10 + 1 : grid[i][j] + tileCount;
                grid[i].push(newNum)
            }
        }
        tileCount++;
    }

    tileCount = 1;
    while (tileCount < 5) {
        for (let i = tile.length * (tileCount - 1); i < tile.length * tileCount; i++) {
            let row = [];
            for (let j = 0; j < grid[i].length; j++) {
                let newNum = grid[i][j] + 1 > 9 ? 1 : grid[i][j] + 1;
                row.push(newNum)
            }
            grid.push(row)
        }
        tileCount++;

    }
}