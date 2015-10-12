var path = require('path');
var express = require('express');
var request = require('request-promise');

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

	var requestJson = function (url) {
		return request(url)
			.then(function (data) {
				return JSON.parse(data);
			});
	};

	app.get('/forwarded-rest-api', function (req, res) {
		requestJson("http://somewhere-else.com/some-rest-api")
			.then(function (result) {
				res.json(result);
			})
			.catch(function (err) {
				console.error(err.stack);
				res.status(500).end();
			});
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