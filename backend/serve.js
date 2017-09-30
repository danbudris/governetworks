var dbfunc = require("./db_functions.js");
var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.18.0.2:27017/";

//create the DB variable
db = null

//assign the connection to the DB variable
MongoClient.connect(url, function(err, database){
  if(err){console.error(err)}
  db = database
});

var app = express();
var path = require('path');

var getdocument = function(coll, cb){
    db.collection("test").find({}).toArray(cb);
};

var getname = function(name, cb){
  db.collection("test").find({first_name: name}).toArray(cb);
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/frontend/projectproposal.html'));
    });

app.get('/test', function(req, res){
  var data = []
  db.collection('test').find({first_name: "John"}).toArray(function(err, docs){
    if(err){console.error(err)}
    res.send(docs)
  })
});

app.listen(8080);
