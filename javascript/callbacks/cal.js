function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function something(a, b, fn) {
    return fn(a, b);
}

func = add;
console.log(something(99, 99, func));

