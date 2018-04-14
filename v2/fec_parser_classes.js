"use strict"
const request = require('request');
const rp = require('request-promise');
const assert = require('assert');
const fs = require('fs');
const csv = require('csvtojson');
const MongoClient = require('mongodb').MongoClient;

/*
// should there be one class per dataset per year?
// one class with a set of data sets and years that then performs the action on many of them?
// https://m.dotdev.co/how-to-use-classes-in-node-js-with-no-pre-compilers-and-why-you-should-ad9ffd63817d
*/

let cn = [
    "CAND_ID",
    "CAND_NAME",
    "CAND_PTY_AFFILIATION",
    "CAND_ELECTION_YR",
    "CAND_OFFICE_ST",
    "CAND_OFFICE",
    "CAND_OFFICE_DISTRICT",
    "CAND_ICI",
    "CAND_STATUS",
    "CAND_PCC",
    "CAND_ST1",
    "CAND_ST2",
    "CAND_CITY",
    "CAND_ST",
    "CAND_ZIP"
];

let ccl = [
    "CAND_ID",
    "CAND_ELECTION_YR",
    "FEC_ELECTION_YR",
    "CMTE_ID",
    "CMTE_TP",
    "CMTE_DSGN",
    "LINKAGE_ID"
];

let oppexp = [
    "CMTE_ID",
    "AMNDT_IND",
    "RPT_YR",
    "RPT_TP",
    "IMAGE_NUM",
    "LINE_NUM",
    "FORM_TP_CD",
    "SCHED_TP_CD",
    "NAME",
    "CITY",
    "STATE",
    "ZIP_CODE",
    "TRANSACTION_DT",
    "TRANSACTION_AMT",
    "TRANSACTION_PGI",
    "PURPOSE",
    "CATEGORY",
    "CATEGORY_DESC",
    "MEMO_CD",
    "MEMO_TEXT",
    "ENTITY_TP",
    "SUB_ID",
    "FILE_NUM",
    "TRAN_ID",
    "BACK_REF_TRAN_ID",
];

// to do: add regex assert statements to constructor to ensure type and year are input correctly
class FECDataSet {
    constructor(year, type, path) {
        this._year = year;
        this._type = type;
        this._path = path;
        this._filename = (this._type + this._year.substring(2) + '.zip');
        this._uri = this._path + this._year + '/' + this._filename;
        this._fileArchives = [];
    };
    // Setters
    // One use is to instantiate a single dataset object, then modify it to access several different types/years
    set year(year){
        this._year = year;
    };
    set type (type){
        this._type = type;
    };
    set path(pathname) {
      this._path = pathname;
    };
    set filename(filename) {
      this._filename = filename;
    };
    // Getters
    get year() {
      return this._year;
    };
    get type() {
        return this._type;
    };
    get filename() {
        return this._filename;
    };
    get path() {
        return this._path;
    };
    get uri() {
        return this._uri;
    };
    get fileArchives(){
        return this._fileArchives;
    };
    // Method to download the dataset to disk, and execute a callback on completion
    downloadSet(destPath, callback) {    
        let _destPath = destPath;
        let _options = {
            uri: this._uri,
        };
        console.log("Attempting to stream file from " + _options.uri)
        rp(_options)
        .pipe(fs.createWriteStream(_destPath + this._filename))
        .on('error', function (error){
            console.log(error);
            this.end();
        })
        .on('close', () => {
            console.log("File " + _destPath + this._filename + " saved successfully ");
            this._fileArchives.push(_destPath + this._filename);
            callback();
        })
    };

    // Method to parse a data set saved to disk
    parseDataSet(srcPath, model, callback){
        let _input = fs.createReadStream(srcPath);
        let _model = model;
        let _objectArray = [];
        let _inputLength = 0;
        csv({delimiter: "|"})
        .fromStream(_input)
        .on('csv',(csvRow, rowIndex) => {
            var x = 0;
            // create an empty object to use as a base for the database input object
            var _modelObject = {}
            // for each row, add an attribute to the model object
            csvRow.forEach((_item) => {
                _modelObject[_model[x]] = _item;
                x += 1;
            });
            // push the object to the return array
            _objectArray.push(_modelObject);
            // write to the database in batches of 1000
            if (_objectArray.length > 1000){
                var url = 'mongodb://localhost:27017'
                MongoClient.connect(url)
                .then((client) => {
                    const db = client.db('governet');
                    let _collection = db.collection('cn');
                    _collection.insertMany(_objectArray).then(
                    client.close());
                    _objectArray = [];
                    _inputLength += _objectArray.length;
                    console.log(_inputLength);
                  })
                  .catch((error) => {
                      console.log(error)});
            };
        })
        .on('error', function(error){
            console.log(error);
            this.end();
        })
        .on('done',(error) => {
            console.log(_objectArray.length);
            console.log(_inputLength);
            callback();
        });
    }
  };
  
  let path = 'https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/'
  
let cn12 = new FECDataSet('2012','cn', path);
console.log('Starting Parser');
cn12.parseDataSet('./archive/2012/cn.txt', cn, () => console.log('worked..'));