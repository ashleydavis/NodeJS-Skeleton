"use strict";

module.exports = function (log, validate) {
    
    return {
        
        description: "Provision VM and deploy code",
        
        dependsOn: [
            'provision-vm',
            'hg/init-deployment-repo',
            'hg/local/deploy-initial',
            'smoke-test',
        ],
  };
};