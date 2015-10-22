"use strict";

module.exports = function (log, validate) {

    return {
        
        description: "Deploy a git repo to the remote vm.",
        
        dependsOn: [], 

        validate: function (config) {
            validate.config(config, 'dns-name');
            validate.config(config, 'vm-user');
            validate.config(config, 'vm-pass');
            validate.config(config, 'deploy:git:remote:code-repo');
        },
        
        invoke: function (config) {
            var host = config.get('dns-name') + '.cloudapp.net';
            var user = config.get('vm-user');
            var pass = config.get('vm-pass');
            var codeRepo = config.get('deploy:git:remote:code-repo');

            return azure.runProvisioningScripts(host, user, pass, './scripts/git/deploy-initial.sh', {
                "code-repo": codeRepo,
            });
        },
    };
};