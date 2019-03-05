
var fs = require('fs');
function callbackf(callback) {
    fs.readFile('test.txt', 'utf-8', function(err, result) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log("파일 읽는데 시간이 걸림...");
            callback(result);
            callback(result, "hello", "world");
        }
    });
}

console.log('A');
callbackf(function (data, a, b) {
    console.log(data);
    console.log('C')
    console.log(a);
    console.log(b);
    console.log('================')
})
console.log('D');



