// https://github.com/moll/js-element-from-point/blob/master/index.js
// http://www.icab.de/blog/2011/10/17/elementfrompoint-under-ios-5/
//
// document.elementFromPoint 是相对于 viewport 来计算的
// 而在 ios < 5 的时候，是相对于 document 来计算的

(function() {
    "use strict";

    var win = window;
    var doc = document;

    var relativeToDocument = null;
    var isRelativeToDocument = function() {
        if (relativeToDocument !== null) return relativeToDocument;

        var x = win.pageXOffset ? win.pageXOffset + win.innerWidth - 1 : 0;
        var y = win.pageYOffset ? win.pageYOffset + win.innerHeight - 1 : 0;

        if (!x && !y) {
            // 页面未发生滚动，什么坐标系都无所谓
            return false;
        } else {
            // 页面滚动
            // 如果是相对于 viewport，由于找不到元素，会返回 null
            // viewport => null / document => element
            relativeToDocument = !!doc.elementFromPoint(x, y);
            return relativeToDocument;
        }
    };

    var elementFromViewportPoint = function(x, y) {
        if (isRelativeToDocument()) {
            x -= win.pageXOffset;
            y -= win.pageYOffset;
        }
        return doc.elementFromPoint(x, y);
    };

    module.exports = elementFromViewportPoint;
})();
