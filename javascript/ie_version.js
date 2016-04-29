// from knockout.js
// work on ie5-9 (http://www.quirksmode.org/css/condcom.html)

'use strict';

function getIEVersion() {
    var version = 3;
    var div = document.createElement('div');
    var iElems = div.getElementsByTagName('i');

    while (true) {
        div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->';
        // iElems is living. it will be updated when div changed.
        if (!iElems[0]) break;
    }
    return version > 4 ? version : undefined;
}

module.exports = getIEVersion;
