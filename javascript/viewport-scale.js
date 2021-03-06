(function(designWidth) {
    'use strict';

    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio;
    if (dpr >= 3) {
        dpr = 3;
    } else if (dpr >= 2) {
        dpr = 2;
    } else {
        dpr = 1;
    }
    var scale = 1 / dpr;

    var $viewport = document.querySelector('meta[name="viewport"]');
    var content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';
    if ($viewport) {
        $viewport.setAttribute('content', content);
    } else {
        var metaViewport = '<meta name="viewport" content="' + content + '"/>';
        document.write(metaViewport);
    }

    var setFontSize = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 450) width = dpr * 450;
        var fontSize = width / designWidth * 100;
        docEl.style.fontSize = fontSize + 'px';
    };
    setFontSize();
    window.addEventListener('resize', setFontSize);
})(750);
