const fs = require('fs')

let pairRules = new Map()
let [template, rules] = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n\r?\n/)
    .filter(Boolean)
rules.split(/\r?\n/).map(x => {
    x = x.split(" -> ")
    pairRules.set(x[0], x[1])
})

part1(template, pairRules)
function part1(template, pairRules) {
    for (let i = 0; i < 10; i++) {
        template = part1_step(template, pairRules)
    }
    console.log(countElements(template))
}

function part1_step(template, pairRules) {
    let newTemplate = template.charAt(0);
    for (let i = 0; i < template.length - 1; i++) {
        let first = template.charAt(i)
        let sec = template.charAt(i + 1)
        newTemplate += pairRules.get(first + sec) + sec;
    }
    return newTemplate;
}

function countElements(template) {
    let count = new Map();
    for (const t of template) {
        count.set(t, count.has(t) ? count.get(t) + 1 : 1)
    }

    let max = 0;
    let min = count.values().next().value;
    count.forEach(x => {
        max = max < x ? x : max;
        min = min > x ? x : min;
    })

    return max - min;
}