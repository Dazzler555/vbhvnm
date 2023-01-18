var request = require('request');
const url = process.env.URL;
function ping() {
  request.get({ url: url }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      console.log(body);
      console.log("done");
      setTimeout(ping, 60000);
    }
  });
}

ping(); // run the ping function for the first time
