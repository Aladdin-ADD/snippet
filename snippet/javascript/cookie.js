(function() {
    "use strict";

    var E = encodeURIComponent, D = decodeURIComponent;

    function Cookies() {}

    Cookies.get = function(key) {
        if (!key) return;
        var ekey = E(key);
        var docCookie = document.cookie;
        var pairs = docCookie.split(/; */);
        for (var i = 0, len = pairs.length; i < len; ++i) {
            var pair = pairs[i];
            var equal = pair.indexOf("=");
            if (equal !== -1 && ekey === pair.substr(0, equal)) {
                return D(pair.substr(equal + 1));
            }
        }
    };

    Cookies.set = function(key, value, options) {
        if (!key) return;
        var pair = [E(key) + "=" + E(value)];
        if (options) {
            if (options.maxAge) pair.push("Max-Age=" + options.maxAge);
            if (options.domain) pair.push("Domain=" + options.domain);
            if (options.path) pair.push("Path=" + options.path);
            if (options.expires) pair.push("Expires=" + options.expires);
            if (options.httpOnly) pair.push("HttpOnly");
            if (options.secure) pair.push("Secure");
        }
        var cookie = pair.join("; ");
        document.cookie = cookie;
    };

    Cookies.del = function(key, options) {
        if (!key) return;
        options = options || {};
        options.expires = "Thu, 01 Jan 1970 00:00:00 GMT";
        Cookies.set(key, "", options);
    };


    if (typeof exports === "object") {
        module.exports = Cookies;
    } else {
        var w = (0, eval)("this");
        w.Cookies = Cookies;
    }
})();
