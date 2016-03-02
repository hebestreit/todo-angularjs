// setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./db');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// routes
var routes = require('./routes')(app);
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8070);
console.log('Live at port 8070');