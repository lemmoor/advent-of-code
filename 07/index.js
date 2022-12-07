const fs = require('fs');
const path = require('node:path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/)

let notCurrentDirs = new Map();
let currentDirs = new Map();

for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if(line[0] == "$"){
        if(line.startsWith("$ cd")){
            let dir = line.substring(5);
            if(dir == ".."){
                let last = [...currentDirs.entries()][currentDirs.size - 1]
                currentDirs.delete(last[0]);
                notCurrentDirs.set(last[0], last[1])
            }
            else {
                if(i > 0){
                    dir = [...currentDirs.keys()][currentDirs.size - 1] + "/" + dir; 
                }
                currentDirs.set(dir, 0); 
            }
        }
        continue;
    }
    let file = line.match(/\d+/);
    let fileSize = !file ? 0 : +file[0];

    [...currentDirs.entries()].forEach(([dir, dirSize]) => {
        currentDirs.set(dir, dirSize + fileSize)
    })
}

[...currentDirs.entries()].forEach(([dir, dirSize]) => {
    notCurrentDirs.set(dir, dirSize)
})

let sum = 0;
for (const value of notCurrentDirs.values()) {
    if(value <= 100000){
        sum += value;
    }
}
console.log("part 1: ", sum)

//part 2

let spaceFree = 70000000 - notCurrentDirs.get("/");
let toFreeUP = 30000000 - spaceFree;
let sortedDirs = [...notCurrentDirs.entries()].sort(([dir, size], [dir2, size2]) => size - size2);

for (const dir of sortedDirs) {
    if(dir[1] >= toFreeUP){
        console.log("part 2: ", dir[1]);
        break;
    }
}
