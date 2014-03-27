// http://davidwalsh.name/disable-console
// http://www.hydrantlabs.org/Security/Google/Chrome/
// work on chrome

(function() {
    "use strict";

    Object.defineProperty(console, "_commandLineAPI", {
        get: function() {
            throw "console is disabled";
        },
        set: function(val) {}
    });
})();
