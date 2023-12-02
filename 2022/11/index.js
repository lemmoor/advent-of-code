const fs = require('fs');
const path = require('node:path');

class Monkey{
    constructor(id, items, operation, test){
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.inspectedItems = 0;
    }
}

let mod = 1;
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
.replace(/\r/g, "")
.split(/\n\n/)
.map(monkey => {
    let instructions = monkey.split(/\n/)
    let id = +monkey.match(/(?<=Monkey )\d+/g);
    let items = monkey.match(/(?<=Starting items: )\d\d.*/g)[0].split(/,? /).map(Number)
    let operation = monkey.match(/(?<=Operation: new = old )(.*?)\n/)[1]
    operation = makeOPerationFn(operation)
    let test = monkey.match(/(?<=Test: ).*$/gs)
    test = makeTestFn(test[0])
    return new Monkey(id, items, operation, test)
})

function makeOPerationFn(str){
    let [op, n] = str.split(" ");
    if(op === "+"){
        if(n == "old"){
            return (old) => old + old;
        }
        else{
            return (old) => old + +n;
        }
    }
    if(op === "*"){
        if(n == "old"){
            return (old) => old * old;
        }
        else{
            return (old) => old * +n;
        }
    }
}

function makeTestFn(str){
    let conditions = str.split(/\n/).map(s => s.trim())
    let n = +conditions[0].match(/(?<=divisible by )\d+/)
    let ifTrue = +conditions[1].match(/(?<=If true: throw to monkey )\d+/)
    let ifFalse = +conditions[2].match(/(?<=If false: throw to monkey )\d+/)
    mod*=n;
    return (item) => item % n == 0 ? ifTrue : ifFalse; 
}

let round = 0;
while(round < 10000){
  for (const monkey of input) {
    for (let i = 0; i < monkey.items.length; i++) {
        //for part 1
        // let newItem = Math.floor(monkey.operation(monkey.items[i]) / 3);
        //for part 2
        let newItem = monkey.operation(monkey.items[i]) % mod;
        let newID = monkey.test(newItem);
        monkey.inspectedItems++;
        input[newID].items.push(newItem)

    }
    monkey.items = [];
  }  
  round++
}

let sortedMonkeys = input.sort((m1, m2) => m2.inspectedItems - m1.inspectedItems)

console.log(sortedMonkeys[0].inspectedItems * sortedMonkeys[1].inspectedItems);
