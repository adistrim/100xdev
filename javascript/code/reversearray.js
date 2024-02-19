let nums = [1, 2, 3, 4, 5];

let leftindex = 0;
let rightindex = nums.length - 1;

while (leftindex < rightindex) {
    temp = nums[leftindex];
    nums[leftindex] = nums[rightindex];
    nums[rightindex] = temp;

    leftindex++;
    rightindex--;
}

console.log(nums);