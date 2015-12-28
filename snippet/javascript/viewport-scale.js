'use strict';

var isIPhone = window.navigator.appVersion.match(/iphone/gi);
var devicePixelRatio = window.devicePixelRatio;
var dpr = 1;
if (isIPhone) {
    if (devicePixelRatio >= 3) {
        dpr = 3;
    } else if (devicePixelRatio >= 2) {
        dpr = 2;
    }
}
var scale = 1 / dpr;

var metaViewport = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no, width=device-width, shrink-to-fit=no" />';
document.write(metaViewport);

var docEl = document.documentElement;
var width = docEl.getBoundingClientRect().width;
if (width / dpr > 450) width = dpr * 450;
var rem = width / 6.4;
docEl.style.fontSize = rem + 'px';
