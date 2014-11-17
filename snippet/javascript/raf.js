// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/

(function() {
    "use strict";
    var w = window;

    // polyfill for requestAnimationFrame
    var raf = w.requestAnimationFrame;
    var caf = w.cancelAnimationFrame;
    if (!raf || !caf) {
        var lastTime = 0;
        raf = function(callback) {
            var currTime = Date.now(); // performance.now()
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return w.setTimeout(function() {
                callback(lastTime);
            }, timeToCall);
        };
        caf = function(id) {
            w.clearTimeout(id);
        };
    }


    // id for internal use
    var _id = 0;
    var createId = function() { return ++_id; };
    var id2loop = {};


    // export
    var ex = {};
    ex.start = function(loop, fps) {
        var id = createId();

        var interval = 1000 / (fps || 60);
        var then = Date.now();
        var now;
        var delta;

        id2loop[id] = raf(function tick() {
            id2loop[id] = raf(tick);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                loop(now);
            }
        });

        return id;
    };
    ex.stop = function(id) {
        if (id in id2loop) caf(id2loop[id]);
    };

    if (typeof exports === "object") {
        module.exports = ex;
    } else {
        w.RAF = ex;
    }
})();
