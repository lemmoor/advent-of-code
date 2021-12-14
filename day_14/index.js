const fs = require('fs')
const { METHODS } = require('http')

let pairRules = new Map()
let [template, rules] = fs.readFileSync('input.txt', { encoding: "utf-8" })
    .split(/\r?\n\r?\n/)
    .filter(Boolean)
rules.split(/\r?\n/).map(x => {
    x = x.split(" -> ")
    pairRules.set(x[0], x[1])
})

part1(template, pairRules)
part2(template, pairRules)

function part2(template, pairRules) {
    let pairCount = {}
    for (let i = 0; i < template.length - 1; i++) {
        pairCount[template[i] + template[i + 1]] = pairCount[template[i] + template[i + 1]] === undefined ? 1 : pairCount[template[i] + template[i + 1]] + 1;
    }

    for (let i = 0; i < 40; i++) {
        pairCount = part2_step(pairRules, pairCount)
    }

    console.log(countElements2(pairCount))
}

function part2_step(pairRules, pairCount) {
    let newPairs = {}
    let pairs = Object.keys(pairCount)
    for (const key of pairs) {
        let [first, sec] = [...key]
        let insert = pairRules.get(key)
        newPairs[first + insert] = newPairs[first + insert] === undefined ? pairCount[key] : newPairs[first + insert] + pairCount[key];
        newPairs[insert + sec] = newPairs[insert + sec] === undefined ? pairCount[key] : newPairs[insert + sec] + pairCount[key];
    }
    return newPairs;
}

function countElements2(pairs) {
    let count = {}
    let keys = Object.keys(pairs)
    for (const key of keys) {
        let [a, b] = [...key]
        count[a] = count[a] === undefined ? pairs[key] : count[a] + pairs[key];
        count[b] = count[b] === undefined ? pairs[key] : count[b] + pairs[key];
    }
    let t = Object.values(count).map(x => Math.ceil(x / 2))
    return (Math.max(...t) - Math.min(...t));
}

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