const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');

const {Pool, Client} = require('pg')
const conString = 'postgres://postgres:example@postgres/postgres'

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/static', express.static('public'));

app.get('/workspace', function(req, res) {
    res.sendFile(path.join(__dirname + '/../frontend/governet_workspace.html'));
    });

app.get('/committee', (req, res, next) => {
    console.log('test')
    let cmtname = req.query.cmtname
    let cmtid = req.query.cmtid
    //let query = "SELECT contributes_by_committee.\"NAME\", contributes_by_committee.\"TRANSACTION_AMT\" as \"Ammount\", candidate.\"CAND_NAME\" FROM contributes_by_committee JOIN candidate ON contributes_by_committee.\"CAND_ID\" = candidate.\"CAND_ID\" WHERE \"NAME\" = \'MAIN STREE MEDIA GROUP\'"

    const pool = new Pool({
      connectionString: conString,   
    })
    pool.query('SELECT NAME from public.cmte_to_cand', (err, result) => {
      console.log(err, results)
      res.send(results.rows)
      pool.end()
    });
});

app.get('/candidates', (req, res) => {
    let candname = req.query.candname
    let candid = req.query.candid
});

app.get('/test', function (req, res, next){
  const { Pool, Client } = require('pg')
  const conString = 'postgres://postgres:example@postgres/postgres'
  const pool = new Pool({
    connectionString: conString,
  })
  pool.query('SELECT * FROM public.congress_person', (err, results) => {
    console.log(err, results)
    res.send(results.rows)
    pool.end()
  });
});

app.listen(8080);
