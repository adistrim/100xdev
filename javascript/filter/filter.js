input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const output = input.filter((number) => { // I have used => instead of function keyword
    if (number % 2 === 0) {
        return true;
    }
    return false;
})

console.log(output);


// The filter function is another higher-order function in JavaScript that takes a callback function as an argument. It applies the callback function to each element of the input array and returns a new array with the elements for which the callback function returns true.
