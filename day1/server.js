var http=require('http');

http.createServer(function(req, res) {
    var body = "hello server";
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(body);
}).listen(3000);

