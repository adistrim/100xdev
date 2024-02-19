sum = 0

for (let i = 0; i < 10000000000; i++) {
    sum += i;
}

console.log(sum);

// this command took like a minute to run because JS is a single threaded language.
// All the computation required by done by a single core.