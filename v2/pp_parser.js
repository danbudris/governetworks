//ProPublica Parser
// This is a module for parsing the input of the ProPublica Congress API, and inserting the contents into the Mongo Database
const request = require('request');
var rp = require('request-promise');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URI
const url = 'mongodb://localhost:27017';

// database name
const dbname = 'governet'


let options = {
  url: "https://api.propublica.org/congress/v1/115/senate/members.json",
  headers: {
    "X-API-Key": "yvle4Cp4cgvHZZLa1FGsah5XfxfpvkNcOx3WlZMy"
  }
};

const insertDocuments = (db, objects, callback) => {
  // Get the documents collection
  const collection = db.collection('senators');
  // Insert some documents
  collection.insertMany(objects, (err, result) => {
    assert.equal(err, null);
    callback(result);
  });
}

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  const db = client.db(dbname);

  rp(options)
  .then((data) => {
    let senate = JSON.parse(data)
    let senators = senate["results"][0]["members"]
    console.log(senators)
    insertDocuments(db, senators, () => {
      client.close();
    })
  });
});
