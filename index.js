const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
var names = [];
var location = 'No location yet :o';
var locationLat = -33.8688;
var locationLng = 151.2093;
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Put all API endpoints under '/api'
app.get('/api/displayNames', (req, res) => {
  const namesList = Array.from(names);
  // Return them as json
  res.json(namesList);
  console.log(`Sent names`);
});

app.get('/api/displayLocation', (req, res) => {
  // Return them as json
  res.json(location);
  console.log(`Sent location`);
});

app.get('api/displayLat', (req, res) => {
  // Return them as json
  res.json('-33');
  console.log(`Sent location lat coords`);
});

app.get('api/displayLng', (req, res) => {
  // Return them as json
  res.json('151');
  console.log(`Sent location lng coords`);
});

app.get('/names/:name', (req, res) => {
  console.log(req.params);
  if(req.params.name){
    names.push(req.params.name);
  }
  res.send('Name added.');
});

app.post('/api/newLocation', function (req, res) {
  location = req.body.label;
  locationLatLng = req.body.location;
  console.log(location);
  res.send('POST request to the homepage');
  console.log(`post received`);
  //console.log(req.body);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
