// what we are trying to do?

input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// so our job is to multiply this array with 2 and return the new array

newArray = []

for (let i = 0; i < input.length; i++) {
    newArray.push(input[i]*2);
}

console.log(newArray);

// this is the traditional way of doing this, but we can do this in a more cleaner way using map function

