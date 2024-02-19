const nums = [10, 9, 1, 8, 11, 23, 9, 8, 0];

let com = 0;
for (let i = 0; i < nums.length; i++) {
    if (com <= nums[i]) {
        com = nums[i];
    }
}

console.log(com);