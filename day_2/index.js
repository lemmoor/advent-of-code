const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }
    data = data.split(/\r?\n/)

    console.log(countDepth(data));
})

function countDepth(data) {
    let depth = 0;
    let hor = 0;
    let aim = 0;
    for (let i = 0; i < data.length; i++) {
        let dir = data[i].split(' ');
        if (dir[0] == 'forward') {
            hor += +dir[1];
            depth += aim * +dir[1];
        }
        else if (dir[0] == 'down') {
            aim += +dir[1]
        }
        else if (dir[0] == 'up') {
            aim -= +dir[1];
        }
    }

    return depth * hor;
}