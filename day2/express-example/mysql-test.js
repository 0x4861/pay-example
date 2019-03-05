var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwer1234',
  database : 'keysapay'
});
 
connection.connect();
 
connection.query('SELECT * FROM keysapay.user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();