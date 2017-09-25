#!/usr/bin/env nodejs
var http = require('http');
var fs   = require('fs');

// Read in the file, then pass the results of that operation to the next function...
fs.readFile('/srv/governetworks/frontend/projectProposal.html', function (err, html){
    // if the previous read returns an error, throw that error; otherwise, proceed...
    if (err) {
        throw err;
    } 
    // if no error, create an http server, and then write the html returned by the previous function, and serve it on 8080
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }).listen(8080, '0.0.0.0');
});
console.log('Server running at http://localhost:8080/');
