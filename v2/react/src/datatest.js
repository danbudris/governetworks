/*

            "categories":[{"name":"Candidate","keyword:{},"base":"CandidateElement"},{"name":"Committee","keyword":{},"base":"CommitteeElement"}],
            "nodes":[{"name":"","value":"","category":}]
            "links":[{"source":0,"target":0}]

*/

{ _id: 5a9b38b88b16d233b56bdc0b,
    CMTE_ID: 'C00007922',
    AMNDT_IND: 'N',
    RPT_TP: 'M12',
    TRANSACTION_PGI: 'P',
    IMAGE_NUM: Long { _bsontype: 'Long', low_: -7305275, high_: 46918214 },
    TRANSACTION_TP: '24K',
    ENTITY_TP: 'CCM',
    NAME: 'MARK TAKANO FOR CONGRESS',
    CITY: 'RIVERSIDE',
    STATE: 'CA',
    ZIP_CODE: 925175214,
    EMPLOYER: '',
    OCCUPATION: '',
    TRANSACTION_DT: 11052015,
    TRANSACTION_AMT: 2000,
    OTHER_ID: 'C00498667',
    CAND_ID: 'H2CA43245',
    TRAN_ID: 'VPEH8A0D1W2',
    FILE_NUM: 1036924,
    MEMO_CD: '',
    MEMO_TEXT: '',
    SUB_ID: Long { _bsontype: 'Long', low_: 156836444, high_: 959755888 } },
  { _id: 5a9b38b88b16d233b56bec85,
    CMTE_ID: 'C00029447',
    AMNDT_IND: 'N',
    RPT_TP: 'M10',
    TRANSACTION_PGI: 'P',
    IMAGE_NUM: Long { _bsontype: 'Long', low_: -1438688678, high_: 46917751 },
    TRANSACTION_TP: '24K',
    ENTITY_TP: 'CCM',
    NAME: 'MARK TAKANO FOR CONGRESS',
    CITY: 'RIVERSIDE',
    STATE: 'CA',
    ZIP_CODE: 92517,
    EMPLOYER: '',
    OCCUPATION: '',
    TRANSACTION_DT: 9182015,
    TRANSACTION_AMT: 1500,
    OTHER_ID: 'C00498667',
    CAND_ID: 'H2CA43245',
    TRAN_ID: 'D29988',
    FILE_NUM: 1030429,
    MEMO_CD: '',
    MEMO_TEXT: '',
    SUB_ID: Long { _bsontype: 'Long', low_: 698102337, high_: 955099275 } 
},

for each candidate in candidates:
    add to nodes object

for each committee in committees:
    add to nodes object

for each contribution in contribution:
    if the commitee id + candidate id link does not exist in the links list:
        add to links list
        add committe + candadite ID pair to 'links exsiting list'



        {"_id":"5a9773aa8b16d233b539592c","CMTE_ID":"C00000059","CMTE_NM":"HALLMARK CARDS PAC","TRES_NM":"ERIN BROWER","CMTE_ST1":"2501 MCGEE","CMTE_ST2":"MD#288","CMTE_CITY":"KANSAS CITY","CMTE_ST":"MO","CMTE_ZIP":64108,"CMTE_DSGN":"U","CMTE_TP":"Q","CMTE_PTY_AFFILIATION":"UNK","CMTE_FILING_FREQ":"M","ORG_TP":"C","CONNECTED_ORG_NM":"","CAND_ID":""}