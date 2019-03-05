const express = require('express');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const PORT = 3000;
const app = express();
const api = require('./routes/api.js');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);
app.get('/', function (req, res) {
    res.send("hello from server");
});

app.listen(PORT, function () {
    console.log("server running on port", PORT);
});