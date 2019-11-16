// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// endpoint for a timestamp

app.get("/api/timestamp", function(req, res) {
  res.json({"unix": new Date().getTime() ,"utc": new Date().toUTCString()})
})

app.get("/api/timestamp/:date_string?", (req, res)=> {
  let dateString = req.params.date_string ? req.params.date_string : false

  if (/\d{5,}/.test(dateString)) {
    dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }

  let dateIntOriginal = new Date(dateString)

  if(new Date(dateString).toString() === "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({"unix": dateIntOriginal.getTime() ,"utc": dateIntOriginal.toUTCString()})
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});