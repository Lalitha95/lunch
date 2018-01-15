const express = require('express');
const path = require('path');

const app = express();
var names = [];
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/displayNames', (req, res) => {
  const namesList = Array.from(names);
  // Return them as json
  res.json(namesList);
  console.log(`Sent names`);
});

app.get('/names/:name', (req, res) => {
  console.log(req.params);
  if(req.params.name){
    names.push(req.params.name);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
