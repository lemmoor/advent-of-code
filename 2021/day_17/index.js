const fs = require("fs");

let minX, maxX, minY, maxY;

fs.readFileSync('input.txt', { encoding: "utf-8" })
    .replace("target area: ", "")
    .split(", ")
    .map(x => {
        x = x.split("=")
        let coords = x[1].split("..")
        if (x[0] == 'x') {
            minX = +coords[0];
            maxX = +coords[1];
        }
        else {
            minY = +coords[0];
            maxY = +coords[1];
        }
    })

part1();
part2();

function part2() {
    let good = 0;
    for (let x = 1; x <= maxX; x++) {
        let y = minY;
        while (y <= -minY) {
            let launch = launchProbe(x, y)
            if (launch.success) {
                good++;
            }
            y++;
        }
    }
    console.log(good)
}

function part1() {
    let highestY = 0;
    for (let x = 1; x < maxX; x++) {
        let y = 1;
        while (y < -minY) {
            let launch = launchProbe(x, y)
            if (launch.highestY > highestY) highestY = launch.highestY;
            y++;
        }
    }
    console.log(highestY)
}

function launchProbe(xvel, yvel) {
    let highestY = 0;
    let x = 0;
    let y = 0;
    while (true) {
        x += xvel;
        y += yvel;
        if (xvel > 0) {
            xvel--;
        }
        else if (xvel < 0) {
            xvel++;
        }
        yvel--;
        if (highestY < y) highestY = y;
        if (minX <= x && maxX >= x && minY <= y && maxY >= y) return { "success": true, highestY };
        if (x > maxX || y < minY) return { "success": false };
    }
}