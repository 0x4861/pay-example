
var fs = require('fs');

console.log('A');

fs.readFile('test.txt', 'utf-8', function(err, result) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("파일 읽는데 시간이 걸림...");
        console.log(result);
    }
});

console.log('C');



