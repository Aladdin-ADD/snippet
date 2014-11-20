// https://developer.mozilla.org/docs/Web/Events/DOMContentLoaded#Cross-browser_fallback
// for ie8, use `readystatechange`
// for ie67, `document.documentElement.doScroll("left")` will throw an error until the DOM is ready
//
// https://github.com/jquery/jquery/blob/1.x-master/src/core/ready.js

(function() {
    var win = window;
    var doc = document;
    var fns = [];
    var isReady = false;

    var readyCallback = function() {
        doc.removeEventListener("DOMContentLoaded", readyCallback);
        win.removeEventListener("load", readyCallback);
        isReady = true;
        for (var i = 0, len = fns.length; i < len; ++i) {
            fns[i]();
        }
    };

    (function() {
        if (doc.readyState === "complete") {
            setTimeout(readyCallback); // do not block
        } else {
            doc.addEventListener("DOMContentLoaded", readyCallback);
            win.addEventListener("load", readyCallback); // fallback for DOMContentLoaded
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


/*
var readyCallback = function() {
    // ie8
    if (doc.readyState !== "complete") return;
    doc.detachEvent("onreadystatechange", readyCallback);
    win.detachEvent("onload", readyCallback);
    isReady = true;
};
(function() {
    // ie8
    doc.attachEvent("onreadystatechange", readyCallback);
    win.attachEvent("onload", readyCallback);

    // ie67
    var top = false;
    try { top = win.frameElement === null; } catch(e) {}
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
})();
*/
