'use strict';

// https://github.com/substack/semver-compare/blob/master/index.js

/**
 * @param {String} a
 * @param {String} b
 * @param {Number} dotCount major.minor.patch is 3 dot
 * @return {Number} -1 is <, 0 is =, 1 is >
 */
var compare = function(a, b, dotCount) {
    dotCount = dotCount || 4;
    var pa = String(a).split('.');
    var pb = String(b).split('.');
    for (var i = 0; i < dotCount; i++) {
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
