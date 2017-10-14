//ProPublica Parser
// This is a module for parsing the input of the ProPublica Congress API, and inserting the contents into the Postgres Database

const { Pool, Client } = require('pg')
const conString = 'postgres://postgres:example@postgres/postgres'
const request = require('request');

const pool = new Pool({
  connectionString: conString,
})

var options = {
  url: "https://api.propublica.org/congress/v1/115/senate/members.json",
  headers: {
    "X-API-Key": "yvle4Cp4cgvHZZLa1FGsah5XfxfpvkNcOx3WlZMy"
  }
};


//currently, this function below will in fact connect to the PG db and insert the member information as needed
//couldn't figure out how to do a dynamic insert, using a variable for the column name, so they are hard-coded for now
//might be able to dynamically generate the sql with variables, add them to an array as strings, then execute each one on the db

function callback(error, response, body){
  if (!error && response.statusCode == 200){
  var info = JSON.parse(body);
  for(var i=0; j=info.results[0].members.length, i<j; i++){
    console.log(info.results[0].members[i]);
      list = [];
    for(var keys in info.results[0].members[i]){ 
      list.push(info.results[0].members[i][keys])
      }
     
pool.query('INSERT INTO congress_person (id, role, role_abbr, api_uri, first_name, middle_name, last_name, date_of_birth, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, url, rss_url, contact_form, in_office, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, ocd_id, office, phone, fax, state, senate_class, state_rank, lis_id, missed_votes_pct, votes_with_party_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40)',[list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9], list[10], list[11], list[12], list[13], list[14], list[15], list[16], list[17], list[18], list[19], list[20], list[21], list[22], list[23], list[24], list[25], list[26], list[27], list[28], list[29], list[30], list[31], list[32], list[33], list[34], list[35], list[36], list[37],list[38], list[39]], (err, results) => {
    console.log(err, results)
});
    }
  }
};

var info = request(options, callback)
