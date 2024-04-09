input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function multiplyByTwo(number) {
    return number*2;
}

newArray = input.map(multiplyByTwo)

console.log(newArray);

/*

Here we defined a function first those does the multiplication of the number by 2 and then we used the map function to apply this function to each element of the input array. The map function returns a new array with the transformed elements.


What is the difference between the two snippets?

1. The first snippet uses a for loop to iterate over the input array and multiply each element by 2. The result is stored in a new array called newArray.

2. The second snippet uses the map function to achieve the same result. The map function takes a callback function as an argument and applies it to each element of the input array. The result is stored in a new array called newArray.

3. The second snippet is more concise and cleaner than the first snippet. It abstracts away the details of iteration and transformation, making the code easier to read and understand.

4. The map function is a higher-order function that takes a callback function as an argument. It is a functional programming concept that allows for more declarative and expressive code.


another example is in the next snippet

*/