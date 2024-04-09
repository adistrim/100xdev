function sq(n) {
    return n * n;
}

function cube(n) {
    return n * n * n;
}

function quad(n) {
    return n * n * n * n;
}

function something(a, b, fn) {
    let half = fn(a);
    let anotherHalf = fn(b);
    return half + anotherHalf;
}

// q: what is callbacks?
// a: callbacks are functions that are passed as arguments to other functions

console.log(something(99, 189, quad));