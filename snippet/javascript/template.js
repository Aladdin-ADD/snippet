/**
 * tmpl - a simple template system
 * @version 0.2
 */

(function() {
    "use strict";
    /**
     * Syntas:
     * {{ expr }}
     * {% if (...) %}...{% else if (...) %}...{% else %}...{% end %}
     * {% for (...;...;...) %}...{% end %}
     * {% for (... in ...) %}...{% end %}
     *
     * Caution:
     * The `html generator` is created in GLOBAL scope by `new Function`.
     * You should avoid pulloting GLOBAL in template string.
     *
     * @method tmpl
     * @param {String} s template string
     * @return {Function} html generator
     * @example
     *      var t = tmpl("<p>{{ value }}</P>");
     *      var o = t( {value: "simple example"} );
     */
    function tmpl(s) {
        return new Function(
            "with (arguments[0] || {}) {var o='" +
            s.replace(/\s+/g, " ")
            .replace(/{{/g, "'+")
            .replace(/}}/g, "+'")
            .replace(/{%\s*end\s*%}/g, "';}o+='")
            .replace(/{%\s*else/g, "';}else")
            .replace(/{%/g, "';")
            .replace(/%}/g, "{o+='") +
                "';}return o;"
        );
    }

    tmpl.cache = {};
    /**
     * Convert template fragment to html generator & store in tmpl.cache
     *
     * @method get
     * @param {String} selector Used to get template fragment
     * @return {Function} html generator
     * @example
     *      var t = tmpl.get("#template-id");
     *      var o = t( {...} );
     */
    tmpl.get = function(selector) {
        if (! (selector in tmpl.cache))
            tmpl.cache[selector] = tmpl(document.querySelector(selector).innerHTML);
        return tmpl.cache[selector];
    };

    // export to window
    window.tmpl = tmpl
})();
