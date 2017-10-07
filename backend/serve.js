var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');

app.get('/senators', function(req, res) {
    res.sendFile(path.join(__dirname + '/projectProposal.html'));
    });

app.get('/test', function (req, res, next){

  const { Pool, Client } = require('pg')
  const conString = 'postgres://postgres:example@postgres/postgres'
  const pool = new Pool({
    connectionString: conString,
  })
  pool.query('SELECT first_name, last_name, party FROM public.congress_person', (err, results) => {
    console.log(err, results)
    res.send(results.rows)
    pool.end()
  });
});

app.listen(8080);
