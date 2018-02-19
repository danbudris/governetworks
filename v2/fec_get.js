// A set of functions to download FEC data and store it to disk, for later parsing and insertion into the database

const request = require('request');
const rp = require('request-promise');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');

// Connection URI
const url = 'mongodb://localhost:27017';

// Database name
const dbname = 'governet'

// Range of files to retrieve from the Federal Election Commission FTP server
let dataSets = ["cm", "cn", "ccl", "oth", "pas2", "indiv", "oppexp"];

// Range of years to retrieve the file types from the FEC FTP server
let years = ["2018", "2016", "2014", "2012"];

// Path to save the .zip files from the FEC at
let archivepath = '/archive/';

// A function to fetch different data sets from different years
let fetchDataset = (year, recordtype) =>{
    
    let _path = 'https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/'
    let _destpath = 'archive/'+ year + '/'
    let _filename = (recordtype + year.substring(2) + '.zip');

    let _options = {
        uri: _path + year + '/' + _filename,
    }
    console.log(_options.uri)

    rp(_options)
    .pipe(fs.createWriteStream(_destpath + _filename))
    .on('close', () => {
        console.log("File " + _filename + " Saved Successfully" )
    });
}

let fetchAllDataSets = (dataSetList, yearsList) => {
    yearsList.forEach(year => {
        dataSetList.forEach(set => {
            fetchDataset(year, set)
        });
    });
};

fetchAllDataSets(dataSets, years);

/*
https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/2016/cm16.zip
*/