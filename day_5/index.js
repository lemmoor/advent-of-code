const fs = require('fs')

const GRID_WIDTH = 1000;

class Path {
    constructor(startX, startY, endX, endY) {
        this.startX = +startX
        this.startY = +startY
        this.endX = +endX
        this.endY = +endY
    }

    gridStartPos() {
        return (this.startY * GRID_WIDTH) + this.startX;
    }

    gridEndPos() {
        return (this.endY * GRID_WIDTH) + this.endX;
    }
}

const data = fs.readFileSync('input.txt', { encoding: "utf-8" }).split(/\r?\n/).map(x => {
    let points = x.split(" -> ").map(p => p.split(","))
    return new Path(points[0][0], points[0][1], points[1][0], points[1][1])
})

const grid = new Array(GRID_WIDTH * GRID_WIDTH).fill(0)

for (const p of data) {
    let start, end;
    if (p.gridStartPos() > p.gridEndPos()) {
        start = p.gridEndPos();
        end = p.gridStartPos();
    }
    else {
        start = p.gridStartPos();
        end = p.gridEndPos()
    }

    if (p.startY == p.endY) {
        for (let i = start; i <= end; i++) {
            grid[i]++;
        }
    }
    else if (p.startX == p.endX) {
        for (let i = start; i <= end; i += GRID_WIDTH) {
            grid[i]++;
        }
    }
    //diagonal lines for pt2
    else {
        if ((p.startX > p.endX && p.startY > p.endY) || (p.startX < p.endX && p.startY < p.endY)) {
            for (let i = start; i <= end; i += (GRID_WIDTH + 1)) {
                grid[i]++;
            }
        }
        else {
            for (let i = start; i <= end; i += (GRID_WIDTH - 1)) {
                grid[i]++;
            }
        }
    }

}

let intersections = 0;
for (const p of grid) {
    if (p > 1) intersections++;
}

console.log(intersections)