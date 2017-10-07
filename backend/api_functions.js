const request = require('request');
var options = {
  url: "https://api.propublica.org/congress/v1/115/senate/members.json",
  headers: {
    "X-API-Key": "yvle4Cp4cgvHZZLa1FGsah5XfxfpvkNcOx3WlZMy"
  }
};


function callback(error, response, body){
  if (!error && response.statusCode == 200){
  var info = JSON.parse(body);
  console.log(info.results[0].members);
  return info;
  }
};

request(options, callback)
  for(var i=0; j=info.results[0].members.length, i<j; i++){
    for(var keys in info.results[0].members[i]){ 
      console.log(keys)
      console.log(info.results[0].members[i][keys])
    }
    //console.log(info.results[0].members[i])
    //console.log('test')
    //console.log(Object.keys(info.results[0].members[i]))
    //console.log(Object.values(info.results[0].members[i]))
    }
  }
};

var info = request(options, callback)
