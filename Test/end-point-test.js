//
// This is a test of the rest api.
// Boots the server before running.
//

'use strict';

var request = require('request-promise');
var argv = require('yargs').argv;
var chai = require("chai");
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var exec = require('child_process').exec;
var startServer = require('../Server/server.js');
var nock = require('nock');

describe('end-point', function () {

	var requestJson = function (url) {
		return request(url)
			.then(function (data) {
				return JSON.parse(data);
			});
	};

	var server;
	var url = 'http://localhost:3000';

	beforeEach(function (done) {
		server = startServer(done);
	});

	afterEach(function () {
		server.close();
		server = null;
		nock.cleanAll();		
	});

	it('example-rest-api', function () {

		return expect(requestJson(url + '/example-rest-api')).to.eventually.eql({ hello: 'computer' });
	});

	it('forwarded-rest-api', function () {

		// Mock dependency.
		nock('http://somewhere-else.com')
			.get('/some-rest-api')
			.reply(200, {
				what: 'ever'
			});

		return expect(requestJson(url + '/forwarded-rest-api')).to.eventually.eql({ what: 'ever' });
	});

});