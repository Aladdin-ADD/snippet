'use strict';

// https://github.com/substack/semver-compare/blob/master/index.js

/**
 * @param {String} a
 * @param {String} b
 * @return {Number} -1 is <, 0 is =, 1 is >
 */
var compare = function(a, b) {
    var pa = String(a).split('.');
    var pb = String(b).split('.');
    var len = Math.min(pa.length, pb.length) + 1;
    for (var i = 0; i < len; ++i) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) {
            return 1;
        } else if (nb > na) {
            return -1;
        } else if (!isNaN(na) && isNaN(nb)) {
            return 1;
        } else if (isNaN(na) && !isNaN(nb)) {
            return -1;
        }
    }
    return 0;
};

module.exports = compare;
