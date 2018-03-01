const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// the port to listen on 
const listenPort = 8080;

// connection URI
const url = 'mongodb://localhost:27017';

// database name
const dbname = 'governet';
var _db;

// Intentionally circumvent web security to make my life developing this easier in the short term
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get Committee Information from the Database
app.get('/committee/:committeeID', (req, res) => {
    _db.collection("cm").find({"":req.param.committeeID}).toArray((err, result)=>{
        if (err) throw err;
        res.json(result);
    });
});

// Get Candidates from the Database
app.get(['/candidate','/candidate/:candID'], (req, res) => {
    // this seems like a really redundant and clunky way to query the DB via the endpoint; what's a better way to approach this??
    query = {}
    // the cand ID will be the most frequent targeted search; use the param for this; everything else is a query
    if (req.params.candID){query["CAND_ID"] = req.params.candID};
    if (req.query.year){query["CAND_ELECTION_YR"] = parseInt(req.query.year)};
    if (req.query.candOffice){query["CAND_OFFICE"] = req.query.candOffice};
    if (req.query.district){query["CAND_OFFICE_DISTRICT"] = req.query.district};
    if (req.query.party){query["CAND_PTY_AFFILIATION"] = req.query.party};
    if (req.query.city){query["CAND_CITY"] = req.query.city};
    if (req.query.state){query["CAND_ST"] = req.query.state};
    if (req.query.zip){query["CAND_ZIP"] = req.query.zip};

    console.log(req.query);

    _db.collection("cn").find(query).toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

// Get Operational Exepnditures for Committees from the Database
app.get('/oppexp/:committeeID', (req, res) => {
    _db.collection("oppexp").find({}).toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

// Establish a persisent connection to the DB, using promises, then start the app
MongoClient.connect(url)
    .then((client) => {
        _db = client.db(dbname);
        console.log("Connection Established to " + url);
        // Only star the express app if the DB connection is established
        app.listen(listenPort, () => {console.log("listening on port: " + listenPort)});
    })
    .catch((err) => {
        console.log(err);
        throw(err);
    });

