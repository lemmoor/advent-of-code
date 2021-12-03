const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }
    data = data.split(/\r?\n/);

    console.log(countPower(data));
})

function countPower(data) {
    let countOnes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let num;
    //count amount of 1 across all nums in each bit
    for (let i = 0; i < data.length; i++) {
        num = data[i].split("");
        for (let j = 0; j < num.length; j++) {
            countOnes[j] += +num[j];
        }
    }

    //make binary gamma and epsilon values
    let gamma = "", epsilon = "";
    for (let i = 0; i < num.length; i++) {
        if (countOnes[i] > data.length / 2) {
            gamma += "1";
            epsilon += "0";
        }
        else {
            gamma += "0";
            epsilon += "1";
        }
    }

    //convert to dec
    let gammaDec = parseInt(gamma, 2);
    let epsilonDec = parseInt(epsilon, 2);

    return gammaDec * epsilonDec;
}