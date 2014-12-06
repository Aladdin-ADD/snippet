/**
 * format(2014-12-03 18:06:56)
 *
 * yyyy = 2014
 *
 * m = 12
 * mm = 12
 *
 * d = 3
 * dd = 03
 *
 * H = 18
 * HH = 18
 *
 * M = 6
 * MM = 06
 *
 * S = 56
 * SS = 56
 *
 */

(function() {
    "use strict";

    var pad = function(value) {
        return ("0" + value).substr(-2);
    };

    var dateFormatter = function(date, format) {
        // get date
        date = (typeof(date) === "number" ? new Date(date) : date);

        var _year = date.getFullYear(),
            _month = date.getMonth() + 1,
            _date = date.getDate(),
            _hour = date.getHours(),
            _minute = date.getMinutes(),
            _second = date.getSeconds();

        // generate number
        var pairs = {
            yyyy: _year,
            m: _month,
            mm: pad(_month),
            d: _date,
            dd: pad(_date),
            H: _hour,
            HH: pad(_hour),
            M: _minute,
            MM: pad(_minute),
            S: _second,
            SS: pad(_second)
        };

        // format date
        return format.replace(/yyyy|mm?|dd?|HH?|MM?|SS?/g, function(matched) {
            return pairs[matched];
        });
    };

    if (typeof exports === "object") {
        module.exports = dateFormatter;
    } else {
        window.dateFormatter = dateFormatter;
    }
})();
