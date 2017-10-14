//import modules and includes
const { Pool, Client } = require('pg')
// name the connection string
const conString = 'postgres://postgres:example@postgres/postgres'
const readline = require('readline');
const parse      = require('csv-parse');
const util       = require('util');
const fs         = require('fs');
const path       = require('path');
const async      = require('async');
const csvHeaders = require('csv-headers');

const csvfn = process.argv[2];
//const dbnm  = process.argv[3];
//const tblnm = process.argv[4];


//set up the connection to the pg db
const pool = new Pool({
  connectionString: conString,
});

//start the promise chain which loads the data

new Promise((resolve, reject) => {
    csvHeaders({
        file      : csvfn,
        delimiter : '|'
    }, function(err, headers) {
        if (err) reject(err);
        else resolve({ headers });
    });
}).then(context => {
    return new Promise ((resolve, reject) => {
      var fields = '';
      var fieldnms = '';
      var qs = '';
      context.headers.forEach(hdr => {
        hdr = hdr.replace('', '_');
        if (fields !== '') fields += ',';
        if (fieldnms !== '') fieldnms += ',';
        if (qs !== '') qs += ',';
        fields += ` ${hdr} TEXT`;
        fieldnms += ` ${hdr} TEXT`;
        qs += ' ?';
      });      
      context.qs = qs;
      context.fieldnms = fieldnms;
      console.log(context, fieldnms)
      err => {
        if (err) reject(err);
        else resolve(context);
      }
    })
  })
