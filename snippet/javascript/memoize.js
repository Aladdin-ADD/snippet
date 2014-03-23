// http://addyosmani.com/blog/faster-javascript-memoization/

(function() {
    "use strict";

    function hashArguments(args) {
        var key = "";
        var i = args.length;
        var currentArg = null;
        while (i--) {
            currentArg = args[i];
            key += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : currentArg;
        }
        return key;
    }

    function memoize(fn, hashFunction) {
        var hash = (typeof(hashFunction) == "function") ?
            hashFunction : hashArguments;

        function wrapper() {
            var key = hash(Array.prototype.slice.call(arguments));
            return (key in wrapper.memoized) ?
                wrapper.memoized[key] :
                wrapper.memoized[key] = fn.apply(this, arguments);
        }

        wrapper.memoized = {};

        return wrapper;
    }

    var win = (0, eval)("this");
    win.memoize = memoize;
})();
