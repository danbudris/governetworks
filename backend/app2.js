var MongoClient = require('mongodb').MongoClient;
var request = require('request');

// set up the url for the mongo server
var url = "mongodb://172.18.0.2:27017/";

// Set up the options/key for making a call to the propublica api
var options = {
    url: "https://api.propublica.org/congress/v1/115/senate/members.json",
    headers: {
        "X-API-Key": "yvle4Cp4cgvHZZLa1FGsah5XfxfpvkNcOx3WlZMy"
    }
};

// Reach out the the ProPublica API, defined above, and log the return to the console
function callback(error, response, body){
    if (!error && response.statusCode == 200){
        var info = JSON.parse(body);
        console.log(info.result[0].members);
        return info.result[0].members;
    }
};

function create_collection(url, database, collection){
    url = url+database;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.createCollection(collection, function (err, res){
            if (err) throw err;
            console.log("collection", collection, "created");
            db.close();
        })
    })
};

// Insert a document into the given database and collection
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

insert_document(url, "test", "test", request(callback));
