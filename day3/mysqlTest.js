var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database : 'kisapay'
});
 
connection.connect();
 
connection.query('SELECT * FROM kisapay.user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();
