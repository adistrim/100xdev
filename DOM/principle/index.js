const express = require('express');

const app = express();

app.get('/interest', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const principle = parseFloat(req.query.principle);
    const rate = parseFloat(req.query.rate);
    const time = parseFloat(req.query.time);

    const interest = (principle * rate * time) / 100;

    res.send(interest.toString());
})


app.listen(3000)

// http://localhost:3000/interest?principle=1000&rate=5&time=2