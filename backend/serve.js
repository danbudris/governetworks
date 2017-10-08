var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/senators', function(req, res) {
    res.sendFile(path.join(__dirname + '/projectProposal.html'));
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
