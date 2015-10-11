"use strict";

module.exports = function (log, validate) {

    return {
        
        description: "Test that the web server is alive.",
        
        dependsOn: [], 

        validate: function (config) {
            validate.config(config, 'dns-name');
        },
        
        invoke: function (config) {
            var url = 'http://' + config.get('dns-name') + '.cloudapp.net';
            return runCmd('cmd', ['/s', '/c', 'mocha', '--url', url, './Test/smoke-test.js'], { cwd: './' });
        },
    };
};