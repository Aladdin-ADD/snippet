// http://davidwalsh.name/disable-console
// http://www.hydrantlabs.org/Security/Google/Chrome/
// work on chrome

'use strict';

var disableConsole = function() {
    Object.defineProperty(console, '_commandLineAPI', {
        get: function() {
            throw new Error('console is disabled');
        },
        set: function(val) {}
    });
};

module.exports = disableConsole;
