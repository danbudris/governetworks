const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const cmt_builder = require('./committee_builder');

const {Pool, Client} = require('pg')
const conString = 'postgres://postgres:example@postgres/postgres'

//This DB function should be called with queries from the below routes
function call_db(input_query){
    const pool = new Pool({
        connectionString: conString,
    })
    pool.query(input_query, (err, results) => {
        return results
    })
    pool.end()
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/static', express.static('public'));

app.get('/workspace', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/governet_workspace.html'));
    });

app.get('/committee', (req, res, next) => {
    console.log('test')
    var cmtname = req.query.cmtname
    var cmtid = req.query.cmtid

    //let cmtname = "YODER FOR CONGRESS, INC"

    //let query1 = "SELECT public.contributes_by_committee.\"NAME\", public.contributes_by_committee.\"TRANSACTION_AMT\" as \"Ammount\", public.candidate.\"CAND_NAME\" FROM public.contributes_by_committee JOIN public.candidate ON public.contributes_by_committee.\"CAND_ID\" = public.candidate.\"CAND_ID\" WHERE \"NAME\" = \'" + cmtname + "\'"
 
    if (cmtname) {
        var query1 = "SELECT public.contributes_by_committee.\"NAME\", public.contributes_by_committee.\"TRANSACTION_AMT\" as \"Ammount\", public.contributes_by_committee.\"CMTE_ID\", public.candidate.\"CAND_ID\", public.candidate.\"CAND_NAME\" FROM public.contributes_by_committee JOIN public.candidate ON public.contributes_by_committee.\"CAND_ID\" = public.candidate.\"CAND_ID\" WHERE \"NAME\" = '" + cmtname + "'";
    } else if (cmtid){
        cmtid.forEach((item) => {
            res.send(item);
        });
    } 
  
    else {
        var query1 = "SELECT public.committee.\"CMTE_ID\", public.committee.\"CMTE_NM\" FROM public.committee";  
    }

   const pool = new Pool({
      connectionString: conString,   
    })
      pool.query(query1, (err, results) => {
      console.log(err, results)
      res.send(results.rows)
      pool.end()
    });
});

app.get('/contribution', (req, res) => {
    candid = req.query.candid
    cmtid = req.query.cmtid

    var query1 = "SELECT public.committee.\"CMTE_ID\", public.committee.\"CMTE_NM\", SUM(public.contributes_by_committee.\"TRANSACTION_AMT\") AS \"Transaction Total\", public.congress_person.\"id\" FROM public.\"congress_person\" JOIN public.candidate ON public.candidate.\"CAND_NAME\" LIKE UPPER(public.congress_person.\"full_name\") JOIN public.contributes_by_committee ON public.candidate.\"CAND_ID\" = public.contributes_by_committee.\"CAND_ID\" JOIN public.committee ON public.contributes_by_committee.\"CMTE_ID\" = public.committee.\"CMTE_ID\" GROUP BY public.committee.\"CMTE_ID\", public.candidate.\"CAND_ID\", public.congress_person.\"id\", public.committee.\"CMTE_NM\" ORDER BY public.congress_person.\"id\", \"Transaction Total\" DESC"
    const pool = new Pool({
      connectionString: conString,
    })
      pool.query(query1, (err, results) => {
      console.log(err, results)
      res.send(results.rows)
      pool.end()
    });
});

app.get('/candidate', (req, res) => {
    let candname = req.query.candname
    let candid = req.query.candid
  
    var query1 = "SELECT public.candidate.\"CAND_ID\", public.candidate.\"CAND_NAME\" FROM public.candidate"

    const pool = new Pool({
      connectionString: conString,
    })
      pool.query(query1, (err, results) => {
      console.log(err, results)
      res.send(results.rows)
      pool.end()
    });

});

app.get('/test', function (req, res, next){
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
