// https://github.com/filamentgroup/Overthrow/blob/master/src/overthrow-detect.js
var supportOverflowScroll = function() {
    var win = window;

    var docElem = document.documentElement;
    var ios = ('WebkitOverflowScrolling' in docElem.style);

    var ua = win.navigator.userAgent;
    var android = ua.match(/(Adr|Android)[ /](\d)/i);

    return ios || (android && android[2] > 2);
};
