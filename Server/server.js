var path = require('path');
var express = require('express');
var app = express();

var staticPath = path.join(__dirname, '../Client');
console.log(staticPath);
app.use(express.static(staticPath));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});