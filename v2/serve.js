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
app.get(['/committee','/committee/:committeeID'], (req, res) => {
    var query = {}
    if (req.params.cmteID){query["CMTE_ID"] = req.params.cmteID};
    if (req.query.cmteID){query["CMTE_ID"] = req.query.cmteID};
    if (req.query.candID){query["CAND_ID"] = req.query.candID};

    _db.collection("cm").find(query).toArray((err, result)=>{
        if (err) throw err;
        res.json(result);
    });
});

// Get Candidates from the Database
app.get(['/candidate','/candidate/:candID'], (req, res) => {
    // this seems like a really redundant and clunky way to query the DB via the endpoint; what's a better way to approach this??
    var query = {}
    // the cand ID will be the most frequent targeted search; use the param for this; everything else is a query
    if (req.params.candID){query["CAND_ID"] = req.params.candID};
    if (req.query.year && req.query.year !== 'all'){query["CAND_ELECTION_YR"] = parseInt(req.query.year)};
    if (req.query.state && req.query.state !== 'all'){query["CAND_ST"] = req.query.state};
    if (req.query.candOffice){query["CAND_OFFICE"] = req.query.candOffice};
    if (req.query.district){query["CAND_OFFICE_DISTRICT"] = req.query.district};
    if (req.query.party){query["CAND_PTY_AFFILIATION"] = req.query.party};
    if (req.query.city){query["CAND_CITY"] = req.query.city};
    if (req.query.zip){query["CAND_ZIP"] = req.query.zip};

    console.log(req.query);

    _db.collection("cn").find(query)./*project({CAND_ID: 1, CAND_NAME: 1}).*/toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    })
});

app.get(['/contribution','/contribution/:candID'], (req, res) => {
    // this seems like a really redundant and clunky way to query the DB via the endpoint; what's a better way to approach this??
    var query = {}
    // the cand ID will be the most frequent targeted search; use the param for this; everything else is a query
    if (req.params.candID){query["CAND_ID"] = req.params.candID};
    if (req.query.cmteID && req.query.cmteID !== "all"){query["CMTE_ID"] = req.query.cmteID};
    if (req.query.candID && req.query.candID !== "all"){query["CAND_ID"] = req.query.candID};

    console.log(req.query);

    _db.collection("pas2").find(query).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
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

// 
app.get('/api/graph/candidate/:candidateID', (req, res) => {
    _db.collection("cn").find({}).toArray((err,result) => {
        if (err) throw err;
        var result = result.map((candidate, index, array)=>{
            return {name: candidate.CAND_NAME, id: candidate.CAND_ID}
        })
        res.json(result);
    })
})

app.get('/api/graph/committee/:committeeID', (req, res) => {
    _db.collection("cm").find({}).toArray((err,result) => {
        if (err) throw err;
        var result = result.map((committee, index, array)=>{
            return {name: committee.CMTE_NM, id: committee.CMTE_ID}
        })
        res.json(result);
    })
})

app.get('/api/graph/contribution/:candID', (req, res) => {
    query = {};
    if (req.params.candID){query["CAND_ID"] = req.params.candID};
    _db.collection("pas2").find(query).toArray((err,result) => {
        if (err) throw err;

        // Empty values for the graph options and data, to be populated
        var graph = {};
        var nodes = [];
        var links = [];
        var categories = []

        var candidates = [];
        var committees = [];
        var secondaryCandidates = [];
        var primaryCandidateCategory = {name:"Primary Candidate","keyword":{},"base":"Primary Candidate"}

        var candidateCategory = {name:"Candidate","keyword":{},"base":"Candidate"}
        var committeeCategory = {name: "Committee","Keyword":{},base:"Committee"}
        categories.push(primaryCandidateCategory, candidateCategory, committeeCategory);
        graph['categories'] = categories;

        //add the requested candidate to the nodes list
        nodes.push({name: req.params.candID, id: req.params.candID, value: 1, category: 0});
        // Get the graph edges between a given candidate and the committees who have contributed to that candidate
        // those links that have been processed; for filtering unique objects basedo n contribution id
        var processed = {};
        links = (
            links.concat(
                result
                // map the contributions to a given candidate to just the cand id and committee ID
                .map((contribution, index, array) => {
                    //return {contribution_id: contribution.CMTE_ID + contribution.CAND_ID, cmte_id: contribution.CMTE_ID, cand_id: contribution.CAND_ID}
                    return {source: contribution.CMTE_ID, target: contribution.CAND_ID}
                })
                // filter out the duplicated transactions, using a 'processed' flag
                .filter((contribution) => {
                    if (processed[contribution.source]) {
                        return false;
                    }
                    processed[contribution.source] = true;
                    committees.push(contribution.source);
                    nodes.push({name:contribution.source, id: contribution.source, value: 1, category: 2})
                    return true;
                })
            )
        )

        //add the link objects generated above to the graph object as a dict of link objcets
        graph["links"] = links;
        // add all the node objects to the graph
        graph["nodes"] = nodes;

        res.json(graph);
    })
})

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

