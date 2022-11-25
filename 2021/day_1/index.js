const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }
    data = data.split(/\r?\n/)
    data = data.map(Number);

    console.log(countIncrease(data));
})

function countIncrease(nums) {
    let count = 0;
    let prev = nums[0] + nums[1] + nums[2];
    for (let i = 1; i < nums.length - 2; i++) {
        if (prev < (nums[i] + nums[i + 1] + nums[i + 2])) count++;
        prev = nums[i] + nums[i + 1] + nums[i + 2]
    }
    return count;
}
