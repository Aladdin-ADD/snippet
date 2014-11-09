// https://developer.mozilla.org/docs/Web/Events/DOMContentLoaded#Cross-browser_fallback
// for ie8, use `readystatechange`
// for ie67, `document.documentElement.doScroll("left")` will throw an error until the DOM is ready
//
// https://github.com/jquery/jquery/blob/1.x-master/src/core/ready.js

(function() {
    "use strict";

    var win = window;
    var doc = document;
    var fns = [];
    var isReady = false;

    var readyCallback = function() {
        if (win.removeEventListener) {
            win.removeEventListener("load", readyCallback);
        } else {
            win.detachEvent("onload", readyCallback);
        }
        isReady = true;
        for (var i = 0, len = fns.length; i < len; ++i) {
            fns[i]();
        }
    };

    (function() {
        if (doc.readyState === "complete") {
            setTimeout(readyCallback);
        } else {
            if (doc.addEventListener) {
                doc.addEventListener("DOMContentLoaded", function loader() {
                    doc.removeEventListener("DOMContentLoaded", loader);
                    readyCallback();
                });
                win.addEventListener("load", readyCallback);
            } else {
                // ie8
                doc.attachEvent("onreadystatechange", function loader() {
                    if (doc.readyState === "complete") {
                        doc.detachEvent("onreadystatechange", loader);
                        readyCallback();
                    }
                });
                win.attachEvent("onload", readyCallback);

                // ie67
                var top = false;
                try {
                    top = win.frameElement === null;
                } catch(e) {}
                if (doc.documentElement.doScroll && top) {
                    var doScroll = doc.documentElement.doScroll;
                    (function poll() {
                        try {
                            doScroll("left");
                        } catch(e) {
                            setTimeout(poll, 1);
                            return;
                        }
                        readyCallback();
                    })();
                }
            }
        }
    })();

    var domready = function(fn) {
        isReady ? fn() : fns.push(fn);
    };

    if (typeof exports === "object") {
        module.exports = domready;
    } else {
        win.domready = domready;
    }
})();
