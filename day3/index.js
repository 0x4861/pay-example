var express = require('express')
var app = express();
var request = require('request');
var path = require('path');
var cors = require('cors');
var parser = require("xml2js");
var bodyParser = require('body-parser')
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database : 'kisapay'
});
 
connection.connect();
 
app.use(express.urlencoded());
app.use(express.json());

console.log(path.join(__dirname,'views'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(cors());

function weather(callback){
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109',
     function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);    
        })
    });
}

app.get('/callback', function (req, res) {
    weather(function(data){
        res.send(data);
    })
});


app.get('/weather', function (req, res) {
    weather(function(data){
        res.send(data);
    })
});

app.get('/sampleDesign', function(req, res){
    res.render('designSample');
})

app.get('/sampleDesign2', function(req, res){
    res.render('starter');
})


app.get('/join', function(req, res){
    res.render('join');
})

app.post('/join', function(req, res){
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.password;
    console.log(name + "님 회원 가입 시작");
    
    connection.query('INSERT into user (userid, username, userpassword) VALUES (?,?,?)',[id,name,password],
     function (error, results, fields) {
        if (error){ throw error; }
        else {
            console.log(results);
            res.json(1);
        }
      });
})

app.get('/', function (req, res) {
    request('https://testapi.open-platform.or.kr/account/balance', function (error, response, body) {
      console.log('body:', body); // Print the HTML for the Google homepage.
      var balance = body.balance_amt;
      console.log(balance);
      res.send(body);
    });
});

app.get('/home', function (req, res) {
    res.send('<html><body><h1>hello home</h1></body></html>');
})

app.get('/about', function (req, res) {
    res.send('about');
})
 
app.listen(3000)
