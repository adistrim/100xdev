function Calculate(a, b, fnToCall) {
    return fnToCall(a, b);
}

function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

console.log(Calculate(3, 2, sum));

// It's a callback thing, where calculate function callback the sum or minus depending on the input.