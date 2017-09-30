var request = require('request');
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


