var express = require('express')
var app = express();
var request = require('request');
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwer1234',
  database : 'newdb'
});
connection.connect();
 
app.use(express.urlencoded());
app.use(express.json());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render("starter");
});

app.get('/join', function (req, res) {
    res.render("join");
});

app.get('/authResult', function (req, res){
    console.log("auth result!!!");
    var auth_code = req.query.code
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";
    var option = {
        method : "POST",
        url :getTokenUrl,
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
        },
        form : {
            code : auth_code,
            client_id : "l7xx0c72fec45e1b4bd2bdb16a860f12955a",
            client_secret : "a266b8c54a6a4131a5d8e8619478b143",
            redirect_uri : "http://localhost:3000/authResult",
            grant_type : "authorization_code"
        }
    };
    request(option, function(err, res, body){
        if(err) throw err;
        else {
            console.log(body);
        }
    })
    console.log(auth_code);
})
/*
app.get('/authResult', function(req, res) {
    var auth_code = req.query.code;
    console.log(auth_code);

    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";
    var option = {
        method : "POST",
        url : getTokenUrl,
        headers : {
            "Content-Type": "application/x-www-form-rulencoded; charset=UTF-8"
        },
        form : {
            code : auth_code,
            client_id : "l7xx0c72fec45e1b4bd2bdb16a860f12955a",
            client_secret : "a266b8c54a6a4131a5d8e8619478b143",
            redirect_uri : "http://localhost:3000/authResult",
            grant_type : "authorization_code"
        }
    };
    request(option, function(err, res, body){
        if(err) throw err;
        else {
            console.log(body);
        }
        console.log(auth_code);
    }) 
});

*/

app.listen(3000)
