"use strict";

module.exports = function (log, validate) {
    
    return {
        
        description: "Provision VM and deploy code",
        
        dependsOn: [
            'provision-vm',
            'init-remote-repo',
            'deploy-code',
        ],
  };
};