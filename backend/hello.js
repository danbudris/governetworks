#!/usr/bin/env nodejs
var http = require('http');
var fs   = require('fs');

fs.readFile('/srv/governetworks/frontend/projectProposal.html', function (err, html){
    if (err) {
        throw err;
    } 
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }).listen(8080, '0.0.0.0');
});
console.log('Server running at http://localhost:8080/');
