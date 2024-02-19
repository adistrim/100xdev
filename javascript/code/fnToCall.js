function sum(a, b, fnToCall) {
    result = a + b;
    fnToCall(result);
}

// fnToCall is an argument

function display(data) {
    console.log(data);
}

sum(1, 2, display)
