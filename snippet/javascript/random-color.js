// http://www.paulirish.com/2009/random-hex-color-code-snippets/

'use strict';

module.exports = function() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};
