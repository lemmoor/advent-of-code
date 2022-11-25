let p1 = {
    "pos": 10,
    "score": 0
}
let p2 = {
    "pos": 9,
    "score": 0
}
//part 2?
// 1 + 1 + 1 = 3, 1 + 2 + 1 = 4, ... 3 + 3 + 3 = 9
// const outcomes = [
//     {"total": 3, "count": 1},
//     {"total": 4, "count": 3},
//     {"total": 5, "count": 6},
//     {"total": 6, "count": 7},
//     {"total": 7, "count": 6},
//     {"total": 8, "count": 3},
//     {"total": 9, "count": 1},
// ]

// function dirac(universes, p1, p2){
//  
// }

part1();

function part1() {
    let die = 0;
    let dieRolls = 0;

    while (true) {
        let roll = 0;
        for (let i = 0; i < 3; i++) {
            rollDie();
            roll += die;
        }
        p1.pos = (p1.pos + roll) % 10 != 0 ? (p1.pos + roll) % 10 : 10;
        p1.score += p1.pos;
        if (p1.score >= 1000) break;

        roll = 0;
        for (let i = 0; i < 3; i++) {
            rollDie();
            roll += die;
        }
        p2.pos = (p2.pos + roll) != 0 ? (p2.pos + roll) % 10 : 10;
        p2.score += p2.pos;
        if (p2.score >= 1000) break;
    }

    console.log(p1.score > p2.score ? p2.score * dieRolls : p1.score * dieRolls)

    function rollDie() {
        die = die + 1 > 100 ? 1 : die + 1;
        dieRolls++;
    }
}

