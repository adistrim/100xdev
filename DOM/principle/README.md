### Request send from postman
```
http://localhost:3000/interest?principle=1000&rate=5&time=2
```

### Throttling & Debouncing
It's important to understand the difference between throttling and debouncing. Both are techniques to limit the number of times a function is called. Throttling enforces a maximum number of times a function can be called over time. As in "execute this function at most once every 100 milliseconds." Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. As in "execute this function only if 100 milliseconds have passed without it being called."

```javascript
let timeout

const debounceDisplay = () => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
        interest() // calling the function whose execution is to be delayed
    }, 500)
}
```