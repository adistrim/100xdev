// q: What's Async?
// a: Async is a library that provides powerful functions for working with asynchronous JavaScript.

// q: why do we need async?
// a: We need async because JavaScript is single-threaded, meaning that it can only execute one task at a time.

/*

Examples:
1. Send a request to a server and do something with the response
2. Read a file from the filesystem and do something with the contents
3. Wait for a timer to finish and do something when it's done
4. Wait for a user to click a button and do something when it happens

*/

// Write a async function that takes a callback function as an argument
// and calls it after 1 second.

function asyncFunction(callback) {
    setTimeout(() => {
        callback();
    }, 5000);
}

asyncFunction(() => {
    console.log('Hello, world!');
});
