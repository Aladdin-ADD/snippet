// <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

(function(designWidth) {
    'use strict';
    var docEl = document.documentElement;
    var setFontSize = function() {
        var width = docEl.clientWidth;
        var size = width / designWidth * 100;
        size = (size < 50 ? 45 : 50);
        docEl.style.fontSize = size + 'px';
    };
    window.addEventListener('resize', setFontSize);
    setFontSize();
})(750);
