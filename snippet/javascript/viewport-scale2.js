// <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

(function(designWidth) {
    'use strict';
    var docEl = document.documentElement;
    var setFontSize = function() {
        var width = docEl.clientWidth;
        var size = width / designWidth * 100;
        if (size <= 47) size = 45;
        else if (size <= 52) size = 50;
        else size = 55;
        docEl.style.fontSize = size + 'px';
    };
    window.addEventListener('resize', setFontSize);
    setFontSize();
})(750);
