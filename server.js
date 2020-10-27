const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Accept-Encoding: gzip, compress, br;

// the __dirname is the current directory from where the script is running

var server = app.listen(port, function(){
  console.log("App running on port");
});

app.use(express.static(__dirname + '/dist'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  console.log(__dirname)
});

// app.listen(port, () => console.log(`Server started at ${port}!`));
