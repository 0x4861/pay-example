var express = require('express')
var app = express();
var request = require('request');
var path = require('path');
var mysql = require('mysql');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwer1234',
  database : 'newdb'
}); 

app.use(express.urlencoded());
app.use(express.json());

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs'); 

app.use(express.static('public'));
 
app.get('/index', function(req, res){
    res.render('home');
})
connection.connect();
 
app.post('/join', function(req, res){
    var name = req.body.name;
    var password = req.body.password;
    var id = req.body.id;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var useseqnum = req.body.useseqnum;
    var sql = "INSERT INTO user (userid, userpassword, username, accessToken, refreshToken, useseqnum) VALUES (?,?,?,?,?,?)"
    connection.query(sql,[id, password, name, accessToken, refreshToken, useseqnum ], function (error, results, fields) {
        if (error) throw error;
        else {
            res.json(1)
        }
      });    
})

//199003328057724253012100 계좌번호
//199004084057725919017698 계좌번호


app.get('/user',function(req, res){
    var accessToken = "51f5bf86-bbb4-440b-99cd-27a907c026dc";
    var requestURL = "https://testapi.open-platform.or.kr/user/me?user_seq_no=1100034842";
    var option = {
        method : "GET",
        url : requestURL,
        headers : {
            "Authorization" : "Bearer " + accessToken
        }
    }
    request(option, function(err, response, body){
        res.send(body);
    })
})

app.get('/balance',function(req, res){
    var accessToken = "51f5bf86-bbb4-440b-99cd-27a907c026dc";
    var requestURL = "https://testapi.open-platform.or.kr/v1.0/account/balance";
    var qs = 
    "?fintech_use_num=199004084057725919017698&"
    + "tran_dtime=20190307162353"
    var option = {
        method : "GET",
        url : requestURL+qs,
        headers : {
            "Authorization" : "Bearer " + accessToken
        }
    }
    console.log("url : "+ option.url);
    request(option, function(err, response, body){
        var data = JSON.parse(body);

        res.json(data);
    })
})

app.get('/list',function(req, res){
    var accessToken = "51f5bf86-bbb4-440b-99cd-27a907c026dc";
    var requestURL = "https://testapi.open-platform.or.kr/v1.0/account/transaction_list";
    var qs = 
    "?fintech_use_num=199004084057725919017698" +
    "&inquiry_type=A"+
    "&from_date=20160101"+
    "&to_date=20160101"+
    "&sort_order=A"+
    "&page_index=00001"+
    "&tran_dtime=20190307101010"

    var option = {
        method : "GET",
        url : requestURL+qs,
        headers : {
            "Authorization" : "Bearer " + accessToken
        }
    }
    request(option, function(err, response, body){
        var data = JSON.parse(body);
        res.json(data);
    })
})


app.get('/authResult', function(req, res){
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
    request(option, function(err, response, body){
        if(err) throw err;
        else {
            console.log(body);
            var accessRequestResult = JSON.parse(body);
            res.render('resultChild', {data : accessRequestResult});
        }
    })
    console.log(auth_code);
})

app.get('/signup', function(req, res){
    res.render('signup');
})

app.listen(3000)
