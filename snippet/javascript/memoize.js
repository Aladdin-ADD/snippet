// http://addyosmani.com/blog/faster-javascript-memoization/

(function() {
    "use strict";

    function defaultResolver(args) {
        var key = "";
        var len = args.length;
        var currentArg;
        while (len--) {
            currentArg = args[len];
            key += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : currentArg;
        }
        return key;
    }

    function memoize(fn, resolver) {
        var _slice = Array.prototype.slice;

        var _resolver = (typeof resolver === "function") ?
            resolver : defaultResolver;

        function memoized() {
            var key = _resolver(_slice.call(arguments));
            return (key in memoized.cache) ?
                memoized.cache[key] :
                (memoized.cache[key] = fn.apply(this, arguments));
        }

        memoized.cache = {};

        return memoized;
    }

    window.memoize = memoize;
})();
