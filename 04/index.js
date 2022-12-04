const fs = require('fs');
const path = require('node:path');
const sections = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
                    .split(/\r?\n/)
                    .map(e => e.split(",").map(e => {
                        let range = e.split('-').map(Number) 
                        return {from: range[0], to: range[1]}
                    }))

// console.log(sections)

let contained = sections.filter(pairs => (pairs[0].from <= pairs[1].from && pairs[0].to >= pairs[1].to) || (pairs[0].from >= pairs[1].from && pairs[0].to <= pairs[1].to))
console.log("part 1: ", contained.length);

let overlap = sections.filter(pairs => !(pairs[0].to < pairs[1].from || pairs[1].to < pairs[0].from))
console.log("part 2: ", overlap.length);