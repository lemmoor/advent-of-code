const fs = require('fs');
const path = require('node:path');
let [cratesInput, movesInput] = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).replace(/\r|\[|\]/g, "").split(/\n\n/)

cratesInput = cratesInput.split(/\n/)
let crateColAmount = +cratesInput.pop().trim().split(" ").pop()
let crates = new Array(crateColAmount).fill(null).map(() => [])
for(let i = cratesInput.length - 1; i >= 0; i--){
    let crateRow = cratesInput[i].trimEnd().split(/(?<=\w)\s|\s{4}/)
    crateRow.forEach((crate, i) => {
        if(crate){
            crates[i].push(crate)
        }
    })
}
// console.log({crates})

let moves = movesInput.split(/\n/).map(step => {
    let amount = +step.match(/(?<=move )\d+/g);
    let from = +step.match(/(?<=from )\d+/g) - 1;
    let to = +step.match(/(?<=to )\d+/g) - 1;
    return {amount, from, to};
})

// console.log(moves);

// part 1
// for(let i = 0; i < moves.length; i++){
//     for(let j = 0; j < moves[i].amount; j++){
//         let from = crates[moves[i].from].pop()
//         crates[moves[i].to].push(from)
//     }
// }

// console.log(crates.reduce((a, b) => a + b[b.length-1], ""))

// part 2
for(let i = 0; i < moves.length; i++){
    let pickedUp = [];
    for(let j = moves[i].amount-1; j >= 0 ; j--){
        let from = crates[moves[i].from].pop()
        pickedUp.push(from)
    }
    crates[moves[i].to].push(...pickedUp.reverse())
}

console.log(crates.reduce((a, b) => a + b[b.length-1], ""))