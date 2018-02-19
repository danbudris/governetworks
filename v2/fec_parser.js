const csv = require('csvtojson')
const fs = require('fs');

let dataSetList = ["cm", "cn", "ccl","itoth","oppexp", "itpas2"];
let yearsList = ["2012"];

// Set up each object model
// Candidate Master File
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

//Committee Master File
let cm = [
    "CMTE_ID",
    "CMTE_NM",
    "TRES_NM",
    "CMTE_ST1",
    "CMTE_ST2",
    "CMTE_CITY",
    "CMTE_ST",
    "CMTE_ZIP",
    "CMTE_DSGN",
    "CMTE_TP",
    "CMTE_PTY_AFFILIATION",
    "CMTE_FILING_FREQ",
    "ORG_TP",
    "CONNECTED_ORG_NM",
    "CAND_ID"
];

// Candidate Committee Linkage File
let ccl = [
    "CAND_ID",
    "CAND_ELECTION_YR",
    "FEC_ELECTION_YR",
    "CMTE_ID",
    "CMTE_TP",
    "CMTE_DSGN",
    "LINKAGE_ID"
];

// Any Transaction from One Committee to Another
let itoth = [
    "CMTE_ID",
    "AMNDT_IND",
    "RPT_TP",
    "TRANSACTION_PGI",
    "IMAGE_NUM",
    "TRANSACTION_TP",
    "ENTITY_TP",
    "NAME",
    "CITY",
    "STATE",
    "ZIP_CODE",
    "EMPLOYER",
    "OCCUPATION",
    "TRANSACTION_DT",
    "TRANSACTION_AMT",
    "OTHER_ID",
    "TRAN_ID",
    "FILE_NUM",
    "MEMO_CD",
    "MEMO_TEXT",
    "SUB_ID",
];

// Contributions to Candidates (and other expenditures) from Committees
let itpas2 = [
    "CMTE_ID",
    "AMNDT_IND",
    "RPT_TP",
    "TRANSACTION_PGI",
    "IMAGE_NUM",
    "TRANSACTION_TP",
    "ENTITY_TP",
    "NAME",
    "CITY",
    "STATE",
    "ZIP_CODE",
    "EMPLOYER",
    "OCCUPATION",
    "TRANSACTION_DT",
    "TRANSACTION_AMT",
    "OTHER_ID",
    "CAND_ID",
    "TRAN_ID",
    "FILE_NUM",
    "MEMO_CD",
    "MEMO_TEXT",
    "SUB_ID"
];

// Contributions by Individuals
let itcont = [
    "CMTE_ID",
    "AMNDT_IND",
    "RPT_TP",
    "TRANSACTION_PGI",
    "IMAGE_NUM",
    "TRANSACTION_TP",
    "ENTITY_TP",
    "NAME",
    "CITY",
    "STATE",
    "ZIP_CODE",
    "EMPLOYER",
    "OCCUPATION",
    "TRANSACTION_DT",
    "TRANSACTION_AMT",
    "OTHER_ID",
    "TRAN_ID",
    "FILE_NUM",
    "MEMO_CD",
    "MEMO_TEXT",
    "SUB_ID"
];

// Operating Expenditures
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


let processCSV = (input, model) => {
    // create the array to store the parsed objects
    objectArray = [];
    // set the delimiter value for the csv
    csv({delimiter: "|"})
    // stream it in from the readable stream
    .fromStream(input)
    // when a row is parsed, it's emitted -- subscribe to that event
    .on('csv',(csvRow, rowIndex)=>{
        x = 0;
        model_object = {}
        // for each row, add an attribute to the candidate object
        csvRow.forEach((item)=>{
            model_object[model[x]] = item;
            x += 1;
        });
        // push the candidate object to the return array
        objectArray.push(model_object);
    })
    .on('done',(error)=>{
        console.log(objectArray);
    });
};

/*
let year = '2012';
let dataset = 'itcont';
let filename = ('archive/' + year + "/" + dataset + '.txt');
let fileinput = fs.createReadStream(filename);

//processCSV(fileinput, eval(dataset));
*/

let processAllCsv = (dataSetList, yearsList) => {
    yearsList.forEach(year => {
        dataSetList.forEach(set => {
            let filename = ('archive/' + year + "/" + set + '.txt');
            let fileinput = fs.createReadStream(filename);
            processCSV(fileinput, eval(set));
        })
    })
};

processAllCsv(dataSetList, yearsList);