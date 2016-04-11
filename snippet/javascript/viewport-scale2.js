'use strict';

// <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

(function() {
    var docEl = document.documentElement;
    var setFontSize = function() {
        var size = screen.width / 7.5;
        if (size > 60) size = 60;
        docEl.style.fontSize = size + 'px';
    };

    window.addEventListener('resize', setFontSize);
    setFontSize();
})();
