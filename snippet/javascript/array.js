'use strict';

var unique = function(arr) {
    return arr.filter(function(value, index, array) {
        return (array.indexOf(value) === index);
    });
};
