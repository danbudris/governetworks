//create the database connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.17.0.2:27017/";

//var document = { name: "Company Inc", address: "Highway 99"};
var query = { first_name: "John" };

var request = require('request');
var options = {
  url: "https://api.propublica.org/congress/v1/115/senate/members.json",
  headers: {
    "X-API-Key": "yvle4Cp4cgvHZZLa1FGsah5XfxfpvkNcOx3WlZMy"
  }
};

function callback(error, response, body){
  if (!error && response.statusCode == 200){
  var info = JSON.parse(body);
  console.log(info.results[0].members);
  insert_document(url, "test_2", "test_coll2", info.results[0].members);
  }
};


// function to create a database of the given name
function create_db(url, database){
  url = url+database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database", db, "Created!");
    db.close();
  })
};

// function to insert a collection of the given name into the given database
function create_collection(url, database, collection){
  url = url+database
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    db.createCollection(collection, function (err, res) {
      if (err) throw err;
      console.log("Collection ", collection, " Created!");
      db.close();
    })
  })
};

function insert_document(url, database, coll_name, document){
  url = url+database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(coll_name).insertMany(document, function(err, res)
      {
      if (err) throw err;
      console.log("Document inserted into ", coll_name, " ", document)
      db.close();
      });
  });
};

function find_document(url, database, coll_name){
  url = url+database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(coll_name).findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
};

function find_all_document(url, database, coll_name){
  url = url+database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(coll_name).find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

function query_document(url, database, coll_name, query){
  url = url+database
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(coll_name).find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

//create_db(url, "test_2");
//create_collection(url, "test_2", "test_coll2");
//insert_document(url, "test_2", "test_coll2", document);
//find_all_document(url, "test_2", "test_coll2");
query_document(url, "test_2", "test_coll2", query);
//request(options, callback)

