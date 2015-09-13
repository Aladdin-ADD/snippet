'use strict';

/**
 * plain object
 *
 * {};
 * Object();
 * new Object();
 * Object.create(null);
 * Object.prototype;
 */


var _proto = Object.prototype;
var _toString = _proto.toString;

var isPlainObject = function(obj) {
    if (_toString.call(obj) !== '[object Object]') {
        return false;
    }

    if (obj === _proto) {
        // Object.prototype
        return true;
    }

    if (!('constructor' in obj)) {
        // Object.create(null)
        return true;
    }

    if (Object.getPrototypeOf(obj) === _proto) {
        // {} / Object() / new Object()
        return true;
    }
};

module.exports = isPlainObject;
