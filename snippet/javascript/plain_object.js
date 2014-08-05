(function() {
    "use strict";
    var win = (0, eval)("this");

    var _proto = Object.prototype;
    var _toString = _proto.toString;
    var _hasOwn = _proto.hasOwnProperty;
    var _getPrototypeOf = Object.getPrototypeOf;

    var isPlainObject = win.isPlainObject = function(o) {
        if (_toString.call(o) !== "[object Object]") {
            return false;
        }

        if ((! ("constructor" in o)) || (o === _proto)) {
            // Object.create(null) / Object.prototype
            return true;
        }

        if (_getPrototypeOf) {
            return _getPrototypeOf(o) === _proto; // {} / new Object()
        } else {
            for (var key in o) {
                // IE < 9 iterates inherited properties before own properties.
                // If the first iterated property is an object's own property
                // then there are no inheritedi enumerable properties.
                return _hasOwn.call(o, key);
            }
        }
    };
})();

(function test() {
    function Foo(a) {
        this.a = 1;
    }
    var e = document.createElement("div");
    e.valueOf = 0;

    function X(a) {
        this.a = 1;
        this.constructor = Object;
    }
    var a = {constructor:{}};
    function Y(a) {
        this.a = 1;
    }
    Y.prototype = Object.create(a);
    var b = [];
    b.__proto__ = Object.prototype;

    var testcase = [
        [{}, true],
        [{ 'a': 1 }, true],
        [{ 'constructor': Foo }, true],
        [{ 'constructor': 1 }, true],
        [{ 'constructor': false }, true],
        [{ 'valueOf': 0 }, true],
        [Object.create(null), true],

        [[1, 2, 3], false],
        [new Foo(1), false],
        [new X(1), false],
        [new Y(1), false],
        [new Object(123), false],
        [e, false],
        [b, false]
    ];
    var len = testcase.length;

    while (len--) {
        console.log(isPlainObject(testcase[len][0]) === testcase[len][1]);
    }
})();
