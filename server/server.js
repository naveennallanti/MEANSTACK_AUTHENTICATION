const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const api = require('./routes/api.js');

app.use(bodyParser.json());
app.use('/api', api);
app.get('/', function (req, res) {
    res.send("hello from server");
});

app.listen(PORT, function () {
    console.log("server running on port", PORT);
})