/**
 * format(2014-12-03 18:06:56)
 *
 * yyyy = 2014
 * m = 12
 * mm = 12
 * d = 3
 * dd = 03
 * HH = 18
 * MM = 06
 * SS = 56
 */

(function() {
    "use strict";

    var fixWidth = function(n) {
        return ("0" + n).substr(-2);
    };

    var dateFormatter = function(date, format) {
        // get date
        date = (typeof(date) === "number" ? new Date(date) : date);

        // generate number
        var pairs = {
            yyyy: date.getFullYear(),
            mm: fixWidth(date.getMonth() + 1),
            m: date.getMonth() + 1,
            dd: fixWidth(date.getDate()),
            d: date.getDate(),
            HH: date.getHours(),
            MM: date.getMinutes(),
            SS: date.getSeconds()
        };

        // format date
        return format.replace(/yyyy|mm?|dd?|HH|MM|SS/g, function(matched) {
            return pairs[matched];
        });
    };

    if (typeof exports === "object") {
        module.exports = dateFormatter;
    } else {
        window.dateFormatter = dateFormatter;
    }
})();
