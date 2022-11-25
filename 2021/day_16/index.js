const fs = require("fs");

const data = fs.readFileSync('input.txt', { encoding: "utf-8" })
let bits = [...data].map(x => (parseInt(x, 16).toString(2)).padStart(4, '0')).join("")

console.log(bits)

let versionSum = parseInt(bits.substring(0, 3), 2);
for (let i = 3; i < bits.length; i++) {

    if (parseInt(bits.substring(i, i + 3), 2) == 4) {
        //skip next 15 bits
        i += 15;
    }
    else {
        //versionSum += parseInt(bits.substring(i, 3), 2);
        if (bits[i + 1] == 0) {
            let packetsLen = parseInt(bits.substring(i + 2, i + 2 + 15), 2)
            //skip next packetsLen bits
            console.log("21", bits.substring(i + 2 + 15, i + packetsLen))
            i += packetsLen;
        }
        else {
            //next 11 bits - number of subpackets contained
            let numberofPackets = parseInt(bits.substring(i + 2, i + 2 + 11), 2)
            //next numberofPackets * 11 bits
            console.log('28', bits.substring(i + 2 + 11, i + numberofPackets * 11))
            i += numberofPackets * 11;
        }
    }
}

console.log(versionSum)