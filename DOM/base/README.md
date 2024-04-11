### Getting back to the stuff I already know.
Ngl it's kinda cool (that doesn't mean I'm ultimate level pro at it, but I can do some stuff)



```html
<!DOCTYPE html>
<html>
    <head>
        <title>DOM</title>
    </head>
    <script>
        const populateDiv = () => {
            const a = document.getElementById('input1').value
            const b = document.getElementById('input2').value
            const element = document.getElementById('finalsum')
            element.innerHTML = parseInt(a) + parseInt(b)
        }
    </script>
    <body>
        <input id="input1" type="text" placeholder="Input 1"><br><br>
        <input id="input2" type="text" placeholder="Input 2"><br><br>
        <button onclick="populateDiv()" >Calculate sum</button><br><br>
        <div id="finalsum"></div>
    </body>
</html>
```