var express    = require('express');
var request    = require('request');
var http       = require('http');
var bodyParser = require('body-parser');
var convert    = require('xml-js');
var parser     = require('xml2js');
var mysql      = require('mysql');
var path       = require('path');


var app        = express();
var server     = http.createServer();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwer1234',
    database : 'keysapay'
});

var option = {
    'hostname': 'www.weather.go.kr',
    'path': '/weather/forecast/mid-term-rss3.jsp?stnld=109'
}

console.log(path.join(__dirname + '/views'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

function current(callback) {
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            //console.log(body);
            //console.log(jsonData);
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
        })
    });
}
exports.current = current;

function sample_test(req, res) {
    current(function sampletest(data) {
        //console.log(data);
        res.send(data);
    });
}

function request_test(req, res) {
    request('http://www.google.com', function (error, response, body) {
        //console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    });
}
function db_test(req, res) {
    connection.connect();
    connection.query('SELECT * FROM keysapay.user', function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.send(results);
    });
    connection.end();
}

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/views/join.html');
});

app.get('/sample-test' , sample_test );
app.get('/request-test', request_test);
app.get('/db-test'     , db_test     );

app.post('/join', function(req, res) {
    var name = req.body.name;
    var id   = req.body.id;
    var pw   = req.body.pw;

    console.log(name + id + pw);
});

app.listen(3000);
