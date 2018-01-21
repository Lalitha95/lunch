const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
var names = [];
var location = 'No location yet :o';
var locationLatLng = [-33, 151];
var date = moment();


var dateString = '';
dateString = date.format('LLLL');
console.log(dateString);


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

app.get('/api/displayLatLng', (req, res) => {
  // Return them as json
  res.json(locationLatLng);
  console.log(`Sent location`);
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
  locationLatLng[0] = req.body.location.lat;
  locationLatLng[1] = req.body.location.lng;
  res.send('POST request to the homepage');
  console.log(`post received`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
