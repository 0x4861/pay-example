var express = require('express');
var request = require('request');
var http = require('http');
var convert = require('xml-js');
var parser = require('xml2js');
var app = express();

var option = {
    'hostname': 'www.weather.go.kr',
    'path': '/weather/forecast/mid-term-rss3.jsp?stnld=109'
}

function current(callback) {
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            console.log(body);
            console.log(jsonData);
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
        })
    });
}

exports.current = current;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/root', function (req, res) {
    res.send('Root!!!');
});

app.get('/request-test', function (req, res) {
    request('http://www.google.com', function (error, response, body) {
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    });
});

app.get('/sample-test', function (req, res) {
    current(function sampletest(data) {
        console.log(data);
        res.send(data);
    });
});

app.listen(3000);
