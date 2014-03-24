/**
 * usage:
 * var control = window.scrollControl(element);
 * control.disable();
 * control.enable();
 */


(function() {
    "use strict";

    function scrollControl(el) {
        function prevent(e) {
            e.preventDefault();
        }
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        function preventKeydown(e) {
            if (keys.indexOf(e.keyCode) !== -1) {
                e.preventDefault();
            }
        }

        function disable() {
            // for mobile, touch event
            el.addEventListener("touchmove", prevent);
            // for desktop, mouse event
            el.addEventListener("wheel", prevent); // DOM Level 3
            el.addEventListener("mousewheel", prevent); // non-standard ie/webkit
            el.addEventListener("DOMMouseScroll", prevent); // non-standard firefox
            // for desktop, keyboard event
            el.addEventListener("keydown", preventKeydown);
        }

        function enable() {
            el.removeEventListener("touchmove", prevent);
            el.removeEventListener("wheel", prevent);
            el.removeEventListener("mousewheel", prevent);
            el.removeEventListener("DOMMouseScroll", prevent);
            el.removeEventListener("keydown", preventKeydown);
        }

        return {
            enable: enable,
            disable: disable
        };
    }

    var win = (0, eval)("this");
    win.scrollControl = scrollControl;
})();
