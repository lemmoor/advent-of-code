const { count } = require('console');
const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }
    data = data.split(/\r?\n/);

    //part 1
    //console.log(countPower(data))

    //part 2
    let oxygen = countRating(data, 0, "oxygen")
    let co2 = countRating(data, 0, "co2")
    console.log(oxygen * co2)
})

// bit - position of bit considered, ratingType = oxygen/co2
function countRating(data, bit, ratingType) {
    if (data.length == 1) return parseInt(data[0], 2);

    //count ones at given position across all data
    let counter = 0;
    let num;
    for (let i = 0; i < data.length; i++) {
        num = data[i].split("");
        counter += +num[bit];
    }

    let n; //most common bit
    if (counter >= data.length / 2) {
        if (ratingType == "oxygen") n = 1;
        else n = 0;
    }
    else {
        if (ratingType == "oxygen") n = 0;
        else n = 1;
    }

    //create new data with only the right numbers
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        num = data[i].split("");
        if (num[bit] == n) newData.push(data[i]);
    }

    return countRating(newData, bit + 1, ratingType)
}


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