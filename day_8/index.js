const fs = require('fs')
const data = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n/)
    .map(x => x.split(" | "))

function part1(signals) {
    let count = 0;
    for (const s of signals) {
        let nums = s[1].split(" ");
        for (const num of nums) {
            if (num.length == 2 || num.length == 3 | num.length == 4 || num.length == 7) count++;
        }
    }

    return count;
}
console.log(part1(data))