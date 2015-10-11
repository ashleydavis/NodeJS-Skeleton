var path = require('path');
var express = require('express');

//
// Start the server and return it.
// Call server.close() to kill the server.
//
var startServer = function (done) {
var app = express();

var staticPath = path.join(__dirname, '../Client');
console.log(staticPath);
app.use(express.static(staticPath));

process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception: ' + err.message + '\r\n' + err.stack);
});

	app.get('/is-alive', function (req, res) {
		res.status(200).end();
	});

	app.get('/example-rest-api', function (req, res) {
		res.json({ hello: 'computer'});
	});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

		if (done) {
			done();
		}
	});

	return server;
};

module.exports = startServer;

if (require.main === module) {
	startServer();
}