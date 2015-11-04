"use strict";

module.exports = function (log, validate) {

    var request = require('request-promise');
    var sleep = require('sleep-promise');

    //
    // Amount of time between url requests. 
    //
    var delayBetweenRequests = 1000;

    //
    // Wait a minute before starting the check.
    // The restart needs time to start happening.
    //
    var startDelay = 60000; // 1 minute.

    //
    // Amount of time before the restart test is considered failed if no response has been received.
    //
    var failureTimeOut = 300000; // 5 minutes.

    //
    // Continue to request until we get a 200 response.
    //
    var requestUntilSuccessful = function (url) {

        return request({
                method: 'GET',
                uri: url,
                resolveWithFullResponse: true,
            })
            .then(function (response) {
                log.info('Hit ' + url + ", returned status: " + response.statusCode);

                if (response.statusCode !== 200) {
                    return sleep(delayBetweenRequests)
                        .then(function () {
                            return requestUntilSuccessful(url);
                        });
                }
            })
            .catch(function (err) {
                log.info('Error while waiting for response.');
                log.info(err.stack);

                return sleep(delayBetweenRequests)
                    .then(function () {
                        return requestUntilSuccessful(url);
                    });
            });
    };

    return {
        
        description: "Test that the web server is alive.",
        
        dependsOn: [], 

        validate: function (config) {
            validate.config(config, 'dns-name');
        },

        invoke: function (config) {

            //
            // Wait until the server is back online after restart.
            //

            var url = 'http://' + config.get('dns-name') + '.cloudapp.net';
            var isAliveUrl = url + "/is-alive";

            return sleep(startDelay) // Wait for a bit before starting the test.
                .then(function () {
                    return Promise.race([
                        requestUntilSuccessful(isAliveUrl),
                        sleep(failureTimeOut).then(function () {
                            throw new Error("Restart test failed due to timeout.");
                        })
                    });
                });
        },
    };
};