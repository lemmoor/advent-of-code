const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).trim().replace(/\,/g, "").split(/\r?\n/)
.map((line) => {
	return toArr(line)
})

// console.log(input);

// console.log(toArr("[[1][234]]"));

function toArr(str) {
    console.log(str);
    // if(str == "[867]") stop()
	if (!isNested(str)) {
		return str.substring(1, str.length - 1).split("").map(Number)
	}
	else {
        str = str.substring(1, str.length-1)
        let nested = isNested(str)
        let arr = []
        for(let i = 0; i < str.length; i++){
            if(str[i] == "["){
                // if(nested){
                //     let mostOuterArr = str.match(/\[.*\]/)
                //     if(mostOuterArr === null){
                //         console.log(str, mostOuterArr);
                //         throw new Error("halt")
                //         stop()
                //     } 
                //     arr.push(toArr(mostOuterArr[0]))
                //     i += mostOuterArr.length-2;
                // }
                // else{
                //     let s = str.substring(i)
                //     let firstArr = s.match(/\[.*?\]/)
                //     if(firstArr === null){
                //         console.log(str, firstArr);
                //         throw new Error("halt2")
                //     }
                //     arr.push(toArr(firstArr[0]))
                //     i += firstArr.length-2;
                // }

                let s = str.substring(i)
                    let firstArr = getArrs(s);
                    if(firstArr === null){
                        console.log(str, firstArr);
                        throw new Error("halt2")
                    }
                    arr.push(toArr(firstArr[0]))
                    i += firstArr.length-2;

            }
            else{
                if(str[i] != "]") arr.push(parseInt(str[i]))
            }
        }
        return arr;
	}
}

console.log(isNested("[[]]")); //true
console.log(isNested("[[[867]9710][[224]0[4910][4811]9]5][88[57]13][][6[1[01][6109]]][]")); //false


function isNested(str) {
    let bracketCount = 0;
	for(let i = 0; i < str.length - 1; i++){
        if(str[i] == "[") bracketCount++;
        if(bracketCount > 1) return true;
        if(str[i] == "]") bracketCount--;
    }
	return false;
}


console.log(getArrs("[[[8,6,7],9,7,10],[[2,2,4],0,[4,9,10],[4,8,1,1],9],5],[8,8,[5,7],1,3],[],[6,[1,[0,1],[6,10,9]]],[]"));
function getArrs(str){
    let bracketCount = 0;
    let lastStart = 0;
    let arrs = [];
    for(let i = 0; i < str.length; i++){
        if(str[i] == "[") bracketCount++;
        if(str[i] == "]") bracketCount--;
        if(bracketCount == 0){
            let arr = str.substring(lastStart, i+1)
            arrs.push(arr)
            i += arr.length -1
            console.log(arr);
        }
    }
    return arrs;
}

let sum = 0;
// for(let i = 0; i < input.length; i+=2){
//     let left = input[i];
//     let right = input[i+1];
//     if(isLessOrEqual(left, right)){ // true true false true false true false false
//         sum += Math.floor(i / 2) + 1;
//     }
// }

// console.log(sum);

function isLessOrEqual(left, right){
    if(typeof left == "number"){
        left = [left]
    }
    if(typeof right == "number"){
        right = [right]
    }

    
    for(let i = 0; i < left.length; i++){
        if(right[i] === undefined) return false;
        if(typeof right[i] == 'object' || typeof left[i] == 'object'){
            if(!isLessOrEqual(left[i], right[i])) return false;
        }
        else{
            if(right[i] < left[i]) return false;
            if(right[i] > left[i] && right[i+1] == undefined ) return true;
        }
    }

    return true; 
}