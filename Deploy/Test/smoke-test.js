//todo: this should probably be moved to task mule directory

//
// This is a smoke test of the production server.
//

'use strict';

describe("smoke test", function () {

	var request = require('request-promise');
	var argv = require('yargs').argv;
	var chai = require("chai");
	var expect = chai.expect;
	var chaiAsPromised = require("chai-as-promised");

	chai.use(chaiAsPromised);

	var url = argv.url;
	if (!url) {
		throw new Error('url not specified');
	}

	it('is alive', function () {

		var requestParams = {
			method: 'GET',
			uri: url + "/is-alive",
			resolveWithFullResponse: true,
		};

		return expect(request(requestParams)).to.eventually.have.property('statusCode').and.equal(200);
	});

});