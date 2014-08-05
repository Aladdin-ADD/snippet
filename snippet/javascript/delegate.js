(function() {
    "use strict";

    var delegate = function(event, selector, callback) {
        this.addEventListener(event, function(ev) {
            var t = ev.target;
            var parents = this.querySelectorAll(selector);
            var len = parents.length;
            while (len--) {
                if (parents[len].contains(t)) {
                    return callback.call(parents[len], ev);
                }
            }
        });
    };

    HTMLElement.prototype._delegate = delegate;
    // document.body._delegate("click", "div", function(ev) {});
    // (document instanceof HTMLElement === false)
})();
