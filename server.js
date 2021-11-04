// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function getTimeStamp({date}) {
  return new Promise((resolve, reject) => {
    if((unix = Number(date)) && (utc = new Date(unix).toUTCString())) {
      resolve({unix, utc})
    }
    else if((unix = Date.parse(date)) && (utc = new Date(unix).toUTCString())) {
      resolve({unix, utc})
    }
    else {
      reject({"error":"Invalid Date"})
    }
  })
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req,res) => {
    let unix = Date.now();
    let utc = new Date(unix).toUTCString();
    res.json({unix,utc})
})

app.get("/api/:date", (req,res)=> {
  getTimeStamp(req.params)
  .then(data => res.json(data))
  .catch(err => res.json(err))
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
