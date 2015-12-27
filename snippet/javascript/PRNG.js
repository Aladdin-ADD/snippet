'use strict';

// http://v8project.blogspot.hk/2015/12/theres-mathrandom-and-then-theres.html

var mwc1616 = function() {
    var state0 = 1;
    var state1 = 2;

    return function mwc1616() {
        state0 = 18030 * (state0 & 0xffff) + (state0 >> 16);
        state1 = 30903 * (state1 & 0xffff) + (state1 >> 16);
        return state0 << 16 + (state1 & 0xffff);
    };
};


var xorshift128plus = function() {
    var state0 = 1;
    var state1 = 2;

    return function xorshift128plus() {
        var s1 = state0;
        var s0 = state1;
        state0 = s0;
        s1 ^= s1 << 23;
        s1 ^= s1 >> 17;
        s1 ^= s0;
        s1 ^= s0 >> 26;
        state1 = s1;
        return state0 + state1;
    };
};
