(function() {
    "use strict";

    function cookies() {}
    cookies.set = function(key, val, opt) {
        var pairs = [key + "=" + encodeURIComponent(val)];
        if (opt) {
            if (opt.maxAge) pairs.push("Max-Age=" + opt.maxAge);
            if (opt.domain) pairs.push("Domain=" + opt.domain);
            if (opt.path) pairs.push("Path=" + opt.path);
            if (opt.expires) pairs.push("Expires=" + opt.expires.toUTCString());
            if (opt.httpOnly) pairs.push("HttpOnly");
            if (opt.secure) pairs.push("Secure");
        }
        var _cookie = pairs.join("; ");
        document.cookie = _cookie;
    };
    cookies.get = function(key) {
        var _cookie = document.cookie;
        var pairs = _cookie.split(/; */);
        for (var i = 0, len = pairs.length; i < len; ++i) {
            var pair = pairs[i];
            var eq = pair.indexOf("=");
            if (eq !== -1 && key === pair.substr(0, eq)) {
                var val = pair.substr(eq + 1);
                return decodeURIComponent(val);
            }
        }
        return undefined;
    };



    if (typeof exports === "object") {
        module.exports = cookies;
    } else {
        window.cookies = cookies;
    }
})();
