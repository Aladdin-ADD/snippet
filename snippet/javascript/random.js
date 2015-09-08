// https://github.com/knockout/knockout/blob/master/src/memoization.js

'use strict';

var random = function() {
    return ((Math.random() * 0xffff) | 0).toString(16);
};

module.exports = random;
