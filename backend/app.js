var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://172.18.0.2:27017/test', function(err, db) {
    if(err) throw err;
    
    //create a new test collection, and write to it
    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });
    });
    // locate all the entries using find
    collection.find().toArray(function(err,results) {
        console.dir(results);
        
        // close the db
        db.close();
    });
});
