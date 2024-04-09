
input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// let's filter out the odd numbers from the input array

newArray = []

for (let i = 0; i < input.length; i++) {
    if (input[i] % 2 === 0) {
        newArray.push(input[i]);
    }
}

console.log(newArray);

/**
 * 
 Here we defined a new array called newArray and used a for loop to iterate over the input array. We checked if each element of the input array is even or not using the modulo operator (%) and pushed the even elements to the newArray.

 Let's see what we can do with the filter function in the next snippet.
 * 
 */
