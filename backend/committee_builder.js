const path = require('path');
const pg = require('pg');

module.exports = {
    process_committees: function(response){
        //set up database connections
        const {Pool, Client} = require('pg');
        const conString = 'postgres://postgres:example@postgres/postgres';
    
        //define the query
        var query1 = "SELECT public.committee.\"CMTE_ID\", public.committee.\"CMTE_NM\" FROM public.committee";
    
        //connect to the database and return
        const pool = new Pool({
        connectionString: conString,
        })
        pool.query(query1, (err, results) => {
            console.log(err, results)
    
            var committees = results.rows
            pool.end()
    
            var nodelist = [];
    
            for (var i = 0; len = committees.length, i < len; i++){
                    zid = 0;
                    z = 0;
    
                    nodelist.push({
                        id: committees[i]['CMTE_ID'],
                        label: committees[i]['CMTE_NM'],
                        font: "10px arial #e3dac9",
                        shadow:{color:"#161616"},
                    });
                }
            res.send(nodelist);
        });
      }
    };
