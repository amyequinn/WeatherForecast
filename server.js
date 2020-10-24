const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

Accept-Encoding: gzip, compress, br;


// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));

});

app.listen(port);
