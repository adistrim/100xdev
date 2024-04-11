const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
    const { a, b } = req.query;
    res.header('Access-Control-Allow-Origin', '*');
    res.send(parseInt(a) + parseInt(b) + '');
})

app.listen(3000)

// http://localhost:3000/sum?a=10&b=20