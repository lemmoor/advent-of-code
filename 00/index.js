const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n\r?\n/)

console.log(input)